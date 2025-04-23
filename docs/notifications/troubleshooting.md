# Notification Troubleshooting

This document provides solutions to common issues you might encounter when working with the notification system.

## Common Issues and Solutions

### Notifications Not Appearing

#### Symptoms
- Notifications are created but not displayed
- No visual feedback when triggering notifications

#### Possible Causes and Solutions

1. **Missing Provider**
   - **Cause**: The `NotificationProvider` is not properly set up in your application.
   - **Solution**: Ensure the `NotificationProvider` is included in your root layout:
     ```tsx
     // app/layout.tsx
     import { NotificationProvider } from "@/components/features/notification/notification-provider"
     
     export default function RootLayout({ children }) {
       return (
         <html lang="en">
           <body>
             <NotificationProvider>
               {children}
             </NotificationProvider>
           </body>
         </html>
       )
     }
     ```

2. **Missing Toast Component**
   - **Cause**: The `ToastNotifications` component is not included in your layout.
   - **Solution**: The `NotificationProvider` automatically includes the `ToastNotifications` component, but if you're using a custom setup, make sure to include it:
     ```tsx
     import { ToastNotifications } from "@/components/notifications/toast-notifications"
     
     function Layout({ children }) {
       return (
         <>
           {children}
           <ToastNotifications />
         </>
       )
     }
     ```

3. **Console Errors**
   - **Cause**: There might be errors preventing the notifications from rendering.
   - **Solution**: Check your browser console for errors related to notifications and fix them.

4. **CSS Issues**
   - **Cause**: CSS conflicts or missing styles might prevent notifications from being visible.
   - **Solution**: Ensure your CSS is not hiding or incorrectly styling notification elements.

### Real-time Notifications Not Working

#### Symptoms
- Notifications don't appear in real-time
- Need to refresh to see new notifications
- Connection status shows "Disconnected" or "Error"

#### Possible Causes and Solutions

1. **Server-Sent Events Not Supported**
   - **Cause**: The browser doesn't support SSE or the server is not configured correctly.
   - **Solution**: Check browser compatibility and server configuration. Implement a fallback mechanism using polling if necessary.

2. **CORS Issues**
   - **Cause**: Cross-Origin Resource Sharing (CORS) restrictions are preventing the connection.
   - **Solution**: Ensure your server is configured to allow SSE connections from your client's origin.

3. **Network Issues**
   - **Cause**: Network problems or firewalls are blocking the SSE connection.
   - **Solution**: Check network connectivity and firewall settings. The system should automatically attempt to reconnect, but you can manually trigger a reconnection:
     ```tsx
     import { useNotificationContext } from "@/contexts/features/notification-context"
     
     function ConnectionManager() {
       const { connectToSSE, connectionStatus } = useNotificationContext()
       
       return (
         <div>
           <p>Status: {connectionStatus}</p>
           <button onClick={connectToSSE}>Reconnect</button>
         </div>
       )
     }
     ```

4. **Server Issues**
   - **Cause**: The notification server is down or not responding.
   - **Solution**: Check server status and logs. Ensure the notification API endpoints are working correctly.

### Notifications Not Persisting

#### Symptoms
- Notifications disappear after page refresh
- Notifications don't sync between tabs

#### Possible Causes and Solutions

1. **Local Storage Issues**
   - **Cause**: localStorage is disabled, full, or not available.
   - **Solution**: Check if localStorage is available and has space:
     ```tsx
     function checkLocalStorage() {
       try {
         localStorage.setItem('test', 'test')
         localStorage.removeItem('test')
         return true
       } catch (e) {
         return false
       }
     }
     ```

2. **Persistence Disabled**
   - **Cause**: The `persistNotifications` option is set to `false`.
   - **Solution**: Ensure the option is set to `true` in the `NotificationProvider`:
     ```tsx
     <NotificationProvider persistNotifications={true}>
       {children}
     </NotificationProvider>
     ```

3. **Storage Key Conflict**
   - **Cause**: Multiple instances using the same storage key.
   - **Solution**: Use a unique storage key for each instance:
     ```tsx
     <NotificationProvider storageKey="app_notifications_v2">
       {children}
     </NotificationProvider>
     ```

4. **Serialization Issues**
   - **Cause**: Notifications contain data that can't be serialized to JSON.
   - **Solution**: Ensure notifications only contain serializable data. Custom React components in `icon` or complex objects in `metadata` might cause issues.

### Auto-Close Not Working

#### Symptoms
- Notifications don't automatically close after the specified delay
- Notifications stay visible indefinitely

#### Possible Causes and Solutions

1. **Missing Auto-Close Flag**
   - **Cause**: The `autoClose` property is not set to `true`.
   - **Solution**: Ensure the `autoClose` property is set:
     ```tsx
     notifications.success("Success", "Operation completed", {
       autoClose: true,
       autoCloseDelay: 5000 // 5 seconds
     })
     ```

2. **Invalid Delay Value**
   - **Cause**: The `autoCloseDelay` is set to an invalid value.
   - **Solution**: Ensure the delay is a positive number in milliseconds:
     ```tsx
     // Correct
     autoCloseDelay: 5000 // 5 seconds
     
     // Incorrect
     autoCloseDelay: "5000" // String instead of number
     autoCloseDelay: -1000 // Negative value
     ```

3. **JavaScript Execution Paused**
   - **Cause**: JavaScript execution is paused or blocked (e.g., debugging).
   - **Solution**: Ensure JavaScript is running normally. The auto-close feature relies on `setTimeout`.

4. **Component Unmounting**
   - **Cause**: The component managing the auto-close is unmounting before the timeout.
   - **Solution**: The notification system should handle this automatically, but if you're implementing a custom solution, ensure you clean up timeouts on unmount:
     ```tsx
     useEffect(() => {
       const timer = setTimeout(() => {
         // Close notification
       }, delay)
       
       return () => clearTimeout(timer)
     }, [delay])
     ```

### Performance Issues

#### Symptoms
- App becomes slow when many notifications are present
- High memory usage
- Laggy animations

#### Possible Causes and Solutions

1. **Too Many Notifications**
   - **Cause**: A large number of notifications are being stored and rendered.
   - **Solution**: Limit the maximum number of notifications:
     ```tsx
     <NotificationProvider maxNotifications={50}>
       {children}
     </NotificationProvider>
     ```

2. **Complex Notification Content**
   - **Cause**: Notifications contain complex React components or large data.
   - **Solution**: Keep notification content simple. Use links to more complex views instead of embedding them.

3. **Inefficient Rendering**
   - **Cause**: Notification components are re-rendering unnecessarily.
   - **Solution**: Ensure components are properly memoized and use efficient rendering patterns.

4. **Memory Leaks**
   - **Cause**: Event listeners or subscriptions aren't being cleaned up.
   - **Solution**: Ensure all event listeners and subscriptions are properly cleaned up in `useEffect` cleanup functions.

### Styling and Layout Issues

#### Symptoms
- Notifications appear in the wrong position
- Notifications have incorrect styling
- Notifications overlap with other UI elements

#### Possible Causes and Solutions

1. **CSS Conflicts**
   - **Cause**: Other CSS rules are overriding notification styles.
   - **Solution**: Use more specific selectors or the `!important` flag for critical styles. Consider using CSS modules or a CSS-in-JS solution.

2. **Z-Index Issues**
   - **Cause**: Other elements have higher z-index values.
   - **Solution**: Ensure notifications have an appropriate z-index value:
     ```css
     .notification-container {
       z-index: 1000; /* Adjust as needed */
     }
     ```

3. **Responsive Design Issues**
   - **Cause**: Notifications aren't properly adapted for different screen sizes.
   - **Solution**: Use responsive design techniques and test on various devices.

4. **Position Conflicts**
   - **Cause**: Other fixed or absolutely positioned elements are in the same position.
   - **Solution**: Adjust the position of notifications or other elements to avoid overlap.

## Debugging Techniques

### Logging Notification State

You can log the current state of notifications to help diagnose issues:

```tsx
import { useNotificationContext } from "@/contexts/features/notification-context"

function DebugNotifications() {
  const { notifications, connectionStatus } = useNotificationContext()
  
  useEffect(() => {
    console.log("Current notifications:", notifications)
    console.log("Connection status:", connectionStatus)
  }, [notifications, connectionStatus])
  
  return null
}
```

### Testing Notification Creation

You can create test notifications to verify the system is working:

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function TestNotifications() {
  const notifications = useNotifications()
  
  const testAllTypes = () => {
    notifications.info("Info Test", "This is a test info notification")
    notifications.success("Success Test", "This is a test success notification")
    notifications.warning("Warning Test", "This is a test warning notification")
    notifications.error("Error Test", "This is a test error notification")
  }
  
  return (
    <button onClick={testAllTypes}>
      Test All Notification Types
    </button>
  )
}
```

### Inspecting Local Storage

You can inspect the localStorage to see what notifications are being persisted:

```tsx
function inspectNotificationStorage() {
  const storageKey = "app_notifications" // Use your configured key
  const stored = localStorage.getItem(storageKey)
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      console.log("Stored notifications:", parsed)
      return parsed
    } catch (e) {
      console.error("Error parsing stored notifications:", e)
      return null
    }
  } else {
    console.log("No stored notifications found")
    return null
  }
}
```

### Testing SSE Connection

You can test the Server-Sent Events connection:

```tsx
function testSSEConnection() {
  try {
    const eventSource = new EventSource('/api/notifications/sse')
    
    eventSource.onopen = () => {
      console.log("SSE connection opened successfully")
    }
    
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error)
    }
    
    // Clean up after 5 seconds
    setTimeout(() => {
      eventSource.close()
      console.log("SSE connection closed")
    }, 5000)
    
    return "Testing SSE connection..."
  } catch (e) {
    console.error("Error creating SSE connection:", e)
    return "Error testing SSE connection"
  }
}
```

## Getting Help

If you're still experiencing issues after trying the solutions above:

1. **Check the Source Code**: Review the implementation in:
   - `lib/notification-types.ts`
   - `lib/notification-service.ts`
   - `contexts/features/notification-context.tsx`
   - `hooks/use-notifications.ts`

2. **Review Documentation**: Make sure you've read all the documentation in the `docs/notifications` directory.

3. **Create a Minimal Reproduction**: Create a simple example that demonstrates the issue.

4. **Contact the Development Team**: Provide details about the issue, steps to reproduce, and any error messages.