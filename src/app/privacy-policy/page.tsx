"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  ArrowRight,
  Mail
} from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Privacy{" "}
              <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Database, label: "Data Collection" },
              { icon: Eye, label: "How We Use Data" },
              { icon: Lock, label: "Data Security" },
              { icon: UserCheck, label: "Your Rights" }
            ].map((item, index) => (
              <a key={index} href={`#${item.label.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Al-Shifa Medical Complex (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our hospital, use our website, patient portal, or mobile applications.
              </p>
              <p className="text-muted-foreground mt-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this 
                privacy policy, please do not access the site or use our services.
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div id="data-collection">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Name, date of birth, gender, and contact information</li>
                      <li>Social Security number (for billing and insurance purposes)</li>
                      <li>Government-issued identification numbers</li>
                      <li>Emergency contact information</li>
                      <li>Insurance information and billing details</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Health Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Medical history, diagnoses, and treatment records</li>
                      <li>Lab results, imaging, and diagnostic reports</li>
                      <li>Prescriptions and medication history</li>
                      <li>Allergies and immunization records</li>
                      <li>Clinical notes and care plans</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technical Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>IP address, browser type, and device information</li>
                      <li>Website usage patterns and preferences</li>
                      <li>Cookies and similar tracking technologies</li>
                      <li>Login credentials and authentication data</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How We Use Data */}
          <div id="how-we-use-data">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Healthcare Services</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Provide medical care and treatment</li>
                      <li>Coordinate your care among providers</li>
                      <li>Process prescriptions and lab orders</li>
                      <li>Manage appointments and communications</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Administrative</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Process billing and insurance claims</li>
                      <li>Maintain accurate medical records</li>
                      <li>Verify identity and eligibility</li>
                      <li>Comply with legal requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Communication</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Send appointment reminders</li>
                      <li>Share test results and reports</li>
                      <li>Provide health education materials</li>
                      <li>Respond to your inquiries</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Improvement</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Improve our services and patient experience</li>
                      <li>Conduct quality assurance activities</li>
                      <li>Train healthcare professionals</li>
                      <li>Conduct research (with consent)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Security */}
          <div id="data-security">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  We implement robust security measures to protect your personal and health information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Encryption", desc: "All data is encrypted in transit and at rest using industry-standard protocols" },
                    { title: "Access Controls", desc: "Strict role-based access controls limit who can view your information" },
                    { title: "Audit Logs", desc: "All access to patient records is logged and monitored for suspicious activity" },
                    { title: "Security Training", desc: "All staff receive regular training on data protection and privacy" },
                    { title: "Regular Audits", desc: "We conduct regular security assessments and vulnerability testing" },
                    { title: "Compliance", desc: "We comply with HIPAA, HITECH, and other applicable regulations" }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Your Rights */}
          <div id="your-rights">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Your Rights</h2>
            </div>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { title: "Access", desc: "You have the right to access and receive a copy of your health records" },
                    { title: "Correction", desc: "You can request corrections to inaccurate or incomplete information" },
                    { title: "Restriction", desc: "You may request restrictions on certain uses and disclosures of your information" },
                    { title: "Confidentiality", desc: "You can request confidential communications through alternative means" },
                    { title: "Accounting", desc: "You can request a list of disclosures of your health information" },
                    { title: "Copy of Notice", desc: "You can obtain a paper copy of this privacy notice upon request" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border-b last:border-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Sharing */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                We may share your information in the following circumstances:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-4">
                <li><strong>Healthcare Providers:</strong> With other healthcare providers involved in your care</li>
                <li><strong>Insurance Companies:</strong> For billing and claims processing purposes</li>
                <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
                <li><strong>Public Health:</strong> For public health activities and disease reporting</li>
                <li><strong>Research:</strong> With your explicit consent for approved research studies</li>
                <li><strong>Business Associates:</strong> With third parties who perform services on our behalf</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-muted/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Questions or Concerns?</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              If you have questions about this privacy policy or wish to exercise your rights, 
              please contact our Privacy Officer:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-medium">Privacy Officer</p>
                <p className="text-sm text-muted-foreground">Al-Shifa Medical Complex</p>
                <p className="text-sm text-muted-foreground">456 Healthcare Ave, Medical City, MC 12345</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:privacy@alshifamedical.com" className="text-sm text-primary hover:underline">
                    privacy@alshifamedical.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Fax: (555) 123-4568</p>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy on our website and updating the &quot;Last Updated&quot; date. 
              We encourage you to review this policy periodically.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Your Trust is Our Priority
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              We are committed to protecting your privacy and ensuring the security of your 
              health information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/terms-of-service">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
