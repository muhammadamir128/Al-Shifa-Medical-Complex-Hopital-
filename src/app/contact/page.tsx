"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { DotGrid, PlusMarks } from "@/components/illustrations"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const contactInfo = [
  { icon: Phone, title: "Phone", details: ["(555) 123-4567", "(555) 123-4568"], description: "Main Reception" },
  { icon: Mail, title: "Email", details: ["info@alshifamedical.com", "support@alshifamedical.com"], description: "General Inquiries" },
  { icon: MapPin, title: "Address", details: ["456 Healthcare Ave", "Medical City, MC 12345"], description: "Main Hospital" },
  { icon: Clock, title: "Working Hours", details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Emergency: 24/7"], description: "Service Hours" },
]

const departments = [
  "General Inquiry",
  "Appointments",
  "Billing",
  "Medical Records",
  "Emergency Services",
  "Patient Relations",
  "Human Resources",
  "Other",
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", department: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Get in Touch{" "}
              <span className="text-gradient">With Us</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? Our team is here to help you.
              Reach out through any of the channels below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Emergency Banner ─────────────────────────────────────────── */}
      <section className="bg-destructive py-4 text-destructive-foreground">
        <div className="container">
          <div className="flex items-center justify-center gap-4">
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-destructive-foreground/25" />
              <AlertTriangle className="relative h-6 w-6" />
            </span>
            <div className="text-center">
              <p className="font-semibold">Medical Emergency?</p>
              <p className="text-sm">Call (555) 123-4567 or visit our Emergency Department 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards ───────────────────────────────────────── */}
      <section className="container py-16">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info) => (
            <StaggerItem key={info.title}>
              <Card className="group h-full border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <info.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                  <p className="mt-2 text-xs text-primary">{info.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Contact Form & Map ───────────────────────────────────────── */}
      <section className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Reveal direction="right">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle>Send us a Message</CardTitle>
                </div>
                <CardDescription>
                  Fill out the form below and we&apos;ll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <select
                        id="department"
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          {/* Map & Additional Info */}
          <Stagger className="space-y-6">
            <StaggerItem>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative flex h-64 items-center justify-center bg-muted">
                  <PlusMarks className="absolute inset-0 h-full w-full text-primary/20" />
                  <div className="relative text-center">
                    <span className="relative mx-auto mb-3 flex h-14 w-14 items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                        <MapPin className="h-7 w-7 text-primary" />
                      </span>
                    </span>
                    <p className="font-medium">Al-Shifa Medical Complex</p>
                    <p className="text-sm text-muted-foreground">456 Healthcare Ave, Medical City</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Book Appointment", action: "Book Now" },
                    { label: "Patient Portal", action: "Access" },
                    { label: "Medical Records", action: "Request" },
                    { label: "Billing Support", action: "Contact" },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? "border-b" : ""}`}
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <Button variant="ghost" size="sm">{item.action}</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Connect With Us</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social) => (
                      <Button key={social} variant="outline" size="sm">{social}</Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Stagger className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { q: "How do I book an appointment?", a: "You can book appointments through our patient portal or by calling our reception." },
              { q: "What are your visiting hours?", a: "General visiting hours are from 10 AM to 8 PM. ICU has restricted hours." },
              { q: "Do you accept insurance?", a: "Yes, we accept most major insurance plans. Please contact billing for details." },
              { q: "How can I access my medical records?", a: "Medical records can be accessed through our secure patient portal." },
            ].map((faq) => (
              <StaggerItem key={faq.q}>
                <Card className="h-full border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
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
