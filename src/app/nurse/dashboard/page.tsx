"use client"

import Link from "next/link"
import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard, StatsCardGroupSkeleton } from "@/components/dashboard/stats-cards"
import {
  statusBadgeClass,
  priorityClass,
  TableSkeleton,
  ListSkeleton,
  EmptyRow,
} from "@/components/dashboard/dashboard-ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  Activity,
  HeartPulse,
  ClipboardList,
  Users,
  ArrowUpRight,
  UserRound,
  Thermometer,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"

/* ── types ──────────────────────────────────────────────────────────── */
interface NurseData {
  role: string
  stats: {
    patientsToday: number
    vitalsToday: number
    pendingTasks: number
    completedTasks: number
  }
  todayPatients: {
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
  tasks: {
    id: string
    title: string
    priority: string
    status: string
    due: string
  }[]
  recentVitals: {
    id: string
    patient: string
    temperature: number
    bloodPressure: string
    heartRate: number
    oxygenSaturation: number
    time: string
  }[]
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function NurseDashboardPage() {
  const { data, isLoading, isError } = useDashboard<NurseData>()

  const totalTasks =
    (data?.stats.completedTasks ?? 0) + (data?.stats.pendingTasks ?? 0)
  const taskProgress =
    totalTasks > 0
      ? Math.round(((data?.stats.completedTasks ?? 0) / totalTasks) * 100)
      : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nurse Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your shift overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/nurse/tasks">
              <ClipboardList className="mr-2 h-4 w-4" />
              My Tasks
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/nurse/vitals">
              <HeartPulse className="mr-2 h-4 w-4" />
              Record Vitals
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
              title="Patients Today"
              value={data.stats.patientsToday}
              icon={UserRound}
              description="Assigned to your care"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Vitals Recorded"
              value={data.stats.vitalsToday}
              icon={Activity}
              description="Recorded this shift"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Pending Tasks"
              value={data.stats.pendingTasks}
              icon={ClipboardList}
              description="Awaiting completion"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Completed Tasks"
              value={data.stats.completedTasks}
              icon={CheckCircle2}
              description="Done this shift"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* Today's Patients + Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Today&apos;s Patients
                </CardTitle>
                <CardDescription>Patients under your care today</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/nurse/patients">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableSkeleton rows={5} cols={5} />
              ) : !data?.todayPatients.length ? (
                <EmptyRow label="No patients assigned for today." />
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
                    {data.todayPatients.map((p) => (
                      <TableRow key={p.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{p.patient}</TableCell>
                        <TableCell>{p.doctor}</TableCell>
                        <TableCell className="hidden md:table-cell">{p.department}</TableCell>
                        <TableCell>{p.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeClass(p.status)}>
                            {p.status.replace("_", " ")}
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription>Your scheduled tasks for today</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/nurse/tasks">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ListSkeleton rows={4} />
              ) : !data?.tasks.length ? (
                <EmptyRow label="No tasks scheduled." />
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {data.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ClipboardList className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{task.due}</span>
                          <Badge variant="outline" className={`text-xs ${priorityClass(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className={`shrink-0 text-xs ${statusBadgeClass(task.status)}`}>
                        {task.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Recent Vitals + Shift Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Recent Vitals
                </CardTitle>
                <CardDescription>Latest recorded vital signs</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/nurse/vitals">
                  Record Vitals
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <TableSkeleton rows={4} cols={6} />
              ) : !data?.recentVitals.length ? (
                <EmptyRow label="No vitals recorded yet." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Temp (°F)</TableHead>
                      <TableHead>Blood Pressure</TableHead>
                      <TableHead>Heart Rate</TableHead>
                      <TableHead>O2 Sat</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentVitals.map((v) => (
                      <TableRow key={v.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{v.patient}</TableCell>
                        <TableCell className={v.temperature >= 100 ? "text-destructive font-medium" : ""}>
                          {v.temperature}
                        </TableCell>
                        <TableCell>{v.bloodPressure}</TableCell>
                        <TableCell className={v.heartRate > 100 ? "text-destructive font-medium" : ""}>
                          {v.heartRate} bpm
                        </TableCell>
                        <TableCell className={v.oxygenSaturation < 95 ? "text-destructive font-medium" : ""}>
                          {v.oxygenSaturation}%
                        </TableCell>
                        <TableCell className="text-muted-foreground">{v.time}</TableCell>
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
                <TrendingUp className="h-5 w-5 text-primary" />
                Shift Progress
              </CardTitle>
              <CardDescription>Your daily completion status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Vitals Recorded</span>
                  <span className="text-sm text-muted-foreground">
                    {isLoading ? "—" : `${data?.stats.vitalsToday ?? 0} today`}
                  </span>
                </div>
                <Progress
                  value={
                    isLoading || !data
                      ? 0
                      : data.stats.patientsToday > 0
                      ? Math.round((data.stats.vitalsToday / data.stats.patientsToday) * 100)
                      : 0
                  }
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tasks Completed</span>
                  <span className="text-sm text-muted-foreground">
                    {isLoading
                      ? "—"
                      : `${data?.stats.completedTasks ?? 0} / ${totalTasks}`}
                  </span>
                </div>
                <Progress value={isLoading ? 0 : taskProgress} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-lg font-bold text-primary">
                    {isLoading ? "—" : `${taskProgress}%`}
                  </span>
                </div>
                <Progress value={isLoading ? 0 : taskProgress} className="h-3 mt-2" />
              </div>

              <Button className="w-full" asChild>
                <Link href="/nurse/medications">
                  <HeartPulse className="mr-2 h-4 w-4" />
                  Medications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
