"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  MoreHorizontal,
  Eye,
  Calendar,
  FileText,
  UserRound,
  Download,
  Users,
  AlertCircle,
  UserCheck,
  Droplet,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { TablePagination } from "@/components/dashboard/table-pagination"

const PAGE_SIZE = 10

const patients = [
  { id: "1", name: "John Smith",      email: "john.smith@email.com",       phone: "(555) 200-0001", gender: "Male",   age: 45, bloodGroup: "O+",  lastVisit: "2024-01-15", status: "Active" },
  { id: "2", name: "Emily Davis",     email: "emily.davis@email.com",      phone: "(555) 200-0002", gender: "Female", age: 32, bloodGroup: "A+",  lastVisit: "2024-01-14", status: "Active" },
  { id: "3", name: "Robert Johnson",  email: "robert.johnson@email.com",   phone: "(555) 200-0003", gender: "Male",   age: 58, bloodGroup: "B+",  lastVisit: "2024-01-12", status: "Active" },
  { id: "4", name: "Sarah Miller",    email: "sarah.miller@email.com",     phone: "(555) 200-0004", gender: "Female", age: 28, bloodGroup: "AB+", lastVisit: "2024-01-10", status: "Inactive" },
  { id: "5", name: "Michael Lee",     email: "michael.lee@email.com",      phone: "(555) 200-0005", gender: "Male",   age: 42, bloodGroup: "O-",  lastVisit: "2024-01-08", status: "Active" },
  { id: "6", name: "Jennifer Brown",  email: "jennifer.brown@email.com",   phone: "(555) 200-0006", gender: "Female", age: 35, bloodGroup: "A-",  lastVisit: "2024-01-05", status: "Active" },
  { id: "7", name: "William Wilson",  email: "william.wilson@email.com",   phone: "(555) 200-0007", gender: "Male",   age: 67, bloodGroup: "B-",  lastVisit: "2024-01-03", status: "Active" },
  { id: "8", name: "Amanda Taylor",   email: "amanda.taylor@email.com",    phone: "(555) 200-0008", gender: "Female", age: 24, bloodGroup: "O+",  lastVisit: "2024-01-01", status: "Inactive" },
]

const bloodBadgeClass: Record<string, string> = {
  "O+":  "border-red-300 text-red-700 dark:text-red-400",
  "O-":  "border-red-400 text-red-800 dark:text-red-300",
  "A+":  "border-blue-300 text-blue-700 dark:text-blue-400",
  "A-":  "border-blue-400 text-blue-800 dark:text-blue-300",
  "B+":  "border-green-300 text-green-700 dark:text-green-400",
  "B-":  "border-green-400 text-green-800 dark:text-green-300",
  "AB+": "border-purple-300 text-purple-700 dark:text-purple-400",
  "AB-": "border-purple-400 text-purple-800 dark:text-purple-300",
}

export default function AdminPatientsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const resetPage = () => setCurrentPage(1)

  const filtered = patients.filter(p => {
    const q = search.toLowerCase()
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.includes(q)
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    const matchGender = genderFilter === "all" || p.gender === genderFilter
    return matchSearch && matchStatus && matchGender
  })

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const active    = patients.filter(p => p.status === "Active").length
  const inactive  = patients.filter(p => p.status === "Inactive").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Register Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
                <DialogDescription>Fill in the patient&apos;s personal details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-fname">First Name</Label>
                    <Input id="p-fname" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-lname">Last Name</Label>
                    <Input id="p-lname" placeholder="Last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-dob">Date of Birth</Label>
                    <Input id="p-dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-email">Email</Label>
                  <Input id="p-email" type="email" placeholder="patient@email.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-phone">Phone</Label>
                    <Input id="p-phone" placeholder="(555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["O+","O-","A+","A-","B+","B-","AB+","AB-"].map(bg =>
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRegisterOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsRegisterOpen(false); toast.success("Patient registered!") }}>
                  Register
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Patients",       value: patients.length.toLocaleString(), icon: Users,     color: "bg-primary/10 text-primary" },
          { label: "Active",               value: active,                           icon: UserCheck,  color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Inactive",             value: inactive,                         icon: UserRound,  color: "bg-gray-100 text-gray-600 dark:bg-gray-800" },
          { label: "Appointments Today",   value: 89,                               icon: Calendar,   color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
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
                placeholder="Search by name, email or phone..."
                className="pl-8"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== patients.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {patients.length} patients
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Patient</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Contact</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Age / Gender</TableHead>
                  <TableHead className="font-semibold">Blood</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Last Visit</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No patients found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(p => (
                    <TableRow key={p.id} className="transition-colors hover:bg-muted/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                              {p.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {p.id.padStart(6, "0")}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{p.email}</div>
                        <div className="text-xs text-muted-foreground">{p.phone}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {p.age} yrs / {p.gender}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-semibold ${bloodBadgeClass[p.bloodGroup] ?? ""}`}>
                          <Droplet className="h-3 w-3 mr-1" />
                          {p.bloodGroup}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {p.lastVisit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={p.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }
                        >
                          {p.status}
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
                            <DropdownMenuItem onClick={() => router.push(`/admin/patients/${p.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/patients/${p.id}/records`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Medical Records
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/appointments`)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Appointment
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
