"use client"

import { ToastNotifications } from "@/components/notifications/toast-notifications"
import { NotificationProvider as ContextProvider } from "@/contexts/features/notification-context"
import { ReactNode } from "react"

interface NotificationProviderProps {
  children: ReactNode
  maxNotifications?: number
  storageKey?: string
  persistNotifications?: boolean
  autoConnect?: boolean
  toastPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  maxToasts?: number
}

/**
 * Main notification provider component that sets up the notification system
 * and renders toast notifications
 * 
 * @example
 * ```tsx
 * // In your root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <NotificationProvider>
 *           {children}
 *         </NotificationProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function NotificationProvider({
  children,
  maxNotifications = 50,
  storageKey = "app_notifications",
  persistNotifications = true,
  autoConnect = true,
  toastPosition = "top-right",
  maxToasts = 5
}: NotificationProviderProps) {
  return (
    <ContextProvider
      maxNotifications={maxNotifications}
      storageKey={storageKey}
      persistNotifications={persistNotifications}
      autoConnect={autoConnect}
    >
      {children}
      <ToastNotifications 
        position={toastPosition}
        maxToasts={maxToasts}
      />
    </ContextProvider>
  )
}