"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  Clock,
  UserRound,
  Save,
  History,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { useState } from "react"

const patients = [
  { id: "P001", name: "Emma Johnson", room: "101-A" },
  { id: "P002", name: "Michael Chen", room: "102-B" },
  { id: "P003", name: "Sarah Williams", room: "103-C" },
  { id: "P004", name: "Robert Davis", room: "104-A" },
  { id: "P005", name: "Lisa Thompson", room: "105-B" },
]

const recentVitals = [
  {
    id: 1,
    patient: "Emma Johnson",
    room: "101-A",
    temp: "98.6°F",
    bp: "120/80",
    pulse: "72",
    respRate: "16",
    o2Sat: "98%",
    weight: "65 kg",
    notes: "Patient feeling well, no complaints",
    recordedBy: "Nurse Sarah",
    time: "10:30 AM",
    status: "Normal",
  },
  {
    id: 2,
    patient: "Michael Chen",
    room: "102-B",
    temp: "99.2°F",
    bp: "140/90",
    pulse: "88",
    respRate: "18",
    o2Sat: "95%",
    weight: "78 kg",
    notes: "Elevated BP, monitoring continues",
    recordedBy: "Nurse Sarah",
    time: "10:15 AM",
    status: "Attention",
  },
  {
    id: 3,
    patient: "Robert Davis",
    room: "104-A",
    temp: "100.1°F",
    bp: "150/95",
    pulse: "102",
    respRate: "22",
    o2Sat: "92%",
    weight: "82 kg",
    notes: "Critical readings, doctor notified",
    recordedBy: "Nurse Sarah",
    time: "10:00 AM",
    status: "Critical",
  },
  {
    id: 4,
    patient: "Sarah Williams",
    room: "103-C",
    temp: "98.4°F",
    bp: "118/78",
    pulse: "76",
    respRate: "14",
    o2Sat: "99%",
    weight: "58 kg",
    notes: "All vitals stable",
    recordedBy: "Nurse Sarah",
    time: "09:45 AM",
    status: "Normal",
  },
]

const vitalRanges = {
  temperature: { min: 97, max: 99, criticalLow: 95, criticalHigh: 101 },
  systolic: { min: 90, max: 120, criticalLow: 80, criticalHigh: 140 },
  diastolic: { min: 60, max: 80, criticalLow: 50, criticalHigh: 90 },
  pulse: { min: 60, max: 100, criticalLow: 40, criticalHigh: 120 },
  respiratoryRate: { min: 12, max: 20, criticalLow: 8, criticalHigh: 24 },
  oxygenSaturation: { min: 95, max: 100, criticalLow: 90, criticalHigh: 100 },
}

export default function NurseVitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [formData, setFormData] = useState({
    temperature: "",
    systolic: "",
    diastolic: "",
    pulse: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
    notes: "",
  })

  const getVitalStatus = (type: string, value: number) => {
    const range = vitalRanges[type as keyof typeof vitalRanges]
    if (!range) return "normal"
    if (value < range.criticalLow || value > range.criticalHigh) return "critical"
    if (value < range.min || value > range.max) return "attention"
    return "normal"
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - would typically call API
    console.log("Submitting vitals:", { patient: selectedPatient, ...formData })
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vitals Recording</h1>
            <p className="text-muted-foreground">
              Record and track patient vital signs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground">Normal Readings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">Needs Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-xs text-muted-foreground">Pending Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="record" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="record">
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Vitals
            </TabsTrigger>
            <TabsTrigger value="recent">
              <History className="mr-2 h-4 w-4" />
              Recent Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="record">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Record New Vitals
                </CardTitle>
                <CardDescription>
                  Enter patient vital signs and observations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Patient Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Select Patient *</Label>
                      <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                        <SelectTrigger id="patient">
                          <SelectValue placeholder="Choose a patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} - Room {patient.room}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      {selectedPatient && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <UserRound className="h-4 w-4" />
                          <span>Patient ID: {selectedPatient}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vital Signs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Temperature */}
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        Temperature (°F)
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="98.6"
                        value={formData.temperature}
                        onChange={(e) => handleInputChange("temperature", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Normal: 97-99°F</p>
                    </div>

                    {/* Blood Pressure */}
                    <div className="space-y-2">
                      <Label htmlFor="bp" className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        Blood Pressure (mmHg)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Systolic"
                          value={formData.systolic}
                          onChange={(e) => handleInputChange("systolic", e.target.value)}
                          className="flex-1"
                        />
                        <span className="flex items-center text-muted-foreground">/</span>
                        <Input
                          type="number"
                          placeholder="Diastolic"
                          value={formData.diastolic}
                          onChange={(e) => handleInputChange("diastolic", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Normal: 90-120 / 60-80 mmHg</p>
                    </div>

                    {/* Pulse Rate */}
                    <div className="space-y-2">
                      <Label htmlFor="pulse" className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-red-500" />
                        Pulse Rate (bpm)
                      </Label>
                      <Input
                        id="pulse"
                        type="number"
                        placeholder="72"
                        value={formData.pulse}
                        onChange={(e) => handleInputChange("pulse", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Normal: 60-100 bpm</p>
                    </div>

                    {/* Respiratory Rate */}
                    <div className="space-y-2">
                      <Label htmlFor="respiratoryRate" className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        Respiratory Rate (/min)
                      </Label>
                      <Input
                        id="respiratoryRate"
                        type="number"
                        placeholder="16"
                        value={formData.respiratoryRate}
                        onChange={(e) => handleInputChange("respiratoryRate", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Normal: 12-20 /min</p>
                    </div>

                    {/* Oxygen Saturation */}
                    <div className="space-y-2">
                      <Label htmlFor="o2Sat" className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-cyan-500" />
                        O2 Saturation (%)
                      </Label>
                      <Input
                        id="o2Sat"
                        type="number"
                        placeholder="98"
                        value={formData.oxygenSaturation}
                        onChange={(e) => handleInputChange("oxygenSaturation", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Normal: 95-100%</p>
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-green-500" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="65"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any observations or notes..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button type="submit" className="flex-1 sm:flex-none" disabled={!selectedPatient}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Vitals
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 sm:flex-none">
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Recent Vital Records
                </CardTitle>
                <CardDescription>
                  Latest recorded vital signs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Temp</TableHead>
                        <TableHead>BP</TableHead>
                        <TableHead>Pulse</TableHead>
                        <TableHead>Resp</TableHead>
                        <TableHead>O2 Sat</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentVitals.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.patient}</TableCell>
                          <TableCell>{record.room}</TableCell>
                          <TableCell className={record.temp.includes("100") ? "text-red-500 font-medium" : ""}>
                            {record.temp}
                          </TableCell>
                          <TableCell className={
                            parseInt(record.bp.split("/")[0]) > 140 || parseInt(record.bp.split("/")[1]) > 90 
                              ? "text-red-500 font-medium" 
                              : ""
                          }>
                            {record.bp}
                          </TableCell>
                          <TableCell className={parseInt(record.pulse) > 100 ? "text-red-500 font-medium" : ""}>
                            {record.pulse}
                          </TableCell>
                          <TableCell>{record.respRate}</TableCell>
                          <TableCell className={parseInt(record.o2Sat) < 95 ? "text-red-500 font-medium" : ""}>
                            {record.o2Sat}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{record.time}</TableCell>
                          <TableCell>
                            <Badge variant={
                              record.status === "Critical" ? "destructive" :
                              record.status === "Attention" ? "secondary" :
                              "outline"
                            }>
                              {record.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Vital Signs Reference */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Vital Signs Reference Guide</CardTitle>
            <CardDescription>Normal ranges for adult patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Thermometer className="h-5 w-5 mx-auto mb-2 text-red-500" />
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold">97-99°F</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Heart className="h-5 w-5 mx-auto mb-2 text-pink-500" />
                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                <p className="font-semibold">90-120/60-80</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Activity className="h-5 w-5 mx-auto mb-2 text-red-500" />
                <p className="text-xs text-muted-foreground">Heart Rate</p>
                <p className="font-semibold">60-100 bpm</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Activity className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                <p className="text-xs text-muted-foreground">Resp. Rate</p>
                <p className="font-semibold">12-20/min</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Droplets className="h-5 w-5 mx-auto mb-2 text-cyan-500" />
                <p className="text-xs text-muted-foreground">O2 Saturation</p>
                <p className="font-semibold">95-100%</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <UserRound className="h-5 w-5 mx-auto mb-2 text-green-500" />
                <p className="text-xs text-muted-foreground">BMI Range</p>
                <p className="font-semibold">18.5-24.9</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
