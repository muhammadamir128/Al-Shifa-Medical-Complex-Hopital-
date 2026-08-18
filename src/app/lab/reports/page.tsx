"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  FileText,
  FlaskConical,
  TestTubes,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react"

const monthlyStats = [
  { month: "Jan", total: 1234, completed: 1189, pending: 45 },
  { month: "Feb", total: 1345, completed: 1302, pending: 43 },
  { month: "Mar", total: 1456, completed: 1398, pending: 58 },
  { month: "Apr", total: 1567, completed: 1512, pending: 55 },
  { month: "May", total: 1678, completed: 1623, pending: 55 },
  { month: "Jun", total: 1789, completed: 1734, pending: 55 },
]

const testTypeStats = [
  { type: "Complete Blood Count", code: "CBC", count: 456, percentage: 28, trend: "up" },
  { type: "Metabolic Panel", code: "BMP", count: 312, percentage: 19, trend: "up" },
  { type: "Lipid Profile", code: "LIPID", count: 234, percentage: 14, trend: "down" },
  { type: "Thyroid Panel", code: "TSH", count: 189, percentage: 12, trend: "up" },
  { type: "Urinalysis", code: "UA", count: 178, percentage: 11, trend: "stable" },
  { type: "Liver Function", code: "LFT", count: 145, percentage: 9, trend: "up" },
  { type: "Others", code: "OTH", count: 108, percentage: 7, trend: "stable" },
]

const turnaroundTime = [
  { category: "STAT", target: 30, actual: 28, status: "good" },
  { category: "Urgent", target: 60, actual: 52, status: "good" },
  { category: "Routine", target: 120, actual: 135, status: "warning" },
]

const departmentPerformance = [
  { name: "Hematology", tests: 456, avgTurnaround: "42 min", accuracy: 99.2, criticalRate: 2.1 },
  { name: "Chemistry", tests: 623, avgTurnaround: "38 min", accuracy: 98.8, criticalRate: 3.4 },
  { name: "Microbiology", tests: 189, avgTurnaround: "85 min", accuracy: 99.5, criticalRate: 1.8 },
  { name: "Urinalysis", tests: 234, avgTurnaround: "25 min", accuracy: 99.8, criticalRate: 0.5 },
  { name: "Immunology", tests: 167, avgTurnaround: "55 min", accuracy: 98.9, criticalRate: 2.8 },
]

const recentReports = [
  { id: "RPT-001", name: "Monthly Test Volume Report", date: "2024-01-15", type: "Monthly", status: "Ready" },
  { id: "RPT-002", name: "Quality Control Summary", date: "2024-01-15", type: "Weekly", status: "Ready" },
  { id: "RPT-003", name: "Critical Values Report", date: "2024-01-15", type: "Daily", status: "Ready" },
  { id: "RPT-004", name: "Turnaround Time Analysis", date: "2024-01-14", type: "Weekly", status: "Ready" },
  { id: "RPT-005", name: "Equipment Calibration Log", date: "2024-01-14", type: "Daily", status: "Ready" },
]

const qualityMetrics = [
  { name: "Sample Rejection Rate", value: "1.2%", target: "<2%", status: "good" },
  { name: "Result Accuracy", value: "99.1%", target: ">98%", status: "good" },
  { name: "Critical Value Notification", value: "95%", target: ">95%", status: "good" },
  { name: "Proficiency Testing", value: "Pass", target: "Pass", status: "good" },
  { name: "Accreditation Status", value: "Active", target: "Active", status: "good" },
]

export default function LabReportsPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Reports & Analytics</h1>
            <p className="text-muted-foreground">
              View laboratory statistics, performance metrics, and generate reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests (Month)</p>
                  <p className="text-2xl font-bold mt-1">8,234</p>
                  <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    +12.5% from last month
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center">
                  <FlaskConical className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold mt-1">97.2%</p>
                  <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    +2.1% from last month
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Turnaround</p>
                  <p className="text-2xl font-bold mt-1">45 min</p>
                  <div className="flex items-center gap-1 mt-1 text-amber-600 text-sm">
                    <Minus className="h-4 w-4" />
                    Same as last month
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Results</p>
                  <p className="text-2xl font-bold mt-1">128</p>
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    1.6% of total tests
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Volume Trend */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Test Volume Trend
              </CardTitle>
              <CardDescription>Monthly test volume over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat) => (
                  <div key={stat.month} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{stat.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{stat.total} tests</span>
                        <span className="text-xs text-muted-foreground">{stat.completed} completed</span>
                      </div>
                      <Progress value={(stat.completed / stat.total) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Type Distribution */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Test Type Distribution
              </CardTitle>
              <CardDescription>Most frequently performed tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testTypeStats.map((test) => (
                  <div key={test.type} className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded bg-rose-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-rose-600">{test.code}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{test.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{test.count}</span>
                          {test.trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                          {test.trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500" />}
                          {test.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                      <Progress value={test.percentage} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Turnaround Time & Department Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Turnaround Time */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Turnaround Time Performance
              </CardTitle>
              <CardDescription>Actual vs target turnaround times (minutes)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {turnaroundTime.map((tat) => (
                  <div key={tat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tat.category}</span>
                        {tat.status === "good" ? (
                          <Badge variant="outline" className="border-green-500 text-green-600">On Target</Badge>
                        ) : (
                          <Badge variant="outline" className="border-amber-500 text-amber-600">Needs Improvement</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Target: {tat.target} min
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Progress 
                          value={(tat.actual / tat.target) * 100} 
                          className={`h-3 ${tat.actual > tat.target ? '[&>div]:bg-amber-500' : '[&>div]:bg-green-500'}`}
                        />
                      </div>
                      <span className={`text-sm font-medium ${tat.actual > tat.target ? 'text-amber-600' : 'text-green-600'}`}>
                        {tat.actual} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Metrics */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quality Metrics
              </CardTitle>
              <CardDescription>Key quality indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{metric.name}</p>
                      <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{metric.value}</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance Table */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Performance metrics by laboratory department</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Tests Performed</TableHead>
                    <TableHead>Avg Turnaround</TableHead>
                    <TableHead>Accuracy Rate</TableHead>
                    <TableHead>Critical Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept) => (
                    <TableRow key={dept.name}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.tests}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {dept.avgTurnaround}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.accuracy} className="h-2 w-16" />
                          <span>{dept.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={dept.criticalRate > 3 ? "destructive" : "secondary"}>
                          {dept.criticalRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Recent laboratory reports available for download</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
