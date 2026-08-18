"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { DotGrid, PlusMarks } from "@/components/illustrations"
import Image from "next/image"
import Link from "next/link"
import {
  Stethoscope,
  Search,
  MapPin,
  Clock,
  Award,
  ArrowRight,
  Star,
} from "lucide-react"
import { useState } from "react"

const doctors = [
  { id: 1, name: "Dr. Sarah Wilson", photo: "https://randomuser.me/api/portraits/women/44.jpg", specialization: "Cardiology", qualification: "MBBS, MD, DM (Cardiology)", experience: "15+ Years", rating: 4.9, reviews: 234, location: "Cardiology Department", availability: "Mon-Sat, 9AM-5PM" },
  { id: 2, name: "Dr. Michael Brown", photo: "https://randomuser.me/api/portraits/men/32.jpg", specialization: "Neurology", qualification: "MBBS, MD, DM (Neurology)", experience: "12+ Years", rating: 4.8, reviews: 189, location: "Neurology Department", availability: "Mon-Fri, 10AM-6PM" },
  { id: 3, name: "Dr. Lisa Chen", photo: "https://randomuser.me/api/portraits/women/68.jpg", specialization: "Orthopedics", qualification: "MBBS, MS (Ortho), Fellowship", experience: "10+ Years", rating: 4.9, reviews: 156, location: "Orthopedics Department", availability: "Mon-Sat, 9AM-4PM" },
  { id: 4, name: "Dr. James Wilson", photo: "https://randomuser.me/api/portraits/men/54.jpg", specialization: "Pediatrics", qualification: "MBBS, MD (Pediatrics)", experience: "18+ Years", rating: 4.9, reviews: 298, location: "Pediatrics Department", availability: "Mon-Sat, 10AM-6PM" },
  { id: 5, name: "Dr. Emma Thompson", photo: "https://randomuser.me/api/portraits/women/22.jpg", specialization: "General Medicine", qualification: "MBBS, MD (General Medicine)", experience: "20+ Years", rating: 4.7, reviews: 357, location: "General Medicine OPD", availability: "Mon-Sat, 8AM-8PM" },
  { id: 6, name: "Dr. David Lee", photo: "https://randomuser.me/api/portraits/men/76.jpg", specialization: "Emergency Medicine", qualification: "MBBS, MD (Emergency Medicine)", experience: "8+ Years", rating: 4.8, reviews: 512, location: "Emergency Department", availability: "24/7 Available" },
  { id: 7, name: "Dr. Robert Kim", photo: "https://randomuser.me/api/portraits/men/15.jpg", specialization: "Surgery", qualification: "MBBS, MS (Surgery), Fellowship", experience: "14+ Years", rating: 4.9, reviews: 145, location: "Surgery Department", availability: "Mon-Fri, 9AM-5PM" },
  { id: 8, name: "Dr. Amanda White", photo: "https://randomuser.me/api/portraits/women/55.jpg", specialization: "Dermatology", qualification: "MBBS, MD (Dermatology)", experience: "9+ Years", rating: 4.7, reviews: 89, location: "Dermatology Department", availability: "Mon-Sat, 10AM-4PM" },
  { id: 9, name: "Dr. John Martinez", photo: "https://randomuser.me/api/portraits/men/48.jpg", specialization: "Ophthalmology", qualification: "MBBS, MS (Ophthalmology)", experience: "11+ Years", rating: 4.8, reviews: 178, location: "Eye Care Center", availability: "Mon-Sat, 9AM-5PM" },
  { id: 10, name: "Dr. Rachel Green", photo: "https://randomuser.me/api/portraits/women/37.jpg", specialization: "ENT", qualification: "MBBS, MS (ENT)", experience: "7+ Years", rating: 4.6, reviews: 124, location: "ENT Department", availability: "Mon-Fri, 10AM-6PM" },
  { id: 11, name: "Dr. Priya Sharma", photo: "https://randomuser.me/api/portraits/women/62.jpg", specialization: "Gynecology", qualification: "MBBS, MS (OB-GYN)", experience: "13+ Years", rating: 4.9, reviews: 289, location: "Women's Health Center", availability: "Mon-Sat, 9AM-5PM" },
  { id: 12, name: "Dr. Andrew Foster", photo: "https://randomuser.me/api/portraits/men/91.jpg", specialization: "Psychiatry", qualification: "MBBS, MD (Psychiatry)", experience: "16+ Years", rating: 4.8, reviews: 167, location: "Mental Health Department", availability: "Mon-Fri, 10AM-6PM" },
]

const departments = [
  "All Departments",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
  "Emergency Medicine",
  "Surgery",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Gynecology",
  "Psychiatry",
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment =
      selectedDepartment === "All Departments" || doctor.specialization === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 mask-[radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Meet Our Expert{" "}
              <span className="text-gradient">Doctors</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our team of highly qualified and experienced doctors are committed to
              providing the best healthcare services with compassion and expertise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Search & Filter ──────────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container">
          <Reveal className="mx-auto flex max-w-2xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name or specialization..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Reveal>
        </div>
      </section>

      {/* ── Doctors Grid ─────────────────────────────────────────────── */}
      <section className="container py-20">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="p-0">
                  {/* Doctor avatar header */}
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
                    <PlusMarks className="absolute inset-0 h-full w-full text-primary/25" />
                    <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-background transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={doctor.photo}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <Badge className="absolute right-3 top-3 bg-card text-foreground shadow-sm">
                      {doctor.experience}
                    </Badge>
                  </div>
                  {/* Doctor info */}
                  <div className="p-6">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-amber-600 dark:bg-amber-900/30">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mb-3">{doctor.specialization}</Badge>
                    <p className="mb-4 text-sm text-muted-foreground">{doctor.qualification}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{doctor.reviews} patient reviews</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{doctor.availability}</span>
                      </div>
                    </div>

                    <Link href="/register">
                      <Button className="group/btn mt-4 w-full">
                        Book Appointment
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {filteredDoctors.length === 0 && (
          <Reveal className="py-12 text-center">
            <Stethoscope className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No doctors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </Reveal>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <PlusMarks className="absolute inset-0 h-full w-full text-primary-foreground/25" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Can&apos;t Find Your Specialist?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Contact us and we will help you find the right doctor for your needs.
              Our team is available 24/7 to assist you.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="group">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  View Services
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  )
}
