import ClientProviders from "@/components/features/client-providers";
import { ThemeProvider } from "@/components/features/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <ClientProviders>
          <ThemeProvider defaultTheme="dark" storageKey="app-theme">
            {children}
            <Toaster />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}