"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserRound,
  Syringe,
  Calendar,
  Search,
  Filter,
  Check,
  X,
  History,
  ChevronDown,
  Timer,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"

const scheduledMedications = [
  {
    id: "MED001",
    patient: "Emma Johnson",
    patientId: "P001",
    room: "101-A",
    medication: "Amoxicillin 500mg",
    dosage: "1 tablet",
    route: "Oral",
    frequency: "Every 8 hours",
    scheduledTime: "08:00 AM",
    status: "DUE",
    prescriber: "Dr. Sarah Wilson",
    notes: "Take with food",
    allergies: ["Penicillin sensitivity"],
  },
  {
    id: "MED002",
    patient: "Michael Chen",
    patientId: "P002",
    room: "102-B",
    medication: "Metformin 850mg",
    dosage: "1 tablet",
    route: "Oral",
    frequency: "Twice daily",
    scheduledTime: "08:30 AM",
    status: "DUE",
    prescriber: "Dr. Michael Brown",
    notes: "Monitor blood glucose",
    allergies: [],
  },
  {
    id: "MED003",
    patient: "Sarah Williams",
    patientId: "P003",
    room: "103-C",
    medication: "Insulin Glargine",
    dosage: "20 units",
    route: "Subcutaneous",
    frequency: "Once daily",
    scheduledTime: "09:00 AM",
    status: "UPCOMING",
    prescriber: "Dr. Lisa Chen",
    notes: "Rotate injection sites",
    allergies: [],
  },
  {
    id: "MED004",
    patient: "Robert Davis",
    patientId: "P004",
    room: "104-A",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet",
    route: "Oral",
    frequency: "Once daily",
    scheduledTime: "07:00 AM",
    status: "ADMINISTERED",
    administeredAt: "07:05 AM",
    administeredBy: "Nurse Sarah",
    prescriber: "Dr. James Wilson",
    notes: "Monitor BP",
    allergies: [],
  },
  {
    id: "MED005",
    patient: "Lisa Thompson",
    patientId: "P005",
    room: "105-B",
    medication: "Morphine 5mg",
    dosage: "5mg",
    route: "IV",
    frequency: "Every 4 hours PRN",
    scheduledTime: "08:00 AM",
    status: "OVERDUE",
    prescriber: "Dr. Emma Thompson",
    notes: "Pain management - monitor respiratory rate",
    allergies: [],
  },
  {
    id: "MED006",
    patient: "David Brown",
    patientId: "P006",
    room: "106-A",
    medication: "Heparin 5000 units",
    dosage: "5000 units",
    route: "Subcutaneous",
    frequency: "Every 12 hours",
    scheduledTime: "10:00 AM",
    status: "UPCOMING",
    prescriber: "Dr. David Kim",
    notes: "DVT prophylaxis",
    allergies: [],
  },
]

const recentAdministrations = [
  {
    id: "RAD001",
    patient: "Robert Davis",
    room: "104-A",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet",
    route: "Oral",
    administeredAt: "07:05 AM",
    administeredBy: "Nurse Sarah",
    status: "Completed",
    notes: "BP 120/80 before administration",
  },
  {
    id: "RAD002",
    patient: "Emma Johnson",
    room: "101-A",
    medication: "Amoxicillin 500mg",
    dosage: "1 tablet",
    route: "Oral",
    administeredAt: "06:00 AM",
    administeredBy: "Nurse John",
    status: "Completed",
    notes: "No adverse reactions",
  },
  {
    id: "RAD003",
    patient: "Michael Chen",
    room: "102-B",
    medication: "Metformin 850mg",
    dosage: "1 tablet",
    route: "Oral",
    administeredAt: "06:30 AM",
    administeredBy: "Nurse John",
    status: "Completed",
    notes: "Blood glucose: 145 mg/dL",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "DUE":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Due Now</Badge>
    case "ADMINISTERED":
      return <Badge className="bg-green-500 hover:bg-green-600">Administered</Badge>
    case "OVERDUE":
      return <Badge variant="destructive">Overdue</Badge>
    case "UPCOMING":
      return <Badge variant="secondary">Upcoming</Badge>
    case "HELD":
      return <Badge variant="outline" className="border-red-500 text-red-600">Held</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getRouteIcon = (route: string) => {
  switch (route.toLowerCase()) {
    case "oral":
      return <Pill className="h-4 w-4 text-blue-500" />
    case "iv":
      return <Syringe className="h-4 w-4 text-red-500" />
    case "subcutaneous":
    case "intramuscular":
      return <Syringe className="h-4 w-4 text-purple-500" />
    default:
      return <Pill className="h-4 w-4 text-gray-500" />
  }
}

export default function NurseMedicationsPage() {
  const [selectedMedication, setSelectedMedication] = useState<typeof scheduledMedications[0] | null>(null)
  const [showAdministerDialog, setShowAdministerDialog] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleAdminister = (medication: typeof scheduledMedications[0]) => {
    setSelectedMedication(medication)
    setShowAdministerDialog(true)
  }

  const confirmAdministration = () => {
    // Here you would typically call an API to record the administration
    console.log("Administering medication:", selectedMedication?.id, "Notes:", adminNotes)
    setShowAdministerDialog(false)
    setAdminNotes("")
    setSelectedMedication(null)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medication Administration</h1>
            <p className="text-muted-foreground">
              Manage and track patient medication schedules
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Due Now</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Timer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="scheduled" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="scheduled">
              <Clock className="mr-2 h-4 w-4" />
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4">
            {/* Filters */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by patient or medication..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="due">Due Now</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="administered">Administered</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medications Table */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Scheduled Medications
                </CardTitle>
                <CardDescription>
                  Medications scheduled for administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead className="hidden md:table-cell">Route</TableHead>
                        <TableHead className="hidden lg:table-cell">Notes</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduledMedications.map((med) => (
                        <TableRow key={med.id} className={med.status === "OVERDUE" ? "bg-red-50 dark:bg-red-900/10" : ""}>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className={med.status === "OVERDUE" ? "text-red-600 font-medium" : ""}>
                                {med.scheduledTime}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{med.patient}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <UserRound className="h-3 w-3" />
                                {med.patientId} • Room {med.room}
                              </p>
                              {med.allergies.length > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs text-amber-600">{med.allergies.join(", ")}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              {getRouteIcon(med.route)}
                              <div>
                                <p className="font-medium">{med.medication}</p>
                                <p className="text-xs text-muted-foreground">
                                  {med.dosage} • {med.frequency}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{med.route}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <p className="text-sm text-muted-foreground max-w-[150px] truncate">
                              {med.notes}
                            </p>
                          </TableCell>
                          <TableCell>{getStatusBadge(med.status)}</TableCell>
                          <TableCell className="text-right">
                            {med.status === "DUE" || med.status === "OVERDUE" ? (
                              <div className="flex gap-2 justify-end">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <X className="mr-1 h-3 w-3" />
                                  Hold
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleAdminister(med)}
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  Administer
                                </Button>
                              </div>
                            ) : med.status === "ADMINISTERED" ? (
                              <span className="text-sm text-green-600 flex items-center justify-end gap-1">
                                <CheckCircle2 className="h-4 w-4" />
                                {med.administeredBy} at {med.administeredAt}
                              </span>
                            ) : (
                              <Button size="sm" variant="ghost" disabled>
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Recent Administrations
                </CardTitle>
                <CardDescription>
                  Medication administration history for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead className="hidden md:table-cell">Route</TableHead>
                        <TableHead className="hidden lg:table-cell">Administered By</TableHead>
                        <TableHead className="hidden lg:table-cell">Notes</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAdministrations.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {record.administeredAt}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{record.patient}</p>
                              <p className="text-xs text-muted-foreground">
                                Room {record.room}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              {getRouteIcon(record.route)}
                              <div>
                                <p className="font-medium">{record.medication}</p>
                                <p className="text-xs text-muted-foreground">
                                  {record.dosage}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{record.route}</TableCell>
                          <TableCell className="hidden lg:table-cell">{record.administeredBy}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <p className="text-sm text-muted-foreground max-w-[150px] truncate">
                              {record.notes}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500 hover:bg-green-600">
                              Completed
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Administration Guidelines */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Administration Guidelines</CardTitle>
            <CardDescription>Important reminders for medication administration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-medium text-cyan-800 dark:text-cyan-200 flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Verify Patient
                </h4>
                <ul className="text-sm text-cyan-700 dark:text-cyan-300 space-y-1">
                  <li>• Check patient ID band</li>
                  <li>• Confirm patient name & DOB</li>
                  <li>• Verify allergies</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2">
                  <Pill className="h-4 w-4" />
                  Check Medication
                </h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Right medication & dose</li>
                  <li>• Right route & time</li>
                  <li>• Check expiration date</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-200 flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Document
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Record administration time</li>
                  <li>• Note any observations</li>
                  <li>• Report adverse reactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Administration Confirmation Dialog */}
      <Dialog open={showAdministerDialog} onOpenChange={setShowAdministerDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Confirm Medication Administration
            </DialogTitle>
            <DialogDescription>
              Verify and confirm the medication administration details
            </DialogDescription>
          </DialogHeader>
          
          {selectedMedication && (
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <UserRound className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedMedication.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMedication.patientId} • Room {selectedMedication.room}
                    </p>
                  </div>
                </div>
                {selectedMedication.allergies.length > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded text-amber-700 dark:text-amber-300 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Allergies: {selectedMedication.allergies.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Medication Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Medication</p>
                  <p className="font-medium">{selectedMedication.medication}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dosage</p>
                  <p className="font-medium">{selectedMedication.dosage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Route</p>
                  <p className="font-medium">{selectedMedication.route}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Scheduled Time</p>
                  <p className="font-medium">{selectedMedication.scheduledTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Prescriber</p>
                  <p className="font-medium">{selectedMedication.prescriber}</p>
                </div>
              </div>

              {/* Notes from Prescription */}
              {selectedMedication.notes && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <FileText className="inline h-4 w-4 mr-1" />
                    {selectedMedication.notes}
                  </p>
                </div>
              )}

              {/* Administration Notes */}
              <div className="space-y-2">
                <Label htmlFor="adminNotes">Administration Notes</Label>
                <Textarea
                  id="adminNotes"
                  placeholder="Enter any observations or notes..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Verification Checklist */}
              <div className="space-y-2">
                <Label>Verification Checklist</Label>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Patient identity verified
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Medication name verified
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Dosage confirmed
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    No known allergies to this medication
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdministerDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAdministration}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Administration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
