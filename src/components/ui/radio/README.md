# Radio Component

A customizable radio button component for selecting a single option from a set of choices.

## Features

- Multiple sizes: sm, md, lg
- Multiple variants: default, primary, secondary
- Helper text and error message display
- Accessible with keyboard navigation
- Customizable styling

## Usage

```tsx
import { Radio } from '@/components/ui/radio';

// Basic usage
<Radio name="option" value="option1" label="Option 1" />
<Radio name="option" value="option2" label="Option 2" />

// Controlled radio buttons
<Radio 
  name="color"
  value="red"
  label="Red"
  checked={selectedColor === 'red'}
  onChange={(e) => setSelectedColor(e.target.value)}
/>
<Radio 
  name="color"
  value="blue"
  label="Blue"
  checked={selectedColor === 'blue'}
  onChange={(e) => setSelectedColor(e.target.value)}
/>

// With helper text
<Radio 
  name="plan"
  value="premium"
  label="Premium Plan"
  helperText="Includes all features and priority support"
/>

// With error message
<Radio 
  name="agreement"
  value="agree"
  label="I agree to the terms"
  error="You must agree to continue"
/>

// Different sizes
<Radio name="size" value="small" label="Small radio" size="sm" />
<Radio name="size" value="medium" label="Medium radio" size="md" />
<Radio name="size" value="large" label="Large radio" size="lg" />

// Different variants
<Radio name="variant" value="default" label="Default variant" variant="default" />
<Radio name="variant" value="primary" label="Primary variant" variant="primary" />
<Radio name="variant" value="secondary" label="Secondary variant" variant="secondary" />

// Disabled state
<Radio name="disabled" value="disabled" label="Disabled radio" disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | The text label for the radio button |
| checked | boolean | - | Whether the radio button is checked |
| name | string | - | The name attribute for the radio button (required for proper grouping) |
| value | string | - | The value attribute for the radio button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the radio button |
| variant | 'default' \| 'primary' \| 'secondary' | 'default' | The visual style variant |
| helperText | string | - | Optional helper text to display below the radio button |
| error | string | - | Error message to display (also sets the radio button to error state) |
| disabled | boolean | - | Whether the radio button is disabled |
| id | string | - | The ID for the radio input (auto-generated if not provided) |
| className | string | - | Additional CSS class names |

The component also accepts all standard HTML input props except for `type`.

## Accessibility

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Space to select)
- Visually indicates focus state
- Error states are properly conveyed
- Color contrast meets WCAG AA standards

## Testing

The Radio component is tested for:
- Rendering with and without a label
- Handling checked and unchecked states
- Controlled component behavior
- Different sizes and variants
- Disabled state
- Helper text and error message display
- ID generation and customization