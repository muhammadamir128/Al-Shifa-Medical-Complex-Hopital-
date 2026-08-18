"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Calendar,
  Clock,
  FileText,
  UserRound,
  Filter,
  Download,
  CalendarDays,
  Video,
  Phone,
  CheckCircle2,
  XCircle,
  PlayCircle,
  ClipboardList,
} from "lucide-react"
import { useState } from "react"

const appointments = [
  { 
    id: "APT001", 
    patient: "John Smith", 
    patientId: "PAT001",
    type: "Follow-up", 
    date: "2024-01-20", 
    time: "09:00 AM", 
    duration: "30 min",
    status: "COMPLETED", 
    reason: "Hypertension follow-up",
    department: "Cardiology"
  },
  { 
    id: "APT002", 
    patient: "Emily Davis", 
    patientId: "PAT002",
    type: "Consultation", 
    date: "2024-01-20", 
    time: "09:30 AM", 
    duration: "45 min",
    status: "IN_PROGRESS", 
    reason: "Chest pain evaluation",
    department: "Cardiology"
  },
  { 
    id: "APT003", 
    patient: "Robert Johnson", 
    patientId: "PAT003",
    type: "Check-up", 
    date: "2024-01-20", 
    time: "10:15 AM", 
    duration: "30 min",
    status: "CONFIRMED", 
    reason: "Annual physical examination",
    department: "General Medicine"
  },
  { 
    id: "APT004", 
    patient: "Sarah Miller", 
    patientId: "PAT004",
    type: "Follow-up", 
    date: "2024-01-20", 
    time: "11:00 AM", 
    duration: "30 min",
    status: "CONFIRMED", 
    reason: "Diabetes management review",
    department: "Endocrinology"
  },
  { 
    id: "APT005", 
    patient: "Michael Lee", 
    patientId: "PAT005",
    type: "Consultation", 
    date: "2024-01-20", 
    time: "11:30 AM", 
    duration: "45 min",
    status: "SCHEDULED", 
    reason: "New patient consultation",
    department: "Cardiology"
  },
  { 
    id: "APT006", 
    patient: "Jennifer Brown", 
    patientId: "PAT006",
    type: "Follow-up", 
    date: "2024-01-20", 
    time: "02:00 PM", 
    duration: "30 min",
    status: "SCHEDULED", 
    reason: "Post-surgery check",
    department: "Surgery"
  },
  { 
    id: "APT007", 
    patient: "William Wilson", 
    patientId: "PAT007",
    type: "Check-up", 
    date: "2024-01-20", 
    time: "02:30 PM", 
    duration: "30 min",
    status: "SCHEDULED", 
    reason: "Cardiac follow-up",
    department: "Cardiology"
  },
  { 
    id: "APT008", 
    patient: "Amanda Taylor", 
    patientId: "PAT008",
    type: "Consultation", 
    date: "2024-01-21", 
    time: "09:00 AM", 
    duration: "45 min",
    status: "SCHEDULED", 
    reason: "Heart palpitations",
    department: "Cardiology"
  },
  { 
    id: "APT009", 
    patient: "David Martinez", 
    patientId: "PAT009",
    type: "Follow-up", 
    date: "2024-01-21", 
    time: "10:00 AM", 
    duration: "30 min",
    status: "CONFIRMED", 
    reason: "Blood pressure check",
    department: "Cardiology"
  },
  { 
    id: "APT010", 
    patient: "Lisa Anderson", 
    patientId: "PAT010",
    type: "Consultation", 
    date: "2024-01-19", 
    time: "03:00 PM", 
    duration: "45 min",
    status: "CANCELLED", 
    reason: "Patient requested cancellation",
    department: "Cardiology"
  },
  { 
    id: "APT011", 
    patient: "James Thompson", 
    patientId: "PAT011",
    type: "Follow-up", 
    date: "2024-01-19", 
    time: "04:00 PM", 
    duration: "30 min",
    status: "NO_SHOW", 
    reason: "Routine follow-up",
    department: "General Medicine"
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300" },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  NO_SHOW: { label: "No Show", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
}

export default function DoctorAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("today")

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your patient appointments and consultations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
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
                  <PlayCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">Completed Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Pending Confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search appointments..."
                  className="pl-8"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Dates</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="NO_SHOW">No Show</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="hidden lg:table-cell">Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments
                    .filter(apt => statusFilter === "all" || apt.status === statusFilter)
                    .map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {appointment.patient.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-xs text-muted-foreground">{appointment.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{appointment.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{appointment.date}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {appointment.time} ({appointment.duration})
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground max-w-[200px] truncate">
                        {appointment.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[appointment.status]?.className}>
                          {statusConfig[appointment.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserRound className="mr-2 h-4 w-4" />
                              Patient Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Medical Records
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {appointment.status === "SCHEDULED" && (
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                Confirm Appointment
                              </DropdownMenuItem>
                            )}
                            {(appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED") && (
                              <DropdownMenuItem>
                                <PlayCircle className="mr-2 h-4 w-4 text-emerald-600" />
                                Start Consultation
                              </DropdownMenuItem>
                            )}
                            {appointment.status === "IN_PROGRESS" && (
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                Complete Consultation
                              </DropdownMenuItem>
                            )}
                            {(appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED") && (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Appointment
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
