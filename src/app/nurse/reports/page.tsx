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
  UserRound,
  Activity,
  Syringe,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  Clock,
  Heart,
  FileText,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

const overviewStats = {
  patientsCaredFor: 38,
  patientsChange: 5,
  vitalsRecorded: 142,
  vitalsChange: 12,
  medicationsGiven: 89,
  medicationsChange: 8,
  tasksCompleted: 47,
  tasksTotal: 49,
}

const monthlyData = [
  { month: "Jul", patients: 32, vitals: 118 },
  { month: "Aug", patients: 35, vitals: 124 },
  { month: "Sep", patients: 33, vitals: 120 },
  { month: "Oct", patients: 36, vitals: 130 },
  { month: "Nov", patients: 37, vitals: 138 },
  { month: "Dec", patients: 40, vitals: 145 },
  { month: "Jan", patients: 38, vitals: 142 },
]

const vitalsRecorded = [
  { patient: "John Smith", time: "08:30 AM", bp: "120/80", pulse: 72, temp: "98.6°F", spo2: "98%", status: "Normal" },
  { patient: "Emily Davis", time: "09:00 AM", bp: "145/92", pulse: 88, temp: "99.2°F", spo2: "96%", status: "Alert" },
  { patient: "Robert Johnson", time: "09:30 AM", bp: "118/76", pulse: 68, temp: "98.4°F", spo2: "99%", status: "Normal" },
  { patient: "Sarah Miller", time: "10:00 AM", bp: "130/85", pulse: 76, temp: "98.8°F", spo2: "97%", status: "Normal" },
  { patient: "David Brown", time: "10:30 AM", bp: "158/98", pulse: 92, temp: "99.8°F", spo2: "95%", status: "Critical" },
]

const medicationsAdministered = [
  { patient: "John Smith", medication: "Metformin 500mg", route: "Oral", time: "08:00 AM", status: "GIVEN" },
  { patient: "Emily Davis", medication: "Lisinopril 10mg", route: "Oral", time: "08:15 AM", status: "GIVEN" },
  { patient: "Robert Johnson", medication: "Aspirin 81mg", route: "Oral", time: "08:30 AM", status: "GIVEN" },
  { patient: "Sarah Miller", medication: "Metoprolol 25mg", route: "Oral", time: "09:00 AM", status: "GIVEN" },
  { patient: "David Brown", medication: "Furosemide 40mg", route: "IV", time: "09:15 AM", status: "PENDING" },
]

const taskSummary = [
  { task: "Vitals Monitoring", completed: 12, total: 12, priority: "HIGH" },
  { task: "Medication Administration", completed: 8, total: 9, priority: "HIGH" },
  { task: "Patient Assessment", completed: 6, total: 6, priority: "MEDIUM" },
  { task: "Documentation", completed: 10, total: 11, priority: "MEDIUM" },
  { task: "Patient Education", completed: 4, total: 4, priority: "LOW" },
  { task: "Wound Care", completed: 7, total: 7, priority: "HIGH" },
]

const generatedReports = [
  { id: "NR001", name: "Shift Report - Morning Jan 20, 2024", date: "Jan 20, 2024", type: "Shift Report" },
  { id: "NR002", name: "Weekly Patient Care Summary - Week 3", date: "Jan 19, 2024", type: "Weekly Summary" },
  { id: "NR003", name: "Medication Administration Record - Jan 2024", date: "Jan 15, 2024", type: "MAR Report" },
  { id: "NR004", name: "Vitals Trend Report - January 2024", date: "Jan 10, 2024", type: "Vitals Report" },
]

export default function NurseReportsPage() {
  const [period, setPeriod] = useState("this_week")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">View your shift performance and patient care statistics</p>
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
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patients Cared For</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.patientsCaredFor}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.patientsChange}</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vitals Recorded</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.vitalsRecorded}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.vitalsChange}</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <Activity className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medications Given</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.medicationsGiven}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.medicationsChange}</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Syringe className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.tasksCompleted}/{overviewStats.tasksTotal}</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>96% rate</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Log</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Monthly Patient Trend
                </CardTitle>
                <CardDescription>Patients cared for over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyData.map((d, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-8 text-sm text-muted-foreground">{d.month}</span>
                      <div className="flex-1">
                        <Progress value={(d.patients / 45) * 100} className="h-4" />
                      </div>
                      <span className="w-8 text-sm font-medium">{d.patients}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Key performance indicators this period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Task Completion Rate", value: 96, color: "emerald" },
                  { label: "On-time Medication Rate", value: 94, color: "blue" },
                  { label: "Vitals Documentation", value: 100, color: "green" },
                  { label: "Patient Satisfaction", value: 92, color: "purple" },
                ].map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{m.label}</span>
                      <Badge variant="outline">{m.value}%</Badge>
                    </div>
                    <Progress value={m.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Vitals Log</CardTitle>
              <CardDescription>Vitals recorded during current shift</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>BP</TableHead>
                    <TableHead>Pulse</TableHead>
                    <TableHead>Temp</TableHead>
                    <TableHead>SpO2</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitalsRecorded.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{v.patient}</TableCell>
                      <TableCell className="text-muted-foreground">{v.time}</TableCell>
                      <TableCell>{v.bp}</TableCell>
                      <TableCell>{v.pulse} bpm</TableCell>
                      <TableCell>{v.temp}</TableCell>
                      <TableCell>{v.spo2}</TableCell>
                      <TableCell>
                        <Badge
                          variant={v.status === "Normal" ? "outline" : v.status === "Alert" ? "secondary" : "destructive"}
                          className={v.status === "Normal" ? "border-emerald-500 text-emerald-600" : ""}
                        >
                          {v.status === "Alert" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {v.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Medication Administration Record</CardTitle>
              <CardDescription>Today&apos;s medications administered</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicationsAdministered.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{m.patient}</TableCell>
                      <TableCell>{m.medication}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{m.route}</Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {m.time}
                      </TableCell>
                      <TableCell>
                        <Badge variant={m.status === "GIVEN" ? "default" : "secondary"}>
                          {m.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Task Completion Summary</CardTitle>
              <CardDescription>Overview of tasks completed this shift</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taskSummary.map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{task.task}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "HIGH"
                                ? "border-red-400 text-red-600"
                                : task.priority === "MEDIUM"
                                ? "border-amber-400 text-amber-600"
                                : "border-emerald-400 text-emerald-600"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-sm font-medium">{task.completed}/{task.total}</span>
                        </div>
                      </div>
                      <Progress value={(task.completed / task.total) * 100} className="h-2" />
                    </div>
                    {task.completed === task.total ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Reports Tab */}
        <TabsContent value="reports">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Download previously generated shift and care reports</CardDescription>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Shift Report
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono">{r.id}</TableCell>
                      <TableCell>{r.name}</TableCell>
                      <TableCell><Badge variant="outline">{r.type}</Badge></TableCell>
                      <TableCell>{r.date}</TableCell>
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
  )
}
