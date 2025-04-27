# BarChart Component

The `BarChart` component is a versatile data visualization tool for displaying data as horizontal or vertical bars.

## Features

- Supports vertical and horizontal orientations
- Supports single or multiple data series
- Supports stacked and grouped bar layouts
- Customizable bar appearance (colors, radius, gaps)
- Interactive tooltips
- Configurable axes
- Responsive design
- Accessible

## Usage

```tsx
import { BarChart } from '@/components/data-visualization';

// Basic usage with single series data
const MyBarChart = () => (
  <BarChart
    title="Top Projects"
    data={[
      { label: 'Project A', value: 85 },
      { label: 'Project B', value: 65 },
      { label: 'Project C', value: 45 }
    ]}
    height={300}
  />
);

// Multi-series data
const MultiSeriesBarChart = () => (
  <BarChart
    title="Quarterly Performance"
    data={[
      {
        id: 'revenue',
        name: 'Revenue',
        data: [
          { label: 'Q1', value: 120000 },
          { label: 'Q2', value: 150000 },
          { label: 'Q3', value: 180000 },
          { label: 'Q4', value: 210000 }
        ]
      },
      {
        id: 'expenses',
        name: 'Expenses',
        data: [
          { label: 'Q1', value: 80000 },
          { label: 'Q2', value: 100000 },
          { label: 'Q3', value: 110000 },
          { label: 'Q4', value: 130000 }
        ]
      }
    ]}
    stacked={true}
    height={400}
  />
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartDataPoint[] \| ChartSeries<ChartDataPoint>[]` | - | Data to display in the chart |
| `title` | `string` | - | Chart title |
| `subtitle` | `string` | - | Chart subtitle |
| `width` | `string \| number` | `"100%"` | Width of the chart |
| `height` | `number` | `300` | Height of the chart |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Orientation of the bars |
| `stacked` | `boolean` | `false` | Whether to stack multiple series |
| `grouped` | `boolean` | `false` | Whether to group multiple series |
| `maxBarWidth` | `number` | - | Maximum width of each bar |
| `barRadius` | `number` | `4` | Border radius of the bars |
| `barGap` | `number` | `0.2` | Gap between bars as fraction of bar width |
| `showDataLabels` | `boolean` | `false` | Whether to show data labels on bars |
| `xAxis` | `ChartAxis` | - | X-axis configuration |
| `yAxis` | `ChartAxis` | - | Y-axis configuration |
| `showBaseline` | `boolean` | `true` | Whether to show the baseline |
| `useGradient` | `boolean` | `false` | Whether to use gradient fills for bars |
| `legend` | `ChartLegend` | - | Legend configuration |
| `tooltip` | `ChartTooltip` | - | Tooltip configuration |
| `animation` | `ChartAnimation` | - | Animation configuration |
| `accessibility` | `ChartAccessibility` | - | Accessibility configuration |
| `margin` | `ChartMargin` | `{ top: 20, right: 20, bottom: 40, left: 40 }` | Chart margins |
| `backgroundColor` | `string` | `"transparent"` | Background color of the chart |
| `showBorder` | `boolean` | `false` | Whether to show a border around the chart |
| `borderColor` | `string` | - | Border color |
| `borderWidth` | `number` | - | Border width |
| `borderRadius` | `number` | - | Border radius of the chart container |
| `className` | `string` | `""` | Additional CSS class |
| `style` | `React.CSSProperties` | - | Additional inline styles |
| `onClick` | `() => void` | - | Callback when chart is clicked |
| `onDataPointClick` | `(dataPoint: ChartDataPoint, index: number, series: ChartSeries<ChartDataPoint>) => void` | - | Callback when a data point is clicked |
| `onSeriesToggle` | `(seriesId: string, visible: boolean) => void` | - | Callback when a series is toggled |
| `onRenderComplete` | `() => void` | - | Callback when chart rendering is complete |
| `dataAttributes` | `Record<string, string>` | - | Additional data attributes |

## Examples

### Vertical Bar Chart

```tsx
<BarChart
  title="Monthly Sales"
  data={[
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 180 },
    { label: 'Apr', value: 90 },
    { label: 'May', value: 210 }
  ]}
  height={300}
/>
```

### Horizontal Bar Chart

```tsx
<BarChart
  title="Top Products"
  data={[
    { label: 'Product A', value: 85 },
    { label: 'Product B', value: 65 },
    { label: 'Product C', value: 45 },
    { label: 'Product D', value: 75 }
  ]}
  orientation="horizontal"
  height={300}
/>
```

### Stacked Bar Chart

```tsx
<BarChart
  title="Quarterly Performance by Department"
  data={[
    {
      id: 'sales',
      name: 'Sales',
      data: [
        { label: 'Q1', value: 120 },
        { label: 'Q2', value: 150 },
        { label: 'Q3', value: 180 },
        { label: 'Q4', value: 210 }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      data: [
        { label: 'Q1', value: 80 },
        { label: 'Q2', value: 100 },
        { label: 'Q3', value: 110 },
        { label: 'Q4', value: 130 }
      ]
    },
    {
      id: 'rd',
      name: 'R&D',
      data: [
        { label: 'Q1', value: 60 },
        { label: 'Q2', value: 80 },
        { label: 'Q3', value: 90 },
        { label: 'Q4', value: 110 }
      ]
    }
  ]}
  stacked={true}
  height={400}
/>
```

### Grouped Bar Chart

```tsx
<BarChart
  title="Quarterly Performance by Department"
  data={[
    {
      id: 'sales',
      name: 'Sales',
      data: [
        { label: 'Q1', value: 120 },
        { label: 'Q2', value: 150 },
        { label: 'Q3', value: 180 },
        { label: 'Q4', value: 210 }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      data: [
        { label: 'Q1', value: 80 },
        { label: 'Q2', value: 100 },
        { label: 'Q3', value: 110 },
        { label: 'Q4', value: 130 }
      ]
    }
  ]}
  grouped={true}
  height={400}
/>
```

## Accessibility

The BarChart component follows accessibility best practices:

- All interactive elements are keyboard accessible
- Chart elements have appropriate ARIA attributes
- Color contrast meets WCAG guidelines
- Screen reader support for data visualization

## Future Enhancements

### Short-term Improvements

1. **Performance Optimization**:
   - Implement memoization for expensive calculations in bar positioning and data processing
   - Add virtualization for large datasets to improve rendering performance
   - Optimize SVG rendering with clipping for offscreen elements

2. **Enhanced Accessibility**:
   - Add ARIA live regions for dynamic data updates
   - Implement keyboard navigation between individual bars
   - Add screen reader announcements for data changes
   - Improve focus management for interactive elements

3. **Animation Enhancements**:
   - Add enter/update/exit animations for data changes
   - Implement sequential animation for stacked and grouped bars
   - Add animation controls (pause, resume, speed)
   - Support for animation customization per series

4. **Advanced Interactions**:
   - Add bar selection and multi-selection capabilities
   - Implement brushing for selecting ranges of bars
   - Add context menu for additional actions
   - Support for drag-and-drop reordering

### Medium-term Roadmap

1. **Enhanced Data Visualization**:
   - Support for reference lines and bands
   - Add annotations and callouts for specific data points
   - Implement error bars and confidence intervals
   - Support for dual-axis charts

2. **Advanced Features**:
   - Add zooming and panning capabilities
   - Implement drill-down functionality for hierarchical data
   - Add data filtering controls
   - Support for dynamic data loading and streaming

3. **Integration Improvements**:
   - Add export functionality (PNG, SVG, PDF)
   - Implement data table view toggle
   - Add integration with data analysis libraries
   - Support for custom tooltips and popovers

4. **Theming and Styling**:
   - Add comprehensive theme support
   - Implement custom color palette generators
   - Add pattern fills for better print support
   - Support for custom bar shapes and styles

### Long-term Vision

1. **Advanced Analytics**:
   - Built-in statistical analysis features
   - Trend lines and forecasting
   - Anomaly detection and highlighting
   - Comparative analysis tools

2. **Interoperability**:
   - Synchronization with other chart types
   - Cross-filtering capabilities
   - Integration with dashboard frameworks
   - Support for collaborative annotations

3. **Accessibility Excellence**:
   - Sonification for audio representation of data
   - Haptic feedback for touch devices
   - Advanced screen reader optimizations
   - Full compliance with WCAG AAA standards

## Browser Support

The BarChart component is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)