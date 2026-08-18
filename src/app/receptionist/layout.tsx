import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function ReceptionistSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="receptionist">{children}</DashboardLayout>
}
