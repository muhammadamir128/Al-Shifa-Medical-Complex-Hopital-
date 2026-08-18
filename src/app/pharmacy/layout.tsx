import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function PharmacySectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="pharmacist">{children}</DashboardLayout>
}
