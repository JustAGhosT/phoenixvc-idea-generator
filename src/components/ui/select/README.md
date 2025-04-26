# Select Component

A customizable select dropdown component for selecting a single option from a list.

## Features

- Multiple sizes: sm, md, lg
- Multiple variants: default, outline, filled
- Helper text and error message display
- Placeholder support
- Full width option
- Accessible with keyboard navigation
- Customizable styling

## Usage

```tsx
import { Select } from '@/components/ui/select';

// Basic usage
<Select 
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
/>

// Controlled select
<Select 
  label="Country"
  value={selectedCountry}
  onChange={(e) => setSelectedCountry(e.target.value)}
  options={countries}
  placeholder="Select a country"
/>

// With helper text
<Select 
  label="Language"
  options={languages}
  helperText="Choose your preferred language"
/>

// With error message
<Select 
  label="Payment Method"
  options={paymentMethods}
  error="Please select a payment method"
/>

// Different sizes
<Select options={options} size="sm" label="Small select" />
<Select options={options} size="md" label="Medium select" />
<Select options={options} size="lg" label="Large select" />

// Different variants
<Select options={options} variant="default" label="Default variant" />
<Select options={options} variant="outline" label="Outline variant" />
<Select options={options} variant="filled" label="Filled variant" />

// Full width
<Select options={options} fullWidth label="Full width select" />

// Disabled state
<Select options={options} disabled label="Disabled select" />

// With disabled options
<Select 
  label="Subscription"
  options={[
    { value: 'basic', label: 'Basic' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise', disabled: true }
  ]}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | SelectOption[] | required | Array of options to display in the select |
| label | string | - | The text label for the select |
| value | string | - | The current value of the select |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the select |
| variant | 'default' \| 'outline' \| 'filled' | 'default' | The visual style variant |
| helperText | string | - | Optional helper text to display below the select |
| error | string | - | Error message to display (also sets the select to error state) |
| placeholder | string | - | Placeholder text to display when no option is selected |
| fullWidth | boolean | false | Whether the select should take up the full width of its container |
| disabled | boolean | - | Whether the select is disabled |
| id | string | - | The ID for the select element (auto-generated if not provided) |
| className | string | - | Additional CSS class names |

### SelectOption Type

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | required | The value of the option |
| label | string | required | The display text for the option |
| disabled | boolean | false | Whether the option is disabled |

The component also accepts all standard HTML select props except for `size`.

## Accessibility

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Arrow keys to navigate options, Enter to select)
- Visually indicates focus state
- Error states are properly conveyed
- Color contrast meets WCAG AA standards

## Testing

The Select component is tested for:
- Rendering with options and labels
- Handling value changes
- Controlled component behavior
- Different sizes and variants
- Disabled state
- Helper text and error message display
- Placeholder display
- Full width styling
- ID generation and customization