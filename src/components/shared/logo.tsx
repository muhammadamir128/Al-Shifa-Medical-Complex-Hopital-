"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
  variant?: "default" | "white"
}

export function Logo({ className, size = "md", showText = true, variant = "default" }: LogoProps) {
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10"
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  }

  const isWhite = variant === "white"

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizes[size])}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          {/* Cross */}
          <rect x="16" y="6" width="8" height="28" rx="1" className={isWhite ? "fill-white" : "fill-primary"} />
          <rect x="6" y="16" width="28" height="8" rx="1" className={isWhite ? "fill-white" : "fill-primary"} />
          {/* Heart outline */}
          <path
            d="M20 35C20 35 5 25 5 15C5 10 9 6 14 6C17 6 19 8 20 10C21 8 23 6 26 6C31 6 35 10 35 15C35 25 20 35 20 35Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className={isWhite ? "text-white/40" : "text-primary/30"}
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight", isWhite ? "text-white" : "text-primary", textSizes[size])}>
            Al-Shifa Medical Complex
          </span>
          <span className={cn("text-xs -mt-0.5", isWhite ? "text-white/60" : "text-muted-foreground")}>
            Management System
          </span>
        </div>
      )}
    </Link>
  )
}
