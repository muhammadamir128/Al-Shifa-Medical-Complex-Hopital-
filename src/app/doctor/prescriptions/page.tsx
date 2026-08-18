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
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  Printer,
  Edit,
  Copy,
  Trash2,
} from "lucide-react"
import { useState } from "react"

const prescriptions = [
  { 
    id: "RX001", 
    patient: "John Smith", 
    patientId: "PAT001",
    medications: ["Lisinopril 10mg", "Metoprolol 50mg"], 
    date: "2024-01-20", 
    status: "PENDING",
    notes: "Take with food. Monitor blood pressure daily."
  },
  { 
    id: "RX002", 
    patient: "Emily Davis", 
    patientId: "PAT002",
    medications: ["Amiodarone 200mg", "Warfarin 5mg"], 
    date: "2024-01-20", 
    status: "DISPENSED",
    notes: "Regular INR monitoring required."
  },
  { 
    id: "RX003", 
    patient: "Robert Johnson", 
    patientId: "PAT003",
    medications: ["Metformin 500mg", "Glipizide 5mg"], 
    date: "2024-01-20", 
    status: "PENDING",
    notes: "Check blood sugar before meals."
  },
  { 
    id: "RX004", 
    patient: "Sarah Miller", 
    patientId: "PAT004",
    medications: ["Albuterol Inhaler", "Fluticasone 250mcg"], 
    date: "2024-01-19", 
    status: "DISPENSED",
    notes: "Use inhaler as needed for acute symptoms."
  },
  { 
    id: "RX005", 
    patient: "Michael Lee", 
    patientId: "PAT005",
    medications: ["Atorvastatin 20mg"], 
    date: "2024-01-19", 
    status: "CANCELLED",
    notes: "Patient requested cancellation."
  },
  { 
    id: "RX006", 
    patient: "Jennifer Brown", 
    patientId: "PAT006",
    medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"], 
    date: "2024-01-18", 
    status: "DISPENSED",
    notes: "Complete full course of antibiotics."
  },
  { 
    id: "RX007", 
    patient: "William Wilson", 
    patientId: "PAT007",
    medications: ["Aspirin 81mg", "Clopidogrel 75mg", "Atorvastatin 40mg"], 
    date: "2024-01-18", 
    status: "PENDING",
    notes: "Take aspirin with food. Monitor for bruising."
  },
  { 
    id: "RX008", 
    patient: "Amanda Taylor", 
    patientId: "PAT008",
    medications: ["Propranolol 40mg"], 
    date: "2024-01-17", 
    status: "DISPENSED",
    notes: "Take at the same time each day."
  },
]

const medicationInventory = [
  { name: "Lisinopril 10mg", stock: 450, unit: "tablets", status: "In Stock" },
  { name: "Metoprolol 50mg", stock: 380, unit: "tablets", status: "In Stock" },
  { name: "Metformin 500mg", stock: 620, unit: "tablets", status: "In Stock" },
  { name: "Amoxicillin 500mg", stock: 45, unit: "capsules", status: "Low Stock" },
  { name: "Atorvastatin 20mg", stock: 290, unit: "tablets", status: "In Stock" },
  { name: "Warfarin 5mg", stock: 12, unit: "tablets", status: "Critical" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  DISPENSED: { label: "Dispensed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export default function DoctorPrescriptionsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rx.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || rx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prescriptions</h1>
            <p className="text-muted-foreground">
              Manage patient prescriptions and medication orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Prescription
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Total Prescriptions</p>
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
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Pending Review</p>
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
                  <p className="text-2xl font-bold">138</p>
                  <p className="text-xs text-muted-foreground">Dispensed</p>
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
                  <p className="text-xs text-muted-foreground">Low Stock Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="medications">Medication Library</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4">
            {/* Filters */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by patient or RX number..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="DISPENSED">Dispensed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prescriptions Table */}
            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prescription</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Medications</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrescriptions.map((rx) => (
                        <TableRow key={rx.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Pill className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{rx.id}</p>
                                <p className="text-xs text-muted-foreground">{rx.medications.length} medication(s)</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {rx.patient.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{rx.patient}</p>
                                <p className="text-xs text-muted-foreground">{rx.patientId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {rx.medications.slice(0, 2).map((med, i) => (
                                <Badge key={i} variant="outline" className="text-xs truncate">
                                  {med}
                                </Badge>
                              ))}
                              {rx.medications.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{rx.medications.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{rx.date}</TableCell>
                          <TableCell>
                            <Badge className={statusConfig[rx.status]?.className}>
                              {statusConfig[rx.status]?.label}
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Prescription
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Cancel Prescription
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

          <TabsContent value="medications" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Medication Library
                </CardTitle>
                <CardDescription>Available medications and inventory status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicationInventory.map((med, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{med.name}</TableCell>
                        <TableCell>{med.stock}</TableCell>
                        <TableCell>{med.unit}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              med.status === "In Stock" ? "border-green-500 text-green-600" :
                              med.status === "Low Stock" ? "border-amber-500 text-amber-600" :
                              "border-red-500 text-red-600"
                            }
                          >
                            {med.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Order More
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
