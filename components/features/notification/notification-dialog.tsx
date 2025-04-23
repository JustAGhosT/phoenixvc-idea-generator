"use client"

// components/notification-dialog.tsx
interface NotificationDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationDialog({ isOpen, onClose }: NotificationDialogProps) {
  return isOpen ? (
    <div>
      <h2>Notification Dialog</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
}
