"use client"

import Link from "next/link"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  Clock3,
  DollarSign,
  FileText,
  PackageCheck,
  Pill,
  ShoppingCart,
  Truck,
} from "lucide-react"
import {
  getInventoryStatus,
  getInventoryStatusLabel,
  getPharmacyDashboardData,
} from "@/lib/pharmacy-data"

const data = getPharmacyDashboardData()
const pieColors = ["#16a34a", "#2563eb", "#f59e0b", "#db2777", "#6d28d9", "#059669"]

export default function PharmacyDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-6 py-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pharmacy Dashboard</h1>
          <p className="text-muted-foreground">
            Inventory, dispensing queue, revenue, supplier risk, and stock alerts in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/pharmacy/inventory">
              <Boxes className="mr-2 h-4 w-4" />
              Inventory
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/pharmacy/dispensed">
              <PackageCheck className="mr-2 h-4 w-4" />
              Dispensed Log
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/pharmacy/prescriptions">
              <FileText className="mr-2 h-4 w-4" />
              Process Queue
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Medicines", value: data.stats.totalMedicines, helper: `$${Math.round(data.stats.inventoryValue).toLocaleString()} value`, icon: Pill },
          { title: "Pending Prescriptions", value: data.stats.pendingPrescriptions, helper: `${data.stats.expiringSoon} expiry alerts`, icon: FileText },
          { title: "Dispensed Today", value: data.stats.dispensedToday, helper: `$${Math.round(data.stats.todayRevenue).toLocaleString()} revenue`, icon: PackageCheck },
          { title: "Purchase Orders", value: data.stats.openPurchaseOrders, helper: `${data.stats.lowStockItems} low stock items`, icon: ShoppingCart },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-md overflow-hidden transition-shadow hover:shadow-lg">
            <div className="h-0.5 bg-brand-gradient" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.helper}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shrink-0 shadow-sm">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly pharmacy revenue with dispensing order volume</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyRevenue}>
                <defs>
                  <linearGradient id="pharmacyRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(value: number, name: string) => [name === "revenue" ? `$${value.toLocaleString()}` : value, name === "revenue" ? "Revenue" : "Orders"]} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#pharmacyRevenue)" strokeWidth={2} />
                <Bar dataKey="orders" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Category Mix</CardTitle>
            <CardDescription>Inventory value split by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.categoryBreakdown} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={2}>
                    {data.categoryBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {data.categoryBreakdown.slice(0, 5).map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-medium">${entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Dispensing Flow</CardTitle>
              <CardDescription>Last 7 days of processed versus waiting prescriptions</CardDescription>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/pharmacy/prescriptions">
                Queue
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyFlow}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={28} />
                <Tooltip />
                <Bar dataKey="dispensed" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Supplier Reliability</CardTitle>
            <CardDescription>Open orders and lead time risk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.supplierPerformance.map((supplier) => (
              <div key={supplier.name} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {supplier.openOrders} open orders • {supplier.leadTimeDays} day lead time
                    </p>
                  </div>
                  <Badge variant="outline">{supplier.reliability}%</Badge>
                </div>
                <Progress value={supplier.reliability} className="mt-3 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Queue At Risk</CardTitle>
              <CardDescription>Prescriptions blocked by missing stock or extra checks</CardDescription>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/pharmacy/prescriptions">Open Queue</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RX</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.pendingPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">{prescription.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{prescription.patient.name}</p>
                        <p className="text-xs text-muted-foreground">{prescription.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={prescription.status === "ON_HOLD" ? "destructive" : "secondary"}>
                        {prescription.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {prescription.unavailable.length > 0 ? (
                        <span className="text-sm text-destructive">
                          {prescription.unavailable.length} item unavailable
                        </span>
                      ) : (
                        <span className="text-sm text-emerald-600">Can dispense</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Low Stock & Expiry</CardTitle>
              <CardDescription>Immediate action items for the floor team</CardDescription>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/pharmacy/inventory">Manage Stock</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.lowStock.map((medicine) => (
              <div key={medicine.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock {medicine.stock} / Reorder {medicine.reorderLevel}
                    </p>
                  </div>
                  <Badge variant="outline">{getInventoryStatusLabel(getInventoryStatus(medicine.stock, medicine.reorderLevel))}</Badge>
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-amber-50 p-4 text-amber-900">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                Expiring Soon
              </div>
              <div className="mt-2 space-y-2">
                {data.expiringSoon.map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between text-sm">
                    <span>{medicine.name}</span>
                    <span>{medicine.expiryDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Top Dispensed Medicines</CardTitle>
            <CardDescription>Highest volume medicines by dispensed quantity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topMedicines.map((medicine, index) => (
              <div key={medicine.name} className="flex items-center justify-between rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground">{medicine.quantity} units dispensed</p>
                  </div>
                </div>
                <span className="font-semibold">${Math.round(medicine.revenue).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Operational updates from the pharmacy floor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.activities.map((activity) => (
              <div key={`${activity.action}-${activity.time}`} className="rounded-xl border p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === "inventory" && <Truck className="h-4 w-4 text-primary" />}
                    {activity.type === "prescription" && <FileText className="h-4 w-4 text-primary" />}
                    {activity.type === "billing" && <DollarSign className="h-4 w-4 text-primary" />}
                    {activity.type === "alert" && <Clock3 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
