# Badge Component

A lightweight component for displaying status, counts, or short pieces of information.

## Features

- Multiple variants: default, primary, secondary, success, warning, danger, info
- Multiple sizes: sm, md, lg
- Rounded option for pill-shaped badges
- Outline style for a more subtle appearance
- Customizable styling

## Usage

```tsx
import { Badge } from '@/components/ui/badge';

// Basic usage
<Badge>Default</Badge>

// Different variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Info</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Rounded badges (pill shape)
<Badge rounded>42</Badge>
<Badge rounded variant="primary">New</Badge>

// Outline style
<Badge outline>Default Outline</Badge>
<Badge outline variant="primary">Primary Outline</Badge>
<Badge outline variant="success">Success Outline</Badge>

// Combined options
<Badge variant="warning" size="lg" rounded>Coming Soon</Badge>
<Badge variant="danger" outline rounded>Deprecated</Badge>

// With icons
<Badge variant="success">
  <CheckIcon className="mr-1" />
  Completed
</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | The content to display inside the badge |
| variant | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'default' | The visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the badge |
| rounded | boolean | false | Whether the badge should have fully rounded corners (pill shape) |
| outline | boolean | false | Whether the badge should have an outline style instead of a filled background |
| className | string | - | Additional CSS class names |

The component also accepts all standard HTML span attributes.

## Accessibility

- Use badges to provide additional context, not as the sole means of conveying important information
- Ensure sufficient color contrast between badge text and background
- When using badges to convey status, consider adding an aria-label for screen readers

## Testing

The Badge component is tested for:
- Rendering children correctly
- Applying different variants
- Applying different sizes
- Handling rounded and outline styles
- Combining multiple style props
- Passing additional HTML attributes