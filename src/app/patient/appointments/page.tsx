"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  CalendarCheck,
  MapPin,
  Phone,
  MoreHorizontal,
  Eye,
  XCircle,
  CalendarX,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

const appointments = [
  {
    id: "1",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "Dec 20, 2024",
    time: "09:00 AM",
    endTime: "09:30 AM",
    status: "CONFIRMED",
    type: "Follow-up",
    reason: "Blood pressure check",
    location: "Room 302, Building A",
  },
  {
    id: "2",
    doctor: "Dr. Michael Brown",
    department: "General Medicine",
    date: "Dec 22, 2024",
    time: "02:30 PM",
    endTime: "03:00 PM",
    status: "SCHEDULED",
    type: "Consultation",
    reason: "Annual checkup",
    location: "Room 105, Building B",
  },
  {
    id: "3",
    doctor: "Dr. Lisa Chen",
    department: "Orthopedics",
    date: "Dec 25, 2024",
    time: "11:00 AM",
    endTime: "11:30 AM",
    status: "SCHEDULED",
    type: "Checkup",
    reason: "Knee pain evaluation",
    location: "Room 201, Building A",
  },
  {
    id: "4",
    doctor: "Dr. James Wilson",
    department: "Pediatrics",
    date: "Dec 15, 2024",
    time: "10:00 AM",
    endTime: "10:30 AM",
    status: "COMPLETED",
    type: "Follow-up",
    reason: "Vaccination follow-up",
    location: "Room 401, Building C",
  },
  {
    id: "5",
    doctor: "Dr. Emma Thompson",
    department: "Dermatology",
    date: "Dec 10, 2024",
    time: "03:00 PM",
    endTime: "03:30 PM",
    status: "CANCELLED",
    type: "Consultation",
    reason: "Skin rash examination",
    location: "Room 203, Building A",
  },
  {
    id: "6",
    doctor: "Dr. Robert Garcia",
    department: "Neurology",
    date: "Dec 05, 2024",
    time: "09:30 AM",
    endTime: "10:00 AM",
    status: "COMPLETED",
    type: "Follow-up",
    reason: "Headache evaluation",
    location: "Room 301, Building B",
  },
]

const statusConfig: Record<string, { label: string; dot: string; className: string }> = {
  CONFIRMED: {
    label: "Confirmed",
    dot: "bg-emerald-500",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  SCHEDULED: {
    label: "Scheduled",
    dot: "bg-blue-500",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    dot: "bg-slate-400",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
  CANCELLED: {
    label: "Cancelled",
    dot: "bg-red-500",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-purple-500",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.SCHEDULED
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
        cfg.className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  )
}

const PAGE_SIZE_OPTIONS = [3, 5, 10]

export default function PatientAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [cancelTarget, setCancelTarget] = useState<(typeof appointments)[0] | null>(null)
  const [cancelledIds, setCancelledIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  const getStatus = (apt: (typeof appointments)[0]) =>
    cancelledIds.has(apt.id) ? "CANCELLED" : apt.status

  const filtered = appointments.filter((apt) => {
    const effectiveStatus = getStatus(apt)
    const matchesSearch =
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || effectiveStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  const goToPage = (p: number) => setCurrentPage(Math.max(1, Math.min(p, totalPages)))

  // Reset to page 1 when filters change
  const handleSearch = (val: string) => { setSearchTerm(val); setCurrentPage(1) }
  const handleStatusFilter = (val: string) => { setStatusFilter(val); setCurrentPage(1) }
  const handlePageSize = (val: string) => { setPageSize(Number(val)); setCurrentPage(1) }

  const upcomingCount = appointments.filter(
    (a) => !cancelledIds.has(a.id) && (a.status === "SCHEDULED" || a.status === "CONFIRMED")
  ).length
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length
  const cancelledCount =
    appointments.filter((a) => a.status === "CANCELLED").length + cancelledIds.size

  const handleConfirmCancel = () => {
    if (!cancelTarget) return
    setCancelledIds((prev) => new Set(prev).add(cancelTarget.id))
    setCancelTarget(null)
    setSelectedAppointment(null)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">View and manage your appointments</p>
        </div>
        <Button asChild className="w-full sm:w-auto gap-2">
          <Link href="/patient/appointments/book">
            <Plus className="h-4 w-4" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-0 shadow-sm bg-linear-to-br from-primary/8 to-primary/15">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary">{upcomingCount}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-linear-to-br from-blue-50 to-blue-100/60">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-linear-to-br from-red-50 to-red-100/60">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <CalendarX className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{cancelledCount}</p>
                <p className="text-xs text-muted-foreground">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by doctor, department, or type..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-white">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointment List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-base">Appointment History</CardTitle>
            <div className="flex items-center gap-3">
              <CardDescription className="text-xs">
                {filtered.length === 0
                  ? "No records"
                  : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filtered.length)} of ${filtered.length}`}
              </CardDescription>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground hidden sm:inline">Rows:</span>
                <Select value={String(pageSize)} onValueChange={handlePageSize}>
                  <SelectTrigger className="h-7 w-16 text-xs px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)} className="text-xs">{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-muted-foreground">
              <CalendarX className="h-10 w-10 mb-3 opacity-25" />
              <p className="font-medium text-sm">No appointments found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Mobile card list */}
              <div className="divide-y md:hidden">
                {paginated.map((apt) => {
                  const status = getStatus(apt)
                  return (
                    <div key={apt.id} className="p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm">{apt.doctor}</p>
                            <p className="text-xs text-muted-foreground">{apt.department}</p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              <StatusBadge status={status} />
                              <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5 bg-muted/50">
                                {apt.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mt-0.5">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedAppointment(apt)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {(status === "SCHEDULED" || status === "CONFIRMED") && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => setCancelTarget(apt)}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-3 mt-2.5 ml-12 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="pl-6 font-semibold text-xs uppercase tracking-wider">Doctor</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">Department</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">Date & Time</TableHead>
                      <TableHead className="hidden lg:table-cell font-semibold text-xs uppercase tracking-wider">Type</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-right pr-6 font-semibold text-xs uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((apt) => {
                      const status = getStatus(apt)
                      return (
                        <TableRow key={apt.id} className="hover:bg-muted/20 transition-colors">
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium text-sm">{apt.doctor}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{apt.department}</TableCell>
                          <TableCell>
                            <p className="font-medium text-sm">{apt.date}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Clock className="h-3 w-3" />
                              {apt.time} – {apt.endTime}
                            </p>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-xs border rounded-full px-2.5 py-1 bg-muted/50 text-muted-foreground">
                              {apt.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={status} />
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedAppointment(apt)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {(status === "SCHEDULED" || status === "CONFIRMED") && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => setCancelTarget(apt)}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Cancel Appointment
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {/* Pagination Footer */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t bg-muted/20">
              <p className="text-xs text-muted-foreground order-2 sm:order-1">
                Page <span className="font-semibold text-foreground">{safePage}</span> of{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1 order-1 sm:order-2">
                {/* First */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={safePage === 1}
                  onClick={() => goToPage(1)}
                  aria-label="First page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Prev */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={safePage === 1}
                  onClick={() => goToPage(safePage - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page number pills */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 5) return true
                    if (p === 1 || p === totalPages) return true
                    return Math.abs(p - safePage) <= 1
                  })
                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) {
                      acc.push("...")
                    }
                    acc.push(p)
                    return acc
                  }, [])
                  .map((item, idx) =>
                    item === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground text-sm select-none">
                        …
                      </span>
                    ) : (
                      <Button
                        key={item}
                        variant={item === safePage ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8 text-xs font-semibold"
                        onClick={() => goToPage(item as number)}
                      >
                        {item}
                      </Button>
                    )
                  )}

                {/* Next */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={safePage === totalPages}
                  onClick={() => goToPage(safePage + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={safePage === totalPages}
                  onClick={() => goToPage(totalPages)}
                  aria-label="Last page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Detail Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Complete appointment information</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{selectedAppointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.department}</p>
                </div>
                <StatusBadge status={getStatus(selectedAppointment)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border bg-muted/20">
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-sm flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {selectedAppointment.date}
                  </p>
                </div>
                <div className="p-3 rounded-xl border bg-muted/20">
                  <p className="text-xs text-muted-foreground mb-1">Time</p>
                  <p className="font-semibold text-sm flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {selectedAppointment.time}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border bg-muted/20">
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-sm flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {selectedAppointment.location}
                  </p>
                </div>
                <div className="p-3 rounded-xl border bg-muted/20">
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-semibold text-sm">{selectedAppointment.type}</p>
                </div>
                <div className="p-3 rounded-xl border">
                  <p className="text-xs text-muted-foreground mb-1">Reason for Visit</p>
                  <p className="text-sm">{selectedAppointment.reason}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedAppointment &&
              (getStatus(selectedAppointment) === "SCHEDULED" ||
                getStatus(selectedAppointment) === "CONFIRMED") && (
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setCancelTarget(selectedAppointment)
                    setSelectedAppointment(null)
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </Button>
              )}
            <Button variant="outline" className="w-full sm:w-auto">
              <Phone className="mr-2 h-4 w-4" />
              Contact Clinic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={() => setCancelTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your appointment with{" "}
              <span className="font-semibold text-foreground">{cancelTarget?.doctor}</span> on{" "}
              <span className="font-semibold text-foreground">{cancelTarget?.date}</span>?
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground -mt-2">
            This action cannot be undone. You&apos;ll need to book a new appointment if needed.
          </p>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setCancelTarget(null)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto" onClick={handleConfirmCancel}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
