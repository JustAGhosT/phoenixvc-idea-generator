# Badge Component

A lightweight, versatile badge component for displaying status, counts, or short pieces of information.

## Features

- **Multiple Variants**: default, primary, secondary, success, warning, danger, info
- **Multiple Sizes**: sm, md, lg
- **Style Options**: filled, outline, soft (subtle)
- **Shape Options**: default, rounded (pill)
- **Dot Indicator**: Optional status dot
- **Icon Support**: left icon, right icon
- **Animations**: pulse, glow, bounce, fade-in
- **Hover Effects**: scale, lift
- **Interactive Mode**: Clickable badges
- **Accessibility**: ARIA attributes, proper contrast
- **Dark Mode Support**: Compatible with dark mode themes
- **Reduced Motion Support**: Respects user motion preferences

## Installation

The Badge component is part of our UI component library and doesn't require additional installation.

## Usage

```tsx
import { Badge } from '@/components/ui/badge';

// Basic usage
<Badge>Default</Badge>

// Different variants
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Error</Badge>

// Style variants
<Badge outline variant="primary">Outline</Badge>
<Badge soft variant="success">Soft</Badge>

// With dot indicator
<Badge withDot variant="success">Online</Badge>

// With icons
<Badge leftIcon={<CheckIcon />}>Completed</Badge>

// With animations
<Badge animation="pulse" variant="primary">New</Badge>

// Interactive badge
<Badge interactive onClick={handleClick}>Click me</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Visual style variant of the badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the badge |
| `rounded` | `boolean` | `false` | Whether the badge should be fully rounded (pill shape) |
| `outline` | `boolean` | `false` | Whether the badge should have an outline style instead of a filled background |
| `soft` | `boolean` | `false` | Whether the badge should have a soft/subtle appearance |
| `withDot` | `boolean` | `false` | Whether to show a dot indicator |
| `leftIcon` | `ReactNode` | - | Icon to display before the badge text |
| `rightIcon` | `ReactNode` | - | Icon to display after the badge text |
| `interactive` | `boolean` | `false` | Whether the badge is interactive (clickable) |
| `animation` | `'none' \| 'pulse' \| 'glow' \| 'bounce' \| 'fadeIn'` | `'none'` | Animation effect to apply to the badge |
| `hoverEffect` | `'none' \| 'scale' \| 'lift'` | `'none'` | Whether to apply a hover effect |

The component also accepts all standard HTML span attributes.

## Examples

### Badge Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

### Badge Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Style Variants

```tsx
// Default (filled)
<Badge variant="primary">Primary</Badge>

// Outline
<Badge outline variant="primary">Primary Outline</Badge>

// Soft/Subtle
<Badge soft variant="primary">Primary Soft</Badge>
```

### Rounded (Pill) Badges

```tsx
<Badge rounded>42</Badge>
<Badge rounded variant="primary">New</Badge>
```

### Badges with Dot Indicators

```tsx
<Badge withDot variant="success">Online</Badge>
<Badge withDot variant="warning">Away</Badge>
<Badge withDot variant="danger">Offline</Badge>
```

### Badges with Icons

```tsx
<Badge leftIcon={<CheckIcon />}>Completed</Badge>
<Badge rightIcon={<ArrowRightIcon />}>Next</Badge>
<Badge leftIcon={<MailIcon />} rightIcon={<ArrowRightIcon />}>Messages</Badge>
```

### Interactive Badges

```tsx
<Badge interactive onClick={() => alert('Clicked!')}>Click me</Badge>
<Badge 
  interactive 
  variant="primary" 
  onClick={handleClick}
>
  Interactive Badge
</Badge>
```

### Badge Animations

```tsx
<Badge animation="pulse" variant="primary">Pulse</Badge>
<Badge animation="glow" variant="success">Glow</Badge>
<Badge animation="bounce" variant="warning">Bounce</Badge>
<Badge animation="fadeIn" variant="danger">Fade In</Badge>
```

### Hover Effects

```tsx
<Badge hoverEffect="scale" variant="primary">Scale on Hover</Badge>
<Badge hoverEffect="lift" variant="success">Lift on Hover</Badge>
```

### Combined Features

```tsx
<Badge 
  variant="success" 
  rounded 
  leftIcon={<CheckIcon />}
  animation="pulse"
>
  Task Complete
</Badge>

<Badge 
  variant="primary" 
  outline 
  withDot 
  hoverEffect="scale"
  interactive
  onClick={handleClick}
>
  Interactive
</Badge>
```

## Animation Features

The Badge component supports several animations that enhance the user experience:

### Pulse Animation

The badge fades in and out, useful for drawing attention to status indicators.

```tsx
<Badge animation="pulse" variant="primary">Pulse</Badge>
```

### Glow Animation

The badge shows a pulsing glow effect, useful for highlighting important information.

```tsx
<Badge animation="glow" variant="success">Glow</Badge>
```

### Bounce Animation

The badge bounces up and down slightly, useful for notifications or alerts.

```tsx
<Badge animation="bounce" variant="warning">Bounce</Badge>
```

### Fade In Animation

The badge fades in when it appears, useful for badges that appear dynamically.

```tsx
<Badge animation="fadeIn" variant="danger">Fade In</Badge>
```

## Accessibility

The Badge component follows accessibility best practices:

- Uses appropriate color contrast ratios for all variants
- Provides visual cues beyond just color (outline, icons, etc.)
- Respects user preferences for reduced motion
- When used interactively, includes proper focus states and keyboard navigation

For interactive badges, ensure you provide appropriate ARIA attributes if needed:

```tsx
<Badge 
  interactive 
  onClick={handleClick}
  role="button"
  aria-label="Mark as complete"
>
  Complete
</Badge>
```

## Reduced Motion Support

The component respects the user's preference for reduced motion by:

1. Detecting the `prefers-reduced-motion` media query
2. Disabling animations when reduced motion is preferred
3. Providing alternative, non-animated styles

```tsx
// All animations will be disabled if the user has enabled reduced motion in their system preferences
<Badge animation="pulse" hoverEffect="scale">Respects Reduced Motion</Badge>
```

## Dark Mode Support

The Badge component automatically adapts to dark mode when the parent application uses the `data-theme="dark"` attribute on the `:root` element.

## Customization

The Badge component can be customized through CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  
  /* RGB versions for opacity */
  --badge-color-rgb: 59, 130, 246;
  
  /* Border radius */
  --radius: 0.25rem;
  --radius-full: 9999px;
  
  /* Dark mode colors */
  --color-gray-100: #f1f5f9;
  --color-gray-300: #cbd5e1;
  --color-gray-600: #475569;
}
```

## Best Practices

1. **Use badges sparingly**: Too many badges can create visual noise
2. **Choose appropriate variants**: Use color variants that match their meaning (e.g., success for positive states)
3. **Keep content short**: Badges are designed for short text (1-2 words or numbers)
4. **Ensure sufficient contrast**: Make sure badge text has sufficient contrast with its background
5. **Add context**: Don't rely solely on badges to convey critical information

## Related Components

- `Tag`: Similar to Badge but designed for filtering and selection
- `Chip`: Similar to Badge but with delete/close functionality
- `Status`: Specialized component for showing system or user status
- `Counter`: Specialized component for showing numeric values