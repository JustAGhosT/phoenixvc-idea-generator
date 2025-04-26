# Card Component

A flexible card component for containing content with various styling options.

## Features

- Multiple variants: default, outline, elevated
- Adjustable padding: none, sm, md, lg
- Optional full width mode
- Compound component pattern with Header, Content, and Footer

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
    <h3>Card Title</h3>
    <button>Action</button>
  </Card.Header>
  <Card.Content>
    <p>This is the main content of the card.</p>
  </Card.Content>
  <Card.Footer>
    <button>Cancel</button>
    <button>Submit</button>
  </Card.Footer>
</Card>
```

## Props

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'outline' \| 'elevated' | 'default' | Card styling variant |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | Amount of padding inside the card |
| fullWidth | boolean | false | Whether the card should take full width |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Card content |

### Card.Header, Card.Content, Card.Footer

These compound components accept standard HTML div attributes.

## Accessibility

- The Card component uses semantic HTML
- All interactive elements should be properly labeled
- Color contrast meets WCAG AA standards

## Testing

The Card component is tested for:
- Correct rendering of children
- Proper application of variant and padding classes
- Proper functioning of compound components
- Accessibility compliance