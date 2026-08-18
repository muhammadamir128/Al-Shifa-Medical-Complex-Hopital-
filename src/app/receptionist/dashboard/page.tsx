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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Calendar,
  UserRound,
  Clock,
  Receipt,
  ArrowUpRight,
  UserPlus,
  CalendarCheck,
  Search,
} from "lucide-react"

/* ── types ──────────────────────────────────────────────────────────── */
interface ReceptionistData {
  role: string
  stats: {
    todayAppointments: number
    newRegistrations: number
    pendingBillings: number
    waitingPatients: number
  }
  todayAppointments: {
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
  registrations: {
    id: string
    name: string
    email: string
    time: string
  }[]
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function ReceptionistDashboardPage() {
  const { data, isLoading, isError } = useDashboard<ReceptionistData>()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receptionist Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Manage appointments and patient registrations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/receptionist/appointments">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Book Appointment
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/receptionist/patients/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register Patient
            </Link>
          </Button>
        </div>
      </div>

      {/* Error */}
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
              title="Today's Appointments"
              value={data.stats.todayAppointments}
              icon={Calendar}
              description="Scheduled for today"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="New Registrations"
              value={data.stats.newRegistrations}
              icon={UserRound}
              description="Registered today"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Pending Billings"
              value={data.stats.pendingBillings}
              icon={Receipt}
              description="Awaiting payment"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Waiting Patients"
              value={data.stats.waitingPatients}
              icon={Clock}
              description="Currently in waiting area"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* Appointments + Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today&apos;s Appointments
                </CardTitle>
                <CardDescription>Manage and track all scheduled appointments</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/receptionist/appointments">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableSkeleton rows={5} cols={4} />
              ) : !data?.todayAppointments.length ? (
                <EmptyRow label="No appointments scheduled for today." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Doctor</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.todayAppointments.map((a) => (
                      <TableRow key={a.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{a.patient}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <p>{a.doctor}</p>
                            <p className="text-xs text-muted-foreground">{a.department}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{a.type}</TableCell>
                        <TableCell>{a.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeClass(a.status)}>
                            {a.status.replace(/_/g, " ")}
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

        {/* Recent Registrations */}
        <Reveal delay={0.1}>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Recent Registrations
              </CardTitle>
              <CardDescription>Recently registered patients</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={4} />
              ) : !data?.registrations.length ? (
                <EmptyRow label="No new registrations today." />
              ) : (
                <div className="space-y-1">
                  {data.registrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                    >
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <UserRound className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{reg.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{reg.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{reg.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Quick Actions */}
      <Reveal>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks at the front desk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <Link href="/receptionist/appointments">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <Link href="/receptionist/patients/register">
                  <UserPlus className="h-5 w-5" />
                  Register Patient
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <Link href="/receptionist/billing">
                  <Receipt className="h-5 w-5" />
                  New Bill
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <Link href="/receptionist/patients">
                  <Search className="h-5 w-5" />
                  Find Patient
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}
