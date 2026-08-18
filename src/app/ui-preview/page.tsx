"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Settings,
  User,
  Mail,
  Lock,
  CreditCard,
  Palette,
  Globe,
  Shield,
  HelpCircle,
} from "lucide-react"

export default function UIPreviewPage() {
  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">UI Component Preview</h1>
            <p className="text-muted-foreground">
              A showcase of all UI components used in this Hospital Management System
            </p>
          </div>

          {/* Buttons */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Input fields, selects, and other form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notifications</Label>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">Marketing emails</Label>
                    <Switch id="marketing" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <Progress value={66} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge className="bg-green-100 text-green-800">Success</Badge>
                <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                <Badge className="bg-blue-100 text-blue-800">Info</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Container components for content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 text-center">
                    <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Patient Card</p>
                    <p className="text-sm text-muted-foreground">View patient details</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Doctor Card</p>
                    <p className="text-sm text-muted-foreground">View doctor profile</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Billing Card</p>
                    <p className="text-sm text-muted-foreground">View billing info</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Avatars */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
              <CardDescription>User profile images and initials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarFallback>LC</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Organized content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border rounded-lg mt-4">
                  <p className="text-muted-foreground">Overview content goes here</p>
                </TabsContent>
                <TabsContent value="details" className="p-4 border rounded-lg mt-4">
                  <p className="text-muted-foreground">Details content goes here</p>
                </TabsContent>
                <TabsContent value="history" className="p-4 border rounded-lg mt-4">
                  <p className="text-muted-foreground">History content goes here</p>
                </TabsContent>
                <TabsContent value="settings" className="p-4 border rounded-lg mt-4">
                  <p className="text-muted-foreground">Settings content goes here</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Role Colors */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Role-Based Color Themes</CardTitle>
              <CardDescription>Each role has a unique color theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { role: "Admin", color: "bg-teal-500", desc: "Teal/Green" },
                  { role: "Doctor", color: "bg-emerald-500", desc: "Emerald" },
                  { role: "Nurse", color: "bg-cyan-500", desc: "Cyan" },
                  { role: "Receptionist", color: "bg-amber-500", desc: "Amber" },
                  { role: "Pharmacist", color: "bg-purple-500", desc: "Purple" },
                  { role: "Lab Tech", color: "bg-rose-500", desc: "Rose" },
                  { role: "Patient", color: "bg-orange-500", desc: "Orange" },
                  { role: "Super Admin", color: "bg-teal-600", desc: "Dark Teal" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className={`h-8 w-8 rounded-lg ${item.color}`} />
                    <div>
                      <p className="font-medium">{item.role}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Icons */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Common Icons</CardTitle>
              <CardDescription>Icons used throughout the application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: User, name: "User" },
                  { icon: Bell, name: "Bell" },
                  { icon: Settings, name: "Settings" },
                  { icon: Mail, name: "Mail" },
                  { icon: Lock, name: "Lock" },
                  { icon: CreditCard, name: "Card" },
                  { icon: Palette, name: "Palette" },
                  { icon: Globe, name: "Globe" },
                  { icon: Shield, name: "Shield" },
                  { icon: HelpCircle, name: "Help" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
