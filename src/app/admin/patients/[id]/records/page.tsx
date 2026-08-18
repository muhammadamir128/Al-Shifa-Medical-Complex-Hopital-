"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  Search,
  Eye,
  Download,
  Filter,
  FileText,
  ClipboardList,
  Activity,
  FlaskConical,
  Syringe
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock medical records data
const medicalRecords = [
  { id: "MR001", date: "2024-01-10", doctor: "Dr. Michael Brown", department: "General Medicine", type: "Consultation", diagnosis: "Hypertension management", treatment: "Continue current medication, lifestyle modifications", notes: "Blood pressure well controlled. Patient advised on diet and exercise." },
  { id: "MR002", date: "2023-12-15", doctor: "Dr. Lisa Chen", department: "Cardiology", type: "Check-up", diagnosis: "Type 2 Diabetes - Stable", treatment: "Metformin 500mg twice daily", notes: "HbA1c levels improved. Continue monitoring." },
  { id: "MR003", date: "2023-06-20", doctor: "Dr. Sarah Wilson", department: "Cardiology", type: "Lab Review", diagnosis: "Blood work analysis", treatment: "No changes required", notes: "All values within normal limits. Follow-up in 6 months." },
  { id: "MR004", date: "2023-03-10", doctor: "Dr. James Wilson", department: "General Medicine", type: "Consultation", diagnosis: "Upper Respiratory Infection", treatment: "Antibiotics course completed", notes: "Symptoms resolved. No further treatment needed." },
  { id: "MR005", date: "2022-11-25", doctor: "Dr. Emma Thompson", department: "Orthopedics", type: "Consultation", diagnosis: "Lower Back Pain", treatment: "Physical therapy prescribed", notes: "Patient showed improvement after PT sessions." },
]

const labResults = [
  { id: "LR001", date: "2024-01-08", test: "Complete Blood Count", status: "NORMAL", technician: "Lab Tech Robert", notes: "All values within normal range" },
  { id: "LR002", date: "2024-01-08", test: "Lipid Panel", status: "ABNORMAL", technician: "Lab Tech Sarah", notes: "Cholesterol slightly elevated" },
  { id: "LR003", date: "2023-12-10", test: "HbA1c", status: "NORMAL", technician: "Lab Tech Robert", notes: "6.5% - Good control" },
  { id: "LR004", date: "2023-06-15", test: "Kidney Function Test", status: "NORMAL", technician: "Lab Tech Lisa", notes: "All values normal" },
  { id: "LR005", date: "2023-06-15", test: "Liver Function Test", status: "NORMAL", technician: "Lab Tech Lisa", notes: "All values normal" },
]

const immunizations = [
  { id: "IM001", date: "2023-09-15", vaccine: "COVID-19 Booster", dose: "1st Booster", administeredBy: "Nurse Emily Davis", nextDue: "2024-09-15" },
  { id: "IM002", date: "2023-03-20", vaccine: "Influenza", dose: "Annual", administeredBy: "Nurse Robert Johnson", nextDue: "2024-03-20" },
  { id: "IM003", date: "2022-11-10", vaccine: "Tetanus", dose: "Booster", administeredBy: "Nurse Emily Davis", nextDue: "2032-11-10" },
  { id: "IM004", date: "2021-06-15", vaccine: "Hepatitis B", dose: "Complete Series", administeredBy: "Nurse Sarah Miller", nextDue: "N/A" },
]

const surgeries = [
  { id: "SG001", date: "2020-05-12", procedure: "Appendectomy", surgeon: "Dr. Michael Brown", hospital: "Al-Shifa Medical Complex", notes: "Successful laparoscopic surgery" },
  { id: "SG002", date: "2018-08-20", procedure: "Knee Arthroscopy", surgeon: "Dr. James Wilson", hospital: "Sports Medicine Center", notes: "Minor meniscus repair" },
]

export default function PatientRecordsPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<typeof medicalRecords[0] | null>(null)

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/admin/patients/${params.id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
              <p className="text-muted-foreground">
                Complete medical history for Patient #{params.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>
        </div>

        <Tabs defaultValue="consultations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="immunizations" className="flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              Immunizations
            </TabsTrigger>
            <TabsTrigger value="surgeries" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Surgeries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{record.doctor}</p>
                            <p className="text-xs text-muted-foreground">{record.department}</p>
                          </div>
                        </TableCell>
                        <TableCell>{record.diagnosis}</TableCell>
                        <TableCell>
                          <Badge variant="default">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(record)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Medical Record Details</DialogTitle>
                                <DialogDescription>
                                  Record ID: {record.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="font-medium">{record.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Type</p>
                                    <p className="font-medium">{record.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Doctor</p>
                                    <p className="font-medium">{record.doctor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <p className="font-medium">{record.department}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Diagnosis</p>
                                  <p className="font-medium">{record.diagnosis}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Treatment</p>
                                  <p className="font-medium">{record.treatment}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Notes</p>
                                  <p className="font-medium">{record.notes}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab-results">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Laboratory Results</CardTitle>
                <CardDescription>View all lab test results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.date}</TableCell>
                        <TableCell>{result.test}</TableCell>
                        <TableCell>
                          <Badge variant={result.status === "NORMAL" ? "default" : "destructive"}>
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{result.technician}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{result.notes}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="immunizations">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Immunization Records</CardTitle>
                <CardDescription>Vaccination history and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Vaccine</TableHead>
                      <TableHead>Dose</TableHead>
                      <TableHead>Administered By</TableHead>
                      <TableHead>Next Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {immunizations.map((imm) => (
                      <TableRow key={imm.id}>
                        <TableCell className="font-medium">{imm.date}</TableCell>
                        <TableCell>{imm.vaccine}</TableCell>
                        <TableCell>{imm.dose}</TableCell>
                        <TableCell>{imm.administeredBy}</TableCell>
                        <TableCell>{imm.nextDue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surgeries">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Surgical History</CardTitle>
                <CardDescription>Past surgeries and procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Procedure</TableHead>
                      <TableHead>Surgeon</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surgeries.map((surgery) => (
                      <TableRow key={surgery.id}>
                        <TableCell className="font-medium">{surgery.date}</TableCell>
                        <TableCell>{surgery.procedure}</TableCell>
                        <TableCell>{surgery.surgeon}</TableCell>
                        <TableCell>{surgery.hospital}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{surgery.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
