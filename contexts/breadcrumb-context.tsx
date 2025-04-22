"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export interface Breadcrumb {
  label: string
  href: string
}

type BreadcrumbContextType = {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider")
  }
  return context
}

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const pathname = usePathname()

  // Generate breadcrumbs based on pathname
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const paths = pathname.split("/").filter(Boolean)

      // Always start with home
      const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }]

      // Build up the breadcrumbs based on the path
      let currentPath = ""
      paths.forEach((path, i) => {
        currentPath += `/${path}`

        // Special cases for known routes
        if (path === "editor" && paths[i + 1] === "new") {
          crumbs.push({ label: "New Project", href: currentPath + "/new" })
          return
        }

        if (path === "editor" && paths[i + 1] && paths[i + 1] !== "new") {
          crumbs.push({ label: "Editor", href: currentPath })
          crumbs.push({ label: `Project ${paths[i + 1]}`, href: `${currentPath}/${paths[i + 1]}` })
          return
        }

        // Format the label (capitalize, replace hyphens with spaces)
        const label = path.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

        crumbs.push({ label, href: currentPath })
      })

      setBreadcrumbs(crumbs)
    }

    generateBreadcrumbs()
  }, [pathname])

  return <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>{children}</BreadcrumbContext.Provider>
}
