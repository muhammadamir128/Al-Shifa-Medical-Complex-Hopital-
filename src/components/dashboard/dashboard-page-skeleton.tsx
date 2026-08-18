import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton shown in the content area while a dashboard page chunk loads.
 * The sidebar/header stay mounted (they live in the route layout), so this
 * only fills the main content region for instant navigation feedback.
 */
export function DashboardPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>

      {/* Main content block */}
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  )
}
