/**
 * Notification system type definitions
 */

// Define notification types
export type NotificationType = "info" | "success" | "warning" | "error" | "system"

// Define notification priority levels
export type NotificationPriority = "low" | "medium" | "high" | "urgent"

// Define notification interface
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  read: boolean
  date: Date
  readAt?: Date
  category?: string
  link?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
  actions?: NotificationAction[]
  metadata?: Record<string, any>
}

// Define notification action interface
export interface NotificationAction {
  label: string
  onClick: (notification: Notification) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

// Define notification API response type
export interface NotificationResponse {
  id: string
  title: string
  message: string
  type: string
  priority?: string
  read: boolean
  createdAt: string
  readAt?: string
  category?: string
  link?: string
  metadata?: any
}

// Define notification creation options
export interface CreateNotificationOptions {
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  category?: string
  link?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
  actions?: NotificationAction[]
  metadata?: Record<string, any>
}

// Define toast notification options
export interface ToastOptions {
  title?: string
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  onClose?: () => void
  actions?: NotificationAction[]
}

// Define notification filter options
export interface NotificationFilterOptions {
  limit?: number
  read?: boolean
  type?: NotificationType
  category?: string
}