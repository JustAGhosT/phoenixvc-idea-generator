"use client"

import { useEffect } from "react"
import { useBreadcrumbs } from "./use-breadcrumbs"

interface UsePageOptions {
  /**
   * The title of the page
   */
  title: string
  
  /**
   * Whether to update the document title
   * @default true
   */
  updateDocumentTitle?: boolean
  
  /**
   * Whether to update the breadcrumb for the current page
   * @default true
   */
  updateBreadcrumb?: boolean
  
  /**
   * A custom path to use for the breadcrumb instead of the current path
   */
  customPath?: string
  
  /**
   * A suffix to append to the document title
   * @default " | Your App Name"
   */
  titleSuffix?: string
}

/**
 * Hook for setting page title and breadcrumb in one call
 * 
 * @example
 * ```tsx
 * // Basic usage
 * usePage({ title: "Dashboard" })
 * 
 * // With custom options
 * usePage({
 *   title: "User Profile",
 *   updateDocumentTitle: true,
 *   updateBreadcrumb: true,
 *   titleSuffix: " | My App"
 * })
 * ```
 */
export function usePage({
  title,
  updateDocumentTitle = true,
  updateBreadcrumb = true,
  customPath,
  titleSuffix = " | Your App Name"
}: UsePageOptions) {
  const { setCurrentPageLabel } = useBreadcrumbs()
  
  useEffect(() => {
    // Update document title
    if (updateDocumentTitle) {
      document.title = title + titleSuffix
    }
    
    // Update breadcrumb
    if (updateBreadcrumb) {
      setCurrentPageLabel(title)
    }
    
    // If custom path is provided, generate breadcrumbs from it
    if (customPath) {
      // This would require additional logic to handle custom paths
      // For now, we're just setting the current page label
    }
  }, [title, updateDocumentTitle, updateBreadcrumb, customPath, titleSuffix, setCurrentPageLabel])
}