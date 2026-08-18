"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { PublicHeader } from "./public-header"
import { PublicFooter } from "./public-footer"
import { ScrollToTop } from "./scroll-to-top"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <motion.main
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <PublicFooter />
      <ScrollToTop />
    </div>
  )
}
