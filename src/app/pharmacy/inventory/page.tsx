"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  Download,
  PackagePlus,
  Search,
  ShieldAlert,
  Truck,
} from "lucide-react"
import {
  getDaysUntilExpiry,
  getInventoryInsights,
  getInventoryStatus,
  getInventoryStatusLabel,
  getSupplierById,
  pharmacyInventory,
} from "@/lib/pharmacy-data"

const inventory = getInventoryInsights()
const categories = ["all", ...new Set(pharmacyInventory.map((medicine) => medicine.category))]
const statuses = ["all", "IN_STOCK", "LOW_STOCK", "CRITICAL", "OUT_OF_STOCK"]

export default function PharmacyInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredMedicines = useMemo(() => {
    return pharmacyInventory.filter((medicine) => {
      const status = getInventoryStatus(medicine.stock, medicine.reorderLevel)
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medicine Inventory</h1>
          <p className="text-muted-foreground">
            Track stock, supplier risk, expiry windows, and reorder readiness from one screen.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Snapshot
          </Button>
          <Button asChild>
            <Link href="/pharmacy/inventory/add">
              <PackagePlus className="mr-2 h-4 w-4" />
              Add Medicine
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Inventory Value", value: `$${Math.round(inventory.inventoryValue).toLocaleString()}`, helper: `${inventory.totalUnits.toLocaleString()} total units`, icon: Boxes },
          { title: "Low Stock", value: inventory.lowStock.length, helper: `${inventory.outOfStock.length} out of stock`, icon: AlertTriangle },
          { title: "Expiring Soon", value: inventory.expiringSoon.length, helper: "Within configured alert window", icon: ShieldAlert },
          { title: "Fast Moving SKUs", value: inventory.fastMoving.length, helper: "High-demand medicines", icon: Truck },
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px_200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
                placeholder="Search by medicine, generic name, or SKU..."
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : getInventoryStatusLabel(status as never)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Inventory Register</CardTitle>
            <CardDescription>{filteredMedicines.length} medicines match the current filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Health</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => {
                    const status = getInventoryStatus(medicine.stock, medicine.reorderLevel)
                    const fillRate = Math.min(100, Math.round((medicine.stock / medicine.maxStock) * 100))
                    const supplier = getSupplierById(medicine.supplierId)
                    const daysUntilExpiry = getDaysUntilExpiry(medicine.expiryDate)

                    return (
                      <TableRow key={medicine.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{medicine.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {medicine.id} • {medicine.genericName} • {medicine.location}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="w-fit">{medicine.category}</Badge>
                            <span className="text-xs text-muted-foreground">{medicine.dosageForm} • {medicine.strength}</span>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[180px]">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{medicine.stock} / {medicine.maxStock}</span>
                              <Badge variant={status === "IN_STOCK" ? "secondary" : "outline"}>
                                {getInventoryStatusLabel(status)}
                              </Badge>
                            </div>
                            <Progress value={fillRate} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Reorder at {medicine.reorderLevel} • ${medicine.unitPrice.toFixed(2)} per unit
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{supplier?.name ?? "Unknown supplier"}</p>
                            <p className="text-xs text-muted-foreground">
                              {supplier?.leadTimeDays ?? "-"} day lead time
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span>{medicine.expiryDate}</span>
                            <span className={`text-xs ${daysUntilExpiry <= 45 ? "text-amber-600" : "text-muted-foreground"}`}>
                              {daysUntilExpiry} days left
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Reorder
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Immediate Reorder List</CardTitle>
              <CardDescription>Medicines below safe refill threshold</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventory.lowStock.map((medicine) => (
                <div key={medicine.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Stock {medicine.stock} • Reorder {medicine.reorderLevel}
                      </p>
                    </div>
                    <Badge variant="outline">{getInventoryStatusLabel(getInventoryStatus(medicine.stock, medicine.reorderLevel))}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Expiry Watchlist</CardTitle>
              <CardDescription>Items that need shelf rotation or return planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventory.expiringSoon.map((medicine) => (
                <div key={medicine.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-xs text-muted-foreground">{medicine.batchNumber}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>{medicine.expiryDate}</p>
                      <p className="text-amber-600">{getDaysUntilExpiry(medicine.expiryDate)} days</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
