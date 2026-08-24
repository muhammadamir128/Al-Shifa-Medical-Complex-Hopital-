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
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11"
  }

  const textSizes = {
    sm: "text-base font-bold leading-tight",
    md: "text-lg font-bold leading-tight",
    lg: "text-xl font-bold leading-tight"
  }

  const isWhite = variant === "white"

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div className={cn("relative flex items-center justify-center shrink-0 rounded-xl p-1 transition-transform duration-200 group-hover:scale-105", sizes[size])}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-sm"
        >
          {/* Hospital Cross */}
          <rect x="16" y="5" width="8" height="30" rx="2" fill={isWhite ? "#ffffff" : "#10b981"} />
          <rect x="5" y="16" width="30" height="8" rx="2" fill={isWhite ? "#ffffff" : "#10b981"} />
          {/* Heart outline */}
          <path
            d="M20 36C20 36 4 25 4 14C4 9.5 8.5 5 14.5 5C17.5 5 19.5 7 20 9C20.5 7 22.5 5 25.5 5C31.5 5 36 9.5 36 14C36 25 20 36 20 36Z"
            stroke={isWhite ? "#ffffff" : "#0284c7"}
            strokeWidth="2.5"
            strokeOpacity={isWhite ? "0.6" : "0.85"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("tracking-tight font-extrabold", isWhite ? "text-white" : "text-foreground group-hover:text-primary transition-colors", textSizes[size])}>
            Al-Shifa <span className={isWhite ? "text-white/90" : "text-emerald-600 dark:text-emerald-400"}>Medical</span>
          </span>
          <span className={cn("text-[11px] font-medium tracking-wide -mt-0.5", isWhite ? "text-white/70" : "text-muted-foreground")}>
            Hospital Management System
          </span>
        </div>
      )}
    </Link>
  )
}
