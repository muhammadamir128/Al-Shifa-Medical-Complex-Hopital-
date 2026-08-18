"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Droplet,
  Clock,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"

const patient = {
  id: "P-001",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 234-5678",
  dateOfBirth: "1985-06-15",
  age: 38,
  gender: "Male",
  bloodGroup: "O+",
  address: "123 Main Street, New York, NY 10001",
  emergencyContact: "Jane Smith",
  emergencyPhone: "+1 (555) 234-5679",
  insuranceNumber: "INS-2024-78543",
  insuranceProvider: "BlueCross BlueShield",
  status: "Active",
  registeredDate: "2023-01-15",
  lastVisit: "2024-01-10",
  nextAppointment: "2024-01-25",
}

const appointments = [
  { id: "A001", date: "2024-01-25", time: "10:00 AM", doctor: "Dr. Sarah Wilson", department: "Cardiology", type: "Follow-up", status: "SCHEDULED" },
  { id: "A002", date: "2024-01-10", time: "09:30 AM", doctor: "Dr. Michael Brown", department: "General Medicine", type: "Consultation", status: "COMPLETED" },
  { id: "A003", date: "2023-12-15", time: "02:00 PM", doctor: "Dr. Lisa Chen", department: "Orthopedics", type: "Check-up", status: "COMPLETED" },
  { id: "A004", date: "2023-11-20", time: "11:00 AM", doctor: "Dr. Sarah Wilson", department: "Cardiology", type: "Follow-up", status: "CANCELLED" },
]

const bills = [
  { id: "INV-2024-001", date: "Jan 10, 2024", doctor: "Dr. Michael Brown", amount: 250, status: "PAID" },
  { id: "INV-2024-002", date: "Dec 15, 2023", doctor: "Dr. Lisa Chen", amount: 470, status: "PAID" },
  { id: "INV-2024-003", date: "Nov 20, 2023", doctor: "Dr. Sarah Wilson", amount: 150, status: "OVERDUE" },
]

const appointmentStatusColors: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30",
  COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30",
  CONFIRMED: "bg-green-100 text-green-700 dark:bg-green-900/30",
}

const billStatusColors: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30",
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30",
  OVERDUE: "bg-red-100 text-red-700 dark:bg-red-900/30",
}

export default function ReceptionistPatientDetailPage({ params }: { params: { id: string } }) {
  const totalDue = bills.filter((b) => b.status !== "PAID").reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/receptionist/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patient Details</h1>
            <p className="text-muted-foreground">View patient information and manage appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/receptionist/appointments/book">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold">{patient.name}</h2>
                <Badge variant="outline">{patient.id}</Badge>
                <Badge variant="default">{patient.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {patient.gender}, {patient.age} yrs
                </div>
                <div className="flex items-center gap-1">
                  <Droplet className="h-4 w-4" />
                  {patient.bloodGroup}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  DOB: {patient.dateOfBirth}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {patient.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {patient.phone}
                </div>
              </div>
            </div>
            {totalDue > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1 text-sm px-3 py-1.5">
                <AlertCircle className="h-4 w-4" />
                ${totalDue} Due
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Completed Visits", value: appointments.filter(a => a.status === "COMPLETED").length, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Upcoming", value: appointments.filter(a => a.status === "SCHEDULED").length, icon: Clock, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
          { label: "Outstanding Bills", value: `$${totalDue}`, icon: Receipt, color: totalDue > 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Appointment History
                  </CardTitle>
                  <Link href="/receptionist/appointments/book">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Book New
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{apt.date}</p>
                              <p className="text-xs text-muted-foreground">{apt.time}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{apt.doctor}</p>
                              <p className="text-xs text-muted-foreground">{apt.department}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{apt.type}</TableCell>
                          <TableCell>
                            <Badge className={appointmentStatusColors[apt.status] ?? ""} variant="outline">
                              {apt.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-mono text-sm">{bill.id}</TableCell>
                          <TableCell className="text-sm">{bill.date}</TableCell>
                          <TableCell className="text-sm">{bill.doctor}</TableCell>
                          <TableCell className="font-medium">${bill.amount}</TableCell>
                          <TableCell>
                            <Badge className={billStatusColors[bill.status] ?? ""} variant="outline">
                              {bill.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium flex items-start gap-2 mt-1">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  {patient.address}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Emergency Contact</p>
                <p className="text-sm font-medium mt-1">{patient.emergencyContact}</p>
                <p className="text-xs text-muted-foreground">{patient.emergencyPhone}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Insurance</p>
                <p className="text-sm font-medium mt-1">{patient.insuranceProvider}</p>
                <p className="text-xs font-mono text-muted-foreground">{patient.insuranceNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Patient Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Registered</p>
                    <p className="text-xs text-muted-foreground">{patient.registeredDate}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Last Visit</p>
                    <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Next Appointment</p>
                    <p className="text-xs text-muted-foreground">{patient.nextAppointment}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/receptionist/appointments/book" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="/receptionist/billing" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="mr-2 h-4 w-4" />
                  Manage Billing
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
