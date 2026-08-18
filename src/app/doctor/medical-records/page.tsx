"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Calendar,
  FileText,
  UserRound,
  Download,
  Filter,
  FolderOpen,
  Stethoscope,
  Activity,
  HeartPulse,
  ClipboardList,
  FileImage,
  File,
  Edit,
  Printer,
  Share2,
  Clock,
} from "lucide-react"
import { useState } from "react"

const medicalRecords = [
  { 
    id: "MR001", 
    patient: "John Smith", 
    patientId: "PAT001",
    type: "Consultation", 
    date: "2024-01-20",
    diagnosis: "Essential Hypertension",
    treatment: "ACE inhibitors, lifestyle modifications",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    attachments: 2
  },
  { 
    id: "MR002", 
    patient: "Emily Davis", 
    patientId: "PAT002",
    type: "Lab Results", 
    date: "2024-01-20",
    diagnosis: "Cardiac Arrhythmia",
    treatment: "Antiarrhythmic therapy",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    attachments: 3
  },
  { 
    id: "MR003", 
    patient: "Robert Johnson", 
    patientId: "PAT003",
    type: "Check-up", 
    date: "2024-01-20",
    diagnosis: "Type 2 Diabetes Mellitus",
    treatment: "Metformin, dietary changes",
    doctor: "Dr. Sarah Wilson",
    department: "Endocrinology",
    attachments: 1
  },
  { 
    id: "MR004", 
    patient: "Sarah Miller", 
    patientId: "PAT004",
    type: "Follow-up", 
    date: "2024-01-19",
    diagnosis: "Asthma - Moderate Persistent",
    treatment: "Inhaled corticosteroids",
    doctor: "Dr. Sarah Wilson",
    department: "Pulmonology",
    attachments: 0
  },
  { 
    id: "MR005", 
    patient: "Michael Lee", 
    patientId: "PAT005",
    type: "Initial Consultation", 
    date: "2024-01-19",
    diagnosis: "Hyperlipidemia",
    treatment: "Statins, diet modification",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    attachments: 4
  },
  { 
    id: "MR006", 
    patient: "Jennifer Brown", 
    patientId: "PAT006",
    type: "Post-Op", 
    date: "2024-01-18",
    diagnosis: "Post-appendectomy recovery",
    treatment: "Antibiotics, wound care",
    doctor: "Dr. Sarah Wilson",
    department: "Surgery",
    attachments: 5
  },
  { 
    id: "MR007", 
    patient: "William Wilson", 
    patientId: "PAT007",
    type: "Consultation", 
    date: "2024-01-18",
    diagnosis: "Coronary Artery Disease",
    treatment: "Dual antiplatelet therapy",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    attachments: 2
  },
  { 
    id: "MR008", 
    patient: "Amanda Taylor", 
    patientId: "PAT008",
    type: "Lab Results", 
    date: "2024-01-17",
    diagnosis: "Palpitations (benign)",
    treatment: "Beta blockers PRN",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    attachments: 1
  },
]

const recentDiagnoses = [
  { condition: "Hypertension", count: 45, trend: "up" },
  { condition: "Type 2 Diabetes", count: 32, trend: "up" },
  { condition: "Cardiac Arrhythmia", count: 18, trend: "stable" },
  { condition: "Asthma", count: 15, trend: "down" },
  { condition: "Coronary Artery Disease", count: 12, trend: "stable" },
]

const recordTypes = [
  { type: "Consultation", icon: Stethoscope, count: 89, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
  { type: "Lab Results", icon: Activity, count: 156, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
  { type: "Imaging", icon: FileImage, count: 67, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
  { type: "Surgery", icon: HeartPulse, count: 23, color: "text-red-600 bg-red-100 dark:bg-red-900/30" },
]

const typeConfig: Record<string, { className: string }> = {
  "Consultation": { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  "Lab Results": { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "Check-up": { className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300" },
  "Follow-up": { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  "Initial Consultation": { className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400" },
  "Post-Op": { className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  "Imaging": { className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
}

export default function DoctorMedicalRecordsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || record.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              View and manage patient medical records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Record
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-muted-foreground">Consultations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Lab Results</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-muted-foreground">Added This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all-records" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="by-type">By Type</TabsTrigger>
            <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          </TabsList>

          <TabsContent value="all-records" className="space-y-4">
            {/* Filters */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by patient, ID, or diagnosis..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Record Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Lab Results">Lab Results</SelectItem>
                        <SelectItem value="Check-up">Check-up</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                        <SelectItem value="Post-Op">Post-Op</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Records Table */}
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Diagnosis</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden xl:table-cell">Attachments</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{record.id}</p>
                                <p className="text-xs text-muted-foreground">{record.department}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {record.patient.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{record.patient}</p>
                                <p className="text-xs text-muted-foreground">{record.patientId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={typeConfig[record.type]?.className || ""}>
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="max-w-[200px]">
                              <p className="text-sm truncate">{record.diagnosis}</p>
                              <p className="text-xs text-muted-foreground truncate">{record.treatment}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{record.date}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {record.attachments > 0 ? (
                              <div className="flex items-center gap-1">
                                <File className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{record.attachments}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share with Patient
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <UserRound className="mr-2 h-4 w-4" />
                                  Patient Profile
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

          <TabsContent value="by-type" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recordTypes.map((type) => (
                <Card key={type.type} className="border-none shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-lg ${type.color} flex items-center justify-center`}>
                        <type.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">{type.type}</p>
                        <p className="text-2xl font-bold">{type.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diagnoses" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Common Diagnoses
                </CardTitle>
                <CardDescription>Most frequent diagnoses in your patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>Patient Count</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDiagnoses.map((diag, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{diag.condition}</TableCell>
                        <TableCell>{diag.count} patients</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              diag.trend === "up" ? "border-red-500 text-red-600" :
                              diag.trend === "down" ? "border-green-500 text-green-600" :
                              "border-slate-500 text-slate-600"
                            }
                          >
                            {diag.trend === "up" ? "↑ Increasing" :
                             diag.trend === "down" ? "↓ Decreasing" :
                             "→ Stable"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Patients
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
