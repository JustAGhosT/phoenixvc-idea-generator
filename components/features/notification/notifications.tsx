"use client"

import { ConnectionStatus } from "@/components/notifications/connection-status"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotificationList } from "@/hooks/use-notification-list"
import { Notification } from "@/lib/notification-types"
import { Filter, Search, X } from "lucide-react"
import { useState } from "react"
import { NotificationDialog } from "./notification-dialog"
import { NotificationList } from "./notification-list"

interface NotificationsProps {
  initialTab?: string
  showSearch?: boolean
  showFilters?: boolean
  showConnectionStatus?: boolean
  className?: string
}

export function Notifications({
  initialTab = "all",
  showSearch = true,
  showFilters = true,
  showConnectionStatus = true,
  className,
}: NotificationsProps) {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>(initialTab)
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedPriority, setSelectedPriority] = useState<string>("")
  
  // State for notification dialog
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  // Get notifications based on active tab
  const { 
    notifications: allNotifications,
    loading,
    error,
    refetch,
    markAllAsRead,
    clearAll,
    connectionStatus
  } = useNotificationList({
    realtime: true,
    autoFetch: true
  })
  
  // Filter notifications based on tab, search query, and filters
  const getFilteredNotifications = () => {
    // First filter by tab
    let filtered = allNotifications
    
    if (activeTab === "unread") {
      filtered = filtered.filter(n => !n.read)
    } else if (activeTab === "read") {
      filtered = filtered.filter(n => n.read)
    }
    
    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) || 
        n.message.toLowerCase().includes(query) ||
        (n.category && n.category.toLowerCase().includes(query))
      )
    }
    
    // Then filter by type
    if (selectedType) {
      filtered = filtered.filter(n => n.type === selectedType)
    }
    
    // Then filter by priority
    if (selectedPriority) {
      filtered = filtered.filter(n => n.priority === selectedPriority)
    }
    
    return filtered
  }
  
  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotificationId(notification.id)
    setDialogOpen(true)
  }
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedType("")
    setSelectedPriority("")
  }
  
  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedType || selectedPriority
  
  // Get filtered notifications
  const filteredNotifications = getFilteredNotifications()
  
  return (
    <div className={className}>
      {/* Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          
          {showConnectionStatus && (
            <ConnectionStatus />
          )}
        </div>
        
        {/* Search and filters */}
        {(showSearch || showFilters) && (
          <div className="mb-4 space-y-2">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search notifications..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={resetFilters}
                    title="Clear filters"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                {hasActiveFilters && (
                  <div className="flex items-center ml-2 text-sm text-gray-500 dark:text-gray-400">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {filteredNotifications.length} result{filteredNotifications.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Notification lists */}
        <TabsContent value="all" className="m-0">
          <NotificationList
            notifications={filteredNotifications}
            loading={loading}
            error={error}
            onRefresh={refetch}
            onMarkAllRead={markAllAsRead}
            onClearAll={clearAll}
            onNotificationClick={handleNotificationClick}
            emptyMessage={
              hasActiveFilters 
                ? "No notifications match your filters" 
                : "No notifications yet"
            }
            maxHeight="calc(100vh - 240px)"
          />
        </TabsContent>
        
        <TabsContent value="unread" className="m-0">
          <NotificationList
            notifications={filteredNotifications}
            loading={loading}
            error={error}
            onRefresh={refetch}
            onMarkAllRead={markAllAsRead}
            onClearAll={clearAll}
            onNotificationClick={handleNotificationClick}
            emptyMessage={
              hasActiveFilters 
                ? "No unread notifications match your filters" 
                : "No unread notifications"
            }
            maxHeight="calc(100vh - 240px)"
          />
        </TabsContent>
        
        <TabsContent value="read" className="m-0">
          <NotificationList
            notifications={filteredNotifications}
            loading={loading}
            error={error}
            onRefresh={refetch}
            onMarkAllRead={markAllAsRead}
            onClearAll={clearAll}
            onNotificationClick={handleNotificationClick}
            emptyMessage={
              hasActiveFilters 
                ? "No read notifications match your filters" 
                : "No read notifications"
            }
            maxHeight="calc(100vh - 240px)"
          />
        </TabsContent>
      </Tabs>
      
      {/* Notification dialog */}
      {selectedNotificationId && (
        <NotificationDialog
          id={selectedNotificationId}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onMarkRead={refetch}
          onDelete={refetch}
        />
      )}
    </div>
  )
}