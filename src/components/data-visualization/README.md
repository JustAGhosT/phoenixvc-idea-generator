# Data Visualization Components

A collection of reusable, accessible, and customizable data visualization components for React applications.

## Overview

This library provides a set of React components for visualizing data in various formats, including pie charts, line charts, bar charts, and more. The components are designed with the following principles in mind:

- **Accessibility**: All components follow WAI-ARIA guidelines and are keyboard navigable
- **Customization**: Extensive styling and configuration options
- **Performance**: Optimized rendering for large datasets
- **Responsiveness**: Adapts to different screen sizes
- **Animation**: Smooth transitions and animations with the ability to disable them for performance

## Components

### PieChart

The `PieChart` component visualizes data as slices of a circle, with each slice representing a proportion of the whole. It supports both standard pie charts and donut charts.

#### Usage

```jsx
import { PieChart } from '../components/data-visualization/pie-chart';

const data = [
  { id: '1', label: 'Category A', value: 30, color: '#FF6384' },
  { id: '2', label: 'Category B', value: 50, color: '#36A2EB' },
  { id: '3', label: 'Category C', value: 20, color: '#FFCE56' },
];

function MyComponent() {
  return (
    <PieChart
      data={data}
      width={500}
      height={400}
      title="Sales Distribution"
      subtitle="By Product Category"
      donut={false}
      showDataLabels={true}
      showPercentage={true}
      selectable={true}
      onSliceSelect={(slice, index) => console.log('Selected slice:', slice, 'at index:', index)}
    />
  );
}
```

#### Props

The `PieChart` component accepts the following props:

- **Data Props**
  - `data`: Array of data points to visualize (required)

- **Dimension Props**
  - `width`: Chart width (number or percentage string, default: '100%')
  - `height`: Chart height (number or percentage string, default: 300)

- **Content Props**
  - `title`: Chart title
  - `subtitle`: Chart subtitle
  - `description`: Chart description (for accessibility)

- **Styling Props**
  - `backgroundColor`: Background color (default: 'transparent')
  - `showBorder`: Whether to show a border (default: false)
  - `borderColor`: Border color
  - `borderWidth`: Border width (default: 1)
  - `borderRadius`: Border radius (default: 0)
  - `className`: Additional CSS class name
  - `style`: Custom inline styles
  - `margin`: Chart margins (default: { top: 20, right: 20, bottom: 20, left: 20 })

- **Pie-specific Props**
  - `donut`: Whether to render as a donut chart (default: false)
  - `innerRadius`: Inner radius for donut charts as percentage (default: 50)
  - `showDataLabels`: Whether to show data labels (default: false)
  - `showPercentage`: Whether to show percentage in labels (default: true)
  - `startAngle`: Start angle in degrees (default: 0)
  - `endAngle`: End angle in degrees (default: 360)
  - `padAngle`: Padding between slices in degrees (default: 0)
  - `sortSlices`: Whether to sort slices by value (default: true)
  - `selectable`: Whether to enable slice selection (default: false)
  - `selectedSlice`: Index of the initially selected slice

- **Configuration Props**
  - `legend`: Legend configuration
  - `tooltip`: Tooltip configuration
  - `animation`: Animation configuration
  - `accessibility`: Accessibility configuration

- **State Props**
  - `loading`: Whether the chart is in a loading state (default: false)
  - `error`: Error message to display if chart data failed to load

- **Event Handlers**
  - `onClick`: Callback when chart is clicked
  - `onDataPointClick`: Callback when a data point is clicked
  - `onSeriesToggle`: Callback when a series is toggled in the legend
  - `onRenderComplete`: Callback when chart has finished rendering
  - `onSliceSelect`: Callback when a slice is selected

### LineChart

(Documentation for LineChart component will be added here)

## Accessibility

All visualization components in this library are designed to be accessible according to WAI-ARIA guidelines. Key accessibility features include:

- Keyboard navigation
- Screen reader announcements for data points
- ARIA attributes for better assistive technology support
- Color contrast considerations
- Text alternatives for visual information

Each component accepts an `accessibility` prop that allows further customization of accessibility features:

```jsx
<PieChart
  data={data}
  accessibility={{
    keyboardNavigation: true,
    announceDataPoints: true,
    description: 'Distribution of sales by product category',
    labelledBy: 'chart-title',
    describedBy: 'chart-description'
  }}
/>
```

## Animation

Components include smooth animations and transitions that can be customized or disabled entirely. Animation settings can be configured via the `animation` prop:

```jsx
<PieChart
  data={data}
  animation={{
    enabled: true,
    duration: 750,
    easing: 'easeOut'
  }}
/>
```

## Styling

Components can be styled using:

1. Built-in props for common styling needs
2. CSS modules for component-specific styling
3. CSS custom properties (variables) for theming
4. Custom class names for external styling

## Future Considerations

### Planned Components

- **BarChart**: For comparing values across categories
- **AreaChart**: For showing trends over time with filled areas
- **ScatterPlot**: For showing correlation between two variables
- **HeatMap**: For visualizing data density or frequency
- **TreeMap**: For hierarchical data visualization
- **RadarChart**: For multivariate data visualization
- **GaugeChart**: For displaying progress toward a goal

### Technical Improvements

1. **Performance Optimizations**:
   - Implement virtualization for large datasets
   - Add support for WebGL rendering for complex visualizations
   - Optimize animations for performance

2. **Accessibility Enhancements**:
   - Add more comprehensive keyboard navigation
   - Improve screen reader announcements
   - Support high contrast mode

3. **Responsive Improvements**:
   - Better handling of small screen sizes
   - Touch-optimized interactions for mobile
   - Adaptive data density based on screen size

4. **Data Handling**:
   - Support for streaming data
   - Better handling of missing or invalid data
   - Time series specific optimizations

5. **Integration**:
   - Export options (PNG, SVG, PDF)
   - Data table view alternatives
   - Integration with popular data libraries

6. **Internationalization**:
   - Support for RTL languages
   - Localized number and date formatting
   - Culturally appropriate color schemes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.