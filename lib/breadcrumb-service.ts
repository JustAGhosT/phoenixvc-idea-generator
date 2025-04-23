// lib/breadcrumb-service.ts
import { buildBreadcrumbs } from "./breadcrumb-utils"

export const breadcrumbService = {
  getBreadcrumbs: async (path: string) => {
    // Use the new breadcrumb utilities
    return new Promise((resolve) => {
      setTimeout(() => {
        const breadcrumbs = buildBreadcrumbs(path)
      }, 500)
    })
  },
}
