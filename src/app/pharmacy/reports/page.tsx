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
  Pill,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Package,
  FileText,
  DollarSign,
  Clock,
  Minus,
} from "lucide-react"
import { useState } from "react"

const overviewStats = {
  totalDispensed: 342,
  dispensedChange: 15,
  prescriptionsFilled: 89,
  prescriptionsChange: 8,
  lowStockItems: 7,
  expiringSoon: 3,
  totalValue: 12840,
  valueChange: 5.2,
}

const monthlyDispensed = [
  { month: "Jul", count: 285 },
  { month: "Aug", count: 298 },
  { month: "Sep", count: 310 },
  { month: "Oct", count: 322 },
  { month: "Nov", count: 318 },
  { month: "Dec", count: 335 },
  { month: "Jan", count: 342 },
]

const topMedications = [
  { name: "Metformin 500mg", category: "Diabetes", dispensed: 48, stock: 250, reorderLevel: 50, trend: "up" },
  { name: "Lisinopril 10mg", category: "Hypertension", dispensed: 42, stock: 180, reorderLevel: 40, trend: "up" },
  { name: "Atorvastatin 20mg", category: "Cholesterol", dispensed: 38, stock: 320, reorderLevel: 60, trend: "stable" },
  { name: "Aspirin 81mg", category: "Cardiology", dispensed: 35, stock: 500, reorderLevel: 100, trend: "down" },
  { name: "Metoprolol 25mg", category: "Cardiology", dispensed: 32, stock: 145, reorderLevel: 30, trend: "up" },
  { name: "Omeprazole 20mg", category: "GI", dispensed: 28, stock: 210, reorderLevel: 50, trend: "stable" },
]

const lowStockAlerts = [
  { medication: "Amoxicillin 500mg", currentStock: 12, reorderLevel: 50, category: "Antibiotic", severity: "CRITICAL" },
  { medication: "Warfarin 5mg", currentStock: 18, reorderLevel: 40, category: "Anticoagulant", severity: "CRITICAL" },
  { medication: "Insulin Glargine", currentStock: 8, reorderLevel: 20, category: "Diabetes", severity: "CRITICAL" },
  { medication: "Amlodipine 5mg", currentStock: 35, reorderLevel: 60, category: "Hypertension", severity: "LOW" },
  { medication: "Furosemide 40mg", currentStock: 22, reorderLevel: 30, category: "Diuretic", severity: "LOW" },
  { medication: "Gabapentin 300mg", currentStock: 28, reorderLevel: 40, category: "Neuropathic", severity: "LOW" },
  { medication: "Cetirizine 10mg", currentStock: 45, reorderLevel: 60, category: "Antihistamine", severity: "LOW" },
]

const expiringMedications = [
  { medication: "Amoxicillin 500mg", batch: "AMX-2024-01", quantity: 80, expiryDate: "2024-02-28", daysLeft: 38 },
  { medication: "Chloramphenicol Eye Drops", batch: "CHE-2023-12", quantity: 24, expiryDate: "2024-03-15", daysLeft: 54 },
  { medication: "Tetanus Vaccine", batch: "TTV-2024-02", quantity: 15, expiryDate: "2024-04-01", daysLeft: 71 },
]

const recentReports = [
  { id: "PR001", name: "Monthly Dispensing Report - January 2024", date: "Jan 31, 2024", type: "Dispensing Report" },
  { id: "PR002", name: "Inventory Audit - Q4 2023", date: "Jan 5, 2024", type: "Inventory Report" },
  { id: "PR003", name: "Low Stock Alert Summary - December 2023", date: "Dec 31, 2023", type: "Alert Report" },
  { id: "PR004", name: "Expiry Management Report - 2023", date: "Dec 28, 2023", type: "Expiry Report" },
]

export default function PharmacyReportsPage() {
  const [period, setPeriod] = useState("this_month")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pharmacy Reports</h1>
          <p className="text-muted-foreground">Inventory analytics, dispensing stats and stock alerts</p>
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medications Dispensed</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.totalDispensed}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.dispensedChange}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Pill className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prescriptions Filled</p>
                <p className="text-3xl font-bold mt-1">{overviewStats.prescriptionsFilled}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.prescriptionsChange}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                <p className="text-3xl font-bold mt-1 text-amber-600">{overviewStats.lowStockItems}</p>
                <p className="text-xs text-amber-600 mt-2">Action required</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <p className="text-3xl font-bold mt-1">${(overviewStats.totalValue / 1000).toFixed(1)}K</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{overviewStats.valueChange}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Banner */}
      {overviewStats.lowStockItems > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Stock Alert: {overviewStats.lowStockItems} items need reorder</p>
              <p className="text-xs text-amber-700 mt-0.5">
                {overviewStats.expiringSoon} items are expiring within 90 days
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 shrink-0">
            <Package className="mr-2 h-4 w-4" />
            Reorder Now
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="top-medications">Top Medications</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Tracking</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Monthly Dispensing Trend
                </CardTitle>
                <CardDescription>Total medications dispensed over last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyDispensed.map((d, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-8 text-sm text-muted-foreground">{d.month}</span>
                      <div className="flex-1">
                        <Progress value={(d.count / 360) * 100} className="h-4" />
                      </div>
                      <span className="w-10 text-sm font-medium text-right">{d.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Pharmacy Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Prescription Fill Rate", value: 98 },
                  { label: "On-time Dispensing", value: 95 },
                  { label: "Stock Availability", value: 92 },
                  { label: "Error-free Dispensing", value: 99 },
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

        {/* Top Medications Tab */}
        <TabsContent value="top-medications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Most Dispensed Medications</CardTitle>
              <CardDescription>Top medications dispensed this {period.replace("_", " ")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Dispensed</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMedications.map((med, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell><Badge variant="outline">{med.category}</Badge></TableCell>
                      <TableCell>{med.dispensed}</TableCell>
                      <TableCell>
                        <span className={med.stock <= med.reorderLevel ? "text-amber-600 font-medium" : ""}>{med.stock}</span>
                      </TableCell>
                      <TableCell>
                        {med.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {med.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                        {med.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Low Stock Tab */}
        <TabsContent value="low-stock">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Medications requiring immediate reorder</CardDescription>
              </div>
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Generate Purchase Order
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockAlerts.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.medication}</TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>
                        <span className={item.severity === "CRITICAL" ? "text-red-600 font-bold" : "text-amber-600 font-medium"}>
                          {item.currentStock}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.reorderLevel}</TableCell>
                      <TableCell>
                        <Badge variant={item.severity === "CRITICAL" ? "destructive" : "secondary"}>
                          {item.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Reorder</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expiry Tab */}
        <TabsContent value="expiry">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Expiring Medications</CardTitle>
              <CardDescription>Medications expiring within 90 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Batch No.</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringMedications.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.medication}</TableCell>
                      <TableCell className="font-mono text-sm">{item.batch}</TableCell>
                      <TableCell>{item.quantity} units</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className={`h-4 w-4 ${item.daysLeft <= 45 ? "text-red-500" : "text-amber-500"}`} />
                          <span className={`font-medium ${item.daysLeft <= 45 ? "text-red-600" : "text-amber-600"}`}>
                            {item.daysLeft} days
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Mark for Disposal</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Reports Tab */}
        <TabsContent value="reports">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Previously generated pharmacy reports</CardDescription>
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
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((r) => (
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
