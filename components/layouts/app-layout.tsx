"use client"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"
import { NotificationProvider } from "@/contexts/features/notification-context"
import { SearchProvider } from "@/contexts/search-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { usePathname } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  
  // List of paths that should not show the full layout (like auth pages)
  const excludedPaths = [
    '/auth/signin',
    '/auth/signout',
    '/auth/error',
    '/auth/verify-request'
  ]
  
  // Check if the current path should exclude the full layout
  const shouldExcludeLayout = excludedPaths.some(path => pathname?.startsWith(path))
  
  if (shouldExcludeLayout) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <SearchProvider>
        <NotificationProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              
              <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </main>
            </div>
            
            <Footer />
          </div>
        </NotificationProvider>
      </SearchProvider>
    </SidebarProvider>
  )
}