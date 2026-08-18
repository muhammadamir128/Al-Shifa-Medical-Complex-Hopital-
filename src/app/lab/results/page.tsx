"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Printer,
  Send,
  ArrowUpRight,
  User,
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

const results = [
  {
    id: "RES-2024-001",
    labId: "LAB-2024-003",
    patient: "John Smith",
    patientId: "P-12345",
    testType: "Complete Blood Count",
    status: "REVIEWED",
    result: "NORMAL",
    completedAt: "2024-01-15 11:45",
    reviewedBy: "Dr. Sarah Wilson",
    hasCritical: false,
  },
  {
    id: "RES-2024-002",
    labId: "LAB-2024-006",
    patient: "Emily Davis",
    patientId: "P-12346",
    testType: "Blood Glucose",
    status: "PENDING_REVIEW",
    result: "ABNORMAL",
    completedAt: "2024-01-15 12:30",
    reviewedBy: null,
    hasCritical: false,
  },
  {
    id: "RES-2024-003",
    labId: "LAB-2024-007",
    patient: "Jennifer Taylor",
    patientId: "P-12350",
    testType: "Metabolic Panel",
    status: "CRITICAL",
    result: "CRITICAL",
    completedAt: "2024-01-15 11:15",
    reviewedBy: "Dr. Brown",
    hasCritical: true,
  },
  {
    id: "RES-2024-004",
    labId: "LAB-2024-008",
    patient: "Thomas Anderson",
    patientId: "P-12353",
    testType: "PT/INR",
    status: "REVIEWED",
    result: "NORMAL",
    completedAt: "2024-01-15 10:50",
    reviewedBy: "Dr. Lee",
    hasCritical: false,
  },
  {
    id: "RES-2024-005",
    labId: "LAB-2024-009",
    patient: "Maria Garcia",
    patientId: "P-12354",
    testType: "HbA1c",
    status: "PENDING_REVIEW",
    result: "ABNORMAL",
    completedAt: "2024-01-15 10:30",
    reviewedBy: null,
    hasCritical: false,
  },
  {
    id: "RES-2024-006",
    labId: "LAB-2024-010",
    patient: "Mark Thompson",
    patientId: "P-12355",
    testType: "Cardiac Panel",
    status: "CRITICAL",
    result: "CRITICAL",
    completedAt: "2024-01-15 10:45",
    reviewedBy: "Dr. Wilson",
    hasCritical: true,
  },
]

const detailedResult = {
  patient: "John Smith",
  patientId: "P-12345",
  dob: "1985-03-15",
  gender: "Male",
  testType: "Complete Blood Count (CBC)",
  collectedAt: "2024-01-15 08:30",
  reportedAt: "2024-01-15 11:45",
  technician: "Sarah Johnson",
  reviewer: "Dr. Sarah Wilson",
  values: [
    { name: "WBC", result: "7.5", unit: "x10^9/L", normalRange: "4.5-11.0", flag: "NORMAL" },
    { name: "RBC", result: "5.2", unit: "x10^12/L", normalRange: "4.5-5.5", flag: "NORMAL" },
    { name: "Hemoglobin", result: "15.2", unit: "g/dL", normalRange: "13.5-17.5", flag: "NORMAL" },
    { name: "Hematocrit", result: "45", unit: "%", normalRange: "38-50", flag: "NORMAL" },
    { name: "Platelets", result: "250", unit: "x10^9/L", normalRange: "150-400", flag: "NORMAL" },
    { name: "MCV", result: "87", unit: "fL", normalRange: "80-100", flag: "NORMAL" },
    { name: "MCH", result: "29", unit: "pg", normalRange: "27-33", flag: "NORMAL" },
    { name: "MCHC", result: "33.8", unit: "g/dL", normalRange: "32-36", flag: "NORMAL" },
  ],
  notes: "Sample collected in EDTA tube. No hemolysis observed.",
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "REVIEWED":
      return <Badge className="bg-green-500 gap-1"><CheckCircle className="h-3 w-3" />Reviewed</Badge>
    case "PENDING_REVIEW":
      return <Badge variant="outline" className="border-amber-500 text-amber-600 gap-1"><Clock className="h-3 w-3" />Pending Review</Badge>
    case "CRITICAL":
      return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Critical</Badge>
    case "DRAFT":
      return <Badge variant="secondary">Draft</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getResultBadge = (result: string) => {
  switch (result) {
    case "NORMAL":
      return <Badge variant="outline" className="border-green-500 text-green-600">Normal</Badge>
    case "ABNORMAL":
      return <Badge className="bg-amber-500">Abnormal</Badge>
    case "CRITICAL":
      return <Badge variant="destructive">Critical</Badge>
    default:
      return <Badge variant="outline">{result}</Badge>
  }
}

const getValueFlag = (flag: string) => {
  switch (flag) {
    case "HIGH":
      return <TrendingUp className="h-4 w-4 text-red-500" />
    case "LOW":
      return <TrendingDown className="h-4 w-4 text-blue-500" />
    case "CRITICAL_HIGH":
    case "CRITICAL_LOW":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

export default function ResultsPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Test Results</h1>
            <p className="text-muted-foreground">
              Manage and review laboratory test results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Results
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Enter Results
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Enter Test Results</DialogTitle>
                  <DialogDescription>
                    Enter the results for the selected test request
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lab Request ID</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select request" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LAB-2024-001">LAB-2024-001</SelectItem>
                          <SelectItem value="LAB-2024-002">LAB-2024-002</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <Input value="John Smith" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Test Type</Label>
                    <Input value="Complete Blood Count" disabled />
                  </div>
                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">Test Values</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">WBC (x10^9/L)</Label>
                        <Input placeholder="Result" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">RBC (x10^12/L)</Label>
                        <Input placeholder="Result" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Hemoglobin (g/dL)</Label>
                        <Input placeholder="Result" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Hematocrit (%)</Label>
                        <Input placeholder="Result" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Platelets (x10^9/L)</Label>
                        <Input placeholder="Result" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">MCV (fL)</Label>
                        <Input placeholder="Result" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes / Comments</Label>
                    <Textarea placeholder="Enter any additional notes or observations..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Save Draft</Button>
                  <Button>Submit for Review</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reviewed</p>
                  <p className="text-xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Today</p>
                  <p className="text-xl font-bold">54</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="critical">Critical Values</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search results..." className="pl-8 w-[250px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="abnormal">Abnormal</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Result ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Test Type</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Completed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result) => (
                        <TableRow key={result.id} className={result.hasCritical ? "bg-red-50/50" : ""}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-rose-600" />
                              </div>
                              <div>
                                <p className="font-medium">{result.patient}</p>
                                <p className="text-xs text-muted-foreground">{result.patientId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{result.testType}</TableCell>
                          <TableCell>{getResultBadge(result.result)}</TableCell>
                          <TableCell>{getStatusBadge(result.status)}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {result.completedAt}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Results
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print Report
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send to Physician
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Results Pending Review</CardTitle>
                <CardDescription>Results that need physician review</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Result ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.filter(r => r.status === "PENDING_REVIEW").map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patient}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{result.completedAt}</TableCell>
                        <TableCell>
                          <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            Send for Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical">
            <Card className="border-none shadow-md border-red-200">
              <CardHeader className="bg-red-50 border-b">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Values - Immediate Action Required
                </CardTitle>
                <CardDescription>
                  These results have critical values that need immediate physician notification
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Result ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Critical Values</TableHead>
                      <TableHead>Notified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.filter(r => r.hasCritical).map((result) => (
                      <TableRow key={result.id} className="bg-red-50/50">
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patient}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Critical</Badge>
                        </TableCell>
                        <TableCell>
                          {result.reviewedBy ? (
                            <span className="text-green-600">Yes - {result.reviewedBy}</span>
                          ) : (
                            <span className="text-red-600 font-medium">Not Notified</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="destructive">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Notify Physician
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Reviewed Results</CardTitle>
                <CardDescription>Results that have been reviewed by physicians</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Result ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Reviewed By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.filter(r => r.status === "REVIEWED").map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patient}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{getResultBadge(result.result)}</TableCell>
                        <TableCell>{result.reviewedBy}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detailed Result View */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Result Details: {detailedResult.testType}</CardTitle>
              <CardDescription>
                Patient: {detailedResult.patient} ({detailedResult.patientId})
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button size="sm">
                <Send className="mr-2 h-4 w-4" />
                Send to Physician
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
              <div>
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{detailedResult.dob}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p className="font-medium">{detailedResult.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Collected</p>
                <p className="font-medium">{detailedResult.collectedAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Reported</p>
                <p className="font-medium">{detailedResult.reportedAt}</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Flag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedResult.values.map((value) => (
                  <TableRow key={value.name}>
                    <TableCell className="font-medium">{value.name}</TableCell>
                    <TableCell>{value.result}</TableCell>
                    <TableCell className="text-muted-foreground">{value.unit}</TableCell>
                    <TableCell className="text-muted-foreground">{value.normalRange}</TableCell>
                    <TableCell>
                      {value.flag === "NORMAL" ? (
                        <Badge variant="outline" className="border-green-500 text-green-600">Normal</Badge>
                      ) : (
                        getValueFlag(value.flag)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Notes:</p>
              <p className="text-sm text-muted-foreground">{detailedResult.notes}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Technician</p>
                <p className="font-medium">{detailedResult.technician}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Reviewed By</p>
                <p className="font-medium">{detailedResult.reviewer}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
