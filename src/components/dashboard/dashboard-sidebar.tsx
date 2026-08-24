"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  Calendar,
  Building2,
  FileText,
  Pill,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  LucideIcon,
  FlaskConical,
  Activity,
  ClipboardList,
  HeartPulse,
  Receipt,
  UserRound,
  Syringe,
  TestTubes,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Home,
  Power,
  Clock,
  Plus,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { memo } from "react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: number
  onClick?: () => void
  className?: string
  iconClassName?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

interface DashboardSidebarProps {
  role: "admin" | "doctor" | "nurse" | "receptionist" | "pharmacist" | "lab" | "patient"
  collapsed?: boolean
  onToggle?: () => void
}

// Unified sidebar theme for all roles — white bg with brand-green accents
const greenSidebarTheme = {
  bg: "bg-white dark:bg-gray-900",
  accent: "bg-primary",
  accentHover: "hover:bg-primary/90",
  text: "text-primary dark:text-green-400",
  border: "border-gray-200 dark:border-gray-800",
  activeBg: "bg-primary/10 dark:bg-primary/20",
  activeText: "text-primary dark:text-green-400",
  hoverBg: "",
  labelBg: "text-gray-400 dark:text-gray-500",
  headerBg: "bg-white dark:bg-gray-900",
  footerBg: "bg-gray-50 dark:bg-gray-800/60",
  activeBar: "bg-primary",
}

const roleThemes = {
  admin: greenSidebarTheme,
  doctor: greenSidebarTheme,
  nurse: greenSidebarTheme,
  receptionist: greenSidebarTheme,
  pharmacist: greenSidebarTheme,
  lab: greenSidebarTheme,
  patient: greenSidebarTheme,
}

type RoleTheme = (typeof roleThemes)[keyof typeof roleThemes]

const navConfig: Record<string, NavGroup[]> = {
  admin: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Reports", href: "/admin/reports", icon: BarChart3 },
        { title: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "All Users", href: "/admin/users", icon: Users },
        { title: "Doctors", href: "/admin/doctors", icon: Stethoscope },
        { title: "Staff", href: "/admin/staff", icon: UserCog },
        { title: "Patients", href: "/admin/patients", icon: UserRound },
        { title: "Roles", href: "/admin/roles", icon: User },
      ],
    },
    {
      title: "Operations",
      items: [
        { title: "Appointments", href: "/admin/appointments", icon: Calendar },
        { title: "Departments", href: "/admin/departments", icon: Building2 },
        { title: "Billing", href: "/admin/billing", icon: DollarSign },
        { title: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
      ],
    },
    {
      title: "System",
      items: [{ title: "Settings", href: "/admin/settings", icon: Settings }],
    },
  ],
  doctor: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
        { title: "Schedule", href: "/doctor/schedule", icon: Calendar },
        { title: "Reports", href: "/doctor/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Patient Care",
      items: [
        { title: "Appointments", href: "/doctor/appointments", icon: Calendar },
        { title: "My Patients", href: "/doctor/patients", icon: UserRound },
        { title: "Medical Records", href: "/doctor/medical-records", icon: FileText },
        { title: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
        { title: "Lab Requests", href: "/doctor/lab-requests", icon: FlaskConical },
        { title: "New Lab Request", href: "/doctor/lab-requests/create", icon: Plus },
      ],
    },
    {
      title: "Personal",
      items: [{ title: "Profile", href: "/doctor/profile", icon: User }],
    },
  ],
  nurse: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/nurse/dashboard", icon: LayoutDashboard },
        { title: "Schedule", href: "/nurse/schedule", icon: Clock },
        { title: "Reports", href: "/nurse/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Patient Care",
      items: [
        { title: "Patients", href: "/nurse/patients", icon: UserRound },
        { title: "Vitals", href: "/nurse/vitals", icon: Activity },
        { title: "Medications", href: "/nurse/medications", icon: Syringe },
      ],
    },
    {
      title: "Tasks",
      items: [{ title: "My Tasks", href: "/nurse/tasks", icon: ClipboardList }],
    },
    {
      title: "Personal",
      items: [{ title: "My Profile", href: "/nurse/profile", icon: User }],
    },
  ],
  receptionist: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/receptionist/dashboard", icon: LayoutDashboard },
        { title: "Reports", href: "/receptionist/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Appointments",
      items: [
        { title: "All Appointments", href: "/receptionist/appointments", icon: Calendar },
        { title: "Book Appointment", href: "/receptionist/appointments/book", icon: Calendar },
      ],
    },
    {
      title: "Registration",
      items: [
        { title: "Patients", href: "/receptionist/patients", icon: UserRound },
        { title: "Register Patient", href: "/receptionist/patients/register", icon: User },
      ],
    },
    {
      title: "Billing",
      items: [{ title: "Billing", href: "/receptionist/billing", icon: Receipt }],
    },
    {
      title: "Personal",
      items: [{ title: "My Profile", href: "/receptionist/profile", icon: User }],
    },
  ],
  pharmacist: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/pharmacy/dashboard", icon: LayoutDashboard },
        { title: "Reports", href: "/pharmacy/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Inventory",
      items: [
        { title: "Stock", href: "/pharmacy/inventory", icon: Pill },
      ],
    },
    {
      title: "Dispensing",
      items: [
        { title: "Prescriptions", href: "/pharmacy/prescriptions", icon: FileText },
        { title: "Dispensed", href: "/pharmacy/dispensed", icon: CheckCircle },
      ],
    },
    {
      title: "Personal",
      items: [{ title: "My Profile", href: "/pharmacy/profile", icon: User }],
    },
  ],
  lab: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/lab/dashboard", icon: LayoutDashboard },
        { title: "Reports", href: "/lab/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Tests",
      items: [
        { title: "Test Requests", href: "/lab/test-requests", icon: TestTubes },
        { title: "Results", href: "/lab/results", icon: FileText },
        { title: "Upload Results", href: "/lab/results/upload", icon: FlaskConical },
      ],
    },
    {
      title: "Personal",
      items: [{ title: "My Profile", href: "/lab/profile", icon: User }],
    },
  ],
  patient: [
    {
      title: "Overview",
      items: [{ title: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard }],
    },
    {
      title: "Appointments",
      items: [
        { title: "My Appointments", href: "/patient/appointments", icon: Calendar },
        { title: "Book Appointment", href: "/patient/appointments/book", icon: Calendar },
      ],
    },
    {
      title: "Health",
      items: [
        { title: "Medical History", href: "/patient/medical-history", icon: HeartPulse },
        { title: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
        { title: "Lab Results", href: "/patient/lab-results", icon: FlaskConical },
        { title: "Find Doctors", href: "/patient/doctors", icon: Stethoscope },
      ],
    },
    {
      title: "Billing",
      items: [{ title: "My Bills", href: "/patient/bills", icon: Receipt }],
    },
    {
      title: "Profile",
      items: [{ title: "My Profile", href: "/patient/profile", icon: User }],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────────
   NavItemContent is defined at MODULE SCOPE (outside DashboardSidebar)
   so React sees the same component type across re-renders.
   Without this, every pathname change caused ALL nav items to
   unmount + remount, making navigation visibly slow.
───────────────────────────────────────────────────────────────────── */
interface NavItemContentProps {
  item: NavItem
  isActive: boolean
  collapsed: boolean
  theme: RoleTheme
}

const NavItemContent = memo(function NavItemContent({
  item,
  isActive,
  collapsed,
  theme,
}: NavItemContentProps) {
  const cls = cn(
    "w-full justify-start gap-3 mb-1 h-10 relative overflow-hidden transition-colors duration-150",
    isActive && cn(theme.activeBg, theme.activeText, "font-medium"),
    !isActive && theme.hoverBg,
    collapsed && "justify-center px-2 h-10 w-10 mx-auto",
    item.className,
  )

  const inner = (
    <>
      <item.icon className={cn("h-5 w-5 shrink-0", isActive && theme.text, item.iconClassName)} />
      {!collapsed && (
        <>
          <span className="truncate">{item.title}</span>
          {item.badge && (
            <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-primary text-white font-semibold">
              {item.badge}
            </span>
          )}
        </>
      )}
      {isActive && !collapsed && (
        <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full", theme.activeBar)} />
      )}
    </>
  )

  /* Use Button asChild so the rendered element is a single <a> tag — never
     nest <button> inside <a> as that is invalid HTML and causes browsers to
     require a double-click or swallow the first click entirely. */
  const buttonEl = item.onClick ? (
    <Button variant="ghost" className={cls} onClick={item.onClick}>
      {inner}
    </Button>
  ) : (
    <Button variant="ghost" asChild className={cls}>
      <Link href={item.href} prefetch={true}>{inner}</Link>
    </Button>
  )

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium flex items-center gap-2">
          {item.title}
          {item.badge && (
            <span className="text-xs rounded-full px-2 py-0.5 bg-primary text-white">
              {item.badge}
            </span>
          )}
          {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
        </TooltipContent>
      </Tooltip>
    )
  }

  return buttonEl
})

export function DashboardSidebar({ role, collapsed = false, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const theme = roleThemes[role]
  const navGroups = navConfig[role] || []
  const settingsHrefMap: Record<DashboardSidebarProps["role"], string> = {
    admin: "/admin/settings",
    doctor: "/doctor/settings",
    nurse: "/nurse/settings",
    receptionist: "/receptionist/settings",
    pharmacist: "/pharmacy/settings",
    lab: "/lab/settings",
    patient: "/patient/settings",
  }
  const settingsHref = settingsHrefMap[role]
  const accountNav: NavItem[] = [
    { title: "Profile", href: "/profile", icon: User },
    { title: "Notifications", href: "/notifications", icon: Bell },
    { title: "Settings", href: settingsHref, icon: Settings },
    { title: "Help", href: "/help", icon: HelpCircle },
  ]

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col h-full border-r transition-all duration-300 ease-in-out relative",
          theme.border,
          theme.bg,
          collapsed ? "w-18" : "w-64",
        )}
      >
        {/* Logo & Toggle */}
        <div
          className={cn(
            "p-3 border-b border-gray-200 dark:border-gray-800 flex items-center h-16",
            theme.headerBg,
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {collapsed ? (
            <Logo size="sm" showText={false} variant="default" />
          ) : (
            <Logo size="sm" showText={true} variant="default" />
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={cn(
            "absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border border-border shadow-md flex items-center justify-center transition-all duration-200",
            "bg-background hover:bg-muted",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Navigation */}
        <ScrollArea className="flex-1 min-h-0 px-2 py-2 sidebar-scroll">
          <nav className="space-y-1">
            {navGroups.map((group, groupIndex) => (
              <div key={group.title} className={cn("mb-4", groupIndex > 0 && "mt-4")}>
                {!collapsed && (
                  <p
                    className={cn(
                      "text-[10px] font-semibold px-3 py-1.5 uppercase tracking-widest flex items-center gap-1.5",
                      theme.labelBg,
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {group.title}
                  </p>
                )}
                {collapsed && groupIndex > 0 && <div className="h-px bg-gray-200 dark:bg-gray-700 my-2 mx-2" />}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <NavItemContent
                        key={item.href}
                        item={item}
                        isActive={isActive}
                        collapsed={collapsed}
                        theme={theme}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            {!collapsed && <Separator className="my-3" />}
            {collapsed && <div className="h-px bg-gray-200 dark:bg-gray-700 my-3 mx-2" />}

            {/* Account Navigation */}
            <div className="mb-2">
              {!collapsed && (
                <p
                  className={cn(
                    "text-[10px] font-semibold px-3 py-1.5 uppercase tracking-widest flex items-center gap-1.5",
                    theme.labelBg,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Account
                </p>
              )}
              <div className="space-y-0.5">
                {accountNav.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <NavItemContent
                      key={item.href}
                      item={item}
                      isActive={isActive}
                      collapsed={collapsed}
                      theme={theme}
                    />
                  )
                })}
              </div>
            </div>
          </nav>
        </ScrollArea>

        {/* Bottom Section */}
        <div
          className={cn(
            "border-t border-gray-200 dark:border-gray-800",
            theme.footerBg,
            collapsed ? "p-2" : "p-3",
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm bg-primary shrink-0">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="flex justify-center mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm bg-primary">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          <div className={cn("space-y-2", collapsed ? "pt-1" : "pt-0")}>
            {collapsed ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="w-full h-10 rounded-lg hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800">
                      <Link href={settingsHref} prefetch={true}><Settings className="h-5 w-5" /></Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="w-full h-10 rounded-lg hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20">
                      <Link href="/" prefetch={true}><Home className="h-5 w-5" /></Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Back to Website</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="w-full h-10 rounded-lg hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30">
                      <Link href="/logout"><Power className="h-5 w-5" /></Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="w-full justify-start gap-2 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 dark:hover:bg-slate-800">
                  <Link href={settingsHref} prefetch={true}><Settings className="h-4 w-4" />Settings</Link>
                </Button>

                <Button variant="outline" size="sm" asChild className="w-full justify-start gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20">
                  <Link href="/" prefetch={true}><Home className="h-4 w-4" />Back to Website</Link>
                </Button>

                <Button variant="outline" size="sm" asChild className="w-full justify-start gap-2 hover:bg-red-100 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/30">
                  <Link href="/logout"><Power className="h-4 w-4" />Logout</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
