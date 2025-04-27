/**
 * Bar Chart specific types
 */

import { BaseChartProps } from './base-chart-props';
import { ChartDataPoint, ChartSeries, ExtendedChartDataPoint } from './base-types';
import { ChartAxis } from './chart-config';

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