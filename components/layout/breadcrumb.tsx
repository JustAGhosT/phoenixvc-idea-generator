"use client"

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface BreadcrumbProps {
  /**
   * Additional CSS classes to apply to the breadcrumb container
   */
  className?: string
  
  /**
   * Visual variant of the breadcrumb
   */
  variant?: "default" | "minimal" | "pills" | "arrows"
  
  /**
   * Size of the breadcrumb
   */
  size?: "sm" | "md" | "lg"
  
  /**
   * Whether to show the home icon
   */
  showHomeIcon?: boolean
  
  /**
   * Custom separator between breadcrumb items
   */
  separator?: React.ReactNode
  
  /**
   * Maximum number of items to show before collapsing
   * Set to 0 to show all items
   */
  maxItems?: number
}

/**
 * Breadcrumb navigation component
 * Displays the current navigation path as breadcrumbs
 */
export function Breadcrumb({
  className,
  variant = "default",
  size = "md",
  showHomeIcon = true,
  separator,
  maxItems = 0,
}: BreadcrumbProps) {
  const { breadcrumbs } = useBreadcrumbs()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything during SSR or first render to avoid hydration mismatch
  if (!mounted) {
    return null
  }
  
  // If no breadcrumbs, don't render anything
  if (!breadcrumbs.length) {
    return null
  }
  
  // Determine which breadcrumbs to show based on maxItems
  const visibleBreadcrumbs = maxItems > 0 && breadcrumbs.length > maxItems + 1
    ? [
        breadcrumbs[0],
        { label: "...", href: "" },
        ...breadcrumbs.slice(breadcrumbs.length - maxItems)
      ]
    : breadcrumbs
  
  // Determine the separator based on variant and custom separator
  const getSeparator = () => {
    if (separator) return separator
    
    switch (variant) {
      case "arrows":
        return <ChevronRight className="h-4 w-4" />
      case "pills":
        return null // Pills don't have separators
      default:
        return <span className="mx-2 text-gray-400">/</span>
    }
  }
  
  // Get size-based classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs"
      case "lg":
        return "text-base"
      default:
        return "text-sm"
    }
  }
  
  // Get variant-based classes
  const getVariantClasses = (isLast: boolean, index: number) => {
    switch (variant) {
      case "minimal":
        return cn(
          "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
          isLast && "font-medium text-gray-900 dark:text-gray-100"
        )
      case "pills":
        return cn(
          "px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
          isLast && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
        )
      case "arrows":
        return cn(
          "flex items-center text-gray-600 dark:text-gray-300",
          isLast && "font-medium text-gray-900 dark:text-gray-100"
        )
      default:
        return cn(
          "text-blue-600 hover:underline dark:text-blue-400",
          isLast && "font-medium text-gray-800 dark:text-gray-200 no-underline"
        )
    }
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("mb-4", className)}
    >
      <ol className={cn(
        "flex items-center flex-wrap", 
        getSizeClasses(),
        variant === "pills" && "gap-2"
      )}>
        {visibleBreadcrumbs.map((breadcrumb, index) => {
          const isLast = index === visibleBreadcrumbs.length - 1
          const isEllipsis = breadcrumb.label === "..."
          
          // Convert href to string to ensure it works as a key
          const keyString = typeof breadcrumb.href === 'string' 
            ? breadcrumb.href 
            : JSON.stringify(breadcrumb.href)
          
          return (
            <li key={keyString || index} className="flex items-center">
              {index > 0 && !isEllipsis && variant !== "pills" && getSeparator()}
              
              {index === 0 && showHomeIcon ? (
                <Link
                  href={breadcrumb.href}
                  className={getVariantClasses(isLast, index)}
                  aria-current={isLast ? "page" : undefined}
                >
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    <span className="sr-only">Home</span>
                    {variant !== "minimal" && breadcrumb.label}
                  </span>
                </Link>
              ) : isEllipsis ? (
                <span className="mx-2 text-gray-400">...</span>
              ) : isLast ? (
                <span 
                  className={getVariantClasses(isLast, index)}
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className={getVariantClasses(isLast, index)}
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