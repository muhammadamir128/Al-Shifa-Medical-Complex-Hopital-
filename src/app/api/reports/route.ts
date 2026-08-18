import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

function getPeriodRange(period: string, offset = 0) {
  const now = new Date()
  switch (period) {
    case "week": {
      const end = new Date(now.getTime() - offset * 7 * 86400000)
      const start = new Date(end.getTime() - 7 * 86400000)
      return { gte: start, lt: end }
    }
    case "quarter": {
      const end = new Date(now.getTime() - offset * 90 * 86400000)
      const start = new Date(end.getTime() - 90 * 86400000)
      return { gte: start, lt: end }
    }
    case "year": {
      const y = now.getFullYear() - offset
      return { gte: new Date(y, 0, 1), lt: new Date(y + 1, 0, 1) }
    }
    default: {
      // month
      const end = new Date(now.getFullYear(), now.getMonth() - offset, 1)
      const start = new Date(now.getFullYear(), now.getMonth() - offset - 1, 1)
      return { gte: start, lt: end }
    }
  }
}

function pctChange(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const period = request.nextUrl.searchParams.get("period") || "month"
  const currRange = getPeriodRange(period, 0)
  const prevRange = getPeriodRange(period, 1)

  // Last 12 months for trend charts
  const now = new Date()
  const last12 = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
    return {
      label: d.toLocaleString("en-US", { month: "short" }),
      gte: d,
      lt: new Date(d.getFullYear(), d.getMonth() + 1, 1),
    }
  })

  try {
    // ── Stats: current vs previous period ──────────────────────────
    const [
      currPatients, prevPatients,
      currAppts, prevAppts,
      currRevenue, prevRevenue,
      currPresc, prevPresc,
      totalPatients,
    ] = await Promise.all([
      db.patient.count({ where: { createdAt: currRange } }),
      db.patient.count({ where: { createdAt: prevRange } }),
      db.appointment.count({ where: { createdAt: currRange } }),
      db.appointment.count({ where: { createdAt: prevRange } }),
      db.billing.aggregate({ _sum: { grandTotal: true }, where: { status: "PAID", createdAt: currRange } }),
      db.billing.aggregate({ _sum: { grandTotal: true }, where: { status: "PAID", createdAt: prevRange } }),
      db.prescription.count({ where: { createdAt: currRange } }),
      db.prescription.count({ where: { createdAt: prevRange } }),
      db.patient.count(),
    ])

    // ── 12-month trends ──────────────────────────────────────────
    const [visitsTrend, revenueTrend, statusDistrib, deptData, billingByStatus] = await Promise.all([
      Promise.all(last12.map(async ({ label, gte, lt }) => ({
        month: label,
        visits: await db.appointment.count({ where: { date: { gte, lt } } }),
      }))),
      Promise.all(last12.map(async ({ label, gte, lt }) => {
        const r = await db.billing.aggregate({
          _sum: { grandTotal: true },
          where: { status: "PAID", createdAt: { gte, lt } },
        })
        return { month: label, revenue: Math.round(r._sum.grandTotal ?? 0) }
      })),
      db.appointment.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      db.department.findMany({
        include: {
          _count: { select: { doctors: true, nurses: true } },
          doctors: { select: { id: true } },
        },
      }),
      db.billing.groupBy({
        by: ["status"],
        _count: { status: true },
        _sum: { grandTotal: true },
      }),
    ])

    // ── Department metrics ───────────────────────────────────────
    const departments = await Promise.all(
      deptData.map(async (d) => {
        const doctorIds = d.doctors.map((x) => x.id)
        if (!doctorIds.length) {
          return { name: d.name, doctors: 0, nurses: d._count.nurses, appointments: 0, revenue: 0 }
        }
        const [appts, rev] = await Promise.all([
          db.appointment.count({ where: { doctorId: { in: doctorIds } } }),
          db.billing.aggregate({
            _sum: { grandTotal: true },
            where: { status: "PAID", appointment: { doctorId: { in: doctorIds } } },
          }),
        ])
        return {
          name: d.name,
          doctors: d._count.doctors,
          nurses: d._count.nurses,
          appointments: appts,
          revenue: Math.round(rev._sum.grandTotal ?? 0),
        }
      }),
    )

    // ── Patient demographics ─────────────────────────────────────
    const allPatients = await db.patient.findMany({
      select: { dateOfBirth: true, bloodGroup: true, gender: true },
    })

    const ageGroups: Record<string, number> = { "0-17": 0, "18-35": 0, "36-50": 0, "51-65": 0, "65+": 0 }
    const bloodGroupMap: Record<string, number> = {}
    const genderMap: Record<string, number> = {}

    for (const p of allPatients) {
      // age
      if (p.dateOfBirth) {
        const age = Math.floor(
          (now.getTime() - new Date(p.dateOfBirth).getTime()) / (365.25 * 86400000),
        )
        if (age < 18) ageGroups["0-17"]++
        else if (age < 36) ageGroups["18-35"]++
        else if (age < 51) ageGroups["36-50"]++
        else if (age < 66) ageGroups["51-65"]++
        else ageGroups["65+"]++
      }
      // blood group
      const bg = p.bloodGroup?.trim()
      if (bg) bloodGroupMap[bg] = (bloodGroupMap[bg] || 0) + 1
      // gender
      const g = p.gender ? p.gender.toLowerCase() : "unknown"
      genderMap[g] = (genderMap[g] || 0) + 1
    }

    // ── 12-month new patient registrations ───────────────────────
    const patientGrowth = await Promise.all(
      last12.map(async ({ label, gte, lt }) => ({
        month: label,
        patients: await db.patient.count({ where: { createdAt: { gte, lt } } }),
      })),
    )

    return NextResponse.json({
      stats: {
        totalPatients,
        newPatients: currPatients,
        newPatientsChange: pctChange(currPatients, prevPatients),
        appointments: currAppts,
        appointmentsChange: pctChange(currAppts, prevAppts),
        revenue: Math.round(currRevenue._sum.grandTotal ?? 0),
        revenueChange: pctChange(
          Math.round(currRevenue._sum.grandTotal ?? 0),
          Math.round(prevRevenue._sum.grandTotal ?? 0),
        ),
        prescriptions: currPresc,
        prescriptionsChange: pctChange(currPresc, prevPresc),
      },
      visitsTrend,
      revenueTrend,
      patientGrowth,
      statusDistribution: statusDistrib.map((s) => ({
        status: s.status.replace(/_/g, " "),
        count: s._count.status,
      })),
      departments: departments.sort((a, b) => b.appointments - a.appointments),
      billingStatus: billingByStatus.map((b) => ({
        status: b.status.replace(/_/g, " "),
        count: b._count.status,
        amount: Math.round(b._sum.grandTotal ?? 0),
      })),
      patientDemographics: {
        gender: Object.entries(genderMap).map(([group, count]) => ({ group, count })),
        ageGroups: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
        bloodGroups: Object.entries(bloodGroupMap)
          .sort((a, b) => b[1] - a[1])
          .map(([group, count]) => ({ group, count })),
      },
    })
  } catch (error) {
    console.error("Reports API error:", error)
    return NextResponse.json({ error: "Failed to load reports" }, { status: 500 })
  }
}
