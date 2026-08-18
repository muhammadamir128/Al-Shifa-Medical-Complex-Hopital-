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
  FlaskConical,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Printer,
  Send,
  Stethoscope,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const result = {
  id: "LAB-RES-2024-089",
  requestId: "LAB-REQ-2024-047",
  testType: "Cardiac Enzyme Panel",
  completedDate: "2024-01-20",
  completedTime: "02:30 PM",
  verifiedBy: "Alex Turner",
  verifiedDate: "2024-01-20 03:00 PM",
  status: "VERIFIED",
  priority: "URGENT",
  processingTime: "5h 15m",
  patient: {
    id: "P-001",
    name: "John Smith",
    age: 38,
    gender: "Male",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
  },
  doctor: {
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    department: "Cardiology",
  },
  parameters: [
    { parameter: "Troponin I", value: "0.08", unit: "ng/mL", refRange: "< 0.04", refMin: null, refMax: 0.04, resultStatus: "HIGH", prevValue: "0.03", method: "Chemiluminescence" },
    { parameter: "CK-MB", value: "12.5", unit: "U/L", refRange: "0 - 25", refMin: 0, refMax: 25, resultStatus: "NORMAL", prevValue: "10.2", method: "Enzymatic" },
    { parameter: "LDH", value: "210", unit: "U/L", refRange: "140 - 280", refMin: 140, refMax: 280, resultStatus: "NORMAL", prevValue: "195", method: "Enzymatic" },
    { parameter: "BNP", value: "380", unit: "pg/mL", refRange: "< 100", refMin: null, refMax: 100, resultStatus: "CRITICAL", prevValue: "120", method: "ELISA" },
    { parameter: "Myoglobin", value: "65", unit: "ng/mL", refRange: "< 90", refMin: null, refMax: 90, resultStatus: "NORMAL", prevValue: "58", method: "Immunoassay" },
  ],
  labNotes: "Sample collected without hemolysis. All parameters processed on Beckman Coulter AU5800. QC passed for all analytes.",
  instrument: "Beckman Coulter AU5800",
  sampleType: "Serum",
  sampleCollectedAt: "2024-01-20 09:15 AM",
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  PENDING: { label: "Pending", className: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  PROCESSING: { label: "Processing", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  COMPLETED: { label: "Completed", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  VERIFIED: { label: "Verified", className: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
}

const resultColors: Record<string, { text: string; bg: string; icon: typeof Minus }> = {
  NORMAL: { text: "text-emerald-600", bg: "", icon: Minus },
  HIGH: { text: "text-red-600", bg: "bg-red-50/50 dark:bg-red-900/10", icon: TrendingUp },
  LOW: { text: "text-blue-600", bg: "bg-blue-50/50 dark:bg-blue-900/10", icon: TrendingDown },
  CRITICAL: { text: "text-red-700", bg: "bg-red-100/60 dark:bg-red-900/20", icon: AlertCircle },
}

const priorityColors: Record<string, string> = {
  ROUTINE: "bg-blue-100 text-blue-700",
  URGENT: "bg-amber-100 text-amber-700",
  STAT: "bg-red-100 text-red-700",
}

export default function LabResultDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const cfg = statusConfig[result.status] ?? statusConfig.COMPLETED
  const hasAbnormal = result.parameters.some(p => p.resultStatus !== "NORMAL")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/lab/results">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Result Report</h1>
            <p className="text-muted-foreground">Verified laboratory test results</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" />Print</Button>
          <Button onClick={() => toast({ title: "Result sent to doctor" })}>
            <Send className="mr-2 h-4 w-4" />Send to Doctor
          </Button>
        </div>
      </div>

      {/* Overview Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold font-mono">{result.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}>
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                <Badge className={`${priorityColors[result.priority]} text-xs`}>{result.priority}</Badge>
                {hasAbnormal && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />Abnormal Values
                  </Badge>
                )}
              </div>
              <p className="text-lg font-semibold text-primary mt-1">{result.testType}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Completed: {result.completedDate} at {result.completedTime}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />Processing Time: {result.processingTime}</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Verified: {result.verifiedDate}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Verified by: <span className="font-medium">{result.verifiedBy}</span></p>
            </div>
            <div className="text-sm text-right text-muted-foreground space-y-0.5">
              <p>Req: <span className="font-mono text-xs font-medium">{result.requestId}</span></p>
              <p>Instrument: {result.instrument}</p>
              <p>Sample: {result.sampleType}</p>
              <p>Collected: {result.sampleCollectedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abnormal Alert */}
      {hasAbnormal && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Critical/Abnormal Values Detected</p>
              <p className="text-xs text-red-700 mt-0.5">
                {result.parameters.filter(p => p.resultStatus === "CRITICAL").length} critical and{" "}
                {result.parameters.filter(p => p.resultStatus === "HIGH" || p.resultStatus === "LOW").length} abnormal parameters.
                Physician review required.
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 shrink-0"
            onClick={() => toast({ title: "Critical alert sent to Dr. Wilson" })}>
            <AlertCircle className="mr-2 h-4 w-4" />Alert Physician
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.parameters.map((p, i) => {
                    const rCfg = resultColors[p.resultStatus] ?? resultColors.NORMAL
                    const Icon = rCfg.icon
                    return (
                      <TableRow key={i} className={rCfg.bg}>
                        <TableCell className="font-medium">{p.parameter}</TableCell>
                        <TableCell>
                          <span className={cn("font-bold text-base", rCfg.text)}>
                            {p.value} <span className="text-xs font-normal text-muted-foreground">{p.unit}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{p.prevValue} {p.unit}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{p.refRange} {p.unit}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{p.method}</TableCell>
                        <TableCell>
                          <span className={cn("flex items-center gap-1 font-medium text-sm", rCfg.text)}>
                            <Icon className="h-4 w-4" />{p.resultStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Lab Notes */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Lab Notes</CardTitle></CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed">{result.labNotes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-5 w-5" />Patient</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {result.patient.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{result.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{result.patient.gender}, {result.patient.age} yrs</p>
                </div>
              </div>
              <Separator />
              <div className="text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span className="font-medium">{result.patient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Allergies: </span>
                  {result.patient.allergies.map((a, i) => (
                    <Badge key={i} variant="destructive" className="text-xs ml-1">{a}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requesting Doctor */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Stethoscope className="h-5 w-5" />Requesting Doctor</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="font-semibold">{result.doctor.name}</p>
              <p className="text-primary text-xs">{result.doctor.specialization}</p>
              <p className="text-muted-foreground text-xs">{result.doctor.department}</p>
            </CardContent>
          </Card>

          {/* Result Summary */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Result Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-900/20">
                <span className="text-emerald-700">Normal</span>
                <span className="font-bold text-emerald-700">
                  {result.parameters.filter(p => p.resultStatus === "NORMAL").length}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-amber-50 dark:bg-amber-900/20">
                <span className="text-amber-700">Abnormal (H/L)</span>
                <span className="font-bold text-amber-700">
                  {result.parameters.filter(p => p.resultStatus === "HIGH" || p.resultStatus === "LOW").length}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-red-50 dark:bg-red-900/20">
                <span className="text-red-700">Critical</span>
                <span className="font-bold text-red-700">
                  {result.parameters.filter(p => p.resultStatus === "CRITICAL").length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
