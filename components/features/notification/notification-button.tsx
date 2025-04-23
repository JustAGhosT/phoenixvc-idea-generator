"use client"

// components/notification-button.tsx
interface NotificationButtonProps {
  onClick: () => void
}

export function NotificationButton({ onClick }: NotificationButtonProps) {
  return <button onClick={onClick}>Notifications</button>
}
