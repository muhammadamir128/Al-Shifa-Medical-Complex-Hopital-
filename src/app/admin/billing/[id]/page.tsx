"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  ArrowLeft,
  Printer,
  Mail,
  Download,
  DollarSign,
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Receipt,
  Building2,
  Phone,
  AlertCircle,
  Save,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

const invoice = {
  id: "INV-001",
  patient: "John Smith",
  patientId: "PAT-001",
  patientEmail: "john.smith@email.com",
  patientPhone: "(555) 234-5678",
  doctor: "Dr. Sarah Wilson",
  department: "Cardiology",
  appointmentDate: "2024-01-15",
  appointmentTime: "09:00 AM",
  issueDate: "2024-01-15",
  dueDate: "2024-01-29",
  status: "PAID",
  paymentMethod: "Credit Card",
  paymentDate: "2024-01-15",
  subtotal: 420.00,
  discount: 0,
  tax: 30.00,
  grandTotal: 450.00,
  notes: "Full payment received. Thank you.",
  items: [
    { description: "Consultation Fee", quantity: 1, unitPrice: 200.00, total: 200.00 },
    { description: "ECG Test", quantity: 1, unitPrice: 80.00, total: 80.00 },
    { description: "Blood Panel (CBC)", quantity: 1, unitPrice: 120.00, total: 120.00 },
    { description: "Prescription", quantity: 1, unitPrice: 20.00, total: 20.00 },
  ],
}

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle }> = {
  PAID:           { label: "Paid",           className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30", icon: CheckCircle },
  PENDING:        { label: "Pending",        className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30",       icon: Clock },
  OVERDUE:        { label: "Overdue",        className: "bg-red-100 text-red-800 dark:bg-red-900/30",             icon: AlertCircle },
  PARTIALLY_PAID: { label: "Partial",        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30",          icon: CreditCard },
  CANCELLED:      { label: "Cancelled",      className: "bg-gray-100 text-gray-600 dark:bg-gray-800",             icon: XCircle },
}

export default function BillingDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(invoice.status)
  const cfg = statusConfig[status] ?? statusConfig["PENDING"]
  const StatusIcon = cfg.icon

  const handleSaveStatus = () => {
    toast.success(`Invoice ${params.id} status updated to ${cfg.label}`)
  }

  const handlePrint = () => {
    toast.info("Preparing invoice for printing...")
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/billing">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invoice {params.id}</h1>
            <p className="text-muted-foreground">Billing details and payment information</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success(`Invoice emailed to ${invoice.patientEmail}`)}>
            <Mail className="mr-2 h-4 w-4" />Email
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Downloading PDF...")}>
            <Download className="mr-2 h-4 w-4" />Download PDF
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={`border-none shadow-md ${status === "PAID" ? "border-l-4 border-l-emerald-500" : status === "OVERDUE" ? "border-l-4 border-l-red-500" : "border-l-4 border-l-amber-500"}`}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${cfg.className}`}>
                <StatusIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Invoice {invoice.id}</p>
                <p className="text-sm text-muted-foreground">
                  Issued {invoice.issueDate} · Due {invoice.dueDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${cfg.className} text-sm px-3 py-1`}>{cfg.label}</Badge>
              <p className="text-2xl font-bold">${invoice.grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />PATIENT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="font-semibold">{invoice.patient}</p>
                <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
                <p className="text-sm flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  {invoice.patientEmail}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {invoice.patientPhone}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />APPOINTMENT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="font-semibold">{invoice.doctor}</p>
                <p className="text-sm text-primary">{invoice.department}</p>
                <p className="text-sm flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {invoice.appointmentDate} at {invoice.appointmentTime}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Line Items */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />Invoice Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Description</TableHead>
                    <TableHead className="text-right font-semibold">Qty</TableHead>
                    <TableHead className="text-right font-semibold">Unit Price</TableHead>
                    <TableHead className="text-right font-semibold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals */}
              <div className="mt-4 flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${invoice.subtotal.toFixed(2)}</span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-${invoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${invoice.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Grand Total</span>
                    <span>${invoice.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {invoice.notes && (
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Status */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Payment Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={handleSaveStatus}>
                <Save className="mr-2 h-4 w-4" />Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Payment Info</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5" />
                  {invoice.paymentMethod}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date</span>
                <span className="font-medium">{invoice.paymentDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Due</span>
                <span className="font-bold text-base flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  {invoice.grandTotal.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.success(`Reminder sent to ${invoice.patient}`)}>
                <Mail className="mr-2 h-4 w-4" />Send Payment Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/patients/${invoice.patientId}`}>
                  <User className="mr-2 h-4 w-4" />View Patient Profile
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => toast.error("Invoice void — change status above")}>
                <XCircle className="mr-2 h-4 w-4" />Void Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
