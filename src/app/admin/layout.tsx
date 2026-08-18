import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="admin">{children}</DashboardLayout>
}
