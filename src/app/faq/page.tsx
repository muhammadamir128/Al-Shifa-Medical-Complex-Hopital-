"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { DotGrid, PlusMarks, WaveDivider } from "@/components/illustrations"
import Link from "next/link"
import {
  HelpCircle,
  Search,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  Users,
  Clock,
  Shield,
  Building2,
} from "lucide-react"
import { useState } from "react"

const faqCategories = [
  {
    icon: Calendar,
    title: "Appointments",
    faqs: [
      { question: "How do I book an appointment?", answer: "You can book an appointment through our online patient portal, by calling our reception at (555) 123-4567, or by visiting our hospital in person. Online booking is available 24/7 and you can choose your preferred doctor, department, and time slot." },
      { question: "Can I reschedule or cancel my appointment?", answer: "Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time through the patient portal or by calling our reception. Late cancellations may incur a fee." },
      { question: "How long is a typical appointment?", answer: "A standard consultation typically lasts 15-30 minutes depending on the type of appointment. Follow-up visits may be shorter, while initial consultations or complex cases may take longer." },
      { question: "Do I need to bring any documents for my appointment?", answer: "Please bring your ID, insurance card (if applicable), list of current medications, and any relevant medical records or test results. New patients should arrive 15 minutes early to complete registration." },
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Insurance",
    faqs: [
      { question: "What insurance plans do you accept?", answer: "We accept most major insurance plans. Please contact our billing department or check our website for the complete list of accepted insurance providers. We also offer direct billing for many insurance companies." },
      { question: "What payment methods do you accept?", answer: "We accept cash, credit/debit cards, bank transfers, and mobile payment apps. For patients with insurance, we can process claims directly with your provider." },
      { question: "Can I get an estimate for my treatment?", answer: "Yes, our billing department can provide cost estimates for procedures and treatments. Please contact us with your specific requirements, and we will prepare a detailed estimate." },
      { question: "Do you offer payment plans?", answer: "Yes, we offer flexible payment plans for eligible patients. Please speak with our billing department to discuss options that work for your situation." },
    ],
  },
  {
    icon: FileText,
    title: "Medical Records",
    faqs: [
      { question: "How can I access my medical records?", answer: "You can access your medical records through our secure patient portal. Log in with your credentials to view test results, prescriptions, visit summaries, and more. You can also request copies from our medical records department." },
      { question: "Can I share my records with another healthcare provider?", answer: "Yes, you can authorize the release of your medical records to another healthcare provider. Please submit a written request to our medical records department with the recipient's details." },
      { question: "How long do you keep medical records?", answer: "We maintain medical records according to regulatory requirements, typically for a minimum of 7 years for adults and until age 21 for minors. Some records may be kept longer based on the type of care provided." },
      { question: "Is my medical information secure?", answer: "Yes, we take data security very seriously. All medical records are stored securely with encryption, and access is strictly controlled. We comply with all healthcare data protection regulations." },
    ],
  },
  {
    icon: Users,
    title: "Patient Portal",
    faqs: [
      { question: "How do I register for the patient portal?", answer: "You can register for the patient portal during your hospital visit or online through our website. You will need to provide basic information and verify your identity to create an account." },
      { question: "What can I do on the patient portal?", answer: "The patient portal allows you to book appointments, view test results, request prescription refills, communicate with your healthcare team, view billing statements, and access your medical records." },
      { question: "I forgot my password. How do I reset it?", answer: "Click on 'Forgot Password' on the login page and enter your registered email. You will receive a password reset link. If you continue to have issues, please contact our support team." },
      { question: "Can family members access my account?", answer: "Yes, you can grant proxy access to family members or caregivers through the patient portal. You control what information they can see and can revoke access at any time." },
    ],
  },
  {
    icon: Clock,
    title: "Visiting Information",
    faqs: [
      { question: "What are the hospital visiting hours?", answer: "General visiting hours are from 10:00 AM to 8:00 PM daily. ICU and special units have restricted visiting hours. Please check with the specific department or call ahead for current visiting policies." },
      { question: "Is parking available?", answer: "Yes, free parking is available for patients and visitors. We have both surface lots and a parking garage. Valet parking is also available during peak hours." },
      { question: "What should I bring for a hospital stay?", answer: "Bring comfortable clothing, toiletries, medications you are currently taking, ID, insurance cards, and any necessary medical devices. Avoid bringing valuables. We provide basic amenities." },
      { question: "Are there dining options in the hospital?", answer: "Yes, we have a cafeteria, coffee shop, and vending machines. Patients receive meals as part of their care. Visitors can purchase meals at the cafeteria during operating hours." },
    ],
  },
  {
    icon: Shield,
    title: "Safety & Policies",
    faqs: [
      { question: "What safety measures are in place?", answer: "We maintain strict hygiene protocols, regular sanitization, air filtration systems, and follow all healthcare safety guidelines. Our staff is trained in infection control and emergency procedures." },
      { question: "What is your privacy policy?", answer: "We are committed to protecting patient privacy and comply with all applicable healthcare privacy laws. Your medical information is only shared with authorized individuals involved in your care." },
      { question: "Can I get a second opinion?", answer: "Yes, you have the right to seek a second opinion. We can provide your medical records to another specialist, or you can request a consultation with another doctor within our network." },
      { question: "What if I have a complaint?", answer: "We take all feedback seriously. You can submit complaints through our patient relations department, patient portal, or in person. We will investigate and respond to your concerns promptly." },
    ],
  },
]

const supportChannels = [
  { icon: Phone, title: "Call Us", desc: "Available 24/7", action: <a href="tel:5551234567" className="font-medium text-primary hover:underline">(555) 123-4567</a> },
  { icon: Mail, title: "Email Us", desc: "Response within 24 hours", action: <a href="mailto:info@alshifamedical.com" className="font-medium text-primary hover:underline">info@alshifamedical.com</a> },
  { icon: MessageSquare, title: "Live Chat", desc: "Available during business hours", action: <Button variant="link" className="text-primary">Start Chat</Button> },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.title })),
  )

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : null

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Help Center</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Find answers to common questions about our services, appointments,
              billing, and more. Can&apos;t find what you&apos;re looking for? Contact us.
            </p>
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                className="h-12 pl-12 text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Search Results or Categories ─────────────────────────────── */}
      <section className="container py-16">
        {filteredFaqs ? (
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-xl font-semibold">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} found
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`search-${index}`} className="rounded-lg border bg-card px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="text-left">
                      <Badge variant="outline" className="mb-2">{faq.category}</Badge>
                      <p className="font-medium">{faq.question}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <div className="py-12 text-center">
                <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">Try different keywords or browse categories below</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <Reveal key={category.title}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${catIndex}-${faqIndex}`}
                      className="rounded-lg border bg-card px-4 transition-colors hover:border-primary/40"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Contact Cards ────────────────────────────────────────────── */}
      <section className="relative bg-muted/30 py-16">
        <WaveDivider className="absolute inset-x-0 -top-px text-background" />
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Still Need Help?</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Contact Our Support Team</h2>
            <p className="text-muted-foreground">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
            </p>
          </Reveal>
          <Stagger className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <StaggerItem key={channel.title}>
                <Card className="group h-full border-none text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <channel.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold">{channel.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{channel.desc}</p>
                    {channel.action}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="container py-16">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <PlusMarks className="absolute inset-0 h-full w-full text-primary/15" />
          <Building2 className="relative mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="relative mb-4 text-3xl font-bold tracking-tight">Ready to Visit Us?</h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-muted-foreground">
            Book an appointment today and experience our quality healthcare services.
            Our team of experts is ready to assist you.
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
