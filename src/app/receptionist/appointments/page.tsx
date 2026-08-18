"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Calendar,
  Search,
  Filter,
  CalendarCheck,
  Phone,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  UserRound,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const appointments = [
  { id: "APT001", patient: "John Smith", patientId: "P001", phone: "+1 234-567-8901", doctor: "Dr. Sarah Wilson", department: "Cardiology", date: "2024-01-15", time: "09:00 AM", status: "CONFIRMED", type: "Consultation" },
  { id: "APT002", patient: "Emily Davis", patientId: "P002", phone: "+1 234-567-8902", doctor: "Dr. Michael Brown", department: "Neurology", date: "2024-01-15", time: "09:30 AM", status: "SCHEDULED", type: "Follow-up" },
  { id: "APT003", patient: "Robert Johnson", patientId: "P003", phone: "+1 234-567-8903", doctor: "Dr. Lisa Chen", department: "Orthopedics", date: "2024-01-15", time: "10:00 AM", status: "IN_PROGRESS", type: "Check-up" },
  { id: "APT004", patient: "Sarah Miller", patientId: "P004", phone: "+1 234-567-8904", doctor: "Dr. James Wilson", department: "Pediatrics", date: "2024-01-15", time: "10:30 AM", status: "CONFIRMED", type: "Vaccination" },
  { id: "APT005", patient: "Michael Lee", patientId: "P005", phone: "+1 234-567-8905", doctor: "Dr. Emma Thompson", department: "General", date: "2024-01-15", time: "11:00 AM", status: "SCHEDULED", type: "Consultation" },
  { id: "APT006", patient: "Jennifer White", patientId: "P006", phone: "+1 234-567-8906", doctor: "Dr. David Kim", department: "Dermatology", date: "2024-01-15", time: "11:30 AM", status: "COMPLETED", type: "Follow-up" },
  { id: "APT007", patient: "David Brown", patientId: "P007", phone: "+1 234-567-8907", doctor: "Dr. Sarah Wilson", department: "Cardiology", date: "2024-01-15", time: "12:00 PM", status: "CANCELLED", type: "Check-up" },
  { id: "APT008", patient: "Lisa Anderson", patientId: "P008", phone: "+1 234-567-8908", doctor: "Dr. Michael Brown", department: "Neurology", date: "2024-01-15", time: "02:00 PM", status: "SCHEDULED", type: "Consultation" },
  { id: "APT009", patient: "James Wilson", patientId: "P009", phone: "+1 234-567-8909", doctor: "Dr. Lisa Chen", department: "Orthopedics", date: "2024-01-16", time: "09:00 AM", status: "SCHEDULED", type: "Follow-up" },
  { id: "APT010", patient: "Patricia Taylor", patientId: "P010", phone: "+1 234-567-8910", doctor: "Dr. James Wilson", department: "Pediatrics", date: "2024-01-16", time: "09:30 AM", status: "CONFIRMED", type: "Vaccination" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
    case "SCHEDULED":
      return <Badge variant="secondary">Scheduled</Badge>
    case "IN_PROGRESS":
      return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>
    case "COMPLETED":
      return <Badge variant="outline" className="border-green-500 text-green-600">Completed</Badge>
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>
    case "NO_SHOW":
      return <Badge variant="outline" className="border-red-500 text-red-600">No Show</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function AppointmentsPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage and track all patient appointments
            </p>
          </div>
          <Button asChild>
            <Link href="/receptionist/appointments/book">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Book New Appointment
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by patient name or ID..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="general">General</SelectItem>
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
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
            <CardDescription>
              A list of all appointments with their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appointment ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Doctor</TableHead>
                    <TableHead className="hidden lg:table-cell">Department</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <UserRound className="h-3 w-3" />
                            {appointment.patientId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <p>{appointment.doctor}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {appointment.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{appointment.department}</TableCell>
                      <TableCell>
                        <div>
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {appointment.date}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarCheck className="mr-2 h-4 w-4" />
                              Check In Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md bg-green-50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">45</p>
              <p className="text-sm text-green-700">Confirmed</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-amber-50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">28</p>
              <p className="text-sm text-amber-700">Scheduled</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-blue-50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-red-50">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">5</p>
              <p className="text-sm text-red-700">Cancelled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
