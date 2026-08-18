"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Building2,
  FileText,
  ArrowLeft,
  CalendarCheck,
  CalendarX,
  MessageSquare,
  Share2,
  Printer,
  Download,
  AlertCircle,
  CheckCircle,
  Activity,
  Pill,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock appointment data - in real app this would be fetched based on ID
const appointmentData = {
  id: "APT-2024-1234",
  patient: {
    name: "John Smith",
    id: "P-12345",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    bloodType: "O+",
  },
  doctor: {
    name: "Dr. Sarah Wilson",
    id: "D-1001",
    email: "s.wilson@hospital.com",
    phone: "+1 (555) 987-6543",
    specialization: "Cardiology",
    rating: 4.8,
    experience: "15 years",
  },
  department: {
    name: "Cardiology",
    location: "Building A, Floor 3",
    phone: "+1 (555) 200-3000",
  },
  appointment: {
    date: "December 20, 2024",
    day: "Friday",
    time: "09:00 AM",
    endTime: "09:30 AM",
    duration: "30 minutes",
    type: "Follow-up",
    status: "CONFIRMED",
    reason: "Blood pressure check and medication review",
    notes: "Patient has been experiencing occasional headaches. Need to adjust medication dosage if BP is still elevated.",
    location: "Room 302, Building A",
    bookedOn: "December 15, 2024",
    consultationFee: "$150",
  },
  previousVisit: {
    date: "November 15, 2024",
    diagnosis: "Hypertension (controlled)",
    notes: "BP slightly elevated at 140/90. Continue Lisinopril 10mg daily. Follow up in 1 month.",
  },
  vitals: {
    bloodPressure: "135/85 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "165 lbs",
    height: "5'8\"",
    bmi: "25.1",
  },
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  CONFIRMED: "default",
  SCHEDULED: "secondary",
  COMPLETED: "outline",
  CANCELLED: "destructive",
  IN_PROGRESS: "default",
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircle className="h-4 w-4" />
    case "SCHEDULED":
      return <Calendar className="h-4 w-4" />
    case "COMPLETED":
      return <CheckCircle className="h-4 w-4" />
    case "CANCELLED":
      return <CalendarX className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

export default function AppointmentDetailsPage() {
  const params = useParams()
  const appointmentId = params.id

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/patient/appointments">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
              <p className="text-muted-foreground">
                ID: {appointmentId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <Card className={`border-none shadow-md ${
          appointmentData.appointment.status === "CONFIRMED" 
            ? "bg-green-50 border-green-200" 
            : appointmentData.appointment.status === "CANCELLED"
            ? "bg-red-50 border-red-200"
            : ""
        }`}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  appointmentData.appointment.status === "CONFIRMED"
                    ? "bg-green-100"
                    : appointmentData.appointment.status === "CANCELLED"
                    ? "bg-red-100"
                    : "bg-muted"
                }`}>
                  {getStatusIcon(appointmentData.appointment.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Status: {appointmentData.appointment.status}
                    </h3>
                    <Badge variant={statusColors[appointmentData.appointment.status]}>
                      {appointmentData.appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {appointmentData.appointment.status === "CONFIRMED"
                      ? "Your appointment is confirmed. Please arrive 15 minutes early."
                      : appointmentData.appointment.status === "CANCELLED"
                      ? "This appointment has been cancelled."
                      : "Your appointment is scheduled."}
                  </p>
                </div>
              </div>
              {(appointmentData.appointment.status === "CONFIRMED" || 
                appointmentData.appointment.status === "SCHEDULED") && (
                <Button variant="destructive" size="sm">
                  <CalendarX className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointment Info */}
          <div className="space-y-6">
            {/* Date & Time Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-5 w-5 text-primary" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{appointmentData.appointment.date}</p>
                    <p className="text-sm text-muted-foreground">{appointmentData.appointment.day}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {appointmentData.appointment.time} - {appointmentData.appointment.endTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {appointmentData.appointment.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{appointmentData.appointment.location}</p>
                    <p className="text-sm text-muted-foreground">{appointmentData.department.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-5 w-5 text-primary" />
                  Department
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">{appointmentData.department.name}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{appointmentData.department.location}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Contact</span>
                  <span className="font-medium">{appointmentData.department.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Type Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary" />
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="outline">{appointmentData.appointment.type}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Booked On</span>
                  <span className="font-medium">{appointmentData.appointment.bookedOn}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-medium text-primary">{appointmentData.appointment.consultationFee}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Doctor Info */}
          <div className="space-y-6">
            {/* Doctor Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Doctor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{appointmentData.doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{appointmentData.doctor.specialization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-amber-600 font-medium">
                        ⭐ {appointmentData.doctor.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • {appointmentData.doctor.experience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointmentData.doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointmentData.doctor.phone}</span>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Doctor
                </Button>
              </CardContent>
            </Card>

            {/* Reason for Visit */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary" />
                  Reason for Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{appointmentData.appointment.reason}</p>
                {appointmentData.appointment.notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium mb-2">Additional Notes:</p>
                      <p className="text-sm text-muted-foreground">{appointmentData.appointment.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - History & Vitals */}
          <div className="space-y-6">
            {/* Previous Visit */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5 text-primary" />
                  Previous Visit
                </CardTitle>
                <CardDescription>
                  {appointmentData.previousVisit.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Diagnosis</p>
                  <p className="text-sm text-muted-foreground">{appointmentData.previousVisit.diagnosis}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">{appointmentData.previousVisit.notes}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/patient/medical-history">
                    View Full Medical History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Last Recorded Vitals */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5 text-primary" />
                  Last Recorded Vitals
                </CardTitle>
                <CardDescription>
                  From your previous visit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="font-semibold">{appointmentData.vitals.bloodPressure}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="font-semibold">{appointmentData.vitals.heartRate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="font-semibold">{appointmentData.vitals.temperature}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="font-semibold">{appointmentData.vitals.weight}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="font-semibold">{appointmentData.vitals.height}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">BMI</p>
                    <p className="font-semibold">{appointmentData.vitals.bmi}</p>
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
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/patient/prescriptions">
                    <Pill className="mr-2 h-4 w-4" />
                    View Prescriptions
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/patient/medical-history">
                    <FileText className="mr-2 h-4 w-4" />
                    Medical History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Important Notice */}
        <Card className="border-none shadow-md bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800">Important Information</h4>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li>• Please arrive at least 15 minutes before your appointment time</li>
                  <li>• Bring your insurance card and a valid ID</li>
                  <li>• Bring a list of your current medications</li>
                  <li>• If you need to cancel, please do so at least 24 hours in advance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
