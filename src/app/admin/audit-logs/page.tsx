"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Search,
  Download,
  Shield,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Monitor,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const auditLogs = [
  { id: "LOG-001", user: "Dr. Sarah Wilson",  action: "Viewed patient record",     entity: "Patient #P-001",         ip: "192.168.1.101", timestamp: "2024-01-15 10:23:45", status: "SUCCESS",  category: "Patient" },
  { id: "LOG-002", user: "Admin User",         action: "Updated user role",         entity: "User #U-005",            ip: "192.168.1.102", timestamp: "2024-01-15 10:20:12", status: "SUCCESS",  category: "User" },
  { id: "LOG-003", user: "Reception Desk",     action: "Created appointment",       entity: "Appointment #A-089",     ip: "192.168.1.103", timestamp: "2024-01-15 10:15:30", status: "SUCCESS",  category: "Appointment" },
  { id: "LOG-004", user: "Dr. Michael Brown",  action: "Created prescription",      entity: "Prescription #RX-012",   ip: "192.168.1.104", timestamp: "2024-01-15 10:10:00", status: "SUCCESS",  category: "Medical" },
  { id: "LOG-005", user: "Pharmacy",           action: "Dispensed medication",      entity: "Prescription #RX-011",   ip: "192.168.1.105", timestamp: "2024-01-15 10:05:15", status: "SUCCESS",  category: "Pharmacy" },
  { id: "LOG-006", user: "Lab Dept",           action: "Uploaded lab results",      entity: "Lab Result #LR-045",     ip: "192.168.1.106", timestamp: "2024-01-15 10:00:00", status: "SUCCESS",  category: "Lab" },
  { id: "LOG-007", user: "Unknown",            action: "Failed login attempt",      entity: "Authentication",         ip: "192.168.1.200", timestamp: "2024-01-15 09:55:00", status: "FAILED",   category: "Auth" },
  { id: "LOG-008", user: "Admin User",         action: "Deleted user account",      entity: "User #U-010",            ip: "192.168.1.102", timestamp: "2024-01-15 09:50:00", status: "WARNING",  category: "User" },
  { id: "LOG-009", user: "System",             action: "Backup completed",          entity: "Database",               ip: "127.0.0.1",     timestamp: "2024-01-15 09:00:00", status: "SUCCESS",  category: "System" },
  { id: "LOG-010", user: "Unknown",            action: "Unauthorized access attempt",entity: "Admin Panel",           ip: "10.0.0.55",     timestamp: "2024-01-15 08:45:00", status: "FAILED",   category: "Auth" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  SUCCESS: { label: "Success", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle },
  FAILED:  { label: "Failed",  className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",                 icon: XCircle },
  WARNING: { label: "Warning", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",         icon: AlertTriangle },
}

const categoryIcon: Record<string, React.ElementType> = {
  Patient:     User,
  User:        User,
  Appointment: Clock,
  Medical:     Activity,
  Pharmacy:    Activity,
  Lab:         Activity,
  Auth:        Shield,
  System:      Monitor,
}

export default function AuditLogsPage() {
  const [search, setSearch]           = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = [...new Set(auditLogs.map(l => l.category))]

  const filtered = auditLogs.filter(log => {
    const q = search.toLowerCase()
    const matchSearch =
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.entity.toLowerCase().includes(q) ||
      log.ip.includes(q)
    const matchStatus   = statusFilter   === "all" || log.status   === statusFilter
    const matchCategory = categoryFilter === "all" || log.category === categoryFilter
    return matchSearch && matchStatus && matchCategory
  })

  const successCount = auditLogs.filter(l => l.status === "SUCCESS").length
  const failedCount  = auditLogs.filter(l => l.status === "FAILED").length
  const warnCount    = auditLogs.filter(l => l.status === "WARNING").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Track all system activities and user actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Logs exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Refreshed!")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Logs",  value: auditLogs.length, icon: Activity,      color: "bg-primary/10 text-primary" },
          { label: "Success",     value: successCount,     icon: CheckCircle,   color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Failed",      value: failedCount,      icon: XCircle,       color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
          { label: "Warnings",    value: warnCount,        icon: AlertTriangle, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
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

      {/* Failed attempts alert */}
      {failedCount > 0 && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800 dark:text-red-300">
              <strong>{failedCount} failed events</strong> detected. Review security logs for unauthorized access attempts.
            </p>
            <Button variant="outline" size="sm" className="ml-auto shrink-0 border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => setStatusFilter("FAILED")}>
              View Failed
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-base">Activity Log</CardTitle>
            <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-end">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, action, IP..."
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
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="WARNING">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filtered.length !== auditLogs.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {auditLogs.length} entries
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Entity</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">IP Address</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No logs found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(log => {
                    const cfg = statusConfig[log.status]
                    const StatusIcon = cfg.icon
                    const CatIcon = categoryIcon[log.category] ?? Activity
                    return (
                      <TableRow
                        key={log.id}
                        className={`transition-colors hover:bg-muted/40 ${log.status === "FAILED" ? "bg-red-50/50 dark:bg-red-900/5" : ""}`}
                      >
                        <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <User className="h-3 w-3 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium">{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CatIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm">{log.action}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {log.entity}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">
                          {log.ip}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${cfg.className} text-xs gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
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
