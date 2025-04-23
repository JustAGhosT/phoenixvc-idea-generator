# Notification Best Practices

This document provides guidelines and best practices for using the notification system effectively.

## When to Use Different Notification Types

Choose the appropriate notification type based on the nature of the message:

| Type | When to Use | Example |
|------|-------------|---------|
| `info` | General information that doesn't require immediate action | "Your report is ready to view" |
| `success` | Confirmation of a successful operation | "Changes saved successfully" |
| `warning` | Potential issues that don't prevent the user from continuing | "Your session will expire in 5 minutes" |
| `error` | Errors that prevent the user from completing an action | "Failed to save changes due to network error" |
| `system` | System-level messages like maintenance or updates | "System maintenance scheduled for tomorrow" |

## When to Use Different Priority Levels

Choose the appropriate priority level based on the importance of the message:

| Priority | When to Use | Example |
|----------|-------------|---------|
| `low` | Informational messages that aren't time-sensitive | "New feature available" |
| `medium` | Standard notifications (default) | "Your report is ready to view" |
| `high` | Important notifications that should grab attention | "Your payment is due tomorrow" |
| `urgent` | Critical issues that require immediate action | "Security breach detected" |

## Content Guidelines

### Writing Effective Notification Titles

1. **Be concise**: Keep titles under 50 characters
2. **Be specific**: Clearly indicate what the notification is about
3. **Use action verbs**: Start with verbs when appropriate
4. **Be consistent**: Use similar language patterns across notifications

Examples:
- ✅ "Payment Successful"
- ✅ "File Upload Failed"
- ❌ "Error" (too vague)
- ❌ "The system encountered an issue while attempting to process your payment request" (too long)

### Writing Effective Notification Messages

1. **Be clear and direct**: Explain what happened or what action is needed
2. **Provide context**: Include relevant details without overwhelming
3. **Suggest next steps**: Tell users what they can do next
4. **Use plain language**: Avoid technical jargon unless necessary
5. **Keep it brief**: Aim for 1-2 sentences when possible

Examples:
- ✅ "Your payment of $19.99 was processed successfully. View receipt in your account."
- ✅ "Unable to upload file. Please check your internet connection and try again."
- ❌ "Error code 5023" (no context or next steps)
- ❌ "The system encountered a temporary disruption in the processing pipeline which prevented the completion of your requested operation. Please attempt to reinitiate the process at a later time when system resources may be more readily available." (too verbose)

## UX Considerations

### Notification Placement

- **Toast notifications**: Use for temporary, non-critical messages that don't require action
- **Notification center**: Use for messages that users might want to reference later
- **In-context notifications**: Display near the relevant UI element when possible

### Notification Timing

- **Success messages**: Show immediately after the action and auto-close after 3-5 seconds
- **Error messages**: Show immediately and keep visible until dismissed
- **Warning messages**: Show with enough time for the user to take action
- **System messages**: Show at appropriate times (not during critical user tasks)

### Notification Volume

- **Batch similar notifications**: Group related notifications to reduce noise
- **Limit concurrent notifications**: Don't show more than 3-5 toast notifications at once
- **Prioritize**: Show higher priority notifications first
- **Throttle**: Limit the frequency of notifications from the same source

## Technical Best Practices

### Performance Considerations

1. **Limit stored notifications**: Set a reasonable maximum (e.g., 50-100)
2. **Clean up old notifications**: Automatically remove old notifications
3. **Lazy load notification details**: Only fetch full details when needed
4. **Optimize real-time connections**: Use appropriate reconnection strategies

### Security Considerations

1. **Sanitize content**: Ensure notification content is safe from XSS attacks
2. **Avoid sensitive data**: Don't include sensitive information in notifications
3. **Validate sources**: Only accept notifications from trusted sources
4. **Respect privacy**: Consider privacy implications of notifications

### Accessibility Considerations

1. **Use ARIA attributes**: Ensure notifications are accessible to screen readers
2. **Provide sufficient contrast**: Ensure text is readable
3. **Allow keyboard dismissal**: Make sure notifications can be dismissed via keyboard
4. **Respect reduced motion**: Honor user preferences for reduced animation
5. **Provide alternatives**: Don't rely solely on visual notifications

## Implementation Patterns

### Notification Lifecycle Management

1. **Creation**: Create notifications with appropriate type and priority
2. **Display**: Show notifications in the appropriate context
3. **Update**: Update notifications when their status changes
4. **Resolution**: Mark as read or remove when no longer needed
5. **Archiving**: Store important notifications for future reference

### Error Handling

1. **Graceful degradation**: Fall back to local notifications if server is unavailable
2. **Retry logic**: Implement appropriate retry strategies for failed operations
3. **Fallback content**: Provide meaningful fallback content if notification data is incomplete
4. **Error boundaries**: Use error boundaries to prevent notification errors from crashing the app

### Testing Notifications

1. **Unit tests**: Test notification creation and management logic
2. **Integration tests**: Test notification display and interaction
3. **Visual regression tests**: Ensure notifications appear correctly
4. **Accessibility tests**: Verify notifications are accessible
5. **Performance tests**: Check that notifications don't impact app performance

## Examples of Good Notification Implementation

### Success Notification

```tsx
notifications.success(
  "Payment Processed",
  "Your payment of $19.99 was processed successfully.",
  {
    category: "billing",
    autoClose: true,
    autoCloseDelay: 5000,
    actions: [
      {
        label: "View Receipt",
        onClick: () => router.push("/billing/receipts/latest"),
        variant: "outline"
      }
    ]
  }
)
```

### Error Notification

```tsx
notifications.error(
  "Upload Failed",
  "We couldn't upload your file due to a network error.",
  {
    category: "uploads",
    priority: "high",
    actions: [
      {
        label: "Try Again",
        onClick: () => handleUpload(file),
        variant: "default"
      },
      {
        label: "Help",
        onClick: () => router.push("/support/upload-issues"),
        variant: "link"
      }
    ]
  }
)
```

### System Notification

```tsx
notifications.add({
  title: "Scheduled Maintenance",
  message: "The system will be unavailable on Sunday, May 5th from 2-4 AM EST for scheduled maintenance.",
  type: "system",
  category: "maintenance",
  priority: "medium",
  persistent: true,
  autoClose: false,
  actions: [
    {
      label: "Add to Calendar",
      onClick: () => addToCalendar({
        title: "System Maintenance",
        start: new Date("2023-05-05T02:00:00-04:00"),
        end: new Date("2023-05-05T04:00:00-04:00")
      }),
      variant: "outline"
    },
    {
      label: "Dismiss",
      onClick: (notification) => notifications.remove(notification.id),
      variant: "ghost"
    }
  ]
})
```