# Toggle Component

A customizable toggle switch component for boolean input with a modern switch appearance.

## Features

- Multiple sizes: sm, md, lg
- Multiple variants: primary, secondary, success, danger
- Helper text and error message display
- Label positioning (left or right)
- Accessible with keyboard navigation
- Customizable styling

## Usage

```tsx
import { Toggle } from '@/components/ui/toggle';

// Basic usage
<Toggle label="Dark mode" />

// Controlled toggle
<Toggle 
  label="Notifications"
  checked={notificationsEnabled}
  onChange={(e) => setNotificationsEnabled(e.target.checked)}
/>

// With helper text
<Toggle 
  label="Auto-save"
  helperText="Automatically save your work every 5 minutes"
/>

// With error message
<Toggle 
  label="Accept terms"
  error="You must accept the terms to continue"
/>

// Different sizes
<Toggle label="Small toggle" size="sm" />
<Toggle label="Medium toggle" size="md" />
<Toggle label="Large toggle" size="lg" />

// Different variants
<Toggle label="Primary variant" variant="primary" />
<Toggle label="Secondary variant" variant="secondary" />
<Toggle label="Success variant" variant="success" />
<Toggle label="Danger variant" variant="danger" />

// Label on the left
<Toggle label="Label on the left" labelLeft />

// Disabled state
<Toggle label="Disabled toggle" disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | The text label for the toggle |
| checked | boolean | - | Whether the toggle is checked |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the toggle |
| variant | 'primary' \| 'secondary' \| 'success' \| 'danger' | 'primary' | The visual style variant |
| helperText | string | - | Optional helper text to display below the toggle |
| error | string | - | Error message to display (also sets the toggle to error state) |
| labelLeft | boolean | false | Whether to position the label on the left side |
| disabled | boolean | - | Whether the toggle is disabled |
| id | string | - | The ID for the toggle input (auto-generated if not provided) |
| className | string | - | Additional CSS class names |

The component also accepts all standard HTML input props except for `type`.

## Accessibility

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Space to toggle)
- Visually indicates focus state
- Error states are properly conveyed
- Color contrast meets WCAG AA standards

## Testing

The Toggle component is tested for:
- Rendering with and without a label
- Handling checked and unchecked states
- Controlled component behavior
- Different sizes and variants
- Disabled state
- Helper text and error message display
- Label positioning
- ID generation and customization