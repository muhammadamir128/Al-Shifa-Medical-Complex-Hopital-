"use client"

import { useQuery } from "@tanstack/react-query"

/**
 * Fetches the live, role-aware dashboard payload from `/api/dashboard`.
 * The API decides what to return based on the signed-in user's role.
 */
export function useDashboard<T = Record<string, unknown>>(refetchInterval?: number) {
  return useQuery<T>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard")
      if (!res.ok) throw new Error("Failed to load dashboard data")
      return res.json()
    },
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    refetchInterval,
  })
}
