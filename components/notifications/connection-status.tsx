"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotificationContext } from "@/contexts/features/notification-context"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, RefreshCw, WifiOff } from "lucide-react"

export interface NotificationConnectionStatusProps {
  /**
   * Whether to show the connection status
   * @default true
   */
  showStatus?: boolean
  
  /**
   * Whether to show the reconnect button
   * @default true
   */
  showReconnectButton?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Component to display the real-time notification connection status
 * 
 * @example
 * ```tsx
 * <NotificationConnectionStatus />
 * ```
 */
export function NotificationConnectionStatus({
  showStatus = true,
  showReconnectButton = true,
  className,
}: NotificationConnectionStatusProps) {
  const { connectionStatus, connectToSSE, disconnectFromSSE } = useNotificationContext()
  
  // Handle reconnect button click
  const handleReconnect = () => {
    // Disconnect first to ensure a clean connection
    disconnectFromSSE()
    
    // Wait a moment before reconnecting
    setTimeout(() => {
      connectToSSE()
    }, 500)
  }
  
  // If status is not shown, return null
  if (!showStatus) {
    return null
  }
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {connectionStatus === 'connected' && (
        <>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        </>
      )}
      
      {connectionStatus === 'disconnected' && (
        <>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            <WifiOff className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
          
          {showReconnectButton && (
            <Button variant="ghost" size="sm" onClick={handleReconnect} className="h-7 px-2">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Reconnect
            </Button>
          )}
        </>
      )}
      
      {connectionStatus === 'error' && (
        <>
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Connection Error
          </Badge>
          
          {showReconnectButton && (
            <Button variant="ghost" size="sm" onClick={handleReconnect} className="h-7 px-2">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Reconnect
            </Button>
          )}
        </>
      )}
      
      {connectionStatus === 'initial' && (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300 border-gray-200 dark:border-gray-800">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Connecting...
        </Badge>
      )}
    </div>
  )
}