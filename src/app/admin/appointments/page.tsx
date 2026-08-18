"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  XCircle,
  Download,
  Plus,
  CheckCircle,
  Clock,
  UserRound,
  Stethoscope,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { TablePagination } from "@/components/dashboard/table-pagination"

const PAGE_SIZE = 10

const appointments = [
  { id: "A001", patient: "John Smith", doctor: "Dr. Sarah Wilson", department: "Cardiology", date: "2024-01-15", time: "09:00 AM", status: "CONFIRMED", type: "Consultation" },
  { id: "A002", patient: "Emily Davis", doctor: "Dr. Michael Brown", department: "Neurology", date: "2024-01-15", time: "09:30 AM", status: "SCHEDULED", type: "Follow-up" },
  { id: "A003", patient: "Robert Johnson", doctor: "Dr. Lisa Chen", department: "Orthopedics", date: "2024-01-15", time: "10:00 AM", status: "IN_PROGRESS", type: "Checkup" },
  { id: "A004", patient: "Sarah Miller", doctor: "Dr. James Wilson", department: "Pediatrics", date: "2024-01-15", time: "10:30 AM", status: "COMPLETED", type: "Consultation" },
  { id: "A005", patient: "Michael Lee", doctor: "Dr. Emma Thompson", department: "General Medicine", date: "2024-01-15", time: "11:00 AM", status: "CANCELLED", type: "Lab Test" },
  { id: "A006", patient: "Jennifer Brown", doctor: "Dr. David Lee", department: "Emergency", date: "2024-01-15", time: "11:30 AM", status: "CONFIRMED", type: "Emergency" },
  { id: "A007", patient: "William Wilson", doctor: "Dr. Sarah Wilson", department: "Cardiology", date: "2024-01-15", time: "12:00 PM", status: "SCHEDULED", type: "Follow-up" },
  { id: "A008", patient: "Amanda Taylor", doctor: "Dr. Lisa Chen", department: "Orthopedics", date: "2024-01-15", time: "02:00 PM", status: "CONFIRMED", type: "Checkup" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  CONFIRMED:   { label: "Confirmed",   className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle },
  SCHEDULED:   { label: "Scheduled",   className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",           icon: Calendar },
  IN_PROGRESS: { label: "In Progress", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",       icon: Clock },
  COMPLETED:   { label: "Completed",   className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",              icon: CheckCircle },
  CANCELLED:   { label: "Cancelled",   className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",               icon: XCircle },
}

const stats = [
  { label: "Total",       value: 89,  color: "bg-primary",     icon: Calendar },
  { label: "Scheduled",  value: 24,  color: "bg-blue-500",    icon: Clock },
  { label: "Confirmed",  value: 32,  color: "bg-emerald-500", icon: CheckCircle },
  { label: "Completed",  value: 25,  color: "bg-gray-500",    icon: CheckCircle },
  { label: "Cancelled",  value: 8,   color: "bg-red-500",     icon: XCircle },
]

export default function AdminAppointmentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const resetPage = () => setCurrentPage(1)

  const types = [...new Set(appointments.map(a => a.type))]

  const filtered = appointments.filter(a => {
    const q = search.toLowerCase()
    const matchSearch =
      a.patient.toLowerCase().includes(q) ||
      a.doctor.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
    const matchStatus = statusFilter === "all" || a.status === statusFilter
    const matchType   = typeFilter   === "all" || a.type   === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage and track all hospital appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported successfully!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Fill in the appointment details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ap-patient">Patient Name</Label>
                    <Input id="ap-patient" placeholder="Search patient..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ap-doctor">Doctor</Label>
                    <Input id="ap-doctor" placeholder="Search doctor..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ap-date">Date</Label>
                    <Input id="ap-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ap-time">Time</Label>
                    <Input id="ap-time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Appointment Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Checkup">Checkup</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Lab Test">Lab Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ap-notes">Notes (optional)</Label>
                  <Input id="ap-notes" placeholder="Additional notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsNewOpen(false); toast.success("Appointment scheduled!") }}>
                  Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient, doctor, department..."
                className="pl-8"
                value={search}
                onChange={e => { setSearch(e.target.value); resetPage() }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); resetPage() }}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); resetPage() }}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== appointments.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {appointments.length} appointments
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Patient</TableHead>
                  <TableHead className="font-semibold">Doctor</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No appointments found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((a) => {
                    const cfg = statusConfig[a.status]
                    const StatusIcon = cfg.icon
                    return (
                      <TableRow key={a.id} className="transition-colors hover:bg-muted/40">
                        <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <UserRound className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="font-medium text-sm">{a.patient}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Stethoscope className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {a.doctor}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">{a.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{a.date}</span>
                            <span className="text-xs text-muted-foreground">{a.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm">{a.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${cfg.className} gap-1 text-xs`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => router.push(`/admin/appointments/${a.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/admin/appointments/${a.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/admin/appointments/${a.id}`)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => toast.error(`Appointment ${a.id} cancelled`)}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  )
}
