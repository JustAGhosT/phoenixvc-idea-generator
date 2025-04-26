# Button Component

A versatile button component that supports various styles, sizes, and states.

## Usage

```tsx
import { Button } from '@/components/ui/button/Button';

// Basic usage
<Button>Click me</Button>

// With variants and colors
<Button variant="outline" color="primary">Outline Button</Button>

// With icons
<Button leftIcon={<IconMail />}>Send Email</Button>

// Loading state
<Button loading loadingText="Saving...">Save</Button>
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
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `active` | `boolean` | `false` | Whether the button is in an active state |

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

## Accessibility

- When using icon-only buttons, always provide an `aria-label` for screen readers
- The button handles disabled and loading states appropriately for accessibility
- Focus states are clearly visible for keyboard navigation
- Loading state is communicated via `aria-busy` attribute

## Customization

The Button component uses both Tailwind classes and LESS modules for styling. You can customize the appearance by:

1. Modifying the LESS variables in `src/styles/variables.less`
2. Extending the Button.less file for component-specific styles
3. Passing additional classes via the `className` prop