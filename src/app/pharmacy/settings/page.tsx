"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BellRing,
  Clock3,
  Save,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { pharmacySettings, pharmacySuppliers } from "@/lib/pharmacy-data"

export default function PharmacySettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pharmacy Settings</h1>
          <p className="text-muted-foreground">
            Operational controls for alerts, safety checks, queue targets, and supplier coordination.
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Dispensing Controls</CardTitle>
            <CardDescription>Safety and workflow toggles currently applied to the pharmacy desk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Dispensing safety checks", description: "Require final validation before dispensing any medication.", enabled: pharmacySettings.dispensingSafetyChecks, icon: ShieldCheck },
              { label: "Counseling for new prescriptions", description: "Prompt counseling for newly issued or changed medications.", enabled: pharmacySettings.requireCounselingForNewRx, icon: BellRing },
              { label: "Auto-flag expiring stock", description: "Raise alerts when medicines enter the expiry risk window.", enabled: pharmacySettings.autoFlagExpiringStock, icon: Clock3 },
              { label: "Allow partial dispense", description: "Enable partial issue when all items are not currently available.", enabled: pharmacySettings.allowPartialDispense, icon: Truck },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4 rounded-xl border p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch checked={item.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Live Thresholds</CardTitle>
            <CardDescription>Current pharmacy control targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Low stock alert threshold</Label>
              <Input value={pharmacySettings.lowStockAlertThreshold} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Expiry alert window</Label>
              <Input value={`${pharmacySettings.expiryAlertDays} days`} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Operating hours</Label>
              <Input value={pharmacySettings.operatingHours} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Queue target</Label>
              <Input value={`${pharmacySettings.queueTargetMins} mins`} readOnly />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Supplier Contacts</CardTitle>
          <CardDescription>Preferred vendors with delivery reliability and open order load</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pharmacySuppliers.map((supplier) => (
            <div key={supplier.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{supplier.name}</p>
                <Badge variant="outline">{supplier.reliability}% reliable</Badge>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>Contact: {supplier.contact}</p>
                <p>Phone: {supplier.phone}</p>
                <p>Lead time: {supplier.leadTimeDays} days</p>
                <p>Open orders: {supplier.openOrders}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
