"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

import { CheckCircle2, AlertCircle, Info, AlertTriangle, Loader2 } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      richColors
      closeButton
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-white shrink-0" />,
        error: <AlertCircle className="h-5 w-5 text-white shrink-0" />,
        info: <Info className="h-5 w-5 text-white shrink-0" />,
        warning: <AlertTriangle className="h-5 w-5 text-white shrink-0" />,
        loading: <Loader2 className="h-5 w-5 text-white animate-spin shrink-0" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:font-sans group-[.toaster]:rounded-2xl group-[.toaster]:shadow-2xl group-[.toaster]:border group-[.toaster]:p-4 group-[.toaster]:gap-3 group-[.toaster]:w-[380px]",
          title: "group-[.toast]:font-bold group-[.toast]:text-sm tracking-tight",
          description: "group-[.toast]:text-xs group-[.toast]:opacity-90 group-[.toast]:mt-0.5",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-foreground font-semibold rounded-lg text-xs",
          cancelButton: "group-[.toast]:bg-black/20 group-[.toast]:text-white rounded-lg text-xs",
          closeButton: "group-[.toast]:bg-black/20 group-[.toast]:text-white group-[.toast]:border-0 group-[.toast]:hover:bg-black/40",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
