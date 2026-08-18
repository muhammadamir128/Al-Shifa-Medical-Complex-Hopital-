"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Pill,
  ArrowLeft,
  Save,
  Loader2,
  Package,
  DollarSign,
  Calendar,
  MapPin,
  Hash,
  AlertCircle,
  CheckCircle2,
  FlaskConical,
  Building2,
  Layers,
  RotateCcw,
  Stethoscope,
  Thermometer,
} from "lucide-react"
import { toast } from "sonner"

const categories = [
  "Antibiotics", "Pain Relief", "Cardiovascular", "Diabetes",
  "Gastric", "Respiratory", "Neurological", "Vitamins & Supplements",
  "Antifungal", "Antivirals", "Hormones", "Ophthalmology", "Dermatology", "Other",
]

const dosageForms = [
  "Tablet", "Capsule", "Syrup", "Injection", "Cream / Ointment",
  "Drops", "Inhaler", "Patch", "Suppository", "Powder", "Other",
]

const unitOptions = ["Tablets", "Capsules", "Bottles", "Vials", "Tubes", "Boxes", "Strips", "Sachets"]

const storageConditions = [
  "Room Temperature (15–25°C)",
  "Cool & Dry (< 15°C)",
  "Refrigerated (2–8°C)",
  "Frozen (< 0°C)",
  "Protect from Light",
  "Protect from Moisture",
]

interface FormData {
  name: string
  genericName: string
  category: string
  dosageForm: string
  strength: string
  manufacturer: string
  batchNumber: string
  expiryDate: string
  quantity: string
  unit: string
  reorderLevel: string
  unitPrice: string
  location: string
  storageCondition: string
  prescriptionRequired: string
  description: string
}

const initialForm: FormData = {
  name: "", genericName: "", category: "", dosageForm: "",
  strength: "", manufacturer: "", batchNumber: "", expiryDate: "",
  quantity: "", unit: "Tablets", reorderLevel: "", unitPrice: "",
  location: "", storageCondition: "", prescriptionRequired: "no", description: "",
}

function Field({
  label, required, error, children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

export default function AddMedicinePage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialForm)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const set = (field: keyof FormData) => (value: string) =>
    setForm((p) => ({ ...p, [field]: value }))

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.genericName.trim()) e.genericName = "Required"
    if (!form.category) e.category = "Required"
    if (!form.dosageForm) e.dosageForm = "Required"
    if (!form.manufacturer.trim()) e.manufacturer = "Required"
    if (!form.batchNumber.trim()) e.batchNumber = "Required"
    if (!form.expiryDate) e.expiryDate = "Required"
    if (!form.quantity || Number(form.quantity) < 0) e.quantity = "Required"
    if (!form.reorderLevel || Number(form.reorderLevel) < 0) e.reorderLevel = "Required"
    if (!form.unitPrice || Number(form.unitPrice) < 0) e.unitPrice = "Required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) { toast.error("Please fix the errors before submitting."); return }
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    toast.success(`${form.name} added to inventory successfully!`)
    router.push("/pharmacy/inventory")
  }

  const totalValue = form.quantity && form.unitPrice && !isNaN(+form.quantity) && !isNaN(+form.unitPrice)
    ? (+form.quantity * +form.unitPrice).toFixed(2)
    : null

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" asChild>
            <Link href="/pharmacy/inventory"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Medicine</h1>
            <p className="text-sm text-muted-foreground">Fill in details to add to inventory</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setForm(initialForm); setErrors({}) }} disabled={isLoading}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />Reset
          </Button>
          <Button variant="gradient" size="sm" onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Saving...</>
              : <><Save className="mr-1.5 h-3.5 w-3.5" />Save Medicine</>}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT (2/3) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Basic Info */}
          <Card className="border-none shadow-sm">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Pill className="h-4 w-4 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Medicine Name" required error={errors.name}>
                  <div className="relative">
                    <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="name" placeholder="e.g. Amoxicillin 500mg" value={form.name} onChange={handleInput} className="pl-9 h-10" />
                  </div>
                </Field>

                <Field label="Generic Name" required error={errors.genericName}>
                  <div className="relative">
                    <FlaskConical className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="genericName" placeholder="e.g. Amoxicillin" value={form.genericName} onChange={handleInput} className="pl-9 h-10" />
                  </div>
                </Field>

                <Field label="Category" required error={errors.category}>
                  <Select value={form.category} onValueChange={set("category")}>
                    <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>

                <Field label="Dosage Form" required error={errors.dosageForm}>
                  <Select value={form.dosageForm} onValueChange={set("dosageForm")}>
                    <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select form" /></SelectTrigger>
                    <SelectContent>{dosageForms.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>

                <Field label="Strength / Concentration">
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="strength" placeholder="e.g. 500mg" value={form.strength} onChange={handleInput} className="pl-9 h-10" />
                  </div>
                </Field>

                <Field label="Manufacturer" required error={errors.manufacturer}>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="manufacturer" placeholder="e.g. Pfizer" value={form.manufacturer} onChange={handleInput} className="pl-9 h-10" />
                  </div>
                </Field>
              </div>

              <Field label="Description / Notes">
                <Textarea name="description" placeholder="Indications, side effects, special instructions..." value={form.description} onChange={handleInput} rows={3} className="resize-none text-sm" />
              </Field>
            </CardContent>
          </Card>

          {/* Stock & Pricing */}
          <Card className="border-none shadow-sm">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Package className="h-4 w-4 text-primary" />
                Stock & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="Opening Stock" required error={errors.quantity}>
                  <Input name="quantity" type="number" min={0} placeholder="0" value={form.quantity} onChange={handleInput} className="h-10" />
                </Field>

                <Field label="Unit">
                  <Select value={form.unit} onValueChange={set("unit")}>
                    <SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>{unitOptions.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>

                <Field label="Reorder Level" required error={errors.reorderLevel}>
                  <Input name="reorderLevel" type="number" min={0} placeholder="e.g. 50" value={form.reorderLevel} onChange={handleInput} className="h-10" />
                </Field>

                <Field label="Unit Price ($)" required error={errors.unitPrice}>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="unitPrice" type="number" min={0} step={0.01} placeholder="0.00" value={form.unitPrice} onChange={handleInput} className="pl-9 h-10" />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Prescription Required">
                  <Select value={form.prescriptionRequired} onValueChange={set("prescriptionRequired")}>
                    <SelectTrigger className="h-10 w-full">
                      <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes — Rx only</SelectItem>
                      <SelectItem value="no">No — OTC</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                {totalValue && (
                  <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 h-10 self-end">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">Total value:</span>
                    <span className="text-sm font-semibold text-primary">${totalValue}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT (1/3) ── */}
        <div className="space-y-5">

          {/* Batch & Expiry */}
          <Card className="border-none shadow-sm">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Hash className="h-4 w-4 text-primary" />
                Batch & Expiry
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-4">
              <Field label="Batch Number" required error={errors.batchNumber}>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="batchNumber" placeholder="e.g. BTH2024001" value={form.batchNumber} onChange={handleInput} className="pl-9 h-10" />
                </div>
              </Field>

              <Field label="Expiry Date" required error={errors.expiryDate}>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="expiryDate" type="date" value={form.expiryDate} onChange={handleInput} className="pl-9 h-10" min={new Date().toISOString().split("T")[0]} />
                </div>
              </Field>
            </CardContent>
          </Card>

          {/* Storage */}
          <Card className="border-none shadow-sm">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Thermometer className="h-4 w-4 text-primary" />
                Storage & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-4">
              <Field label="Shelf / Location">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="location" placeholder="e.g. Shelf A-12" value={form.location} onChange={handleInput} className="pl-9 h-10" />
                </div>
              </Field>

              <Field label="Storage Condition">
                <Select value={form.storageCondition} onValueChange={set("storageCondition")}>
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>{storageConditions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-none shadow-sm border-primary/10 bg-primary/[0.03]">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 space-y-3">
              {[
                { label: "Name", value: form.name || "—" },
                { label: "Category", value: form.category ? <Badge variant="outline" className="text-xs">{form.category}</Badge> : "—" },
                { label: "Form", value: form.dosageForm || "—" },
                { label: "Stock", value: form.quantity ? `${form.quantity} ${form.unit}` : "—" },
                { label: "Price", value: form.unitPrice ? `$${(+form.unitPrice).toFixed(2)}` : "—" },
                { label: "Expiry", value: form.expiryDate || "—" },
                { label: "Rx", value: form.prescriptionRequired === "yes" ? <Badge className="text-xs bg-amber-500">Rx Only</Badge> : <Badge variant="outline" className="text-xs">OTC</Badge> },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-right max-w-[160px] truncate">{value}</span>
                </div>
              ))}

              <Separator className="my-1" />

              <Button type="submit" variant="gradient" className="w-full h-10" disabled={isLoading} onClick={handleSubmit}>
                {isLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                  : <><Save className="mr-2 h-4 w-4" />Save Medicine</>}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
