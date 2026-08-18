"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Decorative SVG illustrations & section accents for the public site.
 * All purely decorative — marked aria-hidden — and respect reduced motion.
 */

/* ── DotGrid ─────────────────────────────────────────────────────────────
 * Subtle dotted texture for section backgrounds.                            */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none [background-image:radial-gradient(currentColor_1px,transparent_0)] [background-size:24px_24px]",
        className,
      )}
    />
  )
}

/* ── GridLines ───────────────────────────────────────────────────────────
 * Faint blueprint-style grid for hero backdrops.                            */
export function GridLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px]",
        className,
      )}
    />
  )
}

/* ── Blob ────────────────────────────────────────────────────────────────
 * Soft organic blob shape — use as a tinted background accent.               */
export function Blob({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={cn("pointer-events-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M44.7,-58.1C57.4,-49.1,66.5,-34.7,69.9,-19.2C73.3,-3.7,71,12.9,63.6,26.6C56.2,40.3,43.7,51.1,29.5,58.9C15.3,66.7,-0.6,71.5,-16.8,69.3C-33,67.1,-49.4,57.9,-60.2,44.1C-71,30.3,-76.2,11.9,-73.6,-5.2C-71,-22.3,-60.6,-38.1,-47.2,-47.2C-33.8,-56.3,-16.9,-58.7,0.3,-59.1C17.5,-59.5,35,-57.1,44.7,-58.1Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/* ── PlusMarks ───────────────────────────────────────────────────────────
 * Scattered medical "+" accents that gently twinkle.                         */
export function PlusMarks({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const marks = [
    { x: 12, y: 20, s: 1, d: 0 },
    { x: 86, y: 14, s: 0.7, d: 0.6 },
    { x: 68, y: 78, s: 0.85, d: 1.2 },
    { x: 24, y: 70, s: 0.6, d: 1.8 },
    { x: 94, y: 54, s: 0.75, d: 0.9 },
  ]
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {marks.map((m, i) => (
        <motion.g
          key={i}
          transform={`translate(${m.x} ${m.y}) scale(${m.s})`}
          animate={reduce ? undefined : { opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: m.d, ease: "easeInOut" }}
        >
          <rect x="-1.1" y="-4" width="2.2" height="8" rx="1" fill="currentColor" />
          <rect x="-4" y="-1.1" width="8" height="2.2" rx="1" fill="currentColor" />
        </motion.g>
      ))}
    </svg>
  )
}

/* ── HeartbeatLine ───────────────────────────────────────────────────────
 * An ECG / heart-rate trace that draws itself on a loop.                     */
export function HeartbeatLine({
  className,
  loop = true,
}: {
  className?: string
  loop?: boolean
}) {
  const reduce = useReducedMotion()
  const path =
    "M0 30 H60 L74 30 L84 10 L98 52 L110 22 L120 30 H180 L194 30 L204 14 L218 46 L230 30 H320"

  return (
    <svg
      aria-hidden
      viewBox="0 0 320 60"
      fill="none"
      className={cn("pointer-events-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} stroke="currentColor" strokeOpacity="0.18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={reduce ? { pathLength: 1, opacity: 1 } : undefined}
        animate={
          reduce
            ? undefined
            : { pathLength: [0, 1], opacity: [0, 1, 1, 0] }
        }
        viewport={{ once: true }}
        transition={
          reduce
            ? { duration: 0.6 }
            : { duration: 2.6, repeat: loop ? Infinity : 0, ease: "easeInOut", repeatDelay: 0.4 }
        }
      />
    </svg>
  )
}

/* ── PulseRings ──────────────────────────────────────────────────────────
 * Concentric rings that expand outward — a calm "live" accent.               */
export function PulseRings({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-current"
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

/* ── WaveDivider ─────────────────────────────────────────────────────────
 * Smooth wave separator between sections.                                    */
export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn("block w-full", flip && "rotate-180", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,80 L0,80 Z"
      />
    </svg>
  )
}

/* ── HeroIllustration ────────────────────────────────────────────────────
 * Polished healthcare scene for the homepage hero — a vitals monitor card
 * with a floating heart, pill and shield. Decorative.                        */
export function HeroIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const float = (delay: number, dist = 8) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay },
        }

  return (
    <svg
      viewBox="0 0 480 460"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Healthcare monitoring illustration"
    >
      <defs>
        <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--card)" />
          <stop offset="1" stopColor="var(--muted)" />
        </linearGradient>
        <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#0b1220" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* backdrop discs */}
      <circle cx="240" cy="230" r="200" fill="var(--primary)" fillOpacity="0.06" />
      <circle cx="240" cy="230" r="150" fill="var(--primary)" fillOpacity="0.06" />

      {/* main monitor card */}
      <g filter="url(#hero-shadow)">
        <rect x="96" y="86" width="288" height="288" rx="28" fill="url(#hero-card)" stroke="var(--border)" />
      </g>

      {/* card header */}
      <rect x="120" y="112" width="44" height="44" rx="13" fill="var(--primary)" fillOpacity="0.14" />
      <rect x="138.5" y="120" width="7" height="28" rx="2.4" fill="var(--primary)" />
      <rect x="128" y="130.5" width="28" height="7" rx="2.4" fill="var(--primary)" />
      <rect x="176" y="120" width="120" height="10" rx="5" fill="var(--primary)" fillOpacity="0.32" />
      <rect x="176" y="138" width="74" height="8" rx="4" fill="var(--muted-foreground)" fillOpacity="0.4" />

      {/* vitals trace panel */}
      <rect x="120" y="176" width="240" height="104" rx="18" fill="var(--primary)" />
      <rect x="138" y="194" width="70" height="9" rx="4.5" fill="#ffffff" fillOpacity="0.6" />
      <motion.path
        d="M138 244 H176 L188 244 L198 218 L212 270 L226 230 L236 244 H342"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={reduce ? undefined : { pathLength: [0, 1] }}
        transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
      />
      <circle cx="342" cy="244" r="5" fill="#ffffff" />

      {/* stat tiles */}
      <rect x="120" y="296" width="113" height="58" rx="14" fill="var(--muted)" />
      <circle cx="143" cy="318" r="11" fill="var(--primary)" fillOpacity="0.18" />
      <path d="M138.5 318 L142 321.5 L148 314.5" stroke="var(--primary)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="135" y="336" width="62" height="6" rx="3" fill="var(--primary)" fillOpacity="0.45" />

      <rect x="247" y="296" width="113" height="58" rx="14" fill="var(--muted)" />
      <circle cx="270" cy="318" r="11" fill="var(--primary)" fillOpacity="0.18" />
      <rect x="266.6" y="312.4" width="6.8" height="11.2" rx="2" fill="var(--primary)" />
      <rect x="264.4" y="314.6" width="11.2" height="6.8" rx="2" fill="var(--primary)" />
      <rect x="262" y="336" width="62" height="6" rx="3" fill="var(--primary)" fillOpacity="0.45" />

      {/* floating heart badge */}
      <motion.g {...float(0)}>
        <g filter="url(#hero-shadow)">
          <circle cx="372" cy="120" r="34" fill="var(--card)" stroke="var(--border)" />
        </g>
        <path
          transform="translate(372,122)"
          d="M0 12 C0 12 -13 3.6 -13 -5.5 C-13 -10.2 -9.3 -13 -5.4 -13 C-2.3 -13 0 -10.4 0 -8 C0 -10.4 2.3 -13 5.4 -13 C9.3 -13 13 -10.2 13 -5.5 C13 3.6 0 12 0 12 Z"
          fill="#f43f5e"
        />
      </motion.g>

      {/* floating pill badge */}
      <motion.g {...float(1.1)}>
        <g filter="url(#hero-shadow)">
          <circle cx="108" cy="318" r="32" fill="var(--card)" stroke="var(--border)" />
        </g>
        <g transform="translate(108,318) rotate(45)">
          <rect x="-16" y="-9" width="32" height="18" rx="9" fill="var(--primary)" />
          <path d="M-16 0 a9 9 0 0 1 9 -9 h7 v18 h-7 a9 9 0 0 1 -9 -9 z" fill="var(--primary)" fillOpacity="0.4" />
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
        </g>
      </motion.g>

      {/* floating shield badge */}
      <motion.g {...float(0.6)}>
        <g filter="url(#hero-shadow)">
          <circle cx="406" cy="304" r="30" fill="var(--card)" stroke="var(--border)" />
        </g>
        <g transform="translate(406,304)">
          <path d="M0 -14 L13 -9 V3 C13 11 0 16 0 16 C0 16 -13 11 -13 3 V-9 Z" fill="var(--primary)" />
          <path d="M-6 0 L-2 4.5 L6 -4.8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>

      {/* scattered plus accents */}
      <g stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="3.2" strokeLinecap="round">
        <path d="M58 150 v14 M51 157 h14" />
        <path d="M430 220 v12 M424 226 h12" />
        <path d="M70 392 v12 M64 398 h12" />
      </g>
    </svg>
  )
}
