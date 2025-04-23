# Notification System Overview

This document provides a high-level overview of our notification system architecture and components.

## System Architecture

Our notification system consists of the following key components:

1. **Notification Types** - Centralized type definitions
2. **Notification Service** - Backend communication layer
3. **Notification Context** - State management and business logic
4. **Notification Hooks** - Simplified API for components
5. **UI Components** - Reusable notification display components

## Key Features

- Multiple notification types (info, success, warning, error, system)
- Priority levels (low, medium, high, urgent)
- Real-time notifications via Server-Sent Events (SSE)
- Toast notifications for temporary messages
- Persistent notifications in a notification center
- Read/unread status tracking
- Action buttons within notifications
- Categorization for organization
- Local storage persistence
- Reconnection logic for network issues

## Directory Structure

```
lib/
  ├── notification-types.ts    # Type definitions
  └── notification-service.ts  # Backend communication

contexts/features/
  └── notification-context.tsx # State management

hooks/
  ├── use-notifications.ts     # Main notification hook
  ├── use-notification-item.ts # Single notification hook
  └── use-notification-list.ts # Notification list hook

components/features/notification/
  ├── notification-provider.tsx # Provider component
  ├── notification-item.tsx     # Individual notification
  ├── notification-list.tsx     # List of notifications
  ├── notification-badge.tsx    # Unread count badge
  ├── notification-button.tsx   # Notification bell with dropdown
  ├── notification-dialog.tsx   # Detailed notification view
  └── notifications.tsx         # Full notification page component

components/notifications/
  ├── toast-notifications.tsx   # Toast container
  └── connection-status.tsx     # Connection status indicator
```

## Getting Started

To use the notification system in your application:

1. Ensure the `NotificationProvider` is included in your app's root layout
2. Use the `useNotifications` hook to show and manage notifications
3. Use the `useToast` hook for toast-style notifications
4. Add the `NotificationButton` component to your header for a notification center

See the other documentation files in this directory for detailed usage instructions and examples.

## Related Documentation

- [Usage Guide](./usage-guide.md) - How to use the notification system
- [Components](./components.md) - Available notification components
- [Hooks](./hooks.md) - Available notification hooks
- [Types](./types.md) - Notification type definitions
- [Best Practices](./best-practices.md) - Guidelines for effective notifications
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions