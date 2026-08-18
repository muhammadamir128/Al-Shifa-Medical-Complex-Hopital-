"use client"

import * as React from "react"
import {
  motion,
  useReducedMotion,
  useInView,
  animate,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Shared motion primitives for the public-facing site.
 *
 * Style goal: subtle & professional — gentle fades and short slide-ins on
 * scroll, soft hover lifts. All primitives respect `prefers-reduced-motion`.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Direction = "up" | "down" | "left" | "right" | "none"

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 14 },
  down: { y: -14 },
  left: { x: 14 },
  right: { x: -14 },
  none: {},
}

/* ── Reveal ──────────────────────────────────────────────────────────────
 * Fades + slides its children into view once they enter the viewport.       */
interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.25,
  once = true,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion()
  const offset = reduce ? {} : directionOffset[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger ─────────────────────────────────────────────────────────────
 * Container whose direct <StaggerItem> children reveal one after another.    */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
}

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  once?: boolean
}

export function Stagger({ children, className, once = true, ...props }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } },
}

const staggerChildReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

export function StaggerItem({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<"div">, "ref">) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduce ? staggerChildReduced : staggerChild}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ── Floating ────────────────────────────────────────────────────────────
 * Gentle, infinite vertical drift — for decorative SVG accents.              */
interface FloatingProps {
  children: React.ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}

export function Floating({
  children,
  className,
  amplitude = 12,
  duration = 5,
  delay = 0,
}: FloatingProps) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

/* ── HoverLift ───────────────────────────────────────────────────────────
 * Smooth spring lift + scale on hover — a drop-in card wrapper.              */
export function HoverLift({
  children,
  className,
  lift = -6,
  ...props
}: Omit<HTMLMotionProps<"div">, "ref"> & { lift?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: lift }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ── AnimatedCounter ─────────────────────────────────────────────────────
 * Counts a stat value up from zero when scrolled into view.
 * Accepts strings like "50+", "10K+", "24/7", "1,200".                       */
function parseStat(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1],
    target: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
    grouped: match[2].includes(","),
  }
}

interface AnimatedCounterProps {
  value: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  className,
  duration = 1.8,
}: AnimatedCounterProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const parsed = React.useMemo(() => parseStat(value), [value])
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!parsed || !inView || reduce) return
    const controls = animate(0, parsed.target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [parsed, inView, reduce, duration])

  if (!parsed) return <span className={className}>{value}</span>

  const shown = reduce || !inView ? (reduce ? parsed.target : 0) : display
  const formatted = parsed.grouped ? shown.toLocaleString() : String(shown)

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  )
}

/* Re-export motion for ad-hoc use in pages. */
export { motion }
