"use client"

import Link from "next/link"
import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard, StatsCardGroupSkeleton } from "@/components/dashboard/stats-cards"
import {
  statusBadgeClass,
  TableSkeleton,
  ListSkeleton,
  EmptyRow,
} from "@/components/dashboard/dashboard-ui"
import {
  DoctorAppointmentTrendChart,
  DoctorStatusDonutChart,
  DoctorConsultationChart,
} from "@/components/dashboard/doctor-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import {
  Stethoscope,
  Calendar,
  UserRound,
  Clock,
  ArrowUpRight,
  Pill,
  HeartPulse,
  FlaskConical,
  Activity,
} from "lucide-react"

/* ── types ──────────────────────────────────────────────────────────── */
interface ChartData {
  appointmentTrend: { day: string; appointments: number }[]
  statusDistribution: { status: string; count: number }[]
  monthlyConsultations: { month: string; consultations: number }[]
}

interface DoctorData {
  role: string
  stats: {
    todayAppointments?: number
    myPatients?: number
    pendingPrescriptions?: number
    labResults?: number
  }
  extra?: { remainingToday?: number }
  empty?: boolean
  todayAppointments?: {
    id: string
    patient: string
    doctor: string
    department: string
    type: string
    reason: string
    time: string
    date: string
    status: string
  }[]
  recentPatients?: {
    id: string
    name: string
    condition: string
    lastVisit: string
    status: string
  }[]
  chartData?: ChartData
}

/* ── helpers ────────────────────────────────────────────────────────── */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function DoctorDashboardPage() {
  const { data, isLoading, isError } = useDashboard<DoctorData>()

  const appointments = data?.todayAppointments ?? []
  const patients = data?.recentPatients ?? []
  const remaining = data?.extra?.remainingToday ?? 0
  const apptTrend = data?.chartData?.appointmentTrend ?? []
  const statusDist = data?.chartData?.statusDistribution ?? []
  const monthlyConsultations = data?.chartData?.monthlyConsultations ?? []

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-linear-to-r from-primary/15 via-primary/5 to-transparent px-6 py-6">
          {/* Decorative right glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-linear-to-l from-primary/8 to-transparent" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 ring-2 ring-primary/20">
                <Stethoscope className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Here&apos;s your daily clinical overview.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/doctor/schedule">
                  <Clock className="mr-2 h-4 w-4" />
                  My Schedule
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/doctor/appointments">
                  <Calendar className="mr-2 h-4 w-4" />
                  Start Consultation
                </Link>
              </Button>
            </div>
          </div>

          {/* Remaining today pill */}
          {!isLoading && remaining > 0 && (
            <div className="relative mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                <Activity className="h-3 w-3" />
                {remaining} appointment{remaining !== 1 ? "s" : ""} remaining today
              </span>
            </div>
          )}
        </div>
      </Reveal>

      {/* ── Error ──────────────────────────────────────────────────── */}
      {isError && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            Couldn&apos;t load dashboard data. Please refresh the page.
          </CardContent>
        </Card>
      )}

      {/* ── Stats ──────────────────────────────────────────────────── */}
      {isLoading || !data ? (
        <StatsCardGroupSkeleton />
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <StatsCard
              title="Today's Appointments"
              value={data.stats?.todayAppointments ?? 0}
              icon={Calendar}
              description={remaining > 0 ? `${remaining} remaining today` : "All done for today"}
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="My Patients"
              value={(data.stats?.myPatients ?? 0).toLocaleString()}
              icon={UserRound}
              description="Under your care"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Pending Prescriptions"
              value={data.stats?.pendingPrescriptions ?? 0}
              icon={Pill}
              description="Awaiting review"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Lab Results"
              value={data.stats?.labResults ?? 0}
              icon={FlaskConical}
              description="New results available"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* ── Charts row 1: Trend + Donut ────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <DoctorAppointmentTrendChart data={apptTrend} loading={isLoading} />
        </Reveal>
        <Reveal delay={0.1}>
          <DoctorStatusDonutChart data={statusDist} loading={isLoading} />
        </Reveal>
      </div>

      {/* ── Chart row 2: Monthly Consultations (full width) ─────────── */}
      <Reveal>
        <DoctorConsultationChart data={monthlyConsultations} loading={isLoading} />
      </Reveal>

      {/* ── Appointments table + Recent patients ────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Today's Appointments */}
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today&apos;s Appointments
                </CardTitle>
                <CardDescription>Your scheduled patient consultations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/doctor/appointments">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableSkeleton rows={5} cols={5} />
              ) : appointments.length === 0 ? (
                <EmptyRow label="No appointments scheduled for today." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="hidden lg:table-cell">Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt) => (
                      <TableRow key={appt.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{appt.patient}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{appt.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {appt.time}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {appt.reason}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeClass(appt.status)}>
                            {appt.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Reveal>

        {/* Recent Patients */}
        <Reveal delay={0.1}>
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  Recent Patients
                </CardTitle>
                <CardDescription>Patients you&apos;ve recently seen</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/doctor/patients">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={5} />
              ) : patients.length === 0 ? (
                <EmptyRow label="No recent patients." />
              ) : (
                <div className="space-y-1">
                  {patients.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                    >
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {initials(p.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.condition}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge variant="outline" className={statusBadgeClass(p.status)}>
                          {p.status.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{p.lastVisit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>

      </div>
    </div>
  )
}
