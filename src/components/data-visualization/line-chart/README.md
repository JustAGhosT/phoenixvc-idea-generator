# LineChart Component

The LineChart component is a versatile and interactive data visualization tool for displaying time series or categorical data as lines or area charts. It supports multiple series, various styling options, animations, and interactive features.

## Features

- **Multiple Series**: Display one or more data series on the same chart
- **Area Charts**: Option to show filled areas under the lines
- **Curved Lines**: Option to use curved lines instead of straight segments
- **Interactive Points**: Clickable data points with tooltips
- **Customizable Legend**: Interactive legend for toggling series visibility
- **Animations**: Smooth animations when data changes
- **Responsive Design**: Adapts to container width
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Customizable Styling**: Extensive styling options for colors, borders, and more

## Usage

```tsx
import { LineChart } from 'components/data-visualization/line-chart';

// Basic usage with single series
const BasicExample = () => (
  <LineChart
    title="Monthly Revenue"
    data={[
      { label: 'Jan', value: 1000 },
      { label: 'Feb', value: 1500 },
      { label: 'Mar', value: 1200 },
      { label: 'Apr', value: 1800 },
      { label: 'May', value: 2000 },
    ]}
  />
);

// Multi-series example
const MultiSeriesExample = () => (
  <LineChart
    title="Monthly Performance"
    subtitle="Revenue vs Profit"
    data={[
      {
        id: 'revenue',
        name: 'Revenue',
        data: [
          { label: 'Jan', value: 1000 },
          { label: 'Feb', value: 1500 },
          { label: 'Mar', value: 1200 },
          { label: 'Apr', value: 1800 },
          { label: 'May', value: 2000 },
        ],
      },
      {
        id: 'profit',
        name: 'Profit',
        data: [
          { label: 'Jan', value: 500 },
          { label: 'Feb', value: 700 },
          { label: 'Mar', value: 600 },
          { label: 'Apr', value: 900 },
          { label: 'May', value: 1000 },
        ],
      },
    ]}
  />
);

// Area chart with curved lines
const AreaChartExample = () => (
  <LineChart
    title="Monthly Revenue"
    data={[
      { label: 'Jan', value: 1000 },
      { label: 'Feb', value: 1500 },
      { label: 'Mar', value: 1200 },
      { label: 'Apr', value: 1800 },
      { label: 'May', value: 2000 },
    ]}
    showArea={true}
    curved={true}
    useGradient={true}
  />
);

// Interactive example with event handlers
const InteractiveExample = () => {
  const [visibleSeries, setVisibleSeries] = useState({
    revenue: true,
    profit: true,
  });
  
  const handleSeriesToggle = (seriesId, visible) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesId]: visible,
    }));
  };
  
  const handlePointClick = (dataPoint, index, series) => {
    console.log(`Clicked ${series.name} at ${dataPoint.label}: ${dataPoint.value}`);
  };
  
  return (
    <LineChart
      title="Monthly Performance"
      data={[
        {
          id: 'revenue',
          name: 'Revenue',
          visible: visibleSeries.revenue,
          data: [/* ... */],
        },
        {
          id: 'profit',
          name: 'Profit',
          visible: visibleSeries.profit,
          data: [/* ... */],
        },
      ]}
      onSeriesToggle={handleSeriesToggle}
      onDataPointClick={handlePointClick}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartDataPoint[] \| ChartSeries<ChartDataPoint>[]` | Required | Data to display in the chart |
| `title` | `string` | - | Chart title |
| `subtitle` | `string` | - | Chart subtitle |
| `width` | `number \| string` | `"100%"` | Chart width |
| `height` | `number` | `300` | Chart height |
| `showArea` | `boolean` | `false` | Whether to show area fill under lines |
| `showPoints` | `boolean` | `true` | Whether to show data points |
| `curved` | `boolean` | `false` | Whether to use curved lines |
| `lineWidth` | `number` | `2` | Width of the lines |
| `pointRadius` | `number` | `4` | Radius of the data points |
| `showDataLabels` | `boolean` | `false` | Whether to show data labels |
| `xAxis` | `ChartAxis` | - | X-axis configuration |
| `yAxis` | `ChartAxis` | - | Y-axis configuration |
| `showGridLines` | `boolean` | `true` | Whether to show grid lines |
| `useGradient` | `boolean` | `false` | Whether to use gradient fills |
| `legend` | `{ position?: 'top' \| 'right' \| 'bottom' \| 'left'; layout?: 'horizontal' \| 'vertical'; interactive?: boolean; maxItems?: number; }` | - | Legend configuration |
| `tooltip` | `{ formatter?: (dataPoint: ChartDataPoint, series: ChartSeries) => React.ReactNode; }` | - | Tooltip configuration |
| `animation` | `{ enabled?: boolean; duration?: number; easing?: 'linear' \| 'easeIn' \| 'easeOut' \| 'easeInOut'; }` | `{ enabled: true, duration: 750, easing: 'easeOut' }` | Animation configuration |
| `margin` | `{ top?: number; right?: number; bottom?: number; left?: number; }` | `{ top: 20, right: 20, bottom: 40, left: 40 }` | Chart margins |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `showBorder` | `boolean` | `false` | Whether to show a border |
| `borderColor` | `string` | - | Border color |
| `borderWidth` | `number` | - | Border width |
| `borderRadius` | `number` | - | Border radius |
| `className` | `string` | `""` | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler for the chart |
| `onDataPointClick` | `(dataPoint: ChartDataPoint, index: number, series: ChartSeries) => void` | - | Click handler for data points |
| `onSeriesToggle` | `(seriesId: string, visible: boolean) => void` | - | Handler for series visibility toggle |
| `onRenderComplete` | `() => void` | - | Callback when chart rendering is complete |
| `dataAttributes` | `Record<string, string>` | - | Additional data attributes |

## Data Format

The LineChart component accepts data in two formats:

### Simple Array of Data Points

```tsx
const data = [
  { label: 'Jan', value: 1000 },
  { label: 'Feb', value: 1500 },
  { label: 'Mar', value: 1200 },
];
```

### Array of Series

```tsx
const data = [
  {
    id: 'revenue',
    name: 'Revenue',
    data: [
      { label: 'Jan', value: 1000 },
      { label: 'Feb', value: 1500 },
      { label: 'Mar', value: 1200 },
    ],
  },
  {
    id: 'profit',
    name: 'Profit',
    data: [
      { label: 'Jan', value: 500 },
      { label: 'Feb', value: 700 },
      { label: 'Mar', value: 600 },
    ],
  },
];
```

## Customization

### Line Styles

You can customize the appearance of lines by setting properties like `lineWidth`, `curved`, and by using the `dashPattern` property on individual series:

```tsx
const data = [
  {
    id: 'revenue',
    name: 'Revenue',
    dashPattern: '5,5', // Creates a dashed line
    data: [/* ... */],
  },
  {
    id: 'target',
    name: 'Target',
    dashPattern: '10,5,5,5', // More complex dash pattern
    data: [/* ... */],
  },
];
```

### Colors

You can set colors for individual series:

```tsx
const data = [
  {
    id: 'revenue',
    name: 'Revenue',
    color: '#3b82f6', // Blue
    data: [/* ... */],
  },
  {
    id: 'profit',
    name: 'Profit',
    color: '#10b981', // Green
    data: [/* ... */],
  },
];
```

### Area Charts

Turn a line chart into an area chart:

```tsx
<LineChart
  data={data}
  showArea={true}
  useGradient={true} // Optional gradient fill
/>
```

### Animation

Customize the animation behavior:

```tsx
<LineChart
  data={data}
  animation={{
    enabled: true,
    duration: 1000, // Animation duration in ms
    easing: 'easeInOut', // Easing function
  }}
/>
```

## Accessibility

The LineChart component includes ARIA attributes and supports keyboard navigation for interactive elements like data points and legend items. To further enhance accessibility, you can provide additional configuration:

```tsx
<LineChart
  data={data}
  accessibility={{
    labelledBy: 'chart-title', // ID of an element that labels the chart
    describedBy: 'chart-desc', // ID of an element that describes the chart
    longDescription: 'This chart shows monthly revenue trends for 2023',
  }}
/>
```

## Performance Considerations

For optimal performance, especially with large datasets or many series:

1. **Limit Data Points**: For very large datasets, consider aggregating or sampling data.
2. **Disable Animation**: Turn off animations for charts with many data points.
3. **Use Memoization**: Wrap the component with `React.memo()` when the parent component re-renders frequently.
4. **Virtualize Legend**: For charts with many series, use the `maxItems` prop on the legend.

```tsx
// Example with performance optimizations
<LineChart
  data={largeDataset}
  animation={{ enabled: false }}
  legend={{ maxItems: 5 }}
/>
```

## Browser Support

The LineChart component uses SVG for rendering and is compatible with all modern browsers. For Internet Explorer 11 support, additional polyfills may be required.

## Future Considerations and Enhancements

The LineChart component is designed to be extensible. Here are some potential future enhancements:

### Interactive Features

- **Zoom and Pan**: Add ability to zoom into specific time ranges and pan across the data
- **Brush Selection**: Allow users to select a range of data points for filtering or detailed analysis
- **Crosshair Tooltip**: Add a crosshair that follows mouse movement with tooltips for all series at that x-position
- **Click-and-Drag Annotations**: Allow users to add annotations or highlight regions

### Data Visualization

- **Reference Lines**: Support for horizontal/vertical reference lines or threshold indicators
- **Dual Y-Axes**: Support for different scales on left and right sides for comparing different units
- **Stacked Area Charts**: Option to stack multiple area series
- **Step Lines**: Support for step line charts (useful for discrete changes)
- **Confidence Intervals**: Display confidence bands or error margins around lines
- **Trend Lines**: Automatic calculation and display of trend lines or moving averages

### Performance

- **Canvas Rendering**: Option to use Canvas instead of SVG for very large datasets
- **Data Windowing**: Only render visible data points when zoomed in
- **Web Workers**: Move heavy calculations off the main thread

### Integration

- **Export Options**: Add ability to export chart as image or data
- **Real-time Updates**: Optimized support for streaming data
- **Theme Integration**: Better integration with design systems and theme providers
- **Animation Hooks**: Provide hooks for custom animation effects

### Accessibility

- **Screen Reader Optimizations**: Enhanced ARIA descriptions of trends and patterns
- **Keyboard Navigation**: Improved keyboard navigation between data points
- **High Contrast Mode**: Dedicated high contrast theme for visually impaired users

### Mobile Experience

- **Touch Optimizations**: Better handling of touch events for mobile users
- **Responsive Legends**: Collapsible legends on small screens
- **Gesture Support**: Pinch-to-zoom and swipe-to-pan on touch devices

## Contributing

Contributions to the LineChart component are welcome! Please refer to the contribution guidelines for more information.

## License

This component is released under the MIT License.