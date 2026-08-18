"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  UserRound,
  Moon,
  Sun,
  Sunset,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const weekSchedule = [
  {
    date: "2024-01-15",
    day: "Monday",
    shift: "Morning",
    hours: "07:00 - 15:00",
    ward: "Ward 3 - Cardiology",
    patients: 8,
    status: "completed",
    tasks: 12,
    tasksCompleted: 12,
  },
  {
    date: "2024-01-16",
    day: "Tuesday",
    shift: "Morning",
    hours: "07:00 - 15:00",
    ward: "Ward 3 - Cardiology",
    patients: 9,
    status: "completed",
    tasks: 15,
    tasksCompleted: 14,
  },
  {
    date: "2024-01-17",
    day: "Wednesday",
    shift: "Off",
    hours: "—",
    ward: "—",
    patients: 0,
    status: "off",
    tasks: 0,
    tasksCompleted: 0,
  },
  {
    date: "2024-01-18",
    day: "Thursday",
    shift: "Morning",
    hours: "07:00 - 15:00",
    ward: "Ward 3 - Cardiology",
    patients: 7,
    status: "completed",
    tasks: 10,
    tasksCompleted: 10,
  },
  {
    date: "2024-01-19",
    day: "Friday",
    shift: "Morning",
    hours: "07:00 - 15:00",
    ward: "Ward 3 - Cardiology",
    patients: 8,
    status: "completed",
    tasks: 11,
    tasksCompleted: 11,
  },
  {
    date: "2024-01-20",
    day: "Saturday",
    shift: "Morning",
    hours: "07:00 - 15:00",
    ward: "Ward 3 - Cardiology",
    patients: 6,
    status: "active",
    tasks: 9,
    tasksCompleted: 5,
    isToday: true,
  },
  {
    date: "2024-01-21",
    day: "Sunday",
    shift: "Off",
    hours: "—",
    ward: "—",
    patients: 0,
    status: "off",
    tasks: 0,
    tasksCompleted: 0,
  },
]

const upcomingShifts = [
  { date: "Jan 22", day: "Monday", shift: "Morning", hours: "07:00 - 15:00", ward: "Ward 3" },
  { date: "Jan 23", day: "Tuesday", shift: "Morning", hours: "07:00 - 15:00", ward: "Ward 3" },
  { date: "Jan 24", day: "Wednesday", shift: "Off", hours: "Day Off", ward: "—" },
  { date: "Jan 25", day: "Thursday", shift: "Evening", hours: "15:00 - 23:00", ward: "Ward 3" },
  { date: "Jan 26", day: "Friday", shift: "Morning", hours: "07:00 - 15:00", ward: "Ward 3" },
]

const shiftColors = {
  Morning: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", icon: Sun },
  Evening: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", icon: Sunset },
  Night: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300", icon: Moon },
  Off: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-500 dark:text-gray-400", icon: CheckCircle2 },
}

export default function NurseSchedulePage() {
  const [viewMode, setViewMode] = useState<"week" | "upcoming">("week")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Schedule</h1>
          <p className="text-muted-foreground">View your shift schedule and assigned patients</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "week" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("week")}
            >
              This Week
            </Button>
            <Button
              variant={viewMode === "upcoming" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("upcoming")}
            >
              Upcoming
            </Button>
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Swap Shift
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Shifts This Week", value: "5", icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Total Patients", value: "38", icon: UserRound, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Hours Worked", value: "40h", icon: Clock, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Tasks Done", value: "47/49", icon: CheckCircle2, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Calendar Nav */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
              <h3 className="font-semibold ml-2">January 2024</h3>
            </div>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              {(["Morning", "Evening", "Night", "Off"] as const).map((s) => {
                const cfg = shiftColors[s]
                const Icon = cfg.icon
                return (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className={cn("h-3 w-3 rounded", cfg.bg)} />
                    <span className="text-muted-foreground">{s}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "week" && (
        <div className="grid grid-cols-1 gap-4">
          {weekSchedule.map((day) => {
            const shiftCfg = shiftColors[day.shift as keyof typeof shiftColors] ?? shiftColors.Off
            const ShiftIcon = shiftCfg.icon
            return (
              <Card
                key={day.date}
                className={cn(
                  "border-none shadow-md transition-all",
                  day.isToday && "ring-2 ring-primary ring-offset-2",
                  day.status === "off" && "opacity-60"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("h-12 w-12 rounded-xl flex flex-col items-center justify-center shrink-0", shiftCfg.bg)}>
                        <ShiftIcon className={cn("h-5 w-5", shiftCfg.text)} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.date}</p>
                          {day.isToday && <Badge className="text-xs">Today</Badge>}
                        </div>
                        {day.status !== "off" ? (
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {day.hours}
                            </span>
                            <span>{day.ward}</span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">Day Off</p>
                        )}
                      </div>
                    </div>

                    {day.status !== "off" && (
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">{day.patients}</p>
                          <p className="text-xs text-muted-foreground">Patients</p>
                        </div>
                        <Separator orientation="vertical" className="h-10" />
                        <div className="text-center">
                          <p className="text-lg font-bold">{day.tasksCompleted}/{day.tasks}</p>
                          <p className="text-xs text-muted-foreground">Tasks</p>
                        </div>
                        <Separator orientation="vertical" className="h-10" />
                        <div className="text-center">
                          <Badge
                            variant={day.status === "active" ? "default" : day.tasksCompleted === day.tasks ? "outline" : "secondary"}
                            className="capitalize"
                          >
                            {day.status === "active" ? "In Progress" : day.status}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {viewMode === "upcoming" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Upcoming Shifts</CardTitle>
              <CardDescription>Next 5 working days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingShifts.map((shift, i) => {
                  const cfg = shiftColors[shift.shift as keyof typeof shiftColors] ?? shiftColors.Off
                  const Icon = cfg.icon
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", cfg.bg)}>
                          <Icon className={cn("h-4 w-4", cfg.text)} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{shift.day}, {shift.date}</p>
                          <p className="text-xs text-muted-foreground">{shift.hours} · {shift.ward}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn(cfg.text, "text-xs border-0", cfg.bg)}>
                        {shift.shift}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Shift Request</CardTitle>
              <CardDescription>Request shift swap or leave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Request Type</p>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swap">Shift Swap</SelectItem>
                    <SelectItem value="leave">Leave Request</SelectItem>
                    <SelectItem value="overtime">Overtime Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Date</p>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select date" /></SelectTrigger>
                  <SelectContent>
                    {upcomingShifts.filter(s => s.shift !== "Off").map((s, i) => (
                      <SelectItem key={i} value={s.date}>{s.day}, {s.date}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Shift requests must be submitted at least 48 hours in advance and are subject to supervisor approval.
                </p>
              </div>
              <Button className="w-full">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
