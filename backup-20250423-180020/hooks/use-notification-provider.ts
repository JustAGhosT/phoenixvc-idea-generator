// hooks/use-notification-provider.ts
import { useNotificationContext } from "@/components/notification-provider"

export function useNotificationProvider() {
  return useNotificationContext()
}
