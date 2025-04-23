import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { getServerAuthSession } from "@/auth"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import { ErrorBoundary } from "@/components/error-boundary"
import { SearchProvider } from "@/contexts/search-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context"
import { Breadcrumb } from "@/components/breadcrumb"
import { initSentry } from "@/lib/sentry"
import { Suspense } from "react"

// Initialize Sentry
if (typeof window !== "undefined") {
  // Only initialize in the browser
  initSentry()
}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DeFi Risk Intelligence",
  description: "AI-powered risk analysis for DeFi projects",
    generator: 'v0.dev'
}
import { QuoteDisplay } from "@/components/quote-display"
import ClientSessionProvider from "@/components/client-session-provider"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the session using the getServerAuthSession function
  const session = await getServerAuthSession()

  return (
    <html lang="en">
      <body className={inter.className}>
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
                            <ErrorBoundary>{children}</ErrorBoundary>
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
      </body>
    </html>
  )
}
