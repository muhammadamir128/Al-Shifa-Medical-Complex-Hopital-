"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Building2,
  Award,
  UserCog,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const staffData = {
  id: "STF-001",
  name: "Robert Johnson",
  email: "robert.johnson@hospital.local",
  phone: "(555) 345-6789",
  role: "Receptionist",
  department: "Front Desk",
  shift: "Day",
  employeeId: "EMP-2024-012",
  joiningDate: "2020-05-15",
  experience: "4 years",
  status: "Active",
  address: "456 Oak Street, Springfield, IL 62703",
  emergencyContact: "Mary Johnson - (555) 345-6790",
  qualification: "Bachelor of Administration",
  notes: "Excellent communication skills and patient service record.",
}

const departments = [
  "Front Desk", "Emergency", "Cardiology", "Neurology", "Orthopedics",
  "Pediatrics", "Laboratory", "Pharmacy", "Surgery", "General Medicine",
]
const roles = ["Nurse", "Receptionist", "Lab Technician", "Pharmacist", "Technician", "Support Staff"]
const shifts = ["Day", "Evening", "Night", "Rotating"]
const statusOptions = ["Active", "On Leave", "Inactive", "Suspended"]

export default function AdminStaffEditPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()

  const [name, setName] = useState(staffData.name)
  const [email, setEmail] = useState(staffData.email)
  const [phone, setPhone] = useState(staffData.phone)
  const [role, setRole] = useState(staffData.role)
  const [department, setDepartment] = useState(staffData.department)
  const [shift, setShift] = useState(staffData.shift)
  const [address, setAddress] = useState(staffData.address)
  const [emergencyContact, setEmergencyContact] = useState(staffData.emergencyContact)
  const [qualification, setQualification] = useState(staffData.qualification)
  const [experience, setExperience] = useState(staffData.experience)
  const [status, setStatus] = useState(staffData.status)
  const [notes, setNotes] = useState(staffData.notes)

  const handleSave = () => {
    toast({ title: "Staff profile updated", description: `${name}'s profile has been saved.` })
    router.push(`/admin/staff/${params.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/admin/staff/${params.id}`}>
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Staff Profile</h1>
            <p className="text-muted-foreground">Update staff member information and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/staff/${params.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />Save Changes
          </Button>
        </div>
      </div>

      {/* Staff Identity */}
      <Card className="border-none shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full"
                onClick={() => toast({ title: "Photo upload coming soon" })}>
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-lg">{name}</p>
                <Badge variant="outline" className="font-mono text-xs">{staffData.employeeId}</Badge>
                <Badge className={
                  status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" :
                  status === "On Leave" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30" :
                  "bg-red-100 text-red-700 dark:bg-red-900/30"
                }>
                  {status}
                </Badge>
              </div>
              <p className="text-primary text-sm mt-0.5">{role} · {department}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Emergency Contact</Label>
                  <Input
                    placeholder="Name - Phone Number"
                    value={emergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserCog className="h-5 w-5 text-primary" />Employment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Role <span className="text-destructive">*</span></Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Department <span className="text-destructive">*</span></Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Shift</Label>
                  <Select value={shift} onValueChange={setShift}>
                    <SelectTrigger>
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Years of Experience</Label>
                  <Input value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 4 years" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Qualification / Education</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="e.g. Bachelor of Nursing" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Notes</Label>
                <Textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes about this staff member..." />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Account Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              {(status === "Inactive" || status === "Suspended") && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-400">
                    {status === "Suspended"
                      ? "Staff member will be unable to log in or access any systems."
                      : "Staff member will be marked as inactive in the system."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Record Info */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Record Info</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Staff ID</span>
                <span className="font-mono font-medium">{staffData.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employee ID</span>
                <span className="font-mono font-medium">{staffData.employeeId}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Joining Date</span>
                <span className="font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {staffData.joiningDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />Save Changes
            </Button>
            <Link href={`/admin/staff/${params.id}`}>
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Separator />
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => toast({ title: "Change status to Inactive in the status dropdown above", variant: "destructive" })}
            >
              <AlertCircle className="mr-2 h-4 w-4" />Deactivate Staff
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
