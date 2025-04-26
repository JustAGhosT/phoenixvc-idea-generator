# Input Component

A versatile, accessible, and animated text input component that supports various styles, sizes, and states.

## Features

- **Multiple Sizes**: xs, sm, md, lg, xl
- **Various Shapes**: default, rounded, pill
- **State Handling**: error, success, disabled, loading
- **Icon Support**: left and right icons
- **Password Toggle**: show/hide password content
- **Clear Button**: one-click input clearing
- **Character Count**: with warning threshold
- **Floating Labels**: animated label positioning
- **Animations**: focus, error, success animations
- **Accessibility**: ARIA attributes, keyboard navigation
- **Dark Mode Support**: compatible with dark mode themes

## Installation

The Input component is part of our UI component library and doesn't require additional installation.

## Usage

```tsx
import { Input } from '@/components/ui/input';

// Basic usage
<Input 
  label="Username" 
  placeholder="Enter your username" 
/>

// With validation
<Input 
  label="Email" 
  type="email" 
  required
  hasError={!isValidEmail}
  errorMessage="Please enter a valid email address"
/>

// With icons
<Input 
  label="Search" 
  leftIcon={<SearchIcon />} 
  placeholder="Search..." 
/>

// Password input with toggle
<Input 
  label="Password" 
  type="password" 
  showPasswordToggle 
/>

// With floating label
<Input 
  label="Email" 
  floatingLabel 
  placeholder=" " 
/>

// With character count
<Input 
  label="Bio" 
  showCharacterCount 
  maxLength={200} 
  warningThreshold={80} 
/>

// With animations
<Input 
  label="Username" 
  animateFocus 
  showErrorAnimation 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label for the input |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input |
| `type` | `string` | `'text'` | HTML input type attribute |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | Change event handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `hasError` | `boolean` | `false` | Whether the input has an error |
| `errorMessage` | `string` | - | Error message to display |
| `helpText` | `string` | - | Help text to display below the input |
| `leftIcon` | `React.ReactNode` | - | Icon to display on the left side |
| `rightIcon` | `React.ReactNode` | - | Icon to display on the right side |
| `fullWidth` | `boolean` | `true` | Whether the input takes full width |
| `rounded` | `boolean` | `false` | Whether the input has rounded corners |
| `pill` | `boolean` | `false` | Whether the input has pill shape |
| `showClearButton` | `boolean` | `false` | Whether to show a clear button |
| `onClear` | `() => void` | - | Callback when clear button is clicked |
| `showPasswordToggle` | `boolean` | `false` | Whether to show password toggle |
| `loading` | `boolean` | `false` | Whether the input is in loading state |
| `floatingLabel` | `boolean` | `false` | Whether to use a floating label |
| `animateFocus` | `boolean` | `false` | Whether to animate focus ring |
| `showCharacterCount` | `boolean` | `false` | Whether to show character count |
| `maxLength` | `number` | - | Maximum character length |
| `warningThreshold` | `number` | - | % threshold for character count warning |
| `success` | `boolean` | `false` | Whether input has success state |
| `showErrorAnimation` | `boolean` | `false` | Whether to show error animation |
| `id` | `string` | auto-generated | ID for the input element |
| `className` | `string` | - | Additional CSS class |

## Accessibility

The Input component follows accessibility best practices:

- Uses semantic HTML elements
- Associates labels with inputs using `htmlFor`
- Provides appropriate ARIA attributes
- Supports keyboard navigation
- Respects reduced motion preferences
- Includes error state announcements

## Animation Features

The Input component includes several animation features:

1. **Focus Ring Animation**: Subtle animation when the input is focused
2. **Floating Label**: Label animates from placeholder to above the input
3. **Error Shake**: Visual feedback when validation fails
4. **Success Pulse**: Visual feedback for successful validation
5. **Character Count Warning**: Animated warning when approaching limits
6. **Icon Animations**: Smooth transitions for icons
7. **Clear Button Fade**: Fade in/out based on input value

## Component Structure

The Input component is organized into several parts for better maintainability:

- `Input.tsx`: Main component
- `Input.module.css`: Core styles
- `InputAnimations.module.css`: Animation styles
- `parts/`: Subcomponents
  - `InputLabel.tsx`: Label component
  - `InputIcon.tsx`: Icon component
  - `InputActionButton.tsx`: Action buttons (clear, password toggle)
  - `InputCharacterCount.tsx`: Character count component
  - `InputHelperText.tsx`: Help text component
  - `InputErrorText.tsx`: Error message component
  - `InputSpinner.tsx`: Loading spinner component

## Examples

### Form Example

```tsx
<form onSubmit={handleSubmit}>
  <Input 
    label="Full Name" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
    required 
  />
  
  <Input 
    label="Email" 
    type="email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    required 
  />
  
  <Input 
    label="Password" 
    type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    showPasswordToggle 
    required 
  />
  
  <button type="submit">Submit</button>
</form>
```

### Search Input

```tsx
<Input 
  label="Search" 
  leftIcon={<SearchIcon />} 
  placeholder="Search..." 
  value={searchQuery} 
  onChange={(e) => setSearchQuery(e.target.value)} 
  showClearButton 
  onClear={() => setSearchQuery('')} 
/>
```

### Character Limited Input

```tsx
<Input 
  label="Tweet" 
  placeholder="What's happening?" 
  value={tweet} 
  onChange={(e) => setTweet(e.target.value)} 
  showCharacterCount 
  maxLength={280} 
  warningThreshold={80} 
/>
```

## Performance Considerations

The Input component is optimized for performance:

- Uses CSS modules for style encapsulation
- Implements memoization for expensive operations
- Uses hardware-accelerated properties for animations
- Respects reduced motion preferences
- Separates animation logic from core functionality

## Browser Support

The Input component is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

The Input component can be customized through props and CSS variables:

```css
:root {
  --input-bg: white;
  --input-text: #111827;
  --input-border: #e5e7eb;
  --input-focus-border: #3b82f6;
  --input-focus-ring: rgba(59, 130, 246, 0.3);
  --input-error-border: #ef4444;
  --input-error-text: #ef4444;
  --input-success-border: #10b981;
  /* And more... */
}
```

## Testing

The Input component includes comprehensive tests:

- Unit tests for functionality
- Accessibility tests
- Visual regression tests through Storybook

## Related Components

- `Form`: Container for form elements
- `Select`: Dropdown selection component
- `Checkbox`: Checkbox input component
- `RadioGroup`: Radio button group component
- `TextArea`: Multi-line text input component