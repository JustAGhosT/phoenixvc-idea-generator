import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { QuoteDisplay } from "@/components/quote-display"
import { getServerAuthSession } from "@/auth"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import { ErrorBoundary } from "@/components/error-boundary"
import { initSentry } from "@/utils/sentry"

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
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <SidebarProvider>
              <div className="flex min-h-screen flex-col">
                <div className="flex flex-1">
                  <AppSidebar />
                  <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 overflow-auto p-4 md:p-6">
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
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
