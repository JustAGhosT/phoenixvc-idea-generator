# StatCard Component

The StatCard component is used to display statistics and metrics with support for trends, icons, and various visual styles.

## Features

- Display title, value, and optional description
- Support for icons (both string identifiers and React nodes)
- Trend indicators with directional arrows
- Multiple color variants
- Loading state with skeleton animation
- Compact layout option
- Interactive cards with onClick handler
- Tooltip support
- Accessibility features
- Value formatting options

## Usage

### Basic Usage

```tsx
import { StatCard } from '@/components/data-display/stat-card/StatCard';

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | Title displayed at the top of the card |
| `value` | `string \| number` | (required) | Main value to display |
| `description` | `string` | `undefined` | Optional description text displayed below the value |
| `icon` | `string \| React.ReactNode` | `undefined` | Icon to display (can be a string identifier or a React node) |
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

### StatCardTrend Interface

```tsx
interface StatCardTrend {
  value: number;
  label: string;
  direction: "up" | "down" | "neutral";
  isGood?: boolean;
}
```

## Accessibility

The StatCard component implements the following accessibility features:

- Uses semantic HTML elements for structure
- Ensures sufficient color contrast for all variants
- Includes proper ARIA attributes for interactive cards:
  - `role="button"` for clickable cards
  - `aria-labelledby` pointing to the title element
  - `aria-describedby` pointing to the description element
- Keyboard navigation support (Enter and Space keys)
- Provides focus states for clickable cards
- Ensures icons have `aria-hidden="true"` to prevent screen reader announcement
- Uses proper heading hierarchy for title
- Ensures loading states are properly announced to screen readers
- Provides ariaLabel prop for custom screen reader announcements
- Includes descriptive labels for trend indicators