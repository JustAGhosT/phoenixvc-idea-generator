"use client"

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/core/auth-context"
import { ThemeProvider } from "@/contexts/core/theme-context"
import { BreadcrumbProvider } from "@/contexts/features/breadcrumb-context"
import { NotificationProvider } from "@/contexts/features/notification-context"
import { SearchProvider } from "@/contexts/features/search-context"
import { SidebarProvider } from "@/contexts/features/sidebar-context"
import { Session } from "next-auth"
import { Suspense } from "react"
import { AppSidebar } from "./app-sidebar"
import { AuthRedirect } from "./auth-redirect"
import { Breadcrumb } from "./breadcrumb"
import { ErrorBoundary } from "./error-boundary"
import { Footer } from "./footer"
import { GlobalErrorHandler } from "./global-error-handler"
import { Header } from "./header"
import { QuoteDisplay } from "./quote-display"

export default function RootClientLayout({
  children,
  session
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <AuthProvider session={session}>
      <ThemeProvider defaultTheme="light">
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
    </AuthProvider>
  )
}