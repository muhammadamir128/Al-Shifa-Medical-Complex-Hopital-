"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ClipboardList } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/** Tailwind classes for an appointment / generic status badge. */
export function statusBadgeClass(status: string) {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
    case "COMPLETED":
    case "PAID":
    case "DISPENSED":
      return "bg-primary/15 text-primary border-primary/20"
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
    case "CANCELLED":
    case "NO_SHOW":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "PENDING":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Tailwind classes for a priority pill (HIGH / MEDIUM / LOW, ROUTINE / URGENT / STAT). */
export function priorityClass(priority: string) {
  switch (priority?.toUpperCase()) {
    case "HIGH":
    case "STAT":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "MEDIUM":
    case "URGENT":
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Lightweight loading placeholder for a table. */
export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

/** Loading placeholder for a vertical list of items. */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Friendly empty state for tables / lists with no data. */
export function EmptyRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <ClipboardList className="h-5 w-5 text-primary/50" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

/** Colored, clickable highlight card used in the bottom row of dashboards. */
export function QuickCard({
  label,
  value,
  icon: Icon,
  loading,
  href,
  className,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  loading?: boolean
  href?: string
  className: string
}) {
  const card = (
    <Card
      className={`border-none shadow-md transition-all hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">{label}</p>
            {loading ? (
              <Skeleton className="mt-2 h-8 w-20 bg-white/30" />
            ) : (
              <p className="text-3xl font-bold mt-1">{value}</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
  return href ? <Link href={href}>{card}</Link> : card
}
