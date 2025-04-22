"use client"

import Link from "next/link"
import { useBreadcrumbs } from "@/contexts/breadcrumb-context"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap text-sm">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li
              key={breadcrumb.href}
              className={cn("flex items-center", isLast ? "text-foreground font-medium" : "text-muted-foreground")}
            >
              {index === 0 ? (
                <Link href={breadcrumb.href} className="flex items-center hover:text-foreground">
                  <Home className="h-3.5 w-3.5" />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  {isLast ? (
                    <span>{breadcrumb.label}</span>
                  ) : (
                    <Link href={breadcrumb.href} className="hover:text-foreground">
                      {breadcrumb.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
