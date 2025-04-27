# Button Component

A versatile, accessible button component that supports various styles, sizes, states, and animations.

## Features

- **Multiple Variants**: primary, secondary, outline, ghost, link
- **Multiple Sizes**: xs, sm, md, lg, xl
- **Color Options**: primary, success, warning, danger, info, default
- **Icon Support**: left icon, right icon, icon-only buttons
- **Loading States**: with customizable loading text and spinner
- **Animations**: scale, lift, pulse, ripple effects
- **Shapes**: default, rounded, pill
- **Accessibility**: ARIA attributes, keyboard navigation
- **Dark Mode Support**: Compatible with dark mode themes
- **Reduced Motion Support**: Respects user motion preferences

## Installation

The Button component is part of our UI component library and doesn't require additional installation.

## Usage

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants and colors
<Button variant="outline" color="primary">Outline Button</Button>

// With icons
<Button leftIcon={<IconMail />}>Send Email</Button>

// Loading state
<Button loading loadingText="Saving...">Save</Button>

// With animations
<Button animation="scale" ripple>Animated Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant of the button |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether the button is in a loading state |
| `loadingText` | `string` | - | Text to display when in loading state |
| `showSpinner` | `boolean` | `true` | Whether to show a spinner when in loading state |
| `leftIcon` | `ReactNode` | - | Icon to display before the button text |
| `rightIcon` | `ReactNode` | - | Icon to display after the button text |
| `fullWidth` | `boolean` | `false` | Whether the button should take the full width of its container |
| `rounded` | `boolean` | `false` | Whether the button has a rounded appearance |
| `pill` | `boolean` | `false` | Whether the button has a pill appearance (fully rounded) |
| `iconButton` | `boolean` | `false` | Whether the button is an icon-only button |
| `active` | `boolean` | `false` | Whether the button is in an active state |
| `animation` | `'none' \| 'scale' \| 'lift' \| 'pulse'` | `'none'` | Animation effect to apply to the button |
| `ripple` | `boolean` | `true` | Whether to show ripple effect on click |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

The component also accepts all standard HTML button attributes.

## Examples

### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Button Colors

```tsx
<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
<Button color="info">Info</Button>
<Button color="default">Default</Button>
```

### Button with Icons

```tsx
<Button leftIcon={<IconMail />}>With Left Icon</Button>
<Button rightIcon={<IconArrowRight />}>With Right Icon</Button>
<Button leftIcon={<IconMail />} rightIcon={<IconArrowRight />}>With Both Icons</Button>
```

### Icon-only Button

```tsx
<Button iconButton aria-label="Send email">
  <IconMail />
</Button>
```

### Loading State

```tsx
<Button loading>Loading</Button>
<Button loading loadingText="Saving...">Save</Button>
<Button loading loadingText="Sending..." leftIcon={<IconMail />}>Send</Button>
```

### Full Width Button

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Rounded and Pill Buttons

```tsx
<Button rounded>Rounded Button</Button>
<Button pill>Pill Button</Button>
```

### Button Animations

```tsx
<Button animation="scale">Scale on Hover</Button>
<Button animation="lift">Lift on Hover</Button>
<Button animation="pulse">Pulse Animation</Button>
<Button ripple={false}>No Ripple Effect</Button>
```

## Animation Features

The Button component supports several animations that enhance the user experience:

### Scale Animation

The button scales slightly when hovered, providing visual feedback.

```tsx
<Button animation="scale">Scale on Hover</Button>
```

### Lift Animation

The button lifts up slightly and shows a shadow when hovered, creating a 3D effect.

```tsx
<Button animation="lift">Lift on Hover</Button>
```

### Pulse Animation

The button shows a pulsing effect, useful for drawing attention to important actions.

```tsx
<Button animation="pulse">Pulse Animation</Button>
```

### Ripple Effect

When clicked, the button shows a ripple effect emanating from the click point.

```tsx
<Button ripple>With Ripple Effect</Button>
```

### Loading Animation

When in loading state, the button shows a spinner and optional shimmer effect.

```tsx
<Button loading loadingText="Processing...">Submit</Button>
```

## Accessibility

- When using icon-only buttons, always provide an `aria-label` for screen readers
- The button handles disabled and loading states appropriately for accessibility
- Focus states are clearly visible for keyboard navigation
- Loading state is communicated via `aria-busy` attribute
- Animations respect the user's reduced motion preferences

## Reduced Motion Support

The component respects the user's preference for reduced motion by:

1. Detecting the `prefers-reduced-motion` media query
2. Disabling animations when reduced motion is preferred
3. Providing alternative, non-animated styles

```tsx
// All animations will be disabled if the user has enabled reduced motion in their system preferences
<Button animation="scale" ripple>Respects Reduced Motion</Button>
```

## Dark Mode Support

The Button component automatically adapts to dark mode when the parent application uses the `data-theme="dark"` attribute on the `:root` element.

## Customization

The Button component can be customized through CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-secondary: #64748b;
  --color-secondary-dark: #475569;
  --color-success: #10b981;
  --color-success-dark: #059669;
  --color-warning: #f59e0b;
  --color-warning-dark: #d97706;
  --color-danger: #ef4444;
  --color-danger-dark: #dc2626;
  --color-info: #3b82f6;
  --color-info-dark: #2563eb;
  
  /* RGB versions for opacity */
  --button-color-rgb: 59, 130, 246;
  
  /* Border radius */
  --radius: 0.25rem;
  --radius-md: 0.375rem;
  --radius-full: 9999px;
  
  /* Focus ring */
  --focus-ring: rgba(59, 130, 246, 0.5);
  
  /* Dark mode colors */
  --color-border-dark: #334155;
  --color-text-dark: #f8fafc;
}
```

## Best Practices

1. **Use semantic buttons**: Use `<button>` elements for actions and `<a>` elements for navigation
2. **Provide clear labels**: Button text should clearly indicate what will happen when clicked
3. **Use appropriate variants**: Use primary for main actions, secondary for alternative actions, etc.
4. **Add aria-labels to icon buttons**: Always provide an `aria-label` for icon-only buttons
5. **Indicate loading states**: Use the loading state to indicate when an action is being processed
6. **Maintain consistency**: Use consistent button styles throughout your application

## Related Components

- `IconButton`: A simplified button specifically designed for icon-only use cases
- `LinkButton`: A button that looks like a link but behaves like a button
- `ButtonGroup`: A group of related buttons with consistent styling
- `DropdownButton`: A button that opens a dropdown menu