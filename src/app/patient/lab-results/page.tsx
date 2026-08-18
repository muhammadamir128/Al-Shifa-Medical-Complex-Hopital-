"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FlaskConical,
  Search,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const labResults = [
  {
    id: "LAB-2024-001",
    testName: "Complete Blood Count (CBC)",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "Jan 15, 2024",
    resultDate: "Jan 16, 2024",
    status: "COMPLETED",
    priority: "ROUTINE",
    results: [
      { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", refRange: "13.5 - 17.5", status: "NORMAL" },
      { parameter: "WBC Count", value: "7.8", unit: "×10³/µL", refRange: "4.5 - 11.0", status: "NORMAL" },
      { parameter: "Platelet Count", value: "220", unit: "×10³/µL", refRange: "150 - 400", status: "NORMAL" },
      { parameter: "Hematocrit", value: "42", unit: "%", refRange: "41 - 53", status: "NORMAL" },
      { parameter: "RBC Count", value: "4.8", unit: "×10⁶/µL", refRange: "4.7 - 6.1", status: "NORMAL" },
    ],
  },
  {
    id: "LAB-2024-002",
    testName: "Lipid Panel",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "Jan 15, 2024",
    resultDate: "Jan 16, 2024",
    status: "COMPLETED",
    priority: "ROUTINE",
    results: [
      { parameter: "Total Cholesterol", value: "215", unit: "mg/dL", refRange: "< 200", status: "HIGH" },
      { parameter: "LDL Cholesterol", value: "142", unit: "mg/dL", refRange: "< 130", status: "HIGH" },
      { parameter: "HDL Cholesterol", value: "48", unit: "mg/dL", refRange: "> 40", status: "NORMAL" },
      { parameter: "Triglycerides", value: "160", unit: "mg/dL", refRange: "< 150", status: "HIGH" },
    ],
  },
  {
    id: "LAB-2024-003",
    testName: "HbA1c (Glycated Hemoglobin)",
    requestedBy: "Dr. Michael Brown",
    requestDate: "Dec 20, 2023",
    resultDate: "Dec 21, 2023",
    status: "COMPLETED",
    priority: "ROUTINE",
    results: [
      { parameter: "HbA1c", value: "7.2", unit: "%", refRange: "< 5.7 (Normal), 5.7-6.4 (Pre-diabetic), ≥6.5 (Diabetic)", status: "HIGH" },
      { parameter: "Estimated Avg Glucose", value: "160", unit: "mg/dL", refRange: "< 126", status: "HIGH" },
    ],
  },
  {
    id: "LAB-2024-004",
    testName: "Thyroid Function Test",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "Jan 18, 2024",
    resultDate: null,
    status: "IN_PROGRESS",
    priority: "URGENT",
    results: [],
  },
  {
    id: "LAB-2024-005",
    testName: "Liver Function Test (LFT)",
    requestedBy: "Dr. Lisa Chen",
    requestDate: "Nov 10, 2023",
    resultDate: "Nov 11, 2023",
    status: "COMPLETED",
    priority: "ROUTINE",
    results: [
      { parameter: "ALT (SGPT)", value: "28", unit: "U/L", refRange: "7 - 40", status: "NORMAL" },
      { parameter: "AST (SGOT)", value: "32", unit: "U/L", refRange: "10 - 40", status: "NORMAL" },
      { parameter: "Total Bilirubin", value: "0.8", unit: "mg/dL", refRange: "0.3 - 1.2", status: "NORMAL" },
      { parameter: "Alkaline Phosphatase", value: "78", unit: "U/L", refRange: "44 - 147", status: "NORMAL" },
    ],
  },
]

const statusConfig = {
  COMPLETED: { label: "Completed", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  IN_PROGRESS: { label: "In Progress", icon: Clock, className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  PENDING: { label: "Pending", icon: Clock, className: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  CANCELLED: { label: "Cancelled", icon: AlertCircle, className: "bg-gray-100 text-gray-700 border-gray-200", dot: "bg-gray-400" },
}

const resultStatusConfig = {
  NORMAL: { label: "Normal", className: "text-emerald-600", icon: Minus },
  HIGH: { label: "High", className: "text-red-600", icon: TrendingUp },
  LOW: { label: "Low", className: "text-blue-600", icon: TrendingDown },
  CRITICAL: { label: "Critical", className: "text-red-700 font-bold", icon: AlertCircle },
}

export default function PatientLabResultsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedResult, setSelectedResult] = useState<(typeof labResults)[0] | null>(null)

  const filtered = labResults.filter((r) => {
    const matchSearch = r.testName.toLowerCase().includes(search.toLowerCase()) ||
      r.requestedBy.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const completedCount = labResults.filter((r) => r.status === "COMPLETED").length
  const pendingCount = labResults.filter((r) => r.status === "IN_PROGRESS" || r.status === "PENDING").length
  const abnormalCount = labResults.filter((r) =>
    r.results.some((res) => res.status !== "NORMAL")
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lab Results</h1>
          <p className="text-muted-foreground">View your laboratory test results and history</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download All Results
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{labResults.length}</p>
                <p className="text-xs text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Results Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Awaiting Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{abnormalCount}</p>
                <p className="text-xs text-muted-foreground">Abnormal Values</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abnormal Alert */}
      {abnormalCount > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Abnormal Results Found</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {abnormalCount} of your recent tests have values outside the normal range. Please consult your doctor for guidance.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by test name or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filtered.map((result) => {
          const cfg = statusConfig[result.status as keyof typeof statusConfig] ?? statusConfig.PENDING
          const StatusIcon = cfg.icon
          const hasAbnormal = result.results.some((r) => r.status !== "NORMAL")
          return (
            <Card key={result.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border", cfg.className)}>
                      <FlaskConical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{result.testName}</h3>
                        <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", cfg.className)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                          {cfg.label}
                        </span>
                        {hasAbnormal && (
                          <Badge variant="destructive" className="text-xs">Abnormal</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Requested by {result.requestedBy}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Requested: {result.requestDate}
                        </span>
                        {result.resultDate && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            Result: {result.resultDate}
                          </span>
                        )}
                        <Badge variant="outline" className="text-xs">{result.priority}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {result.status === "COMPLETED" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)} className="gap-1.5 text-xs">
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </Button>
                      </>
                    )}
                    {result.status === "IN_PROGRESS" && (
                      <Badge variant="outline" className="text-amber-600 border-amber-400">Processing...</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Result Detail Dialog */}
      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedResult?.testName}</DialogTitle>
            <DialogDescription>
              {selectedResult?.requestDate} · {selectedResult?.requestedBy}
            </DialogDescription>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground">Test ID</p>
                  <p className="font-mono font-semibold text-sm">{selectedResult.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground">Result Date</p>
                  <p className="font-semibold text-sm">{selectedResult.resultDate}</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Your Value</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedResult.results.map((r, i) => {
                    const rCfg = resultStatusConfig[r.status as keyof typeof resultStatusConfig] ?? resultStatusConfig.NORMAL
                    const Icon = rCfg.icon
                    return (
                      <TableRow key={i} className={r.status !== "NORMAL" ? "bg-red-50 dark:bg-red-900/10" : ""}>
                        <TableCell className="font-medium text-sm">{r.parameter}</TableCell>
                        <TableCell className={cn("font-bold", rCfg.className)}>{r.value}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.unit}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{r.refRange}</TableCell>
                        <TableCell>
                          <span className={cn("flex items-center gap-1 text-sm font-medium", rCfg.className)}>
                            <Icon className="h-4 w-4" />
                            {rCfg.label}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
