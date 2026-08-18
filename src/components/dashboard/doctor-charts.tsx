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
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, BarChart2, PieChart as PieIcon } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "#6366f1",
  CONFIRMED: "#4ade80",
  "IN PROGRESS": "#f59e0b",
  COMPLETED: "#14b8a6",
  CANCELLED: "#ef4444",
  "NO SHOW": "#94a3b8",
}

const FALLBACK_COLORS = ["#4ade80", "#6366f1", "#f59e0b", "#14b8a6", "#ef4444", "#94a3b8"]

interface ChartCardProps {
  title: string
  description: string
  icon: React.ElementType
  loading?: boolean
  children: React.ReactNode
}

function ChartCard({ title, description, icon: Icon, loading, children }: ChartCardProps) {
  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[220px] flex items-end gap-2 pt-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 rounded-sm" style={{ height: `${25 + i * 12}%` }} />
            ))}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

/* ── Weekly Appointment Trend (Area) ─────────────────────── */
export function DoctorAppointmentTrendChart({
  data,
  loading,
}: {
  data: { day: string; appointments: number }[]
  loading?: boolean
}) {
  return (
    <ChartCard
      title="Weekly Appointment Trend"
      description="Your appointments over the last 7 days"
      icon={TrendingUp}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDoctorAppt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
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
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="appointments"
            stroke="#4ade80"
            strokeWidth={2.5}
            fill="url(#colorDoctorAppt)"
            dot={{ fill: "#4ade80", r: 3.5, strokeWidth: 0 }}
            activeDot={{ r: 5.5, strokeWidth: 0, fill: "#4ade80" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/* ── Monthly Consultations (Bar) ─────────────────────────── */
export function DoctorConsultationChart({
  data,
  loading,
}: {
  data: { month: string; consultations: number }[]
  loading?: boolean
}) {
  return (
    <ChartCard
      title="Monthly Consultations"
      description="Total patient consultations per month (last 6 months)"
      icon={BarChart2}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={32}>
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
            formatter={(v: number) => [v, "Consultations"]}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="consultations" radius={[5, 5, 0, 0]} fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/* ── Appointment Status Donut ─────────────────────────────── */
export function DoctorStatusDonutChart({
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
        <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
          No appointments this week
        </div>
      ) : (
        <div className="flex items-center gap-4 pt-2">
          <ResponsiveContainer width="55%" height={180}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={72}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.status}
                    fill={
                      STATUS_COLORS[entry.status.toUpperCase()] ??
                      FALLBACK_COLORS[index % FALLBACK_COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, name: string) => [v, name]}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {data.map((entry, index) => (
              <div key={entry.status} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
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
                <span className="text-xs font-semibold tabular-nums">{entry.count}</span>
              </div>
            ))}
            <div className="mt-3 border-t pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-sm font-bold tabular-nums">{total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ChartCard>
  )
}
