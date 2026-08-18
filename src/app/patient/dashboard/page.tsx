"use client"

import Link from "next/link"
import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard, StatsCardGroupSkeleton } from "@/components/dashboard/stats-cards"
import {
  statusBadgeClass,
  ListSkeleton,
  EmptyRow,
} from "@/components/dashboard/dashboard-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import {
  Calendar,
  HeartPulse,
  Pill,
  Receipt,
  Clock,
  User,
  Phone,
  AlertCircle,
  CalendarCheck,
  ArrowUpRight,
  Activity,
  FileText,
  Droplets,
  Weight,
  Ruler,
} from "lucide-react"

/* ── types ──────────────────────────────────────────────────────────── */
interface PatientData {
  role: string
  empty?: boolean
  stats: {
    upcomingAppointments?: number
    activePrescriptions?: number
    pendingBills?: number
    pendingBillsCount?: number
    lastVisit?: string
  }
  upcomingAppointments?: {
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
  healthSummary?: {
    bloodGroup: string
    gender: string
    allergies: string
    medicalHistory: string
    weight: number | null
    height: number | null
  }
  recentVitals?: {
    id: string
    temperature: number
    bloodPressure: string
    heartRate: number
    oxygenSaturation: number
    time: string
  }[]
  currentMedications?: {
    name: string
    dosage: string
    frequency: string
  }[]
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function PatientDashboardPage() {
  const { data, isLoading, isError } = useDashboard<PatientData>()

  const stats = data?.stats ?? {}
  const appointments = data?.upcomingAppointments ?? []
  const healthSummary = data?.healthSummary
  const recentVitals = data?.recentVitals ?? []
  const currentMedications = data?.currentMedications ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">
            Here&apos;s your health overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/patient/appointments">
              <Calendar className="mr-2 h-4 w-4" />
              My Appointments
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/patient/appointments/book">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Book Appointment
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
              title="Upcoming Appointments"
              value={stats.upcomingAppointments ?? 0}
              icon={Calendar}
              description="Next 7 days"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Active Prescriptions"
              value={stats.activePrescriptions ?? 0}
              icon={Pill}
              description="Medications to take"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Pending Bills"
              value={`$${stats.pendingBills ?? 0}`}
              icon={Receipt}
              description={`${stats.pendingBillsCount ?? 0} unpaid bill${(stats.pendingBillsCount ?? 0) !== 1 ? "s" : ""}`}
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Last Visit"
              value={stats.lastVisit ?? "—"}
              icon={HeartPulse}
              description="Most recent visit"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* Upcoming Appointments + Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/patient/appointments">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={3} />
              ) : !appointments.length ? (
                <EmptyRow label="No upcoming appointments." />
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{appt.doctor}</p>
                          <p className="text-sm text-muted-foreground">{appt.department}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {appt.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 sm:min-w-[140px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(appt.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{appt.time}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={statusBadgeClass(appt.status)}
                        >
                          {appt.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>

        {/* Health Summary */}
        <Reveal delay={0.1}>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                Health Summary
              </CardTitle>
              <CardDescription>Your key health info</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 rounded-lg" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              ) : !healthSummary ? (
                <EmptyRow label="No health summary available." />
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="h-3 w-3" /> Blood Group
                      </p>
                      <p className="text-lg font-semibold">{healthSummary.bloodGroup || "—"}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" /> Gender
                      </p>
                      <p className="text-lg font-semibold capitalize">{healthSummary.gender || "—"}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Weight className="h-3 w-3" /> Weight
                      </p>
                      <p className="text-lg font-semibold">
                        {healthSummary.weight != null ? `${healthSummary.weight} kg` : "—"}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Ruler className="h-3 w-3" /> Height
                      </p>
                      <p className="text-lg font-semibold">
                        {healthSummary.height != null ? `${healthSummary.height} cm` : "—"}
                      </p>
                    </div>
                  </div>

                  {healthSummary.allergies && (
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 text-destructive" /> Allergies
                      </p>
                      <p className="text-sm text-muted-foreground leading-snug">
                        {healthSummary.allergies}
                      </p>
                    </div>
                  )}

                  {healthSummary.medicalHistory && (
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium">Medical History</p>
                      <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                        {healthSummary.medicalHistory}
                      </p>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/patient/medical-history">
                      <FileText className="mr-2 h-4 w-4" />
                      View Full Medical History
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Vitals & Medications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vitals */}
        <Reveal>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Vitals
              </CardTitle>
              <CardDescription>Your latest health measurements</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={4} />
              ) : !recentVitals.length ? (
                <EmptyRow label="No vitals recorded yet." />
              ) : (
                <div className="space-y-3">
                  {recentVitals.map((vital) => (
                    <div
                      key={vital.id}
                      className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs text-muted-foreground">{vital.time}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">BP:</span>
                          <span className="font-medium">{vital.bloodPressure}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">HR:</span>
                          <span className="font-medium">{vital.heartRate} bpm</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium">{vital.temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">O₂:</span>
                          <span className="font-medium">{vital.oxygenSaturation}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>

        {/* Current Medications */}
        <Reveal delay={0.1}>
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Current Medications
                </CardTitle>
                <CardDescription>Your active prescriptions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/patient/prescriptions">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={3} />
              ) : !currentMedications.length ? (
                <EmptyRow label="No active medications." />
              ) : (
                <div className="space-y-3">
                  {currentMedications.map((med, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} &bull; {med.frequency}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      </div>
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
        <Card className="border-none shadow-md bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Need Help?</h3>
                <p className="text-primary-foreground/80">
                  Book a new appointment or reach our support team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/patient/appointments/book">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}
