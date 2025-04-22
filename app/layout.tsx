import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { QuoteDisplay } from "@/components/quote-display"
import { getServerAuthSession } from "@/auth"

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
              <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
              <Toaster />
              <QuoteDisplay />
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
