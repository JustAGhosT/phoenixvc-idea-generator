"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface Breadcrumb {
  label: string
  href: string
  id: string
}

interface BreadcrumbContextProps {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
  addBreadcrumb: (breadcrumb: Breadcrumb) => void
  removeBreadcrumb: (id: string) => void
  clearBreadcrumbs: () => void
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

function pathToBreadcrumbs(path: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/", id: "home" }
  ]
  
  if (path === "/") return breadcrumbs
  
  const segments = path.split("/").filter(Boolean)
  let currentPath = ""
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
    
    if (segment.startsWith("[") && segment.endsWith("]")) {
      label = "Details"
    }
    
    breadcrumbs.push({
      label,
      href: currentPath,
      id: `breadcrumb-${index}`
    })
  })
  
  return breadcrumbs
}

export function BreadcrumbProvider({ 
  children, 
  initialBreadcrumbs = [{ label: "Home", href: "/", id: "home" }],
  persistInLocalStorage = true,
  autoGenerateFromRoute = true
}: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(initialBreadcrumbs)
  const pathname = usePathname()
  
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
  
  useEffect(() => {
    if (persistInLocalStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(breadcrumbs))
    }
  }, [breadcrumbs, persistInLocalStorage])
  
  useEffect(() => {
    if (autoGenerateFromRoute && pathname) {
      generateFromPath(pathname)
    }
  }, [pathname, autoGenerateFromRoute])
  
  const addBreadcrumb = (breadcrumb: Breadcrumb) => {
    setBreadcrumbs(prev => {
      const exists = prev.some(b => b.href === breadcrumb.href)
      if (exists) {
        return prev.map(b => 
          b.href === breadcrumb.href ? { ...b, label: breadcrumb.label } : b
        )
      }
      return [...prev, breadcrumb]
    })
  }

  const removeBreadcrumb = (id: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.id !== id))
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
      if (prev.length === 0) return [{ label, href: pathname || "/", id: "home" }]
      
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

export const useBreadcrumbs = useBreadcrumbContext;