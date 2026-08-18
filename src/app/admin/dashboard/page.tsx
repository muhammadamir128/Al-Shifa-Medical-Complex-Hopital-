"use client"

import Link from "next/link"
import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard, StatsCardGroupSkeleton } from "@/components/dashboard/stats-cards"
import {
  statusBadgeClass,
  TableSkeleton,
  EmptyRow,
  QuickCard,
} from "@/components/dashboard/dashboard-ui"
import {
  RevenueAreaChart,
  AppointmentTrendChart,
  StatusDonutChart,
  PatientGrowthChart,
} from "@/components/dashboard/admin-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
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
  UserRound,
  Stethoscope,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Building2,
  Users,
  Receipt,
  Pill,
  FlaskConical,
  RefreshCw,
} from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

/* ── types ──────────────────────────────────────────────────────────── */
interface ChartData {
  monthlyRevenue: { month: string; revenue: number }[]
  appointmentTrend: { day: string; appointments: number }[]
  patientGrowth: { month: string; patients: number }[]
  statusDistribution: { status: string; count: number }[]
}

interface AdminData {
  stats: {
    totalPatients: number
    activeDoctors: number
    todayAppointments: number
    monthlyRevenue: number
  }
  extra: { pendingBills: number; totalStaff: number; totalDepartments: number }
  recentAppointments: {
    id: string
    patient: string
    doctor: string
    department: string
    time: string
    status: string
  }[]
  departments: {
    name: string
    doctors: number
    nurses: number
    appointments: number
    revenue: number
  }[]
  activities: { action: string; user: string; entity: string; time: string }[]
  chartData?: ChartData
}

/* ── helpers ────────────────────────────────────────────────────────── */
const activityIcon = (entity: string) => {
  switch (entity) {
    case "Patient":
    case "User":
      return UserRound
    case "Appointment":
      return Calendar
    case "LabResult":
      return FlaskConical
    case "Prescription":
      return Pill
    case "Billing":
      return DollarSign
    case "Doctor":
      return Stethoscope
    default:
      return Activity
  }
}

const money = (n: number) => `$${n.toLocaleString()}`

/* ── live indicator ─────────────────────────────────────────────────── */
function LiveIndicator({ lastUpdated }: { lastUpdated: Date | null }) {
  const [label, setLabel] = useState("Updating…")

  useEffect(() => {
    if (!lastUpdated) return
    const update = () => {
      const s = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
      if (s < 10) setLabel("just now")
      else if (s < 60) setLabel(`${s}s ago`)
      else setLabel(`${Math.floor(s / 60)}m ago`)
    }
    update()
    const id = setInterval(update, 5000)
    return () => clearInterval(id)
  }, [lastUpdated])

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      Live · Updated {label}
    </div>
  )
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError, dataUpdatedAt } = useDashboard<AdminData>(30_000)
  const [refreshing, setRefreshing] = useState(false)

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null

  const handleRefresh = async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    setRefreshing(false)
  }

  const cd = data?.chartData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s a live overview of your hospital.
          </p>
          {!isLoading && <LiveIndicator lastUpdated={lastUpdated} />}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing || isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/audit-logs">
              <Activity className="mr-2 h-4 w-4" />
              Live Status
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/admin/reports">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      {isError && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            Couldn&apos;t load dashboard data. Please refresh the page.
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {isLoading || !data ? (
        <StatsCardGroupSkeleton />
      ) : (
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <StatsCard
              title="Total Patients"
              value={data.stats.totalPatients.toLocaleString()}
              icon={UserRound}
              description="Registered in the system"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Active Doctors"
              value={data.stats.activeDoctors}
              icon={Stethoscope}
              description={`${data.extra.totalDepartments} departments`}
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Today's Appointments"
              value={data.stats.todayAppointments}
              icon={Calendar}
              description="Scheduled for today"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Monthly Revenue"
              value={money(data.stats.monthlyRevenue)}
              icon={DollarSign}
              description="Paid bills this month"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* Charts row 1 — Revenue + Status donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <RevenueAreaChart
            data={cd?.monthlyRevenue ?? []}
            loading={isLoading}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatusDonutChart
            data={cd?.statusDistribution ?? []}
            loading={isLoading}
          />
        </Reveal>
      </div>

      {/* Charts row 2 — 7-day trend + Patient growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Reveal>
          <AppointmentTrendChart
            data={cd?.appointmentTrend ?? []}
            loading={isLoading}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <PatientGrowthChart
            data={cd?.patientGrowth ?? []}
            loading={isLoading}
          />
        </Reveal>
      </div>

      {/* Appointments + Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today&apos;s Appointments
                </CardTitle>
                <CardDescription>Recent and upcoming patient appointments</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/appointments">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableSkeleton rows={5} cols={5} />
              ) : !data?.recentAppointments.length ? (
                <EmptyRow label="No appointments scheduled for today." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentAppointments.map((a) => (
                      <TableRow key={a.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{a.patient}</TableCell>
                        <TableCell>{a.doctor}</TableCell>
                        <TableCell className="hidden md:table-cell">{a.department}</TableCell>
                        <TableCell>{a.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeClass(a.status)}>
                            {a.status.replace("_", " ")}
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

        <Reveal delay={0.1}>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !data?.activities.length ? (
                <EmptyRow label="No recent activity." />
              ) : (
                <div className="space-y-1">
                  {data.activities.map((act, i) => {
                    const Icon = activityIcon(act.entity)
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{act.action}</p>
                          <p className="text-xs text-muted-foreground">{act.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{act.time}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Department Overview */}
      <Reveal>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Department Overview
            </CardTitle>
            <CardDescription>Performance metrics by department</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton rows={5} cols={5} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctors</TableHead>
                    <TableHead>Nurses</TableHead>
                    <TableHead>Appointments</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.departments.map((d) => (
                    <TableRow key={d.name} className="transition-colors hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{d.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{d.doctors}</TableCell>
                      <TableCell>{d.nurses}</TableCell>
                      <TableCell>{d.appointments}</TableCell>
                      <TableCell className="font-medium">{money(d.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Reveal>

      {/* Quick stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickCard
          label="Total Departments"
          value={data?.extra.totalDepartments ?? 0}
          icon={Building2}
          loading={isLoading}
          href="/admin/departments"
          className="bg-brand-gradient text-white"
        />
        <QuickCard
          label="Registered Staff"
          value={data?.extra.totalStaff ?? 0}
          icon={Users}
          loading={isLoading}
          href="/admin/staff"
          className="bg-primary text-primary-foreground"
        />
        <QuickCard
          label="Pending Bills"
          value={data?.extra.pendingBills ?? 0}
          icon={Receipt}
          loading={isLoading}
          href="/admin/billing"
          className="bg-amber-500 text-white"
        />
      </div>
    </div>
  )
}
