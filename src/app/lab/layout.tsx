import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function LabSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="lab">{children}</DashboardLayout>
}
