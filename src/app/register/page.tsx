"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  Phone,
  Mail,
  User,
  Lock,
  Stethoscope,
  GraduationCap,
  BadgeCheck,
} from "lucide-react"
import { toast } from "sonner"
import { BrandMark, MedicalIllustration } from "@/components/medical-illustration"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { motion } from "framer-motion"
import { Floating } from "@/components/motion"

const benefits = [
  "Book appointments with top specialists",
  "Access your medical records anytime",
  "Receive prescription reminders",
  "View lab results the moment they're ready",
  "24/7 patient support access",
]

// Roles a user may pick when self-registering. ADMIN / SUPER_ADMIN are
// intentionally excluded — those accounts are created by an administrator.
const roleOptions = [
  { value: "PATIENT", label: "Patient" },
  { value: "DOCTOR", label: "Doctor" },
  { value: "NURSE", label: "Nurse" },
  { value: "RECEPTIONIST", label: "Receptionist" },
  { value: "PHARMACIST", label: "Pharmacist" },
  { value: "LAB_TECHNICIAN", label: "Lab Technician" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT",
    // Patient-specific
    gender: "",
    bloodGroup: "",
    // Doctor / Nurse-specific
    specialization: "",
    qualification: "",
    licenseNumber: "",
    shift: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains a number", met: /\d/.test(formData.password) },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
  ]
  const passwordScore = passwordRequirements.filter((r) => r.met).length
  const strengthLabel = ["Too weak", "Weak", "Fair", "Good", "Strong"][passwordScore]
  const strengthColor = ["bg-muted", "bg-destructive", "bg-amber-500", "bg-yellow-500", "bg-primary"][
    passwordScore
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (passwordScore < 4) {
      setError("Please choose a stronger password that meets all requirements.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.")
      return
    }

    // Role-specific required fields
    if (
      formData.role === "DOCTOR" &&
      (!formData.specialization.trim() || !formData.licenseNumber.trim())
    ) {
      setError("Please provide your specialization and license number.")
      return
    }

    if (formData.role === "NURSE" && !formData.licenseNumber.trim()) {
      setError("Please provide your license number.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          specialization: formData.specialization.trim(),
          qualification: formData.qualification.trim(),
          licenseNumber: formData.licenseNumber.trim(),
          shift: formData.shift,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data.error || data.message || "Registration failed. Please try again."
        setError(message)
        toast.error(message)
      } else {
        toast.success("Account created successfully! Please sign in.")
        router.push("/login")
      }
    } catch {
      setError("Something went wrong. Please try again.")
      toast.error("An error occurred during registration.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Brand / illustration panel ────────────────────────────── */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary to-emerald-700 text-primary-foreground lg:flex lg:w-[46%]">
        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:22px_22px]" />
        {/* Glow blobs */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

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
              Free patient account
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight xl:text-4xl">
              Join our healthcare
              <br />
              community today.
            </h2>
          </motion.div>

          {/* Illustration */}
          <div className="flex flex-1 items-center justify-center py-4">
            <Floating amplitude={10} duration={6}>
              <MedicalIllustration className="w-full max-w-[340px]" />
            </Floating>
          </div>

          {/* Benefits */}
          <div className="space-y-2.5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-primary-foreground/90">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form column ───────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col items-center justify-center bg-background px-5 py-10 sm:px-8 lg:w-[54%]">
        <ThemeToggle className="absolute right-4 top-4 z-10" />
        <div className="w-full max-w-2xl">
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
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Create your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
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

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {/* Role selector */}
                <div className="space-y-2">
                  <Label htmlFor="role">Register As *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger id="role" className="h-11 w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {formData.role === "PATIENT"
                      ? "Book appointments and manage your health records."
                      : "Staff account — fill in your professional details below."}
                  </p>
                </div>

                {/* Patient-specific fields */}
                {formData.role === "PATIENT" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger id="gender" className="h-11 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select
                        value={formData.bloodGroup}
                        onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                      >
                        <SelectTrigger id="bloodGroup" className="h-11 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Doctor-specific fields */}
                {formData.role === "DOCTOR" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization *</Label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="specialization"
                          name="specialization"
                          type="text"
                          placeholder="e.g. Cardiology"
                          value={formData.specialization}
                          onChange={handleChange}
                          className="h-11 pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="qualification"
                            name="qualification"
                            type="text"
                            placeholder="e.g. MBBS, MD"
                            value={formData.qualification}
                            onChange={handleChange}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">License Number *</Label>
                        <div className="relative">
                          <BadgeCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            type="text"
                            placeholder="License No."
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Nurse-specific fields */}
                {formData.role === "NURSE" && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="qualification"
                            name="qualification"
                            type="text"
                            placeholder="e.g. BSc Nursing"
                            value={formData.qualification}
                            onChange={handleChange}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">License Number *</Label>
                        <div className="relative">
                          <BadgeCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            type="text"
                            placeholder="License No."
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className="h-11 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shift">Preferred Shift</Label>
                      <Select
                        value={formData.shift}
                        onValueChange={(value) => setFormData({ ...formData, shift: value })}
                      >
                        <SelectTrigger id="shift" className="h-11">
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Morning">Morning</SelectItem>
                          <SelectItem value="Evening">Evening</SelectItem>
                          <SelectItem value="Night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
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

                  {/* Strength meter + requirements */}
                  {formData.password && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-1 gap-1">
                          {[0, 1, 2, 3].map((i) => (
                            <span
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                i < passwordScore ? strengthColor : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="w-16 text-right text-xs font-medium text-muted-foreground">
                          {strengthLabel}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {passwordRequirements.map((req) => (
                          <div
                            key={req.text}
                            className={`flex items-center gap-1 text-xs ${
                              req.met ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <CheckCircle2
                              className={`h-3 w-3 ${req.met ? "opacity-100" : "opacity-30"}`}
                            />
                            {req.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                      className="h-11 px-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-destructive">Passwords do not match</p>
                    )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-sm font-normal leading-snug"
                  >
                    I agree to the{" "}
                    <Link href="/terms-of-service" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="h-11 w-full"
                  disabled={isLoading || !agreeTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          </motion.div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
