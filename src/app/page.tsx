"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Reveal, Stagger, StaggerItem, AnimatedCounter, Floating } from "@/components/motion"
import { HeroIllustration, DotGrid, PlusMarks, PulseRings, WaveDivider } from "@/components/illustrations"
import Link from "next/link"
import {
  Heart,
  Shield,
  Clock,
  Users,
  Stethoscope,
  Pill,
  Microscope,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  Star,
  CheckCircle2,
  Ambulance,
  Calendar,
  Award,
  Activity,
  Building2,
  ChevronRight,
} from "lucide-react"

const features = [
  { icon: Stethoscope, title: "Expert Doctors", description: "Access to qualified medical professionals across all specializations", color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
  { icon: Clock, title: "24/7 Emergency", description: "Round-the-clock emergency services for critical care needs", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/30" },
  { icon: Pill, title: "In-house Pharmacy", description: "Fully stocked pharmacy with all essential medications", color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/30" },
  { icon: Microscope, title: "Advanced Lab", description: "State-of-the-art diagnostic laboratory facilities", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  { icon: Shield, title: "Secure Records", description: "Digital health records with top-tier security", color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/30" },
  { icon: Users, title: "Patient Portal", description: "Easy appointment booking and health management", color: "text-teal-500", bgColor: "bg-teal-100 dark:bg-teal-900/30" },
]

const stats = [
  { value: "50+", label: "Expert Doctors", icon: Stethoscope },
  { value: "10K+", label: "Happy Patients", icon: Users },
  { value: "15+", label: "Departments", icon: Building2 },
  { value: "24/7", label: "Emergency Care", icon: Ambulance },
]

const testimonials = [
  { name: "Sarah Johnson", role: "Cardiology Patient", content: "The care I received at Al-Shifa Medical Complex was exceptional. Dr. Wilson and her team were attentive, professional, and truly cared about my recovery.", rating: 5 },
  { name: "Michael Chen", role: "Surgery Patient", content: "Quick appointment scheduling and minimal wait times. The surgical team was outstanding, and my recovery was faster than expected.", rating: 5 },
  { name: "Emily Rodriguez", role: "Pediatrics Parent", content: "The pediatric department is amazing! My kids love visiting their doctor. The staff is so friendly and makes the experience stress-free.", rating: 5 },
]

const departments = [
  { name: "Cardiology", icon: Heart, color: "text-red-500", patients: "2,340+" },
  { name: "Neurology", icon: Activity, color: "text-purple-500", patients: "1,890+" },
  { name: "Orthopedics", icon: Building2, color: "text-blue-500", patients: "1,560+" },
  { name: "Pediatrics", icon: Users, color: "text-pink-500", patients: "2,980+" },
  { name: "Emergency", icon: Ambulance, color: "text-orange-500", patients: "5,120+" },
  { name: "General Medicine", icon: Stethoscope, color: "text-green-500", patients: "3,570+" },
]

const quickServices = [
  { title: "Book Appointment", icon: Calendar, href: "/register", description: "Schedule your visit" },
  { title: "Find a Doctor", icon: Stethoscope, href: "/doctors", description: "Browse our specialists" },
  { title: "Lab Results", icon: Microscope, href: "/login", description: "Access your reports" },
  { title: "Contact Us", icon: Phone, href: "/contact", description: "Get in touch" },
]

export default function HomePage() {
  return (
    <PublicLayout>
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.07] via-background to-background">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container relative py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Stagger className="space-y-8">
              <StaggerItem>
                <Badge variant="secondary" className="w-fit px-4 py-1">
                  <Heart className="mr-2 h-3 w-3 text-red-500" />
                  Trusted Healthcare Since 1990
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  Your Health is Our{" "}
                  <span className="relative text-gradient">
                    Priority
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 10C50 4 150 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                    </svg>
                  </span>
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Experience world-class healthcare with our comprehensive hospital management
                  system. From appointments to prescriptions, we provide compassionate care
                  with cutting-edge medical technology.
                </p>
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="gradient" asChild className="h-12 w-full px-8 text-base shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] sm:w-auto">
                  <Link href="/register">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group h-12 w-full px-8 text-base sm:w-auto">
                  <Link href="/doctors">
                    Find a Doctor
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </StaggerItem>

              {/* Trust Badges */}
              <StaggerItem className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">NABH Accredited</p>
                    <p className="text-xs text-muted-foreground">Quality Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Best Hospital</p>
                    <p className="text-xs text-muted-foreground">Award Winner 2024</p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Hero Illustration */}
            <Reveal direction="left" delay={0.15} className="relative hidden lg:block">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
                <PulseRings className="relative h-full w-full text-primary/30" />
              </div>
              <HeroIllustration className="relative w-full" />

              {/* Floating emergency card */}
              <Floating delay={0.8} amplitude={10} className="absolute -bottom-2 left-0">
                <div className="flex items-center gap-3 rounded-2xl border bg-card p-3 pr-5 shadow-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Emergency 24/7</p>
                    <p className="text-sm font-bold">(555) 123-4567</p>
                  </div>
                </div>
              </Floating>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quick Services ───────────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container">
          <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickServices.map((service) => (
              <StaggerItem key={service.title}>
                <Link href={service.href}>
                  <Card className="group cursor-pointer border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{service.title}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Stats Band ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground">
        <PlusMarks className="absolute inset-0 h-full w-full text-primary-foreground/30" />
        <div className="container relative">
          <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 opacity-90" />
                <AnimatedCounter value={stat.value} className="block text-3xl font-bold md:text-4xl" />
                <p className="mt-1 text-sm text-primary-foreground/75">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Departments ──────────────────────────────────────────────── */}
      <section className="container py-20">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="secondary" className="mb-4">Our Specialties</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Medical Departments</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Specialized departments with dedicated medical professionals for every health need.
            </p>
          </div>
          <Button variant="outline" asChild className="group gap-2">
            <Link href="/services">
              View All Departments
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <StaggerItem key={dept.name}>
              <Link href={`/services#${dept.name.toLowerCase()}`}>
                <Card className="group cursor-pointer overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="relative p-6">
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-bl from-primary/5 to-transparent" />
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dept.color.replace("text-", "bg-")}/10 transition-transform duration-300 group-hover:scale-110`}>
                        <dept.icon className={`h-7 w-7 ${dept.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-semibold">{dept.name}</h3>
                        <p className="mb-2 text-sm text-muted-foreground">{dept.patients} patients treated</p>
                        <div className="flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-muted-foreground">
              We provide a complete range of medical services with modern facilities
              and experienced healthcare professionals.
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className="group h-full border-none bg-card/60 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="container py-20">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground">
            Real experiences from real patients who trusted us with their healthcare needs.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <Card className="relative h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-primary/40" />
                <CardContent className="p-6">
                  <svg viewBox="0 0 40 40" className="mb-3 h-8 w-8 fill-primary/15" aria-hidden>
                    <path d="M16 8C9 8 5 13 5 20v12h12V20H11c0-4 2-6 5-6V8Zm19 0c-7 0-11 5-11 12v12h12V20h-6c0-4 2-6 5-6V8Z" />
                  </svg>
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-6 italic text-muted-foreground">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 text-lg font-bold text-primary-foreground">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <WaveDivider className="text-muted/40" />
        <div className="relative bg-gradient-to-r from-primary via-primary to-emerald-600 bg-aurora">
          <PlusMarks className="absolute inset-0 h-full w-full text-primary-foreground/25" />
          <div className="container relative py-20">
            <Reveal className="mx-auto max-w-2xl text-center text-primary-foreground">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-lg text-primary-foreground/80">
                Register today and experience seamless healthcare management.
                Book appointments, access records, and manage your health journey.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="group h-12 px-8 text-base">
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 border-primary-foreground/40 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contact Info ─────────────────────────────────────────────── */}
      <section className="container py-16">
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: Phone, title: "Emergency", line1: "(555) 123-4567", line2: "24/7 Available", bg: "bg-red-100 dark:bg-red-900/30", color: "text-red-600", accent: "text-primary" },
            { icon: MapPin, title: "Location", line1: "456 Healthcare Ave", line2: "Medical City, MC 12345", bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600", accent: "text-muted-foreground" },
            { icon: Mail, title: "Email Us", line1: "info@alshifamedical.com", line2: "Quick Response", bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-600", accent: "text-primary" },
          ].map((item) => (
            <StaggerItem key={item.title} className="group flex items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg} transition-transform duration-300 group-hover:scale-110`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                <p className={`font-medium ${item.accent}`}>{item.line1}</p>
                <p className="text-sm text-muted-foreground">{item.line2}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PublicLayout>
  )
}
