"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Calendar,
  MapPin,
  Heart,
  Droplet,
  Activity,
  FileText,
  Pill,
  ClipboardList,
  AlertCircle,
  User
} from "lucide-react"
import Link from "next/link"

// Mock patient data
const patient = {
  id: "P-001",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 234-5678",
  dateOfBirth: "1985-06-15",
  gender: "Male",
  bloodGroup: "O+",
  address: "123 Main Street, New York, NY 10001",
  emergencyContact: "Jane Smith - +1 (555) 234-5679",
  insuranceNumber: "INS-2024-78543",
  allergies: ["Penicillin", "Peanuts"],
  medicalConditions: ["Hypertension", "Type 2 Diabetes"],
  status: "Active",
  registeredDate: "2023-01-15",
  lastVisit: "2024-01-10",
  avatar: "",
}

const vitals = [
  { date: "2024-01-10", time: "09:30 AM", bp: "120/80", pulse: 72, temp: "98.6°F", weight: "180 lbs", recordedBy: "Nurse Emily Davis" },
  { date: "2024-01-05", time: "02:15 PM", bp: "118/78", pulse: 68, temp: "98.4°F", weight: "181 lbs", recordedBy: "Nurse Emily Davis" },
  { date: "2023-12-28", time: "11:00 AM", bp: "122/82", pulse: 74, temp: "98.8°F", weight: "182 lbs", recordedBy: "Nurse Robert Johnson" },
]

const appointments = [
  { id: "A001", date: "2024-01-20", time: "10:00 AM", doctor: "Dr. Sarah Wilson", department: "Cardiology", type: "Follow-up", status: "SCHEDULED" },
  { id: "A002", date: "2024-01-10", time: "09:30 AM", doctor: "Dr. Michael Brown", department: "General Medicine", type: "Consultation", status: "COMPLETED" },
  { id: "A003", date: "2023-12-15", time: "02:00 PM", doctor: "Dr. Lisa Chen", department: "Cardiology", type: "Check-up", status: "COMPLETED" },
]

const prescriptions = [
  { id: "RX001", date: "2024-01-10", doctor: "Dr. Michael Brown", medications: "Metformin, Lisinopril", status: "ACTIVE", refills: 2 },
  { id: "RX002", date: "2023-12-15", doctor: "Dr. Lisa Chen", medications: "Aspirin, Atorvastatin", status: "COMPLETED", refills: 0 },
]

const medicalRecords = [
  { id: "MR001", date: "2024-01-10", doctor: "Dr. Michael Brown", type: "Consultation", diagnosis: "Hypertension management", notes: "Blood pressure well controlled" },
  { id: "MR002", date: "2023-12-15", doctor: "Dr. Lisa Chen", type: "Check-up", diagnosis: "Type 2 Diabetes - Stable", notes: "Continue current medication" },
  { id: "MR003", date: "2023-06-20", doctor: "Dr. Sarah Wilson", type: "Lab Review", diagnosis: "Blood work analysis", notes: "All values within normal limits" },
]

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Patient Details</h1>
              <p className="text-muted-foreground">
                View complete patient information and medical history
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/admin/patients/${params.id}/records`}>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Medical Records
              </Button>
            </Link>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Patient
            </Button>
          </div>
        </div>

        {/* Patient Profile Card */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">{patient.name}</h2>
                  <Badge variant="outline">{patient.id}</Badge>
                  <Badge variant="default">{patient.status}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    DOB: {patient.dateOfBirth}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {patient.gender}
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplet className="h-4 w-4" />
                    {patient.bloodGroup}
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
              <div className="flex flex-col gap-2">
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Allergies: {patient.allergies.join(", ")}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {patient.medicalConditions.join(", ")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Medical Summary */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Medical Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-primary">12</p>
                        <p className="text-xs text-muted-foreground">Total Visits</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-primary">3</p>
                        <p className="text-xs text-muted-foreground">Active Meds</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-primary">2</p>
                        <p className="text-xs text-muted-foreground">Conditions</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-primary">2</p>
                        <p className="text-xs text-muted-foreground">Allergies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Medical Records */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Recent Medical Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {medicalRecords.slice(0, 3).map((record) => (
                        <div key={record.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{record.diagnosis}</p>
                            <p className="text-sm text-muted-foreground">{record.doctor} • {record.type}</p>
                            <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{record.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Appointment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
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
                                <p className="font-medium">{apt.date}</p>
                                <p className="text-xs text-muted-foreground">{apt.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{apt.doctor}</p>
                                <p className="text-xs text-muted-foreground">{apt.department}</p>
                              </div>
                            </TableCell>
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

              <TabsContent value="prescriptions">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Prescriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Medications</TableHead>
                          <TableHead>Refills</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescriptions.map((rx) => (
                          <TableRow key={rx.id}>
                            <TableCell className="font-mono">{rx.id}</TableCell>
                            <TableCell>{rx.date}</TableCell>
                            <TableCell>{rx.medications}</TableCell>
                            <TableCell>{rx.refills}</TableCell>
                            <TableCell>
                              <Badge variant={rx.status === "ACTIVE" ? "default" : "secondary"}>
                                {rx.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vitals">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Vital Signs History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>BP</TableHead>
                          <TableHead>Pulse</TableHead>
                          <TableHead>Temp</TableHead>
                          <TableHead>Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vitals.map((v, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{v.date}</p>
                                <p className="text-xs text-muted-foreground">{v.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>{v.bp}</TableCell>
                            <TableCell>{v.pulse} bpm</TableCell>
                            <TableCell>{v.temp}</TableCell>
                            <TableCell>{v.weight}</TableCell>
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
            {/* Contact Information */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    {patient.address}
                  </p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{patient.emergencyContact}</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Insurance Number</p>
                  <p className="font-medium font-mono">{patient.insuranceNumber}</p>
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
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm font-medium">Registered</p>
                      <p className="text-xs text-muted-foreground">{patient.registeredDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">Last Visit</p>
                      <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">Next Appointment</p>
                      <p className="text-xs text-muted-foreground">2024-01-20</p>
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
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Pill className="mr-2 h-4 w-4" />
                  New Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Record Vitals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Medical Record
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
