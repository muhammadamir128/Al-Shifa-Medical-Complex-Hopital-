"use client"

import { StatsCardGroup } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Receipt,
  DollarSign,
  CreditCard,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  Mail,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const stats = [
  { title: "Today's Revenue", value: "$4,850", icon: DollarSign, trend: { value: 12, isPositive: true } },
  { title: "Pending Bills", value: "28", icon: Clock, description: "Need attention" },
  { title: "Paid Today", value: "15", icon: CheckCircle2, description: "Payments received" },
  { title: "Overdue Bills", value: "8", icon: AlertCircle, trend: { value: 3, isPositive: false } },
]

const bills = [
  { 
    id: "INV001", 
    patient: "John Smith", 
    patientId: "P001",
    doctor: "Dr. Sarah Wilson", 
    department: "Cardiology", 
    date: "2024-01-15",
    dueDate: "2024-01-22",
    amount: 250.00,
    status: "PAID",
    paymentMethod: "Credit Card"
  },
  { 
    id: "INV002", 
    patient: "Emily Davis", 
    patientId: "P002",
    doctor: "Dr. Michael Brown", 
    department: "Neurology", 
    date: "2024-01-15",
    dueDate: "2024-01-22",
    amount: 180.00,
    status: "PENDING",
    paymentMethod: null
  },
  { 
    id: "INV003", 
    patient: "Robert Johnson", 
    patientId: "P003",
    doctor: "Dr. Lisa Chen", 
    department: "Orthopedics", 
    date: "2024-01-15",
    dueDate: "2024-01-22",
    amount: 320.00,
    status: "PAID",
    paymentMethod: "Cash"
  },
  { 
    id: "INV004", 
    patient: "Sarah Miller", 
    patientId: "P004",
    doctor: "Dr. James Wilson", 
    department: "Pediatrics", 
    date: "2024-01-14",
    dueDate: "2024-01-21",
    amount: 95.00,
    status: "PENDING",
    paymentMethod: null
  },
  { 
    id: "INV005", 
    patient: "Michael Lee", 
    patientId: "P005",
    doctor: "Dr. Emma Thompson", 
    department: "General", 
    date: "2024-01-14",
    dueDate: "2024-01-21",
    amount: 150.00,
    status: "OVERDUE",
    paymentMethod: null
  },
  { 
    id: "INV006", 
    patient: "Jennifer White", 
    patientId: "P006",
    doctor: "Dr. David Kim", 
    department: "Dermatology", 
    date: "2024-01-13",
    dueDate: "2024-01-20",
    amount: 200.00,
    status: "PARTIALLY_PAID",
    paymentMethod: "Credit Card"
  },
  { 
    id: "INV007", 
    patient: "David Brown", 
    patientId: "P007",
    doctor: "Dr. Sarah Wilson", 
    department: "Cardiology", 
    date: "2024-01-13",
    dueDate: "2024-01-20",
    amount: 450.00,
    status: "PAID",
    paymentMethod: "Insurance"
  },
  { 
    id: "INV008", 
    patient: "Lisa Anderson", 
    patientId: "P008",
    doctor: "Dr. Michael Brown", 
    department: "Neurology", 
    date: "2024-01-12",
    dueDate: "2024-01-19",
    amount: 175.00,
    status: "OVERDUE",
    paymentMethod: null
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
    case "PENDING":
      return <Badge variant="secondary">Pending</Badge>
    case "OVERDUE":
      return <Badge variant="destructive">Overdue</Badge>
    case "PARTIALLY_PAID":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Partial</Badge>
    case "REFUNDED":
      return <Badge variant="outline">Refunded</Badge>
    case "CANCELLED":
      return <Badge variant="outline" className="border-red-500 text-red-600">Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function BillingPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing Overview</h1>
            <p className="text-muted-foreground">
              Manage patient bills and payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button>
              <Receipt className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCardGroup cards={stats} />

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
              <CardDescription>Billing statistics for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Collected This Week</p>
                      <p className="text-2xl font-bold text-green-600">$12,450</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+15%</p>
                    <p className="text-xs text-muted-foreground">vs last week</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
                      <p className="text-2xl font-bold text-amber-600">$3,280</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">28 bills</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overdue Amount</p>
                      <p className="text-2xl font-bold text-red-600">$1,850</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-600">+3 bills</p>
                    <p className="text-xs text-muted-foreground">new this week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Distribution by payment type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">45%</span>
                    <div className="w-20 h-2 rounded-full bg-muted">
                      <div className="w-[45%] h-full rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Cash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">30%</span>
                    <div className="w-20 h-2 rounded-full bg-muted">
                      <div className="w-[30%] h-full rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">20%</span>
                    <div className="w-20 h-2 rounded-full bg-muted">
                      <div className="w-[20%] h-full rounded-full bg-purple-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Other</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">5%</span>
                    <div className="w-20 h-2 rounded-full bg-muted">
                      <div className="w-[5%] h-full rounded-full bg-amber-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by invoice ID or patient name..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Amount (High)</SelectItem>
                    <SelectItem value="amount-low">Amount (Low)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bills Table */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              A list of all recent bills and their payment status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Doctor</TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{bill.patient}</p>
                          <p className="text-xs text-muted-foreground">{bill.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <p>{bill.doctor}</p>
                          <p className="text-xs text-muted-foreground">{bill.department}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div>
                          <p>{bill.date}</p>
                          <p className="text-xs text-muted-foreground">Due: {bill.dueDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold">${bill.amount.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Invoice Details</DialogTitle>
                                  <DialogDescription>
                                    Invoice {bill.id} for {bill.patient}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Status</span>
                                    {getStatusBadge(bill.status)}
                                  </div>
                                  <Separator />
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Patient</span>
                                      <span className="font-medium">{bill.patient}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Doctor</span>
                                      <span className="font-medium">{bill.doctor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Department</span>
                                      <span className="font-medium">{bill.department}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Date</span>
                                      <span className="font-medium">{bill.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Due Date</span>
                                      <span className="font-medium">{bill.dueDate}</span>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Consultation</span>
                                      <span>$50.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Lab Tests</span>
                                      <span>${(bill.amount * 0.3).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Medicines</span>
                                      <span>${(bill.amount * 0.2).toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                      <span>Total</span>
                                      <span>${bill.amount.toFixed(2)}</span>
                                    </div>
                                  </div>
                                  {bill.status !== "PAID" && (
                                    <DialogFooter className="gap-2 sm:gap-0">
                                      <Button className="flex-1">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Mark as Paid
                                      </Button>
                                    </DialogFooter>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                            {bill.status !== "PAID" && (
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
