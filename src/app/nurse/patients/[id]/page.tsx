"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Pill,
  ClipboardList,
  Phone,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const patient = {
  id: "P-001",
  name: "John Smith",
  age: 38,
  gender: "Male",
  bloodGroup: "O+",
  room: "Room 204, Ward B",
  phone: "(555) 234-5678",
  emergencyContact: "Jane Smith - (555) 234-5679",
  allergies: ["Penicillin"],
  admittedDate: "2024-01-18",
  diagnosis: "Hypertension & Cardiac Monitoring",
  assignedDoctor: "Dr. Sarah Wilson",
  status: "Stable",
}

const vitalsHistory = [
  { time: "08:00 AM", bp: "128/82", hr: "74", temp: "98.4", spo2: "98", rr: "16", pain: 2 },
  { time: "12:00 PM", bp: "132/85", hr: "78", temp: "98.6", spo2: "97", rr: "17", pain: 3 },
  { time: "04:00 PM", bp: "126/80", hr: "72", temp: "98.5", spo2: "98", rr: "15", pain: 2 },
  { time: "08:00 PM", bp: "130/84", hr: "76", temp: "98.7", spo2: "97", rr: "16", pain: 1 },
]

const medications = [
  { name: "Metformin 500mg", frequency: "Twice daily", lastGiven: "08:00 AM", nextDue: "08:00 PM", status: "GIVEN" },
  { name: "Lisinopril 10mg", frequency: "Once daily", lastGiven: "08:00 AM", nextDue: "08:00 AM (tomorrow)", status: "GIVEN" },
  { name: "Aspirin 81mg", frequency: "Once daily", lastGiven: "08:00 AM", nextDue: "08:00 AM (tomorrow)", status: "GIVEN" },
  { name: "Furosemide 20mg", frequency: "As needed", lastGiven: "—", nextDue: "PRN", status: "PENDING" },
]

const careNotes = [
  { time: "08:30 AM", note: "Patient reports feeling better. Vitals stable. No complaints of chest pain.", by: "Nurse Emily" },
  { time: "04:15 PM", note: "Administered evening medications as prescribed. Patient cooperative.", by: "Nurse Emily" },
  { time: "Jan 19, 10:00 PM", note: "Patient had mild headache. Administered acetaminophen per PRN order. Resolved within 1 hour.", by: "Nurse Mark" },
]

const medStatusConfig: Record<string, { label: string; className: string }> = {
  GIVEN: { label: "Given", className: "bg-emerald-100 text-emerald-700" },
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  OVERDUE: { label: "Overdue", className: "bg-red-100 text-red-700" },
}

export default function NursePatientDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/nurse/patients">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patient Care</h1>
            <p className="text-muted-foreground">Monitor vitals, medications, and care notes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => toast({ title: "Opening vitals form" })}>
            <Plus className="mr-2 h-4 w-4" />Record Vitals
          </Button>
        </div>
      </div>

      {/* Patient Profile Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <Badge variant="outline">{patient.id}</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">{patient.status}</Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-1">{patient.diagnosis}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span>{patient.gender}, {patient.age} yrs · {patient.bloodGroup}</span>
                <span className="flex items-center gap-1"><Activity className="h-4 w-4" />{patient.room}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />Admitted: {patient.admittedDate}</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-4 w-4" />{patient.assignedDoctor}</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{patient.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Vitals */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Blood Pressure", value: "128/82", unit: "mmHg", icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
          { label: "Heart Rate", value: "74", unit: "bpm", icon: Activity, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/20" },
          { label: "Temperature", value: "98.4", unit: "°F", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
          { label: "SpO2", value: "98", unit: "%", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Resp. Rate", value: "16", unit: "/min", icon: Wind, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-900/20" },
          { label: "Pain Score", value: "2", unit: "/10", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
        ].map((v) => {
          const Icon = v.icon
          return (
            <Card key={v.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-2 ${v.bg}`}>
                  <Icon className={`h-4 w-4 ${v.color}`} />
                </div>
                <p className="text-xl font-bold">{v.value}<span className="text-xs font-normal text-muted-foreground ml-1">{v.unit}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{v.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="vitals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="vitals">Vitals History</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="notes">Care Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Today&apos;s Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>BP (mmHg)</TableHead>
                        <TableHead>HR (bpm)</TableHead>
                        <TableHead>Temp (°F)</TableHead>
                        <TableHead>SpO2 (%)</TableHead>
                        <TableHead>RR</TableHead>
                        <TableHead>Pain</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vitalsHistory.map((v, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{v.time}</TableCell>
                          <TableCell>{v.bp}</TableCell>
                          <TableCell>{v.hr}</TableCell>
                          <TableCell>{v.temp}</TableCell>
                          <TableCell>
                            <span className={parseInt(v.spo2) < 95 ? "text-red-600 font-medium" : "text-emerald-600"}>
                              {v.spo2}%
                            </span>
                          </TableCell>
                          <TableCell>{v.rr}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={v.pain * 10} className="h-1.5 w-12" />
                              <span className="text-sm">{v.pain}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Pill className="h-5 w-5 text-primary" />
                    Medication Administration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {medications.map((med, i) => {
                    const cfg = medStatusConfig[med.status] ?? medStatusConfig.PENDING
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{med.name}</p>
                          <p className="text-xs text-muted-foreground">{med.frequency}</p>
                          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                            <span>Last: {med.lastGiven}</span>
                            <span>Next: {med.nextDue}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${cfg.className} text-xs`}>{cfg.label}</Badge>
                          {med.status === "PENDING" && (
                            <Button size="sm" onClick={() => toast({ title: `${med.name} marked as given` })}>
                              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />Mark Given
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Care Notes
                  </CardTitle>
                  <Button size="sm" onClick={() => toast({ title: "Opening note form" })}>
                    <Plus className="mr-1 h-3.5 w-3.5" />Add Note
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {careNotes.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl border space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary">{note.by}</span>
                        <span className="text-xs text-muted-foreground">{note.time}</span>
                      </div>
                      <p className="text-sm">{note.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-5 w-5" />Patient Info</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Group</span>
                <span className="font-medium">{patient.bloodGroup}</span>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Allergies</p>
                {patient.allergies.map((a, i) => (
                  <Badge key={i} variant="destructive" className="text-xs mr-1">
                    <AlertCircle className="h-3 w-3 mr-1" />{a}
                  </Badge>
                ))}
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Emergency Contact</p>
                <p className="font-medium mt-0.5">{patient.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" onClick={() => toast({ title: "Opening vitals form" })}>
                <Activity className="mr-2 h-4 w-4" />Record Vitals
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Opening medication log" })}>
                <Pill className="mr-2 h-4 w-4" />Log Medication
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Opening care note form" })}>
                <FileText className="mr-2 h-4 w-4" />Add Care Note
              </Button>
              <Button variant="outline" className="w-full justify-start text-amber-600" onClick={() => toast({ title: "Alert sent to doctor" })}>
                <AlertCircle className="mr-2 h-4 w-4" />Alert Doctor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
