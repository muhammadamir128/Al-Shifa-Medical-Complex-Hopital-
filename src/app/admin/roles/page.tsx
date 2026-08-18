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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Shield,
  Search,
  Plus,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const PERMISSIONS = [
  "Users", "Patients", "Doctors", "Appointments", "Prescriptions",
  "Lab Requests", "Medical Records", "Billing", "Reports", "Settings",
  "Inventory", "Audit Logs",
]

const roleColors: Record<string, string> = {
  "Super Admin":    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Admin":          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Doctor":         "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Nurse":          "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Receptionist":   "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Pharmacist":     "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Lab Technician": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Patient":        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

const roles = [
  { id: "ROLE-001", name: "Super Admin",    description: "Full system access with all permissions",           users: 2,    permissions: PERMISSIONS,                                                               status: "Active", locked: true },
  { id: "ROLE-002", name: "Admin",          description: "Administrative access with most permissions",       users: 5,    permissions: ["Users","Patients","Doctors","Reports","Settings"],                      status: "Active", locked: false },
  { id: "ROLE-003", name: "Doctor",         description: "Medical professional access",                       users: 48,   permissions: ["Patients","Appointments","Prescriptions","Lab Requests","Medical Records"], status: "Active", locked: false },
  { id: "ROLE-004", name: "Nurse",          description: "Nursing staff access",                              users: 65,   permissions: ["Patients","Vitals","Medications","Tasks"],                              status: "Active", locked: false },
  { id: "ROLE-005", name: "Receptionist",   description: "Front desk operations access",                      users: 12,   permissions: ["Appointments","Patients","Billing"],                                    status: "Active", locked: false },
  { id: "ROLE-006", name: "Pharmacist",     description: "Pharmacy operations access",                        users: 8,    permissions: ["Inventory","Prescriptions","Dispensing"],                               status: "Active", locked: false },
  { id: "ROLE-007", name: "Lab Technician", description: "Laboratory operations access",                      users: 15,   permissions: ["Test Requests","Results","Reports"],                                    status: "Active", locked: false },
  { id: "ROLE-008", name: "Patient",        description: "Patient portal access",                             users: 1234, permissions: ["Profile","Appointments","Medical History","Bills"],                     status: "Active", locked: true },
]

type RoleEntry = (typeof roles)[number]

function EditRoleDialogInner({ onOpenChange, editRole }: { onOpenChange: (v: boolean) => void; editRole: RoleEntry }) {
  const [localPerms, setLocalPerms] = useState<Record<string, boolean>>(
    Object.fromEntries(PERMISSIONS.map(p => [p, editRole.permissions.includes(p)]))
  )
  const togglePerm = (p: string) => setLocalPerms(prev => ({ ...prev, [p]: !prev[p] }))
  const selectedCount = Object.values(localPerms).filter(Boolean).length

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Role: {editRole.name}</DialogTitle>
        <DialogDescription>Update permissions for this role.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Role Name</Label>
            <Input defaultValue={editRole.name} disabled={editRole.locked} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input defaultValue={editRole.description} disabled={editRole.locked} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold">Permissions</Label>
            <span className="text-xs text-muted-foreground">{selectedCount} of {PERMISSIONS.length} selected</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border bg-muted/20">
            {PERMISSIONS.map(perm => (
              <div key={perm} className="flex items-center justify-between gap-2 bg-background rounded-md p-2 border">
                <Label htmlFor={`edit-perm-${perm}`} className="text-xs cursor-pointer">{perm}</Label>
                <Switch
                  id={`edit-perm-${perm}`}
                  checked={!!localPerms[perm]}
                  onCheckedChange={() => togglePerm(perm)}
                  disabled={editRole.locked}
                />
              </div>
            ))}
          </div>
          {editRole.locked && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Lock className="h-3 w-3" /> System roles cannot be modified.
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button
          disabled={editRole.locked}
          onClick={() => { onOpenChange(false); toast.success(`Role "${editRole.name}" updated!`) }}
        >
          Save Changes
        </Button>
      </DialogFooter>
    </>
  )
}

function EditRoleDialog({ open, onOpenChange, role: editRole }: { open: boolean; onOpenChange: (v: boolean) => void; role: RoleEntry | null }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {editRole && <EditRoleDialogInner key={editRole.id} onOpenChange={onOpenChange} editRole={editRole} />}
      </DialogContent>
    </Dialog>
  )
}

function CreateRoleDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [perms, setPerms] = useState<Record<string, boolean>>({})

  const togglePerm = (p: string) => setPerms(prev => ({ ...prev, [p]: !prev[p] }))
  const selectedCount = Object.values(perms).filter(Boolean).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>Define a new role and its permissions.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" placeholder="e.g. Lab Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDesc">Description</Label>
              <Input id="roleDesc" placeholder="Brief description" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold">Permissions</Label>
              <span className="text-xs text-muted-foreground">{selectedCount} of {PERMISSIONS.length} selected</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border bg-muted/20">
              {PERMISSIONS.map(perm => (
                <div key={perm} className="flex items-center justify-between gap-2 bg-background rounded-md p-2 border">
                  <Label htmlFor={`perm-${perm}`} className="text-xs cursor-pointer">{perm}</Label>
                  <Switch
                    id={`perm-${perm}`}
                    checked={!!perms[perm]}
                    onCheckedChange={() => togglePerm(perm)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onOpenChange(false); toast.success("Role created successfully!") }}>
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminRolesPage() {
  const [search, setSearch]             = useState("")
  const [isAddOpen, setIsAddOpen]       = useState(false)
  const [isEditOpen, setIsEditOpen]     = useState(false)
  const [editingRole, setEditingRole]   = useState<(typeof roles)[number] | null>(null)

  const openEdit = (role: (typeof roles)[number]) => {
    setEditingRole(role)
    setIsEditOpen(true)
  }

  const filtered = roles.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">Define roles and control access permissions</p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <CreateRoleDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
      <EditRoleDialog open={isEditOpen} onOpenChange={setIsEditOpen} role={editingRole} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Roles",  value: roles.length,                                    icon: Shield,      color: "bg-primary/10 text-primary" },
          { label: "Total Users",  value: roles.reduce((a, r) => a + r.users, 0).toLocaleString(), icon: Users, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Active Roles", value: roles.filter(r => r.status === "Active").length, icon: CheckCircle, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
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

      {/* Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-base">All Roles</CardTitle>
            <div className="relative flex-1 max-w-sm sm:ml-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-8"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          {filtered.length !== roles.length && (
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {roles.length} roles
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Permissions</TableHead>
                  <TableHead className="text-center font-semibold">Users</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No roles found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(role => (
                    <TableRow key={role.id} className="transition-colors hover:bg-muted/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {role.locked ? (
                              <Lock className="h-4 w-4 text-primary" />
                            ) : (
                              <Shield className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <Badge className={`${roleColors[role.name] ?? roleColors["Patient"]} text-xs font-semibold`}>
                              {role.name}
                            </Badge>
                            {role.locked && (
                              <p className="text-xs text-muted-foreground mt-0.5">System role</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs">
                        {role.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.permissions.slice(0, 3).map((perm, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{role.users.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={role.locked}
                            onClick={() => openEdit(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                disabled={role.locked}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the <strong>{role.name}</strong> role?
                                  This will affect {role.users} users assigned to this role.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => toast.error(`Role "${role.name}" deleted`)}
                                >
                                  Delete Role
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
