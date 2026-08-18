"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Banknote,
  CheckCircle2,
  Eye,
  FileText,
  Printer,
  Search,
  User,
} from "lucide-react"
import { getDispensedInsights, pharmacyDispensedRecords } from "@/lib/pharmacy-data"

const insights = getDispensedInsights()

export default function PharmacyDispensedPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredRecords = useMemo(() => {
    return pharmacyDispensedRecords.filter((record) => {
      const matchesSearch =
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPayment = paymentFilter === "all" || record.paymentStatus === paymentFilter
      return matchesSearch && matchesPayment
    })
  }, [searchTerm, paymentFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dispensed History</h1>
          <p className="text-muted-foreground">
            Monitor completed issues, payment follow-up, counseling completion, and top-selling medicines.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Daily Report
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Today", value: insights.todayRecords.length, helper: `$${Math.round(insights.todayRevenue).toLocaleString()} collected`, icon: CheckCircle2 },
          { title: "This Week", value: insights.weekRecords.length, helper: `$${Math.round(insights.weekRevenue).toLocaleString()} revenue`, icon: Banknote },
          { title: "Payment Follow-up", value: insights.paymentPending.length, helper: "Unpaid or partial bills", icon: FileText },
          { title: "Counseling Completion", value: `${insights.counselingCompletion}%`, helper: "Issue records with counseling done", icon: User },
        ].map((stat) => (
          <Card key={stat.title} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.helper}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
                placeholder="Search by issue ID, patient, or doctor..."
              />
            </div>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Dispensed Register</CardTitle>
            <CardDescription>{filteredRecords.length} issue records available in the current filter set</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.id}</p>
                          <p className="text-xs text-muted-foreground">{record.dispensedAt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.patient.name}</p>
                          <p className="text-xs text-muted-foreground">{record.doctor}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary" className="w-fit">{record.items.length} items</Badge>
                          <span className="text-xs text-muted-foreground">{record.collectionMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${record.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={record.paymentStatus === "PAID" ? "secondary" : "outline"}>
                          {record.paymentStatus.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{record.id}</DialogTitle>
                              <DialogDescription>
                                Dispensed by {record.dispensedBy} • {record.dispensedAt}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid gap-4 rounded-xl bg-muted/50 p-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">Patient</p>
                                  <p className="font-medium">{record.patient.name}</p>
                                  <p className="text-sm text-muted-foreground">{record.patient.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Doctor</p>
                                  <p className="font-medium">{record.doctor}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Collection</p>
                                  <p className="font-medium">{record.collectionMethod}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Payment</p>
                                  <Badge variant={record.paymentStatus === "PAID" ? "secondary" : "outline"}>
                                    {record.paymentStatus.replace(/_/g, " ")}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {record.items.map((item) => (
                                  <div key={`${record.id}-${item.name}`} className="rounded-xl border p-4">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Quantity {item.quantity} • ${item.price.toFixed(2)} each
                                        </p>
                                      </div>
                                      <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="rounded-xl border p-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Counseling Status</span>
                                  <Badge variant={record.counselingDone ? "secondary" : "outline"}>
                                    {record.counselingDone ? "Completed" : "Pending"}
                                  </Badge>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{record.notes}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Top Dispensed Medicines</CardTitle>
              <CardDescription>Highest volume issues across recent records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.topMedicines.map((medicine, index) => (
                <div key={medicine.name} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <p className="font-medium">{index + 1}. {medicine.name}</p>
                    <p className="text-xs text-muted-foreground">{medicine.quantity} units moved</p>
                  </div>
                  <span className="font-semibold">${Math.round(medicine.revenue).toLocaleString()}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-primary/5">
            <CardHeader>
              <CardTitle>Cashier Follow-up</CardTitle>
              <CardDescription>Dispensed items that still need payment closure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.paymentPending.map((record) => (
                <div key={record.id} className="rounded-xl border bg-background p-3">
                  <p className="font-medium">{record.id} • {record.patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {record.paymentStatus.replace(/_/g, " ")} • ${record.totalAmount.toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
