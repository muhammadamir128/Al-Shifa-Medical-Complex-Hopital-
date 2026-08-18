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
  FlaskConical,
  TestTubes,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Play,
  Eye,
  FileText,
  Download,
} from "lucide-react"

const allRequests = [
  { id: "LAB-2024-001", patient: "John Smith", patientId: "P-12345", testType: "Complete Blood Count", department: "Hematology", priority: "STAT", status: "PENDING", requestedBy: "Dr. Sarah Wilson", requestedAt: "2024-01-15 08:30", notes: "Fasting sample collected" },
  { id: "LAB-2024-002", patient: "Emily Davis", patientId: "P-12346", testType: "Blood Glucose", department: "Chemistry", priority: "URGENT", status: "PENDING", requestedBy: "Dr. Michael Brown", requestedAt: "2024-01-15 09:15", notes: "Pre-diabetic monitoring" },
  { id: "LAB-2024-003", patient: "Robert Johnson", patientId: "P-12347", testType: "Lipid Profile", department: "Chemistry", priority: "ROUTINE", status: "IN_PROGRESS", requestedBy: "Dr. Lisa Chen", requestedAt: "2024-01-15 09:45", notes: "Annual checkup" },
  { id: "LAB-2024-004", patient: "Sarah Miller", patientId: "P-12348", testType: "Liver Function Test", department: "Chemistry", priority: "URGENT", status: "PENDING", requestedBy: "Dr. James Wilson", requestedAt: "2024-01-15 10:00", notes: "Suspected liver condition" },
  { id: "LAB-2024-005", patient: "Michael Lee", patientId: "P-12349", testType: "Thyroid Panel", department: "Chemistry", priority: "ROUTINE", status: "PENDING", requestedBy: "Dr. Emma Thompson", requestedAt: "2024-01-15 10:30", notes: "Thyroid disorder follow-up" },
  { id: "LAB-2024-006", patient: "Jennifer Taylor", patientId: "P-12350", testType: "Urinalysis", department: "Urinalysis", priority: "ROUTINE", status: "IN_PROGRESS", requestedBy: "Dr. Brown", requestedAt: "2024-01-15 10:45", notes: "UTI symptoms" },
  { id: "LAB-2024-007", patient: "David Wilson", patientId: "P-12351", testType: "PT/INR", department: "Hematology", priority: "STAT", status: "PENDING", requestedBy: "Dr. Chen", requestedAt: "2024-01-15 11:00", notes: "Warfarin monitoring" },
  { id: "LAB-2024-008", patient: "Alice Brown", patientId: "P-12352", testType: "HbA1c", department: "Chemistry", priority: "ROUTINE", status: "PENDING", requestedBy: "Dr. Thompson", requestedAt: "2024-01-15 11:15", notes: "Diabetes management" },
  { id: "LAB-2024-009", patient: "Thomas Anderson", patientId: "P-12353", testType: "Blood Culture", department: "Microbiology", priority: "URGENT", status: "PENDING", requestedBy: "Dr. Wilson", requestedAt: "2024-01-15 11:30", notes: "Suspected sepsis" },
  { id: "LAB-2024-010", patient: "Maria Garcia", patientId: "P-12354", testType: "Electrolytes", department: "Chemistry", priority: "STAT", status: "PENDING", requestedBy: "Dr. Brown", requestedAt: "2024-01-15 11:45", notes: "Dehydration assessment" },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "STAT":
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />{priority}</Badge>
    case "URGENT":
      return <Badge className="bg-amber-500 gap-1"><Clock className="h-3 w-3" />{priority}</Badge>
    case "ROUTINE":
      return <Badge variant="secondary">{priority}</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="outline" className="border-amber-500 text-amber-600">Pending</Badge>
    case "IN_PROGRESS":
      return <Badge className="bg-blue-500">In Progress</Badge>
    case "COMPLETED":
      return <Badge className="bg-green-500">Completed</Badge>
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function TestRequestsPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Test Requests</h1>
            <p className="text-muted-foreground">
              Manage incoming lab test requests and samples
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <FlaskConical className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Play className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-xl font-bold">2</p>
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
                  <p className="text-sm text-muted-foreground">STAT</p>
                  <p className="text-xl font-bold">3</p>
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
                  <p className="text-sm text-muted-foreground">Today&apos;s Completed</p>
                  <p className="text-xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="stat">STAT</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-8 w-[250px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="hematology">Hematology</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="microbiology">Microbiology</SelectItem>
                  <SelectItem value="urinalysis">Urinalysis</SelectItem>
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
                        <TableHead>Request ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Test Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Department</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Requested</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-rose-600" />
                              </div>
                              <div>
                                <p className="font-medium">{request.patient}</p>
                                <p className="text-xs text-muted-foreground">{request.patientId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{request.testType}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant="outline">{request.department}</Badge>
                          </TableCell>
                          <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {request.requestedAt}
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
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Enter Results
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Cancel Request
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
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRequests.filter(r => r.status === "PENDING").map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.patient}</TableCell>
                        <TableCell>{request.testType}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>
                          <Button size="sm">Start Processing</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress">
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Started At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRequests.filter(r => r.status === "IN_PROGRESS").map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.patient}</TableCell>
                        <TableCell>{request.testType}</TableCell>
                        <TableCell>{request.requestedAt}</TableCell>
                        <TableCell>
                          <Button size="sm">Enter Results</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stat">
            <Card className="border-none shadow-md border-red-200">
              <CardHeader className="bg-red-50 border-b">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  STAT Requests - Immediate Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRequests.filter(r => r.priority === "STAT").map((request) => (
                      <TableRow key={request.id} className="bg-red-50/50">
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.patient}</TableCell>
                        <TableCell>{request.testType}</TableCell>
                        <TableCell>{request.requestedAt}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Play className="mr-2 h-4 w-4" />
                            Process Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
