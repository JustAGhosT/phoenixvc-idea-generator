"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

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
}

export function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { label: "Home", href: "/" }
  ])

  const addBreadcrumb = (breadcrumb: Breadcrumb) => {
    setBreadcrumbs(prev => {
      // Check if breadcrumb already exists
      const exists = prev.some(b => b.href === breadcrumb.href)
      if (exists) return prev
      return [...prev, breadcrumb]
    })
  }

  const removeBreadcrumb = (href: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.href !== href))
  }
  const clearBreadcrumbs = () => {
    setBreadcrumbs([{ label: "Home", href: "/" }])
  }

  return (
    <BreadcrumbContext.Provider 
      value={{ 
        breadcrumbs, 
        setBreadcrumbs, 
        addBreadcrumb, 
        removeBreadcrumb, 
        clearBreadcrumbs 
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumbs = useBreadcrumbContext;