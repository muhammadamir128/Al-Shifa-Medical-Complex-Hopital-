"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Calendar,
  Clock,
  UserRound,
  Stethoscope,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  CheckCircle2,
  XCircle,
  Edit,
  Printer,
  MessageSquare,
  CalendarCheck,
  AlertCircle,
  Users,
  HeartPulse,
  History,
  MoreHorizontal,
  Send,
} from "lucide-react"
import Link from "next/link"
import { use } from "react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock appointment data - in real app this would be fetched based on the ID
const getAppointmentDetails = (id: string) => {
  return {
    id: id,
    patient: {
      id: "P001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234-567-8901",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      bloodGroup: "O+",
      address: "123 Main St, New York, NY 10001",
      emergencyContact: "Jane Smith - +1 234-567-8902",
      insuranceProvider: "Blue Cross Blue Shield",
      insuranceId: "BCBS123456",
      totalVisits: 12,
      lastVisit: "2024-01-10",
    },
    doctor: {
      id: "D001",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@hospital.com",
      phone: "+1 234-567-8903",
      department: "Cardiology",
      specialization: "Interventional Cardiology",
      consultationFee: 150,
      rating: 4.8,
      experience: "15 years",
    },
    appointment: {
      date: "2024-01-15",
      time: "09:00 AM",
      duration: "30 minutes",
      type: "Consultation",
      status: "CONFIRMED",
      priority: "Normal",
      reason: "Chest pain and shortness of breath during physical activity. Patient reports symptoms started 2 weeks ago.",
      notes: "Patient needs ECG and stress test. Follow-up appointment may be required based on results.",
      createdAt: "2024-01-12 10:30 AM",
      createdBy: "Receptionist - Mary Johnson",
      confirmedAt: "2024-01-12 11:00 AM",
      checkInTime: null,
    },
    billing: {
      consultationFee: 150,
      additionalFees: 0,
      discount: 0,
      total: 150,
      paymentStatus: "PENDING",
      paymentMethod: null,
    },
    medicalHistory: [
      { condition: "Hypertension", diagnosed: "2020", status: "Managed" },
      { condition: "Type 2 Diabetes", diagnosed: "2018", status: "Controlled" },
    ],
    allergies: ["Penicillin", "Sulfa drugs"],
    currentMedications: [
      { name: "Lisinopril 10mg", frequency: "Once daily" },
      { name: "Metformin 500mg", frequency: "Twice daily" },
    ],
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <Badge className="bg-green-500 hover:bg-green-600 text-base px-4 py-1">Confirmed</Badge>
    case "SCHEDULED":
      return <Badge variant="secondary" className="text-base px-4 py-1">Scheduled</Badge>
    case "IN_PROGRESS":
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-base px-4 py-1">In Progress</Badge>
    case "COMPLETED":
      return <Badge variant="outline" className="border-green-500 text-green-600 text-base px-4 py-1">Completed</Badge>
    case "CANCELLED":
      return <Badge variant="destructive" className="text-base px-4 py-1">Cancelled</Badge>
    case "NO_SHOW":
      return <Badge variant="outline" className="border-red-500 text-red-600 text-base px-4 py-1">No Show</Badge>
    case "CHECKED_IN":
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-base px-4 py-1">Checked In</Badge>
    default:
      return <Badge variant="outline" className="text-base px-4 py-1">{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "emergency":
      return <Badge variant="destructive">Emergency</Badge>
    case "urgent":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Urgent</Badge>
    case "normal":
      return <Badge variant="secondary">Normal</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

export default function AppointmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showCheckInDialog, setShowCheckInDialog] = useState(false)

  // In real app, fetch data based on resolvedParams.id
  const data = getAppointmentDetails(resolvedParams.id)

  const handleCheckIn = () => {
    // API call to check in patient
    console.log("Checking in patient for appointment:", data.id)
    setShowCheckInDialog(false)
  }

  const handleCancel = () => {
    // API call to cancel appointment
    console.log("Cancelling appointment:", data.id)
    setShowCancelDialog(false)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/receptionist/appointments">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
                {getStatusBadge(data.appointment.status)}
              </div>
              <p className="text-muted-foreground">
                Appointment ID: {data.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.appointment.status === "CONFIRMED" && (
              <Button onClick={() => setShowCheckInDialog(true)}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Check In Patient
              </Button>
            )}
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Appointment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reminder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => setShowCancelDialog(true)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Info */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-amber-500" />
                  Appointment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{data.appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{data.appointment.time} ({data.appointment.duration})</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{data.appointment.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Priority</p>
                        <div className="mt-1">{getPriorityBadge(data.appointment.priority)}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{data.doctor.department}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <History className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-medium">{data.appointment.createdAt}</p>
                        <p className="text-xs text-muted-foreground">by {data.appointment.createdBy}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Reason for Visit</p>
                  <p className="text-sm">{data.appointment.reason}</p>
                </div>
                
                {data.appointment.notes && (
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Staff Notes</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">{data.appointment.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-amber-500" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <UserRound className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{data.patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{data.patient.id}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{data.patient.gender}, DOB: {data.patient.dateOfBirth}</span>
                      <Badge variant="outline">{data.patient.bloodGroup}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/receptionist/patients?id=${data.patient.id}`}>
                      View Full Profile
                    </Link>
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{data.patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{data.patient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Address</p>
                      <p className="font-medium">{data.patient.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Emergency Contact</p>
                      <p className="font-medium">{data.patient.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {/* Allergies */}
                {data.allergies.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium text-sm">Allergies</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Doctor Information */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-amber-500" />
                  Doctor Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Stethoscope className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{data.doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{data.doctor.specialization}</p>
                    <p className="text-sm text-muted-foreground">{data.doctor.department}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-muted-foreground">
                        <span className="font-medium text-amber-600">{data.doctor.rating}</span> ★ Rating
                      </span>
                      <span className="text-muted-foreground">
                        {data.doctor.experience} experience
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{data.doctor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{data.doctor.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Billing Summary */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span>${data.billing.consultationFee}</span>
                  </div>
                  {data.billing.additionalFees > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Additional Fees</span>
                      <span>${data.billing.additionalFees}</span>
                    </div>
                  )}
                  {data.billing.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${data.billing.discount}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">${data.billing.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Payment Status</span>
                  <Badge variant={data.billing.paymentStatus === "PAID" ? "default" : "secondary"}>
                    {data.billing.paymentStatus}
                  </Badge>
                </div>
                {data.billing.paymentStatus === "PENDING" && (
                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Insurance Info */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  Insurance Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Provider</p>
                  <p className="font-medium">{data.patient.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Insurance ID</p>
                  <p className="font-medium">{data.patient.insuranceId}</p>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  Verify Insurance
                </Button>
              </CardContent>
            </Card>

            {/* Medical Summary */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-amber-500" />
                  Medical Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Medical History</p>
                  <div className="space-y-2">
                    {data.medicalHistory.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                        <span>{item.condition}</span>
                        <Badge variant="outline" className="text-xs">{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Medications</p>
                  <div className="space-y-2">
                    {data.currentMedications.map((med, index) => (
                      <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-xs text-muted-foreground">{med.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-lg font-bold">{data.patient.totalVisits}</p>
                    <p className="text-xs text-muted-foreground">Total Visits</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center">
                    <p className="text-lg font-bold">{data.patient.lastVisit}</p>
                    <p className="text-xs text-muted-foreground">Last Visit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message to Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Medical Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Check In Dialog */}
      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Check In Patient
            </DialogTitle>
            <DialogDescription>
              Confirm patient arrival for this appointment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{data.patient.name}</p>
              <p className="text-sm text-muted-foreground">
                {data.appointment.date} at {data.appointment.time}
              </p>
              <p className="text-sm text-muted-foreground">
                with {data.doctor.name}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Checking in will mark the patient as arrived and notify the doctor.
              The patient will be added to the waiting queue.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckInDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCheckIn}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm Check In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="font-medium">{data.patient.name}</p>
              <p className="text-sm text-muted-foreground">
                {data.appointment.date} at {data.appointment.time}
              </p>
            </div>
            <p className="text-sm text-red-600">
              This action cannot be undone. The patient will be notified of the cancellation.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
