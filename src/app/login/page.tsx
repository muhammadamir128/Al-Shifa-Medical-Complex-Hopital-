"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Shield,
  Mail,
  Lock,
  Stethoscope,
  Activity,
  ClipboardList,
  Pill,
  FlaskConical,
  UserRound,
  UserCog,
  Crown,
} from "lucide-react"
import { toast } from "sonner"
import { BrandMark, MedicalIllustration } from "@/components/medical-illustration"
import { motion } from "framer-motion"
import { Floating } from "@/components/motion"

const demoAccounts = [
  { role: "Super Admin", email: "superadmin@hospital.local", password: "Admin@123", icon: Crown, color: "bg-purple-500" },
  { role: "Admin", email: "admin@hospital.local", password: "Admin@123", icon: UserCog, color: "bg-teal-500" },
  { role: "Doctor", email: "doctor@hospital.local", password: "Password@123", icon: Stethoscope, color: "bg-emerald-500" },
  { role: "Nurse", email: "nurse@hospital.local", password: "Password@123", icon: Activity, color: "bg-cyan-500" },
  { role: "Receptionist", email: "receptionist@hospital.local", password: "Password@123", icon: ClipboardList, color: "bg-amber-500" },
  { role: "Pharmacist", email: "pharmacist@hospital.local", password: "Password@123", icon: Pill, color: "bg-violet-500" },
  { role: "Lab Tech", email: "lab@hospital.local", password: "Password@123", icon: FlaskConical, color: "bg-rose-500" },
  { role: "Patient", email: "patient@hospital.local", password: "Password@123", icon: UserRound, color: "bg-orange-500" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both your email and password.")
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please try again.")
        toast.error("Login Failed", {
          description: "Please check your email and password credentials.",
          duration: 4000,
        })
      } else {
        toast.success("Login Successful!", {
          description: "Welcome back! Redirecting to your dashboard...",
          duration: 4000,
        })
        const session = await getSession()
        const roleRedirects: Record<string, string> = {
          SUPER_ADMIN: "/admin/dashboard",
          ADMIN: "/admin/dashboard",
          DOCTOR: "/doctor/dashboard",
          NURSE: "/nurse/dashboard",
          RECEPTIONIST: "/receptionist/dashboard",
          PHARMACIST: "/pharmacy/dashboard",
          LAB_TECHNICIAN: "/lab/dashboard",
          PATIENT: "/patient/dashboard",
        }
        const dest = session?.user?.role ? (roleRedirects[session.user.role] ?? "/") : "/"
        router.push(dest)
        router.refresh()
      }
    } catch {
      setError("Something went wrong. Please try again.")
      toast.error("An error occurred during login.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (account: typeof demoAccounts[number]) => {
    setEmail(account.email)
    setPassword(account.password)
    setError("")
    toast.custom(() => (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-lg w-85">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${account.color}`}>
          <account.icon className="h-5 w-5 text-white" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">{account.role} credentials filled</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{account.email}</p>
        </div>
        <div className="flex flex-col items-center text-primary shrink-0">
          <LogIn className="h-4 w-4" />
          <span className="text-[10px] font-medium mt-0.5">Sign In</span>
        </div>
      </div>
    ), { duration: 3000 })
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Form column ───────────────────────────────────────────── */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-5 py-10 sm:px-8 lg:w-[54%]">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
              <BrandMark className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Al-Shifa Medical Complex</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to access your dashboard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="h-11 px-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="h-11 w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1" />
                <Badge variant="secondary" className="shrink-0 text-[11px] font-medium">
                  Demo Accounts
                </Badge>
                <Separator className="flex-1" />
              </div>

              <p className="mb-3 text-center text-xs text-muted-foreground">
                Click a role to auto-fill its credentials
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    className="flex items-center gap-2 rounded-lg border bg-card px-2.5 py-2 text-left transition-colors hover:border-primary hover:bg-accent"
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${account.color}`}>
                      <account.icon className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{account.role}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {account.email}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* ── Brand / illustration panel ────────────────────────────── */}
      <div className="relative hidden overflow-hidden bg-linear-to-br from-primary via-primary to-emerald-700 text-primary-foreground lg:flex lg:w-[46%]">
        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[22px_22px]" />
        {/* Glow blobs */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col p-10 xl:p-12">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <BrandMark className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Al-Shifa Medical Complex</span>
          </Link>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 xl:mt-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">
              <Shield className="h-3.5 w-3.5" />
              HIPAA-compliant &amp; secure
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight xl:text-4xl">
              Your health journey,
              <br />
              all in one place.
            </h2>
            <p className="mt-3 max-w-md text-sm text-primary-foreground/75 xl:text-base">
              Manage appointments, view medical records, and connect with specialists —
              securely, anytime, from anywhere.
            </p>
          </motion.div>

          {/* Illustration */}
          <div className="flex flex-1 items-center justify-center py-6">
            <Floating amplitude={10} duration={6}>
              <MedicalIllustration className="w-full max-w-95" />
            </Floating>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "50+", label: "Specialists" },
              { value: "24/7", label: "Emergency" },
              { value: "30k+", label: "Patients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl bg-white/10 px-3 py-3 text-center ring-1 ring-white/10"
              >
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-[11px] text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
