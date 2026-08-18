"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Star,
  Calendar,
  UserRound,
  Building2,
  Phone,
  Mail,
  Stethoscope,
  AlertCircle,
  GraduationCap,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

const doctors = [
  { id: "1", name: "Dr. Sarah Wilson",   email: "sarah.wilson@hospital.local",   phone: "(555) 123-4001", specialization: "Cardiology",       department: "Cardiology",       qualification: "MD, FACC",       experience: "15 years", rating: 4.9, consultations: 234, status: "Available" },
  { id: "2", name: "Dr. Michael Brown",  email: "michael.brown@hospital.local",  phone: "(555) 123-4002", specialization: "Neurology",         department: "Neurology",         qualification: "MD, PhD",        experience: "12 years", rating: 4.8, consultations: 189, status: "In Surgery" },
  { id: "3", name: "Dr. Lisa Chen",      email: "lisa.chen@hospital.local",      phone: "(555) 123-4003", specialization: "Orthopedics",       department: "Orthopedics",       qualification: "MS Ortho",       experience: "10 years", rating: 4.7, consultations: 156, status: "Available" },
  { id: "4", name: "Dr. James Wilson",   email: "james.wilson@hospital.local",   phone: "(555) 123-4004", specialization: "Pediatrics",        department: "Pediatrics",        qualification: "MD Pediatrics",  experience: "8 years",  rating: 4.9, consultations: 298, status: "On Leave" },
  { id: "5", name: "Dr. Emma Thompson",  email: "emma.thompson@hospital.local",  phone: "(555) 123-4005", specialization: "General Medicine",  department: "General Medicine",  qualification: "MBBS, MD",       experience: "20 years", rating: 4.8, consultations: 456, status: "Available" },
  { id: "6", name: "Dr. David Lee",      email: "david.lee@hospital.local",      phone: "(555) 123-4006", specialization: "Emergency Medicine",department: "Emergency",         qualification: "MD Emergency",   experience: "7 years",  rating: 4.6, consultations: 512, status: "On Duty" },
]

const statusConfig: Record<string, { className: string; dot: string }> = {
  "Available":  { className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", dot: "bg-emerald-500" },
  "On Duty":    { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",             dot: "bg-blue-500" },
  "In Surgery": { className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",         dot: "bg-amber-500" },
  "On Leave":   { className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",                dot: "bg-gray-400" },
}

export default function AdminDoctorsPage() {
  const [search, setSearch]         = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [statusFilt, setStatusFilt] = useState("all")
  const [isAddOpen, setIsAddOpen]   = useState(false)

  const departments = [...new Set(doctors.map(d => d.department))]
  const statuses    = [...new Set(doctors.map(d => d.status))]

  const filtered = doctors.filter(d => {
    const q = search.toLowerCase()
    const matchSearch =
      d.name.toLowerCase().includes(q) ||
      d.specialization.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q)
    const matchDept   = deptFilter  === "all" || d.department === deptFilter
    const matchStatus = statusFilt  === "all" || d.status     === statusFilt
    return matchSearch && matchDept && matchStatus
  })

  const available = doctors.filter(d => d.status === "Available").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">Manage hospital doctors and their schedules</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Fill in the doctor&apos;s professional details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-name">Full Name</Label>
                  <Input id="doc-name" placeholder="Dr. Full Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-email">Email</Label>
                  <Input id="doc-email" type="email" placeholder="doctor@hospital.local" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-spec">Specialization</Label>
                  <Input id="doc-spec" placeholder="e.g. Cardiology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-qual">Qualification</Label>
                  <Input id="doc-qual" placeholder="e.g. MD, FACC" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-phone">Phone</Label>
                  <Input id="doc-phone" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-exp">Experience</Label>
                <Input id="doc-exp" placeholder="e.g. 5 years" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => { setIsAddOpen(false); toast.success("Doctor added!") }}>Add Doctor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Doctors",    value: doctors.length,   icon: UserRound,   color: "bg-primary/10 text-primary" },
          { label: "Available Today",  value: available,         icon: Calendar,    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Departments",      value: departments.length,icon: Building2,   color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Avg Rating",       value: "4.8",             icon: Star,        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, specialization..."
            className="pl-8"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilt} onValueChange={setStatusFilt}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="py-12 text-center text-muted-foreground">
            <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No doctors found matching your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(doc => {
            const cfg = statusConfig[doc.status] ?? statusConfig["On Leave"]
            return (
              <Card key={doc.id} className="border-none shadow-md hover:shadow-lg transition-all duration-200 group">
                <CardContent className="p-5">
                  {/* Top section */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 shrink-0 ring-2 ring-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
                        {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm truncate">{doc.name}</h3>
                          <p className="text-xs text-primary font-medium mt-0.5">{doc.specialization}</p>
                        </div>
                        <Badge className={`${cfg.className} text-xs shrink-0 flex items-center gap-1`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {doc.status}
                        </Badge>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(doc.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium">{doc.rating}</span>
                        <span className="text-xs text-muted-foreground">({doc.consultations})</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                      <span>{doc.qualification} · {doc.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{doc.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{doc.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{doc.phone}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                      <Link href={`/admin/doctors/${doc.id}`}>
                        <Stethoscope className="mr-1.5 h-3.5 w-3.5" />
                        View Profile
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1 text-xs" asChild>
                      <Link href={`/admin/doctors/${doc.id}/edit`}>
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
