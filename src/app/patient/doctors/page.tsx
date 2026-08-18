"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Star,
  Search,
  MapPin,
  Clock,
  Calendar,
  Stethoscope,
  Award,
  Filter,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const doctors = [
  {
    id: "DOC-001",
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    department: "Cardiology",
    experience: "12 years",
    rating: 4.9,
    reviewCount: 284,
    availability: "Available Today",
    nextSlot: "10:00 AM",
    location: "Building B, Room 301",
    languages: ["English", "Spanish"],
    education: "Harvard Medical School",
    availableStatus: "AVAILABLE",
  },
  {
    id: "DOC-002",
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    department: "Neurology",
    experience: "15 years",
    rating: 4.8,
    reviewCount: 312,
    availability: "Next Available: Tomorrow",
    nextSlot: "09:00 AM",
    location: "Building A, Room 204",
    languages: ["English", "Mandarin"],
    education: "Johns Hopkins University",
    availableStatus: "BUSY",
  },
  {
    id: "DOC-003",
    name: "Dr. Emily Rodriguez",
    specialization: "General Medicine",
    department: "General Medicine",
    experience: "8 years",
    rating: 4.7,
    reviewCount: 198,
    availability: "Available Today",
    nextSlot: "02:30 PM",
    location: "Building C, Room 105",
    languages: ["English", "Spanish"],
    education: "Stanford University",
    availableStatus: "AVAILABLE",
  },
  {
    id: "DOC-004",
    name: "Dr. James Patel",
    specialization: "Orthopedics",
    department: "Orthopedics",
    experience: "20 years",
    rating: 4.9,
    reviewCount: 421,
    availability: "Next Available: Jan 26",
    nextSlot: "11:00 AM",
    location: "Building D, Room 402",
    languages: ["English", "Hindi"],
    education: "Mayo Clinic",
    availableStatus: "FULLY_BOOKED",
  },
  {
    id: "DOC-005",
    name: "Dr. Lisa Thompson",
    specialization: "Dermatology",
    department: "Dermatology",
    experience: "10 years",
    rating: 4.6,
    reviewCount: 156,
    availability: "Available Today",
    nextSlot: "03:00 PM",
    location: "Building B, Room 208",
    languages: ["English"],
    education: "University of California",
    availableStatus: "AVAILABLE",
  },
  {
    id: "DOC-006",
    name: "Dr. Robert Kim",
    specialization: "Psychiatry",
    department: "Psychiatry",
    experience: "18 years",
    rating: 4.8,
    reviewCount: 267,
    availability: "Next Available: Tomorrow",
    nextSlot: "10:30 AM",
    location: "Building E, Room 501",
    languages: ["English", "Korean"],
    education: "Columbia University",
    availableStatus: "BUSY",
  },
]

const specializations = ["All Specializations", "Cardiology", "Neurology", "General Medicine", "Orthopedics", "Dermatology", "Psychiatry"]

const availabilityColors: Record<string, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-700",
  BUSY: "bg-amber-100 text-amber-700",
  FULLY_BOOKED: "bg-red-100 text-red-700",
}

const availabilityLabels: Record<string, string> = {
  AVAILABLE: "Available",
  BUSY: "Busy",
  FULLY_BOOKED: "Fully Booked",
}

export default function PatientDoctorsPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [specialization, setSpecialization] = useState("All Specializations")
  const [availability, setAvailability] = useState("all")

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
    const matchSpec = specialization === "All Specializations" || d.specialization === specialization
    const matchAvail = availability === "all" || d.availableStatus === availability
    return matchSearch && matchSpec && matchAvail
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Find a Doctor</h1>
        <p className="text-muted-foreground">Browse our specialists and book an appointment</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Doctors", value: doctors.length.toString(), color: "bg-primary/10 text-primary" },
          { label: "Available Now", value: doctors.filter(d => d.availableStatus === "AVAILABLE").length.toString(), color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" },
          { label: "Specializations", value: "12+", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
          { label: "Avg. Rating", value: "4.8★", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-md">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color.split(" ")[1]}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialization..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specializations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="AVAILABLE">Available Today</SelectItem>
                <SelectItem value="BUSY">Busy</SelectItem>
                <SelectItem value="FULLY_BOOKED">Fully Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <Card key={doc.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold truncate">{doc.name}</p>
                      <p className="text-primary text-sm font-medium">{doc.specialization}</p>
                    </div>
                    <Badge className={`${availabilityColors[doc.availableStatus]} text-xs shrink-0`}>
                      {availabilityLabels[doc.availableStatus]}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{doc.rating}</span>
                    <span className="text-xs text-muted-foreground">({doc.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  <span>{doc.experience} · {doc.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{doc.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{doc.availability}</span>
                  {doc.availableStatus === "AVAILABLE" && (
                    <span className="text-emerald-600 font-medium">· {doc.nextSlot}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {doc.languages.map(lang => (
                  <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1"
                  disabled={doc.availableStatus === "FULLY_BOOKED"}
                  onClick={() => toast({ title: `Appointment request sent to ${doc.name}` })}
                >
                  <Calendar className="mr-2 h-4 w-4" />Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground">
            <Stethoscope className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No doctors found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
