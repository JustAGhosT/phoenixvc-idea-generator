"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNotifications } from "@/hooks/use-notifications"
import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"
import { useState } from "react"
import { NotificationBadge } from "./notification-badge"
import { NotificationList } from "./notification-list"

interface NotificationButtonProps {
  className?: string
  iconClassName?: string
  badgeClassName?: string
  popoverWidth?: string | number
  maxNotifications?: number
}

export function NotificationButton({
  className,
  iconClassName,
  badgeClassName,
  popoverWidth = 400,
  maxNotifications = 10,
}: NotificationButtonProps) {
  const [open, setOpen] = useState(false)
  const notifications = useNotifications()
  
  const handleMarkAllRead = () => {
    notifications.markAllRead()
  }
  
  const handleClearAll = () => {
    notifications.clearAll()
  }
  
  const handleMarkRead = (id: string) => {
    notifications.markRead(id)
  }
  
  const handleDelete = (id: string) => {
    notifications.remove(id)
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label="Open notifications"
        >
          <Bell className={cn("h-5 w-5", iconClassName)} />
          <span className="absolute -top-1 -right-1">
            <NotificationBadge className={badgeClassName} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        align="end" 
        sideOffset={8}
        style={{ width: typeof popoverWidth === 'number' ? `${popoverWidth}px` : popoverWidth }}
      >
        <div className="p-4 pb-0">
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="p-4">
          <NotificationList
            notifications={notifications.getAll().slice(0, maxNotifications)}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
            emptyMessage="No notifications yet"
            showConnectionStatus={true}
            maxHeight={350}
          />
        </div>
        {notifications.getAll().length > maxNotifications && (
          <div className="p-2 border-t border-gray-100 dark:border-gray-800 text-center">
            <Button 
              variant="link" 
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setOpen(false)}
              asChild
            >
              <a href="/notifications">View all notifications</a>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}