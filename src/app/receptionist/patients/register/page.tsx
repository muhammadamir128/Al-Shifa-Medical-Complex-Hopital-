"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  HeartPulse,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Save,
  UserPlus,
  Building2,
  Shield,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const genders = ["Male", "Female", "Other"]
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"]
const insuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "United Healthcare",
  "Humana",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid",
  "Self-Pay",
  "Other"
]
const relationshipTypes = ["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"]

export default function PatientRegistrationPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    nationality: "",
    
    // Address Information
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
    
    // Insurance Information
    insuranceProvider: "",
    insuranceId: "",
    insuranceGroupNumber: "",
    policyHolderName: "",
    policyHolderRelation: "",
    
    // Medical Information
    allergies: "",
    currentMedications: "",
    medicalConditions: "",
    previousSurgeries: "",
    familyHistory: "",
    
    // Primary Care
    primaryCarePhysician: "",
    preferredPharmacy: "",
    
    // Consent
    consentTreatment: false,
    consentDataSharing: false,
    consentPrivacy: false,
    
    // Registration Notes
    registrationNotes: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate a patient ID
    const patientId = `P${Date.now().toString().slice(-6)}`
    setGeneratedPatientId(patientId)
    
    // Here you would typically call an API to register the patient
    console.log("Registering patient:", formData)
    setShowSuccessDialog(true)
  }

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.dateOfBirth &&
      formData.gender &&
      formData.streetAddress &&
      formData.city &&
      formData.emergencyContactName &&
      formData.emergencyContactPhone &&
      formData.consentTreatment &&
      formData.consentPrivacy
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/receptionist/patients">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Register New Patient</h1>
              <p className="text-muted-foreground">
                Complete the form below to register a new patient
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-amber-500" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Basic patient details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+1 (234) 567-8901"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          className="pl-10"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender.toLowerCase()}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((bg) => (
                            <SelectItem key={bg} value={bg.toLowerCase()}>
                              {bg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <Input
                        id="alternatePhone"
                        placeholder="+1 (234) 567-8902"
                        value={formData.alternatePhone}
                        onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {maritalStatuses.map((status) => (
                            <SelectItem key={status} value={status.toLowerCase()}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="Enter nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange("nationality", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    Address Information
                  </CardTitle>
                  <CardDescription>Patient&apos;s residential address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address *</Label>
                    <Input
                      id="streetAddress"
                      placeholder="123 Main Street, Apt 4B"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-500" />
                    Emergency Contact
                  </CardTitle>
                  <CardDescription>Person to contact in case of emergency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Contact Name *</Label>
                      <Input
                        id="emergencyContactName"
                        placeholder="Enter full name"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                      <Select 
                        value={formData.emergencyContactRelation} 
                        onValueChange={(value) => handleInputChange("emergencyContactRelation", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationshipTypes.map((rel) => (
                            <SelectItem key={rel} value={rel.toLowerCase()}>
                              {rel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="emergencyContactPhone"
                          placeholder="+1 (234) 567-8902"
                          className="pl-10"
                          value={formData.emergencyContactPhone}
                          onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactEmail">Contact Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="emergencyContactEmail"
                          type="email"
                          placeholder="email@example.com"
                          className="pl-10"
                          value={formData.emergencyContactEmail}
                          onChange={(e) => handleInputChange("emergencyContactEmail", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-amber-500" />
                    Insurance Information
                  </CardTitle>
                  <CardDescription>Patient&apos;s insurance details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Select 
                        value={formData.insuranceProvider} 
                        onValueChange={(value) => handleInputChange("insuranceProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {insuranceProviders.map((provider) => (
                            <SelectItem key={provider} value={provider.toLowerCase().replace(/ /g, "_")}>
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceId">Insurance ID / Policy Number</Label>
                      <Input
                        id="insuranceId"
                        placeholder="Enter policy number"
                        value={formData.insuranceId}
                        onChange={(e) => handleInputChange("insuranceId", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceGroupNumber">Group Number</Label>
                      <Input
                        id="insuranceGroupNumber"
                        placeholder="Enter group number"
                        value={formData.insuranceGroupNumber}
                        onChange={(e) => handleInputChange("insuranceGroupNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policyHolderRelation">Policy Holder Relation</Label>
                      <Select 
                        value={formData.policyHolderRelation} 
                        onValueChange={(value) => handleInputChange("policyHolderRelation", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">Self</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="guardian">Guardian</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.policyHolderRelation && formData.policyHolderRelation !== "self" && (
                    <div className="space-y-2">
                      <Label htmlFor="policyHolderName">Policy Holder Name</Label>
                      <Input
                        id="policyHolderName"
                        placeholder="Enter policy holder's full name"
                        value={formData.policyHolderName}
                        onChange={(e) => handleInputChange("policyHolderName", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-amber-500" />
                    Medical Information
                  </CardTitle>
                  <CardDescription>Patient&apos;s health history (optional)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Important</span>
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                      This information helps doctors provide better care. All medical data is kept confidential.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any known allergies (medications, food, environmental)..."
                      value={formData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="currentMedications"
                      placeholder="List any current medications and dosages..."
                      value={formData.currentMedications}
                      onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="List any chronic conditions or ongoing health issues..."
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
                    <Textarea
                      id="previousSurgeries"
                      placeholder="List any previous surgeries with approximate dates..."
                      value={formData.previousSurgeries}
                      onChange={(e) => handleInputChange("previousSurgeries", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyHistory">Family Medical History</Label>
                    <Textarea
                      id="familyHistory"
                      placeholder="Notable medical conditions in immediate family..."
                      value={formData.familyHistory}
                      onChange={(e) => handleInputChange("familyHistory", e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Primary Care & Preferences */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-amber-500" />
                    Primary Care & Preferences
                  </CardTitle>
                  <CardDescription>Preferred healthcare providers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryCarePhysician">Primary Care Physician</Label>
                      <Input
                        id="primaryCarePhysician"
                        placeholder="Dr. Name or N/A"
                        value={formData.primaryCarePhysician}
                        onChange={(e) => handleInputChange("primaryCarePhysician", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredPharmacy">Preferred Pharmacy</Label>
                      <Input
                        id="preferredPharmacy"
                        placeholder="Pharmacy name and location"
                        value={formData.preferredPharmacy}
                        onChange={(e) => handleInputChange("preferredPharmacy", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Summary */}
              <Card className="border-none shadow-md sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-500" />
                    Registration Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {formData.firstName && formData.lastName ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={formData.firstName && formData.lastName ? "" : "text-muted-foreground"}>
                        Personal Information
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.streetAddress && formData.city ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={formData.streetAddress && formData.city ? "" : "text-muted-foreground"}>
                        Address Information
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.emergencyContactName && formData.emergencyContactPhone ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={formData.emergencyContactName && formData.emergencyContactPhone ? "" : "text-muted-foreground"}>
                        Emergency Contact
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.insuranceProvider ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={formData.insuranceProvider ? "" : "text-muted-foreground"}>
                        Insurance Information
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.allergies || formData.currentMedications ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={formData.allergies || formData.currentMedications ? "" : "text-muted-foreground"}>
                        Medical Information
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Consent Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      Consent & Agreements *
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="consentTreatment"
                          checked={formData.consentTreatment}
                          onCheckedChange={(checked) => handleInputChange("consentTreatment", checked as boolean)}
                        />
                        <Label htmlFor="consentTreatment" className="text-sm leading-tight cursor-pointer">
                          I consent to medical treatment and procedures as deemed necessary
                        </Label>
                      </div>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="consentDataSharing"
                          checked={formData.consentDataSharing}
                          onCheckedChange={(checked) => handleInputChange("consentDataSharing", checked as boolean)}
                        />
                        <Label htmlFor="consentDataSharing" className="text-sm leading-tight cursor-pointer">
                          I consent to share medical data with referring physicians
                        </Label>
                      </div>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="consentPrivacy"
                          checked={formData.consentPrivacy}
                          onCheckedChange={(checked) => handleInputChange("consentPrivacy", checked as boolean)}
                        />
                        <Label htmlFor="consentPrivacy" className="text-sm leading-tight cursor-pointer">
                          I acknowledge the privacy policy and HIPAA notice
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Registration Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="registrationNotes">Registration Notes</Label>
                    <Textarea
                      id="registrationNotes"
                      placeholder="Any additional notes about registration..."
                      value={formData.registrationNotes}
                      onChange={(e) => handleInputChange("registrationNotes", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={!isFormValid()}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register Patient
                    </Button>
                    <Button type="button" variant="outline" className="w-full" asChild>
                      <Link href="/receptionist/patients">
                        Cancel
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-none shadow-md bg-amber-50 dark:bg-amber-900/20">
                <CardHeader>
                  <CardTitle className="text-amber-800 dark:text-amber-200 text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Fields marked with * are required
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Verify patient ID before registration
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Check insurance eligibility
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      Collect patient signature on forms
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              Patient Registered Successfully
            </DialogTitle>
            <DialogDescription>
              The patient has been registered in the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
              <p className="text-sm text-muted-foreground">Patient ID</p>
              <p className="text-2xl font-bold text-green-600">{generatedPatientId}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Activity className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                <p className="font-medium">Book Appointment</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <FileText className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                <p className="font-medium">Print ID Card</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full sm:w-auto"
            >
              Register Another
            </Button>
            <Button 
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={`/receptionist/appointments/book?patient=${generatedPatientId}`}>
                Book Appointment
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
