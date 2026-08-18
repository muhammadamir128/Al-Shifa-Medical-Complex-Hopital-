"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Building2,
  Globe,
  Save,
  Loader2,
  CreditCard,
  Bell,
  ShieldCheck,
  ToggleLeft,
  Receipt,
  Mail,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface GeneralSettings {
  hospitalName: string
  email: string
  phone: string
  address: string
  website: string
  timezone: string
  dateFormat: string
  timeFormat: string
  language: string
}

interface FeatureToggle {
  id: string
  label: string
  description: string
  enabled: boolean
  critical?: boolean
}

const initialFeatures: FeatureToggle[] = [
  { id: "booking",     label: "Online Appointment Booking", description: "Allow patients to book appointments online", enabled: true },
  { id: "email",       label: "Email Notifications",        description: "Send email notifications to users",          enabled: true },
  { id: "sms",         label: "SMS Notifications",          description: "Send SMS reminders for appointments",        enabled: false },
  { id: "portal",      label: "Patient Portal",             description: "Enable patient portal access",               enabled: true },
  { id: "payment",     label: "Online Payment",             description: "Accept online payments",                     enabled: true },
  { id: "maintenance", label: "Maintenance Mode",           description: "Put system in maintenance mode",             enabled: false, critical: true },
]

function SettingRow({ label, description, enabled, critical, onChange }: {
  label: string
  description: string
  enabled: boolean
  critical?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{label}</p>
          {critical && (
            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs">
              Critical
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onChange}
        className={critical ? "data-[state=checked]:bg-red-500" : ""}
      />
    </div>
  )
}

function CollapsibleCard({
  title,
  description,
  icon: Icon,
  children,
  className = "",
  defaultOpen = true,
}: {
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Card className={`border-none shadow-md overflow-hidden ${className}`}>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon className="h-4 w-4 text-primary" />
            {title}
          </CardTitle>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 0.3s ease, opacity 0.25s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <CardContent className="space-y-4">{children}</CardContent>
        </div>
      </div>
    </Card>
  )
}

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [features, setFeatures] = useState(initialFeatures)

  const [general, setGeneral] = useState<GeneralSettings>({
    hospitalName: "Al-Shifa Medical Complex",
    email:        "info@alshifamedical.com",
    phone:        "(555) 123-4567",
    address:      "456 Healthcare Ave, Medical City, MC 12345",
    website:      "www.alshifamedical.com",
    timezone:     "America/New_York",
    dateFormat:   "MM/DD/YYYY",
    timeFormat:   "12",
    language:     "en",
  })

  const toggleFeature = (id: string, enabled: boolean) =>
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled } : f))

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
    toast.success("Settings saved successfully!")
  }

  const tabIcons: Record<string, React.ElementType> = {
    general:       Building2,
    billing:       CreditCard,
    notifications: Bell,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure hospital-wide settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="h-auto p-1">
          {["general", "billing", "notifications"].map(tab => {
            const Icon = tabIcons[tab]
            return (
              <TabsTrigger key={tab} value={tab} className="flex items-center gap-2 capitalize px-4 py-2">
                <Icon className="h-4 w-4" />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* ── General ──────────────────────────────────────────────── */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hospital Information */}
            <CollapsibleCard icon={Building2} title="Hospital Information" description="Basic details about your hospital">
                {[
                  { id: "hospitalName", label: "Hospital Name",   type: "text",  key: "hospitalName" as const },
                  { id: "email",        label: "Email Address",   type: "email", key: "email" as const },
                  { id: "phone",        label: "Phone Number",    type: "tel",   key: "phone" as const },
                  { id: "address",      label: "Address",         type: "text",  key: "address" as const },
                  { id: "website",      label: "Website",         type: "url",   key: "website" as const },
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <Label htmlFor={f.id} className="text-sm">{f.label}</Label>
                    <Input
                      id={f.id}
                      type={f.type}
                      value={general[f.key]}
                      onChange={e => setGeneral({ ...general, [f.key]: e.target.value })}
                    />
                  </div>
                ))}
            </CollapsibleCard>

            {/* Regional Settings */}
            <CollapsibleCard icon={Globe} title="Regional Settings" description="Timezone and format preferences">
                <div className="space-y-1.5">
                  <Label className="text-sm">Timezone</Label>
                  <Select value={general.timezone} onValueChange={v => setGeneral({ ...general, timezone: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Date Format</Label>
                  <Select value={general.dateFormat} onValueChange={v => setGeneral({ ...general, dateFormat: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Time Format</Label>
                  <Select value={general.timeFormat} onValueChange={v => setGeneral({ ...general, timeFormat: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 Hour (AM/PM)</SelectItem>
                      <SelectItem value="24">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Language</Label>
                  <Select value={general.language} onValueChange={v => setGeneral({ ...general, language: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </CollapsibleCard>

            {/* System Features */}
            <CollapsibleCard icon={ToggleLeft} title="System Features" description="Enable or disable system-wide features" className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0">
                  <div className="divide-y">
                    {features.slice(0, 3).map(f => (
                      <SettingRow
                        key={f.id}
                        label={f.label}
                        description={f.description}
                        enabled={f.enabled}
                        critical={f.critical}
                        onChange={v => toggleFeature(f.id, v)}
                      />
                    ))}
                  </div>
                  <div className="divide-y">
                    {features.slice(3).map(f => (
                      <SettingRow
                        key={f.id}
                        label={f.label}
                        description={f.description}
                        enabled={f.enabled}
                        critical={f.critical}
                        onChange={v => toggleFeature(f.id, v)}
                      />
                    ))}
                  </div>
                </div>
            </CollapsibleCard>
          </div>
        </TabsContent>

        {/* ── Billing ──────────────────────────────────────────────── */}
        <TabsContent value="billing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CollapsibleCard icon={CreditCard} title="Payment Settings" description="Configure accepted payment options">
                <div className="space-y-1.5">
                  <Label className="text-sm">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="pkr">PKR (₨)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="taxRate" className="text-sm">Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" defaultValue="10" min="0" max="100" />
                </div>
                <Separator />
                <div className="space-y-1 divide-y">
                  {[
                    { label: "Accept Credit Cards", desc: "Allow credit/debit card payments", checked: true },
                    { label: "Accept Insurance",    desc: "Process insurance claims",          checked: true },
                    { label: "Accept Cash",         desc: "Accept cash at the counter",        checked: true },
                  ].map(item => (
                    <SettingRow
                      key={item.label}
                      label={item.label}
                      description={item.desc}
                      enabled={item.checked}
                      onChange={v => toast.info(`${item.label}: ${v ? "enabled" : "disabled"}`)}
                    />
                  ))}
                </div>
            </CollapsibleCard>

            <CollapsibleCard icon={Receipt} title="Invoice Settings" description="Customize invoice behavior and appearance">
                <div className="space-y-1.5">
                  <Label htmlFor="invoicePrefix" className="text-sm">Invoice Prefix</Label>
                  <Input id="invoicePrefix" defaultValue="INV-" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="paymentTerms" className="text-sm">Payment Terms (Days)</Label>
                  <Input id="paymentTerms" type="number" defaultValue="30" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lateFee" className="text-sm">Late Fee (%)</Label>
                  <Input id="lateFee" type="number" defaultValue="5" />
                </div>
                <Separator />
                <div className="space-y-1 divide-y">
                  {[
                    { label: "Auto-send Invoices",    desc: "Email invoices automatically on creation",  checked: true },
                    { label: "Payment Reminders",     desc: "Remind patients of due payments",           checked: true },
                  ].map(item => (
                    <SettingRow
                      key={item.label}
                      label={item.label}
                      description={item.desc}
                      enabled={item.checked}
                      onChange={v => toast.info(`${item.label}: ${v ? "enabled" : "disabled"}`)}
                    />
                  ))}
                </div>
            </CollapsibleCard>
          </div>
        </TabsContent>

        {/* ── Notifications ────────────────────────────────────────── */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CollapsibleCard icon={Mail} title="Email Notifications" description="Configure outgoing email triggers">
                <div className="divide-y">
                  {[
                    { label: "Appointment Confirmations", desc: "Send when appointment is confirmed",          checked: true },
                    { label: "Appointment Reminders",     desc: "Send 24 hours before appointment",           checked: true },
                    { label: "Lab Results Available",     desc: "Notify when lab results are ready",          checked: true },
                    { label: "Prescription Ready",        desc: "Notify when prescription is dispensed",      checked: true },
                    { label: "Payment Receipts",          desc: "Send payment confirmation emails",           checked: true },
                    { label: "Welcome Emails",            desc: "Send welcome email to new patients",         checked: false },
                  ].map(item => (
                    <SettingRow
                      key={item.label}
                      label={item.label}
                      description={item.desc}
                      enabled={item.checked}
                      onChange={v => toast.info(`${item.label}: ${v ? "enabled" : "disabled"}`)}
                    />
                  ))}
                </div>
            </CollapsibleCard>

            <CollapsibleCard icon={AlertTriangle} title="System Alerts" description="Configure internal system notification thresholds">
                <div className="divide-y">
                  {[
                    { label: "Low Stock Alerts",     desc: "Alert when medicine stock is low",         checked: true },
                    { label: "Critical Lab Results", desc: "Alert staff for critical test values",     checked: true },
                    { label: "System Errors",        desc: "Notify admins of system-level errors",     checked: true },
                    { label: "Security Alerts",      desc: "Notify of login failures & breaches",      checked: true },
                    { label: "Daily Reports",        desc: "Send automated daily summary reports",     checked: false },
                    { label: "SMS Alerts",           desc: "Send critical alerts via SMS",             checked: false },
                  ].map(item => (
                    <SettingRow
                      key={item.label}
                      label={item.label}
                      description={item.desc}
                      enabled={item.checked}
                      onChange={v => toast.info(`${item.label}: ${v ? "enabled" : "disabled"}`)}
                    />
                  ))}
                </div>
            </CollapsibleCard>

            {/* Info card */}
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10 lg:col-span-2">
              <CardContent className="p-4 flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">SMS Gateway Not Configured</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                    To enable SMS notifications, configure your Twilio or SMS gateway credentials in the integrations settings.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto shrink-0 border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => toast.info("Opening integrations...")}>
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
