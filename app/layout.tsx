import { getServerAuthSession } from "@/auth"
import { Inter } from "next/font/google"
import type { Metadata } from "next/types"
import RootClientLayout from "../components/root-client-layout"
import "./globals.css"
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
  const session = await getServerAuthSession();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootClientLayout session={session}>
          {children}
        </RootClientLayout>
      </body>
    </html>
  )
}