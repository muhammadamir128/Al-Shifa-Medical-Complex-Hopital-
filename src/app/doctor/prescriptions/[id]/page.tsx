"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
  Pill,
  User,
  Calendar,
  Clock,
  Printer,
  Edit,
  Copy,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const prescription = {
  id: "RX-2024-001",
  date: "2024-01-20",
  validUntil: "2024-04-20",
  status: "ACTIVE",
  refillsAllowed: 3,
  refillsUsed: 1,
  diagnosis: "Hypertension & Type 2 Diabetes",
  notes: "Take medications as directed. Monitor blood pressure daily. Return for follow-up in 3 months. Avoid NSAIDs.",
  patient: {
    id: "P-001",
    name: "John Smith",
    age: 38,
    gender: "Male",
    dob: "1985-06-15",
    phone: "(555) 234-5678",
    email: "john.smith@email.com",
    allergies: ["Penicillin", "Peanuts"],
  },
  doctor: {
    name: "Dr. Michael Chen",
    licenseNo: "IL-MD-123456",
    specialization: "Cardiology",
  },
  medications: [
    {
      name: "Metformin",
      strength: "500mg",
      form: "Tablet",
      quantity: 60,
      frequency: "Twice daily",
      duration: "3 months",
      instructions: "Take with meals. Do not crush or chew.",
      refills: 3,
    },
    {
      name: "Lisinopril",
      strength: "10mg",
      form: "Tablet",
      quantity: 30,
      frequency: "Once daily",
      duration: "3 months",
      instructions: "Take in the morning. Monitor for dizziness.",
      refills: 3,
    },
    {
      name: "Aspirin",
      strength: "81mg",
      form: "Tablet",
      quantity: 30,
      frequency: "Once daily",
      duration: "Ongoing",
      instructions: "Take with food to reduce stomach upset.",
      refills: 5,
    },
  ],
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  COMPLETED: { label: "Completed", className: "bg-gray-100 text-gray-600 border-gray-200" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
  EXPIRED: { label: "Expired", className: "bg-amber-100 text-amber-700 border-amber-200" },
}

export default function PrescriptionDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const cfg = statusConfig[prescription.status] ?? statusConfig.ACTIVE
  const refillsLeft = prescription.refillsAllowed - prescription.refillsUsed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/doctor/prescriptions">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prescription Details</h1>
            <p className="text-muted-foreground">View and manage prescription</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" />Print</Button>
          <Button variant="outline"><Copy className="mr-2 h-4 w-4" />Duplicate</Button>
          <Button><Edit className="mr-2 h-4 w-4" />Edit</Button>
        </div>
      </div>

      {/* Prescription Header Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold font-mono">{prescription.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}>
                  {prescription.status === "ACTIVE" && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {cfg.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Issued: {prescription.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />Valid Until: {prescription.validUntil}</span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refills: {refillsLeft} of {prescription.refillsAllowed} remaining
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-muted-foreground">Prescribing Doctor</p>
              <p className="font-semibold">{prescription.doctor.name}</p>
              <p className="text-xs text-muted-foreground">{prescription.doctor.specialization}</p>
              <p className="text-xs font-mono text-muted-foreground">License: {prescription.doctor.licenseNo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medications Table */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Prescribed Medications ({prescription.medications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescription.medications.map((med, i) => (
                  <div key={i} className="p-4 rounded-xl border bg-muted/20">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{med.name} <span className="text-primary">{med.strength}</span></p>
                          <Badge variant="outline" className="text-xs">{med.form}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 italic">{med.instructions}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">Refills: {med.refills}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                      <div className="p-2 rounded-lg bg-background border text-center">
                        <p className="text-xs text-muted-foreground">Frequency</p>
                        <p className="font-medium mt-0.5">{med.frequency}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-background border text-center">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium mt-0.5">{med.duration}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-background border text-center">
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-medium mt-0.5">{med.quantity} units</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis & Notes */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-5 w-5" />Diagnosis & Notes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Diagnosis</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm font-medium">{prescription.diagnosis}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Doctor's Notes & Instructions</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed">{prescription.notes}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-5 w-5" />Patient</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {prescription.patient.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{prescription.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{prescription.patient.gender}, {prescription.patient.age} yrs</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />{prescription.patient.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />{prescription.patient.email}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Known Allergies</p>
                <div className="flex flex-wrap gap-1">
                  {prescription.patient.allergies.map((a, i) => (
                    <Badge key={i} variant="destructive" className="text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />{a}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link href={`/doctor/patients/${prescription.patient.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-1">View Patient Profile</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Refill Status */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><RefreshCw className="h-5 w-5" />Refill Status</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refills Allowed</span>
                <span className="font-bold">{prescription.refillsAllowed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refills Used</span>
                <span className="font-bold text-amber-600">{prescription.refillsUsed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refills Remaining</span>
                <span className={`font-bold ${refillsLeft === 0 ? "text-red-600" : "text-emerald-600"}`}>{refillsLeft}</span>
              </div>
              <Separator />
              <Button
                className="w-full"
                variant="outline"
                onClick={() => toast({ title: "Refill authorised", description: "Pharmacy has been notified." })}
                disabled={refillsLeft === 0 || prescription.status !== "ACTIVE"}
              >
                <RefreshCw className="mr-2 h-4 w-4" />Authorise Refill
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Copy className="mr-2 h-4 w-4" />Duplicate Prescription
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Printer className="mr-2 h-4 w-4" />Print Prescription
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <AlertCircle className="mr-2 h-4 w-4" />Cancel Prescription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
