"use client"

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

/**
 * Theme provider component that wraps the application to provide theme context
 * This component is a thin wrapper around next-themes ThemeProvider
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}