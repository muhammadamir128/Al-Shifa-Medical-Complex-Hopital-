"use client"

import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

type SidebarRole = "admin" | "doctor" | "nurse" | "receptionist" | "pharmacist" | "lab" | "patient"

const roleMap: Record<string, SidebarRole> = {
  SUPER_ADMIN: "admin",
  ADMIN: "admin",
  DOCTOR: "doctor",
  NURSE: "nurse",
  RECEPTIONIST: "receptionist",
  PHARMACIST: "pharmacist",
  LAB_TECHNICIAN: "lab",
  PATIENT: "patient",
}

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const role: SidebarRole = roleMap[session?.user?.role as string] ?? "patient"

  return <DashboardLayout role={role}>{children}</DashboardLayout>
}
