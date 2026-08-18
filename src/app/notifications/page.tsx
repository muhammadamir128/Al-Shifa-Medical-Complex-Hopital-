"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  BellOff,
  Calendar,
  FileText,
  Pill,
  DollarSign,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  Clock,
  ChevronRight,
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

type NotificationType = "appointment" | "lab" | "prescription" | "billing" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  dateGroup: string
  isRead: boolean
  icon: React.ElementType
}

const initialNotifications: Notification[] = [
  {
    id: "1", type: "appointment",
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Sarah Wilson is scheduled for tomorrow at 10:00 AM",
    time: "2 hours ago", dateGroup: "Today",
    isRead: false, icon: Calendar,
  },
  {
    id: "2", type: "lab",
    title: "Lab Results Ready",
    message: "Your blood test results are now available. Click to view details.",
    time: "5 hours ago", dateGroup: "Today",
    isRead: false, icon: FileText,
  },
  {
    id: "3", type: "prescription",
    title: "Prescription Update",
    message: "Your prescription #12345 has been dispensed and is ready for pickup.",
    time: "1 day ago", dateGroup: "Yesterday",
    isRead: true, icon: Pill,
  },
  {
    id: "4", type: "billing",
    title: "Payment Received",
    message: "Thank you! Your payment of $150.00 has been successfully processed.",
    time: "2 days ago", dateGroup: "Yesterday",
    isRead: true, icon: DollarSign,
  },
  {
    id: "5", type: "system",
    title: "System Update",
    message: "New features have been added to improve your experience. Check them out!",
    time: "3 days ago", dateGroup: "Earlier",
    isRead: true, icon: Settings,
  },
  {
    id: "6", type: "appointment",
    title: "Appointment Cancelled",
    message: "Your appointment scheduled for March 20th has been cancelled by the doctor.",
    time: "4 days ago", dateGroup: "Earlier",
    isRead: true, icon: Calendar,
  },
]

const typeConfig: Record<NotificationType, { bg: string; icon: string; accent: string; label: string }> = {
  appointment: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    accent: "border-l-blue-500",
    label: "Appointment",
  },
  lab: {
    bg: "bg-violet-50 dark:bg-violet-950/40",
    icon: "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
    accent: "border-l-violet-500",
    label: "Lab",
  },
  prescription: {
    bg: "bg-pink-50 dark:bg-pink-950/40",
    icon: "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400",
    accent: "border-l-pink-500",
    label: "Prescription",
  },
  billing: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    icon: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    accent: "border-l-emerald-500",
    label: "Billing",
  },
  system: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    accent: "border-l-amber-500",
    label: "System",
  },
}

export default function NotificationsPage() {
  const [list, setList] = useState<Notification[]>(initialNotifications)

  const unread = list.filter((n) => !n.isRead)
  const read = list.filter((n) => n.isRead)

  const markAsRead = (id: string) => {
    setList((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    toast.success("Marked as read")
  }

  const remove = (id: string) => {
    setList((prev) => prev.filter((n) => n.id !== id))
    toast.success("Notification deleted")
  }

  const markAllAsRead = () => {
    setList((prev) => prev.map((n) => ({ ...n, isRead: true })))
    toast.success("All notifications marked as read")
  }

  return (
    <div className="space-y-6 w-full">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-sm text-muted-foreground">Stay updated with all activity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unread.length > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="h-9">
                <CheckCheck className="mr-1.5 h-4 w-4" />
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total", value: list.length, icon: Bell, color: "text-primary", bg: "bg-primary/10" },
            { label: "Unread", value: unread.length, icon: BellOff, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
            { label: "Read", value: read.length, icon: CheckCheck, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs + List ── */}
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs px-3">All ({list.length})</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs px-3">
                Unread
                {unread.length > 0 && (
                  <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {unread.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="read" className="text-xs px-3">Read</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <NotificationFeed items={list} markAsRead={markAsRead} remove={remove} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <NotificationFeed items={unread} markAsRead={markAsRead} remove={remove} />
          </TabsContent>
          <TabsContent value="read" className="m-0">
            <NotificationFeed items={read} markAsRead={markAsRead} remove={remove} />
          </TabsContent>
        </Tabs>
    </div>
  )
}

function NotificationFeed({
  items,
  markAsRead,
  remove,
}: {
  items: Notification[]
  markAsRead: (id: string) => void
  remove: (id: string) => void
}) {
  if (items.length === 0) {
    return (
      <Card className="border-none shadow-sm">
        <CardContent className="py-16 flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
            <BellOff className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="font-medium">No notifications here</p>
          <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
        </CardContent>
      </Card>
    )
  }

  const groups = items.reduce<Record<string, Notification[]>>((acc, n) => {
    ;(acc[n.dateGroup] ??= []).push(n)
    return acc
  }, {})

  const groupOrder = ["Today", "Yesterday", "Earlier"]

  return (
    <div className="space-y-4">
      {groupOrder.filter((g) => groups[g]?.length).map((group) => (
        <div key={group}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{group}</span>
          </div>
          <Card className="border-none shadow-sm overflow-hidden">
            <AnimatePresence initial={false}>
              {groups[group].map((n, idx) => {
                const cfg = typeConfig[n.type]
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {idx > 0 && <div className="h-px bg-border mx-4" />}
                    <div
                      className={`relative flex items-start gap-4 px-5 py-4 border-l-[3px] transition-colors ${
                        n.isRead
                          ? "border-l-transparent hover:bg-muted/40"
                          : `${cfg.accent} ${cfg.bg}`
                      }`}
                    >
                      {/* Unread dot */}
                      {!n.isRead && (
                        <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary" />
                      )}

                      {/* Icon */}
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.icon}`}>
                        <n.icon className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${!n.isRead ? "" : "text-foreground"}`}>
                            {n.title}
                          </span>
                          <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal">
                            {cfg.label}
                          </Badge>
                          {!n.isRead && (
                            <Badge className="text-[10px] h-4 px-1.5">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {n.time}
                          </span>
                          <div className="flex items-center gap-1">
                            {!n.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-primary hover:text-primary"
                                onClick={() => markAsRead(n.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Mark read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                              onClick={() => remove(n.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Delete
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground"
                            >
                              View
                              <ChevronRight className="ml-0.5 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </Card>
        </div>
      ))}
    </div>
  )
}
