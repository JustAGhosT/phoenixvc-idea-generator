"use client"

import { Breadcrumb } from "@/components/breadcrumb"
import ClientSessionProvider from "@/components/client-session-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import { Header } from "@/components/header"
import { QuoteDisplay } from "@/components/quote-display"
import { AppSidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { SearchProvider } from "@/contexts/search-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { initSentry } from "@/utils/sentry"
import { Session } from "next-auth"
import { Suspense } from "react"
import { AuthRedirect } from "./auth-redirect"

// Initialize Sentry
if (typeof window !== "undefined") {
  // Only initialize in the browser
  initSentry()
}

export default function RootClientLayout({
  children,
  session
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <ClientSessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <SearchProvider>
          <NotificationProvider>
            <BreadcrumbProvider>
              <SidebarProvider>
                <div className="flex min-h-screen flex-col">
                  <div className="flex flex-1">
                    <AppSidebar />
                    <div className="flex flex-1 flex-col">
                      <Header />
                      <main className="flex-1 overflow-auto p-4 md:p-6">
                        <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                          <Breadcrumb />
                        </Suspense>
                        <ErrorBoundary>
                          <AuthRedirect>
                            {children}
                          </AuthRedirect>
                        </ErrorBoundary>
                      </main>
                      <Footer />
                    </div>
                  </div>
                </div>
                <Toaster />
                <QuoteDisplay />
                <GlobalErrorHandler />
              </SidebarProvider>
            </BreadcrumbProvider>
          </NotificationProvider>
        </SearchProvider>
      </ThemeProvider>
    </ClientSessionProvider>
  )
}