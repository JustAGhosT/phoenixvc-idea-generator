"use client"

import { ThemeProvider } from "@/components/features/theme/theme-provider"
import { AppLayout } from "@/components/layouts/app-layout"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/contexts/core/auth-context"
import { NotificationProvider } from "@/contexts/features/notification-context"
import { SearchProvider } from "@/contexts/search-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { Session } from "next-auth"
import { useEffect, useState } from "react"

interface RootClientLayoutProps {
  children: React.ReactNode
  session: Session | null
}

/**
 * Client-side root layout component that provides various context providers
 * This component wraps the entire application to provide authentication,
 * theming, and UI utility contexts
 */
export default function RootClientLayout({ children, session }: RootClientLayoutProps) {
  // Prevent hydration mismatch by only rendering after component mounts
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AuthProvider session={session}>
      <ThemeProvider defaultTheme="system" storageKey="theme-preference">
        <TooltipProvider>
          <SidebarProvider>
            <SearchProvider>
              <NotificationProvider>
                <AppLayout>
                  {children}
                </AppLayout>
          <Toaster />
              </NotificationProvider>
            </SearchProvider>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}