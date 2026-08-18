"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DollarSign,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Printer,
  Mail,
  Plus,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

const invoices = [
  { id: "INV-001", patient: "John Smith",     date: "2024-01-15", amount: 450.00, status: "PAID",           method: "Credit Card", department: "Cardiology" },
  { id: "INV-002", patient: "Emily Davis",    date: "2024-01-15", amount: 280.00, status: "PENDING",        method: "—",           department: "Neurology" },
  { id: "INV-003", patient: "Robert Johnson", date: "2024-01-14", amount: 620.00, status: "PAID",           method: "Insurance",   department: "Orthopedics" },
  { id: "INV-004", patient: "Sarah Miller",   date: "2024-01-14", amount: 195.00, status: "OVERDUE",        method: "—",           department: "Pediatrics" },
  { id: "INV-005", patient: "Michael Lee",    date: "2024-01-13", amount: 890.00, status: "PAID",           method: "Cash",        department: "Emergency" },
  { id: "INV-006", patient: "Jennifer Brown", date: "2024-01-13", amount: 340.00, status: "PARTIALLY_PAID", method: "Credit Card", department: "General Medicine" },
  { id: "INV-007", patient: "William Wilson", date: "2024-01-12", amount: 520.00, status: "PENDING",        method: "—",           department: "Surgery" },
  { id: "INV-008", patient: "Amanda Taylor",  date: "2024-01-12", amount: 175.00, status: "PAID",           method: "Insurance",   department: "Dermatology" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  PAID:           { label: "Paid",           className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle },
  PENDING:        { label: "Pending",        className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",         icon: Clock },
  OVERDUE:        { label: "Overdue",        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",                 icon: XCircle },
  PARTIALLY_PAID: { label: "Partial",        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",             icon: CreditCard },
}

export default function AdminBillingPage() {
  const [search, setSearch]           = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [isNewOpen, setIsNewOpen]     = useState(false)

  const methods = [...new Set(invoices.map(i => i.method).filter(m => m !== "—"))]

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase()
    const matchSearch =
      inv.patient.toLowerCase().includes(q) ||
      inv.id.toLowerCase().includes(q) ||
      inv.department.toLowerCase().includes(q)
    const matchStatus = statusFilter === "all" || inv.status === statusFilter
    const matchMethod = methodFilter === "all" || inv.method === methodFilter
    return matchSearch && matchStatus && matchMethod
  })

  const totalRevenue  = invoices.filter(i => i.status === "PAID").reduce((a, i) => a + i.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === "PENDING" || i.status === "OVERDUE").reduce((a, i) => a + i.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === "OVERDUE").reduce((a, i) => a + i.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing Management</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Report exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Enter the billing details for this patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="inv-patient">Patient Name</Label>
                  <Input id="inv-patient" placeholder="Search patient..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inv-dept">Department</Label>
                    <Input id="inv-dept" placeholder="Department" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inv-amount">Amount ($)</Label>
                    <Input id="inv-amount" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inv-date">Date</Label>
                    <Input id="inv-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inv-notes">Notes</Label>
                  <Input id="inv-notes" placeholder="Additional notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsNewOpen(false); toast.success("Invoice created!") }}>
                  Create Invoice
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue",    value: `$${totalRevenue.toLocaleString()}`,  icon: DollarSign, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Pending Amount",   value: `$${pendingAmount.toLocaleString()}`, icon: Clock,      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Overdue",          value: `$${overdueAmount.toLocaleString()}`, icon: XCircle,    color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
          { label: "Total Invoices",   value: invoices.length,                      icon: Receipt,    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
        ].map(s => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Credit Card", amount: "$1,230", icon: CreditCard, trend: "+12%", up: true },
          { label: "Cash",        amount: "$890",   icon: Banknote,   trend: "-5%",  up: false },
          { label: "Insurance",   amount: "$1,140", icon: CheckCircle,trend: "+18%", up: true },
        ].map(m => {
          const Icon = m.icon
          return (
            <Card key={m.label} className="border-none shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    {m.label}
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${m.up ? "text-emerald-600" : "text-red-500"}`}>
                    {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {m.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold">{m.amount}</p>
                <p className="text-xs text-muted-foreground mt-1">from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Invoices Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-base">Recent Invoices</CardTitle>
            <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-end">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="PARTIALLY_PAID">Partial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  {methods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== invoices.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {invoices.length} invoices
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Invoice ID</TableHead>
                  <TableHead className="font-semibold">Patient</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Method</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No invoices found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(inv => {
                    const cfg = statusConfig[inv.status]
                    const StatusIcon = cfg.icon
                    return (
                      <TableRow key={inv.id} className="transition-colors hover:bg-muted/40">
                        <TableCell className="font-mono text-xs font-medium">{inv.id}</TableCell>
                        <TableCell className="font-medium text-sm">{inv.patient}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm">{inv.department}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                        <TableCell className="font-semibold text-sm">${inv.amount.toFixed(2)}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{inv.method}</TableCell>
                        <TableCell>
                          <Badge className={`${cfg.className} text-xs gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="View Invoice" asChild>
                              <Link href={`/admin/billing/${inv.id}`}>
                                <Eye className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Print Invoice" onClick={() => toast.info(`Opening print view for ${inv.id}`)}>
                              <Printer className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Email Invoice" onClick={() => toast.success(`Invoice ${inv.id} sent!`)}>
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
