"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Pill,
  Search,
  Clock,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  RefreshCw,
  Phone,
  Bell,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"

const activePrescriptions = [
  {
    id: "1",
    medication: "Lisinopril",
    genericName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "Ongoing",
    prescribedBy: "Dr. Sarah Wilson",
    prescribedDate: "Dec 15, 2024",
    refillsRemaining: 2,
    totalRefills: 3,
    nextRefillDate: "Jan 15, 2025",
    instructions: "Take in the morning with water. Avoid potassium supplements.",
    status: "ACTIVE",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "2",
    medication: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "Ongoing",
    prescribedBy: "Dr. Michael Brown",
    prescribedDate: "Nov 20, 2024",
    refillsRemaining: 1,
    totalRefills: 3,
    nextRefillDate: "Dec 20, 2024",
    instructions: "Take with meals. Monitor blood sugar regularly.",
    status: "ACTIVE",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: "3",
    medication: "Vitamin D3",
    genericName: "Cholecalciferol",
    dosage: "1000 IU",
    frequency: "Once daily",
    duration: "3 months",
    prescribedBy: "Dr. Michael Brown",
    prescribedDate: "Oct 01, 2024",
    refillsRemaining: 3,
    totalRefills: 3,
    nextRefillDate: "Jan 01, 2025",
    instructions: "Take with a meal containing fat for better absorption.",
    status: "ACTIVE",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    id: "4",
    medication: "Omeprazole",
    genericName: "Omeprazole Magnesium",
    dosage: "20mg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedBy: "Dr. Emma Thompson",
    prescribedDate: "Dec 10, 2024",
    refillsRemaining: 0,
    totalRefills: 1,
    nextRefillDate: "N/A",
    instructions: "Take 30 minutes before breakfast. Do not crush or chew.",
    status: "REFILL_DUE",
    color: "text-red-500",
    bg: "bg-red-100",
  },
]

const pastPrescriptions = [
  {
    id: "5",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    prescribedBy: "Dr. Michael Brown",
    prescribedDate: "Nov 15, 2024",
    status: "COMPLETED",
  },
  {
    id: "6",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed",
    duration: "10 days",
    prescribedBy: "Dr. Lisa Chen",
    prescribedDate: "Oct 05, 2024",
    status: "COMPLETED",
  },
  {
    id: "7",
    medication: "Hydrocortisone Cream 1%",
    dosage: "Topical",
    frequency: "Twice daily",
    duration: "14 days",
    prescribedBy: "Dr. Emma Thompson",
    prescribedDate: "Sep 12, 2024",
    status: "COMPLETED",
  },
]

const initialReminders = [
  { id: "r1", medication: "Lisinopril", time: "08:00 AM", taken: true },
  { id: "r2", medication: "Metformin", time: "08:00 AM", taken: true },
  { id: "r3", medication: "Vitamin D3", time: "08:00 AM", taken: false },
  { id: "r4", medication: "Metformin", time: "08:00 PM", taken: false },
  { id: "r5", medication: "Omeprazole", time: "07:30 AM", taken: false },
]

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [reminders, setReminders] = useState(initialReminders)
  const [requestingRefill, setRequestingRefill] = useState<string | null>(null)
  const [refillRequested, setRefillRequested] = useState<Set<string>>(new Set())

  const toggleTaken = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, taken: !r.taken } : r))
    )
  }

  const handleRequestRefill = async (id: string) => {
    setRequestingRefill(id)
    await new Promise((r) => setTimeout(r, 1200))
    setRequestingRefill(null)
    setRefillRequested((prev) => new Set(prev).add(id))
  }

  const filteredActive = activePrescriptions.filter(
    (rx) =>
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPast = pastPrescriptions.filter((rx) =>
    rx.medication.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = activePrescriptions.length
  const refillDueCount = activePrescriptions.filter((rx) => rx.status === "REFILL_DUE").length
  const takenToday = reminders.filter((r) => r.taken).length
  const dueToday = reminders.filter((r) => !r.taken).length

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Prescriptions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">View and manage your medications</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Download className="h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Pill, label: "Active Medications", value: activeCount, bg: "bg-primary/10", iconColor: "text-primary", card: "from-primary/5 to-primary/10" },
          { icon: RefreshCw, label: "Refills Due", value: refillDueCount, bg: "bg-amber-100", iconColor: "text-amber-600", card: "from-amber-50 to-amber-100/60" },
          { icon: CheckCircle2, label: "Completed", value: pastPrescriptions.length, bg: "bg-emerald-100", iconColor: "text-emerald-600", card: "from-emerald-50 to-emerald-100/60" },
          { icon: Bell, label: "Due Today", value: dueToday, bg: "bg-blue-100", iconColor: "text-blue-600", card: "from-blue-50 to-blue-100/60" },
        ].map(({ icon: Icon, label, value, bg, iconColor, card }) => (
          <Card key={label} className={cn("border-0 shadow-sm bg-linear-to-br", card)}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cn("h-9 w-9 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center shrink-0", bg)}>
                  <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", iconColor)} />
                </div>
                <div>
                  <p className={cn("text-xl sm:text-2xl font-bold", iconColor.replace("text-", "text-"))}>{value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medication Schedule */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                Today&apos;s Medication Schedule
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">Track your daily medication intake</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{takenToday}/{reminders.length} taken</span>
              <div className="w-20">
                <Progress value={(takenToday / reminders.length) * 100} className="h-1.5" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reminders.map((r) => (
              <button
                key={r.id}
                onClick={() => toggleTaken(r.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all hover:shadow-md w-full",
                  r.taken
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-card border-border hover:border-primary/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    r.taken ? "bg-emerald-100" : "bg-primary/10"
                  )}>
                    {r.taken ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Pill className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className={cn("font-semibold text-sm", r.taken && "line-through text-muted-foreground")}>
                      {r.medication}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {r.time}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs border rounded-full px-2 py-0.5 shrink-0",
                  r.taken
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-muted text-muted-foreground border-border"
                )}>
                  {r.taken ? "Taken" : "Pending"}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refill Alert */}
      {refillDueCount > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Refill Reminder</p>
              <p className="text-xs text-amber-700 mt-0.5">
                You have {refillDueCount} medication{refillDueCount > 1 ? "s" : ""} that need{refillDueCount === 1 ? "s" : ""} refills.
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto gap-2">
            <RefreshCw className="h-4 w-4" />
            Request All Refills
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Active <span className="ml-1.5 text-xs bg-primary/10 text-primary rounded-full px-1.5 py-0.5">{activeCount}</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="text-xs sm:text-sm">
              Past <span className="ml-1.5 text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">{pastPrescriptions.length}</span>
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-60"
            />
          </div>
        </div>

        {/* Active Prescriptions */}
        <TabsContent value="active">
          <div className="space-y-3">
            {filteredActive.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="flex flex-col items-center py-10 text-muted-foreground">
                  <Pill className="h-10 w-10 mb-2 opacity-25" />
                  <p className="text-sm">No active prescriptions found</p>
                </CardContent>
              </Card>
            ) : (
              filteredActive.map((rx) => {
                const refillPct = (rx.refillsRemaining / rx.totalRefills) * 100
                const isRequested = refillRequested.has(rx.id)
                return (
                  <Card key={rx.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", rx.bg)}>
                            <Pill className={cn("h-6 w-6", rx.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-base">{rx.medication}</h3>
                              <span className={cn(
                                "text-xs border rounded-full px-2.5 py-0.5",
                                rx.status === "ACTIVE"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              )}>
                                {rx.status === "ACTIVE" ? "Active" : "Refill Due"}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{rx.genericName}</p>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm">
                              <span className="font-semibold">{rx.dosage}</span>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-muted-foreground">{rx.frequency}</span>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-muted-foreground">{rx.duration}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><User className="h-3 w-3" />{rx.prescribedBy}</span>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{rx.prescribedDate}</span>
                            </div>

                            <div className="mt-3 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Refills remaining</span>
                                <span className={cn("font-semibold", rx.refillsRemaining === 0 ? "text-red-600" : "text-foreground")}>
                                  {rx.refillsRemaining}/{rx.totalRefills}
                                </span>
                              </div>
                              <Progress
                                value={refillPct}
                                className={cn("h-1.5", rx.refillsRemaining === 0 && "[&>div]:bg-red-500")}
                              />
                              {rx.nextRefillDate !== "N/A" && (
                                <p className="text-xs text-muted-foreground">Next refill: {rx.nextRefillDate}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-row lg:flex-col gap-2 sm:justify-start">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1 sm:flex-none">
                                <FileText className="h-3.5 w-3.5" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Prescription Details</DialogTitle>
                                <DialogDescription>{rx.medication} · {rx.dosage}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="p-3 rounded-xl bg-muted/30 border">
                                    <p className="text-xs text-muted-foreground mb-1">Dosage</p>
                                    <p className="font-semibold text-sm">{rx.dosage}</p>
                                  </div>
                                  <div className="p-3 rounded-xl bg-muted/30 border">
                                    <p className="text-xs text-muted-foreground mb-1">Frequency</p>
                                    <p className="font-semibold text-sm">{rx.frequency}</p>
                                  </div>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/30 border">
                                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                                  <p className="font-semibold text-sm">{rx.duration}</p>
                                </div>
                                <div className="p-3 rounded-xl border">
                                  <p className="text-xs text-muted-foreground mb-1">Instructions</p>
                                  <p className="text-sm leading-relaxed">{rx.instructions}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="p-3 rounded-xl bg-muted/30 border">
                                    <p className="text-xs text-muted-foreground mb-1">Refills Left</p>
                                    <p className={cn("font-semibold text-sm", rx.refillsRemaining === 0 && "text-red-600")}>
                                      {rx.refillsRemaining}
                                    </p>
                                  </div>
                                  <div className="p-3 rounded-xl bg-muted/30 border">
                                    <p className="text-xs text-muted-foreground mb-1">Next Refill</p>
                                    <p className="font-semibold text-sm">{rx.nextRefillDate}</p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" className="w-full gap-2">
                                  <Phone className="h-4 w-4" />
                                  Contact Pharmacy
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {rx.status === "REFILL_DUE" && (
                            <Button
                              size="sm"
                              className="gap-1.5 text-xs flex-1 sm:flex-none"
                              disabled={requestingRefill === rx.id || isRequested}
                              onClick={() => handleRequestRefill(rx.id)}
                            >
                              {requestingRefill === rx.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : isRequested ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              ) : (
                                <RefreshCw className="h-3.5 w-3.5" />
                              )}
                              {isRequested ? "Requested!" : "Request Refill"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>

        {/* Past Prescriptions */}
        <TabsContent value="past">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {filteredPast.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-muted-foreground">
                  <Pill className="h-10 w-10 mb-2 opacity-25" />
                  <p className="text-sm">No past prescriptions found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredPast.map((rx) => (
                    <div
                      key={rx.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Pill className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{rx.medication}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {rx.dosage} · {rx.frequency} · {rx.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{rx.prescribedDate}</p>
                          <p className="text-xs text-muted-foreground">{rx.prescribedBy}</p>
                        </div>
                        <span className="text-xs border rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
