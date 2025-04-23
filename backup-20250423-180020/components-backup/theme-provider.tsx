"use client"

// This file re-exports the theme context from the contexts folder
// It's here to maintain backward compatibility with existing imports

import {
  ThemeProvider as OriginalThemeProvider,
  useTheme,
  useThemeContext
} from "@/contexts/core/theme-context"

export { useTheme, useThemeContext }
export const ThemeProvider = OriginalThemeProvider
