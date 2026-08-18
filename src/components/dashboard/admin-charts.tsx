"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, BarChart2, PieChart as PieIcon, Users } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "#6366f1",
  CONFIRMED: "#22c55e",
  "IN PROGRESS": "#f59e0b",
  COMPLETED: "#14b8a6",
  CANCELLED: "#ef4444",
  "NO SHOW": "#94a3b8",
}

const FALLBACK_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#14b8a6", "#ef4444", "#94a3b8"]

const money = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`

interface ChartCardProps {
  title: string
  description: string
  icon: React.ElementType
  loading?: boolean
  children: React.ReactNode
}

function ChartCard({ title, description, icon: Icon, loading, children }: ChartCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[200px] flex items-end gap-2 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 rounded-sm" style={{ height: `${40 + i * 20}%` }} />
            ))}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

/* ── Revenue Area Chart ──────────────────────────────────── */
export function RevenueAreaChart({
  data,
  loading,
}: {
  data: { month: string; revenue: number }[]
  loading?: boolean
}) {
  return (
    <ChartCard
      title="Monthly Revenue"
      description="Paid billing revenue over the last 6 months"
      icon={TrendingUp}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={money}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/* ── Appointment Trend Bar Chart ─────────────────────────── */
export function AppointmentTrendChart({
  data,
  loading,
}: {
  data: { day: string; appointments: number }[]
  loading?: boolean
}) {
  return (
    <ChartCard
      title="Appointment Trend"
      description="Number of appointments over the last 7 days"
      icon={BarChart2}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            formatter={(v: number) => [v, "Appointments"]}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="appointments" radius={[4, 4, 0, 0]} fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/* ── Status Distribution Donut ───────────────────────────── */
export function StatusDonutChart({
  data,
  loading,
}: {
  data: { status: string; count: number }[]
  loading?: boolean
}) {
  const total = data.reduce((s, d) => s + d.count, 0)

  return (
    <ChartCard
      title="Appointment Status"
      description="Distribution this week by status"
      icon={PieIcon}
      loading={loading}
    >
      {total === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
          No appointments this week
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="50%" height={160}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={68}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status.toUpperCase()] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, name: string) => [v, name]}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {data.map((entry, index) => (
              <div key={entry.status} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        STATUS_COLORS[entry.status.toUpperCase()] ??
                        FALLBACK_COLORS[index % FALLBACK_COLORS.length],
                    }}
                  />
                  <span className="text-xs text-muted-foreground truncate capitalize">
                    {entry.status.toLowerCase()}
                  </span>
                </div>
                <span className="text-xs font-medium tabular-nums">{entry.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  )
}

/* ── Patient Growth Area Chart ───────────────────────────── */
export function PatientGrowthChart({
  data,
  loading,
}: {
  data: { month: string; patients: number }[]
  loading?: boolean
}) {
  return (
    <ChartCard
      title="Patient Registrations"
      description="New patients registered per month (last 6 months)"
      icon={Users}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            formatter={(v: number) => [v, "New Patients"]}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="patients"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#colorPatients)"
            dot={{ fill: "#14b8a6", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
