"use client"

import { StatsCardGroup } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Edit,
  Users,
  Calendar,
  DollarSign,
  Building2,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Activity
} from "lucide-react"
import Link from "next/link"

// Mock department data
const department = {
  id: "dept-001",
  name: "Cardiology",
  description: "Heart and cardiovascular system care, including diagnosis and treatment of heart conditions",
  head: "Dr. Sarah Wilson",
  phone: "+1 (555) 100-1001",
  email: "cardiology@hospital.local",
  location: "Building A, Floor 3",
  established: "2010",
  status: "Active",
}

const stats = [
  { title: "Total Doctors", value: "12", icon: Users, trend: { value: 2, isPositive: true } },
  { title: "Nurses", value: "18", icon: Users, trend: { value: 1, isPositive: true } },
  { title: "Today's Patients", value: "45", icon: Calendar, trend: { value: 5, isPositive: true } },
  { title: "Monthly Revenue", value: "$85,500", icon: DollarSign, trend: { value: 12, isPositive: true } },
]

const doctors = [
  { id: "1", name: "Dr. Sarah Wilson", email: "sarah.wilson@hospital.local", specialization: "Interventional Cardiology", patients: 234, status: "Active", avatar: "" },
  { id: "2", name: "Dr. Michael Chen", email: "michael.chen@hospital.local", specialization: "Electrophysiology", patients: 189, status: "Active", avatar: "" },
  { id: "3", name: "Dr. Lisa Park", email: "lisa.park@hospital.local", specialization: "Heart Failure", patients: 156, status: "Active", avatar: "" },
  { id: "4", name: "Dr. James Lee", email: "james.lee@hospital.local", specialization: "Cardiac Imaging", patients: 145, status: "On Leave", avatar: "" },
  { id: "5", name: "Dr. Emily Brown", email: "emily.brown@hospital.local", specialization: "General Cardiology", patients: 198, status: "Active", avatar: "" },
]

const nurses = [
  { id: "1", name: "Nurse Emily Davis", email: "emily.davis@hospital.local", shift: "Day", patients: 12, status: "Active" },
  { id: "2", name: "Nurse Robert Johnson", email: "robert.johnson@hospital.local", shift: "Night", patients: 8, status: "Active" },
  { id: "3", name: "Nurse Sarah Miller", email: "sarah.miller@hospital.local", shift: "Day", patients: 10, status: "Active" },
  { id: "4", name: "Nurse John Smith", email: "john.smith@hospital.local", shift: "Evening", patients: 15, status: "On Leave" },
]

const recentAppointments = [
  { id: "A001", patient: "John Doe", doctor: "Dr. Sarah Wilson", time: "09:00 AM", type: "Follow-up", status: "COMPLETED" },
  { id: "A002", patient: "Jane Smith", doctor: "Dr. Michael Chen", time: "09:30 AM", type: "Consultation", status: "IN_PROGRESS" },
  { id: "A003", patient: "Bob Johnson", doctor: "Dr. Lisa Park", time: "10:00 AM", type: "Check-up", status: "SCHEDULED" },
  { id: "A004", patient: "Alice Brown", doctor: "Dr. Emily Brown", time: "10:30 AM", type: "Follow-up", status: "SCHEDULED" },
]

const weeklyStats = [
  { day: "Mon", patients: 42, revenue: 12500 },
  { day: "Tue", patients: 38, revenue: 11200 },
  { day: "Wed", patients: 45, revenue: 13800 },
  { day: "Thu", patients: 51, revenue: 15600 },
  { day: "Fri", patients: 48, revenue: 14200 },
  { day: "Sat", patients: 32, revenue: 9600 },
  { day: "Sun", patients: 28, revenue: 8400 },
]

export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/departments">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{department.name}</h1>
              <p className="text-muted-foreground">
                Department overview and management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Live Status
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Department
            </Button>
          </div>
        </div>

        {/* Department Info Card */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">{department.name}</h2>
                  <Badge variant="default">{department.status}</Badge>
                </div>
                <p className="text-muted-foreground mt-1">{department.description}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Head: {department.head}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {department.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {department.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {department.location}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <StatsCardGroup cards={stats} />

        <Tabs defaultValue="doctors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="doctors">Doctors ({doctors.length})</TabsTrigger>
            <TabsTrigger value="nurses">Nurses ({nurses.length})</TabsTrigger>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Department Doctors</CardTitle>
                    <CardDescription>All doctors in {department.name}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Assign Doctor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={doctor.avatar} alt={doctor.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {doctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-xs text-muted-foreground">{doctor.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.specialization}</TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell>
                          <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nurses">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Department Nurses</CardTitle>
                    <CardDescription>All nurses in {department.name}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Assign Nurse
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nurse</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Assigned Patients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nurses.map((nurse) => (
                      <TableRow key={nurse.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{nurse.name}</p>
                            <p className="text-xs text-muted-foreground">{nurse.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{nurse.shift}</Badge>
                        </TableCell>
                        <TableCell>{nurse.patients}</TableCell>
                        <TableCell>
                          <Badge variant={nurse.status === "Active" ? "default" : "secondary"}>
                            {nurse.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
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
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-mono">{apt.id}</TableCell>
                        <TableCell className="font-medium">{apt.patient}</TableCell>
                        <TableCell>{apt.doctor}</TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>{apt.type}</TableCell>
                        <TableCell>
                          <Badge variant={
                            apt.status === "COMPLETED" ? "default" :
                            apt.status === "IN_PROGRESS" ? "secondary" : "outline"
                          }>
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

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Patient Flow */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Weekly Patient Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((stat) => (
                      <div key={stat.day} className="flex items-center gap-4">
                        <span className="w-8 text-sm font-medium">{stat.day}</span>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(stat.patients / 60) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-muted-foreground">{stat.patients}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Overview */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((stat) => (
                      <div key={stat.day} className="flex items-center gap-4">
                        <span className="w-8 text-sm font-medium">{stat.day}</span>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${(stat.revenue / 20000) * 100}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm text-muted-foreground">${(stat.revenue / 1000).toFixed(1)}k</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-none shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-primary">98.5%</p>
                      <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-green-600">15 min</p>
                      <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-blue-600">45</p>
                      <p className="text-sm text-muted-foreground">Daily Appointments</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-amber-600">12</p>
                      <p className="text-sm text-muted-foreground">Active Beds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
