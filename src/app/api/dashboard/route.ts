import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

/**
 * Role-aware dashboard data.
 * GET /api/dashboard → returns the live metrics + lists for the
 * signed-in user's role, sourced entirely from the database.
 */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const role = session.user.role
  const userId = session.user.id

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTomorrow = new Date(startOfToday.getTime() + 86400000)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const today = { gte: startOfToday, lt: startOfTomorrow }

  const timeAgo = (d: Date) => {
    const s = Math.floor((now.getTime() - new Date(d).getTime()) / 1000)
    if (s < 60) return "just now"
    if (s < 3600) return `${Math.floor(s / 60)} min ago`
    if (s < 86400) return `${Math.floor(s / 3600)} hr ago`
    return `${Math.floor(s / 86400)} day(s) ago`
  }

  const apptInclude = {
    patient: { include: { user: true } },
    doctor: { include: { user: true, department: true } },
  }
  type ApptRow = {
    patient: { user: { name: string } | null } | null
    doctor: { user: { name: string } | null; department: { name: string } | null } | null
    id: string
    type: string | null
    reason: string | null
    startTime: string
    date: Date
    status: string
  }
  const mapAppt = (a: ApptRow) => ({
    id: a.id,
    patient: a.patient?.user?.name ?? "Unknown",
    doctor: a.doctor?.user?.name ?? "Unassigned",
    department: a.doctor?.department?.name ?? "—",
    type: a.type ?? "Consultation",
    reason: a.reason ?? "",
    time: a.startTime,
    date: a.date,
    status: a.status,
  })

  try {
    switch (role) {
      /* ─────────────────────────── ADMIN ─────────────────────────── */
      case "ADMIN":
      case "SUPER_ADMIN": {
        const [
          totalPatients,
          activeDoctors,
          todayAppointments,
          revenue,
          pendingBills,
          totalStaff,
          recentAppointments,
          departments,
          activities,
        ] = await Promise.all([
          db.patient.count(),
          db.doctor.count(),
          db.appointment.count({ where: { date: today } }),
          db.billing.aggregate({
            _sum: { grandTotal: true },
            where: { status: "PAID", paymentDate: { gte: startOfMonth } },
          }),
          db.billing.count({ where: { status: "PENDING" } }),
          db.user.count({
            where: { role: { in: ["NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN"] } },
          }),
          db.appointment.findMany({
            where: { date: today },
            include: apptInclude,
            orderBy: { startTime: "asc" },
            take: 6,
          }),
          db.department.findMany({
            include: { _count: { select: { doctors: true, nurses: true } }, doctors: { select: { id: true } } },
          }),
          db.auditLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 6,
            include: { user: { select: { name: true } } },
          }),
        ])

        // Per-department appointment volume + revenue
        const deptRows = await Promise.all(
          departments.map(async (d) => {
            const doctorIds = d.doctors.map((x) => x.id)
            const [appts, rev] = await Promise.all([
              doctorIds.length
                ? db.appointment.count({ where: { doctorId: { in: doctorIds } } })
                : 0,
              doctorIds.length
                ? db.billing.aggregate({
                    _sum: { grandTotal: true },
                    where: { status: "PAID", appointment: { doctorId: { in: doctorIds } } },
                  })
                : { _sum: { grandTotal: 0 } },
            ])
            return {
              name: d.name,
              doctors: d._count.doctors,
              nurses: d._count.nurses,
              appointments: appts,
              revenue: rev._sum.grandTotal ?? 0,
            }
          }),
        )

        // Build date ranges for chart data
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
          return {
            month: d.toLocaleString("en-US", { month: "short" }),
            gte: d,
            lt: new Date(d.getFullYear(), d.getMonth() + 1, 1),
          }
        })
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(startOfToday.getTime() - (6 - i) * 86400000)
          return {
            day: d.toLocaleString("en-US", { weekday: "short" }),
            gte: d,
            lt: new Date(d.getTime() + 86400000),
          }
        })

        const [monthlyRevenueChart, appointmentTrend, patientGrowth, statusRaw] = await Promise.all([
          Promise.all(last6Months.map(async ({ month, gte, lt }) => {
            const r = await db.billing.aggregate({
              _sum: { grandTotal: true },
              where: { status: "PAID", createdAt: { gte, lt } },
            })
            return { month, revenue: Math.round(r._sum.grandTotal ?? 0) }
          })),
          Promise.all(last7Days.map(async ({ day, gte, lt }) => {
            const count = await db.appointment.count({ where: { date: { gte, lt } } })
            return { day, appointments: count }
          })),
          Promise.all(last6Months.map(async ({ month, gte, lt }) => {
            const count = await db.patient.count({ where: { createdAt: { gte, lt } } })
            return { month, patients: count }
          })),
          db.appointment.groupBy({
            by: ["status"],
            where: { date: { gte: new Date(startOfToday.getTime() - 6 * 86400000) } },
            _count: { status: true },
          }),
        ])

        const statusDistribution = statusRaw.map((s) => ({
          status: s.status.replace(/_/g, " "),
          count: s._count.status,
        }))

        return NextResponse.json({
          role,
          stats: {
            totalPatients,
            activeDoctors,
            todayAppointments,
            monthlyRevenue: revenue._sum.grandTotal ?? 0,
          },
          extra: { pendingBills, totalStaff, totalDepartments: departments.length },
          recentAppointments: recentAppointments.map(mapAppt),
          departments: deptRows,
          activities: activities.map((a) => ({
            action: a.action,
            user: a.user?.name ?? "System",
            entity: a.entity ?? "",
            time: timeAgo(a.createdAt),
          })),
          chartData: {
            monthlyRevenue: monthlyRevenueChart,
            appointmentTrend,
            patientGrowth,
            statusDistribution,
          },
        })
      }

      /* ─────────────────────────── DOCTOR ────────────────────────── */
      case "DOCTOR": {
        const doctor = await db.doctor.findUnique({ where: { userId } })
        if (!doctor) return NextResponse.json({ role, stats: {}, empty: true })

        const [todayCount, todayList, prescPending, labCompleted, patientIds] =
          await Promise.all([
            db.appointment.count({ where: { doctorId: doctor.id, date: today } }),
            db.appointment.findMany({
              where: { doctorId: doctor.id, date: today },
              include: apptInclude,
              orderBy: { startTime: "asc" },
            }),
            db.prescription.count({ where: { doctorId: doctor.id, status: "PENDING" } }),
            db.labRequest.count({ where: { doctorId: doctor.id, status: "COMPLETED" } }),
            db.appointment.findMany({
              where: { doctorId: doctor.id },
              select: { patientId: true },
              distinct: ["patientId"],
            }),
          ])

        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(startOfToday.getTime() - (6 - i) * 86400000)
          return { day: d.toLocaleString("en-US", { weekday: "short" }), gte: d, lt: new Date(d.getTime() + 86400000) }
        })
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
          return { month: d.toLocaleString("en-US", { month: "short" }), gte: d, lt: new Date(d.getFullYear(), d.getMonth() + 1, 1) }
        })

        const [recent, apptTrend, statusRaw, monthlyConsultations] = await Promise.all([
          db.appointment.findMany({
            where: { doctorId: doctor.id },
            include: apptInclude,
            orderBy: { date: "desc" },
            take: 12,
          }),
          Promise.all(last7Days.map(async ({ day, gte, lt }) => ({
            day,
            appointments: await db.appointment.count({ where: { doctorId: doctor.id, date: { gte, lt } } }),
          }))),
          db.appointment.groupBy({
            by: ["status"],
            where: { doctorId: doctor.id, date: { gte: new Date(startOfToday.getTime() - 6 * 86400000) } },
            _count: { status: true },
          }),
          Promise.all(last6Months.map(async ({ month, gte, lt }) => ({
            month,
            consultations: await db.appointment.count({ where: { doctorId: doctor.id, date: { gte, lt } } }),
          }))),
        ])
        const seen = new Set<string>()
        const recentPatients = recent
          .filter((a) => {
            const pid = a.patient?.user?.name ?? a.id
            if (seen.has(pid)) return false
            seen.add(pid)
            return true
          })
          .slice(0, 5)
          .map((a) => ({
            id: a.id,
            name: a.patient?.user?.name ?? "Unknown",
            condition: a.reason ?? "General",
            lastVisit: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            status: a.status,
          }))

        const remaining = todayList.filter(
          (a) => !["COMPLETED", "CANCELLED", "NO_SHOW"].includes(a.status),
        ).length

        return NextResponse.json({
          role,
          stats: {
            todayAppointments: todayCount,
            myPatients: patientIds.length,
            pendingPrescriptions: prescPending,
            labResults: labCompleted,
          },
          extra: { remainingToday: remaining },
          todayAppointments: todayList.map(mapAppt),
          recentPatients,
          chartData: {
            appointmentTrend: apptTrend,
            statusDistribution: statusRaw.map((s) => ({
              status: s.status.replace(/_/g, " "),
              count: s._count.status,
            })),
            monthlyConsultations,
          },
        })
      }

      /* ─────────────────────────── NURSE ─────────────────────────── */
      case "NURSE": {
        const nurse = await db.nurse.findUnique({ where: { userId } })
        const nurseId = nurse?.id

        const [patientsToday, vitalsToday, pendingTasks, completedTasks, tasks, vitals] =
          await Promise.all([
            db.appointment.count({ where: { date: today } }),
            nurseId
              ? db.vital.count({ where: { nurseId, recordedAt: today } })
              : 0,
            nurseId
              ? db.task.count({ where: { nurseId, status: { not: "COMPLETED" } } })
              : 0,
            nurseId
              ? db.task.count({ where: { nurseId, status: "COMPLETED" } })
              : 0,
            nurseId
              ? db.task.findMany({
                  where: { nurseId },
                  orderBy: { dueDate: "asc" },
                  take: 6,
                })
              : [],
            nurseId
              ? db.vital.findMany({
                  where: { nurseId },
                  include: { patient: { include: { user: true } } },
                  orderBy: { recordedAt: "desc" },
                  take: 6,
                })
              : [],
          ])

        const todayPatients = await db.appointment.findMany({
          where: { date: today },
          include: apptInclude,
          orderBy: { startTime: "asc" },
          take: 6,
        })

        return NextResponse.json({
          role,
          stats: {
            patientsToday,
            vitalsToday,
            pendingTasks,
            completedTasks,
          },
          todayPatients: todayPatients.map(mapAppt),
          tasks: tasks.map((t) => ({
            id: t.id,
            title: t.title,
            priority: (t.priority ?? "MEDIUM").toLowerCase(),
            status: t.status ?? "PENDING",
            due: t.dueDate
              ? new Date(t.dueDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
              : "—",
          })),
          recentVitals: vitals.map((v) => ({
            id: v.id,
            patient: v.patient?.user?.name ?? "Unknown",
            temperature: v.temperature,
            bloodPressure: v.bloodPressure,
            heartRate: v.heartRate,
            oxygenSaturation: v.oxygenSaturation,
            time: timeAgo(v.recordedAt),
          })),
        })
      }

      /* ──────────────────────── RECEPTIONIST ─────────────────────── */
      case "RECEPTIONIST": {
        const sevenDaysAgo = new Date(startOfToday.getTime() - 7 * 86400000)
        const [todayCount, newRegs, pendingBills, waiting, todayList, registrations] =
          await Promise.all([
            db.appointment.count({ where: { date: today } }),
            db.user.count({ where: { role: "PATIENT", createdAt: { gte: sevenDaysAgo } } }),
            db.billing.count({ where: { status: "PENDING" } }),
            db.appointment.count({
              where: { date: today, status: { in: ["SCHEDULED", "CONFIRMED"] } },
            }),
            db.appointment.findMany({
              where: { date: today },
              include: apptInclude,
              orderBy: { startTime: "asc" },
              take: 7,
            }),
            db.user.findMany({
              where: { role: "PATIENT" },
              orderBy: { createdAt: "desc" },
              take: 6,
              select: { id: true, name: true, email: true, createdAt: true },
            }),
          ])

        return NextResponse.json({
          role,
          stats: {
            todayAppointments: todayCount,
            newRegistrations: newRegs,
            pendingBillings: pendingBills,
            waitingPatients: waiting,
          },
          todayAppointments: todayList.map(mapAppt),
          registrations: registrations.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            time: timeAgo(u.createdAt),
          })),
        })
      }

      /* ─────────────────────────── PHARMACIST ────────────────────── */
      case "PHARMACIST": {
        const [totalMeds, meds, pendingPresc, dispensedToday, pendingList, activities] =
          await Promise.all([
            db.medication.count(),
            db.medication.findMany(),
            db.prescription.count({ where: { status: "PENDING" } }),
            db.prescription.count({
              where: { status: "DISPENSED", updatedAt: today },
            }),
            db.prescription.findMany({
              where: { status: "PENDING" },
              include: {
                patient: { select: { name: true } },
                doctor: { include: { user: { select: { name: true } } } },
                _count: { select: { items: true } },
              },
              orderBy: { createdAt: "desc" },
              take: 6,
            }),
            db.auditLog.findMany({
              where: { entity: { in: ["Prescription", "Medication", "Billing"] } },
              orderBy: { createdAt: "desc" },
              take: 5,
              include: { user: { select: { name: true } } },
            }),
          ])

        const lowStock = meds.filter((m) => m.stockQuantity <= m.reorderLevel)

        return NextResponse.json({
          role,
          stats: {
            totalMedicines: totalMeds,
            lowStockItems: lowStock.length,
            pendingPrescriptions: pendingPresc,
            dispensedToday,
          },
          pendingPrescriptions: pendingList.map((p) => ({
            id: p.id,
            patient: p.patient?.name ?? "Unknown",
            doctor: p.doctor?.user?.name ?? "Unassigned",
            items: p._count.items,
            time: timeAgo(p.createdAt),
          })),
          lowStock: lowStock.slice(0, 8).map((m) => ({
            id: m.id,
            name: m.name,
            stock: m.stockQuantity,
            reorderLevel: m.reorderLevel,
          })),
          activities: activities.map((a) => ({
            action: a.action,
            user: a.user?.name ?? "System",
            time: timeAgo(a.createdAt),
          })),
        })
      }

      /* ─────────────────────── LAB TECHNICIAN ────────────────────── */
      case "LAB_TECHNICIAN": {
        const [pending, inProgress, completedToday, critical, pendingList, results] =
          await Promise.all([
            db.labRequest.count({ where: { status: "PENDING" } }),
            db.labRequest.count({ where: { status: "IN_PROGRESS" } }),
            db.labResult.count({ where: { reportedAt: today } }),
            db.labRequest.count({
              where: { priority: "STAT", status: { not: "COMPLETED" } },
            }),
            db.labRequest.findMany({
              where: { status: { in: ["PENDING", "IN_PROGRESS"] } },
              include: { doctor: { include: { user: { select: { name: true } } } } },
              orderBy: { createdAt: "desc" },
              take: 7,
            }),
            db.labResult.findMany({
              include: {
                patient: { include: { user: { select: { name: true } } } },
                request: { select: { testType: true } },
              },
              orderBy: { reportedAt: "desc" },
              take: 6,
            }),
          ])

        // LabRequest.patientId is a bare string → resolve names in one query
        const patientIds = [...new Set(pendingList.map((r) => r.patientId))]
        const patients = patientIds.length
          ? await db.patient.findMany({
              where: { id: { in: patientIds } },
              include: { user: { select: { name: true } } },
            })
          : []
        const nameById = new Map(patients.map((p) => [p.id, p.user?.name ?? "Unknown"]))

        return NextResponse.json({
          role,
          stats: {
            pendingTests: pending,
            inProgress,
            completedToday,
            criticalResults: critical,
          },
          pendingTests: pendingList.map((r) => ({
            id: r.id,
            patient: nameById.get(r.patientId) ?? "Unknown",
            testType: r.testType,
            priority: r.priority ?? "ROUTINE",
            status: r.status,
            time: timeAgo(r.createdAt),
          })),
          recentResults: results.map((r) => ({
            id: r.id,
            patient: r.patient?.user?.name ?? "Unknown",
            testType: r.request?.testType ?? "Lab Test",
            time: timeAgo(r.reportedAt),
          })),
        })
      }

      /* ─────────────────────────── PATIENT ───────────────────────── */
      case "PATIENT": {
        const patient = await db.patient.findUnique({ where: { userId } })
        if (!patient) return NextResponse.json({ role, stats: {}, empty: true })

        const [upcoming, upcomingList, activePresc, bills, lastVisit, vitals, prescriptions] =
          await Promise.all([
            db.appointment.count({
              where: {
                patientId: patient.id,
                date: { gte: startOfToday },
                status: { in: ["SCHEDULED", "CONFIRMED"] },
              },
            }),
            db.appointment.findMany({
              where: { patientId: patient.id, date: { gte: startOfToday } },
              include: apptInclude,
              orderBy: { date: "asc" },
              take: 5,
            }),
            db.prescription.count({
              where: { patientId: userId, status: { not: "CANCELLED" } },
            }),
            db.billing.findMany({ where: { patientId: patient.id, status: "PENDING" } }),
            db.appointment.findFirst({
              where: { patientId: patient.id, status: "COMPLETED" },
              orderBy: { date: "desc" },
            }),
            db.vital.findMany({
              where: { patientId: patient.id },
              orderBy: { recordedAt: "desc" },
              take: 4,
            }),
            db.prescription.findMany({
              where: { patientId: userId, status: { not: "CANCELLED" } },
              include: { items: { include: { medication: { select: { name: true } } } } },
              orderBy: { createdAt: "desc" },
              take: 4,
            }),
          ])

        const pendingTotal = bills.reduce((s, b) => s + b.grandTotal, 0)
        const latestVital = vitals[0]
        const medications = prescriptions
          .flatMap((p) => p.items)
          .slice(0, 5)
          .map((it) => ({
            name: it.medication?.name ?? "Medication",
            dosage: it.dosage,
            frequency: it.frequency,
          }))

        return NextResponse.json({
          role,
          stats: {
            upcomingAppointments: upcoming,
            activePrescriptions: activePresc,
            pendingBills: pendingTotal,
            pendingBillsCount: bills.length,
            lastVisit: lastVisit
              ? new Date(lastVisit.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : "—",
          },
          upcomingAppointments: upcomingList.map(mapAppt),
          healthSummary: {
            bloodGroup: patient.bloodGroup ?? "—",
            gender: patient.gender ?? "—",
            allergies: patient.allergies ?? "None known",
            medicalHistory: patient.medicalHistory ?? "—",
            weight: latestVital?.weight ?? null,
            height: latestVital?.height ?? null,
          },
          recentVitals: vitals.map((v) => ({
            id: v.id,
            temperature: v.temperature,
            bloodPressure: v.bloodPressure,
            heartRate: v.heartRate,
            oxygenSaturation: v.oxygenSaturation,
            time: timeAgo(v.recordedAt),
          })),
          currentMedications: medications,
        })
      }

      default:
        return NextResponse.json({ role, stats: {}, empty: true })
    }
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 })
  }
}
