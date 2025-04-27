# PieChart Component

A versatile, high-performance, and accessible pie chart component for displaying proportional data. Supports donut charts, data labels, animations, and interactive features.

![PieChart Example](https://via.placeholder.com/800x400.png?text=PieChart+Component)

## Features

- Standard pie charts and donut charts
- Customizable start/end angles and padding between slices
- Data labels with percentage values
- Interactive slice selection
- Smooth, optimized animations
- Responsive design
- Accessibility compliant (ARIA)
- Customizable legends and tooltips
- Loading and error states
- High-performance rendering with memoization

## Installation

The PieChart component is part of the data visualization package. No additional installation is required.

## Usage

```jsx
import { PieChart } from '../components/data-visualization/pie-chart';

// Sample data
const data = [
  { id: '1', label: 'Category A', value: 30, color: '#FF6384' },
  { id: '2', label: 'Category B', value: 50, color: '#36A2EB' },
  { id: '3', label: 'Category C', value: 20, color: '#FFCE56' },
];

// Basic usage
function BasicPieChart() {
  return <PieChart data={data} width={500} height={400} />;
}

// Donut chart
function DonutChart() {
  return (
    <PieChart
      data={data}
      width={500}
      height={400}
      donut={true}
      innerRadius={60}
    />
  );
}

// Interactive chart with data labels
function InteractivePieChart() {
  const handleSliceSelect = (slice, index) => {
    console.log(`Selected slice: ${slice.label} at index ${index}`);
  };

  return (
    <PieChart
      data={data}
      width={500}
      height={400}
      title="Sales Distribution"
      subtitle="By Product Category"
      showDataLabels={true}
      showPercentage={true}
      selectable={true}
      onSliceSelect={handleSliceSelect}
    />
  );
}
```

## Props

### Data Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartDataPoint[]` | `[]` | Array of data points to visualize |

### Dimension Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `'100%'` | Chart width |
| `height` | `number \| string` | `300` | Chart height |

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Chart title |
| `subtitle` | `string` | - | Chart subtitle |
| `description` | `string` | - | Chart description (for accessibility) |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `showBorder` | `boolean` | `false` | Whether to show a border |
| `borderColor` | `string` | - | Border color |
| `borderWidth` | `number` | `1` | Border width |
| `borderRadius` | `number` | `0` | Border radius |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `React.CSSProperties` | - | Custom inline styles |
| `margin` | `ChartMargin` | `{ top: 20, right: 20, bottom: 20, left: 20 }` | Chart margins |

### Pie-specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `donut` | `boolean` | `false` | Whether to render as a donut chart |
| `innerRadius` | `number` | `50` | Inner radius for donut charts as percentage |
| `showDataLabels` | `boolean` | `false` | Whether to show data labels |
| `showPercentage` | `boolean` | `true` | Whether to show percentage in labels |
| `startAngle` | `number` | `0` | Start angle in degrees |
| `endAngle` | `number` | `360` | End angle in degrees |
| `padAngle` | `number` | `0` | Padding between slices in degrees |
| `sortSlices` | `boolean` | `true` | Whether to sort slices by value |
| `selectable` | `boolean` | `false` | Whether to enable slice selection |
| `selectedSlice` | `number` | - | Index of the initially selected slice |

### Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `ChartLegend` | `{ position: 'bottom', layout: 'horizontal', interactive: true }` | Legend configuration |
| `tooltip` | `ChartTooltip` | `{}` | Tooltip configuration |
| `animation` | `ChartAnimation` | `{ enabled: true, duration: 750, easing: 'easeOut' }` | Animation configuration |
| `accessibility` | `ChartAccessibility` | - | Accessibility configuration |

### State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Whether the chart is in a loading state |
| `error` | `string` | - | Error message to display if chart data failed to load |

### Event Handlers

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `(event: React.MouseEvent) => void` | - | Callback when chart is clicked |
| `onDataPointClick` | `(dataPoint: ChartDataPoint, index: number) => void` | - | Callback when a data point is clicked |
| `onSeriesToggle` | `(seriesId: string, visible: boolean) => void` | - | Callback when a series is toggled in the legend |
| `onRenderComplete` | `() => void` | - | Callback when chart has finished rendering |
| `onSliceSelect` | `(slice: ChartDataPoint, index: number) => void` | - | Callback when a slice is selected |

## Data Structure

The PieChart component expects data in the following format:

```typescript
interface ChartDataPoint {
  id?: string;        // Optional unique identifier
  label: string;      // Display label
  value: number;      // Numeric value (determines slice size)
  color?: string;     // Optional color (hex, rgb, or named color)
  percentage?: number; // Calculated percentage (set by the component)
}
```

For more complex data needs, you can use the `ExtendedChartDataPoint` interface:

```typescript
interface ExtendedChartDataPoint extends ChartDataPoint {
  tooltip?: string | React.ReactNode;  // Custom tooltip content
  highlighted?: boolean;               // Whether to highlight this slice
  metadata?: Record<string, any>;      // Additional data for custom use
}
```

## Customization

### Legend Customization

```jsx
<PieChart
  data={data}
  legend={{
    position: 'right',        // 'top', 'right', 'bottom', 'left'
    layout: 'vertical',       // 'horizontal', 'vertical'
    interactive: true,        // Whether items can be clicked to toggle visibility
    maxItems: 10,             // Maximum number of items to show before scrolling
    formatItem: (item) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 12, height: 12, backgroundColor: item.color, marginRight: 8 }} />
        <span>{item.label}</span>
      </div>
    )
  }}
/>
```

### Tooltip Customization

```jsx
// Define a custom tooltip component
const CustomTooltip = ({ dataPoint }) => (
  <div style={{ padding: '8px' }}>
    <div style={{ fontWeight: 'bold' }}>{dataPoint.label}</div>
    <div>Value: {dataPoint.value}</div>
    {dataPoint.percentage !== undefined && (
      <div>Percentage: {(dataPoint.percentage * 100).toFixed(1)}%</div>
    )}
  </div>
);

// Use the custom tooltip component
<PieChart
  data={data}
  tooltip={{
    formatter: (dataPoint) => <CustomTooltip dataPoint={dataPoint} />
  }}
/>
```

### Animation Customization

```jsx
<PieChart
  data={data}
  animation={{
    enabled: true,
    duration: 1000,            // Duration in milliseconds
    easing: 'easeInOut',       // 'linear', 'easeIn', 'easeOut', 'easeInOut'
    animateOnUpdate: true,     // Whether to animate on data updates
    seriesDelay: 100           // Delay between series animations
  }}
/>
```

### Accessibility Customization

```jsx
<PieChart
  data={data}
  description="Distribution of sales by product category for Q1 2023"
  accessibility={{
    keyboardNavigation: true,
    announceDataPoints: true,
    labelledBy: 'chart-title-id',
    describedBy: 'chart-description-id',
    announceFormatter: (dataPoint) => 
      `${dataPoint.label}: ${dataPoint.value} (${(dataPoint.percentage * 100).toFixed(1)}%)`
  }}
/>
```

## Performance Optimizations

The PieChart component includes several performance optimizations:

1. **Memoization**: Uses `useMemo` and `useCallback` to prevent unnecessary calculations and re-renders
2. **Component Memoization**: Uses `React.memo` for sub-components to prevent unnecessary re-renders
3. **Debounced Hover State**: Implements debouncing for hover state to prevent flickering and excessive re-renders
4. **Throttled Mouse Events**: Uses throttling for mouse events to improve performance
5. **Optimized Animations**: Efficiently manages animations with `requestAnimationFrame` and cleanup
6. **Conditional Rendering**: Only renders what's necessary based on the current state

## Animation System

The PieChart component uses a sophisticated animation system that combines:

1. **CSS Animations**: For simple transitions and effects
2. **JavaScript Animations**: For complex, coordinated animations
3. **Custom Animation Hook**: Separates animation logic from rendering logic
4. **Configurable Options**: Allows customization of duration, easing, and other animation properties

The animation system is designed to be performant and accessible, with the option to disable animations entirely for users who prefer reduced motion.

## Accessibility

The PieChart component is designed to be accessible according to WAI-ARIA guidelines:

- SVG elements have appropriate ARIA roles and labels
- Interactive elements are keyboard navigable
- Color contrast is considered for readability
- Screen readers can announce data point values
- Animation can be disabled for users with vestibular disorders

## Examples

### Semi-Circle Donut Chart

```jsx
<PieChart
  data={data}
  width={500}
  height={300}
  donut={true}
  innerRadius={70}
  startAngle={180}
  endAngle={360}
  margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
/>
```

### Multiple Small Pie Charts

```jsx
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {categories.map(category => (
    <PieChart
      key={category.id}
      data={category.data}
      width={200}
      height={200}
      title={category.name}
      legend={{ position: 'bottom', layout: 'horizontal' }}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    />
  ))}
</div>
```

### Dashboard Card with Pie Chart

```jsx
<div className="dashboard-card">
  <PieChart
    data={data}
    width="100%"
    height={300}
    title="Revenue Sources"
    subtitle="Q1 2023"
    donut={true}
    innerRadius={60}
    showDataLabels={true}
    backgroundColor="#ffffff"
    showBorder={true}
    borderColor="#e0e0e0"
    borderRadius={8}
  />
</div>
```

## Recent Improvements

The PieChart component has recently undergone significant improvements:

1. **Enhanced Performance**:
   - Added memoization for expensive calculations
   - Implemented debouncing for hover states
   - Added throttling for mouse events
   - Optimized animation system

2. **Improved Animation System**:
   - Refactored animation logic into a custom hook
   - Better separation of animation and rendering logic
   - More efficient animation cleanup

3. **Better Tooltip Implementation**:
   - Integrated Popper.js for robust positioning
   - Replaced string templates with React components for security
   - Added proper null checks for optional properties

4. **Enhanced Type Safety**:
   - Improved TypeScript definitions
   - Added validation for numeric props
   - Eliminated use of `any` type

5. **Accessibility Enhancements**:
   - Added more ARIA attributes
   - Improved keyboard navigation
   - Better screen reader support

## Future Enhancements

### Planned Technical Improvements

1. **Advanced Rendering Options**:
   - Canvas rendering for very large datasets
   - WebGL acceleration for complex visualizations
   - Server-side rendering support

2. **Enhanced Performance**:
   - Virtual rendering for large legends
   - Worker thread calculations for complex data
   - Incremental rendering for large datasets

3. **Animation Enhancements**:
   - Spring physics-based animations
   - Staggered animations for multiple slices
   - More easing functions and animation patterns
   - Gesture-based interactions with animations

4. **Advanced Interactions**:
   - Multi-selection capability
   - Drag to rotate the chart
   - Pinch to zoom for detail exploration
   - Context menus for additional actions

5. **Data Handling Improvements**:
   - Real-time data updates with smooth transitions
   - Streaming data support
   - Better handling of edge cases (negative values, zero values)
   - Automatic grouping of small slices into "Other" category

### Planned Visual Enhancements

1. **Advanced Styling**:
   - Gradient fills for slices
   - Pattern fills for better differentiation
   - Texture support for slices
   - 3D perspective option

2. **Label Improvements**:
   - Smart label positioning to avoid overlap
   - Curved labels that follow slice arcs
   - Callout lines for small slices
   - Rich text formatting in labels

3. **Visual Effects**:
   - Drop shadows and lighting effects
   - Slice highlighting with glow effects
   - Animated textures and patterns
   - Particle effects for emphasis

4. **Layout Enhancements**:
   - Multiple rings for hierarchical data
   - Nested donut charts
   - Radial layouts with connected elements
   - Integrated small multiples

### Planned Accessibility Improvements

1. **Enhanced Keyboard Navigation**:
   - Arrow key navigation between slices
   - Tab navigation with focus indicators
   - Keyboard shortcuts for common actions

2. **Screen Reader Enhancements**:
   - Improved announcements with context
   - Region navigation
   - Live regions for updates

3. **Additional Accessibility Features**:
   - High contrast mode
   - Large print mode
   - Reduced motion mode
   - Color blind friendly palettes

### Planned Integration Features

1. **Export Options**:
   - Export to PNG, SVG, PDF
   - Copy to clipboard
   - Share functionality

2. **Data Table Integration**:
   - Toggle between chart and table view
   - Synchronized selection between views
   - Accessible data table alternative

3. **Advanced Tooltips**:
   - Multi-level tooltips
   - Tooltip templates with rich formatting
   - Tooltip portals for better positioning
   - Interactive elements within tooltips

4. **Drill-down Capabilities**:
   - Click to drill down into categories
   - Breadcrumb navigation
   - History tracking for navigation
   - Context-aware drill-down behavior