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
import {
  AlertCircle,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  User,
  Calendar,
  FlaskConical,
  ArrowLeft,
  Download,
  Trash2,
  Plus,
  Save,
  Send,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const pendingTests = [
  { id: "LAB-2024-011", patient: "Michael Johnson", patientId: "P-12360", testType: "Complete Blood Count", priority: "ROUTINE", orderedAt: "2024-01-15 09:00" },
  { id: "LAB-2024-012", patient: "Sarah Williams", patientId: "P-12361", testType: "Lipid Panel", priority: "URGENT", orderedAt: "2024-01-15 09:30" },
  { id: "LAB-2024-013", patient: "David Brown", patientId: "P-12362", testType: "Thyroid Function", priority: "STAT", orderedAt: "2024-01-15 10:00" },
  { id: "LAB-2024-014", patient: "Jennifer Lee", patientId: "P-12363", testType: "Blood Glucose", priority: "ROUTINE", orderedAt: "2024-01-15 10:15" },
  { id: "LAB-2024-015", patient: "Robert Taylor", patientId: "P-12364", testType: "Liver Panel", priority: "URGENT", orderedAt: "2024-01-15 10:45" },
]

const testTypes = [
  { name: "Complete Blood Count (CBC)", fields: ["WBC", "RBC", "Hemoglobin", "Hematocrit", "MCV", "MCH", "MCHC", "Platelets"] },
  { name: "Blood Glucose", fields: ["Glucose (Fasting)", "Glucose (Random)", "HbA1c"] },
  { name: "Lipid Panel", fields: ["Total Cholesterol", "Triglycerides", "HDL", "LDL", "VLDL"] },
  { name: "Liver Panel", fields: ["ALT", "AST", "Alkaline Phosphatase", "Bilirubin (Total)", "Albumin", "Total Protein"] },
  { name: "Thyroid Function", fields: ["TSH", "T3", "T4", "Free T3", "Free T4"] },
  { name: "Metabolic Panel", fields: ["Sodium", "Potassium", "Chloride", "CO2", "BUN", "Creatinine", "Glucose", "Calcium"] },
  { name: "Urinalysis", fields: ["pH", "Specific Gravity", "Protein", "Glucose", "Ketones", "Blood", "Leukocytes"] },
  { name: "Cardiac Panel", fields: ["Troponin I", "CK-MB", "BNP", "Myoglobin"] },
]

const normalRanges: Record<string, { range: string; unit: string; critical?: { low: number; high: number } }> = {
  "WBC": { range: "4.5-11.0", unit: "x10^9/L", critical: { low: 2.0, high: 30.0 } },
  "RBC": { range: "4.5-5.5", unit: "x10^12/L" },
  "Hemoglobin": { range: "13.5-17.5", unit: "g/dL", critical: { low: 7.0, high: 20.0 } },
  "Hematocrit": { range: "38-50", unit: "%" },
  "MCV": { range: "80-100", unit: "fL" },
  "MCH": { range: "27-33", unit: "pg" },
  "MCHC": { range: "32-36", unit: "g/dL" },
  "Platelets": { range: "150-400", unit: "x10^9/L", critical: { low: 50, high: 1000 } },
  "Glucose (Fasting)": { range: "70-100", unit: "mg/dL", critical: { low: 50, high: 400 } },
  "Glucose (Random)": { range: "<140", unit: "mg/dL" },
  "HbA1c": { range: "<5.7", unit: "%" },
  "Total Cholesterol": { range: "<200", unit: "mg/dL" },
  "Triglycerides": { range: "<150", unit: "mg/dL" },
  "HDL": { range: "40-60", unit: "mg/dL" },
  "LDL": { range: "<100", unit: "mg/dL" },
  "VLDL": { range: "<30", unit: "mg/dL" },
  "TSH": { range: "0.4-4.0", unit: "mIU/L", critical: { low: 0.1, high: 50 } },
  "T3": { range: "80-200", unit: "ng/dL" },
  "T4": { range: "5.0-12.0", unit: "ug/dL" },
  "Free T3": { range: "2.3-4.2", unit: "pg/mL" },
  "Free T4": { range: "0.8-1.8", unit: "ng/dL" },
}

interface TestValue {
  field: string
  value: string
  unit: string
  normalRange: string
  flag: string
}

export default function UploadLabResultsPage() {
  const [selectedTest, setSelectedTest] = useState<string>("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [testValues, setTestValues] = useState<TestValue[]>([])
  const [notes, setNotes] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleTestSelect = (testName: string) => {
    setSelectedTest(testName)
    const test = testTypes.find(t => t.name === testName)
    if (test) {
      const values: TestValue[] = test.fields.map(field => ({
        field,
        value: "",
        unit: normalRanges[field]?.unit || "",
        normalRange: normalRanges[field]?.range || "",
        flag: ""
      }))
      setTestValues(values)
    }
  }

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...testValues]
    newValues[index].value = value
    
    // Determine flag based on normal range
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && normalRanges[newValues[index].field]) {
      const range = normalRanges[newValues[index].field]
      const rangeParts = range.range.split("-")
      
      if (rangeParts.length === 2) {
        const low = parseFloat(rangeParts[0].replace(/[<>=]/g, ""))
        const high = parseFloat(rangeParts[1])
        
        if (numValue < low) {
          newValues[index].flag = "LOW"
        } else if (numValue > high) {
          newValues[index].flag = "HIGH"
        } else {
          newValues[index].flag = "NORMAL"
        }
      }
    }
    
    setTestValues(newValues)
  }

  const handleFileUpload = () => {
    // Simulate file upload
    const fileName = `result_${Date.now()}.pdf`
    setUploadedFiles([...uploadedFiles, fileName])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "STAT":
        return <Badge variant="destructive">STAT</Badge>
      case "URGENT":
        return <Badge className="bg-amber-500">Urgent</Badge>
      case "ROUTINE":
        return <Badge variant="secondary">Routine</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getFlagBadge = (flag: string) => {
    switch (flag) {
      case "HIGH":
        return <Badge className="bg-red-500 text-xs">High</Badge>
      case "LOW":
        return <Badge className="bg-blue-500 text-xs">Low</Badge>
      case "CRITICAL":
        return <Badge variant="destructive" className="text-xs">Critical</Badge>
      case "NORMAL":
        return <Badge variant="outline" className="text-green-600 border-green-500 text-xs">Normal</Badge>
      default:
        return null
    }
  }

  const selectedPatientData = pendingTests.find(t => t.id === selectedPatient)

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/lab/results">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Upload Lab Results</h1>
              <p className="text-muted-foreground">
                Enter and submit laboratory test results
              </p>
            </div>
          </div>
        </div>

        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Lab results have been submitted successfully and sent for review.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pending Tests */}
          <Card className="lg:col-span-1 border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-rose-600" />
                Pending Tests
              </CardTitle>
              <CardDescription>
                Select a test to enter results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {pendingTests.map((test) => (
                  <div
                    key={test.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary ${
                      selectedPatient === test.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedPatient(test.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-rose-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{test.patient}</p>
                          <p className="text-xs text-muted-foreground">{test.patientId}</p>
                        </div>
                      </div>
                      {getPriorityBadge(test.priority)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FlaskConical className="h-3 w-3" />
                      <span>{test.testType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{test.orderedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Results Form */}
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-rose-600" />
                Enter Results
              </CardTitle>
              <CardDescription>
                Fill in the test results for the selected patient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedPatient ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a pending test from the list to enter results</p>
                </div>
              ) : (
                <>
                  {/* Patient Info */}
                  {selectedPatientData && (
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{selectedPatientData.patient}</p>
                            <p className="text-xs text-muted-foreground">{selectedPatientData.patientId}</p>
                          </div>
                        </div>
                        <div className="h-8 w-px bg-border hidden sm:block" />
                        <div className="flex items-center gap-2">
                          <FlaskConical className="h-5 w-5 text-muted-foreground" />
                          <p className="text-sm">{selectedPatientData.testType}</p>
                        </div>
                        <div className="ml-auto">
                          {getPriorityBadge(selectedPatientData.priority)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Test Type Selection */}
                  <div className="space-y-2">
                    <Label>Test Type</Label>
                    <Select value={selectedTest} onValueChange={handleTestSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        {testTypes.map((test) => (
                          <SelectItem key={test.name} value={test.name}>
                            {test.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Test Values */}
                  {selectedTest && testValues.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Test Values</Label>
                        <Alert className="w-fit p-2 bg-muted border-0">
                          <Info className="h-4 w-4" />
                          <AlertDescription className="text-xs ml-2">
                            Values outside normal range will be flagged automatically
                          </AlertDescription>
                        </Alert>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead>Test</TableHead>
                              <TableHead>Result</TableHead>
                              <TableHead className="hidden md:table-cell">Unit</TableHead>
                              <TableHead className="hidden lg:table-cell">Normal Range</TableHead>
                              <TableHead>Flag</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testValues.map((value, index) => (
                              <TableRow key={value.field}>
                                <TableCell className="font-medium">{value.field}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter value"
                                    value={value.value}
                                    onChange={(e) => handleValueChange(index, e.target.value)}
                                    className="w-28"
                                  />
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">
                                  {value.unit}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell text-muted-foreground">
                                  {value.normalRange}
                                </TableCell>
                                <TableCell>
                                  {getFlagBadge(value.flag)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="space-y-4">
                    <Label>Supporting Documents</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports PDF, JPG, PNG (Max 10MB)
                      </p>
                      <Button variant="outline" onClick={handleFileUpload}>
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                      </Button>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm">{file}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleRemoveFile(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Notes / Comments</Label>
                    <Textarea
                      placeholder="Enter any additional notes, observations, or comments about the test results..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Critical Values Alert */}
                  {testValues.some(v => v.flag === "HIGH" || v.flag === "LOW") && (
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Abnormal Values Detected</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Some values are outside the normal range. Please verify results before submitting.
                        Critical values will require immediate physician notification.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={handleSubmit}>
                      <Send className="mr-2 h-4 w-4" />
                      Submit for Review
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Reference */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Critical Value Reference</CardTitle>
            <CardDescription>
              Values that require immediate physician notification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="font-medium text-sm text-red-800">Glucose</p>
                <p className="text-xs text-red-600">&lt;50 or &gt;400 mg/dL</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="font-medium text-sm text-red-800">Hemoglobin</p>
                <p className="text-xs text-red-600">&lt;7.0 or &gt;20.0 g/dL</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="font-medium text-sm text-red-800">Platelets</p>
                <p className="text-xs text-red-600">&lt;50 or &gt;1000 x10^9/L</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="font-medium text-sm text-red-800">TSH</p>
                <p className="text-xs text-red-600">&lt;0.1 or &gt;50 mIU/L</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
