# Switch Component

A customizable switch component for boolean input with a modern switch appearance.

## Features

- Multiple sizes: sm, md, lg
- Multiple variants: primary, secondary, success, danger
- Helper text and error message display
- Label positioning (left or right)
- Accessible with keyboard navigation
- Customizable styling

## Usage

```tsx
import { Switch } from '@/components/ui/switch';

// Basic usage
<Switch label="Dark mode" />

// Controlled switch
<Switch 
  label="Notifications"
  checked={notificationsEnabled}
  onChange={(e) => setNotificationsEnabled(e.target.checked)}
/>

// With helper text
<Switch 
  label="Auto-save"
  helperText="Automatically save your work every 5 minutes"
/>

// With error message
<Switch 
  label="Accept terms"
  error="You must accept the terms to continue"
/>

// Different sizes
<Switch label="Small switch" size="sm" />
<Switch label="Medium switch" size="md" />
<Switch label="Large switch" size="lg" />

// Different variants
<Switch label="Primary variant" variant="primary" />
<Switch label="Secondary variant" variant="secondary" />
<Switch label="Success variant" variant="success" />
<Switch label="Danger variant" variant="danger" />

// Label on the left
<Switch label="Label on the left" labelLeft />

// Disabled state
<Switch label="Disabled switch" disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | The text label for the switch |
| checked | boolean | - | Whether the switch is checked |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the switch |
| variant | 'primary' \| 'secondary' \| 'success' \| 'danger' | 'primary' | The visual style variant |
| helperText | string | - | Optional helper text to display below the switch |
| error | string | - | Error message to display (also sets the switch to error state) |
| labelLeft | boolean | false | Whether to position the label on the left side |
| disabled | boolean | - | Whether the switch is disabled |
| id | string | - | The ID for the switch input (auto-generated if not provided) |
| className | string | - | Additional CSS class names |

The component also accepts all standard HTML input props except for `type`.

## Accessibility

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Space to toggle)
- Visually indicates focus state
- Error states are properly conveyed
- Color contrast meets WCAG AA standards

## Testing

The Switch component is tested for:
- Rendering with and without a label
- Handling checked and unchecked states
- Controlled component behavior
- Different sizes and variants
- Disabled state
- Helper text and error message display
- Label positioning
- ID generation and customization