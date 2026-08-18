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
  Stethoscope,
  MapPin,
  Hash,
  Camera,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const doctor = {
  id: "DOC-001",
  name: "Dr. Sarah Wilson",
  email: "sarah.wilson@hospital.com",
  phone: "(555) 123-4001",
  specialization: "Cardiology",
  department: "Cardiology",
  qualification: "MD, FACC",
  experience: "15 years",
  licenseNumber: "IL-MD-789012",
  npiNumber: "9876543210",
  joiningDate: "2009-03-10",
  room: "Room 301, Building B",
  status: "ACTIVE",
  bio: "Dr. Sarah Wilson is a board-certified cardiologist with over 15 years of experience in interventional cardiology. She specializes in complex coronary interventions and structural heart disease.",
}

const departments = ["Cardiology", "Neurology", "General Medicine", "Orthopedics", "Dermatology", "Psychiatry", "Pediatrics", "Oncology", "Radiology", "Emergency"]
const specializations = ["Cardiology", "Neurology", "General Medicine", "Orthopedics", "Dermatology", "Psychiatry", "Pediatrics", "Oncology", "Radiology", "Emergency Medicine"]

export default function AdminDoctorEditPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()

  const [name, setName] = useState(doctor.name)
  const [email, setEmail] = useState(doctor.email)
  const [phone, setPhone] = useState(doctor.phone)
  const [specialization, setSpecialization] = useState(doctor.specialization)
  const [department, setDepartment] = useState(doctor.department)
  const [qualification, setQualification] = useState(doctor.qualification)
  const [experience, setExperience] = useState(doctor.experience)
  const [licenseNumber, setLicenseNumber] = useState(doctor.licenseNumber)
  const [npiNumber, setNpiNumber] = useState(doctor.npiNumber)
  const [room, setRoom] = useState(doctor.room)
  const [status, setStatus] = useState(doctor.status)
  const [bio, setBio] = useState(doctor.bio)

  const handleSave = () => {
    toast({ title: "Doctor profile updated", description: `${name}'s profile has been saved.` })
    router.push(`/admin/doctors/${params.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/admin/doctors/${params.id}`}>
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Doctor Profile</h1>
            <p className="text-muted-foreground">Update doctor information and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/doctors/${params.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />Save Changes
          </Button>
        </div>
      </div>

      {/* Doctor Identity */}
      <Card className="border-none shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {name.replace("Dr. ", "").split(" ").map((n: string) => n[0]).join("")}
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
                <Badge variant="outline" className="font-mono text-xs">{doctor.id}</Badge>
                <Badge className={status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}>
                  {status === "ACTIVE" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-primary text-sm">{specialization} · {department}</p>
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
                  <Label>Office / Room</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={room} onChange={e => setRoom(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Specialization <span className="text-destructive">*</span></Label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {specializations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
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
                  <Label>Qualification / Degree</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="e.g. MD, FACC" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Years of Experience</Label>
                  <Input value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 15 years" />
                </div>
                <div className="space-y-1.5">
                  <Label>License Number <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9 font-mono" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>NPI Number</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9 font-mono" value={npiNumber} onChange={e => setNpiNumber(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Professional Bio</Label>
                <Textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} />
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
              {status === "INACTIVE" || status === "SUSPENDED" ? (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">
                    {status === "SUSPENDED"
                      ? "Doctor will be unable to log in or access any patient data."
                      : "Doctor will be hidden from appointment booking."}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Record Info */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Record Info</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor ID</span>
                <span className="font-mono font-medium">{doctor.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joining Date</span>
                <span className="font-medium">{doctor.joiningDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />Save Changes
            </Button>
            <Link href={`/admin/doctors/${params.id}`}>
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Separator />
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => toast({ title: "Confirm deactivation in status dropdown above", variant: "destructive" })}>
              <AlertCircle className="mr-2 h-4 w-4" />Deactivate Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
