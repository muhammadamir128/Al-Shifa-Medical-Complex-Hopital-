"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scale,
  ArrowRight,
  Mail
} from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Terms of{" "}
              <span className="text-primary">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our services. 
              By using our services, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">Quick Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">You CAN</h3>
                  <p className="text-xs text-muted-foreground mt-1">Access your records, book appointments, communicate with providers</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">You CANNOT</h3>
                  <p className="text-xs text-muted-foreground mt-1">Share credentials, abuse the system, misuse others&apos; data</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">Important</h3>
                  <p className="text-xs text-muted-foreground mt-1">Medical advice requires professional consultation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Acceptance of Terms */}
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                By accessing or using the services provided by Al-Shifa Medical Complex 
                (&quot;Hospital,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including our website, patient portal, 
                mobile applications, and healthcare services, you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-muted-foreground mt-4">
                These terms apply to all visitors, patients, healthcare providers, and any other 
                users who access or use our services.
              </p>
            </div>
          </div>

          {/* Description of Services */}
          <div>
            <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Al-Shifa Medical Complex provides comprehensive healthcare services including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      In-person medical consultations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Emergency and urgent care services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Laboratory and diagnostic services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Surgical procedures
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Online patient portal access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Appointment scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Prescription management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      Medical records access
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Accounts */}
          <div>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts and Responsibilities</h2>
            <div className="space-y-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Account Registration</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>You must provide accurate and complete information during registration</li>
                    <li>You are responsible for maintaining the confidentiality of your login credentials</li>
                    <li>You must notify us immediately of any unauthorized use of your account</li>
                    <li>Each person must have their own account; sharing accounts is prohibited</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Prohibited Activities</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Accessing or attempting to access another user&apos;s account</li>
                    <li>Using the service for any unlawful purpose</li>
                    <li>Uploading malicious code or attempting to breach security</li>
                    <li>Sharing your login credentials with others</li>
                    <li>Interfering with the proper functioning of the service</li>
                    <li>Collecting or storing personal data of other users</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div>
            <h2 className="text-2xl font-bold mb-4">4. Medical Disclaimer</h2>
            <Card className="border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Important Notice</h3>
                    <p className="text-sm text-muted-foreground">
                      The information provided through our services is for general informational 
                      purposes only and is not intended to be a substitute for professional medical 
                      advice, diagnosis, or treatment. Always seek the advice of your physician or 
                      other qualified health provider with any questions you may have regarding a 
                      medical condition.
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      Never disregard professional medical advice or delay in seeking it because of 
                      something you have read on our website or patient portal. If you think you may 
                      have a medical emergency, call your doctor or emergency services immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consent to Treatment */}
          <div>
            <h2 className="text-2xl font-bold mb-4">5. Consent to Treatment</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                By using our healthcare services, you consent to examination, diagnosis, and treatment 
                by our healthcare providers. You acknowledge that:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-4">
                <li>Medical treatment involves inherent risks and uncertainties</li>
                <li>You have the right to be informed about proposed treatments and their risks</li>
                <li>You have the right to refuse treatment or seek a second opinion</li>
                <li>You will provide accurate information about your health condition</li>
                <li>You will follow the treatment plans and instructions provided by your healthcare team</li>
              </ul>
            </div>
          </div>

          {/* Payment and Billing */}
          <div>
            <h2 className="text-2xl font-bold mb-4">6. Payment and Billing</h2>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Financial Responsibility</h3>
                    <p className="text-sm text-muted-foreground">
                      You are responsible for all charges for services rendered, including any amounts 
                      not covered by insurance. Payment is due at the time of service unless other 
                      arrangements have been made.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Insurance</h3>
                    <p className="text-sm text-muted-foreground">
                      We will submit claims to your insurance carrier as a courtesy. However, you are 
                      ultimately responsible for any amounts not paid by your insurance. Please verify 
                      your coverage before receiving services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Billing Disputes</h3>
                    <p className="text-sm text-muted-foreground">
                      If you have questions about your bill, please contact our billing department 
                      within 60 days of the billing date. We will investigate and respond to your 
                      inquiry promptly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                All content on our website and patient portal, including text, graphics, logos, images, 
                and software, is the property of Al-Shifa Medical Complex or its licensors and is protected 
                by copyright and other intellectual property laws.
              </p>
              <p className="text-muted-foreground mt-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, 
                or exploit any of our content without our prior written permission.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  To the fullest extent permitted by law:
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>We shall not be liable for any indirect, incidental, special, consequential, 
                      or punitive damages arising out of or relating to your use of our services</li>
                  <li>Our total liability for any claim arising from your use of our services shall 
                      not exceed the amount you paid for the specific service giving rise to the claim</li>
                  <li>We are not responsible for any third-party content or services linked to or 
                      accessible from our website</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your access to our services at any time, 
                without notice, for any reason, including but not limited to:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-4">
                <li>Violation of these Terms of Service</li>
                <li>Conduct that is harmful to other users or our staff</li>
                <li>Fraudulent or illegal activity</li>
                <li>Abuse of our systems or services</li>
              </ul>
            </div>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                We may update these Terms of Service from time to time. We will notify you of any 
                material changes by posting the new terms on our website and updating the 
                &quot;Last Updated&quot; date. Your continued use of our services after such changes constitutes 
                your acceptance of the new terms.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws 
                of the State of [State], without regard to its conflict of law provisions. Any disputes 
                arising under these terms shall be resolved in the courts of [County], [State].
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-muted/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Questions About Terms?</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              If you have questions about these Terms of Service, please contact our legal department:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-medium">Legal Department</p>
                <p className="text-sm text-muted-foreground">Al-Shifa Medical Complex</p>
                <p className="text-sm text-muted-foreground">456 Healthcare Ave, Medical City, MC 12345</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:legal@alshifamedical.com" className="text-sm text-primary hover:underline">
                    legal@alshifamedical.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              By using our services, you acknowledge that you have read and understood these terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
