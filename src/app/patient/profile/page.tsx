"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
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
  Calendar,
  Shield,
  CreditCard,
  AlertCircle,
  HeartPulse,
  Pill,
  Activity,
  Camera,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  Lock,
  Bell,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const patientProfile = {
  personalInfo: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    bloodType: "O+",
    maritalStatus: "Married",
    nationality: "American",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
  },
  emergencyContacts: [
    { id: 1, name: "Jane Smith", relationship: "Spouse", phone: "+1 (555) 987-6543", email: "jane.smith@email.com" },
    { id: 2, name: "Robert Smith", relationship: "Brother", phone: "+1 (555) 456-7890", email: "robert.smith@email.com" },
  ],
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BCBS-123456789",
    groupNumber: "GRP-987654",
    validUntil: "December 31, 2025",
    primaryHolder: "John Smith",
    relation: "Self",
  },
  medicalInfo: {
    allergies: ["Penicillin", "Peanuts", "Sulfa drugs"],
    chronicConditions: ["Hypertension (controlled)"],
    currentMedications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
    surgeries: [
      { name: "Appendectomy", year: "2010", notes: "No complications" },
    ],
    familyHistory: [
      { condition: "Diabetes", relation: "Father" },
      { condition: "Heart Disease", relation: "Grandfather (paternal)" },
    ],
  },
  preferences: {
    language: "English",
    timezone: "Eastern Time (ET)",
    notifications: {
      email: true,
      sms: true,
      push: true,
    },
  },
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"]
const genders = ["Male", "Female", "Other", "Prefer not to say"]

export default function PatientProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(patientProfile)
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone: "", email: "" })

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProfile(patientProfile)
  }

  const handleAddContact = () => {
    const newId = profile.emergencyContacts.length + 1
    setProfile({
      ...profile,
      emergencyContacts: [...profile.emergencyContacts, { ...newContact, id: newId }],
    })
    setNewContact({ name: "", relationship: "", phone: "", email: "" })
    setShowAddContact(false)
  }

  const handleRemoveContact = (id: number) => {
    setProfile({
      ...profile,
      emergencyContacts: profile.emergencyContacts.filter(c => c.id !== id),
    })
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="destructive" asChild>
              <a href="/logout">Logout</a>
            </Button>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Overview */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">
                    {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                  </h2>
                  <Badge>Active Patient</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{profile.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{profile.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">DOB: {profile.personalInfo.dateOfBirth}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">O+</p>
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-xs text-muted-foreground">Visits</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Active Meds</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={profile.personalInfo.firstName}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, firstName: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={profile.personalInfo.lastName}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, lastName: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile.personalInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, email: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.personalInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={profile.personalInfo.dateOfBirth}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, dateOfBirth: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={profile.personalInfo.gender}
                        disabled={!isEditing}
                        onValueChange={(value) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, gender: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Blood Type</Label>
                      <Select
                        value={profile.personalInfo.bloodType}
                        disabled={!isEditing}
                        onValueChange={(value) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, bloodType: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Marital Status</Label>
                      <Select
                        value={profile.personalInfo.maritalStatus}
                        disabled={!isEditing}
                        onValueChange={(value) => setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, maritalStatus: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {maritalStatuses.map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Street Address</Label>
                    <Input
                      value={profile.personalInfo.address.street}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: {
                          ...profile.personalInfo,
                          address: { ...profile.personalInfo.address, street: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={profile.personalInfo.address.city}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: {
                            ...profile.personalInfo,
                            address: { ...profile.personalInfo.address, city: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={profile.personalInfo.address.state}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: {
                            ...profile.personalInfo,
                            address: { ...profile.personalInfo.address, state: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        value={profile.personalInfo.address.zipCode}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: {
                            ...profile.personalInfo,
                            address: { ...profile.personalInfo.address, zipCode: e.target.value }
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={profile.personalInfo.address.country}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({
                          ...profile,
                          personalInfo: {
                            ...profile.personalInfo,
                            address: { ...profile.personalInfo.address, country: e.target.value }
                          }
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Settings */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Account & Security
                </CardTitle>
                <CardDescription>
                  Manage your account settings and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Lock className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your password</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Shield className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Two-Factor Auth</p>
                      <p className="text-xs text-muted-foreground">Enable extra security</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Bell className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Notifications</p>
                      <p className="text-xs text-muted-foreground">Manage alerts</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Information Tab */}
          <TabsContent value="medical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Allergies */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    Allergies
                  </CardTitle>
                  <CardDescription>
                    Known allergies and adverse reactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.medicalInfo.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-sm py-1 px-3">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Allergy
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Chronic Conditions */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-primary" />
                    Chronic Conditions
                  </CardTitle>
                  <CardDescription>
                    Long-term health conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.medicalInfo.chronicConditions.map((condition) => (
                      <Badge key={condition} variant="secondary" className="text-sm py-1 px-3">
                        {condition}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Condition
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Current Medications */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-primary" />
                    Current Medications
                  </CardTitle>
                  <CardDescription>
                    Medications you are currently taking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.medicalInfo.currentMedications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {med.dosage} • {med.frequency}
                          </p>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Medication
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Family History */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Family Medical History
                  </CardTitle>
                  <CardDescription>
                    Health conditions in your family
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.medicalInfo.familyHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{item.condition}</p>
                          <p className="text-sm text-muted-foreground">{item.relation}</p>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Family History
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Past Surgeries */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Past Surgeries / Procedures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.medicalInfo.surgeries.map((surgery, index) => (
                    <div key={index} className="flex items-start justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">{surgery.name}</p>
                        <p className="text-sm text-muted-foreground">Year: {surgery.year}</p>
                        <p className="text-sm text-muted-foreground">{surgery.notes}</p>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Emergency Contacts
                  </div>
                  {isEditing && (
                    <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Emergency Contact</DialogTitle>
                          <DialogDescription>
                            Add a new emergency contact to your profile
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                              value={newContact.name}
                              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                              placeholder="Enter contact name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Relationship</Label>
                            <Input
                              value={newContact.relationship}
                              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                              placeholder="e.g., Spouse, Parent, Sibling"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input
                              value={newContact.phone}
                              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email (Optional)</Label>
                            <Input
                              type="email"
                              value={newContact.email}
                              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                              placeholder="email@example.com"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddContact(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddContact}>Add Contact</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardTitle>
                <CardDescription>
                  People we can contact in case of an emergency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{contact.email}</span>
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleRemoveContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Insurance Information
                </CardTitle>
                <CardDescription>
                  Your health insurance details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Insurance Provider</Label>
                      <Input
                        value={profile.insurance.provider}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Policy Number</Label>
                      <Input
                        value={profile.insurance.policyNumber}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Group Number</Label>
                      <Input
                        value={profile.insurance.groupNumber}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Primary Holder</Label>
                      <Input
                        value={profile.insurance.primaryHolder}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relation to Holder</Label>
                      <Input
                        value={profile.insurance.relation}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valid Until</Label>
                      <Input
                        value={profile.insurance.validUntil}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    View Insurance Card
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Another Insurance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
