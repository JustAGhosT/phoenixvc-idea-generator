// lib/breadcrumb-service.ts
import { Breadcrumb } from "@/lib/types"
import { buildBreadcrumbs } from "./breadcrumb-utils"

export const breadcrumbService = {
  /**
   * Get breadcrumbs for a given path
   * 
   * @param path The current path
   * @returns Promise resolving to an array of breadcrumbs
   */
  getBreadcrumbs: async (path: string): Promise<Breadcrumb[]> => {
    // Use the breadcrumb utilities with a small delay to simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const breadcrumbs = buildBreadcrumbs(path)
        resolve(breadcrumbs)
      }, 300)
    })
  },
}
