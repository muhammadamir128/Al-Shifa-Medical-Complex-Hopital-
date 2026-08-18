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
import { Reveal, Stagger, StaggerItem, AnimatedCounter } from "@/components/motion"
import { DotGrid, PlusMarks, WaveDivider } from "@/components/illustrations"
import Link from "next/link"
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Building2,
  Users,
  Heart,
  Award,
  GraduationCap,
  Send,
  CheckCircle2
} from "lucide-react"
import { useState } from "react"

const jobListings = [
  {
    id: 1,
    title: "Senior Cardiologist",
    department: "Cardiology",
    type: "Full-time",
    location: "Main Campus",
    experience: "8+ years",
    salary: "$250,000 - $350,000",
    posted: "2 days ago",
    description: "We are seeking an experienced cardiologist to join our growing cardiac care team. The ideal candidate will have expertise in interventional cardiology and a passion for patient care.",
    requirements: ["MD/DO with Cardiology Fellowship", "Board Certified in Cardiology", "8+ years clinical experience", "Strong patient communication skills"]
  },
  {
    id: 2,
    title: "Registered Nurse - ICU",
    department: "Critical Care",
    type: "Full-time",
    location: "Main Campus",
    experience: "3+ years",
    salary: "$75,000 - $95,000",
    posted: "3 days ago",
    description: "Join our intensive care team and provide exceptional patient care in our state-of-the-art ICU facility. Night and day shifts available.",
    requirements: ["BSN or ADN from accredited program", "Current RN license", "ICU/CCU experience preferred", "ACLS/BLS certification"]
  },
  {
    id: 3,
    title: "Emergency Medicine Physician",
    department: "Emergency",
    type: "Full-time",
    location: "Emergency Department",
    experience: "5+ years",
    salary: "$280,000 - $380,000",
    posted: "1 week ago",
    description: "Seeking board-certified emergency medicine physicians for our busy 24/7 emergency department. Competitive compensation and flexible scheduling.",
    requirements: ["MD/DO in Emergency Medicine", "Board Certified/Eligible", "ATLS/ACLS certification", "Strong decision-making skills"]
  },
  {
    id: 4,
    title: "Medical Laboratory Technician",
    department: "Laboratory",
    type: "Full-time",
    location: "Lab Services",
    experience: "2+ years",
    salary: "$55,000 - $70,000",
    posted: "1 week ago",
    description: "Perform diagnostic tests and analyze samples in our CAP-accredited laboratory. Experience with automated analyzers preferred.",
    requirements: ["Associate degree in Medical Technology", "ASCP certification preferred", "Experience with lab equipment", "Attention to detail"]
  },
  {
    id: 5,
    title: "Pediatric Nurse Practitioner",
    department: "Pediatrics",
    type: "Full-time",
    location: "Children's Center",
    experience: "3+ years",
    salary: "$110,000 - $130,000",
    posted: "2 weeks ago",
    description: "Provide comprehensive pediatric care in our newly expanded children's center. Collaborative environment with pediatricians and specialists.",
    requirements: ["MSN with PNP certification", "Current NP license", "Pediatric experience", "NRP/PALS certification"]
  },
  {
    id: 6,
    title: "Patient Services Representative",
    department: "Administration",
    type: "Full-time",
    location: "Multiple Locations",
    experience: "1+ years",
    salary: "$40,000 - $50,000",
    posted: "3 days ago",
    description: "First point of contact for patients. Handle scheduling, registration, and insurance verification. Excellent customer service required.",
    requirements: ["High school diploma required", "Healthcare experience preferred", "EMR experience a plus", "Strong communication skills"]
  },
  {
    id: 7,
    title: "Physical Therapist",
    department: "Rehabilitation",
    type: "Full-time",
    location: "Rehab Center",
    experience: "2+ years",
    salary: "$80,000 - $100,000",
    posted: "1 week ago",
    description: "Join our rehabilitation team helping patients recover from surgery, injury, and illness. Outpatient and inpatient opportunities available.",
    requirements: ["DPT from accredited program", "Current PT license", "Orthopedic experience preferred", "Manual therapy skills"]
  },
  {
    id: 8,
    title: "Clinical Pharmacist",
    department: "Pharmacy",
    type: "Full-time",
    location: "Pharmacy Services",
    experience: "3+ years",
    salary: "$120,000 - $145,000",
    posted: "2 weeks ago",
    description: "Provide clinical pharmacy services including medication therapy management, drug information, and patient education.",
    requirements: ["PharmD degree", "Current pharmacy license", "Hospital experience required", "Clinical pharmacy residency preferred"]
  }
]

const departments = [
  "All Departments",
  "Cardiology",
  "Critical Care",
  "Emergency",
  "Laboratory",
  "Pediatrics",
  "Administration",
  "Rehabilitation",
  "Pharmacy"
]

const benefits = [
  { icon: Heart, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: GraduationCap, title: "Education Support", description: "Tuition reimbursement and continuing education" },
  { icon: Clock, title: "Work-Life Balance", description: "Flexible scheduling and generous PTO" },
  { icon: Award, title: "Retirement Plans", description: "401(k) with hospital matching contributions" }
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedType, setSelectedType] = useState("all")

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment
    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType
    return matchesSearch && matchesDepartment && matchesType
  })

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Briefcase className="mr-1 h-3 w-3" />
              Careers
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Join Our{" "}
              <span className="text-gradient">Healthcare Team</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Build a rewarding career with Al-Shifa Medical Complex. We&apos;re looking for
              passionate healthcare professionals who share our commitment to exceptional patient care.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-medium">{jobListings.length} Open Positions</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Multiple Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">500+ Employees</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-12">
        <Reveal className="mb-8 text-center">
          <Badge variant="secondary" className="mb-2">Why Work With Us</Badge>
          <h2 className="text-2xl font-bold">Employee Benefits</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <Card className="group h-full border-none text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Job Listings */}
      <section className="container py-12">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-bold">
            Open Positions
            <span className="ml-2 text-lg font-normal text-muted-foreground">
              ({filteredJobs.length} jobs found)
            </span>
          </h2>
        </Reveal>
        <Stagger className="space-y-4">
          {filteredJobs.map((job) => (
            <StaggerItem key={job.id}>
              <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                          {job.title}
                        </h3>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{job.posted}</span>
                      <Button className="group/btn w-full lg:w-auto">
                        Apply Now
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mt-4 border-t pt-4">
                    <p className="mb-2 text-sm font-medium">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {filteredJobs.length === 0 && (
          <Reveal className="py-12 text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </Reveal>
        )}
      </section>

      {/* Application Process */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <Reveal className="mb-12 text-center">
            <Badge variant="secondary" className="mb-2">How to Apply</Badge>
            <h2 className="text-2xl font-bold">Application Process</h2>
          </Reveal>
          <Stagger className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Find a Position", description: "Browse our open positions and find one that matches your skills" },
              { step: "2", title: "Submit Application", description: "Complete the online application with your resume and cover letter" },
              { step: "3", title: "Interview", description: "Meet with our hiring team for an initial and technical interview" },
              { step: "4", title: "Join Our Team", description: "Receive your offer and start your journey with us" }
            ].map((item, index) => (
              <StaggerItem key={index} className="relative">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="absolute top-6 left-full hidden h-0.5 w-full -translate-x-1/2 bg-primary/20 md:block" />
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <WaveDivider className="absolute inset-x-0 bottom-0 text-primary/10" flip />
          <h2 className="relative mb-4 text-3xl font-bold tracking-tight">
            Don&apos;t See a Suitable Position?
          </h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-muted-foreground">
            Send us your resume and we&apos;ll keep you in mind for future opportunities
            that match your skills and experience.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="group">
                Submit Your Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn About Us
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
