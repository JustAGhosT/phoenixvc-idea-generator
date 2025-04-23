// components/notification-badge.tsx
interface NotificationBadgeProps {
  count: number
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return <span>{count}</span>
}
