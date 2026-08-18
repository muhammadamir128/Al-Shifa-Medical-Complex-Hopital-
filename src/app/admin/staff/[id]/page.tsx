"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  UserCog,
  MapPin,
  Award,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const staff = {
  id: "STF-001",
  name: "Robert Johnson",
  email: "robert.johnson@hospital.com",
  phone: "(555) 345-6789",
  role: "Receptionist",
  department: "Front Desk",
  shift: "Morning (08:00 - 16:00)",
  employeeId: "EMP-2024-012",
  joiningDate: "2020-05-15",
  experience: "4 years",
  status: "Active",
  address: "456 Oak Street, Springfield, IL 62703",
  emergencyContact: "Mary Johnson - (555) 345-6790",
  qualifications: ["Bachelor of Administration", "Customer Service Certificate"],
  avatar: "RJ",
}

const activityLog = [
  { date: "2024-01-20", action: "Registered new patient: John Smith", type: "Registration" },
  { date: "2024-01-20", action: "Booked appointment for Emily Davis", type: "Appointment" },
  { date: "2024-01-19", action: "Updated patient record: Robert Wilson", type: "Update" },
  { date: "2024-01-19", action: "Processed billing for INV-2024-001", type: "Billing" },
  { date: "2024-01-18", action: "Registered new patient: Sarah Miller", type: "Registration" },
]

const attendance = [
  { week: "Jan 15-19", present: 5, absent: 0, late: 0, overtime: 2 },
  { week: "Jan 08-12", present: 4, absent: 1, late: 0, overtime: 0 },
  { week: "Jan 01-05", present: 5, absent: 0, late: 1, overtime: 1 },
  { week: "Dec 25-29", present: 3, absent: 0, late: 0, overtime: 0 },
]

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30",
  Inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800",
  "On Leave": "bg-amber-100 text-amber-800 dark:bg-amber-900/30",
}

const activityTypeColors: Record<string, string> = {
  Registration: "bg-blue-100 text-blue-700",
  Appointment: "bg-emerald-100 text-emerald-700",
  Update: "bg-amber-100 text-amber-700",
  Billing: "bg-purple-100 text-purple-700",
}

export default function StaffDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/staff">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff Profile</h1>
            <p className="text-muted-foreground">View complete staff member information</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/admin/staff/${params.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Staff
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {staff.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{staff.name}</h2>
                <Badge variant="outline">{staff.employeeId}</Badge>
                <Badge className={statusColors[staff.status] ?? ""}>{staff.status}</Badge>
              </div>
              <p className="text-primary font-medium mt-1">{staff.role}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{staff.department}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{staff.shift}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Joined: {staff.joiningDate}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{staff.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{staff.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Tasks This Week", value: "47", icon: CheckCircle2, color: "bg-primary/10 text-primary" },
          { label: "Patients Handled", value: "128", icon: Activity, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Experience", value: staff.experience, icon: Award, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
          { label: "Attendance Rate", value: "96%", icon: Shield, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityLog.map((log, i) => (
                      <div key={i} className="flex items-start justify-between p-3 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <Badge className={`${activityTypeColors[log.type] ?? ""} text-xs shrink-0`}>
                            {log.type}
                          </Badge>
                          <p className="text-sm">{log.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{log.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Attendance Record
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Week</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Late</TableHead>
                        <TableHead>Overtime</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendance.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{row.week}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="h-4 w-4" /> {row.present}
                            </span>
                          </TableCell>
                          <TableCell>
                            {row.absent > 0
                              ? <span className="flex items-center gap-1 text-red-500"><AlertCircle className="h-4 w-4" /> {row.absent}</span>
                              : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell>
                            {row.late > 0
                              ? <span className="text-amber-600">{row.late}</span>
                              : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell>
                            {row.overtime > 0
                              ? <Badge variant="outline" className="text-xs">{row.overtime}h extra</Badge>
                              : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><UserCog className="h-5 w-5" />Staff Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-medium mt-0.5">{staff.department}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Shift</p>
                <p className="font-medium mt-0.5">{staff.shift}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium mt-0.5 flex items-start gap-1">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                  {staff.address}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Emergency Contact</p>
                <p className="font-medium mt-0.5">{staff.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Award className="h-5 w-5" />Qualifications</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {staff.qualifications.map((q, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{q}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push(`/admin/staff/${params.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/appointments">
                  <Calendar className="mr-2 h-4 w-4" />View Appointments
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={() => router.push(`/admin/staff/${params.id}/edit`)}>
                <AlertCircle className="mr-2 h-4 w-4" />Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
