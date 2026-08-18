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
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Activity,
  FileText,
  Pill,
  Stethoscope,
  Video,
  PlayCircle,
  CheckCircle2,
  XCircle,
  HeartPulse,
  Thermometer,
  AlertCircle,
  ClipboardList,
  Printer,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock appointment data
const appointmentData = {
  id: "APT001",
  patient: {
    id: "PAT001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 200-0001",
    dateOfBirth: "1979-03-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main Street, Springfield, IL 62701",
    allergies: ["Penicillin"],
    avatar: "JS",
  },
  type: "Follow-up",
  date: "2024-01-20",
  time: "09:00 AM",
  duration: "30 min",
  status: "IN_PROGRESS",
  reason: "Hypertension follow-up",
  department: "Cardiology",
  notes: "Patient reports good adherence to medication. Blood pressure has been stable at home readings.",
  vitals: {
    bloodPressure: "140/90",
    heartRate: 78,
    temperature: "98.6°F",
    weight: "180 lbs",
    oxygenSaturation: "98%",
    recordedAt: "09:05 AM",
  },
  medicalHistory: [
    { condition: "Hypertension", diagnosedDate: "2020-05-15", status: "Active" },
    { condition: "Type 2 Diabetes", diagnosedDate: "2019-08-20", status: "Managed" },
    { condition: "Hyperlipidemia", diagnosedDate: "2020-05-15", status: "Active" },
  ],
  currentMedications: [
    { name: "Lisinopril 10mg", frequency: "Once daily", prescribed: "2023-06-01" },
    { name: "Metoprolol 50mg", frequency: "Twice daily", prescribed: "2023-06-01" },
    { name: "Metformin 500mg", frequency: "Twice daily", prescribed: "2019-08-20" },
  ],
  previousVisits: [
    { date: "2024-01-06", type: "Follow-up", notes: "BP improved, continue current medication" },
    { date: "2023-12-15", type: "Follow-up", notes: "Adjusted Lisinopril dosage" },
    { date: "2023-11-20", type: "Consultation", notes: "Routine check-up, all vitals normal" },
  ],
  labResults: [
    { test: "HbA1c", value: "6.8%", normalRange: "< 7.0%", status: "Normal", date: "2024-01-10" },
    { test: "Creatinine", value: "1.1 mg/dL", normalRange: "0.7-1.3 mg/dL", status: "Normal", date: "2024-01-10" },
    { test: "LDL Cholesterol", value: "115 mg/dL", normalRange: "< 100 mg/dL", status: "High", date: "2024-01-10" },
  ],
}

const statusConfig: Record<string, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300" },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function AppointmentDetailsPage() {
  const params = useParams()
  const appointmentId = params.id

  const apt = appointmentData

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/doctor/appointments">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
              <p className="text-muted-foreground">Appointment ID: {apt.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Patient
            </Button>
            {apt.status === "IN_PROGRESS" && (
              <Button>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Complete
              </Button>
            )}
            {apt.status === "CONFIRMED" && (
              <Button>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Consultation
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="space-y-6">
            {/* Patient Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {apt.patient.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{apt.patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{apt.patient.id}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{apt.patient.gender}, {new Date().getFullYear() - new Date(apt.patient.dateOfBirth).getFullYear()} yrs</Badge>
                      <Badge variant="outline" className="font-mono">{apt.patient.bloodGroup}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{apt.patient.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{apt.patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{apt.patient.address}</span>
                  </div>
                </div>

                {apt.patient.allergies.length > 0 && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Allergies</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {apt.patient.allergies.map((allergy, i) => (
                        <Badge key={i} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Link href={`/doctor/patients/${apt.patient.id}`}>
                  <Button variant="outline" className="w-full">
                    View Full Patient Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vitals Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Today&apos;s Vitals
                </CardTitle>
                <CardDescription>Recorded at {apt.vitals.recordedAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <HeartPulse className="h-4 w-4" />
                      <span className="text-xs">Blood Pressure</span>
                    </div>
                    <p className="text-lg font-semibold">{apt.vitals.bloodPressure}</p>
                    <Badge variant="destructive" className="mt-1 text-xs">High</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <HeartPulse className="h-4 w-4" />
                      <span className="text-xs">Heart Rate</span>
                    </div>
                    <p className="text-lg font-semibold">{apt.vitals.heartRate} bpm</p>
                    <Badge variant="outline" className="mt-1 text-xs">Normal</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-xs">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold">{apt.vitals.temperature}</p>
                    <Badge variant="outline" className="mt-1 text-xs">Normal</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Activity className="h-4 w-4" />
                      <span className="text-xs">O2 Saturation</span>
                    </div>
                    <p className="text-lg font-semibold">{apt.vitals.oxygenSaturation}</p>
                    <Badge variant="outline" className="mt-1 text-xs">Normal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apt.currentMedications.map((med, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-muted-foreground">{med.frequency}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Appointment Details & Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Info Card */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{apt.date}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{apt.time} ({apt.duration})</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={statusConfig[apt.status]?.className + " text-sm px-3 py-1"}>
                    {statusConfig[apt.status]?.label}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium">{apt.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{apt.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reason</p>
                    <p className="font-medium">{apt.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">{apt.duration}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Clinical Notes</p>
                  <p className="text-sm">{apt.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="history" className="space-y-4">
              <TabsList>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="lab">Lab Results</TabsTrigger>
                <TabsTrigger value="visits">Previous Visits</TabsTrigger>
              </TabsList>

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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apt.medicalHistory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.condition}</TableCell>
                            <TableCell>{item.diagnosedDate}</TableCell>
                            <TableCell>
                              <Badge variant={item.status === "Active" ? "destructive" : "outline"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lab">
                <Card className="border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Recent Lab Results</CardTitle>
                    <span className="text-xs text-muted-foreground">Date: {apt.labResults[0]?.date}</span>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Normal Range</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apt.labResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{result.test}</TableCell>
                            <TableCell>{result.value}</TableCell>
                            <TableCell className="text-muted-foreground">{result.normalRange}</TableCell>
                            <TableCell>
                              <Badge variant={result.status === "Normal" ? "outline" : "destructive"}>
                                {result.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button variant="outline" className="w-full mt-4">
                      Request New Lab Tests
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visits">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Previous Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apt.previousVisits.map((visit, index) => (
                        <div key={index} className="p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{visit.type}</Badge>
                              <span className="font-medium">{visit.date}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{visit.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="border-none shadow-md bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Write Prescription</span>
                  </Button>
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <Stethoscope className="h-5 w-5" />
                    <span className="text-xs">Request Lab Test</span>
                  </Button>
                  <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-xs">Add Notes</span>
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
