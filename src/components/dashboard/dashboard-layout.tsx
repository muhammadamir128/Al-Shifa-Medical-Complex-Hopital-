"use client"

import { useState, useCallback, useSyncExternalStore } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "doctor" | "nurse" | "receptionist" | "pharmacist" | "lab" | "patient"
}

function useLocalStorage(key: string, initialValue: boolean): [boolean, (value: boolean) => void] {
  // Stable subscribe — only re-created when key changes
  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) callback()
      }
      window.addEventListener("storage", handler)
      return () => window.removeEventListener("storage", handler)
    },
    [key],
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return initialValue
    const item = localStorage.getItem(key)
    return item === "true"
  }, [key, initialValue])

  const getServerSnapshot = useCallback(() => initialValue, [initialValue])

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = useCallback(
    (newValue: boolean) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, String(newValue))
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: String(newValue) }))
      }
    },
    [key],
  )

  return [value, setValue]
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage("sidebarCollapsed", false)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed)
  }, [sidebarCollapsed, setSidebarCollapsed])

  const openMobile = useCallback(() => setMobileMenuOpen(true), [])
  const closeMobile = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <div className="flex h-screen overflow-hidden" data-role={role}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex shrink-0">
        <DashboardSidebar role={role} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <DashboardSidebar role={role} collapsed={false} onToggle={closeMobile} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader showMenuButton={true} onMenuClick={openMobile} role={role.toUpperCase()} />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
