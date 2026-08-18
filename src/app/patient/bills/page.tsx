"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Receipt,
  Search,
  CreditCard,
  Download,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Wallet,
  Plus,
  Shield,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"

const bills = [
  {
    id: "INV-2024-001",
    date: "Dec 15, 2024",
    dueDate: "Dec 30, 2024",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    items: [
      { name: "Consultation Fee", amount: 150 },
      { name: "ECG Test", amount: 75 },
      { name: "Lab Tests", amount: 120 },
    ],
    subtotal: 345,
    tax: 0,
    discount: 0,
    total: 345,
    status: "PENDING",
    paymentMethod: null,
  },
  {
    id: "INV-2024-002",
    date: "Nov 20, 2024",
    dueDate: "Dec 05, 2024",
    doctor: "Dr. Michael Brown",
    department: "General Medicine",
    items: [
      { name: "Consultation Fee", amount: 100 },
      { name: "Prescription", amount: 45 },
    ],
    subtotal: 145,
    tax: 0,
    discount: 15,
    total: 130,
    status: "PAID",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-2024-003",
    date: "Oct 05, 2024",
    dueDate: "Oct 20, 2024",
    doctor: "Dr. Lisa Chen",
    department: "Orthopedics",
    items: [
      { name: "Consultation Fee", amount: 120 },
      { name: "X-Ray", amount: 200 },
      { name: "Physical Therapy", amount: 150 },
    ],
    subtotal: 470,
    tax: 0,
    discount: 0,
    total: 470,
    status: "PAID",
    paymentMethod: "Insurance",
  },
  {
    id: "INV-2024-004",
    date: "Sep 12, 2024",
    dueDate: "Sep 27, 2024",
    doctor: "Dr. Emma Thompson",
    department: "Dermatology",
    items: [
      { name: "Consultation Fee", amount: 130 },
      { name: "Topical Medication", amount: 35 },
    ],
    subtotal: 165,
    tax: 0,
    discount: 0,
    total: 165,
    status: "PAID",
    paymentMethod: "Debit Card",
  },
  {
    id: "INV-2024-005",
    date: "Aug 25, 2024",
    dueDate: "Sep 10, 2024",
    doctor: "Dr. James Wilson",
    department: "Pediatrics",
    items: [
      { name: "Consultation Fee", amount: 90 },
      { name: "Vaccination", amount: 75 },
    ],
    subtotal: 165,
    tax: 0,
    discount: 0,
    total: 165,
    status: "OVERDUE",
    paymentMethod: null,
  },
]

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    dot: "bg-amber-500",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    cardBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  PAID: {
    label: "Paid",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cardBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  OVERDUE: {
    label: "Overdue",
    icon: AlertCircle,
    dot: "bg-red-500",
    className: "bg-red-50 text-red-700 border-red-200",
    cardBg: "bg-red-50",
    iconColor: "text-red-600",
  },
  PARTIALLY_PAID: {
    label: "Partial",
    icon: DollarSign,
    dot: "bg-blue-500",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    cardBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.PENDING
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", cfg.className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  )
}

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBill, setSelectedBill] = useState<(typeof bills)[0] | null>(null)
  const [payingBillId, setPayingBillId] = useState<string | null>(null)
  const [paidIds, setPaidIds] = useState<Set<string>>(new Set())
  const [confirmPayBill, setConfirmPayBill] = useState<(typeof bills)[0] | null>(null)

  const getStatus = (bill: (typeof bills)[0]) =>
    paidIds.has(bill.id) ? "PAID" : bill.status

  const filtered = bills.filter((b) => {
    const status = getStatus(b)
    const matchesSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPending = bills
    .filter((b) => !paidIds.has(b.id) && (b.status === "PENDING" || b.status === "OVERDUE"))
    .reduce((acc, b) => acc + b.total, 0)
  const totalPaid = bills
    .filter((b) => paidIds.has(b.id) || b.status === "PAID")
    .reduce((acc, b) => acc + b.total, 0)
  const overdueCount = bills.filter((b) => !paidIds.has(b.id) && b.status === "OVERDUE").length

  const handlePay = async (bill: (typeof bills)[0]) => {
    setConfirmPayBill(null)
    setPayingBillId(bill.id)
    await new Promise((r) => setTimeout(r, 1500))
    setPaidIds((prev) => new Set(prev).add(bill.id))
    setPayingBillId(null)
    setSelectedBill(null)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Bills</h1>
          <p className="text-sm text-muted-foreground mt-0.5">View and pay your medical bills</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Download className="h-4 w-4" />
          Download All Statements
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-0 shadow-sm bg-linear-to-br from-amber-50 to-amber-100/60">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-amber-700">${totalPending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-linear-to-br from-emerald-50 to-emerald-100/60">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-700">${totalPaid}</p>
                <p className="text-xs text-muted-foreground">Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-linear-to-br from-primary/5 to-primary/10">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary">{bills.length}</p>
                <p className="text-xs text-muted-foreground">Total Bills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-linear-to-br from-red-50 to-red-100/60">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{overdueCount}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueCount > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <div>
              <p className="font-semibold text-red-800 text-sm">Overdue Payment Notice</p>
              <p className="text-xs text-red-700 mt-0.5">
                You have {overdueCount} overdue bill{overdueCount > 1 ? "s" : ""}. Please make payment to avoid late fees.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 w-full sm:w-auto gap-2"
            onClick={() => {
              const overdue = bills.find((b) => b.status === "OVERDUE" && !paidIds.has(b.id))
              if (overdue) setConfirmPayBill(overdue)
            }}
          >
            <CreditCard className="h-4 w-4" />
            Pay Now
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice #, doctor, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bills List */}
      {filtered.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center py-14 text-muted-foreground">
            <Receipt className="h-10 w-10 mb-2 opacity-25" />
            <p className="text-sm">No bills found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((bill) => {
            const status = getStatus(bill)
            const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.PENDING
            const StatusIcon = cfg.icon
            const isPaying = payingBillId === bill.id
            return (
              <Card key={bill.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", cfg.cardBg)}>
                        <Receipt className={cn("h-6 w-6", cfg.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm">{bill.id}</h3>
                          <StatusBadge status={status} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {bill.doctor} · {bill.department}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {bill.date}
                          </span>
                          <span className={cn("flex items-center gap-1", status === "OVERDUE" && "text-red-600 font-medium")}>
                            <Clock className="h-3.5 w-3.5" />
                            Due: {bill.dueDate}
                          </span>
                          <span className="font-bold text-base text-foreground">${bill.total}</span>
                        </div>
                        {status === "PAID" && bill.paymentMethod && (
                          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Paid via {bill.paymentMethod}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-row lg:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBill(bill)}
                        className="gap-1.5 text-xs flex-1 sm:flex-none"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </Button>
                      {status !== "PAID" && (
                        <Button
                          size="sm"
                          disabled={isPaying}
                          onClick={() => setConfirmPayBill(bill)}
                          className="gap-1.5 text-xs flex-1 sm:flex-none"
                        >
                          {isPaying ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CreditCard className="h-3.5 w-3.5" />
                          )}
                          {isPaying ? "Processing..." : `Pay $${bill.total}`}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Payment Methods */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            Payment Methods
          </CardTitle>
          <CardDescription className="text-xs">Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border flex items-center justify-between hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25 · Visa</p>
                </div>
              </div>
              <span className="text-xs border rounded-full px-2.5 py-1 bg-primary/10 text-primary border-primary/20">
                Default
              </span>
            </div>
            <Button variant="outline" className="h-auto py-4 border-dashed rounded-xl gap-2 hover:bg-muted/30">
              <Plus className="h-5 w-5" />
              Add New Payment Method
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            Your payment information is encrypted and secure
          </div>
        </CardContent>
      </Card>

      {/* Bill Detail Dialog */}
      <Dialog open={!!selectedBill} onOpenChange={() => setSelectedBill(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice {selectedBill?.id}</DialogTitle>
            <DialogDescription>
              {selectedBill?.date} · {selectedBill?.doctor}
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-1">Invoice Date</p>
                  <p className="font-semibold text-sm">{selectedBill.date}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className={cn("font-semibold text-sm", getStatus(selectedBill) === "OVERDUE" && "text-red-600")}>
                    {selectedBill.dueDate}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border">
                <p className="text-xs text-muted-foreground mb-1">Doctor</p>
                <p className="font-semibold text-sm">{selectedBill.doctor}</p>
                <p className="text-xs text-muted-foreground">{selectedBill.department}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Items</p>
                <div className="border rounded-xl overflow-hidden divide-y">
                  {selectedBill.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-muted/20">
                      <span className="text-sm">{item.name}</span>
                      <span className="font-semibold text-sm">${item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${selectedBill.subtotal}</span>
                </div>
                {selectedBill.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-${selectedBill.discount}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${selectedBill.total}</span>
                </div>
              </div>

              {getStatus(selectedBill) === "PAID" && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-800 text-sm">Payment Complete</p>
                    {selectedBill.paymentMethod && (
                      <p className="text-xs text-emerald-700">via {selectedBill.paymentMethod}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            {selectedBill && getStatus(selectedBill) !== "PAID" && (
              <Button
                className="w-full sm:w-auto gap-2"
                disabled={payingBillId === selectedBill.id}
                onClick={() => { setSelectedBill(null); setConfirmPayBill(selectedBill) }}
              >
                <CreditCard className="h-4 w-4" />
                Pay ${selectedBill.total}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Confirmation Dialog */}
      <Dialog open={!!confirmPayBill} onOpenChange={() => setConfirmPayBill(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Confirm Payment
            </DialogTitle>
            <DialogDescription>
              You are about to pay <span className="font-semibold text-foreground">{confirmPayBill?.id}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-muted/30 border flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-lg">${confirmPayBill?.total}</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/30 border flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-blue-600 shrink-0" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Default card</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              Secured with 256-bit SSL encryption
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setConfirmPayBill(null)}>
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto gap-2"
              onClick={() => confirmPayBill && handlePay(confirmPayBill)}
            >
              <CreditCard className="h-4 w-4" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
