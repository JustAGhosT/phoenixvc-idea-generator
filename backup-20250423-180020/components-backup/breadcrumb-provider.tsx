"use client"

// components/breadcrumb-provider.tsx
import type React from "react"
import { createContext, useContext, useState } from "react"

interface BreadcrumbContextProps {
  breadcrumbs: any[]
  setBreadcrumbs: (breadcrumbs: any[]) => void
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
  const [breadcrumbs, setBreadcrumbs] = useState([])

  const setBreadcrumbsValue = (breadcrumbs: any[]) => {
    setBreadcrumbs(breadcrumbs)
  }

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs: setBreadcrumbsValue }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
