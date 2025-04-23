"use client"

import { useNotificationContext, type Notification } from "@/contexts/features/notification-context"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X
} from "lucide-react"
import { useEffect, useState } from "react"

export interface ToastNotificationsProps {
  /**
   * Position of the toast notifications
   * @default "bottom-right"
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  
  /**
   * Maximum number of toasts to show at once
   * @default 3
   */
  maxToasts?: number
  
  /**
   * Whether to show close buttons on toasts
   * @default true
   */
  showCloseButton?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Toast notification container that automatically displays notifications with autoClose set to true
 * 
 * @example
 * ```tsx
 * // In your layout component:
 * <ToastNotifications position="bottom-right" maxToasts={3} />
 * 
 * // Then in any component:
 * const { showSuccess, showError } = useNotificationContext()
 * 
 * // Show a toast
 * showSuccess("Success!", "Operation completed", { autoClose: true })
 * ```
 */
export function ToastNotifications({
  position = "bottom-right",
  maxToasts = 3,
  showCloseButton = true,
  className,
}: ToastNotificationsProps) {
  const { notifications, removeNotification } = useNotificationContext()
  const [toasts, setToasts] = useState<Notification[]>([])
  
  // Filter notifications to only show those with autoClose=true
  useEffect(() => {
    const autoCloseNotifications = notifications
      .filter(n => n.autoClose)
      .slice(0, maxToasts)
    
    setToasts(autoCloseNotifications)
  }, [notifications, maxToasts])
  
  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4 flex flex-col items-end"
      case "top-left":
        return "top-4 left-4 flex flex-col items-start"
      case "bottom-right":
        return "bottom-4 right-4 flex flex-col items-end"
      case "bottom-left":
        return "bottom-4 left-4 flex flex-col items-start"
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
      default:
        return "bottom-4 right-4 flex flex-col items-end"
    }
  }
  
  // Get toast icon based on type
  const getToastIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  // Get toast background color based on type
  const getToastClasses = (type: string) => {
    const baseClasses = "rounded-md shadow-lg p-4 flex items-start gap-3 w-full max-w-sm backdrop-blur-sm"
    
    switch (type) {
      case "info":
        return cn(baseClasses, "bg-blue-50/90 text-blue-800 dark:bg-blue-950/90 dark:text-blue-200")
      case "success":
        return cn(baseClasses, "bg-green-50/90 text-green-800 dark:bg-green-950/90 dark:text-green-200")
      case "warning":
        return cn(baseClasses, "bg-amber-50/90 text-amber-800 dark:bg-amber-950/90 dark:text-amber-200")
      case "error":
        return cn(baseClasses, "bg-red-50/90 text-red-800 dark:bg-red-950/90 dark:text-red-200")
      default:
        return cn(baseClasses, "bg-gray-50/90 text-gray-800 dark:bg-gray-800/90 dark:text-gray-200")
    }
  }
  
  return (
    <div className={cn("fixed z-50 space-y-2", getPositionClasses(), className)}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={getToastClasses(toast.type)}
          >
            <div className="mt-0.5">
              {toast.icon || getToastIcon(toast.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">{toast.title}</h4>
                
                {showCloseButton && (
                  <button
                    onClick={() => removeNotification(toast.id)}
                    className="text-current opacity-70 hover:opacity-100 -mt-1 -mr-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <p className="text-xs opacity-90">{toast.message}</p>
              
              {toast.actions && toast.actions.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {toast.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        action.onClick(toast)
                      }}
                      className={cn(
                        "px-2 py-1 text-xs rounded",
                        action.variant === "destructive" && "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50",
                        action.variant === "outline" && "border border-current hover:bg-current/10",
                        action.variant === "ghost" && "hover:bg-current/10",
                        !action.variant || action.variant === "default" && "bg-current/10 hover:bg-current/20"
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}