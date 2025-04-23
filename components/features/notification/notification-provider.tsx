"use client"

// This file re-exports the notification context from the contexts folder
// It's here to maintain backward compatibility with existing imports

import {
  NotificationProvider as OriginalNotificationProvider,
  useNotificationContext,
  useNotifications
} from "@/contexts/features/notification-context"

export { useNotificationContext, useNotifications }
export const NotificationProvider = OriginalNotificationProvider
