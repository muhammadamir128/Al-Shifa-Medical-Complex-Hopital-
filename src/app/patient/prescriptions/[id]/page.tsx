"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Pill,
  Calendar,
  Clock,
  RefreshCw,
  FileText,
  Printer,
  Download,
  Phone,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  Info,
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
  notes: "Take medications as directed. Monitor blood pressure daily. Return for follow-up in 3 months. Avoid NSAIDs. Maintain low-sodium diet.",
  doctor: {
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    licenseNo: "IL-MD-123456",
    phone: "(555) 123-4001",
  },
  medications: [
    {
      name: "Metformin",
      strength: "500mg",
      form: "Tablet",
      quantity: 60,
      frequency: "Twice daily",
      duration: "3 months",
      instructions: "Take with meals. Do not crush or chew. If you miss a dose, take it as soon as you remember.",
      refills: 3,
      sideEffects: "Nausea, stomach upset, diarrhea (usually resolve after a few weeks)",
    },
    {
      name: "Lisinopril",
      strength: "10mg",
      form: "Tablet",
      quantity: 30,
      frequency: "Once daily",
      duration: "3 months",
      instructions: "Take in the morning. Monitor for dizziness when standing up suddenly.",
      refills: 3,
      sideEffects: "Dry cough, dizziness, headache. Seek help if swelling of face or throat occurs.",
    },
    {
      name: "Aspirin",
      strength: "81mg",
      form: "Tablet",
      quantity: 30,
      frequency: "Once daily",
      duration: "Ongoing",
      instructions: "Take with food to reduce stomach upset. Do not stop without consulting your doctor.",
      refills: 5,
      sideEffects: "Stomach irritation, increased bleeding risk",
    },
  ],
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  ACTIVE: { label: "Active", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  COMPLETED: { label: "Completed", className: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  EXPIRED: { label: "Expired", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
}

export default function PatientPrescriptionDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const cfg = statusConfig[prescription.status] ?? statusConfig.ACTIVE
  const refillsLeft = prescription.refillsAllowed - prescription.refillsUsed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/patient/prescriptions">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prescription Details</h1>
            <p className="text-muted-foreground">View your medication and prescription info</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Downloading prescription..." })}>
            <Download className="mr-2 h-4 w-4" />Download
          </Button>
          <Button variant="outline" onClick={() => toast({ title: "Printing prescription..." })}>
            <Printer className="mr-2 h-4 w-4" />Print
          </Button>
        </div>
      </div>

      {/* Prescription Header Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold font-mono">{prescription.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}>
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
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
          </div>
        </CardContent>
      </Card>

      {/* Low refills warning */}
      {refillsLeft <= 1 && prescription.status === "ACTIVE" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-800">Low Refills Remaining</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {refillsLeft === 0
                ? "No refills remaining. Contact your doctor to renew this prescription."
                : "Only 1 refill left. Schedule a follow-up before it runs out."}
            </p>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 shrink-0"
            onClick={() => toast({ title: "Refill request sent to Dr. Wilson" })}>
            Request Refill
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medications */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Prescribed Medications ({prescription.medications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {prescription.medications.map((med, i) => (
                <div key={i} className="p-4 rounded-xl border bg-muted/20 space-y-3">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-bold">
                        {med.name} <span className="text-primary">{med.strength}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs">{med.form}</Badge>
                        <Badge variant="secondary" className="text-xs">Refills: {med.refills}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs shrink-0">Active</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
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

                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-800 dark:text-blue-300">Instructions</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">{med.instructions}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                      <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Possible Side Effects</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">{med.sideEffects}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Diagnosis & Notes */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />Doctor&apos;s Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Diagnosis</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm font-medium">{prescription.diagnosis}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Doctor&apos;s Instructions</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed">{prescription.notes}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Doctor Info */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />Prescribing Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {prescription.doctor.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{prescription.doctor.name}</p>
                  <p className="text-xs text-primary">{prescription.doctor.specialization}</p>
                </div>
              </div>
              <Separator />
              <div className="text-sm space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />{prescription.doctor.phone}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  License: {prescription.doctor.licenseNo}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refill Status */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />Refill Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Allowed</span>
                <span className="font-bold">{prescription.refillsAllowed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Used</span>
                <span className="font-bold text-amber-600">{prescription.refillsUsed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining</span>
                <span className={`font-bold ${refillsLeft === 0 ? "text-red-600" : "text-emerald-600"}`}>
                  {refillsLeft}
                </span>
              </div>
              <Separator />
              <Button
                className="w-full"
                variant="outline"
                disabled={refillsLeft === 0 || prescription.status !== "ACTIVE"}
                onClick={() => toast({ title: "Refill request sent", description: "Your doctor will be notified." })}
              >
                <RefreshCw className="mr-2 h-4 w-4" />Request Refill
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start"
                onClick={() => toast({ title: "Downloading PDF..." })}>
                <Download className="mr-2 h-4 w-4" />Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start"
                onClick={() => toast({ title: "Sent to pharmacy" })}>
                <Pill className="mr-2 h-4 w-4" />Send to Pharmacy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
