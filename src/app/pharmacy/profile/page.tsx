"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  Building2,
  Clock,
  Calendar,
  Shield,
  Bell,
  Lock,
  Edit,
  Camera,
  CheckCircle2,
  Award,
  Pill,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const profile = {
  name: "Dr. Nancy Lee",
  email: "nancy.lee@hospital.com",
  phone: "(555) 456-7890",
  employeeId: "EMP-2024-008",
  role: "Pharmacist",
  license: "PHARM-IL-2019-4521",
  department: "Pharmacy",
  shift: "Day (09:00 - 18:00)",
  joiningDate: "2019-03-10",
  address: "789 Elm Avenue, Springfield, IL 62704",
  emergencyContact: "Tom Lee",
  emergencyPhone: "(555) 456-7891",
  qualifications: ["Doctor of Pharmacy (PharmD)", "Board Certified Pharmacotherapy Specialist", "Medication Therapy Management Certificate"],
  specializations: ["Cardiology Medications", "Diabetes Management", "Oncology Support"],
}

const notifSettings = [
  { id: "low_stock", label: "Low Stock Alerts", desc: "Notify when medication drops below minimum level", defaultOn: true },
  { id: "expiry", label: "Expiry Warnings", desc: "Get alerts for medications expiring within 30 days", defaultOn: true },
  { id: "new_rx", label: "New Prescriptions", desc: "Notification for newly received prescriptions", defaultOn: true },
  { id: "refill", label: "Refill Requests", desc: "Alerts when patients request medication refills", defaultOn: false },
]

export default function PharmacyProfilePage() {
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState(profile.phone)
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(notifSettings.map(n => [n.id, n.defaultOn]))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your pharmacist profile and preferences</p>
      </div>

      {/* Profile Overview */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-emerald-600 text-white text-2xl font-bold">
                  {profile.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={() => toast({ title: "Photo upload coming soon" })}>
                <Camera className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <Badge variant="outline">{profile.employeeId}</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
              <p className="text-primary font-medium mt-1">{profile.role}</p>
              <p className="text-xs text-muted-foreground font-mono">License: {profile.license}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{profile.department}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{profile.shift}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Since {profile.joiningDate}</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{profile.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{profile.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Prescriptions Filled", value: "4,821", color: "text-primary" },
          { label: "Medications in Stock", value: "348", color: "text-emerald-600" },
          { label: "Dispensed This Month", value: "612", color: "text-blue-600" },
          { label: "Years of Service", value: "5", color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-md">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5" />Personal Information
              </CardTitle>
              <Button variant={editing ? "default" : "outline"} size="sm"
                onClick={() => {
                  if (editing) toast({ title: "Profile updated successfully" })
                  setEditing(!editing)
                }}>
                {editing ? <><CheckCircle2 className="mr-2 h-4 w-4" />Save</> : <><Edit className="mr-2 h-4 w-4" />Edit</>}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <Input value={profile.name} disabled className="bg-muted/30" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">License No.</Label>
                  <Input value={profile.license} disabled className="bg-muted/30" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                  <Input value={profile.email} disabled className="bg-muted/30" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Phone Number</Label>
                  <Input value={phone} disabled={!editing} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Home Address</Label>
                  <Input value={profile.address} disabled={!editing} />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Emergency Contact</Label>
                  <Input value={profile.emergencyContact} disabled={!editing} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Emergency Phone</Label>
                  <Input value={profile.emergencyPhone} disabled={!editing} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <div className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-5 w-5" />Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.qualifications.map((q, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border bg-muted/20">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q}</p>
                      <p className="text-xs text-muted-foreground">Verified</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Pill className="h-5 w-5" />Specialization Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-sm px-3 py-1">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-5 w-5" />Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifSettings.map((n) => (
                <div key={n.id} className="flex items-center justify-between p-3 rounded-xl border">
                  <div className="flex items-start gap-3">
                    {n.id === "low_stock" || n.id === "expiry"
                      ? <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      : <Bell className="h-4 w-4 text-primary mt-0.5 shrink-0" />}
                    <div>
                      <p className="font-medium text-sm">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications[n.id]}
                    onCheckedChange={v => setNotifications(prev => ({ ...prev, [n.id]: v }))}
                  />
                </div>
              ))}
              <Button onClick={() => toast({ title: "Notification preferences saved" })}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5" />Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button onClick={() => toast({ title: "Password updated successfully" })}>
                  <Lock className="mr-2 h-4 w-4" />Update Password
                </Button>
              </div>
              <Separator />
              <div className="p-3 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch onCheckedChange={v => toast({ title: v ? "2FA enabled" : "2FA disabled" })} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
