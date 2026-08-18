"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FlaskConical,
  User,
  Search,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const patients = [
  { id: "P-001", name: "John Smith", age: 38, gender: "Male", lastVisit: "2024-01-15" },
  { id: "P-002", name: "Emily Davis", age: 29, gender: "Female", lastVisit: "2024-01-18" },
  { id: "P-003", name: "Robert Wilson", age: 55, gender: "Male", lastVisit: "2024-01-10" },
  { id: "P-004", name: "Sarah Miller", age: 42, gender: "Female", lastVisit: "2024-01-20" },
  { id: "P-005", name: "David Johnson", age: 61, gender: "Male", lastVisit: "2024-01-12" },
]

const testCategories: Record<string, string[]> = {
  "Cardiac": ["Cardiac Enzyme Panel", "BNP / NT-proBNP", "Troponin I & T", "Lipid Profile", "CRP (Cardiac)"],
  "Hematology": ["Complete Blood Count (CBC)", "ESR", "Peripheral Blood Smear", "Coagulation Profile (PT/APTT)", "Blood Group & Cross-match"],
  "Biochemistry": ["Liver Function Test (LFT)", "Kidney Function Test (KFT)", "HbA1c", "Fasting Blood Glucose", "Thyroid Profile (T3/T4/TSH)"],
  "Microbiology": ["Blood Culture & Sensitivity", "Urine Culture", "Sputum Culture", "Wound Swab Culture", "Stool Culture"],
  "Imaging": ["Chest X-Ray", "ECG (12-lead)", "Echocardiogram", "Ultrasound Abdomen", "CT Scan (Plain)"],
}

const priorityConfig: Record<string, { label: string; color: string; desc: string }> = {
  ROUTINE: { label: "Routine", color: "bg-blue-100 text-blue-700", desc: "Results expected within 24–48 hours" },
  URGENT: { label: "Urgent", color: "bg-amber-100 text-amber-700", desc: "Results expected within 4–6 hours" },
  STAT: { label: "STAT", color: "bg-red-100 text-red-700", desc: "Immediate processing — critical patient" },
}

export default function CreateLabRequestPage() {
  const { toast } = useToast()
  const router = useRouter()

  const [patientSearch, setPatientSearch] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [priority, setPriority] = useState("ROUTINE")
  const [clinicalNotes, setClinicalNotes] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(patientSearch.toLowerCase())
  )

  const toggleTest = (test: string) => {
    setSelectedTests(prev =>
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    )
  }

  const handleSubmit = () => {
    if (!selectedPatient) {
      toast({ title: "Select a patient", variant: "destructive" })
      return
    }
    if (selectedTests.length === 0) {
      toast({ title: "Select at least one test", variant: "destructive" })
      return
    }
    toast({
      title: "Lab request submitted",
      description: `${selectedTests.length} test(s) requested for ${selectedPatient.name}`,
    })
    router.push("/doctor/lab-requests")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/doctor/lab-requests">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">New Lab Request</h1>
            <p className="text-muted-foreground">Request laboratory tests for a patient</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Step 1 — Patient Selection */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <span>Step 1 — Select Patient</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPatient ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {selectedPatient.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedPatient.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedPatient.id} · {selectedPatient.gender}, {selectedPatient.age} yrs · Last visit: {selectedPatient.lastVisit}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPatient(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patient by name or ID..."
                      className="pl-9"
                      value={patientSearch}
                      onChange={e => setPatientSearch(e.target.value)}
                    />
                  </div>
                  {patientSearch && (
                    <div className="border rounded-xl overflow-hidden">
                      {filteredPatients.length > 0 ? filteredPatients.map((p) => (
                        <button
                          key={p.id}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 text-left border-b last:border-0 transition-colors"
                          onClick={() => { setSelectedPatient(p); setPatientSearch("") }}
                        >
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary shrink-0">
                            {p.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.id} · {p.gender}, {p.age} yrs</p>
                          </div>
                        </button>
                      )) : (
                        <p className="p-4 text-sm text-muted-foreground text-center">No patients found</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Step 2 — Test Selection */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <span>Step 2 — Select Tests</span>
                {selectedTests.length > 0 && (
                  <Badge className="ml-auto bg-primary text-white">{selectedTests.length} selected</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Test Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(testCategories).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Available Tests — {selectedCategory}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {testCategories[selectedCategory].map(test => {
                      const isSelected = selectedTests.includes(test)
                      return (
                        <button
                          key={test}
                          onClick={() => toggleTest(test)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-sm text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                            {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          {test}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {selectedTests.length > 0 && (
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Selected Tests:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTests.map(test => (
                      <Badge key={test} variant="secondary" className="text-xs gap-1">
                        {test}
                        <button onClick={() => toggleTest(test)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3 — Clinical Notes */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Step 3 — Clinical Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Clinical Notes <span className="text-destructive">*</span></Label>
                <Textarea
                  placeholder="Describe symptoms, reason for test, relevant history..."
                  rows={4}
                  value={clinicalNotes}
                  onChange={e => setClinicalNotes(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Special Instructions</Label>
                <Textarea
                  placeholder="Fasting required, specific timing, sample type, etc..."
                  rows={2}
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Priority */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(priorityConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setPriority(key)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    priority === key ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge className={`${cfg.color} text-xs`}>{cfg.label}</Badge>
                    {priority === key && <CheckCircle2 className="h-3.5 w-3.5 text-primary ml-auto" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{cfg.desc}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Request Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Patient</span>
                <span className="font-medium">{selectedPatient?.name ?? "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tests</span>
                <span className="font-medium">{selectedTests.length} selected</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority</span>
                <Badge className={`${priorityConfig[priority].color} text-xs`}>{priorityConfig[priority].label}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Turnaround</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {priority === "STAT" ? "< 1 hour" : priority === "URGENT" ? "4–6 hours" : "24–48 hours"}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!selectedPatient || selectedTests.length === 0}
            >
              <Plus className="mr-2 h-4 w-4" />Submit Lab Request
            </Button>
            <Link href="/doctor/lab-requests">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
