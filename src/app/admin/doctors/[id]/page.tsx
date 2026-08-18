"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Edit,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Star,
  GraduationCap,
  Award,
  Stethoscope,
  UserRound,
  Activity,
  FileText,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const doctor = {
  id: "DOC-001",
  name: "Dr. Sarah Wilson",
  email: "sarah.wilson@hospital.com",
  phone: "(555) 123-4001",
  specialization: "Cardiology",
  department: "Cardiology",
  qualification: "MD, FACC",
  experience: "15 years",
  licenseNumber: "IL-MD-789012",
  npiNumber: "9876543210",
  joiningDate: "2009-03-10",
  room: "Room 301, Building B",
  status: "Available",
  rating: 4.9,
  consultations: 234,
  avatar: "",
  bio: "Dr. Sarah Wilson is a board-certified cardiologist with over 15 years of experience in interventional cardiology. She specializes in complex coronary interventions and structural heart disease.",
}

const education = [
  { degree: "MD", institution: "Harvard Medical School", year: "2006" },
  { degree: "Residency - Internal Medicine", institution: "Johns Hopkins Hospital", year: "2009" },
  { degree: "Fellowship - Cardiology", institution: "Cleveland Clinic", year: "2012" },
]

const certifications = [
  { name: "American Board of Internal Medicine", year: "2009", expires: "2029" },
  { name: "American Board of Cardiovascular Disease", year: "2012", expires: "2027" },
  { name: "Advanced Cardiac Life Support (ACLS)", year: "2023", expires: "2025" },
]

const schedule = [
  { day: "Monday", hours: "09:00 - 17:00", slots: 12, booked: 10 },
  { day: "Tuesday", hours: "09:00 - 17:00", slots: 12, booked: 11 },
  { day: "Wednesday", hours: "09:00 - 13:00", slots: 6, booked: 6 },
  { day: "Thursday", hours: "09:00 - 17:00", slots: 12, booked: 9 },
  { day: "Friday", hours: "09:00 - 15:00", slots: 8, booked: 7 },
]

const recentAppointments = [
  { id: "A001", date: "2024-01-20", time: "10:00 AM", patient: "John Smith", type: "Follow-up", status: "SCHEDULED" },
  { id: "A002", date: "2024-01-18", time: "09:30 AM", patient: "Emily Davis", type: "Consultation", status: "COMPLETED" },
  { id: "A003", date: "2024-01-15", time: "02:00 PM", patient: "Robert Johnson", type: "Check-up", status: "COMPLETED" },
  { id: "A004", date: "2024-01-12", time: "11:00 AM", patient: "Sarah Miller", type: "Emergency", status: "COMPLETED" },
]

const statusColors: Record<string, string> = {
  Available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "In Surgery": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "On Leave": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  "On Duty": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
}

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/doctors">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doctor Profile</h1>
            <p className="text-muted-foreground">View complete doctor information and schedule</p>
          </div>
        </div>
        <Link href={`/admin/doctors/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Doctor
          </Button>
        </Link>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <Badge variant="outline">{doctor.id}</Badge>
                <Badge className={statusColors[doctor.status] ?? ""}>{doctor.status}</Badge>
              </div>
              <p className="text-primary font-medium mt-1">{doctor.specialization}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {doctor.department}
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {doctor.qualification}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {doctor.experience}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {doctor.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {doctor.room}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold">{doctor.rating}</p>
              <p className="text-xs text-muted-foreground">{doctor.consultations} consultations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: "248", icon: UserRound, color: "bg-primary/10 text-primary" },
          { label: "This Month", value: "42", icon: Calendar, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Avg Wait Time", value: "12 min", icon: Clock, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Completion Rate", value: "96%", icon: Activity, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
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
        {/* Main Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAppointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{apt.date}</p>
                              <p className="text-xs text-muted-foreground">{apt.time}</p>
                            </div>
                          </TableCell>
                          <TableCell>{apt.patient}</TableCell>
                          <TableCell>{apt.type}</TableCell>
                          <TableCell>
                            <Badge variant={apt.status === "COMPLETED" ? "default" : "secondary"}>
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

            <TabsContent value="schedule">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Weekly Schedule
                  </CardTitle>
                  <CardDescription>Doctor&apos;s working hours and slot availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((day) => (
                      <div key={day.day} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="w-24 font-medium text-sm">{day.day}</span>
                          <span className="text-sm text-muted-foreground">{day.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{day.booked}/{day.slots} booked</span>
                          <Badge
                            variant={day.booked === day.slots ? "destructive" : "outline"}
                            className="text-xs"
                          >
                            {day.slots - day.booked} free
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <div className="space-y-4">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {education.map((edu, i) => (
                        <div key={i} className="p-3 rounded-lg border">
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {certifications.map((cert, i) => (
                        <div key={i} className="p-3 rounded-lg border">
                          <p className="font-medium text-sm">{cert.name}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">Issued: {cert.year}</Badge>
                            <Badge variant="secondary" className="text-xs">Expires: {cert.expires}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">License Number</p>
                <p className="font-medium font-mono text-sm">{doctor.licenseNumber}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">NPI Number</p>
                <p className="font-medium font-mono text-sm">{doctor.npiNumber}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Joining Date</p>
                <p className="font-medium text-sm">{doctor.joiningDate}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-medium text-sm">{doctor.department}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Bio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserRound className="mr-2 h-4 w-4" />
                View Patients
              </Button>
              <Link href={`/admin/doctors/${params.id}/edit`}>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
