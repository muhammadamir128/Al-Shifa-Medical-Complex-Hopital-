"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Ban, Home, ArrowLeft } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <PublicLayout>
      <div className="container py-20">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg text-center">
            <CardContent className="p-8">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <Ban className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have the required permissions to access this resource.
                Please contact your administrator if you believe this is an error.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Button>
                </Link>
                <Link href="/">
                  <Button>
                    <Home className="mr-2 h-4 w-4" />
                    Home
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
