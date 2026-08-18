"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MapPin,
  Plus,
  List,
  CalendarDays,
  Grid3X3,
  Video,
  Phone,
  MoreHorizontal,
  Eye,
  Edit,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Mock schedule data
const scheduleData = {
  week: [
    {
      date: "2024-01-15",
      dayName: "Monday",
      appointments: [
        { id: "APT001", time: "09:00", duration: 30, patient: "John Smith", type: "Follow-up", status: "COMPLETED", room: "Room 204" },
        { id: "APT002", time: "09:30", duration: 45, patient: "Emily Davis", type: "Consultation", status: "COMPLETED", room: "Room 204" },
        { id: "APT003", time: "10:30", duration: 30, patient: "Robert Johnson", type: "Check-up", status: "COMPLETED", room: "Room 204" },
      ],
    },
    {
      date: "2024-01-16",
      dayName: "Tuesday",
      appointments: [
        { id: "APT004", time: "09:00", duration: 30, patient: "Sarah Miller", type: "Follow-up", status: "COMPLETED", room: "Room 105" },
        { id: "APT005", time: "10:00", duration: 60, patient: "Michael Lee", type: "Consultation", status: "COMPLETED", room: "Room 105" },
      ],
    },
    {
      date: "2024-01-17",
      dayName: "Wednesday",
      appointments: [
        { id: "APT006", time: "14:00", duration: 30, patient: "Jennifer Brown", type: "Follow-up", status: "COMPLETED", room: "Room 204" },
        { id: "APT007", time: "14:30", duration: 45, patient: "William Wilson", type: "Consultation", status: "COMPLETED", room: "Room 204" },
        { id: "APT008", time: "15:30", duration: 30, patient: "Amanda Taylor", type: "Check-up", status: "COMPLETED", room: "Room 204" },
      ],
    },
    {
      date: "2024-01-18",
      dayName: "Thursday",
      appointments: [
        { id: "APT009", time: "09:00", duration: 30, patient: "David Martinez", type: "Follow-up", status: "COMPLETED", room: "Room 204" },
        { id: "APT010", time: "11:00", duration: 45, patient: "Lisa Anderson", type: "Consultation", status: "CANCELLED", room: "Room 204" },
      ],
    },
    {
      date: "2024-01-19",
      dayName: "Friday",
      appointments: [],
    },
    {
      date: "2024-01-20",
      dayName: "Saturday",
      isToday: true,
      appointments: [
        { id: "APT011", time: "09:00", duration: 30, patient: "John Smith", type: "Follow-up", status: "COMPLETED", room: "Room 204" },
        { id: "APT012", time: "09:30", duration: 45, patient: "Emily Davis", type: "Consultation", status: "IN_PROGRESS", room: "Room 204" },
        { id: "APT013", time: "10:15", duration: 30, patient: "Robert Johnson", type: "Check-up", status: "CONFIRMED", room: "Room 204" },
        { id: "APT014", time: "11:00", duration: 30, patient: "Sarah Miller", type: "Follow-up", status: "CONFIRMED", room: "Room 204" },
        { id: "APT015", time: "11:30", duration: 45, patient: "Michael Lee", type: "Consultation", status: "SCHEDULED", room: "Room 204" },
        { id: "APT016", time: "14:00", duration: 30, patient: "Jennifer Brown", type: "Follow-up", status: "SCHEDULED", room: "Room 204" },
        { id: "APT017", time: "14:30", duration: 30, patient: "William Wilson", type: "Check-up", status: "SCHEDULED", room: "Room 204" },
      ],
    },
    {
      date: "2024-01-21",
      dayName: "Sunday",
      appointments: [],
    },
  ],
  upcomingWeek: [
    {
      date: "2024-01-22",
      dayName: "Monday",
      appointments: [
        { id: "APT018", time: "09:00", duration: 30, patient: "Amanda Taylor", type: "Consultation", status: "SCHEDULED", room: "Room 204" },
        { id: "APT019", time: "10:00", duration: 30, patient: "David Martinez", type: "Follow-up", status: "CONFIRMED", room: "Room 204" },
      ],
    },
  ],
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
]

const statusConfig: Record<string, { label: string; className: string; bgClass: string }> = {
  SCHEDULED: { label: "Scheduled", className: "text-blue-700", bgClass: "bg-blue-100 dark:bg-blue-900/30" },
  CONFIRMED: { label: "Confirmed", className: "text-emerald-700", bgClass: "bg-emerald-100 dark:bg-emerald-900/30" },
  IN_PROGRESS: { label: "In Progress", className: "text-amber-700", bgClass: "bg-amber-100 dark:bg-amber-900/30" },
  COMPLETED: { label: "Completed", className: "text-green-700", bgClass: "bg-green-100 dark:bg-green-900/30" },
  CANCELLED: { label: "Cancelled", className: "text-red-700", bgClass: "bg-red-100 dark:bg-red-900/30" },
}

export default function DoctorSchedulePage() {
  const [viewMode, setViewMode] = useState<"week" | "day">("week")
  const [selectedDate, setSelectedDate] = useState("2024-01-20")

  const getAppointmentForSlot = (date: string, time: string) => {
    const daySchedule = scheduleData.week.find(d => d.date === date)
    if (!daySchedule) return null
    return daySchedule.appointments.find(apt => apt.time === time)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Schedule</h1>
            <p className="text-muted-foreground">
              View and manage your weekly appointments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === "week" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                Week
              </Button>
              <Button
                variant={viewMode === "day" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("day")}
              >
                <List className="mr-2 h-4 w-4" />
                Day
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Availability
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Today&apos;s Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Available Slots</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Video className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Video Consultations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Navigation */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h3 className="font-semibold ml-2">January 2024</h3>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-blue-100 dark:bg-blue-900/30" />
                  <span className="text-muted-foreground">Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-emerald-100 dark:bg-emerald-900/30" />
                  <span className="text-muted-foreground">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-amber-100 dark:bg-amber-900/30" />
                  <span className="text-muted-foreground">In Progress</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Week View */}
        {viewMode === "week" && (
          <Card className="border-none shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 border-b bg-muted/50">
                  <div className="p-3 text-center text-sm font-medium text-muted-foreground border-r">
                    Time
                  </div>
                  {scheduleData.week.map((day) => (
                    <div
                      key={day.date}
                      className={cn(
                        "p-3 text-center border-r last:border-r-0",
                        day.isToday && "bg-primary/5"
                      )}
                    >
                      <p className="text-xs text-muted-foreground">{day.dayName}</p>
                      <p className={cn(
                        "font-semibold",
                        day.isToday && "text-primary"
                      )}>
                        {day.date.split("-")[2]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.slice(0, 14).map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                    <div className="p-2 text-center text-xs text-muted-foreground border-r bg-muted/30">
                      {time}
                    </div>
                    {scheduleData.week.map((day) => {
                      const apt = getAppointmentForSlot(day.date, time)
                      return (
                        <div
                          key={day.date}
                          className={cn(
                            "p-1 border-r last:border-r-0 min-h-[60px]",
                            day.isToday && "bg-primary/5"
                          )}
                        >
                          {apt && (
                            <div
                              className={cn(
                                "p-2 rounded text-xs h-full cursor-pointer hover:opacity-80 transition-opacity",
                                statusConfig[apt.status]?.bgClass
                              )}
                            >
                              <p className={cn("font-medium truncate", statusConfig[apt.status]?.className)}>
                                {apt.patient}
                              </p>
                              <p className="text-muted-foreground truncate">{apt.type}</p>
                              <p className="text-muted-foreground">{apt.duration} min</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Day View */}
        {viewMode === "day" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Day Schedule */}
            <Card className="lg:col-span-2 border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saturday, January 20, 2024</CardTitle>
                    <CardDescription>7 appointments scheduled</CardDescription>
                  </div>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-01-15">Monday, Jan 15</SelectItem>
                      <SelectItem value="2024-01-16">Tuesday, Jan 16</SelectItem>
                      <SelectItem value="2024-01-17">Wednesday, Jan 17</SelectItem>
                      <SelectItem value="2024-01-18">Thursday, Jan 18</SelectItem>
                      <SelectItem value="2024-01-19">Friday, Jan 19</SelectItem>
                      <SelectItem value="2024-01-20">Saturday, Jan 20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduleData.week[5].appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={cn(
                        "p-4 rounded-lg border flex items-center justify-between",
                        statusConfig[apt.status]?.bgClass
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <p className="text-lg font-semibold">{apt.time}</p>
                          <p className="text-xs text-muted-foreground">{apt.duration} min</p>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {apt.patient.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{apt.patient}</p>
                            <p className="text-sm text-muted-foreground">{apt.type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge className={statusConfig[apt.status]?.bgClass + " " + statusConfig[apt.status]?.className}>
                            {statusConfig[apt.status]?.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {apt.room}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Working Hours */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">Working Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">Morning</span>
                    <span className="text-sm font-medium">09:00 - 12:00</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">Afternoon</span>
                    <span className="text-sm font-medium">14:00 - 17:00</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm text-muted-foreground">Break</span>
                    <span className="text-sm">12:00 - 14:00</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-md bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                      <Video className="h-5 w-5" />
                      <span className="text-xs">Video Call</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                      <Phone className="h-5 w-5" />
                      <span className="text-xs">Call Patient</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs">Block Time</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                      <Edit className="h-5 w-5" />
                      <span className="text-xs">Edit Schedule</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Breaks */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">Today&apos;s Breaks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Lunch Break</span>
                        <Badge variant="outline">12:00 - 13:00</Badge>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Admin Time</span>
                        <Badge variant="outline">15:30 - 16:00</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
