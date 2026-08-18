import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DoctorSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="doctor">{children}</DashboardLayout>
}
