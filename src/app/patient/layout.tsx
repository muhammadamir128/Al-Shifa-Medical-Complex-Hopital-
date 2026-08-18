import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function PatientSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="patient">{children}</DashboardLayout>
}
