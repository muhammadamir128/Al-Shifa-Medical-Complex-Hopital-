"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Search,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react"
import { getMedicineById, getPrescriptionInsights } from "@/lib/pharmacy-data"

const insights = getPrescriptionInsights()
const statusOptions = ["all", "PENDING", "IN_PROGRESS", "READY", "ON_HOLD", "DISPENSED"]
const priorityOptions = ["all", "URGENT", "HIGH", "NORMAL"]

export default function PharmacyPrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filtered = useMemo(() => {
    return insights.stockRisk.filter((prescription) => {
      const matchesSearch =
        prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "all" || prescription.status === selectedStatus
      const matchesPriority = selectedPriority === "all" || prescription.priority === selectedPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, selectedStatus, selectedPriority])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prescription Queue</h1>
          <p className="text-muted-foreground">
            Review clinical notes, stock readiness, counseling requirements, and dispensing blockers.
          </p>
        </div>
        <Badge variant="outline" className="w-fit px-3 py-1.5 text-sm">
          <Clock className="mr-2 h-4 w-4" />
          Avg turnaround {insights.averageTurnaround} mins
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Pending", value: insights.pending.length, helper: "Awaiting pharmacist action", icon: Clock },
          { title: "Urgent", value: insights.urgent.length, helper: "Priority handling required", icon: AlertTriangle },
          { title: "Ready", value: insights.ready.length, helper: "Can be handed to patient", icon: CheckCircle2 },
          { title: "Counseling Required", value: insights.counseling.length, helper: "Needs patient instructions", icon: Stethoscope },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.helper}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
                placeholder="Search by RX, patient, or doctor..."
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "all" ? "All Statuses" : option.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "all" ? "All Priorities" : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Active Queue</CardTitle>
            <CardDescription>{filtered.length} prescriptions currently match the queue filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{prescription.patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {prescription.id} • {prescription.patient.age}y • {prescription.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{prescription.doctor}</p>
                          <p className="text-xs text-muted-foreground">{prescription.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary" className="w-fit">{prescription.items.length} items</Badge>
                          <span className={`text-xs ${prescription.canFullyDispense ? "text-emerald-600" : "text-destructive"}`}>
                            {prescription.canFullyDispense ? "Stock cleared" : `${prescription.unavailable.length} shortage flag`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={prescription.priority === "URGENT" ? "destructive" : "outline"}>
                          {prescription.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={prescription.status === "READY" ? "secondary" : "outline"}>
                          {prescription.status.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {prescription.id}
                                <Badge variant={prescription.priority === "URGENT" ? "destructive" : "outline"}>
                                  {prescription.priority}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription>
                                Complete stock validation and patient counseling before handover.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-5 py-4">
                              <div className="grid gap-4 rounded-xl bg-muted/50 p-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">Patient</p>
                                  <p className="font-medium">{prescription.patient.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {prescription.patient.id} • {prescription.patient.age} years • {prescription.patient.gender}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Doctor / Department</p>
                                  <p className="font-medium">{prescription.doctor}</p>
                                  <p className="text-sm text-muted-foreground">{prescription.department}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Coverage</p>
                                  <p className="font-medium">{prescription.insurance}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Alerts</p>
                                  <p className="font-medium">
                                    {prescription.allergies.length > 0 ? prescription.allergies.join(", ") : "No listed allergies"}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-semibold">Medication Readiness</h4>
                                {prescription.items.map((item) => {
                                  const medicine = getMedicineById(item.medicineId)
                                  const availableUnits = medicine?.stock ?? 0
                                  const sufficient = availableUnits >= item.quantity

                                  return (
                                    <div key={`${prescription.id}-${item.name}`} className="rounded-xl border p-4">
                                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {item.dosage} • {item.frequency} • {item.duration}
                                          </p>
                                        </div>
                                        <div className="text-sm md:text-right">
                                          <p>Required: {item.quantity}</p>
                                          <p className={sufficient ? "text-emerald-600" : "text-destructive"}>
                                            Available: {availableUnits}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl border p-4">
                                  <div className="mb-2 flex items-center gap-2 font-medium">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Safety Notes
                                  </div>
                                  <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                                </div>
                                <div className="rounded-xl border p-4">
                                  <div className="mb-2 flex items-center gap-2 font-medium">
                                    <FileText className="h-4 w-4 text-primary" />
                                    Handover Checklist
                                  </div>
                                  <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>Verify identity and payment clearance</li>
                                    <li>Confirm quantity and dosing frequency</li>
                                    <li>Explain food, storage, and missed-dose advice</li>
                                    <li>Record counseling if this is a new prescription</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Mark Ready</Button>
                              <Button>Dispense Now</Button>
                            </DialogFooter>
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

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Blocked By Stock</CardTitle>
              <CardDescription>Queue items that cannot be fully dispensed yet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.stockRisk
                .filter((prescription) => !prescription.canFullyDispense)
                .map((prescription) => (
                  <div key={prescription.id} className="rounded-xl border p-3">
                    <p className="font-medium">{prescription.id} • {prescription.patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Missing: {prescription.unavailable.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-primary/5">
            <CardHeader>
              <CardTitle>Dispensing Rules</CardTitle>
              <CardDescription>Built-in reminders for safe pharmacy workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Verify allergy information before final issue.</li>
                <li>Urgent and pediatric prescriptions should be moved to the front of the queue.</li>
                <li>Record counseling when a new inhaler, insulin, or antibiotic course is dispensed.</li>
                <li>On-hold items should trigger follow-up with doctor or insurance desk.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
