"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldX, Home, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <PublicLayout>
      <div className="container py-20">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-8">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <ShieldX className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Unauthorized Access</h1>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have permission to access this page. Please sign in with
                appropriate credentials to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Button>
                </Link>
                <Link href="/login">
                  <Button>
                    <Home className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
