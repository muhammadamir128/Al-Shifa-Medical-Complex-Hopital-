"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Reveal, Stagger, StaggerItem, AnimatedCounter } from "@/components/motion"
import { DotGrid, PlusMarks, HeartbeatLine } from "@/components/illustrations"
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  Building,
  Stethoscope,
  GraduationCap,
  CheckCircle2,
} from "lucide-react"

const values = [
  { icon: Heart, title: "Compassionate Care", description: "We treat every patient with empathy, dignity, and respect." },
  { icon: Award, title: "Excellence", description: "We strive for the highest standards in healthcare delivery." },
  { icon: Users, title: "Teamwork", description: "We collaborate across departments for the best patient outcomes." },
  { icon: Target, title: "Integrity", description: "We maintain ethical standards in all our practices." },
]

const timeline = [
  { year: "1990", event: "Hospital Founded", description: "Started as a small clinic with 5 doctors" },
  { year: "2000", event: "Major Expansion", description: "New wing added with 100 beds" },
  { year: "2010", event: "Digital Transformation", description: "Implemented electronic health records" },
  { year: "2020", event: "Modern Facility", description: "State-of-the-art medical equipment" },
  { year: "2024", event: "HMS Launch", description: "Comprehensive hospital management system" },
]

const team = [
  { name: "Dr. Robert Williams", role: "Chief Medical Officer", specialty: "Cardiology" },
  { name: "Dr. Sarah Mitchell", role: "Head of Surgery", specialty: "General Surgery" },
  { name: "Dr. James Anderson", role: "Emergency Director", specialty: "Emergency Medicine" },
  { name: "Dr. Emily Chen", role: "Pediatrics Head", specialty: "Pediatrics" },
]

const facilityStats = [
  { icon: Building, value: "200+", label: "Beds" },
  { icon: Stethoscope, value: "50+", label: "Doctors" },
  { icon: Users, value: "200+", label: "Staff" },
  { icon: Award, value: "15+", label: "Departments" },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Caring for Our Community Since{" "}
              <span className="text-gradient">1990</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Al-Shifa Medical Complex has been at the forefront of healthcare innovation,
              providing compassionate and comprehensive medical services to our community
              for over three decades.
            </p>
            <HeartbeatLine className="mx-auto mt-8 h-10 w-72 text-primary" />
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────── */}
      <section className="container py-20">
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", text: "To provide exceptional healthcare services that improve the health and well-being of every patient we serve, while treating each individual with compassion, dignity, and respect." },
            { icon: Eye, title: "Our Vision", text: "To be the leading healthcare provider in our region, recognized for excellence in patient care, medical education, and innovative healthcare solutions." },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>
                  <p className="text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────── */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">What We Stand For</h2>
            <p className="text-muted-foreground">
              Our core values guide every decision we make and every interaction we have.
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="group h-full border-none bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <value.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="container py-20">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">Our Journey</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">A Legacy of Excellence</h2>
        </Reveal>
        <div className="mx-auto max-w-3xl">
          <Stagger className="relative space-y-10 border-l-2 border-primary/20 pl-8">
            {timeline.map((item) => (
              <StaggerItem key={item.year} className="relative">
                <div className="absolute -left-[2.85rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <span className="text-lg font-bold text-primary">{item.year}</span>
                  <div>
                    <h3 className="font-semibold">{item.event}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Leadership Team ──────────────────────────────────────────── */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <p className="text-muted-foreground">
              Experienced healthcare professionals leading our departments.
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-32 bg-gradient-to-br from-primary/25 to-primary/5" />
                  <CardContent className="-mt-8 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary ring-4 ring-background transition-transform duration-300 group-hover:scale-110">
                      <GraduationCap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.specialty}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Facilities ───────────────────────────────────────────────── */}
      <section className="container py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <Badge variant="secondary" className="mb-4">Facilities</Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Modern Healthcare Infrastructure
            </h2>
            <div className="space-y-4">
              {[
                "200+ beds with modern patient rooms",
                "State-of-the-art operating theaters",
                "Advanced diagnostic imaging center",
                "Fully equipped emergency department",
                "Specialized intensive care units",
                "In-house pharmacy and laboratory",
              ].map((facility) => (
                <div key={facility} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Stagger className="relative grid grid-cols-2 gap-4">
            <PlusMarks className="absolute -inset-4 text-primary/20" />
            {facilityStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <AnimatedCounter value={stat.value} className="block text-3xl font-bold" />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </PublicLayout>
  )
}
