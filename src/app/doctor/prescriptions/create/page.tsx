"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Pill,
  User,
  AlertCircle,
  Save,
  Printer,
  Stethoscope,
  Clock,
  Droplets,
  CheckCircle2,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock patient data for search
const patients = [
  { id: "PAT001", name: "John Smith", age: 45, gender: "Male", bloodGroup: "O+", allergies: ["Penicillin"], avatar: "JS" },
  { id: "PAT002", name: "Emily Davis", age: 32, gender: "Female", bloodGroup: "A+", allergies: [], avatar: "ED" },
  { id: "PAT003", name: "Robert Johnson", age: 58, gender: "Male", bloodGroup: "B+", allergies: ["Sulfa drugs"], avatar: "RJ" },
  { id: "PAT004", name: "Sarah Miller", age: 28, gender: "Female", bloodGroup: "AB+", allergies: ["Dust", "Pollen"], avatar: "SM" },
  { id: "PAT005", name: "Michael Lee", age: 42, gender: "Male", bloodGroup: "O-", allergies: [], avatar: "ML" },
]

// Mock medication database
const medications = [
  { id: 1, name: "Lisinopril", strength: "10mg", form: "Tablet", category: "Antihypertensive" },
  { id: 2, name: "Metoprolol", strength: "50mg", form: "Tablet", category: "Beta Blocker" },
  { id: 3, name: "Metformin", strength: "500mg", form: "Tablet", category: "Antidiabetic" },
  { id: 4, name: "Atorvastatin", strength: "20mg", form: "Tablet", category: "Statin" },
  { id: 5, name: "Amoxicillin", strength: "500mg", form: "Capsule", category: "Antibiotic" },
  { id: 6, name: "Ibuprofen", strength: "400mg", form: "Tablet", category: "NSAID" },
  { id: 7, name: "Omeprazole", strength: "20mg", form: "Capsule", category: "Proton Pump Inhibitor" },
  { id: 8, name: "Albuterol", strength: "90mcg", form: "Inhaler", category: "Bronchodilator" },
  { id: 9, name: "Prednisone", strength: "10mg", form: "Tablet", category: "Corticosteroid" },
  { id: 10, name: "Losartan", strength: "50mg", form: "Tablet", category: "Antihypertensive" },
]

const frequencyOptions = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "four_times_daily", label: "Four times daily" },
  { value: "every_4_hours", label: "Every 4 hours" },
  { value: "every_6_hours", label: "Every 6 hours" },
  { value: "every_8_hours", label: "Every 8 hours" },
  { value: "as_needed", label: "As needed (PRN)" },
  { value: "weekly", label: "Once weekly" },
]

const durationOptions = [
  { value: "3_days", label: "3 days" },
  { value: "5_days", label: "5 days" },
  { value: "7_days", label: "7 days" },
  { value: "10_days", label: "10 days" },
  { value: "14_days", label: "14 days" },
  { value: "30_days", label: "30 days" },
  { value: "90_days", label: "90 days" },
  { value: "ongoing", label: "Ongoing" },
]

const mealOptions = [
  { value: "before_meal", label: "Before meals" },
  { value: "after_meal", label: "After meals" },
  { value: "with_meal", label: "With meals" },
  { value: "empty_stomach", label: "Empty stomach" },
  { value: "anytime", label: "Anytime" },
]

interface MedicationItem {
  id: string
  medicationId: number
  name: string
  strength: string
  form: string
  dosage: string
  frequency: string
  duration: string
  mealTiming: string
  quantity: number
  refills: number
  instructions: string
}

export default function CreatePrescriptionPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)
  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  const [medications_list, setMedicationsList] = useState<MedicationItem[]>([])

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addMedication = () => {
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      medicationId: 0,
      name: "",
      strength: "",
      form: "",
      dosage: "",
      frequency: "once_daily",
      duration: "7_days",
      mealTiming: "anytime",
      quantity: 30,
      refills: 0,
      instructions: "",
    }
    setMedicationsList([...medications_list, newMed])
  }

  const removeMedication = (id: string) => {
    setMedicationsList(medications_list.filter(m => m.id !== id))
  }

  const updateMedication = (id: string, field: keyof MedicationItem, value: string | number) => {
    setMedicationsList(medications_list.map(m => {
      if (m.id === id) {
        const updated = { ...m, [field]: value }
        // Auto-fill when medication is selected
        if (field === "medicationId") {
          const med = medications.find(med => med.id === Number(value))
          if (med) {
            updated.name = med.name
            updated.strength = med.strength
            updated.form = med.form
          }
        }
        return updated
      }
      return m
    }))
  }

  const handleSave = () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Please select a patient",
        variant: "destructive",
      })
      return
    }
    if (medications_list.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one medication",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Prescription saved successfully",
    })
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/doctor/prescriptions">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">New Prescription</h1>
              <p className="text-muted-foreground">Create a new prescription for your patient</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Prescription
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Selection */}
          <div className="space-y-6">
            {/* Patient Search */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-5 w-5 text-primary" />
                  Select Patient
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name or ID..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      if (selectedPatient) setSelectedPatient(null)
                    }}
                  />
                </div>

                {searchQuery && !selectedPatient && (
                  <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <button
                        key={patient.id}
                        className="w-full p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                        onClick={() => {
                          setSelectedPatient(patient)
                          setSearchQuery("")
                        }}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.id} • {patient.age} yrs • {patient.gender}
                          </p>
                        </div>
                        <Badge variant="outline" className="font-mono">{patient.bloodGroup}</Badge>
                      </button>
                    ))}
                  </div>
                )}

                {selectedPatient && (
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {selectedPatient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{selectedPatient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedPatient.id} • {selectedPatient.age} yrs • {selectedPatient.gender}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPatient(null)}
                      >
                        Change
                      </Button>
                    </div>

                    {selectedPatient.allergies.length > 0 && (
                      <div className="mt-3 p-2 rounded bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">Allergies:</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map((allergy, i) => (
                            <Badge key={i} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Diagnosis & Notes */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Clinical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    placeholder="Enter diagnosis or reason for prescription..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional notes or instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prescription Info */}
            <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Info className="h-5 w-5 text-primary" />
                      Prescription Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Check patient allergies before prescribing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Verify drug interactions with current medications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Include clear dosing instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Specify duration of treatment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
          </div>

          {/* Right Column - Medications */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Pill className="h-5 w-5 text-primary" />
                    Medications
                  </CardTitle>
                  <CardDescription>Add medications to this prescription</CardDescription>
                </div>
                <Button onClick={addMedication}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
              </CardHeader>
              <CardContent>
                {medications_list.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No medications added yet</p>
                    <p className="text-sm">Click &quot;Add Medication&quot; to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {medications_list.map((med, index) => (
                      <Card key={med.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Medication #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMedication(med.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Medication</Label>
                              <Select
                                value={med.medicationId ? String(med.medicationId) : ""}
                                onValueChange={(v) => updateMedication(med.id, "medicationId", Number(v))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select medication" />
                                </SelectTrigger>
                                <SelectContent>
                                  {medications.map((m) => (
                                    <SelectItem key={m.id} value={String(m.id)}>
                                      {m.name} {m.strength} - {m.form}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Dosage</Label>
                              <Input
                                placeholder="e.g., 1 tablet"
                                value={med.dosage}
                                onChange={(e) => updateMedication(med.id, "dosage", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Select
                                value={med.frequency}
                                onValueChange={(v) => updateMedication(med.id, "frequency", v)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {frequencyOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <Select
                                value={med.duration}
                                onValueChange={(v) => updateMedication(med.id, "duration", v)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {durationOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Meal Timing</Label>
                              <Select
                                value={med.mealTiming}
                                onValueChange={(v) => updateMedication(med.id, "mealTiming", v)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {mealOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Quantity</Label>
                              <Input
                                type="number"
                                placeholder="30"
                                value={med.quantity}
                                onChange={(e) => updateMedication(med.id, "quantity", Number(e.target.value))}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Refills Allowed</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={med.refills}
                                onChange={(e) => updateMedication(med.id, "refills", Number(e.target.value))}
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-2">
                              <Label>Special Instructions</Label>
                              <Input
                                placeholder="e.g., Take with plenty of water"
                                value={med.instructions}
                                onChange={(e) => updateMedication(med.id, "instructions", e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            {selectedPatient && medications_list.length > 0 && (
              <Card className="border-none shadow-md bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Prescription Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-primary-foreground/70">Patient</p>
                      <p className="font-medium">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/70">Medications</p>
                      <p className="font-medium">{medications_list.length} item(s)</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/70">Date</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/70">Status</p>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
