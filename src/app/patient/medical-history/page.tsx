"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Search,
  FileText,
  Activity,
  Stethoscope,
  Syringe,
  FlaskConical,
  Download,
  Eye,
  Calendar,
  User,
  ClipboardList,
  Heart,
  Thermometer,
  Wind,
  Weight,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"

const medicalRecords = [
  {
    id: "1",
    date: "Dec 15, 2024",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    diagnosis: "Hypertension (controlled)",
    treatment: "Continuing Lisinopril 10mg daily",
    notes: "Blood pressure well controlled. Continue current medication. Follow up in 3 months.",
    type: "Consultation",
  },
  {
    id: "2",
    date: "Nov 20, 2024",
    doctor: "Dr. Michael Brown",
    department: "General Medicine",
    diagnosis: "Upper respiratory infection",
    treatment: "Prescribed amoxicillin 500mg for 7 days",
    notes: "Mild upper respiratory infection. Symptoms should improve within 5–7 days.",
    type: "Consultation",
  },
  {
    id: "3",
    date: "Oct 05, 2024",
    doctor: "Dr. Lisa Chen",
    department: "Orthopedics",
    diagnosis: "Mild knee strain",
    treatment: "Physical therapy recommended, ibuprofen PRN",
    notes: "No structural damage found on X-ray. Recommend rest and physical therapy.",
    type: "Follow-up",
  },
  {
    id: "4",
    date: "Sep 12, 2024",
    doctor: "Dr. Emma Thompson",
    department: "Dermatology",
    diagnosis: "Contact dermatitis",
    treatment: "Topical hydrocortisone cream 1%",
    notes: "Apply cream twice daily for 2 weeks. Avoid known allergens.",
    type: "Consultation",
  },
]

const vitalsHistory = [
  {
    id: "1",
    date: "Dec 15, 2024",
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "98.6",
    weight: "165",
    oxygenSaturation: "98",
    notes: "Normal vitals",
  },
  {
    id: "2",
    date: "Nov 20, 2024",
    bloodPressure: "122/82",
    heartRate: "76",
    temperature: "99.2",
    weight: "164",
    oxygenSaturation: "97",
    notes: "Slight fever due to infection",
  },
  {
    id: "3",
    date: "Oct 05, 2024",
    bloodPressure: "118/78",
    heartRate: "70",
    temperature: "98.4",
    weight: "166",
    oxygenSaturation: "99",
    notes: "Normal vitals",
  },
  {
    id: "4",
    date: "Sep 12, 2024",
    bloodPressure: "125/85",
    heartRate: "74",
    temperature: "98.6",
    weight: "167",
    oxygenSaturation: "98",
    notes: "Normal vitals",
  },
]

const labResults = [
  {
    id: "1",
    date: "Dec 10, 2024",
    testName: "Complete Blood Count (CBC)",
    status: "NORMAL",
    result: "Normal",
    orderedBy: "Dr. Sarah Wilson",
  },
  {
    id: "2",
    date: "Nov 15, 2024",
    testName: "Lipid Panel",
    status: "ATTENTION",
    result: "Cholesterol slightly elevated",
    orderedBy: "Dr. Michael Brown",
  },
  {
    id: "3",
    date: "Oct 20, 2024",
    testName: "Blood Glucose (Fasting)",
    status: "NORMAL",
    result: "Normal (92 mg/dL)",
    orderedBy: "Dr. Michael Brown",
  },
  {
    id: "4",
    date: "Sep 05, 2024",
    testName: "Kidney Function Test",
    status: "NORMAL",
    result: "Normal",
    orderedBy: "Dr. Sarah Wilson",
  },
]

const immunizations = [
  {
    id: "1",
    vaccine: "COVID-19 Booster",
    date: "Aug 15, 2024",
    administeredBy: "Dr. James Wilson",
    nextDose: "N/A",
    location: "Main Hospital",
    status: "COMPLETED",
  },
  {
    id: "2",
    vaccine: "Influenza (Flu Shot)",
    date: "Oct 01, 2024",
    administeredBy: "Nurse Johnson",
    nextDose: "Oct 2025",
    location: "Main Hospital",
    status: "COMPLETED",
  },
  {
    id: "3",
    vaccine: "Tetanus (Td)",
    date: "Mar 10, 2022",
    administeredBy: "Dr. Michael Brown",
    nextDose: "Mar 2032",
    location: "City Clinic",
    status: "COMPLETED",
  },
]

const surgeries = [
  {
    id: "1",
    procedure: "Appendectomy",
    date: "Jun 15, 2015",
    surgeon: "Dr. Robert Adams",
    hospital: "Al-Shifa Medical Complex",
    notes: "Laparoscopic procedure, no complications",
  },
]

const deptColors: Record<string, string> = {
  Cardiology: "bg-red-50 text-red-700 border-red-200",
  "General Medicine": "bg-green-50 text-green-700 border-green-200",
  Orthopedics: "bg-amber-50 text-amber-700 border-amber-200",
  Dermatology: "bg-teal-50 text-teal-700 border-teal-200",
  Neurology: "bg-purple-50 text-purple-700 border-purple-200",
  Pediatrics: "bg-pink-50 text-pink-700 border-pink-200",
}

function VitalBadge({ value, normal, unit }: { value: string; normal: boolean; unit?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        normal
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      )}
    >
      {normal ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {value}{unit}
    </span>
  )
}

export default function MedicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<(typeof medicalRecords)[0] | null>(null)

  const filteredRecords = medicalRecords.filter(
    (r) =>
      r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Medical History</h1>
          <p className="text-sm text-muted-foreground mt-0.5">View your complete health records and history</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Download className="h-4 w-4" />
          Download Records
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: FileText, label: "Records", count: medicalRecords.length, bg: "bg-primary/10", iconColor: "text-primary", card: "from-primary/5 to-primary/10" },
          { icon: Activity, label: "Vital Records", count: vitalsHistory.length, bg: "bg-blue-100", iconColor: "text-blue-600", card: "from-blue-50 to-blue-100/60" },
          { icon: FlaskConical, label: "Lab Tests", count: labResults.length, bg: "bg-purple-100", iconColor: "text-purple-600", card: "from-purple-50 to-purple-100/60" },
          { icon: Syringe, label: "Immunizations", count: immunizations.length, bg: "bg-emerald-100", iconColor: "text-emerald-600", card: "from-emerald-50 to-emerald-100/60" },
        ].map(({ icon: Icon, label, count, bg, iconColor, card }) => (
          <Card key={label} className={cn("border-0 shadow-sm bg-linear-to-br", card)}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cn("h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0", bg)}>
                  <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", iconColor)} />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-grid h-auto p-1">
          <TabsTrigger value="records" className="flex items-center gap-1.5 py-2 text-xs sm:text-sm">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Records</span>
            <span className="xs:hidden">Recs</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-1.5 py-2 text-xs sm:text-sm">
            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Vitals
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-1.5 py-2 text-xs sm:text-sm">
            <FlaskConical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Lab Results</span>
            <span className="xs:hidden">Labs</span>
          </TabsTrigger>
          <TabsTrigger value="immunizations" className="flex items-center gap-1.5 py-2 text-xs sm:text-sm">
            <Syringe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Immunizations</span>
            <span className="sm:hidden">Vaccines</span>
          </TabsTrigger>
        </TabsList>

        {/* Medical Records */}
        <TabsContent value="records">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Medical Records</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Your consultation and treatment history</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-60"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredRecords.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-muted-foreground">
                  <ClipboardList className="h-10 w-10 mb-2 opacity-25" />
                  <p className="text-sm">No records found</p>
                </div>
              ) : (
                <>
                  {/* Mobile card list */}
                  <div className="divide-y md:hidden">
                    {filteredRecords.map((record) => (
                      <div key={record.id} className="p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn("text-xs border rounded-full px-2 py-0.5", deptColors[record.department] ?? "bg-muted text-muted-foreground border-border")}>
                                {record.department}
                              </span>
                              <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5 bg-muted/50">{record.type}</span>
                            </div>
                            <p className="font-semibold text-sm mt-2 leading-tight">{record.diagnosis}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><User className="h-3 w-3" />{record.doctor}</span>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{record.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(record)} className="shrink-0 h-8 gap-1">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="pl-6 text-xs uppercase font-semibold tracking-wider">Date</TableHead>
                          <TableHead className="text-xs uppercase font-semibold tracking-wider">Doctor</TableHead>
                          <TableHead className="text-xs uppercase font-semibold tracking-wider">Department</TableHead>
                          <TableHead className="text-xs uppercase font-semibold tracking-wider">Diagnosis</TableHead>
                          <TableHead className="text-right pr-6 text-xs uppercase font-semibold tracking-wider">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecords.map((record) => (
                          <TableRow key={record.id} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="pl-6 text-sm">{record.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="text-sm">{record.doctor}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={cn("text-xs border rounded-full px-2.5 py-1", deptColors[record.department] ?? "bg-muted text-muted-foreground border-border")}>
                                {record.department}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">{record.diagnosis}</TableCell>
                            <TableCell className="text-right pr-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedRecord(record)}
                                className="h-8 gap-1.5 text-xs"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals */}
        <TabsContent value="vitals">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Vitals History</CardTitle>
              <CardDescription className="text-xs">Your recorded vital signs over time</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile vitals */}
              <div className="divide-y md:hidden">
                {vitalsHistory.map((v) => (
                  <div key={v.id} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{v.date}</p>
                      <span className="text-xs text-muted-foreground">{v.notes}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Blood Pressure", value: `${v.bloodPressure} mmHg`, normal: true },
                        { label: "Heart Rate", value: `${v.heartRate} bpm`, normal: parseInt(v.heartRate) <= 80 },
                        { label: "Temperature", value: `${v.temperature}°F`, normal: parseFloat(v.temperature) < 99 },
                        { label: "O2 Saturation", value: `${v.oxygenSaturation}%`, normal: parseInt(v.oxygenSaturation) >= 97 },
                      ].map(({ label, value, normal }) => (
                        <div key={label} className="p-2 rounded-lg border bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">{label}</p>
                          <p className={cn("text-sm font-semibold", normal ? "text-emerald-600" : "text-amber-600")}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="pl-6 text-xs uppercase font-semibold tracking-wider">Date</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-400" />Blood Pressure</span>
                      </TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Heart Rate</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Temperature</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Weight</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">O2 Sat.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitalsHistory.map((v) => (
                      <TableRow key={v.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6 font-medium text-sm">{v.date}</TableCell>
                        <TableCell>
                          <VitalBadge value={v.bloodPressure} unit=" mmHg" normal={true} />
                        </TableCell>
                        <TableCell>
                          <VitalBadge value={v.heartRate} unit=" bpm" normal={parseInt(v.heartRate) <= 80} />
                        </TableCell>
                        <TableCell>
                          <VitalBadge value={v.temperature} unit="°F" normal={parseFloat(v.temperature) < 99} />
                        </TableCell>
                        <TableCell className="text-sm">{v.weight} lbs</TableCell>
                        <TableCell>
                          <VitalBadge value={v.oxygenSaturation} unit="%" normal={parseInt(v.oxygenSaturation) >= 97} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Results */}
        <TabsContent value="labs">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lab Results</CardTitle>
              <CardDescription className="text-xs">Your laboratory test results</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y md:hidden">
                {labResults.map((lab) => (
                  <div key={lab.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{lab.testName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{lab.date} · {lab.orderedBy}</p>
                        <p className="text-xs mt-1.5">{lab.result}</p>
                      </div>
                      <span className={cn(
                        "text-xs border rounded-full px-2.5 py-1 shrink-0",
                        lab.status === "NORMAL"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        {lab.status === "NORMAL" ? "Normal" : "Attention"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="pl-6 text-xs uppercase font-semibold tracking-wider">Test Name</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Date</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Ordered By</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Result</TableHead>
                      <TableHead className="text-xs uppercase font-semibold tracking-wider">Status</TableHead>
                      <TableHead className="text-right pr-6 text-xs uppercase font-semibold tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labResults.map((lab) => (
                      <TableRow key={lab.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6 font-medium text-sm">{lab.testName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lab.date}</TableCell>
                        <TableCell className="text-sm">{lab.orderedBy}</TableCell>
                        <TableCell className="text-sm">{lab.result}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "text-xs border rounded-full px-2.5 py-1",
                            lab.status === "NORMAL"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          )}>
                            {lab.status === "NORMAL" ? "Normal" : "Attention"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Immunizations */}
        <TabsContent value="immunizations" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Immunization Records</CardTitle>
              <CardDescription className="text-xs">Your vaccination history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {immunizations.map((imm) => (
                <div
                  key={imm.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border hover:bg-muted/20 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Syringe className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{imm.vaccine}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {imm.date} · {imm.administeredBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5 sm:pl-4">
                    <span className="text-xs border rounded-full px-2.5 py-1 bg-muted/50 text-muted-foreground self-start sm:self-auto">
                      {imm.location}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Next dose: <span className="font-medium text-foreground">{imm.nextDose}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Surgeries */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 text-primary" />
                </div>
                Surgeries & Procedures
              </CardTitle>
              <CardDescription className="text-xs">Your surgical history</CardDescription>
            </CardHeader>
            <CardContent>
              {surgeries.length > 0 ? (
                <div className="space-y-3">
                  {surgeries.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl border hover:bg-muted/20 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-sm">{s.procedure}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.date} · {s.surgeon}</p>
                        </div>
                        <span className="text-xs border rounded-full px-2.5 py-1 bg-muted/50 text-muted-foreground self-start">
                          {s.hospital}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2.5 bg-muted/30 rounded-lg p-2">{s.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-10 text-muted-foreground">
                  <ClipboardList className="h-10 w-10 mb-2 opacity-25" />
                  <p className="text-sm">No surgical records found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Record Detail Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Medical Record Details</DialogTitle>
            <DialogDescription>
              {selectedRecord?.date} · {selectedRecord?.doctor}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-sm">{selectedRecord.date}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-semibold text-sm">{selectedRecord.type}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 border">
                <p className="text-xs text-muted-foreground mb-1">Doctor</p>
                <p className="font-semibold text-sm">{selectedRecord.doctor}</p>
                <p className="text-xs text-muted-foreground">{selectedRecord.department}</p>
              </div>
              <div className="p-3 rounded-xl border">
                <p className="text-xs text-muted-foreground mb-1">Diagnosis</p>
                <p className="font-semibold text-sm">{selectedRecord.diagnosis}</p>
              </div>
              <div className="p-3 rounded-xl border">
                <p className="text-xs text-muted-foreground mb-1">Treatment</p>
                <p className="text-sm">{selectedRecord.treatment}</p>
              </div>
              <div className="p-3 rounded-xl border">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm leading-relaxed">{selectedRecord.notes}</p>
              </div>
              <Button className="w-full gap-2" variant="outline">
                <Download className="h-4 w-4" />
                Download Record
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
