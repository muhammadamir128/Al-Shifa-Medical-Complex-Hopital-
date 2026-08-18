"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Pill,
  Package,
  AlertTriangle,
  DollarSign,
  Search,
  Plus,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const medications = [
  { id: "MED001", name: "Amoxicillin 500mg",  category: "Antibiotic",     stock: 500, minStock: 100, price: 15.99, status: "In Stock" },
  { id: "MED002", name: "Ibuprofen 400mg",    category: "Pain Relief",     stock: 1000,minStock: 200, price: 8.50,  status: "In Stock" },
  { id: "MED003", name: "Metformin 500mg",    category: "Diabetes",        stock: 45,  minStock: 50,  price: 12.00, status: "Low Stock" },
  { id: "MED004", name: "Lisinopril 10mg",    category: "Blood Pressure",  stock: 0,   minStock: 50,  price: 20.00, status: "Out of Stock" },
  { id: "MED005", name: "Omeprazole 20mg",    category: "Gastric",         stock: 400, minStock: 100, price: 18.00, status: "In Stock" },
  { id: "MED006", name: "Aspirin 100mg",      category: "Cardiovascular",  stock: 20,  minStock: 100, price: 5.50,  status: "Critical" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  "In Stock":     { label: "In Stock",     className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle },
  "Low Stock":    { label: "Low Stock",    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",         icon: AlertTriangle },
  "Out of Stock": { label: "Out of Stock", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",                 icon: XCircle },
  "Critical":     { label: "Critical",     className: "bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-200 border border-red-400", icon: AlertCircle },
}

function stockPercent(stock: number, minStock: number) {
  return Math.min(100, Math.round((stock / (minStock * 3)) * 100))
}

function stockBarColor(status: string) {
  if (status === "In Stock")     return "bg-emerald-500"
  if (status === "Low Stock")    return "bg-amber-500"
  return "bg-red-500"
}

export default function AdminPharmacyPage() {
  const [search, setSearch]             = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddOpen, setIsAddOpen]       = useState(false)

  const categories = [...new Set(medications.map(m => m.category))]

  const filtered = medications.filter(m => {
    const q = search.toLowerCase()
    const matchSearch =
      m.name.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    const matchCategory = categoryFilter === "all" || m.category === categoryFilter
    const matchStatus   = statusFilter   === "all" || m.status   === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  const totalValue = medications.reduce((acc, m) => acc + m.stock * m.price, 0)
  const lowStock   = medications.filter(m => m.status === "Low Stock" || m.status === "Critical").length
  const outOfStock = medications.filter(m => m.status === "Out of Stock").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pharmacy Management</h1>
          <p className="text-muted-foreground">Monitor inventory, stock levels, and reorders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Inventory exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Medicine</DialogTitle>
                <DialogDescription>Enter the medication details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="med-name">Medicine Name</Label>
                  <Input id="med-name" placeholder="e.g. Amoxicillin 500mg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="med-price">Unit Price ($)</Label>
                    <Input id="med-price" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="med-stock">Initial Stock</Label>
                    <Input id="med-stock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="med-min">Minimum Stock</Label>
                    <Input id="med-min" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-exp">Expiry Date</Label>
                  <Input id="med-exp" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsAddOpen(false); toast.success("Medicine added!") }}>
                  Add Medicine
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Medicines",   value: medications.length, icon: Package,      color: "bg-primary/10 text-primary" },
          { label: "Low / Critical",    value: lowStock,           icon: AlertTriangle, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Out of Stock",      value: outOfStock,         icon: XCircle,      color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
          { label: "Inventory Value",   value: `$${(totalValue / 1000).toFixed(1)}K`, icon: DollarSign, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
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
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Low stock alert banner */}
      {(lowStock > 0 || outOfStock > 0) && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/10">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>{lowStock} medicines</strong> are low/critical and{" "}
              <strong>{outOfStock} medicines</strong> are out of stock. Please initiate reorders.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-base">Inventory Status</CardTitle>
            <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-end">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  className="pl-8"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== medications.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {medications.length} medicines
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Medicine</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Stock Level</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Unit Price</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No medicines found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(med => {
                    const cfg = statusConfig[med.status]
                    const StatusIcon = cfg.icon
                    const pct = stockPercent(med.stock, med.minStock)
                    return (
                      <TableRow key={med.id} className="transition-colors hover:bg-muted/40">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Pill className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{med.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{med.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">{med.category}</TableCell>
                        <TableCell>
                          <div className="w-36">
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="font-medium">{med.stock} units</span>
                              <span className="text-muted-foreground">Min: {med.minStock}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${stockBarColor(med.status)}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell font-medium text-sm">
                          ${med.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${cfg.className} text-xs gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => toast.success(`Reorder initiated for ${med.name}`)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Reorder
                          </Button>
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
