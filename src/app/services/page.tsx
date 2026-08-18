"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal, Stagger, StaggerItem, AnimatedCounter } from "@/components/motion"
import { DotGrid, PlusMarks, WaveDivider } from "@/components/illustrations"
import Link from "next/link"
import {
  Heart,
  Stethoscope,
  Brain,
  Bone,
  Baby,
  Pill,
  Microscope,
  Ambulance,
  Syringe,
  Eye,
  Ear,
  Activity,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Phone,
} from "lucide-react"

const services = [
  { icon: Heart, title: "Cardiology", description: "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.", features: ["ECG & Echo", "Heart Surgery", "Cardiac Rehab", "Preventive Care"], color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/30" },
  { icon: Brain, title: "Neurology", description: "Expert care for neurological conditions including stroke, epilepsy, and movement disorders.", features: ["Brain Mapping", "Stroke Care", "Epilepsy Treatment", "Movement Disorders"], color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  { icon: Bone, title: "Orthopedics", description: "Complete musculoskeletal care from sports injuries to joint replacement surgery.", features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Fracture Care"], color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
  { icon: Baby, title: "Pediatrics", description: "Specialized healthcare for infants, children, and adolescents with a child-friendly approach.", features: ["Well-Child Visits", "Vaccinations", "Pediatric Surgery", "NICU"], color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/30" },
  { icon: Activity, title: "General Medicine", description: "Primary care services for adults including preventive care and chronic disease management.", features: ["Health Checkups", "Chronic Care", "Vaccinations", "Health Screening"], color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/30" },
  { icon: Ambulance, title: "Emergency Care", description: "24/7 emergency services with rapid response teams and state-of-the-art trauma care.", features: ["24/7 Service", "Trauma Care", "Critical Care", "Ambulance"], color: "text-orange-500", bgColor: "bg-orange-100 dark:bg-orange-900/30" },
  { icon: Syringe, title: "Surgery", description: "Advanced surgical procedures using minimally invasive techniques for faster recovery.", features: ["Laparoscopic", "Robotic Surgery", "Day Surgery", "Post-Op Care"], color: "text-teal-500", bgColor: "bg-teal-100 dark:bg-teal-900/30" },
  { icon: Eye, title: "Ophthalmology", description: "Complete eye care services from routine exams to advanced surgical procedures.", features: ["Eye Exams", "Cataract Surgery", "LASIK", "Glaucoma Care"], color: "text-cyan-500", bgColor: "bg-cyan-100 dark:bg-cyan-900/30" },
  { icon: Ear, title: "ENT", description: "Expert care for ear, nose, and throat conditions in adults and children.", features: ["Hearing Tests", "Sinus Treatment", "Voice Disorders", "Sleep Apnea"], color: "text-indigo-500", bgColor: "bg-indigo-100 dark:bg-indigo-900/30" },
  { icon: Microscope, title: "Laboratory", description: "State-of-the-art diagnostic laboratory with accurate and timely test results.", features: ["Blood Tests", "Pathology", "Radiology", "Genetic Testing"], color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/30" },
  { icon: Pill, title: "Pharmacy", description: "In-house pharmacy with comprehensive medication services and expert counseling.", features: ["Prescriptions", "OTC Medicines", "Drug Info", "Home Delivery"], color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-900/30" },
  { icon: Stethoscope, title: "Diagnostics", description: "Advanced imaging and diagnostic services for accurate disease detection.", features: ["X-Ray", "MRI", "CT Scan", "Ultrasound"], color: "text-rose-500", bgColor: "bg-rose-100 dark:bg-rose-900/30" },
]

const highlights = [
  { icon: Users, value: "50+", label: "Specialist Doctors" },
  { icon: Clock, value: "24/7", label: "Emergency Care" },
  { icon: Shield, value: "15+", label: "Departments" },
  { icon: Heart, value: "10K+", label: "Patients Served" },
]

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Comprehensive Healthcare{" "}
              <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We offer a wide range of medical services with state-of-the-art facilities
              and experienced healthcare professionals to meet all your health needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="border-y bg-muted/30">
        <div className="container py-12">
          <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {highlights.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCounter value={stat.value} className="block text-3xl font-bold text-primary md:text-4xl" />
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────────────────── */}
      <section className="container py-20">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title} id={service.title.toLowerCase()}>
              <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="relative p-6">
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-primary/5 to-transparent" />
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${service.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className={`h-7 w-7 ${service.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="mb-4 text-muted-foreground">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Emergency Banner ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-destructive text-destructive-foreground">
        <PlusMarks className="absolute inset-0 h-full w-full text-destructive-foreground/20" />
        <div className="container relative py-12">
          <Reveal className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-destructive-foreground/15">
                <span className="absolute inset-0 animate-ping rounded-full bg-destructive-foreground/20" />
                <Ambulance className="relative h-7 w-7" />
              </span>
              <div>
                <h3 className="text-2xl font-bold">24/7 Emergency Services</h3>
                <p className="text-destructive-foreground/80">
                  Our emergency department is open round the clock with expert care
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-xl font-bold">(555) 123-4567</span>
              </div>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="group">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="container py-20">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <WaveDivider className="absolute inset-x-0 bottom-0 text-primary/10" flip />
          <h2 className="relative mb-4 text-3xl font-bold tracking-tight">
            Need Medical Assistance?
          </h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-muted-foreground">
            Book an appointment with our specialists or visit our hospital for
            immediate care. Our team is ready to help you.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="group">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
