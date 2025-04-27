# Checkbox Component

A customizable, accessible checkbox component that supports various styles, states, animations, and features.

## Features

- **Multiple Sizes**: sm, md, lg
- **Multiple Variants**: default, primary, secondary
- **Indeterminate State**: Support for "select all" functionality
- **Animations**: Check, error, success, hover, and focus animations
- **Accessibility**: ARIA attributes, keyboard navigation
- **Customization**: Helper text, error messages, custom labels
- **Dark Mode Support**: Compatible with dark mode themes
- **Reduced Motion Support**: Respects user motion preferences

## Installation

The Checkbox component is part of our UI component library and doesn't require additional installation.

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

// With animations
<Checkbox 
  label="Animated checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  animate={true}
  showHoverAnimation={true}
  showFocusAnimation={true}
/>

// With indeterminate state (useful for "select all" checkboxes)
<Checkbox 
  label="Select all"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
  animate={true}
/>

// With helper text
<Checkbox 
  label="Subscribe to newsletter"
  helperText="We'll send you updates about our product"
/>

// With error message and animation
<Checkbox 
  label="Accept terms"
  error="You must accept the terms to continue"
  showErrorAnimation={true}
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

// With custom label content
<Checkbox 
  label={
    <span className="flex items-center">
      Accept terms
      <span className="ml-1 px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
        Required
      </span>
    </span>
  } 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | - | The label for the checkbox |
| `checked` | `boolean` | - | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in an indeterminate state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the checkbox |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | The visual style variant |
| `helperText` | `React.ReactNode` | - | Optional helper text to display below the checkbox |
| `error` | `string` | - | Error message to display (also sets the checkbox to error state) |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `animate` | `boolean` | `true` | Whether to animate the checkbox state changes |
| `showErrorAnimation` | `boolean` | `false` | Whether to show error animation when error state changes |
| `showSuccessAnimation` | `boolean` | `false` | Whether to show a success animation when checked |
| `showHoverAnimation` | `boolean` | `false` | Whether to show a hover animation |
| `showFocusAnimation` | `boolean` | `false` | Whether to show a focus ring animation |
| `id` | `string` | auto-generated | The ID for the checkbox input |
| `className` | `string` | - | Additional CSS class for the container |
| `inputClassName` | `string` | - | Additional CSS class for the checkbox input |
| `labelClassName` | `string` | - | Additional CSS class for the label |

The component also accepts all standard HTML input props except for `type`.

## Animation Features

The Checkbox component supports several animations that enhance the user experience:

### Check Animation

The check mark animates when the checkbox is checked, providing visual feedback to the user.

```tsx
<Checkbox 
  label="Animated checkbox" 
  animate={true} 
/>
```

### Error Animation

The checkbox and error message can shake when an error occurs, drawing attention to the error.

```tsx
<Checkbox 
  label="Accept terms" 
  error="You must accept the terms" 
  showErrorAnimation={true} 
/>
```

### Success Animation

The checkbox can display a success animation when checked, providing positive feedback.

```tsx
<Checkbox 
  label="Task completed" 
  checked={isChecked}
  onChange={handleChange}
  showSuccessAnimation={true} 
/>
```

### Hover Animation

The checkbox can scale slightly when hovered, providing interactive feedback.

```tsx
<Checkbox 
  label="Interactive checkbox" 
  showHoverAnimation={true} 
/>
```

### Focus Animation

The checkbox can display a pulsing focus ring when focused, improving accessibility and usability.

```tsx
<Checkbox 
  label="Accessible checkbox" 
  showFocusAnimation={true} 
/>
```

## Accessibility

The Checkbox component follows accessibility best practices:

- Uses semantic HTML with proper label association
- Supports keyboard navigation (Tab to focus, Space to toggle)
- Implements proper ARIA attributes (`aria-checked`, `aria-invalid`, etc.)
- Associates helper text and error messages with the checkbox using `aria-describedby`
- Respects user preferences for reduced motion
- Meets WCAG color contrast requirements
- Works with screen readers

## Reduced Motion Support

The component respects the user's preference for reduced motion by:

1. Using the `useReducedMotion` hook to detect the preference
2. Disabling animations when reduced motion is preferred
3. Providing alternative, non-animated styles

```tsx
// All animations will be disabled if the user has enabled reduced motion in their system preferences
<Checkbox 
  label="Respects reduced motion" 
  animate={true}
  showHoverAnimation={true}
  showFocusAnimation={true}
/>
```

## Indeterminate State

The indeterminate state is useful for "select all" checkboxes in lists:

```tsx
const [checkedItems, setCheckedItems] = useState({
  option1: false,
  option2: false,
  option3: false,
});

const allChecked = Object.values(checkedItems).every(Boolean);
const someChecked = Object.values(checkedItems).some(Boolean) && !allChecked;

return (
  <>
    <Checkbox 
      label="Select all" 
      checked={allChecked} 
      indeterminate={someChecked} 
      onChange={handleParentChange} 
      animate={true}
    />
    <div className="ml-6">
      <Checkbox 
        label="Option 1" 
        checked={checkedItems.option1} 
        onChange={() => handleChildChange('option1')} 
        animate={true}
      />
      {/* More options... */}
    </div>
  </>
);
```

## Dark Mode Support

The Checkbox component automatically adapts to dark mode when the parent application uses the `data-theme="dark"` attribute on the `:root` element.

## Form Integration

The Checkbox component works seamlessly with form libraries and native HTML forms:

```tsx
// With React Hook Form
import { useForm } from 'react-hook-form';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox 
        label="Accept terms" 
        error={errors.acceptTerms?.message}
        showErrorAnimation={true}
        {...register('acceptTerms', { required: 'You must accept the terms' })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Customization

The Checkbox component can be customized through props and CSS variables:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --color-success: #10b981;
  --color-success-dark: #059669;
  --color-error: #ef4444;
  --color-error-light: #fef2f2;
  --input-bg: white;
  --input-border: #e5e7eb;
  --input-disabled-bg: #f3f4f6;
  --input-disabled-border: #d1d5db;
  --text-disabled: #9ca3af;
  --input-focus-ring: rgba(59, 130, 246, 0.3);
  /* Dark mode variables */
  --input-bg-dark: #1f2937;
  --input-border-dark: #4b5563;
  --input-disabled-bg-dark: #374151;
  --input-disabled-border-dark: #4b5563;
  --text-disabled-dark: #6b7280;
}
```

## Testing

The Checkbox component includes comprehensive tests:

- Unit tests for functionality
- Accessibility tests using jest-axe
- Visual regression tests through Storybook
- Keyboard interaction tests

## Related Components

- `Radio`: Radio button component
- `Switch`: Toggle switch component
- `FormControl`: Form control wrapper component
- `FormGroup`: Group related form controls