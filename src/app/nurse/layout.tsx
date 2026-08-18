import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function NurseSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="nurse">{children}</DashboardLayout>
}
