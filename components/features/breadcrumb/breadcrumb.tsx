"use client"

import { useBreadcrumbs } from "@/contexts/breadcrumb-context"; // Updated import name
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Breadcrumb() {
  const pathname = usePathname()
  const { breadcrumbs } = useBreadcrumbs() // Updated hook name
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything during SSR or first render to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap text-sm">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          
          // Convert href to string to ensure it works as a key
          const keyString = typeof breadcrumb.href === 'string' 
            ? breadcrumb.href 
            : JSON.stringify(breadcrumb.href)
          
          return (
            <li key={keyString || index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              
              {isLast ? (
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}