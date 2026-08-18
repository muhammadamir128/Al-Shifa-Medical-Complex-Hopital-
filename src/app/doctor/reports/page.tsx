"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  BarChart3,
  Download,
  Calendar,
  Users,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  HeartPulse,
  Pill,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Star,
  CalendarDays,
  UserRound,
} from "lucide-react"
import { useState } from "react"

// Mock report data
const overviewStats = {
  totalPatients: 248,
  patientsChange: 12,
  consultations: 156,
  consultationsChange: 8,
  prescriptions: 342,
  prescriptionsChange: 15,
  avgRating: 4.8,
  ratingChange: 0.2,
}

const monthlyData = [
  { month: "Jul", patients: 42, consultations: 38 },
  { month: "Aug", patients: 45, consultations: 41 },
  { month: "Sep", patients: 48, consultations: 44 },
  { month: "Oct", patients: 52, consultations: 47 },
  { month: "Nov", patients: 55, consultations: 51 },
  { month: "Dec", patients: 58, consultations: 54 },
  { month: "Jan", patients: 62, consultations: 58 },
]

const diagnosisDistribution = [
  { condition: "Hypertension", count: 45, percentage: 18 },
  { condition: "Diabetes Type 2", count: 38, percentage: 15 },
  { condition: "Cardiac Arrhythmia", count: 32, percentage: 13 },
  { condition: "Hyperlipidemia", count: 28, percentage: 11 },
  { condition: "Coronary Artery Disease", count: 24, percentage: 10 },
  { condition: "Heart Failure", count: 18, percentage: 7 },
  { condition: "Other", count: 63, percentage: 26 },
]

const topMedications = [
  { name: "Lisinopril", prescriptions: 45, trend: "up" },
  { name: "Metformin", prescriptions: 38, trend: "up" },
  { name: "Atorvastatin", prescriptions: 35, trend: "stable" },
  { name: "Metoprolol", prescriptions: 32, trend: "up" },
  { name: "Aspirin", prescriptions: 28, trend: "down" },
]

const weeklySchedule = [
  { day: "Monday", hours: 8, consultations: 12 },
  { day: "Tuesday", hours: 8, consultations: 14 },
  { day: "Wednesday", hours: 6, consultations: 9 },
  { day: "Thursday", hours: 8, consultations: 11 },
  { day: "Friday", hours: 7, consultations: 10 },
]

const recentReviews = [
  { patient: "John S.", rating: 5, comment: "Excellent doctor! Very thorough and caring.", date: "Jan 18, 2024" },
  { patient: "Emily D.", rating: 5, comment: "Dr. Chen is wonderful. Takes time to explain everything.", date: "Jan 15, 2024" },
  { patient: "Robert J.", rating: 4, comment: "Professional and knowledgeable. Wait time was a bit long.", date: "Jan 10, 2024" },
  { patient: "Sarah M.", rating: 5, comment: "Best cardiologist I have ever had!", date: "Jan 8, 2024" },
]

const generatedReports = [
  { id: "RPT001", name: "Monthly Patient Summary - January 2024", date: "Jan 31, 2024", type: "Patient Report" },
  { id: "RPT002", name: "Prescription Analytics - Q4 2023", date: "Jan 5, 2024", type: "Prescription Report" },
  { id: "RPT003", name: "Consultation Statistics - December 2023", date: "Dec 31, 2023", type: "Consultation Report" },
  { id: "RPT004", name: "Patient Satisfaction Report - 2023", date: "Dec 28, 2023", type: "Feedback Report" },
]

export default function DoctorReportsPage() {
  const [period, setPeriod] = useState("this_month")

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              View your performance metrics and statistics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-3xl font-bold mt-1">{overviewStats.totalPatients}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{overviewStats.patientsChange}%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Consultations</p>
                  <p className="text-3xl font-bold mt-1">{overviewStats.consultations}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{overviewStats.consultationsChange}%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Prescriptions</p>
                  <p className="text-3xl font-bold mt-1">{overviewStats.prescriptions}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{overviewStats.prescriptionsChange}%</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                  <p className="text-3xl font-bold mt-1">{overviewStats.avgRating}/5.0</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{overviewStats.ratingChange}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600 fill-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reviews">Patient Reviews</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Monthly Patient Trend
                  </CardTitle>
                  <CardDescription>Patient consultations over the last 7 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex-1">
                          <Progress
                            value={(data.consultations / 60) * 100}
                            className="h-4"
                          />
                        </div>
                        <span className="w-10 text-sm font-medium">{data.consultations}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Diagnosis Distribution */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Diagnosis Distribution
                  </CardTitle>
                  <CardDescription>Most common diagnoses among your patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {diagnosisDistribution.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.condition}</span>
                            <span className="text-sm text-muted-foreground">{item.count}</span>
                          </div>
                          <Progress value={item.percentage * 4} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Schedule */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Weekly Workload
                  </CardTitle>
                  <CardDescription>Your consultation distribution by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklySchedule.map((day, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-24 text-sm">{day.day}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <Progress value={(day.consultations / 14) * 100} className="h-3" />
                          <span className="text-sm text-muted-foreground w-16">
                            {day.consultations} consults
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Wait Time</span>
                        <Badge variant="outline">12 min</Badge>
                      </div>
                      <Progress value={60} className="h-2 mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">Target: 15 min or less</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Appointment Completion Rate</span>
                        <Badge variant="outline" className="border-green-500 text-green-600">94%</Badge>
                      </div>
                      <Progress value={94} className="h-2 mt-2" />
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Follow-up Compliance</span>
                        <Badge variant="outline">87%</Badge>
                      </div>
                      <Progress value={87} className="h-2 mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patient Analytics Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">Patient Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Male</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">142</span>
                      <Badge variant="outline">57%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">Female</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">106</span>
                      <Badge variant="outline">43%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">Age Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { range: "18-30", count: 28, percent: 11 },
                    { range: "31-45", count: 52, percent: 21 },
                    { range: "46-60", count: 98, percent: 40 },
                    { range: "60+", count: 70, percent: 28 },
                  ].map((age, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-16 text-sm">{age.range}</span>
                      <Progress value={age.percent * 2.5} className="h-2 flex-1" />
                      <span className="text-sm text-muted-foreground">{age.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">Patient Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <span className="text-sm">Active Patients</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      198 (80%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <span className="text-sm">Needs Follow-up</span>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      32 (13%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <span className="text-sm">Critical Cases</span>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      8 (3%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/20">
                    <span className="text-sm">Inactive</span>
                    <Badge variant="secondary">10 (4%)</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diagnosis Table */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Diagnosis Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>Patient Count</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diagnosisDistribution.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.condition}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                        <TableCell>
                          {index < 3 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : index > 4 ? (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-primary" />
                    Top Prescribed Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topMedications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-muted-foreground">{index + 1}</span>
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-muted-foreground">{med.prescriptions} prescriptions</p>
                          </div>
                        </div>
                        <div>
                          {med.trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
                          {med.trend === "down" && <TrendingDown className="h-5 w-5 text-red-500" />}
                          {med.trend === "stable" && <Minus className="h-5 w-5 text-muted-foreground" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Prescription Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total This Month</span>
                      <span className="text-2xl font-bold">342</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Per Consultation</span>
                      <span className="text-2xl font-bold">2.2</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Dispensed Rate</span>
                      <span className="text-2xl font-bold">96%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Generic vs Brand</span>
                      <span className="text-2xl font-bold">78% / 22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patient Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Rating Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                    <span className="text-5xl font-bold">{overviewStats.avgRating}</span>
                    <span className="text-2xl text-muted-foreground">/5</span>
                  </div>
                  <p className="text-muted-foreground">Based on 89 reviews</p>
                  <div className="space-y-2 mt-6">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Progress
                          value={rating === 5 ? 72 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 2 : 1}
                          className="h-2 flex-1"
                        />
                        <span className="text-xs text-muted-foreground w-8">
                          {rating === 5 ? "72%" : rating === 4 ? "20%" : rating === 3 ? "5%" : rating === 2 ? "2%" : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.patient}</span>
                            <div className="flex">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Generated Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>Download your previously generated reports</CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate New Report
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
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
