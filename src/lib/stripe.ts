import Stripe from "stripe"

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" as any })
  : null

export function requireStripe(): Stripe {
  if (!stripe) throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in .env")
  return stripe
}
