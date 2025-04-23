/**
 * Utilities for working with breadcrumbs
 */
import type { Breadcrumb } from "@/contexts/features/breadcrumb-context"

/**
 * Maps route patterns to human-readable names
 * Add your routes here to customize breadcrumb labels
 */
export const routeLabels: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/settings": "Settings",
  "/users": "Users",
  "/profile": "Profile",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/ideas": "Ideas",
  "/breadcrumbs": "Breadcrumbs Demo",
}

/**
 * Maps dynamic route patterns to functions that generate a label
 * The function receives the parameter value and returns a label
 */
export const dynamicRouteLabels: Record<string, (param: string) => string> = {
  "/projects/[id]": (id) => `Project ${id}`,
  "/users/[id]": (id) => `User ${id}`,
  "/ideas/[id]": (id) => `Idea ${id}`,
  "/breadcrumbs/[id]": (id) => `Breadcrumb ${id}`,
}

/**
 * Builds breadcrumbs from a path with support for dynamic routes
 * 
 * @param path The current path
 * @param params Optional route parameters for dynamic routes
 * @returns Array of breadcrumb objects
 */
export function buildBreadcrumbs(path: string, params?: Record<string, string>): Breadcrumb[] {
  // Always start with home
  const breadcrumbs: Breadcrumb[] = [
    { label: routeLabels["/"] || "Home", href: "/" }
  ]
  
  // Skip if we're on the home page
  if (path === "/") return breadcrumbs
  
  // Split the path and create breadcrumbs
  const segments = path.split("/").filter(Boolean)
  let currentPath = ""
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Check if this is a dynamic segment
    const isDynamicSegment = segment.match(/^\[(.+)\]$/)
    
    if (isDynamicSegment && params) {
      // Extract parameter name from [paramName]
      const paramName = isDynamicSegment[1]
      const paramValue = params[paramName]
      
      // Build the actual path with the parameter value
      const actualPath = currentPath.replace(`[${paramName}]`, paramValue)
      
      // Try to find a dynamic route handler
      const fullPath = segments.slice(0, index + 1).join('/')
      const dynamicPathPattern = `/${fullPath}`
      
      let label = segment
      
      // Check if we have a label generator for this pattern
      if (dynamicRouteLabels[dynamicPathPattern] && paramValue) {
        label = dynamicRouteLabels[dynamicPathPattern](paramValue)
      } else {
        // Default formatting for dynamic segments
        label = paramValue || "Details"
      }
      
      breadcrumbs.push({
        label,
        href: actualPath
      })
    } else {
      // Static segment
      // Check if we have a predefined label for this path
      const label = routeLabels[currentPath] || 
        // Otherwise, format the segment (capitalize, replace hyphens with spaces)
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())
      
      breadcrumbs.push({
        label,
        href: currentPath
      })
    }
  })
  
  return breadcrumbs
}

/**
 * Creates a breadcrumb trail for a specific route
 * Useful for setting breadcrumbs programmatically
 * 
 * @example
 * ```tsx
 * // In a page component
 * const { setBreadcrumbs } = useBreadcrumbs()
 * 
 * useEffect(() => {
 *   setBreadcrumbs(createBreadcrumbTrail(
 *     [
 *       { label: "Dashboard", href: "/dashboard" },
 *       { label: "Projects", href: "/dashboard/projects" },
 *       { label: "Project ABC", href: "/dashboard/projects/abc" }
 *     ]
 *   ))
 * }, [])
 * ```
 */
export function createBreadcrumbTrail(trail: Breadcrumb[]): Breadcrumb[] {
  // Always ensure Home is the first breadcrumb
  if (trail.length === 0 || trail[0].href !== "/") {
    return [{ label: "Home", href: "/" }, ...trail]
  }
  return trail
}