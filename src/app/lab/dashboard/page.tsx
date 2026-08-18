"use client"

import Link from "next/link"
import { useDashboard } from "@/hooks/use-dashboard"
import { StatsCard, StatsCardGroupSkeleton } from "@/components/dashboard/stats-cards"
import {
  statusBadgeClass,
  priorityClass,
  TableSkeleton,
  EmptyRow,
  QuickCard,
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
  FlaskConical,
  TestTubes,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Activity,
  FileText,
  Upload,
} from "lucide-react"

/* ── types ──────────────────────────────────────────────────────────── */
interface LabData {
  role: string
  stats: {
    pendingTests: number
    inProgress: number
    completedToday: number
    criticalResults: number
  }
  pendingTests: {
    id: string
    patient: string
    testType: string
    priority: string
    status: string
    time: string
  }[]
  recentResults: {
    id: string
    patient: string
    testType: string
    time: string
  }[]
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function LabDashboardPage() {
  const { data, isLoading, isError } = useDashboard<LabData>()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lab Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of laboratory operations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/lab/reports">
              <Activity className="mr-2 h-4 w-4" />
              Equipment Status
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/lab/test-requests">
              <TrendingUp className="mr-2 h-4 w-4" />
              New Test
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
              title="Pending Tests"
              value={data.stats.pendingTests}
              icon={FlaskConical}
              description="Awaiting processing"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="In Progress"
              value={data.stats.inProgress}
              icon={TestTubes}
              description="Currently running"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Completed Today"
              value={data.stats.completedToday}
              icon={CheckCircle2}
              description="Results ready"
            />
          </StaggerItem>
          <StaggerItem>
            <StatsCard
              title="Critical Results"
              value={data.stats.criticalResults}
              icon={AlertCircle}
              description="Requires attention"
            />
          </StaggerItem>
        </Stagger>
      )}

      {/* Pending Tests */}
      <Reveal>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Pending Tests
              </CardTitle>
              <CardDescription>Tests awaiting processing</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/lab/test-requests">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton rows={5} cols={6} />
            ) : !data?.pendingTests.length ? (
              <EmptyRow label="No pending tests at this time." />
            ) : (
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lab ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Test Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.pendingTests.map((test) => (
                      <TableRow key={test.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{test.id}</TableCell>
                        <TableCell>{test.patient}</TableCell>
                        <TableCell className="hidden md:table-cell">{test.testType}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={priorityClass(test.priority)}>
                            {test.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeClass(test.status)}>
                            {test.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/lab/results/upload">
                              <Upload className="h-3.5 w-3.5 mr-1" />
                              Upload
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </Reveal>

      {/* Recent Results */}
      <Reveal delay={0.1}>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Results
              </CardTitle>
              <CardDescription>Latest completed tests</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/lab/results">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton rows={5} cols={4} />
            ) : !data?.recentResults.length ? (
              <EmptyRow label="No results recorded yet today." />
            ) : (
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[480px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Result ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Test Type</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentResults.map((result) => (
                      <TableRow key={result.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patient}</TableCell>
                        <TableCell className="hidden md:table-cell">{result.testType}</TableCell>
                        <TableCell>{result.time}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href="/lab/results">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </Reveal>

      {/* Quick stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickCard
          label="Pending Tests"
          value={data?.stats.pendingTests ?? 0}
          icon={FlaskConical}
          loading={isLoading}
          href="/lab/test-requests"
          className="bg-brand-gradient text-white"
        />
        <QuickCard
          label="In Progress"
          value={data?.stats.inProgress ?? 0}
          icon={TestTubes}
          loading={isLoading}
          href="/lab/test-requests"
          className="bg-primary text-primary-foreground"
        />
        <QuickCard
          label="Completed Today"
          value={data?.stats.completedToday ?? 0}
          icon={CheckCircle2}
          loading={isLoading}
          href="/lab/results"
          className="bg-amber-500 text-white"
        />
      </div>
    </div>
  )
}
