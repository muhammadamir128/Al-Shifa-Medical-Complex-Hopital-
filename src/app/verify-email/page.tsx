"use client"

import { Suspense, useEffect, useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"
import { PublicLayout } from "@/components/shared/public-layout"
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const initialState = useMemo(() => {
    if (!token) {
      return { status: "error" as const, message: "Invalid verification link" }
    }
    return { status: "loading" as const, message: "" }
  }, [token])

  const [status, setStatus] = useState<"loading" | "success" | "error">(initialState.status)
  const [message, setMessage] = useState(initialState.message)

  useEffect(() => {
    if (!token) {
      return
    }

    const verifyEmail = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setStatus("success")
        setMessage("Your email has been verified successfully!")
      } catch {
        setStatus("error")
        setMessage("Verification failed. Please try again.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-b from-primary/5 to-background p-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <Logo className="justify-center" size="lg" />
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
                <h2 className="mb-2 text-xl font-bold">Verifying Email</h2>
                <p className="text-muted-foreground">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Email Verified!</h2>
                <p className="mb-6 text-muted-foreground">{message}</p>
                <Button onClick={() => router.push("/login")} className="w-full">
                  Continue to Sign In
                </Button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Verification Failed</h2>
                <p className="mb-6 text-muted-foreground">{message}</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Go to Sign In</Link>
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center bg-linear-to-b from-primary/5 to-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </PublicLayout>
  )
}
