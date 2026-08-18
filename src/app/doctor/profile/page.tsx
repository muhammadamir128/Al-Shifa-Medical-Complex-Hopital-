"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
  Calendar,
  Clock,
  Save,
  Camera,
  Award,
  GraduationCap,
  FileText,
  Stethoscope,
  Bell,
  Shield,
  Key,
  Globe,
  Languages,
  CreditCard,
  Lock,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock doctor profile data
const doctorProfile = {
  personal: {
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@hospital.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    address: "456 Medical Center Dr, Suite 200",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    avatar: "MC",
  },
  professional: {
    employeeId: "DOC-2024-001",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    licenseNumber: "IL-MD-123456",
    npiNumber: "1234567890",
    joiningDate: "2020-03-15",
    yearsOfExperience: 12,
    consultationFee: 150,
    room: "Room 204, Building A",
  },
  education: [
    { degree: "MD", institution: "Johns Hopkins University", year: "2010" },
    { degree: "Residency - Internal Medicine", institution: "Mayo Clinic", year: "2013" },
    { degree: "Fellowship - Cardiology", institution: "Cleveland Clinic", year: "2016" },
  ],
  certifications: [
    { name: "American Board of Internal Medicine", year: "2013", expires: "2028" },
    { name: "American Board of Cardiovascular Disease", year: "2016", expires: "2026" },
    { name: "Advanced Cardiac Life Support (ACLS)", year: "2023", expires: "2025" },
  ],
  schedule: {
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    lunchBreak: "12:00 - 13:00",
    consultDuration: 30,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    labResultAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
  },
}

export default function DoctorProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [profile, setProfile] = useState(doctorProfile)

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Profile updated successfully",
    })
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal and professional information
            </p>
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
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profile.personal.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Dr. {profile.personal.firstName} {profile.personal.lastName}</p>
                  <p className="text-sm text-muted-foreground">{profile.professional.specialization}</p>
                  <Badge className="mt-2">{profile.professional.department}</Badge>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{profile.professional.employeeId}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-medium">{profile.professional.yearsOfExperience} years</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Consultation Fee</p>
                  <p className="font-medium">${profile.professional.consultationFee}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{profile.professional.room}</p>
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
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
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
                    <Input
                      id="firstName"
                      value={profile.personal.firstName}
                      onChange={(e) => setProfile({
                        ...profile,
                        personal: { ...profile.personal, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.personal.lastName}
                      onChange={(e) => setProfile({
                        ...profile,
                        personal: { ...profile.personal, lastName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.personal.email}
                        onChange={(e) => setProfile({
                          ...profile,
                          personal: { ...profile.personal, email: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={profile.personal.phone}
                        onChange={(e) => setProfile({
                          ...profile,
                          personal: { ...profile.personal, phone: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profile.personal.dateOfBirth}
                      onChange={(e) => setProfile({
                        ...profile,
                        personal: { ...profile.personal, dateOfBirth: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profile.personal.gender} onValueChange={(v) => setProfile({
                      ...profile,
                      personal: { ...profile.personal, gender: v }
                    })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
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
                      <Input
                        id="address"
                        className="pl-10"
                        value={profile.personal.address}
                        onChange={(e) => setProfile({
                          ...profile,
                          personal: { ...profile.personal, address: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.personal.city}
                      onChange={(e) => setProfile({
                        ...profile,
                        personal: { ...profile.personal, city: e.target.value }
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profile.personal.state}
                        onChange={(e) => setProfile({
                          ...profile,
                          personal: { ...profile.personal, state: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={profile.personal.zipCode}
                        onChange={(e) => setProfile({
                          ...profile,
                          personal: { ...profile.personal, zipCode: e.target.value }
                        })}
                      />
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
                    <Stethoscope className="h-5 w-5 text-primary" />
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
                      <Label>Specialization</Label>
                      <Input value={profile.professional.specialization} />
                    </div>
                    <div className="space-y-2">
                      <Label>License Number</Label>
                      <Input value={profile.professional.licenseNumber} readOnly className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>NPI Number</Label>
                      <Input value={profile.professional.npiNumber} readOnly className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Consultation Fee ($)</Label>
                      <Input type="number" value={profile.professional.consultationFee} />
                    </div>
                    <div className="space-y-2">
                      <Label>Room/Office</Label>
                      <Input value={profile.professional.room} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Add Education
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <p className="font-medium">{cert.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline">Obtained: {cert.year}</Badge>
                          <Badge variant="secondary">Expires: {cert.expires}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Add Certification
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Working Schedule
                </CardTitle>
                <CardDescription>Configure your availability and working hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Working Days */}
                <div>
                  <Label className="text-base">Working Days</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <Badge
                        key={day}
                        variant={profile.schedule.workingDays.includes(day) ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2"
                      >
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Working Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select value={profile.schedule.workingHours.start}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Select value={profile.schedule.workingHours.end}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                        <SelectItem value="17:00">05:00 PM</SelectItem>
                        <SelectItem value="18:00">06:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lunch Break</Label>
                    <Input value={profile.schedule.lunchBreak} />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Consultation Duration</Label>
                    <Select value={String(profile.schedule.consultDuration)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={profile.notifications.emailNotifications}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, emailNotifications: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={profile.notifications.smsNotifications}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, smsNotifications: checked }
                    })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming appointments</p>
                  </div>
                  <Switch
                    checked={profile.notifications.appointmentReminders}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, appointmentReminders: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Lab Result Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when lab results are ready</p>
                  </div>
                  <Switch
                    checked={profile.notifications.labResultAlerts}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, labResultAlerts: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={profile.notifications.weeklyReports}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklyReports: checked }
                    })}
                  />
                </div>
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
                    Two-factor authentication adds an additional layer of security to your account
                    by requiring more than just a password to sign in.
                  </p>
                  <Button variant="outline" className="w-full">
                    Setup Two-Factor Authentication
                  </Button>
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
                      { device: "Chrome on Windows", location: "Springfield, IL", time: "Today, 9:15 AM", current: true },
                      { device: "Safari on iPhone", location: "Springfield, IL", time: "Yesterday, 2:30 PM", current: false },
                      { device: "Chrome on Windows", location: "Springfield, IL", time: "Jan 18, 2024", current: false },
                    ].map((login, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
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
                          {login.current && (
                            <Badge variant="outline" className="text-xs">Current Session</Badge>
                          )}
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
    </>
  )
}
