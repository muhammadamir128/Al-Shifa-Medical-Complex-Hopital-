"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  Edit,
  Printer,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const appointment = {
  id: "APT-2024-0142",
  date: "2024-01-25",
  time: "10:00 AM",
  duration: "30 minutes",
  type: "Follow-up",
  status: "SCHEDULED",
  priority: "NORMAL",
  reason: "Follow-up for hypertension management and medication review",
  notes: "Patient reported occasional dizziness. Monitor blood pressure readings.",
  patient: {
    id: "P-001",
    name: "John Smith",
    age: 38,
    gender: "Male",
    phone: "(555) 234-5678",
    email: "john.smith@email.com",
    bloodGroup: "O+",
    address: "123 Main St, New York, NY",
    insuranceNumber: "INS-2024-78543",
  },
  doctor: {
    id: "DOC-001",
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    department: "Cardiology",
    phone: "(555) 123-4001",
    email: "sarah.wilson@hospital.com",
    room: "Room 301, Building B",
  },
  timeline: [
    { time: "Jan 20, 09:15 AM", event: "Appointment booked by receptionist", by: "Robert Johnson" },
    { time: "Jan 21, 10:00 AM", event: "Confirmation SMS sent to patient", by: "System" },
    { time: "Jan 22, 02:30 PM", event: "Reminder email sent", by: "System" },
  ],
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  SCHEDULED: { label: "Scheduled", className: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  IN_PROGRESS: { label: "In Progress", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  NO_SHOW: { label: "No Show", className: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
}

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [status, setStatus] = useState(appointment.status)
  const [adminNote, setAdminNote] = useState("")
  const cfg = statusConfig[status] ?? statusConfig.SCHEDULED

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/appointments">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
            <p className="text-muted-foreground">Full appointment information and management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" />Print</Button>
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" />Edit</Button>
        </div>
      </div>

      {/* Appointment Overview Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold font-mono">{appointment.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}>
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                <Badge variant="outline">{appointment.type}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{appointment.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{appointment.time}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4 opacity-50" />{appointment.duration}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                onClick={() => { setStatus("CONFIRMED"); toast({ title: "Appointment Confirmed" }) }}
                disabled={status === "COMPLETED" || status === "CANCELLED"}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />Confirm
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => { setStatus("CANCELLED"); toast({ title: "Appointment Cancelled" }) }}
                disabled={status === "COMPLETED" || status === "CANCELLED"}
              >
                <XCircle className="mr-2 h-4 w-4" />Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Patient & Doctor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient & Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-5 w-5 text-primary" />Patient</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {appointment.patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{appointment.patient.name}</p>
                    <p className="text-xs text-muted-foreground">{appointment.patient.id}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    {appointment.patient.gender}, {appointment.patient.age} yrs · {appointment.patient.bloodGroup}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {appointment.patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{appointment.patient.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    {appointment.patient.address}
                  </div>
                </div>
                <Link href={`/admin/patients/${appointment.patient.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">View Patient Profile</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" />Doctor</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                      {appointment.doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{appointment.doctor.name}</p>
                    <p className="text-xs text-primary">{appointment.doctor.specialization}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {appointment.doctor.department}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {appointment.doctor.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{appointment.doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {appointment.doctor.room}
                  </div>
                </div>
                <Link href={`/admin/doctors/${appointment.doctor.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">View Doctor Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Reason & Notes */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-5 w-5" />Appointment Notes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Reason for Visit</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">{appointment.reason}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Clinical Notes</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">{appointment.notes}</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Add Admin Note</Label>
                <Textarea
                  placeholder="Add an administrative note..."
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  rows={3}
                  className="mt-1"
                />
                <Button size="sm" className="mt-2" onClick={() => toast({ title: "Note saved" })}>
                  <MessageSquare className="mr-2 h-3.5 w-3.5" />Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Update Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, val]) => (
                    <SelectItem key={key} value={key}>{val.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={() => toast({ title: "Status updated successfully" })}>
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Activity Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointment.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      {i < appointment.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{t.event}</p>
                      <p className="text-xs text-muted-foreground">{t.by} · {t.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Insurance Info</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance No.</span>
                <span className="font-mono font-medium">{appointment.patient.insuranceNumber}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority</span>
                <Badge variant="outline">{appointment.priority}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
