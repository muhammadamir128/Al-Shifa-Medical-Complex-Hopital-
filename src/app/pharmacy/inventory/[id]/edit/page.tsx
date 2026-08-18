"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  Pill,
  Package,
  AlertCircle,
  Calendar,
  DollarSign,
  Building2,
  Hash,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const item = {
  id: "MED-001",
  name: "Metformin",
  genericName: "Metformin Hydrochloride",
  strength: "500mg",
  form: "Tablet",
  category: "Antidiabetic",
  manufacturer: "Sun Pharmaceuticals",
  batchNumber: "SUN-2024-045",
  quantity: 450,
  minStock: 100,
  unitPrice: 0.45,
  expiryDate: "2025-06-30",
  location: "Shelf A3",
  description: "Metformin is used to treat type 2 diabetes. It works by decreasing glucose production in the liver and improving insulin sensitivity.",
  storage: "Store below 30°C in a dry place, away from direct sunlight.",
  status: "ACTIVE",
}

const categories = ["Antidiabetic", "Antihypertensive", "Antibiotic", "Analgesic", "Anticoagulant", "Cardiovascular", "Respiratory", "Neurological", "Vitamins", "Other"]
const forms = ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops", "Inhaler", "Patch"]

export default function PharmacyInventoryEditPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [name, setName] = useState(item.name)
  const [genericName, setGenericName] = useState(item.genericName)
  const [strength, setStrength] = useState(item.strength)
  const [form, setForm] = useState(item.form)
  const [category, setCategory] = useState(item.category)
  const [manufacturer, setManufacturer] = useState(item.manufacturer)
  const [batchNumber, setBatchNumber] = useState(item.batchNumber)
  const [quantity, setQuantity] = useState(item.quantity.toString())
  const [minStock, setMinStock] = useState(item.minStock.toString())
  const [unitPrice, setUnitPrice] = useState(item.unitPrice.toString())
  const [expiryDate, setExpiryDate] = useState(item.expiryDate)
  const [location, setLocation] = useState(item.location)
  const [description, setDescription] = useState(item.description)
  const [storage, setStorage] = useState(item.storage)

  const isLowStock = parseInt(quantity) <= item.minStock

  const handleSave = () => {
    toast({ title: "Inventory item updated", description: `${name} has been updated successfully.` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/pharmacy/inventory">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Inventory Item</h1>
            <p className="text-muted-foreground">Update medication details and stock information</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pharmacy/inventory">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />Save Changes
          </Button>
        </div>
      </div>

      {/* Item Identity */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Pill className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{name} <span className="text-primary">{strength}</span></h2>
                <Badge variant="outline" className="font-mono text-xs">{item.id}</Badge>
                {isLowStock && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />Low Stock
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{genericName} · {form} · {category}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Brand Name <span className="text-destructive">*</span></Label>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Generic Name</Label>
                  <Input value={genericName} onChange={e => setGenericName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Strength <span className="text-destructive">*</span></Label>
                  <Input value={strength} onChange={e => setStrength(e.target.value)} placeholder="e.g. 500mg" />
                </div>
                <div className="space-y-1.5">
                  <Label>Dosage Form</Label>
                  <Select value={form} onValueChange={setForm}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {forms.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Manufacturer</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Storage Instructions</Label>
                <Textarea rows={2} value={storage} onChange={e => setStorage(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />Stock Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Current Quantity <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="number" min="0" value={quantity} onChange={e => setQuantity(e.target.value)} />
                  </div>
                  {isLowStock && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />Below minimum stock level ({minStock})
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Minimum Stock Level</Label>
                  <Input type="number" min="0" value={minStock} onChange={e => setMinStock(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Unit Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="number" min="0" step="0.01" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Storage Location</Label>
                  <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Shelf A3" />
                </div>
                <div className="space-y-1.5">
                  <Label>Batch Number</Label>
                  <Input value={batchNumber} onChange={e => setBatchNumber(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Stock Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Qty</span>
                <span className={`font-bold ${isLowStock ? "text-red-600" : "text-emerald-600"}`}>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Stock</span>
                <span className="font-medium">{minStock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit Price</span>
                <span className="font-medium">${parseFloat(unitPrice || "0").toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value</span>
                <span className="font-bold">${(parseInt(quantity || "0") * parseFloat(unitPrice || "0")).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires</span>
                <span className="font-medium">{expiryDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Restock</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Add units to current stock</p>
              <Input type="number" min="1" placeholder="Units to add" />
              <Button className="w-full" variant="outline"
                onClick={() => toast({ title: "Restock request submitted" })}>
                <Package className="mr-2 h-4 w-4" />Submit Restock Order
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />Save Changes
            </Button>
            <Link href="/pharmacy/inventory">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
