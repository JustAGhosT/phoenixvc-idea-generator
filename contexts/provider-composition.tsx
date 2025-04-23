"use client"

import { AuthProvider } from "@/contexts/core/auth-context"
import { ThemeProvider } from "@/contexts/core/theme-context"
import { NotificationProvider } from "@/contexts/features/notification-context"
import { SearchProvider } from "@/contexts/features/search-context"
import { SidebarProvider } from "@/contexts/features/sidebar-context"
import React from "react"
import { BreadcrumbProvider } from "./features/breadcrumb-context"

// Provider component type
type ProviderComponent = React.ComponentType<{ children: React.ReactNode }>

// Compose multiple providers into a single component
export function composeProviders(...providers: ProviderComponent[]): ProviderComponent {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>
    }, children)
  }
}

// Create a combined app provider
export const AppProviders = composeProviders(
  AuthProvider,
  ThemeProvider,
  BreadcrumbProvider,
  NotificationProvider,
  SearchProvider,
  SidebarProvider
)

// Usage example:
// function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AppProviders>
//       {children}
//     </AppProviders>
//   )
// }