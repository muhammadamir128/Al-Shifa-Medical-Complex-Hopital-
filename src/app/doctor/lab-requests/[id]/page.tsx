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
  Clock,
  Printer,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Send,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const labRequest = {
  id: "LAB-REQ-2024-047",
  testType: "Cardiac Enzyme Panel",
  requestDate: "2024-01-20",
  requestTime: "09:15 AM",
  priority: "URGENT",
  status: "COMPLETED",
  resultDate: "2024-01-20",
  resultTime: "02:30 PM",
  clinicalNotes: "Patient presenting with chest pain and shortness of breath. Rule out acute MI. Urgent cardiac enzyme panel required.",
  labNotes: "Sample quality good. All parameters processed successfully.",
  patient: {
    id: "P-001",
    name: "John Smith",
    age: 38,
    gender: "Male",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
  },
  results: [
    { parameter: "Troponin I", value: "0.08", unit: "ng/mL", refRange: "< 0.04", resultStatus: "HIGH", prevValue: "0.03" },
    { parameter: "CK-MB", value: "12.5", unit: "U/L", refRange: "0 - 25", resultStatus: "NORMAL", prevValue: "10.2" },
    { parameter: "LDH", value: "210", unit: "U/L", refRange: "140 - 280", resultStatus: "NORMAL", prevValue: "195" },
    { parameter: "BNP", value: "380", unit: "pg/mL", refRange: "< 100", resultStatus: "CRITICAL", prevValue: "120" },
  ],
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  PENDING: { label: "Pending", className: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  IN_PROGRESS: { label: "In Progress", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  COMPLETED: { label: "Completed", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  CANCELLED: { label: "Cancelled", className: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
}

const priorityColors: Record<string, string> = {
  ROUTINE: "bg-blue-100 text-blue-700",
  URGENT: "bg-amber-100 text-amber-700",
  STAT: "bg-red-100 text-red-700",
}

const resultColors: Record<string, { text: string; icon: typeof Minus }> = {
  NORMAL: { text: "text-emerald-600", icon: Minus },
  HIGH: { text: "text-red-600", icon: TrendingUp },
  LOW: { text: "text-blue-600", icon: TrendingDown },
  CRITICAL: { text: "text-red-700", icon: AlertCircle },
}

export default function LabRequestDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const cfg = statusConfig[labRequest.status] ?? statusConfig.PENDING
  const hasAbnormal = labRequest.results.some(r => r.resultStatus !== "NORMAL")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/doctor/lab-requests">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Request Details</h1>
            <p className="text-muted-foreground">View lab test request and results</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {labRequest.status === "COMPLETED" && (
            <>
              <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
              <Button variant="outline"><Printer className="mr-2 h-4 w-4" />Print</Button>
            </>
          )}
        </div>
      </div>

      {/* Request Overview */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold font-mono">{labRequest.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}>
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                <Badge className={`${priorityColors[labRequest.priority]} text-xs`}>{labRequest.priority}</Badge>
                {hasAbnormal && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />Abnormal Values
                  </Badge>
                )}
              </div>
              <p className="text-lg font-semibold mt-1 text-primary">{labRequest.testType}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Requested: {labRequest.requestDate} at {labRequest.requestTime}</span>
                {labRequest.resultDate && (
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Result: {labRequest.resultDate} at {labRequest.resultTime}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abnormal Alert */}
      {hasAbnormal && labRequest.status === "COMPLETED" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Abnormal Values Detected</p>
              <p className="text-xs text-red-700 mt-0.5">Some parameters are outside normal range. Clinical review recommended.</p>
            </div>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 shrink-0"
            onClick={() => toast({ title: "Alert sent to patient" })}>
            <Send className="mr-2 h-4 w-4" />Notify Patient
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results Table */}
        <div className="lg:col-span-2 space-y-6">
          {labRequest.status === "COMPLETED" && (
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
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labRequest.results.map((r, i) => {
                      const rCfg = resultColors[r.resultStatus] ?? resultColors.NORMAL
                      const Icon = rCfg.icon
                      return (
                        <TableRow key={i} className={r.resultStatus !== "NORMAL" ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                          <TableCell className="font-medium">{r.parameter}</TableCell>
                          <TableCell>
                            <span className={cn("font-bold text-base", rCfg.text)}>
                              {r.value} <span className="text-xs font-normal text-muted-foreground">{r.unit}</span>
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">{r.prevValue} {r.unit}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">{r.refRange} {r.unit}</TableCell>
                          <TableCell>
                            <span className={cn("flex items-center gap-1 font-medium text-sm", rCfg.text)}>
                              <Icon className="h-4 w-4" />{r.resultStatus}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Clinical Notes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Doctor&apos;s Clinical Notes</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">{labRequest.clinicalNotes}</div>
              </div>
              {labRequest.labNotes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Lab Technician Notes</p>
                  <div className="p-3 rounded-lg bg-muted/50 text-sm">{labRequest.labNotes}</div>
                </div>
              )}
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
                    {labRequest.patient.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{labRequest.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{labRequest.patient.gender}, {labRequest.patient.age} yrs</p>
                </div>
              </div>
              <Separator />
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span className="font-medium">{labRequest.patient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Allergies: </span>
                  {labRequest.patient.allergies.map((a, i) => (
                    <Badge key={i} variant="destructive" className="text-xs ml-1">{a}</Badge>
                  ))}
                </div>
              </div>
              <Link href={`/doctor/patients/${labRequest.patient.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-1">View Patient</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Result Summary */}
          {labRequest.status === "COMPLETED" && (
            <Card className="border-none shadow-md">
              <CardHeader><CardTitle className="text-base">Result Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-900/20">
                  <span className="text-emerald-700">Normal</span>
                  <span className="font-bold text-emerald-700">
                    {labRequest.results.filter(r => r.resultStatus === "NORMAL").length}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-amber-50 dark:bg-amber-900/20">
                  <span className="text-amber-700">Abnormal (High/Low)</span>
                  <span className="font-bold text-amber-700">
                    {labRequest.results.filter(r => r.resultStatus === "HIGH" || r.resultStatus === "LOW").length}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded bg-red-50 dark:bg-red-900/20">
                  <span className="text-red-700">Critical</span>
                  <span className="font-bold text-red-700">
                    {labRequest.results.filter(r => r.resultStatus === "CRITICAL").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline"
                onClick={() => toast({ title: "New lab request created" })}>
                <FlaskConical className="mr-2 h-4 w-4" />Request Follow-up Test
              </Button>
              {labRequest.status === "COMPLETED" && (
                <Button className="w-full justify-start" variant="outline"
                  onClick={() => toast({ title: "Added to medical record" })}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />Add to Medical Record
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
