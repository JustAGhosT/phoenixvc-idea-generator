"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/hooks/use-notifications"
import { Notification } from "@/lib/notification-types"

interface ToastNotificationsProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  maxToasts?: number
  className?: string
}

export function ToastNotifications({
  position = "top-right",
  maxToasts = 5,
  className,
}: ToastNotificationsProps) {
  const [mounted, setMounted] = useState(false)
  const [toasts, setToasts] = useState<Notification[]>([])
  const notifications = useNotifications()

  // Set up listener for auto-close notifications
  useEffect(() => {
    if (typeof window === "undefined") return
    
    setMounted(true)
    
    // Function to handle new notifications
    const handleNewNotification = (notification: Notification) => {
      if (notification.autoClose) {
        setToasts(prev => {
          // Add to beginning and limit to maxToasts
          const updated = [notification, ...prev].slice(0, maxToasts)
          return updated
        })
        
        // Auto-remove after delay
        if (notification.autoCloseDelay) {
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== notification.id))
          }, notification.autoCloseDelay)
        }
      }
    }
    
    // Add listener for new notifications
    const unsubscribe = notificationService.addListener(handleNewNotification)
    
    return () => {
      unsubscribe()
    }
  }, [maxToasts])
  
  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4 items-start"
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2 items-center"
      case "top-right":
        return "top-4 right-4 items-end"
      case "bottom-left":
        return "bottom-4 left-4 items-start"
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2 items-center"
      case "bottom-right":
        return "bottom-4 right-4 items-end"
      default:
        return "top-4 right-4 items-end"
    }
  }
  
  // Get icon based on notification type
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
      case "system":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  // Get background color based on notification type
  const getBackgroundColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      case "warning":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      case "system":
        return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
      default:
        return "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    }
  }
  
  // Remove a toast
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }
  
  // If not mounted yet (SSR), don't render
  if (!mounted) return null
  
  // If no toasts, don't render
  if (toasts.length === 0) return null
  
  // Create portal for toast container
  return createPortal(
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none",
        getPositionClasses(),
        className
      )}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start p-4 rounded-lg shadow-md border pointer-events-auto transform transition-all duration-300 ease-in-out",
            getBackgroundColor(toast.type),
            "animate-in slide-in-from-right-5"
          )}
          role="alert"
        >
          <div className="mr-3 mt-0.5">
            {toast.icon || getIcon(toast.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {toast.title}
              </h4>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
              {toast.message}
            </p>
            
            {/* Actions */}
            {toast.actions && toast.actions.length > 0 && (
              <div className="flex mt-2 space-x-2">
                {toast.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "outline"}
                    size="sm"
                    onClick={() => {
                      action.onClick(toast)
                      removeToast(toast.id)
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 ml-2 -mt-1 -mr-1 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>,
    document.body
  )
}