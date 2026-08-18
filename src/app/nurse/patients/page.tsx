"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserRound,
  Search,
  Filter,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  Clock,
  BedSingle,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  ClipboardList,
  ArrowUpDown,
} from "lucide-react"
import { useState } from "react"

const patients = [
  {
    id: "P001",
    name: "Emma Johnson",
    age: 45,
    gender: "Female",
    room: "101-A",
    bed: "1",
    department: "General Ward",
    status: "Stable",
    condition: "Post-Surgery Recovery",
    admittingDoctor: "Dr. Sarah Wilson",
    admissionDate: "2024-01-15",
    vitals: {
      temperature: "98.6°F",
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      weight: "65 kg",
    },
    allergies: ["Penicillin"],
    lastVitalsUpdate: "10:30 AM",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 62,
    gender: "Male",
    room: "102-B",
    bed: "2",
    department: "ICU",
    status: "Monitoring",
    condition: "Cardiac Observation",
    admittingDoctor: "Dr. Michael Brown",
    admissionDate: "2024-01-18",
    vitals: {
      temperature: "99.2°F",
      bloodPressure: "140/90",
      heartRate: "88 bpm",
      respiratoryRate: "18/min",
      oxygenSaturation: "95%",
      weight: "78 kg",
    },
    allergies: [],
    lastVitalsUpdate: "10:15 AM",
  },
  {
    id: "P003",
    name: "Sarah Williams",
    age: 38,
    gender: "Female",
    room: "103-C",
    bed: "1",
    department: "General Ward",
    status: "Stable",
    condition: "Diabetes Management",
    admittingDoctor: "Dr. Lisa Chen",
    admissionDate: "2024-01-19",
    vitals: {
      temperature: "98.4°F",
      bloodPressure: "118/78",
      heartRate: "76 bpm",
      respiratoryRate: "14/min",
      oxygenSaturation: "99%",
      weight: "58 kg",
    },
    allergies: ["Sulfa drugs"],
    lastVitalsUpdate: "09:45 AM",
  },
  {
    id: "P004",
    name: "Robert Davis",
    age: 71,
    gender: "Male",
    room: "104-A",
    bed: "1",
    department: "ICU",
    status: "Critical",
    condition: "Emergency Admission",
    admittingDoctor: "Dr. James Wilson",
    admissionDate: "2024-01-20",
    vitals: {
      temperature: "100.1°F",
      bloodPressure: "150/95",
      heartRate: "102 bpm",
      respiratoryRate: "22/min",
      oxygenSaturation: "92%",
      weight: "82 kg",
    },
    allergies: ["Aspirin", "Latex"],
    lastVitalsUpdate: "10:00 AM",
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    age: 52,
    gender: "Female",
    room: "105-B",
    bed: "2",
    department: "Orthopedics",
    status: "Stable",
    condition: "Physical Therapy",
    admittingDoctor: "Dr. Emma Thompson",
    admissionDate: "2024-01-17",
    vitals: {
      temperature: "98.2°F",
      bloodPressure: "122/82",
      heartRate: "74 bpm",
      respiratoryRate: "15/min",
      oxygenSaturation: "97%",
      weight: "62 kg",
    },
    allergies: [],
    lastVitalsUpdate: "10:30 AM",
  },
  {
    id: "P006",
    name: "James Anderson",
    age: 29,
    gender: "Male",
    room: "106-A",
    bed: "1",
    department: "General Ward",
    status: "Discharge Ready",
    condition: "Appendectomy Recovery",
    admittingDoctor: "Dr. Robert Kim",
    admissionDate: "2024-01-14",
    vitals: {
      temperature: "98.0°F",
      bloodPressure: "115/75",
      heartRate: "68 bpm",
      respiratoryRate: "14/min",
      oxygenSaturation: "99%",
      weight: "75 kg",
    },
    allergies: [],
    lastVitalsUpdate: "08:30 AM",
  },
]

export default function NursePatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Critical":
        return "destructive"
      case "Monitoring":
        return "secondary"
      case "Discharge Ready":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patient List</h1>
            <p className="text-muted-foreground">
              View and manage patients under your care
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Vitals Overview
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patients.length}</p>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patients.filter(p => p.status === "Stable").length}</p>
                  <p className="text-xs text-muted-foreground">Stable</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patients.filter(p => p.status === "Monitoring").length}</p>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patients.filter(p => p.status === "Critical").length}</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="discharge ready">Discharge Ready</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient Table */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>
              Showing {filteredPatients.length} of {patients.length} patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">
                      <Button variant="ghost" size="sm" className="h-8 -ml-3">
                        Patient ID
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Room</TableHead>
                    <TableHead className="hidden lg:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Vitals</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-mono text-sm">{patient.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.age} yrs, {patient.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <BedSingle className="h-4 w-4 text-muted-foreground" />
                          {patient.room}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {patient.department}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-sm truncate max-w-32">{patient.condition}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {patient.lastVitalsUpdate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Patient Details</DialogTitle>
                              <DialogDescription>
                                Complete patient information and vitals
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              {/* Patient Info */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Patient ID</p>
                                  <p className="font-mono">{patient.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Name</p>
                                  <p className="font-medium">{patient.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Age/Gender</p>
                                  <p>{patient.age} yrs, {patient.gender}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  <Badge variant={getStatusBadgeVariant(patient.status)}>
                                    {patient.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              {/* Admission Info */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="text-sm text-muted-foreground">Room</p>
                                  <p className="font-medium flex items-center gap-1">
                                    <BedSingle className="h-4 w-4" />
                                    {patient.room} (Bed {patient.bed})
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Department</p>
                                  <p>{patient.department}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Admitting Doctor</p>
                                  <p>{patient.admittingDoctor}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Admission Date</p>
                                  <p>{patient.admissionDate}</p>
                                </div>
                              </div>

                              {/* Allergies */}
                              {patient.allergies.length > 0 && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                  <span className="text-sm font-medium text-red-700 dark:text-red-400">
                                    Allergies: {patient.allergies.join(", ")}
                                  </span>
                                </div>
                              )}

                              {/* Vitals */}
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Activity className="h-4 w-4 text-primary" />
                                  Current Vitals
                                  <span className="text-xs font-normal text-muted-foreground">
                                    (Updated: {patient.lastVitalsUpdate})
                                  </span>
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <Thermometer className="h-4 w-4" />
                                      <span className="text-xs">Temperature</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.temperature}</p>
                                  </div>
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <Heart className="h-4 w-4" />
                                      <span className="text-xs">Blood Pressure</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.bloodPressure}</p>
                                  </div>
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <Activity className="h-4 w-4" />
                                      <span className="text-xs">Heart Rate</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.heartRate}</p>
                                  </div>
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <Activity className="h-4 w-4" />
                                      <span className="text-xs">Respiratory Rate</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.respiratoryRate}</p>
                                  </div>
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <Droplets className="h-4 w-4" />
                                      <span className="text-xs">O2 Saturation</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.oxygenSaturation}</p>
                                  </div>
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                      <UserRound className="h-4 w-4" />
                                      <span className="text-xs">Weight</span>
                                    </div>
                                    <p className="text-lg font-semibold">{patient.vitals.weight}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-wrap gap-2 pt-4 border-t">
                                <Button className="flex-1 sm:flex-none">
                                  <Activity className="mr-2 h-4 w-4" />
                                  Record Vitals
                                </Button>
                                <Button variant="outline" className="flex-1 sm:flex-none">
                                  <ClipboardList className="mr-2 h-4 w-4" />
                                  View History
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
