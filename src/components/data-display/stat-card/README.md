# StatCard Component

The StatCard component is used to display statistics and metrics with support for trends, icons, and various visual styles.

## Features

- Display title, value, and optional description
- Support for icons (both string identifiers and React nodes)
- Trend indicators with directional arrows and semantic coloring
- Multiple color variants
- Loading state with skeleton animation
- Compact layout option
- Interactive cards with onClick handler
- Tooltip support
- Accessibility features
- Value formatting options
- Animation effects
- Semantic HTML structure
- Customizable heading levels

## Usage

### Basic Usage

```tsx
import { StatCard } from '@/components/data-display/stat-card';

<StatCard 
  title="Total Users" 
  value={1234} 
  description="Active users this month" 
/>
```

### With Icon

```tsx
<StatCard 
  title="Total Ideas" 
  value={42} 
  description="Ideas in your portfolio" 
  icon="lightbulb"
  variant="primary"
/>
```

### With Custom Icon

```tsx
import { Zap } from 'lucide-react';

<StatCard 
  title="Energy Usage" 
  value="87 kWh" 
  description="Average daily consumption" 
  icon={<Zap className="h-5 w-5 text-yellow-500" />}
/>
```

### With Trend

```tsx
<StatCard 
  title="Revenue" 
  value="$8,492" 
  description="Monthly revenue" 
  icon="trending"
  variant="success"
  trend={{
    value: 12.5,
    label: "vs last month",
    direction: "up",
    isGood: true
  }}
/>
```

### With Negative Trend

```tsx
<StatCard 
  title="Bounce Rate" 
  value="24.8%" 
  description="User bounce rate" 
  icon="activity"
  variant="danger"
  trend={{
    value: 3.2,
    label: "vs last month",
    direction: "up",
    isGood: false
  }}
/>
```

### Loading State

```tsx
<StatCard 
  title="Loading Data" 
  value="--" 
  description="Data is loading..." 
  loading={true}
/>
```

### Compact Version

```tsx
<StatCard 
  title="New Users" 
  value={24} 
  description="Signed up today" 
  icon="users"
  compact={true}
  variant="primary"
/>
```

### Interactive Card

```tsx
<StatCard 
  title="Clickable Card" 
  value={42} 
  description="Click for details" 
  onClick={() => alert('Card clicked!')}
  variant="info"
/>
```

### With Tooltip

```tsx
<StatCard 
  title="Critical Issues" 
  value={3} 
  description="Issues requiring attention" 
  icon="alert-circle"
  variant="danger"
  tooltipContent="These issues require immediate attention"
/>
```

### With Custom Formatter

```tsx
<StatCard 
  title="Revenue" 
  value={1234567} 
  description="Annual revenue" 
  formatter={(value) => `$${Number(value).toLocaleString()}`}
  variant="success"
/>
```

### With Prefix and Suffix

```tsx
<StatCard 
  title="Completion Rate" 
  value={85} 
  valuePrefix="" 
  valueSuffix="%" 
  description="Tasks completed" 
  variant="success"
/>
```

### With Animation

```tsx
<StatCard 
  title="New Feature" 
  value={42} 
  description="Just launched" 
  animation="fadeIn"
  variant="primary"
/>

<StatCard 
  title="Attention" 
  value={7} 
  description="Critical issues" 
  animation="pulse"
  variant="danger"
/>
```

### With Custom Heading Level

```tsx
<StatCard 
  title="Main Metric" 
  value={1250} 
  headingLevel="h2"
  variant="primary"
/>

<StatCard 
  title="Secondary Metric" 
  value={450} 
  headingLevel="h4"
  variant="info"
/>
```

### With Data Attributes

```tsx
<StatCard 
  title="Test Metric" 
  value={42} 
  dataAttributes={{
    testid: "revenue-card",
    category: "financial"
  }}
/>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard title="Users" value={1234} icon="users" variant="primary" />
  <StatCard title="Revenue" value="$8,492" icon="trending" variant="success" />
  <StatCard title="Ideas" value={42} icon="lightbulb" variant="info" />
  <StatCard title="Issues" value={7} icon="alert-circle" variant="danger" />
</div>
```

### Variants Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <StatCard title="Default" value={100} variant="default" />
  <StatCard title="Primary" value={100} variant="primary" />
  <StatCard title="Success" value={100} variant="success" />
  <StatCard title="Warning" value={100} variant="warning" />
  <StatCard title="Danger" value={100} variant="danger" />
  <StatCard title="Info" value={100} variant="info" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | Title displayed at the top of the card |
| `value` | `string \| number` | (required) | Main value to display |
| `description` | `string` | `undefined` | Optional description text displayed below the value |
| `icon` | `StatCardIconIdentifier \| React.ReactNode` | `undefined` | Icon to display (can be a string identifier or a React node) |
| `trend` | `StatCardTrend` | `undefined` | Optional trend information to display |
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "danger" \| "info"` | `"default"` | Color variant for the card |
| `loading` | `boolean` | `false` | Whether the card is in a loading state |
| `className` | `string` | `""` | Additional CSS class names |
| `valuePrefix` | `string` | `""` | Prefix to display before the value (e.g., "$") |
| `valueSuffix` | `string` | `""` | Suffix to display after the value (e.g., "%") |
| `onClick` | `() => void` | `undefined` | Optional click handler for interactive cards |
| `compact` | `boolean` | `false` | Whether to use the compact layout |
| `tooltipContent` | `React.ReactNode` | `undefined` | Optional tooltip content |
| `ariaLabel` | `string` | `undefined` | Accessible label for screen readers (defaults to title) |
| `formatter` | `(value: number \| string) => string` | `undefined` | Optional formatter function for the value |
| `animation` | `"none" \| "fadeIn" \| "scaleIn" \| "bounceIn" \| "pulse"` | `"none"` | Optional animation effect |
| `dataAttributes` | `Record<string, string>` | `{}` | Optional data attributes for testing or custom data |
| `headingLevel` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"` | Optional heading level for the title |

### StatCardTrend Interface

```tsx
interface StatCardTrend {
  /** The numeric value of the trend (e.g., 5.2 for 5.2% increase) */
  value: number;
  /** Label explaining the trend context (e.g., "vs last month") */
  label: string;
  /** Direction of the trend */
  direction: "up" | "down" | "neutral";
  /** Whether this trend is positive (up can be bad for some metrics) */
  isGood?: boolean;
}
```

### Available Icon Identifiers

The following string identifiers can be used for the `icon` prop:

- `"lightbulb"` - For ideas or insights
- `"check"` - For completed items or success
- `"rocket"` - For growth or launches
- `"chart"` - For general charts or statistics
- `"users"` - For user-related metrics
- `"trending"` - For trend-related metrics
- `"activity"` - For activity or usage metrics
- `"pie"` - For percentage-based metrics
- `"alert-circle"` - For alerts or issues
- `"zap"` - For energy or performance metrics
- `"line-chart"` - For trend lines
- `"target"` - For goals or targets
- `"dollar"` - For financial metrics
- `"percent"` - For percentage metrics

## Accessibility

The StatCard component implements the following accessibility features:

- Uses semantic HTML elements (`<article>`, `<header>`, etc.)
- Ensures sufficient color contrast for all variants
- Includes proper ARIA attributes for interactive cards:
  - `role="button"` for clickable cards
  - `aria-labelledby` pointing to the title element
  - `aria-describedby` pointing to the description element
- Keyboard navigation support (Enter and Space keys)
- Provides focus states for clickable cards
- Ensures icons have `aria-hidden="true"` to prevent screen reader announcement
- Uses proper heading hierarchy for title with customizable heading level
- Ensures loading states are properly announced to screen readers with `aria-busy`
- Provides ariaLabel prop for custom screen reader announcements
- Includes descriptive labels for trend indicators

## Styling

The StatCard component uses CSS Modules for styling with the following files:

- `StatCard.module.css` - Main styles for the component
- `StatCardAnimations.module.css` - Animation-specific styles

### Customizing Styles

You can customize the appearance of the StatCard by passing a `className` prop:

```tsx
<StatCard 
  title="Custom Styled Card" 
  value={1000} 
  className="my-custom-class" 
/>
```

## Component Structure

The StatCard component is composed of several parts:

- `StatCardHeader` - Displays the title and icon
- `StatCardValue` - Shows the main value
- `StatCardDescription` - Renders the description text
- `StatCardTrend` - Displays trend information

## Best Practices

- Use the appropriate variant to match the semantic meaning of the data
- Include descriptive titles and descriptions for context
- Use trends to show changes over time
- Consider the `isGood` property for trends to correctly indicate positive/negative changes
- Use the `compact` layout for dashboard grids with limited space
- Make cards interactive with `onClick` when they lead to more detailed information
- Use the `formatter` prop for consistent number formatting
- Add tooltips for additional context or explanations
- Respect user preferences for reduced motion with animations
- Use appropriate heading levels to maintain document outline
- Choose the right heading level based on the card's importance in the page hierarchy

## Performance Considerations

The StatCard component is optimized for performance:

- Uses React.memo to prevent unnecessary re-renders
- Implements useMemo for expensive calculations
- Uses useCallback for event handlers
- Splits into smaller component parts for better code organization
- Optimizes CSS with direct selectors and minimal specificity
- Respects user preferences for reduced motion

## Future Expansion

Potential future enhancements for the StatCard component:

- Support for multiple values or metrics in a single card
- Sparkline or mini-chart integration
- Customizable card actions (buttons, dropdowns)
- Comparison mode to show side-by-side metrics
- Goal tracking with progress indicators
- Time-series data visualization
- Expanded animation options
- Theme-specific variants
- Custom border and shadow options
- Collapsible/expandable details
- Real-time update animations
- Export/share functionality
- Print-optimized view
- Responsive layout options for different screen sizes
- Interactive tooltips with additional data visualizations

## Related Components

- `QuoteDisplay` - For displaying quotes and testimonials
- `Card` - Base card component used by StatCard
- `Tooltip` - Used for displaying additional information
- `Badge` - Can be used alongside StatCard for additional status indicators
- `ProgressBar` - Can complement StatCard for showing progress metrics
