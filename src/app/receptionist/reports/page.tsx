"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Download,
  UserPlus,
  CheckCircle2,
  XCircle,
  BarChart3,
  Printer,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const stats = [
  { label: "Patients Registered", value: "248", change: "+18", icon: UserPlus, color: "bg-primary/10 text-primary" },
  { label: "Appointments Booked", value: "892", change: "+34", icon: Calendar, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
  { label: "Check-ins Today", value: "47", change: "+5", icon: CheckCircle2, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
  { label: "Cancellations", value: "12", change: "-3", icon: XCircle, color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
]

const registrationsByDay = [
  { day: "Monday", count: 42, appointments: 156 },
  { day: "Tuesday", count: 38, appointments: 143 },
  { day: "Wednesday", count: 51, appointments: 189 },
  { day: "Thursday", count: 45, appointments: 167 },
  { day: "Friday", count: 49, appointments: 178 },
  { day: "Saturday", count: 23, appointments: 59 },
]

const appointmentStats = [
  { type: "Follow-up", count: 324, percent: 36 },
  { type: "New Patient", count: 201, percent: 23 },
  { type: "Emergency", count: 89, percent: 10 },
  { type: "Routine Checkup", count: 178, percent: 20 },
  { type: "Consultation", count: 100, percent: 11 },
]

const recentRegistrations = [
  { id: "P-1281", name: "Alice Thompson", date: "2024-01-20", time: "09:12 AM", doctor: "Dr. Wilson", type: "New" },
  { id: "P-1282", name: "Brian Foster", date: "2024-01-20", time: "09:45 AM", doctor: "Dr. Chen", type: "New" },
  { id: "P-1283", name: "Carol Martinez", date: "2024-01-20", time: "10:20 AM", doctor: "Dr. Rodriguez", type: "Walk-in" },
  { id: "P-1284", name: "David Park", date: "2024-01-20", time: "11:05 AM", doctor: "Dr. Wilson", type: "New" },
  { id: "P-1285", name: "Eva Collins", date: "2024-01-20", time: "11:30 AM", doctor: "Dr. Patel", type: "Referral" },
  { id: "P-1286", name: "Frank Hughes", date: "2024-01-20", time: "02:15 PM", doctor: "Dr. Thompson", type: "New" },
]

const typeColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  "Walk-in": "bg-amber-100 text-amber-700",
  Referral: "bg-purple-100 text-purple-700",
}

const typeBarColors: Record<string, string> = {
  "Follow-up": "bg-primary",
  "New Patient": "bg-blue-500",
  "Emergency": "bg-red-500",
  "Routine Checkup": "bg-emerald-500",
  "Consultation": "bg-purple-500",
}

export default function ReceptionistReportsPage() {
  const { toast } = useToast()
  const [period, setPeriod] = useState("this_month")
  const maxDay = Math.max(...registrationsByDay.map(d => d.count))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reception Reports</h1>
          <p className="text-muted-foreground">Registration and appointment analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => toast({ title: "Generating PDF report..." })}>
            <Download className="mr-2 h-4 w-4" />Export
          </Button>
          <Button variant="outline" onClick={() => toast({ title: "Printing report..." })}>
            <Printer className="mr-2 h-4 w-4" />Print
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          const isPositive = s.change.startsWith("+")
          return (
            <Card key={s.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                  <TrendingUp className="h-3 w-3" />
                  {s.change} vs last period
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Volume */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Weekly Volume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {registrationsByDay.map((d) => (
                  <div key={d.day} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium w-24">{d.day}</span>
                      <div className="flex gap-4 text-muted-foreground text-xs">
                        <span><Users className="h-3 w-3 inline mr-1" />{d.count} reg.</span>
                        <span><Calendar className="h-3 w-3 inline mr-1" />{d.appointments} appt.</span>
                      </div>
                    </div>
                    <Progress value={(d.count / maxDay) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Appointment Types */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Appointment Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {appointmentStats.map((a) => (
                  <div key={a.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{a.type}</span>
                      <span className="text-muted-foreground">{a.count} ({a.percent}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${typeBarColors[a.type] ?? "bg-primary"}`}
                        style={{ width: `${a.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="registrations">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Assigned Doctor</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRegistrations.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{r.time}</span>
                      </TableCell>
                      <TableCell className="text-sm">{r.doctor}</TableCell>
                      <TableCell>
                        <Badge className={`${typeColors[r.type] ?? "bg-gray-100 text-gray-700"} text-xs`}>{r.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Appointment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Booked", value: "892", icon: Calendar, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
                  { label: "Completed", value: "731", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
                  { label: "Cancelled", value: "48", icon: XCircle, color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
                ].map((s) => {
                  const Icon = s.icon
                  return (
                    <div key={s.label} className={`p-4 rounded-xl flex items-center gap-3 ${s.color}`}>
                      <Icon className="h-8 w-8 opacity-70" />
                      <div>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-sm font-medium opacity-80">{s.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Completion Rate</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">81.9%</span>
                  </div>
                  <Progress value={81.9} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
