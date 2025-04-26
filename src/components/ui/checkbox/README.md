# Checkbox Component

A customizable checkbox component for boolean input with various styling options.

## Features

- Multiple sizes: sm, md, lg
- Multiple variants: default, primary, secondary
- Support for indeterminate state
- Helper text and error message display
- Accessible with keyboard navigation
- Customizable styling

## Usage

```tsx
import { Checkbox } from '@/components/ui/checkbox';

// Basic usage
<Checkbox label="Accept terms" />

// Controlled checkbox
<Checkbox 
  label="Remember me"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// With indeterminate state (useful for "select all" checkboxes)
<Checkbox 
  label="Select all"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>

// With helper text
<Checkbox 
  label="Subscribe to newsletter"
  helperText="We'll send you updates about our product"
/>

// With error message
<Checkbox 
  label="Accept terms"
  error="You must accept the terms to continue"
/>

// Different sizes
<Checkbox label="Small checkbox" size="sm" />
<Checkbox label="Medium checkbox" size="md" />
<Checkbox label="Large checkbox" size="lg" />

// Different variants
<Checkbox label="Default variant" variant="default" />
<Checkbox label="Primary variant" variant="primary" />
<Checkbox label="Secondary variant" variant="secondary" />

// Disabled state
<Checkbox label="Disabled checkbox" disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | The text label for the checkbox |
| checked | boolean | - | Whether the checkbox is checked |
| indeterminate | boolean | - | Whether the checkbox is in an indeterminate state |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the checkbox |
| variant | 'default' \| 'primary' \| 'secondary' | 'default' | The visual style variant |
| helperText | string | - | Optional helper text to display below the checkbox |
| error | string | - | Error message to display (also sets the checkbox to error state) |
| disabled | boolean | - | Whether the checkbox is disabled |
| id | string | - | The ID for the checkbox input (auto-generated if not provided) |
| className | string | - | Additional CSS class names |

The component also accepts all standard HTML input props except for `type`.

## Accessibility

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Space to toggle)
- Visually indicates focus state
- Error states are properly conveyed
- Color contrast meets WCAG AA standards

## Testing

The Checkbox component is tested for:
- Rendering with and without a label
- Handling checked and unchecked states
- Controlled component behavior
- Different sizes and variants
- Disabled state
- Helper text and error message display
- Indeterminate state
- ID generation and customization