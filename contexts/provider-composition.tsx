"use client"

import { AuthProvider } from "@/contexts/core/auth-context"
import { ThemeProvider } from "@/contexts/core/theme-context"
import { NotificationProvider } from "@/contexts/features/notification-context"
import { SearchProvider } from "@/contexts/features/search-context"
import { SidebarProvider } from "@/contexts/features/sidebar-context"
import { Session } from "next-auth"
import React from "react"
import { BreadcrumbProvider } from "./features/breadcrumb-context"

// Provider component type with optional additional props
interface ProviderWithProps {
  Provider: React.ComponentType<any>
  props?: Record<string, any>
}
// Compose multiple providers with their props into a single component
export function composeProviders(...providersWithProps: ProviderWithProps[]): React.FC<{
  children: React.ReactNode
}> {
  return ({ children }: { children: React.ReactNode }) => {
    return providersWithProps.reduceRight((acc, { Provider, props = {} }) => {
      return <Provider {...props}>{acc}</Provider>
    }, children)
  }
}

// Create a combined app provider that accepts a session prop
interface AppProvidersProps {
  children: React.ReactNode
  session: Session | null
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children, session }) => {
  // Define providers with their props
  const providers: ProviderWithProps[] = [
    { Provider: AuthProvider, props: { session } },
    { Provider: ThemeProvider },
    { Provider: BreadcrumbProvider },
    { Provider: NotificationProvider },
    { Provider: SearchProvider },
    { Provider: SidebarProvider }
  ]

  // Use the composeProviders function with the providers array
  const ComposedProviders = composeProviders(...providers)
  return <ComposedProviders>{children}</ComposedProviders>
}
// Usage example:
// function RootLayout({ children, session }: { children: React.ReactNode, session: Session | null }) {
//   return (
//     <AppProviders session={session}>
//       {children}
//     </AppProviders>
//   )
// }