"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  TestTubes,
  FlaskConical,
  FileText,
  Calendar,
  User,
  Download,
  Filter,
  Activity,
  ArrowUpRight,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock lab requests data
const labRequests = [
  {
    id: "LAB001",
    patient: { name: "John Smith", id: "PAT001", avatar: "JS", age: 45, gender: "Male" },
    tests: ["Complete Blood Count", "Lipid Panel"],
    priority: "ROUTINE",
    status: "PENDING",
    requestedDate: "2024-01-20",
    urgency: "Normal",
    notes: "Annual check-up screening",
  },
  {
    id: "LAB002",
    patient: { name: "Emily Davis", id: "PAT002", avatar: "ED", age: 32, gender: "Female" },
    tests: ["Troponin I", "BNP", "Electrolytes"],
    priority: "STAT",
    status: "IN_PROGRESS",
    requestedDate: "2024-01-20",
    urgency: "Urgent",
    notes: "Chest pain evaluation",
  },
  {
    id: "LAB003",
    patient: { name: "Robert Johnson", id: "PAT003", avatar: "RJ", age: 58, gender: "Male" },
    tests: ["HbA1c", "Fasting Glucose", "Kidney Function"],
    priority: "ROUTINE",
    status: "COMPLETED",
    requestedDate: "2024-01-19",
    urgency: "Normal",
    notes: "Diabetes monitoring",
  },
  {
    id: "LAB004",
    patient: { name: "Sarah Miller", id: "PAT004", avatar: "SM", age: 28, gender: "Female" },
    tests: ["Thyroid Panel", "Vitamin D"],
    priority: "ROUTINE",
    status: "PENDING",
    requestedDate: "2024-01-20",
    urgency: "Normal",
    notes: "Fatigue evaluation",
  },
  {
    id: "LAB005",
    patient: { name: "Michael Lee", id: "PAT005", avatar: "ML", age: 42, gender: "Male" },
    tests: ["Liver Function", "Lipid Panel", "Glucose"],
    priority: "URGENT",
    status: "PENDING",
    requestedDate: "2024-01-20",
    urgency: "High",
    notes: "Pre-surgical workup",
  },
  {
    id: "LAB006",
    patient: { name: "Jennifer Brown", id: "PAT006", avatar: "JB", age: 35, gender: "Female" },
    tests: ["CBC", "CRP", "ESR"],
    priority: "ROUTINE",
    status: "COMPLETED",
    requestedDate: "2024-01-18",
    urgency: "Normal",
    notes: "Post-surgery follow-up",
  },
  {
    id: "LAB007",
    patient: { name: "William Wilson", id: "PAT007", avatar: "WW", age: 67, gender: "Male" },
    tests: ["Cardiac Enzymes", "Troponin", "ECG correlation labs"],
    priority: "STAT",
    status: "IN_PROGRESS",
    requestedDate: "2024-01-20",
    urgency: "Critical",
    notes: "Suspected MI",
  },
  {
    id: "LAB008",
    patient: { name: "Amanda Taylor", id: "PAT008", avatar: "AT", age: 24, gender: "Female" },
    tests: ["Urinalysis", "Culture"],
    priority: "ROUTINE",
    status: "CANCELLED",
    requestedDate: "2024-01-19",
    urgency: "Normal",
    notes: "UTI suspected - patient cancelled",
  },
]

// Available tests for new request
const availableTests = [
  { category: "Hematology", tests: ["Complete Blood Count (CBC)", "Hemoglobin", "Hematocrit", "Platelet Count", "WBC Differential"] },
  { category: "Chemistry", tests: ["Basic Metabolic Panel", "Comprehensive Metabolic Panel", "Liver Function Test", "Kidney Function Test", "Lipid Panel", "Glucose", "HbA1c"] },
  { category: "Cardiac", tests: ["Troponin I", "Troponin T", "BNP", "CK-MB", "CRP", "Homocysteine"] },
  { category: "Thyroid", tests: ["TSH", "Free T4", "Free T3", "Thyroid Panel"] },
  { category: "Urinalysis", tests: ["Urinalysis", "Urine Culture", "24-Hour Urine"] },
  { category: "Other", tests: ["Vitamin D", "Vitamin B12", "Iron Studies", "Folate", "ESR"] },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  ROUTINE: { label: "Routine", className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300" },
  URGENT: { label: "Urgent", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  STAT: { label: "STAT", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function DoctorLabRequestsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [newRequestNotes, setNewRequestNotes] = useState("")
  const [newRequestPriority, setNewRequestPriority] = useState("ROUTINE")

  const filteredRequests = labRequests.filter(req => {
    const matchesSearch = req.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const toggleTest = (test: string) => {
    setSelectedTests(prev =>
      prev.includes(test)
        ? prev.filter(t => t !== test)
        : [...prev, test]
    )
  }

  const handleSubmitRequest = () => {
    if (selectedTests.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one test",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Lab request submitted successfully",
    })
    setIsDialogOpen(false)
    setSelectedTests([])
    setNewRequestNotes("")
    setNewRequestPriority("ROUTINE")
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Requests</h1>
            <p className="text-muted-foreground">
              Request and manage laboratory tests for your patients
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Lab Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>New Lab Request</DialogTitle>
                  <DialogDescription>
                    Request laboratory tests for a patient
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Patient Selection */}
                  <div className="space-y-2">
                    <Label>Select Patient</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search patient..."
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={newRequestPriority} onValueChange={setNewRequestPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ROUTINE">Routine</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                        <SelectItem value="STAT">STAT (Emergency)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tests Selection */}
                  <div className="space-y-2">
                    <Label>Select Tests</Label>
                    <div className="space-y-4 max-h-64 overflow-y-auto border rounded-lg p-4">
                      {availableTests.map((category) => (
                        <div key={category.category}>
                          <h4 className="font-medium text-sm mb-2">{category.category}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.tests.map((test) => (
                              <button
                                key={test}
                                onClick={() => toggleTest(test)}
                                className={`p-2 text-left text-sm rounded border transition-colors ${
                                  selectedTests.includes(test)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "hover:bg-muted/50"
                                }`}
                              >
                                {test}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedTests.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {selectedTests.length} test(s) selected
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Clinical Notes</Label>
                    <Textarea
                      placeholder="Enter clinical notes or reason for tests..."
                      value={newRequestNotes}
                      onChange={(e) => setNewRequestNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest}>
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">STAT/Urgent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by patient or request ID..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="ROUTINE">Routine</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                    <SelectItem value="STAT">STAT</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lab Requests Table */}
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Tests</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Requested Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FlaskConical className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{request.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {request.patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {request.patient.id} | {request.patient.age}y {request.patient.gender.charAt(0)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {request.tests.slice(0, 2).map((test, i) => (
                          <Badge key={i} variant="outline" className="text-xs truncate">
                            {test}
                          </Badge>
                        ))}
                        {request.tests.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{request.tests.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityConfig[request.priority]?.className}>
                        {priorityConfig[request.priority]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {request.requestedDate}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[request.status]?.className}>
                        {statusConfig[request.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                            <FileText className="mr-2 h-4 w-4" />
                            View Results
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Patient Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {request.status === "PENDING" && (
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Request
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TestTubes className="h-5 w-5 text-primary" />
                Common Test Panels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="text-left">
                    <p className="font-medium text-sm">Complete Blood Count</p>
                    <p className="text-xs text-muted-foreground">CBC with differential</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="text-left">
                    <p className="font-medium text-sm">Basic Metabolic Panel</p>
                    <p className="text-xs text-muted-foreground">8 tests</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="text-left">
                    <p className="font-medium text-sm">Lipid Panel</p>
                    <p className="text-xs text-muted-foreground">Cholesterol profile</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-3">
                  <div className="text-left">
                    <p className="font-medium text-sm">Liver Function</p>
                    <p className="text-xs text-muted-foreground">Hepatic panel</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Turnaround Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Routine Tests</span>
                  <Badge variant="outline">24-48 hours</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Urgent Tests</span>
                  <Badge variant="outline" className="border-amber-500 text-amber-600">4-6 hours</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">STAT Tests</span>
                  <Badge variant="outline" className="border-red-500 text-red-600">1-2 hours</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
