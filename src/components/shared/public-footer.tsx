"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/motion"
import { HeartbeatLine } from "@/components/illustrations"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/doctors", label: "Our Doctors" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services", label: "Emergency Care" },
    { href: "/services", label: "Outpatient Services" },
    { href: "/services", label: "Laboratory" },
    { href: "/services", label: "Pharmacy" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Health Blog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ],
}

const socials = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M18.9 2.3h3.3l-7.2 8.2 8.4 11.2h-6.6l-5.2-6.8-5.9 6.8H2.4l7.7-8.8L2 2.3h6.8l4.7 6.2 5.4-6.2Zm-1.2 17.6h1.8L7.1 4.1H5.2l12.5 15.8Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.5 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.5-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.5-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.5 2.4-.5C9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
]

const contact = [
  { icon: Phone, text: "(555) 123-4567" },
  { icon: Mail, text: "info@alshifamedical.com" },
  { icon: MapPin, text: "456 Healthcare Ave, Medical City" },
  { icon: Clock, text: "Emergency: Open 24/7" },
]

export function PublicFooter() {
  return (
    <footer className="relative mt-auto border-t bg-muted/40">
      {/* Heartbeat accent */}
      <div className="absolute inset-x-0 -top-px flex justify-center overflow-hidden">
        <HeartbeatLine className="h-10 w-[640px] max-w-full text-primary" />
      </div>

      <div className="container py-14">
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground">
              Comprehensive Hospital Management System providing quality healthcare
              services and compassionate patient care since 1990.
            </p>
            <ul className="space-y-2">
              {contact.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Al-Shifa Medical Complex. All rights reserved.</p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
