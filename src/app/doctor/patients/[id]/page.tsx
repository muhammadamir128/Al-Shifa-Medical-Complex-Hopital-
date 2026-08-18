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
  User,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Activity,
  FileText,
  Pill,
  Calendar,
  Clock,
  HeartPulse,
  Thermometer,
  AlertCircle,
  Edit,
  Printer,
  MessageSquare,
  Video,
  ClipboardList,
  Stethoscope,
  TestTubes,
  TrendingUp,
  TrendingDown,
  Minus,
  UserRound,
  Cake,
  Ruler,
  Weight,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock patient data
const patientData = {
  id: "PAT001",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "(555) 200-0001",
  dateOfBirth: "1979-03-15",
  gender: "Male",
  bloodGroup: "O+",
  address: "123 Main Street, Springfield, IL 62701",
  emergencyContact: {
    name: "Jane Smith",
    relationship: "Spouse",
    phone: "(555) 200-0002",
  },
  allergies: ["Penicillin"],
  avatar: "JS",
  status: "Active",
  registrationDate: "2020-05-15",
  primaryDoctor: "Dr. Michael Chen",
  department: "Cardiology",
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BCB-123456789",
    groupNumber: "GRP-987654",
  },
  vitals: {
    latest: {
      bloodPressure: "140/90",
      heartRate: 78,
      temperature: "98.6°F",
      weight: "180 lbs",
      height: "5'10\"",
      oxygenSaturation: "98%",
      bmi: "25.8",
      recordedAt: "2024-01-20 09:05 AM",
    },
    history: [
      { date: "2024-01-20", bp: "140/90", heartRate: 78, temp: "98.6°F", weight: "180 lbs" },
      { date: "2024-01-06", bp: "138/88", heartRate: 76, temp: "98.4°F", weight: "182 lbs" },
      { date: "2023-12-15", bp: "142/92", heartRate: 80, temp: "98.5°F", weight: "181 lbs" },
      { date: "2023-11-20", bp: "145/95", heartRate: 82, temp: "98.4°F", weight: "183 lbs" },
    ],
  },
  medicalHistory: [
    { condition: "Hypertension", diagnosedDate: "2020-05-15", status: "Active", notes: "Controlled with medication" },
    { condition: "Type 2 Diabetes", diagnosedDate: "2019-08-20", status: "Managed", notes: "Diet-controlled, metformin" },
    { condition: "Hyperlipidemia", diagnosedDate: "2020-05-15", status: "Active", notes: "On statin therapy" },
    { condition: "Obesity", diagnosedDate: "2018-01-10", status: "Active", notes: "BMI > 25" },
  ],
  currentMedications: [
    { name: "Lisinopril 10mg", frequency: "Once daily", prescribed: "2023-06-01", status: "Active", refills: 3 },
    { name: "Metoprolol 50mg", frequency: "Twice daily", prescribed: "2023-06-01", status: "Active", refills: 2 },
    { name: "Metformin 500mg", frequency: "Twice daily", prescribed: "2019-08-20", status: "Active", refills: 5 },
    { name: "Atorvastatin 20mg", frequency: "Once daily at bedtime", prescribed: "2020-05-15", status: "Active", refills: 4 },
  ],
  appointments: [
    { id: "APT001", date: "2024-01-20", time: "09:00 AM", type: "Follow-up", status: "IN_PROGRESS", reason: "Hypertension check" },
    { id: "APT012", date: "2024-02-15", time: "10:00 AM", type: "Follow-up", status: "SCHEDULED", reason: "Routine check-up" },
    { id: "APT008", date: "2024-01-06", time: "09:00 AM", type: "Follow-up", status: "COMPLETED", reason: "BP monitoring" },
    { id: "APT003", date: "2023-12-15", time: "02:00 PM", type: "Consultation", status: "COMPLETED", reason: "Medication adjustment" },
  ],
  labResults: [
    { test: "HbA1c", value: "6.8%", normalRange: "< 7.0%", status: "Normal", date: "2024-01-10", trend: "down" },
    { test: "Creatinine", value: "1.1 mg/dL", normalRange: "0.7-1.3 mg/dL", status: "Normal", date: "2024-01-10", trend: "stable" },
    { test: "LDL Cholesterol", value: "115 mg/dL", normalRange: "< 100 mg/dL", status: "High", date: "2024-01-10", trend: "down" },
    { test: "HDL Cholesterol", value: "45 mg/dL", normalRange: "> 40 mg/dL", status: "Normal", date: "2024-01-10", trend: "up" },
    { test: "Fasting Glucose", value: "110 mg/dL", normalRange: "70-100 mg/dL", status: "High", date: "2024-01-10", trend: "stable" },
    { test: "BUN", value: "18 mg/dL", normalRange: "7-20 mg/dL", status: "Normal", date: "2024-01-10", trend: "stable" },
  ],
  immunizations: [
    { name: "Influenza", date: "2023-10-15", nextDue: "2024-10-15", status: "Current" },
    { name: "Tetanus/Diphtheria", date: "2020-05-20", nextDue: "2030-05-20", status: "Current" },
    { name: "Pneumococcal", date: "2022-03-10", nextDue: "2027-03-10", status: "Current" },
    { name: "COVID-19 Booster", date: "2023-09-01", nextDue: "2024-09-01", status: "Due Soon" },
  ],
  documents: [
    { name: "ECG Report", date: "2024-01-10", type: "PDF", size: "1.2 MB" },
    { name: "Chest X-Ray", date: "2023-11-15", type: "DICOM", size: "5.4 MB" },
    { name: "Lab Results Summary", date: "2024-01-10", type: "PDF", size: "0.5 MB" },
  ],
}

const statusConfig: Record<string, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300" },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function PatientDetailsPage() {
  const params = useParams()
  const patientId = params.id

  const patient = patientData

  const calculateAge = (dob: string) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/doctor/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Patient Profile</h1>
              <p className="text-muted-foreground">Patient ID: {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Summary
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Patient Overview Card */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {patient.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{patient.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline">{patient.gender}</Badge>
                    <Badge variant="outline">{calculateAge(patient.dateOfBirth)} years</Badge>
                    <Badge variant="outline" className="font-mono">{patient.bloodGroup}</Badge>
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Primary Doctor</p>
                  <p className="font-medium">{patient.primaryDoctor}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="font-medium">{patient.department}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                  <p className="font-medium">{patient.vitals.latest.recordedAt.split(" ")[0]}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Patient Since</p>
                  <p className="font-medium">{patient.registrationDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cake className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.dateOfBirth}</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{patient.emergencyContact.name}</p>
                <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                <p className="text-sm mt-2">{patient.emergencyContact.phone}</p>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="border-none shadow-md border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-red-600">
                  <Droplets className="h-5 w-5" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, i) => (
                      <Badge key={i} variant="destructive" className="text-sm">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No known allergies</p>
                )}
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary" />
                  Insurance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Provider</p>
                  <p className="font-medium text-sm">{patient.insurance.provider}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Policy Number</p>
                  <p className="font-medium text-sm">{patient.insurance.policyNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Group Number</p>
                  <p className="font-medium text-sm">{patient.insurance.groupNumber}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vitals Overview */}
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5 text-primary" />
                  Latest Vitals
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  Recorded: {patient.vitals.latest.recordedAt}
                </span>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <HeartPulse className="h-5 w-5 mx-auto mb-2 text-red-500" />
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="text-lg font-semibold">{patient.vitals.latest.bloodPressure}</p>
                    <Badge variant="destructive" className="mt-1 text-xs">High</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <Activity className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="text-lg font-semibold">{patient.vitals.latest.heartRate} bpm</p>
                    <Badge variant="outline" className="mt-1 text-xs">Normal</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-lg font-semibold">{patient.vitals.latest.temperature}</p>
                    <Badge variant="outline" className="mt-1 text-xs">Normal</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <Weight className="h-5 w-5 mx-auto mb-2 text-green-500" />
                    <p className="text-xs text-muted-foreground">Weight / BMI</p>
                    <p className="text-lg font-semibold">{patient.vitals.latest.weight}</p>
                    <Badge variant="outline" className="mt-1 text-xs">BMI: {patient.vitals.latest.bmi}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed information */}
            <Tabs defaultValue="medications" className="space-y-4">
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="lab">Lab Results</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
              </TabsList>

              {/* Medications Tab */}
              <TabsContent value="medications">
                <Card className="border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Current Medications</CardTitle>
                    <Link href="/doctor/prescriptions/create">
                      <Button size="sm">
                        <Pill className="mr-2 h-4 w-4" />
                        New Prescription
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patient.currentMedications.map((med, index) => (
                        <div key={index} className="p-4 rounded-lg border flex items-center justify-between">
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-muted-foreground">{med.frequency}</p>
                            <p className="text-xs text-muted-foreground mt-1">Prescribed: {med.prescribed}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{med.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{med.refills} refills left</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical History Tab */}
              <TabsContent value="history">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Condition</TableHead>
                          <TableHead>Diagnosed</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.medicalHistory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.condition}</TableCell>
                            <TableCell>{item.diagnosedDate}</TableCell>
                            <TableCell>
                              <Badge variant={item.status === "Active" ? "destructive" : "outline"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{item.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Lab Results Tab */}
              <TabsContent value="lab">
                <Card className="border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Lab Results</CardTitle>
                    <Button size="sm" variant="outline">
                      <TestTubes className="mr-2 h-4 w-4" />
                      Request Lab Test
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Normal Range</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.labResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {result.test}
                                {result.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                                {result.trend === "down" && <TrendingDown className="h-3 w-3 text-blue-500" />}
                                {result.trend === "stable" && <Minus className="h-3 w-3 text-muted-foreground" />}
                              </div>
                            </TableCell>
                            <TableCell>{result.value}</TableCell>
                            <TableCell className="text-muted-foreground">{result.normalRange}</TableCell>
                            <TableCell>
                              <Badge variant={result.status === "Normal" ? "outline" : "destructive"}>
                                {result.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{result.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Appointment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.appointments.map((apt, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{apt.date}</p>
                                <p className="text-xs text-muted-foreground">{apt.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{apt.type}</Badge>
                            </TableCell>
                            <TableCell>{apt.reason}</TableCell>
                            <TableCell>
                              <Badge className={statusConfig[apt.status]?.className}>
                                {statusConfig[apt.status]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Link href={`/doctor/appointments/${apt.id}`}>
                                <Button variant="ghost" size="sm">View</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Immunizations Tab */}
              <TabsContent value="immunizations">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Immunization Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vaccine</TableHead>
                          <TableHead>Date Administered</TableHead>
                          <TableHead>Next Due</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.immunizations.map((imm, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{imm.name}</TableCell>
                            <TableCell>{imm.date}</TableCell>
                            <TableCell>{imm.nextDue}</TableCell>
                            <TableCell>
                              <Badge variant={imm.status === "Current" ? "outline" : "secondary"}>
                                {imm.status}
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

            {/* Quick Actions */}
            <Card className="border-none shadow-md bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link href="/doctor/prescriptions/create">
                    <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                      <Pill className="h-5 w-5" />
                      <span className="text-xs">Prescribe</span>
                    </Button>
                  </Link>
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <TestTubes className="h-5 w-5" />
                    <span className="text-xs">Lab Request</span>
                  </Button>
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Add Note</span>
                  </Button>
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <Video className="h-5 w-5" />
                    <span className="text-xs">Video Call</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
