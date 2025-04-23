"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface Breadcrumb {
  label: string
  href: string
}

interface BreadcrumbContextProps {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
  addBreadcrumb: (breadcrumb: Breadcrumb) => void
  removeBreadcrumb: (href: string) => void
  clearBreadcrumbs: () => void
  // New methods for enhanced functionality
  generateFromPath: (path: string) => void
  setCurrentPageLabel: (label: string) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined)

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error("useBreadcrumbContext must be used within a BreadcrumbProvider")
  }
  return context
}

interface BreadcrumbProviderProps {
  children: React.ReactNode
  initialBreadcrumbs?: Breadcrumb[]
  persistInLocalStorage?: boolean
  autoGenerateFromRoute?: boolean
}

const STORAGE_KEY = "app_breadcrumbs"

/**
 * Converts a URL path to a set of breadcrumbs
 */
function pathToBreadcrumbs(path: string): Breadcrumb[] {
  // Always start with home
  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" }
  ]
  
  // Skip if we're on the home page
  if (path === "/") return breadcrumbs
  
  // Split the path and create breadcrumbs
  const segments = path.split("/").filter(Boolean)
  let currentPath = ""
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Format the label (capitalize, replace hyphens with spaces)
    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
    
    // Handle dynamic route segments (those starting with [)
    if (segment.startsWith("[") && segment.endsWith("]")) {
      label = "Details"
    }
    
    breadcrumbs.push({
      label,
      href: currentPath
    })
  })
  
  return breadcrumbs
}

export function BreadcrumbProvider({ 
  children, 
  initialBreadcrumbs = [{ label: "Home", href: "/" }],
  persistInLocalStorage = true,
  autoGenerateFromRoute = true
}: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(initialBreadcrumbs)
  const pathname = usePathname()
  
  // Load breadcrumbs from localStorage on mount
  useEffect(() => {
    if (persistInLocalStorage) {
      const savedBreadcrumbs = localStorage.getItem(STORAGE_KEY)
      if (savedBreadcrumbs) {
        try {
          const parsed = JSON.parse(savedBreadcrumbs)
          setBreadcrumbs(parsed)
        } catch (error) {
          console.error("Failed to parse saved breadcrumbs:", error)
        }
      }
    }
  }, [persistInLocalStorage])
  
  // Save breadcrumbs to localStorage when they change
  useEffect(() => {
    if (persistInLocalStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(breadcrumbs))
    }
  }, [breadcrumbs, persistInLocalStorage])
  
  // Generate breadcrumbs from route when pathname changes
  useEffect(() => {
    if (autoGenerateFromRoute && pathname) {
      generateFromPath(pathname)
    }
  }, [pathname, autoGenerateFromRoute])
  
  const addBreadcrumb = (breadcrumb: Breadcrumb) => {
    setBreadcrumbs(prev => {
      // Check if breadcrumb already exists
      const exists = prev.some(b => b.href === breadcrumb.href)
      if (exists) {
        // Update the label if it exists
        return prev.map(b => 
          b.href === breadcrumb.href ? { ...b, label: breadcrumb.label } : b
        )
      }
      return [...prev, breadcrumb]
    })
  }

  const removeBreadcrumb = (href: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.href !== href))
  }
  
  const clearBreadcrumbs = () => {
    setBreadcrumbs(initialBreadcrumbs)
  }
  
  const generateFromPath = (path: string) => {
    const newBreadcrumbs = pathToBreadcrumbs(path)
    setBreadcrumbs(newBreadcrumbs)
  }
  
  const setCurrentPageLabel = (label: string) => {
    setBreadcrumbs(prev => {
      if (prev.length === 0) return [{ label, href: pathname || "/" }]
      
      // Update the last breadcrumb (current page)
      const updated = [...prev]
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        label
      }
      return updated
    })
  }

  return (
    <BreadcrumbContext.Provider value={{ 
      breadcrumbs, 
      setBreadcrumbs, 
      addBreadcrumb, 
      removeBreadcrumb, 
      clearBreadcrumbs,
      generateFromPath,
      setCurrentPageLabel
    }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// Export a consistent hook name to avoid confusion
export const useBreadcrumbs = useBreadcrumbContext;