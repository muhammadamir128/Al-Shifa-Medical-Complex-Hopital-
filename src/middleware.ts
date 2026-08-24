import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const roleRoutes: Record<string, string[]> = {
  "/admin": ["ADMIN", "SUPER_ADMIN"],
  "/doctor": ["DOCTOR"],
  "/nurse": ["NURSE"],
  "/receptionist": ["RECEPTIONIST"],
  "/pharmacy": ["PHARMACIST"],
  "/lab": ["LAB_TECHNICIAN"],
  "/lab_technician": ["LAB_TECHNICIAN"],
  "/patient": ["PATIENT"],
}

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/about",
  "/services",
  "/contact",
  "/faq",
  "/careers",
  "/blog",
  "/news",
  "/help",
  "/terms-of-service",
  "/privacy-policy",
  "/doctors",
  "/access-denied",
  "/unauthorized",
]

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const role = token?.role as string | undefined

    // Allow public API routes
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next()
    }

    // Check role-based access for dashboard routes
    for (const [prefix, allowedRoles] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(prefix)) {
        if (!role || !allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL("/access-denied", req.url))
        }
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl

        // Always allow public paths
        if (publicPaths.some(p => pathname === p || pathname.startsWith(p + "/"))) {
          return true
        }

        // Allow API routes (handled at the route level)
        if (pathname.startsWith("/api/")) {
          return true
        }

        // Allow static files and Next.js internals
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon") ||
          pathname.includes(".")
        ) {
          return true
        }

        // Dashboard routes require authentication
        const protectedPrefixes = Object.keys(roleRoutes)
        if (protectedPrefixes.some(p => pathname.startsWith(p))) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|public/).*)",
  ],
}
