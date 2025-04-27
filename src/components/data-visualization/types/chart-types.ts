/**
 * Core types for chart components
 * 
 * This file defines the shared interfaces and types used across all chart components.
 */

/**
 * Basic data point interface for charts
 */
export interface ChartDataPoint {
  /** The label for this data point */
  label: string;
  /** The value for this data point */
  value: number;
}

/**
 * Extended data point with optional properties
 */
export interface ExtendedChartDataPoint extends ChartDataPoint {
  /** Optional color override for this specific data point */
  color?: string;
  /** Optional tooltip content for this data point */
  tooltip?: string | React.ReactNode;
  /** Optional flag to highlight this data point */
  highlighted?: boolean;
  /** Optional metadata for this data point */
  metadata?: Record<string, any>;
}

/**
 * Series data for multi-series charts (line, bar)
 */
export interface ChartSeries<T extends ChartDataPoint = ChartDataPoint> {
  /** Unique identifier for the series */
  id: string;
  /** Display name for the series */
  name: string;
  /** Data points in this series */
  data: T[];
  /** Optional color for the series */
  color?: string;
  /** Whether this series is visible */
  visible?: boolean;
  /** Optional dash pattern for line charts */
  dashPattern?: string;
  /** Optional line/bar thickness */
  thickness?: number;
  /** Optional opacity for the series */
  opacity?: number;
}

/**
 * Axis configuration
 */
export interface ChartAxis {
  /** Show or hide the axis */
  visible?: boolean;
  /** Axis title */
  title?: string;
  /** Format function for axis labels */
  formatLabel?: (value: any) => string;
  /** Minimum value (for numerical axes) */
  min?: number;
  /** Maximum value (for numerical axes) */
  max?: number;
  /** Step size between ticks */
  step?: number;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show axis line */
  showLine?: boolean;
  /** Whether to show ticks */
  showTicks?: boolean;
  /** Custom tick values */
  tickValues?: any[];
  /** Position of the axis */
  position?: 'start' | 'end' | 'center';
}

/**
 * Legend configuration
 */
export interface ChartLegend {
  /** Show or hide the legend */
  visible?: boolean;
  /** Position of the legend */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Legend layout */
  layout?: 'horizontal' | 'vertical';
  /** Whether items can be clicked to toggle visibility */
  interactive?: boolean;
  /** Maximum number of items to show before scrolling */
  maxItems?: number;
  /** Custom formatter for legend items */
  formatItem?: (name: string, color: string) => React.ReactNode;
}

/**
 * Tooltip configuration
 */
export interface ChartTooltip {
  /** Show or hide tooltips */
  visible?: boolean;
  /** Tooltip position strategy */
  position?: 'pointer' | 'element' | 'fixed';
  /** Format function for tooltip content */
  formatter?: (dataPoint: ChartDataPoint | ExtendedChartDataPoint, series?: ChartSeries) => React.ReactNode;
  /** Delay before showing tooltip (ms) */
  showDelay?: number;
  /** Delay before hiding tooltip (ms) */
  hideDelay?: number;
  /** Whether to follow the pointer */
  followPointer?: boolean;
  /** Whether to show shared tooltip for all series at same x value */
  shared?: boolean;
}

/**
 * Animation configuration
 */
export interface ChartAnimation {
  /** Whether to animate the chart */
  enabled?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Animation easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  /** Whether to animate on data updates */
  animateOnUpdate?: boolean;
  /** Delay between series animations (ms) */
  seriesDelay?: number;
}

/**
 * Accessibility configuration
 */
export interface ChartAccessibility {
  /** Whether to enable keyboard navigation */
  keyboardNavigation?: boolean;
  /** Description of the chart for screen readers */
  description?: string;
  /** Whether to announce data point values */
  announceDataPoints?: boolean;
  /** Custom announcement formatter */
  announceFormatter?: (dataPoint: ChartDataPoint | ExtendedChartDataPoint) => string;
}

/**
 * Margin configuration
 */
export interface ChartMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * Base configuration shared by all chart types
 */
export interface BaseChartProps {
  /** Chart width (can be number or percentage string) */
  width?: number | string;
  /** Chart height (can be number or percentage string) */
  height?: number | string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Chart description (for accessibility) */
  description?: string;
  /** Whether the chart is in a loading state */
  loading?: boolean;
  /** Error message to display if chart data failed to load */
  error?: string;
  /** Chart margins */
  margin?: ChartMargin;
  /** Legend configuration */
  legend?: ChartLegend;
  /** Tooltip configuration */
  tooltip?: ChartTooltip;
  /** Animation configuration */
  animation?: ChartAnimation;
  /** Accessibility configuration */
  accessibility?: ChartAccessibility;
  /** Background color */
  backgroundColor?: string;
  /** Whether to show a border */
  showBorder?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  /** Additional CSS class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when chart is clicked */
  onClick?: (event: React.MouseEvent) => void;
  /** Callback when a data point is clicked */
  onDataPointClick?: (dataPoint: ChartDataPoint | ExtendedChartDataPoint, index: number, series?: ChartSeries) => void;
  /** Callback when a series is toggled in the legend */
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
  /** Callback when chart has finished rendering */
  onRenderComplete?: () => void;
  /** Additional data attributes */
  dataAttributes?: Record<string, string>;
}

/**
 * Bar Chart specific props
 */
export interface BarChartProps extends BaseChartProps {
  /** Data for the bar chart */
  data: ChartDataPoint[] | ExtendedChartDataPoint[] | ChartSeries<ChartDataPoint | ExtendedChartDataPoint>[];
  /** Bar orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Whether to stack bars in multi-series data */
  stacked?: boolean;
  /** Whether to group bars in multi-series data */
  grouped?: boolean;
  /** Maximum bar width (in pixels) */
  maxBarWidth?: number;
  /** Bar corner radius */
  barRadius?: number;
  /** Gap between bars as a percentage of bar width */
  barGap?: number;
  /** Whether to show data labels on bars */
  showDataLabels?: boolean;
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Whether to show a baseline at zero */
  showBaseline?: boolean;
  /** Whether bars should have gradient fill */
  useGradient?: boolean;
}

/**
 * Line Chart specific props
 */
export interface LineChartProps extends BaseChartProps {
  /** Data for the line chart */
  data: ChartSeries<ChartDataPoint | ExtendedChartDataPoint>[];
  /** Whether to show points on the line */
  showPoints?: boolean;
  /** Point size in pixels */
  pointSize?: number;
  /** Line thickness in pixels */
  lineThickness?: number;
  /** Whether to fill the area under the line */
  areaFill?: boolean;
  /** Opacity of the area fill (0-1) */
  areaOpacity?: number;
  /** Whether to use curved lines */
  curved?: boolean;
  /** Whether to connect null/missing values */
  connectNulls?: boolean;
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Whether to show a baseline at zero */
  showBaseline?: boolean;
  /** Whether to show crosshair on hover */
  showCrosshair?: boolean;
  /** Whether to show range selector */
  showRangeSelector?: boolean;
}

/**
 * Pie Chart specific props
 */
export interface PieChartProps extends BaseChartProps {
  /** Data for the pie chart */
  data: ChartDataPoint[] | ExtendedChartDataPoint[];
  /** Whether to render as a donut chart */
  donut?: boolean;
  /** Inner radius for donut charts (as percentage of outer radius) */
  innerRadius?: number;
  /** Whether to show data labels */
  showDataLabels?: boolean;
  /** Whether to show percentage in labels */
  showPercentage?: boolean;
  /** Start angle in degrees */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
  /** Padding between slices in degrees */
  padAngle?: number;
  /** Whether to sort slices by value */
  sortSlices?: boolean;
  /** Whether to enable slice selection */
  selectable?: boolean;
  /** Index of the initially selected slice */
  selectedSlice?: number;
  /** Callback when a slice is selected */
  onSliceSelect?: (slice: ChartDataPoint | ExtendedChartDataPoint, index: number) => void;
}

/**
 * Scatter Plot specific props
 */
export interface ScatterPlotProps extends BaseChartProps {
  /** Data for the scatter plot */
  data: Array<{
    id: string;
    name: string;
    data: Array<{
      x: number;
      y: number;
      size?: number;
      label?: string;
      color?: string;
      tooltip?: string | React.ReactNode;
    }>;
    color?: string;
  }>;
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Default point size in pixels */
  pointSize?: number;
  /** Whether to show a trend line */
  showTrendLine?: boolean;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to enable zooming */
  zoomable?: boolean;
}

/**
 * Heatmap specific props
 */
export interface HeatmapProps extends BaseChartProps {
  /** Data for the heatmap */
  data: Array<{
    x: string | number;
    y: string | number;
    value: number;
    color?: string;
    tooltip?: string | React.ReactNode;
  }>;
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Color scheme for the heatmap */
  colorScheme?: 'sequential' | 'diverging' | 'categorical';
  /** Custom color range */
  colors?: string[];
  /** Whether to show cell values */
  showValues?: boolean;
  /** Cell border width */
  cellBorderWidth?: number;
  /** Cell border color */
  cellBorderColor?: string;
  /** Cell padding */
  cellPadding?: number;
}

/**
 * Radar/Spider Chart specific props
 */
export interface RadarChartProps extends BaseChartProps {
  /** Data for the radar chart */
  data: ChartSeries<{ axis: string; value: number; tooltip?: string | React.ReactNode }>[];
  /** Axis configuration */
  axes: Array<{
    name: string;
    min?: number;
    max?: number;
    tickCount?: number;
    formatter?: (value: number) => string;
  }>;
  /** Whether to fill the area */
  fillArea?: boolean;
  /** Opacity of the fill (0-1) */
  fillOpacity?: number;
  /** Whether to show axis lines */
  showAxisLines?: boolean;
  /** Whether to show concentric grid circles */
  showGrid?: boolean;
  /** Line thickness in pixels */
  lineThickness?: number;
  /** Whether to show points */
  showPoints?: boolean;
  /** Point size in pixels */
  pointSize?: number;
}

/**
 * Funnel Chart specific props
 */
export interface FunnelChartProps extends BaseChartProps {
  /** Data for the funnel chart */
  data: (ChartDataPoint | ExtendedChartDataPoint)[];
  /** Whether to show percentages */
  showPercentages?: boolean;
  /** Whether to show absolute values */
  showValues?: boolean;
  /** Whether to invert the funnel */
  inverted?: boolean;
  /** Curve amount for funnel sides (0-1) */
  curve?: number;
  /** Pinch amount at the bottom (0-1) */
  pinchRatio?: number;
  /** Gap between sections */
  sectionGap?: number;
  /** Whether to show connecting lines between sections */
  showConnectors?: boolean;
}

/**
 * Gauge Chart specific props
 */
export interface GaugeChartProps extends BaseChartProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Threshold values for color changes */
  thresholds?: Array<{
    value: number;
    color: string;
    label?: string;
  }>;
  /** Start angle in degrees */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Formatter for the displayed value */
  valueFormatter?: (value: number) => string;
  /** Whether to animate value changes */
  animateNeedle?: boolean;
  /** Width of the gauge arc */
  arcWidth?: number;
  /** Whether to show tick marks */
  showTicks?: boolean;
  /** Number of ticks to display */
  tickCount?: number;
}

/**
 * Chart theme configuration
 */
export interface ChartTheme {
  /** Base font family */
  fontFamily?: string;
  /** Text color */
  textColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Grid line color */
  gridColor?: string;
  /** Axis line color */
  axisColor?: string;
  /** Default series colors */
  colors?: string[];
  /** Title text styles */
  title?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: string | number;
  };
  /** Subtitle text styles */
  subtitle?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: string | number;
  };
  /** Legend styles */
  legend?: {
    fontSize?: number;
    color?: string;
    itemMargin?: string | number;
  };
  /** Tooltip styles */
  tooltip?: {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    boxShadow?: string;
    color?: string;
    fontSize?: number;
    padding?: string | number;
  };
  /** Data label styles */
  dataLabels?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
  };
}

/**
 * Chart context for theme and shared configuration
 */
export interface ChartContextValue {
  /** Chart theme */
  theme: ChartTheme;
  /** Whether animations are enabled globally */
  animationsEnabled: boolean;
  /** Whether to use responsive sizing */
  responsive: boolean;
  /** Default color palette */
  colorPalette: string[];
  /** Whether to use high contrast mode */
  highContrast: boolean;
  /** Locale for number formatting */
  locale: string;
  /** Update the chart context */
  updateContext: (updates: Partial<Omit<ChartContextValue, 'updateContext'>>) => void;
}