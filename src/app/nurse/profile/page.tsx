"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Camera,
  Save,
  Bell,
  Shield,
  Key,
  Globe,
  Lock,
  Heart,
  Award,
  Clock,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const nurseProfile = {
  personal: {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@hospital.com",
    phone: "(555) 234-5678",
    dateOfBirth: "1992-04-22",
    gender: "Female",
    address: "789 Healthcare Ave",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    avatar: "ED",
  },
  professional: {
    employeeId: "NUR-2024-007",
    department: "Cardiology Ward",
    ward: "Ward 3 - Cardiology",
    shift: "Morning (07:00 - 15:00)",
    licenseNumber: "RN-IL-456789",
    yearsOfExperience: 6,
    specialization: "Critical Care",
    joiningDate: "2018-06-01",
  },
  qualifications: [
    { degree: "BSN - Bachelor of Science in Nursing", institution: "University of Illinois", year: "2014" },
    { degree: "RN Licensure", institution: "Illinois State Board of Nursing", year: "2014" },
    { degree: "Critical Care Certification (CCRN)", institution: "AACN", year: "2017" },
  ],
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    shiftReminders: true,
    patientAlerts: true,
    taskAlerts: true,
    weeklyReports: false,
  },
}

export default function NurseProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [profile, setProfile] = useState(nurseProfile)

  const handleSave = () => {
    toast({ title: "Success", description: "Profile updated successfully" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal and professional information</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="destructive" asChild>
            <a href="/logout">Logout</a>
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Profile Overview */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.personal.avatar}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <p className="font-semibold">{profile.personal.firstName} {profile.personal.lastName}</p>
                <p className="text-sm text-muted-foreground">Registered Nurse</p>
                <Badge className="mt-2">{profile.professional.specialization}</Badge>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Employee ID</p>
                <p className="font-medium text-sm">{profile.professional.employeeId}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-medium text-sm">{profile.professional.yearsOfExperience} years</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Ward</p>
                <p className="font-medium text-sm">{profile.professional.ward}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Shift</p>
                <p className="font-medium text-sm">Morning</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={profile.personal.firstName}
                    onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, firstName: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={profile.personal.lastName}
                    onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, lastName: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" className="pl-10" value={profile.personal.email}
                      onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, email: e.target.value } })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" className="pl-10" value={profile.personal.phone}
                      onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, phone: e.target.value } })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={profile.personal.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, dateOfBirth: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={profile.personal.gender}
                    onValueChange={(v) => setProfile({ ...profile, personal: { ...profile.personal, gender: v } })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" className="pl-10" value={profile.personal.address}
                      onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, address: e.target.value } })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={profile.personal.city}
                    onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, city: e.target.value } })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input value={profile.personal.state}
                      onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, state: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP</Label>
                    <Input value={profile.personal.zipCode}
                      onChange={(e) => setProfile({ ...profile, personal: { ...profile.personal, zipCode: e.target.value } })} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input value={profile.professional.department} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ward</Label>
                    <Input value={profile.professional.ward} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Shift</Label>
                    <Input value={profile.professional.shift} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>License Number</Label>
                    <Input value={profile.professional.licenseNumber} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Input value={profile.professional.specialization} />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input type="number" value={profile.professional.yearsOfExperience} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Qualifications & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.qualifications.map((q, i) => (
                    <div key={i} className="p-3 rounded-lg border">
                      <p className="font-medium text-sm">{q.degree}</p>
                      <p className="text-sm text-muted-foreground">{q.institution}</p>
                      <p className="text-xs text-muted-foreground">{q.year}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Add Qualification</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Shift Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div key={day} className="p-3 rounded-lg border text-center">
                      <p className="text-xs text-muted-foreground">{day}</p>
                      <p className="text-sm font-medium mt-1">07:00 - 15:00</p>
                      <Badge variant="outline" className="mt-1 text-xs">Morning</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive alerts and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                { key: "smsNotifications", label: "SMS Notifications", desc: "Receive notifications via SMS" },
                { key: "shiftReminders", label: "Shift Reminders", desc: "Get reminded before your shift starts" },
                { key: "patientAlerts", label: "Patient Alerts", desc: "Get notified about critical patient status changes" },
                { key: "taskAlerts", label: "Task Alerts", desc: "Get notified when new tasks are assigned" },
                { key: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly performance summary" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={profile.notifications[item.key as keyof typeof profile.notifications]}
                    onCheckedChange={(checked) =>
                      setProfile({ ...profile, notifications: { ...profile.notifications, [item.key]: checked } })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
                <Button className="w-full">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds additional security to your account by requiring more than just a password to sign in.
                </p>
                <Button variant="outline" className="w-full">Setup Two-Factor Authentication</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Login History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on Windows", location: "Springfield, IL", time: "Today, 7:00 AM", current: true },
                    { device: "Safari on iPhone", location: "Springfield, IL", time: "Yesterday, 3:15 PM", current: false },
                    { device: "Chrome on Windows", location: "Springfield, IL", time: "Jan 18, 2024", current: false },
                  ].map((login, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{login.device}</p>
                          <p className="text-sm text-muted-foreground">{login.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{login.time}</p>
                        {login.current && <Badge variant="outline" className="text-xs">Current Session</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
