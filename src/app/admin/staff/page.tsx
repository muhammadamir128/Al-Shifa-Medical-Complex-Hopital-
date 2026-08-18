"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Plus,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  UserCog,
  Users,
  UserCheck,
  Clock,
  AlertCircle,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const staff = [
  { id: "STF-001", name: "Emily Johnson",     email: "emily.johnson@hospital.local",    phone: "(555) 100-0001", role: "Nurse",           department: "Emergency",   shift: "Day",     status: "Active" },
  { id: "STF-002", name: "Michael Brown",     email: "michael.brown@hospital.local",    phone: "(555) 100-0002", role: "Nurse",           department: "Cardiology",  shift: "Night",   status: "Active" },
  { id: "STF-003", name: "Sarah Davis",       email: "sarah.davis@hospital.local",      phone: "(555) 100-0003", role: "Lab Technician",  department: "Laboratory",  shift: "Day",     status: "Active" },
  { id: "STF-004", name: "James Wilson",      email: "james.wilson@hospital.local",     phone: "(555) 100-0004", role: "Receptionist",    department: "Front Desk",  shift: "Day",     status: "Active" },
  { id: "STF-005", name: "Jennifer Martinez", email: "jennifer.martinez@hospital.local",phone: "(555) 100-0005", role: "Nurse",           department: "Pediatrics",  shift: "Evening", status: "On Leave" },
  { id: "STF-006", name: "David Lee",         email: "david.lee@hospital.local",        phone: "(555) 100-0006", role: "Lab Technician",  department: "Laboratory",  shift: "Night",   status: "Active" },
  { id: "STF-007", name: "Amanda Taylor",     email: "amanda.taylor@hospital.local",    phone: "(555) 100-0007", role: "Nurse",           department: "Surgery",     shift: "Day",     status: "Active" },
  { id: "STF-008", name: "Robert Anderson",   email: "robert.anderson@hospital.local",  phone: "(555) 100-0008", role: "Receptionist",    department: "Front Desk",  shift: "Evening", status: "Active" },
]

const statusConfig: Record<string, string> = {
  Active:    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "On Leave":"bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Inactive:  "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

const shiftConfig: Record<string, string> = {
  Day:     "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Night:   "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Evening: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
}

export default function AdminStaffPage() {
  const router = useRouter()
  const [search, setSearch]         = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isAddOpen, setIsAddOpen]   = useState(false)

  const departments = [...new Set(staff.map(s => s.department))]
  const roles       = [...new Set(staff.map(s => s.role))]

  const filtered = staff.filter(s => {
    const q = search.toLowerCase()
    const matchSearch =
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    const matchDept = deptFilter === "all" || s.department === deptFilter
    const matchRole = roleFilter === "all" || s.role       === roleFilter
    return matchSearch && matchDept && matchRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage hospital staff and their schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>Fill in the staff member&apos;s details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stf-name">Full Name</Label>
                    <Input id="stf-name" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stf-email">Email</Label>
                    <Input id="stf-email" type="email" placeholder="staff@hospital.local" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select dept" /></SelectTrigger>
                      <SelectContent>
                        {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Shift</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select shift" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Day">Day</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stf-phone">Phone</Label>
                    <Input id="stf-phone" placeholder="(555) 000-0000" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsAddOpen(false); toast.success("Staff member added!") }}>
                  Add Staff
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Staff",   value: staff.length,                                        icon: Users,     color: "bg-primary/10 text-primary" },
          { label: "Active",        value: staff.filter(s => s.status === "Active").length,     icon: UserCheck, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "On Leave",      value: staff.filter(s => s.status === "On Leave").length,   icon: Clock,     color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Departments",   value: departments.length,                                   icon: Building2, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
        ].map(s => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
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
                placeholder="Search by name, email or ID..."
                className="pl-8"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== staff.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {staff.length} staff members
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Staff Member</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Department</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Shift</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No staff members found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(member => (
                    <TableRow key={member.id} className="transition-colors hover:bg-muted/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-medium">
                          <UserCog className="h-3 w-3 mr-1" />
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{member.department}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge className={`${shiftConfig[member.shift]} text-xs`}>
                          {member.shift}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[member.status]} text-xs`}>
                          {member.status}
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
                            <DropdownMenuItem onClick={() => router.push(`/admin/staff/${member.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/staff/${member.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => toast.error(`${member.name} removed`)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
