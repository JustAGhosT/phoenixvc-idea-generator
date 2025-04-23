"use client"

import { cn } from "@/lib/utils"
import { useNotifications } from "@/hooks/use-notifications"

interface NotificationBadgeProps {
  count?: number
  max?: number
  className?: string
  showZero?: boolean
}

export function NotificationBadge({
  count,
  max = 99,
  className,
  showZero = false
}: NotificationBadgeProps) {
  // Use the provided count or get it from the notification context
  const notifications = useNotifications()
  const unreadCount = count !== undefined ? count : notifications.unreadCount
  
  // Don't render if count is 0 and showZero is false
  if (unreadCount === 0 && !showZero) {
    return null
  }
  
  // Format the count (e.g., 100+ if over max)
  const formattedCount = unreadCount > max ? `${max}+` : unreadCount
  
  return (
    <span className={cn(
      "inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white",
      unreadCount === 0 && "bg-gray-400",
      className
    )}>
      {formattedCount}
    </span>
  )
}