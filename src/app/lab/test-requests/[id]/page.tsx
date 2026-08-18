"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  AlertCircle,
  CheckCircle2,
  Upload,
  FileText,
  Stethoscope,
  Activity,
  Save,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const testRequest = {
  id: "LAB-REQ-2024-047",
  patient: {
    name: "John Smith",
    id: "P-001",
    age: 38,
    gender: "Male",
    bloodGroup: "O+",
    phone: "(555) 234-5678",
  },
  requestedBy: "Dr. Sarah Wilson",
  department: "Cardiology",
  requestDate: "2024-01-20",
  requestTime: "09:15 AM",
  priority: "URGENT",
  status: "IN_PROGRESS",
  testType: "Cardiac Enzyme Panel",
  clinicalNotes: "Patient presenting with chest pain and shortness of breath. Rule out acute MI. Urgent cardiac enzyme panel required.",
  tests: [
    { name: "Troponin I", status: "COMPLETED", value: "0.08", unit: "ng/mL", refRange: "< 0.04", resultStatus: "HIGH" },
    { name: "CK-MB", status: "COMPLETED", value: "12.5", unit: "U/L", refRange: "0 - 25", resultStatus: "NORMAL" },
    { name: "LDH", status: "IN_PROGRESS", value: null, unit: "U/L", refRange: "140 - 280", resultStatus: null },
    { name: "BNP", status: "PENDING", value: null, unit: "pg/mL", refRange: "< 100", resultStatus: null },
  ],
}

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  PENDING: { label: "Pending", className: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  IN_PROGRESS: { label: "In Progress", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  COMPLETED: { label: "Completed", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  CANCELLED: { label: "Cancelled", className: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
}

const priorityConfig: Record<string, string> = {
  ROUTINE: "bg-blue-100 text-blue-700",
  URGENT: "bg-amber-100 text-amber-700",
  STAT: "bg-red-100 text-red-700",
}

const resultStatusConfig: Record<string, string> = {
  NORMAL: "text-emerald-600",
  HIGH: "text-red-600 font-bold",
  LOW: "text-blue-600 font-bold",
  CRITICAL: "text-red-700 font-bold",
}

export default function LabTestRequestDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [status, setStatus] = useState(testRequest.status)
  const [resultNotes, setResultNotes] = useState("")
  const [testResults, setTestResults] = useState(
    testRequest.tests.map((t) => ({ ...t, inputValue: t.value ?? "" }))
  )

  const cfg = statusConfig[status] ?? statusConfig.PENDING
  const allCompleted = testResults.every((t) => t.status === "COMPLETED")

  const handleSaveResults = () => {
    toast({ title: "Results Saved", description: "Test results have been saved successfully." })
  }

  const handleSubmitResults = () => {
    setStatus("COMPLETED")
    toast({ title: "Results Submitted", description: "Lab results have been submitted and the doctor has been notified." })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/lab/test-requests">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Test Request Details</h1>
            <p className="text-muted-foreground">View and process lab test request</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${priorityConfig[testRequest.priority]} text-sm px-3 py-1.5`}>
            {testRequest.priority === "URGENT" && <AlertCircle className="h-4 w-4 mr-1" />}
            {testRequest.priority} Priority
          </Badge>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${cfg.className}`}>
            <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Request Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Overview */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Request Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Request ID</p>
                  <p className="font-mono font-semibold text-sm mt-1">{testRequest.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Test Type</p>
                  <p className="font-semibold text-sm mt-1">{testRequest.testType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Requested By</p>
                  <p className="font-semibold text-sm mt-1">{testRequest.requestedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="font-semibold text-sm mt-1">{testRequest.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Request Date</p>
                  <p className="font-semibold text-sm mt-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {testRequest.requestDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Request Time</p>
                  <p className="font-semibold text-sm mt-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {testRequest.requestTime}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Clinical Notes</p>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  {testRequest.clinicalNotes}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results Entry */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Test Parameters & Results
              </CardTitle>
              <CardDescription>Enter results for each test parameter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test, i) => {
                  const tCfg = statusConfig[test.status] ?? statusConfig.PENDING
                  return (
                    <div key={i} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-sm">{test.name}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${tCfg.className}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${tCfg.dot}`} />
                          {tCfg.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Result Value</p>
                          {test.status === "COMPLETED" ? (
                            <p className={`font-bold ${test.resultStatus ? resultStatusConfig[test.resultStatus] : ""}`}>
                              {test.value} {test.unit}
                            </p>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Input
                                placeholder="Enter value"
                                value={test.inputValue}
                                onChange={(e) => {
                                  const updated = [...testResults]
                                  updated[i] = { ...updated[i], inputValue: e.target.value }
                                  setTestResults(updated)
                                }}
                                className="h-8 text-sm"
                              />
                              <span className="text-xs text-muted-foreground">{test.unit}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Reference Range</p>
                          <p className="text-muted-foreground">{test.refRange} {test.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          {test.status === "COMPLETED" && test.resultStatus ? (
                            <span className={`font-medium ${resultStatusConfig[test.resultStatus]}`}>
                              {test.resultStatus}
                            </span>
                          ) : test.status !== "COMPLETED" ? (
                            <Select
                              value={test.status}
                              onValueChange={(v) => {
                                const updated = [...testResults]
                                updated[i] = { ...updated[i], status: v }
                                setTestResults(updated)
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                <SelectItem value="COMPLETED">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <Label>Lab Technician Notes</Label>
                  <Textarea
                    placeholder="Add any notes or observations about the test results..."
                    value={resultNotes}
                    onChange={(e) => setResultNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleSaveResults}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSubmitResults} disabled={status === "COMPLETED"}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {status === "COMPLETED" ? "Results Submitted" : "Submit Results"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {testRequest.patient.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testRequest.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{testRequest.patient.id}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{testRequest.patient.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span className="font-medium">{testRequest.patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span className="font-medium">{testRequest.patient.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{testRequest.patient.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Status */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Update Status</CardTitle>
              <CardDescription>Change the overall request status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Status Updated" })}>
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload Attachment
              </Button>
              <Link href="/lab/results/upload" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Bulk Upload Results
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Print Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Stethoscope className="mr-2 h-4 w-4" />
                Contact Doctor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
