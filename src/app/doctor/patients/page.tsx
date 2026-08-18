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
  Users,
  HeartPulse,
  Activity,
  Pill,
  Phone,
  Mail,
  MapPin,
  Droplets,
} from "lucide-react"
import { useState } from "react"

const patients = [
  { 
    id: "PAT001", 
    name: "John Smith", 
    email: "john.smith@email.com", 
    phone: "(555) 200-0001", 
    gender: "Male", 
    age: 45, 
    bloodGroup: "O+", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Hypertension",
    allergies: ["Penicillin"],
    avatar: "JS"
  },
  { 
    id: "PAT002", 
    name: "Emily Davis", 
    email: "emily.davis@email.com", 
    phone: "(555) 200-0002", 
    gender: "Female", 
    age: 32, 
    bloodGroup: "A+", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Cardiac Arrhythmia",
    allergies: [],
    avatar: "ED"
  },
  { 
    id: "PAT003", 
    name: "Robert Johnson", 
    email: "robert.johnson@email.com", 
    phone: "(555) 200-0003", 
    gender: "Male", 
    age: 58, 
    bloodGroup: "B+", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Type 2 Diabetes",
    allergies: ["Sulfa drugs"],
    avatar: "RJ"
  },
  { 
    id: "PAT004", 
    name: "Sarah Miller", 
    email: "sarah.miller@email.com", 
    phone: "(555) 200-0004", 
    gender: "Female", 
    age: 28, 
    bloodGroup: "AB+", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Asthma",
    allergies: ["Dust", "Pollen"],
    avatar: "SM"
  },
  { 
    id: "PAT005", 
    name: "Michael Lee", 
    email: "michael.lee@email.com", 
    phone: "(555) 200-0005", 
    gender: "Male", 
    age: 42, 
    bloodGroup: "O-", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "New Patient",
    allergies: [],
    avatar: "ML"
  },
  { 
    id: "PAT006", 
    name: "Jennifer Brown", 
    email: "jennifer.brown@email.com", 
    phone: "(555) 200-0006", 
    gender: "Female", 
    age: 35, 
    bloodGroup: "A-", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Post-Surgery Recovery",
    allergies: ["Latex"],
    avatar: "JB"
  },
  { 
    id: "PAT007", 
    name: "William Wilson", 
    email: "william.wilson@email.com", 
    phone: "(555) 200-0007", 
    gender: "Male", 
    age: 67, 
    bloodGroup: "B-", 
    lastVisit: "2024-01-20", 
    status: "Active",
    condition: "Coronary Artery Disease",
    allergies: [],
    avatar: "WW"
  },
  { 
    id: "PAT008", 
    name: "Amanda Taylor", 
    email: "amanda.taylor@email.com", 
    phone: "(555) 200-0008", 
    gender: "Female", 
    age: 24, 
    bloodGroup: "O+", 
    lastVisit: "2024-01-19", 
    status: "Active",
    condition: "Heart Palpitations",
    allergies: [],
    avatar: "AT"
  },
  { 
    id: "PAT009", 
    name: "David Martinez", 
    email: "david.martinez@email.com", 
    phone: "(555) 200-0009", 
    gender: "Male", 
    age: 52, 
    bloodGroup: "AB-", 
    lastVisit: "2024-01-18", 
    status: "Active",
    condition: "High Blood Pressure",
    allergies: ["Aspirin"],
    avatar: "DM"
  },
  { 
    id: "PAT010", 
    name: "Lisa Anderson", 
    email: "lisa.anderson@email.com", 
    phone: "(555) 200-0010", 
    gender: "Female", 
    age: 41, 
    bloodGroup: "A+", 
    lastVisit: "2024-01-15", 
    status: "Inactive",
    condition: "Migraine",
    allergies: [],
    avatar: "LA"
  },
]

const recentVitals = [
  { patient: "John Smith", date: "2024-01-20", bp: "140/90", heartRate: 78, temp: "98.6°F", weight: "180 lbs" },
  { patient: "Emily Davis", date: "2024-01-20", bp: "118/75", heartRate: 72, temp: "98.4°F", weight: "145 lbs" },
  { patient: "Robert Johnson", date: "2024-01-20", bp: "135/85", heartRate: 82, temp: "98.8°F", weight: "210 lbs" },
]

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Patients</h1>
            <p className="text-muted-foreground">
              View and manage your patient records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">248</p>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Seen Today</p>
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
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Critical Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Pill className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">On Medication</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all-patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-patients">All Patients</TabsTrigger>
            <TabsTrigger value="recent-vitals">Recent Vitals</TabsTrigger>
          </TabsList>

          <TabsContent value="all-patients" className="space-y-4">
            {/* Filters */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, ID, or condition..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patients Table */}
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Contact</TableHead>
                        <TableHead className="hidden lg:table-cell">Condition</TableHead>
                        <TableHead className="hidden sm:table-cell">Age/Gender</TableHead>
                        <TableHead>Blood</TableHead>
                        <TableHead className="hidden xl:table-cell">Last Visit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {patient.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">{patient.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="truncate max-w-[150px]">{patient.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {patient.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="max-w-[150px]">
                              <p className="text-sm truncate">{patient.condition}</p>
                              {patient.allergies.length > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Droplets className="h-3 w-3 text-red-500" />
                                  <span className="text-xs text-red-500">{patient.allergies.length} allergies</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="text-sm">{patient.age} yrs</span>
                            <Badge variant="outline" className="ml-2 text-xs">{patient.gender.charAt(0)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">{patient.bloodGroup}</Badge>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-muted-foreground">
                            {patient.lastVisit}
                          </TableCell>
                          <TableCell>
                            <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                              {patient.status}
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Medical Records
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Activity className="mr-2 h-4 w-4" />
                                  View Vitals
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pill className="mr-2 h-4 w-4" />
                                  Prescriptions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule Appointment
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

          <TabsContent value="recent-vitals" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Vitals
                </CardTitle>
                <CardDescription>Latest vital signs recorded for your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Blood Pressure</TableHead>
                      <TableHead>Heart Rate</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVitals.map((vital, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{vital.patient}</TableCell>
                        <TableCell>{vital.date}</TableCell>
                        <TableCell>
                          <Badge variant={vital.bp.startsWith("14") ? "destructive" : "outline"}>
                            {vital.bp}
                          </Badge>
                        </TableCell>
                        <TableCell>{vital.heartRate} bpm</TableCell>
                        <TableCell>{vital.temp}</TableCell>
                        <TableCell>{vital.weight}</TableCell>
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
