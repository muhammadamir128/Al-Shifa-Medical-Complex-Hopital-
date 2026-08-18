"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  TrendingUp, TrendingDown, Users, Calendar, DollarSign,
  Pill, Download, RefreshCw, Building2, Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── constants ───────────────────────────────────────────────── */
const PALETTE = ["#6366f1","#22c55e","#f59e0b","#14b8a6","#ef4444","#8b5cf6","#f97316","#3b82f6","#ec4899","#94a3b8"]

const STATUS_COLOR: Record<string, string> = {
  "SCHEDULED":   "#6366f1",
  "CONFIRMED":   "#22c55e",
  "IN PROGRESS": "#f59e0b",
  "COMPLETED":   "#14b8a6",
  "CANCELLED":   "#ef4444",
  "NO SHOW":     "#94a3b8",
}
const BILLING_COLOR: Record<string, string> = {
  "PAID":           "#22c55e",
  "PENDING":        "#f59e0b",
  "PARTIALLY PAID": "#6366f1",
  "REFUNDED":       "#94a3b8",
  "CANCELLED":      "#ef4444",
}
const GENDER_COLOR: Record<string, string> = {
  male:    "#6366f1",
  female:  "#ec4899",
  unknown: "#94a3b8",
}

const TT_STYLE = {
  background:   "hsl(var(--background))",
  border:       "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize:     12,
}

/* ── helpers ─────────────────────────────────────────────────── */
const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `$${(n / 1_000).toFixed(1)}k`
  : `$${n}`

/* ── sub-components ──────────────────────────────────────────── */
function StatCard({
  title, value, change, icon: Icon, prefix = "", loading,
}: {
  title: string; value: number; change: number; icon: React.ElementType
  prefix?: string; loading?: boolean
}) {
  const up = change >= 0
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1">
                {prefix}{value.toLocaleString()}
              </p>
            )}
            {loading ? (
              <Skeleton className="h-4 w-32 mt-2" />
            ) : (
              <div className={cn("flex items-center gap-1 mt-2 text-sm", up ? "text-green-500" : "text-red-500")}>
                {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{up ? "+" : ""}{change}%</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChartSkeleton({ h = 260 }: { h?: number }) {
  return (
    <div className="flex items-end gap-2" style={{ height: h }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="flex-1 rounded-sm" style={{ height: `${30 + (i % 4) * 18}%` }} />
      ))}
    </div>
  )
}

function EmptyChart({ label = "No data available" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[260px] text-muted-foreground gap-2">
      <Activity className="h-8 w-8 opacity-30" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

/* ── donut legend ────────────────────────────────────────────── */
function DonutLegend({
  data, colorMap, colorFallback,
}: {
  data: { status?: string; group?: string; count: number; amount?: number }[]
  colorMap?: Record<string, string>
  colorFallback?: string[]
}) {
  return (
    <div className="space-y-1.5 mt-2">
      {data.map((entry, i) => {
        const key = entry.status ?? entry.group ?? ""
        const color = colorMap?.[key.toUpperCase()] ?? colorFallback?.[i % 10] ?? PALETTE[i % 10]
        return (
          <div key={key} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize truncate">{key.toLowerCase()}</span>
            </div>
            <span className="text-xs font-medium tabular-nums shrink-0">
              {entry.amount !== undefined ? money(entry.amount) : entry.count}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── page ────────────────────────────────────────────────────── */
export default function AdminReportsPage() {
  const [period, setPeriod] = useState("month")
  const qc = useQueryClient()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["reports", period],
    queryFn: async () => {
      const res = await fetch(`/api/reports?period=${period}`)
      if (!res.ok) throw new Error("Failed to load reports")
      return res.json()
    },
    staleTime: 60_000,
  })

  const handleRefresh = () => qc.invalidateQueries({ queryKey: ["reports", period] })

  /* ── export CSV ──────────────────────────────────────────────── */
  const handleExport = () => {
    if (!data) return
    const rows: string[][] = [
      ["Metric", "Value", "Change"],
      ["New Patients",   data.stats.newPatients,   `${data.stats.newPatientsChange}%`],
      ["Appointments",   data.stats.appointments,  `${data.stats.appointmentsChange}%`],
      ["Revenue ($)",    data.stats.revenue,        `${data.stats.revenueChange}%`],
      ["Prescriptions",  data.stats.prescriptions,  `${data.stats.prescriptionsChange}%`],
    ]
    const csv = rows.map((r) => r.join(",")).join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = `hospital-report-${period}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const spinning = isLoading || isFetching

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive hospital performance metrics</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={spinning}>
            <RefreshCw className={cn("mr-2 h-4 w-4", spinning && "animate-spin")} />
            Refresh
          </Button>
          <Button onClick={handleExport} disabled={!data}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="New Patients"   value={data?.stats.newPatients   ?? 0} change={data?.stats.newPatientsChange   ?? 0} icon={Users}     loading={isLoading} />
        <StatCard title="Appointments"   value={data?.stats.appointments  ?? 0} change={data?.stats.appointmentsChange  ?? 0} icon={Calendar}  loading={isLoading} />
        <StatCard title="Revenue"        value={data?.stats.revenue       ?? 0} change={data?.stats.revenueChange       ?? 0} icon={DollarSign} prefix="$" loading={isLoading} />
        <StatCard title="Prescriptions"  value={data?.stats.prescriptions ?? 0} change={data?.stats.prescriptionsChange ?? 0} icon={Pill}      loading={isLoading} />
      </div>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
        </TabsList>

        {/* ══════════════════ OVERVIEW ══════════════════ */}
        <TabsContent value="overview" className="space-y-6">

          {/* Row 1: visits trend + revenue trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Patient Visits Trend
                </CardTitle>
                <CardDescription>Monthly appointment volume — last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton /> :
                 !data?.visitsTrend?.length ? <EmptyChart /> : (
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data.visitsTrend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={32} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [v, "Visits"]} />
                      <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={2} fill="url(#gVisits)" dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly paid billing revenue — last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton /> :
                 !data?.revenueTrend?.length ? <EmptyChart /> : (
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data.revenueTrend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={money} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={52} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#gRevenue)" dot={{ fill: "#22c55e", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Row 2: appointment status donut + top departments bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Appointment Status</CardTitle>
                <CardDescription>All-time distribution by status</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={200} /> :
                 !data?.statusDistribution?.length ? <EmptyChart label="No appointments found" /> : (
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="55%" height={200}>
                      <PieChart>
                        <Pie data={data.statusDistribution} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={48} outerRadius={80} paddingAngle={2}>
                          {data.statusDistribution.map((entry: { status: string }, i: number) => (
                            <Cell key={entry.status} fill={STATUS_COLOR[entry.status.toUpperCase()] ?? PALETTE[i % 10]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={TT_STYLE} formatter={(v: number, name: string) => [v, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1">
                      <DonutLegend data={data.statusDistribution} colorMap={STATUS_COLOR} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Departments by Appointments</CardTitle>
                <CardDescription>All-time appointment count per department</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={200} /> :
                 !data?.departments?.length ? <EmptyChart label="No departments found" /> : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={[...data.departments].sort((a: { appointments: number }, b: { appointments: number }) => b.appointments - a.appointments).slice(0, 6)}
                      layout="vertical"
                      margin={{ top: 0, right: 8, left: 4, bottom: 0 }}
                      barSize={14}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={90} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [v, "Appointments"]} />
                      <Bar dataKey="appointments" radius={[0, 4, 4, 0]}>
                        {data.departments.slice(0, 6).map((_: unknown, i: number) => (
                          <Cell key={i} fill={PALETTE[i % 10]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ══════════════════ DEPARTMENTS ══════════════════ */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-primary" />
                Department Revenue vs Appointments
              </CardTitle>
              <CardDescription>Grouped comparison — all departments</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <ChartSkeleton h={280} /> :
               !data?.departments?.length ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data.departments} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={48} />
                    <YAxis yAxisId="left"  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={32} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={money} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={52} />
                    <Tooltip contentStyle={TT_STYLE} formatter={(v: number, name: string) => [name === "revenue" ? `$${v.toLocaleString()}` : v, name]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar yAxisId="left"  dataKey="appointments" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="revenue"      fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Department Details</CardTitle>
              <CardDescription>Full breakdown per department</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
              ) : !data?.departments?.length ? (
                <EmptyChart label="No departments found" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Doctors</TableHead>
                      <TableHead className="text-right">Nurses</TableHead>
                      <TableHead className="text-right">Appointments</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.departments.map((d: { name: string; doctors: number; nurses: number; appointments: number; revenue: number }) => (
                      <TableRow key={d.name} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            {d.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{d.doctors}</TableCell>
                        <TableCell className="text-right">{d.nurses}</TableCell>
                        <TableCell className="text-right">{d.appointments}</TableCell>
                        <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                          ${d.revenue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════════════ FINANCIAL ══════════════════ */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Billing status donut */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Billing Status
                </CardTitle>
                <CardDescription>Revenue breakdown by payment status</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.billingStatus?.length ? <EmptyChart label="No billing data" /> : (
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="55%" height={220}>
                      <PieChart>
                        <Pie data={data.billingStatus} dataKey="amount" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                          {data.billingStatus.map((entry: { status: string }, i: number) => (
                            <Cell key={entry.status} fill={BILLING_COLOR[entry.status.toUpperCase()] ?? PALETTE[i % 10]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1">
                      <DonutLegend
                        data={data.billingStatus.map((b: { status: string; amount: number; count: number }) => ({
                          status: b.status, count: b.count, amount: b.amount,
                        }))}
                        colorMap={BILLING_COLOR}
                      />
                      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                        Total collected:{" "}
                        <span className="font-semibold text-foreground">
                          ${(data.billingStatus.find((b: { status: string }) => b.status === "PAID")?.amount ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Revenue trend bar */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Revenue (12 months)</CardTitle>
                <CardDescription>Paid billing collected per month</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.revenueTrend?.length ? <EmptyChart /> : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.revenueTrend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={22}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={money} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={52} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Billing status table */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Billing Summary Table</CardTitle>
              <CardDescription>Count and total amount per billing status</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
              ) : !data?.billingStatus?.length ? (
                <EmptyChart label="No billing data" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.billingStatus.map((b: { status: string; count: number; amount: number }) => (
                      <TableRow key={b.status} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <Badge
                            variant="outline"
                            style={{
                              borderColor: BILLING_COLOR[b.status.toUpperCase()] ?? "#94a3b8",
                              color:       BILLING_COLOR[b.status.toUpperCase()] ?? "#94a3b8",
                            }}
                          >
                            {b.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{b.count}</TableCell>
                        <TableCell className="text-right font-medium">${b.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══════════════════ PATIENT ANALYTICS ══════════════════ */}
        <TabsContent value="patients" className="space-y-6">
          {/* Row 1: gender donut + age groups bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Gender Distribution
                </CardTitle>
                <CardDescription>Registered patients by gender</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.patientDemographics?.gender?.length ? <EmptyChart label="No patient data" /> : (
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="55%" height={220}>
                      <PieChart>
                        <Pie data={data.patientDemographics.gender} dataKey="count" nameKey="group" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                          {data.patientDemographics.gender.map((entry: { group: string }, i: number) => (
                            <Cell key={entry.group} fill={GENDER_COLOR[entry.group.toLowerCase()] ?? PALETTE[i % 10]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={TT_STYLE} formatter={(v: number, name: string) => [v, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {data.patientDemographics.gender.map((g: { group: string; count: number }, i: number) => {
                        const total = data.patientDemographics.gender.reduce((s: number, x: { count: number }) => s + x.count, 0)
                        const pct   = total > 0 ? Math.round((g.count / total) * 100) : 0
                        return (
                          <div key={g.group} className="space-y-0.5">
                            <div className="flex justify-between text-xs">
                              <span className="capitalize text-muted-foreground">{g.group}</span>
                              <span className="font-medium">{pct}% ({g.count})</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${pct}%`, backgroundColor: GENDER_COLOR[g.group.toLowerCase()] ?? PALETTE[i % 10] }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Age Distribution</CardTitle>
                <CardDescription>Patients grouped by age range</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.patientDemographics?.ageGroups?.length ? <EmptyChart label="No age data" /> : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.patientDemographics.ageGroups} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="group" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [v, "Patients"]} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.patientDemographics.ageGroups.map((_: unknown, i: number) => (
                          <Cell key={i} fill={PALETTE[i % 10]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Row 2: blood groups + patient growth trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Blood Group Distribution</CardTitle>
                <CardDescription>Patients by blood group</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.patientDemographics?.bloodGroups?.length ? <EmptyChart label="No blood group data recorded" /> : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.patientDemographics.bloodGroups} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={28}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="group" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [v, "Patients"]} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.patientDemographics.bloodGroups.map((_: unknown, i: number) => (
                          <Cell key={i} fill={PALETTE[i % 10]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">New Patient Registrations</CardTitle>
                <CardDescription>Monthly new registrations — last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton h={220} /> :
                 !data?.patientGrowth?.length ? <EmptyChart /> : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data.patientGrowth} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [v, "New Patients"]} />
                      <Line type="monotone" dataKey="patients" stroke="#14b8a6" strokeWidth={2} dot={{ fill: "#14b8a6", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Total patients summary */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-primary/5 p-5 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {isLoading ? <Skeleton className="h-9 w-20 mx-auto" /> : data?.stats?.totalPatients?.toLocaleString() ?? "—"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Total Registered Patients</p>
                </div>
                <div className="rounded-xl bg-green-500/10 p-5 text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {isLoading ? <Skeleton className="h-9 w-20 mx-auto" /> : data?.stats?.newPatients?.toLocaleString() ?? "—"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">New This Period</p>
                </div>
                <div className="rounded-xl bg-teal-500/10 p-5 text-center">
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {isLoading ? <Skeleton className="h-9 w-20 mx-auto" /> :
                      (data?.patientDemographics?.bloodGroups?.length > 0
                        ? data.patientDemographics.bloodGroups.length + " blood groups"
                        : "—")
                    }
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Blood Groups on Record</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
