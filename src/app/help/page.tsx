"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Search,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { PublicLayout } from "@/components/shared/public-layout"

const faqCategories = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "How do I book an appointment?",
        answer: "You can book an appointment through your dashboard by clicking on 'Book Appointment'. Select the department, doctor, preferred date and time, then confirm your booking."
      },
      {
        question: "How do I access my medical records?",
        answer: "Navigate to the 'Medical History' section in your patient dashboard. You can view all your past medical records, lab results, and prescriptions there."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to Profile page from the sidebar menu, click 'Edit Profile', update your information, and save the changes."
      }
    ]
  },
  {
    title: "Appointments",
    faqs: [
      {
        question: "Can I cancel or reschedule my appointment?",
        answer: "Yes, you can cancel or reschedule appointments from your appointments page. Please do so at least 24 hours in advance to avoid any cancellation fees."
      },
      {
        question: "How will I know if my appointment is confirmed?",
        answer: "You'll receive a confirmation notification and email once your appointment is confirmed by the hospital staff."
      },
      {
        question: "What should I bring to my appointment?",
        answer: "Please bring your ID, insurance card (if applicable), and any relevant medical records or test results."
      }
    ]
  },
  {
    title: "Billing & Payments",
    faqs: [
      {
        question: "How can I view my bills?",
        answer: "Navigate to the 'My Bills' section in your patient dashboard to view all your invoices and payment history."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards, bank transfers, and cash payments at the hospital. Insurance claims can also be processed directly."
      },
      {
        question: "Can I get a refund for a cancelled appointment?",
        answer: "Refunds for cancelled appointments are processed within 5-7 business days. Contact billing support for assistance."
      }
    ]
  },
  {
    title: "Technical Support",
    faqs: [
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click on 'Forgot Password' on the login page, enter your registered email, and follow the instructions sent to your email."
      },
      {
        question: "The website is not loading properly. What should I do?",
        answer: "Try clearing your browser cache, using a different browser, or checking your internet connection. If the issue persists, contact technical support."
      },
      {
        question: "How do I enable/disable notifications?",
        answer: "Go to Settings > Notifications to manage your notification preferences for email and push notifications."
      }
    ]
  }
]

const quickLinks = [
  { title: "Patient Guide", href: "#", icon: Book },
  { title: "Contact Support", href: "/contact", icon: MessageSquare },
  { title: "Emergency: (555) 123-4567", href: "tel:5551234567", icon: Phone },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Your message has been sent. We'll get back to you soon!")
    setContactForm({ subject: "", message: "" })
  }

  return (
    <PublicLayout>
    <div className="bg-muted/30 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">How can we help you?</h1>
          <p className="text-muted-foreground mb-6">
            Search our help center or browse topics below
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{link.title}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </h2>
            
            {faqCategories.map((category, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Support
            </h2>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Send us a message</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>support@alshifamedical.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </PublicLayout>
  )
}
