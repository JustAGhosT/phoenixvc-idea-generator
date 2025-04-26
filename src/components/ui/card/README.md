# Card Component

A flexible card component for containing content with various styling options.

## Features

- Multiple variants: default, outline, elevated, filled, gradient, ghost
- Adjustable padding: none, sm, md, lg
- Optional full width mode
- Interactive mode with hover, active, and focus states
- Dark theme support
- Compound component pattern with Header, Content, and Footer

## Directory Structure

```
src/components/ui/card/
├── index.ts                  # Main exports
├── Card.tsx                  # Main component
├── Card.module.css           # CSS Module styles
├── README.md                 # Documentation
├── parts/                    # Subcomponents
│   ├── CardContent.tsx
│   ├── CardDescription.tsx
│   ├── CardFooter.tsx
│   ├── CardHeader.tsx
│   └── CardTitle.tsx
└── __tests__/                # Test and story files
    ├── Card.test.tsx
    ├── CardHeader.test.tsx
    ├── CardTitle.test.tsx
    └── Card.stories.tsx
```

## Usage

```tsx
import { Card } from '@/components/ui/card';

// Basic usage
<Card>
  <p>Simple card with default styling</p>
</Card>

// With variants and padding
<Card variant="outline" padding="lg">
  <p>Outlined card with large padding</p>
</Card>

// Using compound components
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Supporting information</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>This is the main content of the card.</p>
  </Card.Content>
  <Card.Footer>
    <button>Cancel</button>
    <button>Submit</button>
  </Card.Footer>
</Card>

// Interactive card
<Card variant="default" interactive>
  <Card.Header>
    <Card.Title>Interactive Card</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>This card has hover and focus states</p>
  </Card.Content>
</Card>
```

## Props

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'outline' \| 'elevated' \| 'filled' \| 'gradient' \| 'ghost' | 'default' | Card styling variant |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | Amount of padding inside the card |
| interactive | boolean | false | Makes the card interactive with hover/focus effects |
| fullWidth | boolean | false | Whether the card should take full width |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Card content |

### Card.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| withActions | boolean | false | Aligns content in a row with space-between |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Header content |

### Card.Title

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' | 'h3' | HTML heading level |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Title content |

### Card.Description, Card.Content, Card.Footer

These compound components accept standard HTML div/p attributes.

## Styling

The Card component uses CSS Modules with CSS variables for theming:

- Light theme variables with fallbacks
- Dark theme support via data-theme="dark" on the :root element
- Responsive design patterns
- Interactive states (hover, active, focus)

### CSS Variables

The component uses the following CSS variables with fallbacks:

```css
--card-bg: #ffffff
--border: #e2e8f0
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--card-filled-bg: #f7fafc
--card-gradient: linear-gradient(135deg, #f6d365 0%, #fda085 100%)
--focus-ring: #3182ce
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xs: 0.25rem
--font-size-lg: 1.125rem
--font-size-sm: 0.875rem
--text-muted: #64748b

/* Dark theme variables */
--card-bg-dark: #1a202c
--border-dark: #2d3748
--card-filled-bg-dark: #2d3748
--card-gradient-dark: linear-gradient(to right, #1a202c, #2d3748)
--card-gradient-text-dark: #e2e8f0
--text-muted-dark: #a0aec0
```

## Accessibility

- The Card component uses semantic HTML
- All interactive elements should be properly labeled
- Color contrast meets WCAG AA standards
- Focus states are clearly visible
- Keyboard navigation is supported for interactive cards

## Testing

The Card component is tested for:
- Correct rendering of children
- Proper application of variant and padding classes
- Proper functioning of compound components
- Accessibility compliance
- Interactive states