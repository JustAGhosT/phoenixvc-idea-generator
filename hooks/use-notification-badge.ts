"use client"

// hooks/use-notification-badge.ts
import { useState } from "react"

export function useNotificationBadge() {
  const [count, setCount] = useState(0)

  return { count, setCount }
}
