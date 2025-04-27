/**
 * Pie Chart specific types
 */

import { BaseChartProps } from './base-chart-props';
import { ChartDataPoint, ExtendedChartDataPoint } from './base-types';

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