"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  User,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Stethoscope,
  CalendarCheck,
  Heart,
  Brain,
  Bone,
  Baby,
  Droplets,
  Pill,
  Ear,
  Eye,
  Star,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const departments = [
  { id: "1", name: "Cardiology", icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/40" },
  { id: "2", name: "Neurology", icon: Brain, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
  { id: "3", name: "Orthopedics", icon: Bone, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { id: "4", name: "Pediatrics", icon: Baby, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/40" },
  { id: "5", name: "Dermatology", icon: Droplets, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/40" },
  { id: "6", name: "General Medicine", icon: Pill, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/40" },
  { id: "7", name: "ENT", icon: Ear, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
  { id: "8", name: "Ophthalmology", icon: Eye, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
]

const doctors = [
  { id: "1", name: "Dr. Sarah Wilson", department: "Cardiology", availability: "Mon–Fri", rating: 4.8, patients: 1240 },
  { id: "2", name: "Dr. Michael Brown", department: "General Medicine", availability: "Mon–Sat", rating: 4.9, patients: 2100 },
  { id: "3", name: "Dr. Lisa Chen", department: "Orthopedics", availability: "Tue–Sat", rating: 4.7, patients: 980 },
  { id: "4", name: "Dr. James Wilson", department: "Pediatrics", availability: "Mon–Fri", rating: 4.6, patients: 1560 },
  { id: "5", name: "Dr. Emma Thompson", department: "Dermatology", availability: "Wed–Sun", rating: 4.8, patients: 870 },
  { id: "6", name: "Dr. Robert Garcia", department: "Neurology", availability: "Mon–Fri", rating: 4.9, patients: 1320 },
]

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
]

const appointmentTypes = ["Consultation", "Follow-up", "Checkup", "Emergency", "Lab Test", "Vaccination"]

const steps = [
  { label: "Select Doctor", desc: "Choose department & doctor" },
  { label: "Choose Time", desc: "Pick date & time slot" },
  { label: "Confirm", desc: "Review & confirm booking" },
]

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const filteredDoctors = doctors.filter(
    (d) => !selectedDepartment || d.department === selectedDepartment
  )
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor)
  const selectedDeptData = departments.find((d) => d.name === selectedDepartment)

  const canProceedStep1 = !!(selectedDepartment && selectedDoctor)
  const canProceedStep2 = !!(selectedDate && selectedTime && appointmentType)
  const canProceedStep3 = reason.length >= 10

  const handleBook = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsBooked(true)
  }

  if (isBooked) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-green-400" />
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-muted-foreground text-sm mb-6">
              You&apos;ll receive a confirmation email and a reminder before your appointment.
            </p>
            <div className="bg-muted/40 rounded-xl p-4 text-left mb-6 space-y-3">
              {selectedDeptData && (
                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", selectedDeptData.bg)}>
                    <selectedDeptData.icon className={cn("h-5 w-5", selectedDeptData.color)} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{selectedDoctorData?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedDepartment}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                  <p className="font-semibold">
                    {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Time</p>
                  <p className="font-semibold">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Type</p>
                  <p className="font-semibold">{appointmentType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Rating</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {selectedDoctorData?.rating}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/patient/appointments">View My Appointments</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/patient/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Book an Appointment</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Schedule a visit with your preferred doctor</p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto gap-2">
          <Link href="/patient/appointments">
            <ArrowLeft className="h-4 w-4" />
            Back to Appointments
          </Link>
        </Button>
      </div>

      {/* Progress Steps */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center">
            {steps.map((s, idx) => {
              const num = idx + 1
              const done = step > num
              const current = step === num
              return (
                <div key={num} className={cn("flex items-center", num < 3 ? "flex-1" : "")}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200",
                        done
                          ? "bg-primary text-white"
                          : current
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : num}
                    </div>
                    <div className="hidden sm:block mt-1.5 text-center">
                      <p className={cn("text-xs font-medium", done || current ? "text-foreground" : "text-muted-foreground")}>
                        {s.label}
                      </p>
                    </div>
                  </div>
                  {num < 3 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-2 sm:mx-3 rounded-full transition-colors duration-300",
                        step > num ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className="sm:hidden mt-3">
            <p className="text-sm font-semibold">{steps[step - 1].label}</p>
            <p className="text-xs text-muted-foreground">{steps[step - 1].desc}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              Select Department & Doctor
            </CardTitle>
            <CardDescription>Choose the department and doctor you wish to visit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Department</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {departments.map((dept) => {
                  const Icon = dept.icon
                  const isSelected = selectedDepartment === dept.name
                  return (
                    <button
                      key={dept.id}
                      onClick={() => { setSelectedDepartment(dept.name); setSelectedDoctor("") }}
                      className={cn(
                        "p-3 sm:p-4 rounded-xl border-2 text-left transition-all hover:shadow-md group",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110", dept.bg)}>
                        <Icon className={cn("h-5 w-5", dept.color)} />
                      </div>
                      <p className="font-medium text-xs sm:text-sm leading-tight">{dept.name}</p>
                      {isSelected && (
                        <div className="mt-1.5 flex items-center gap-1">
                          <Check className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary font-medium">Selected</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedDepartment && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Doctor</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredDoctors.map((doctor) => {
                    const isSelected = selectedDoctor === doctor.id
                    return (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="font-semibold text-sm truncate">{doctor.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-medium text-amber-600">{doctor.rating}</span>
                              <span className="text-xs text-muted-foreground">• {doctor.patients.toLocaleString()} patients</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {doctor.availability}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <Button disabled={!canProceedStep1} onClick={() => setStep(2)} className="gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Choose Date & Time */}
      {step === 2 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarCheck className="h-4 w-4 text-primary" />
              </div>
              Choose Date & Time
            </CardTitle>
            <CardDescription>Select your preferred appointment slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Date</Label>
                <div className="flex justify-center lg:justify-start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); setSelectedTime("") }}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-xl border shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Available Time Slots
                    {selectedDate && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                      </span>
                    )}
                  </Label>
                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20">
                      <CalendarCheck className="h-8 w-8 mb-2 opacity-30" />
                      <p className="text-sm">Select a date to see available slots</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "p-2.5 rounded-lg border text-xs font-medium transition-all",
                            selectedTime === time
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "border-border hover:border-primary hover:bg-primary/5"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Appointment Type</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDate && selectedTime && appointmentType && (
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-xs font-medium text-primary mb-1">Selected Slot</p>
                    <p className="text-sm font-semibold">
                      {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {selectedTime}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{appointmentType}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-1">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button disabled={!canProceedStep2} onClick={() => setStep(3)} className="gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              Confirm Your Appointment
            </CardTitle>
            <CardDescription>Review your details and provide a reason for visit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border bg-muted/20 p-4 space-y-4">
              <p className="text-sm font-semibold">Appointment Summary</p>
              {selectedDeptData && (
                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", selectedDeptData.bg)}>
                    <selectedDeptData.icon className={cn("h-5 w-5", selectedDeptData.color)} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{selectedDoctorData?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedDepartment}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-sm text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{selectedDoctorData?.rating}</span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                  <p className="font-semibold">
                    {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Time</p>
                  <p className="font-semibold">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Type</p>
                  <p className="font-semibold">{appointmentType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Availability</p>
                  <p className="font-semibold">{selectedDoctorData?.availability}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-semibold">
                Reason for Visit <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Describe your symptoms or reason for this appointment (minimum 10 characters)..."
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 500))}
                rows={3}
                className="resize-none"
              />
              <div className="flex justify-between text-xs">
                <span className={cn("text-muted-foreground", reason.length > 0 && reason.length < 10 && "text-amber-600")}>
                  {reason.length < 10
                    ? `${10 - reason.length} more character${10 - reason.length !== 1 ? "s" : ""} needed`
                    : "✓ Ready to submit"}
                </span>
                <span className="text-muted-foreground">{reason.length}/500</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-semibold">
                Additional Notes <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Any other information you'd like to share with your doctor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Please arrive 10 minutes early and bring your insurance card and any previous medical records.
              </p>
            </div>

            <div className="flex justify-between pt-1">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                disabled={!canProceedStep3 || isSubmitting}
                onClick={handleBook}
                className="gap-2 min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-4 w-4" />
                    Confirm Booking
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
