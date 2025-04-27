/**
 * Line Chart specific types
 */

import { BaseChartProps } from './base-chart-props';
import { ChartDataPoint, ChartSeries, ExtendedChartDataPoint } from './base-types';
import { ChartAxis } from './chart-config';

/**
 * Line Chart specific props
 */
export interface LineChartProps extends BaseChartProps {
  /** Data for the line chart */
  data: ChartDataPoint[] | ExtendedChartDataPoint[] | ChartSeries<ChartDataPoint | ExtendedChartDataPoint>[];
  /** Whether to show area under the line */
  showArea?: boolean;
  /** Whether to show points on the line */
  showPoints?: boolean;
  /** Whether to use curved lines */
  curved?: boolean;
  /** Line width */
  lineWidth?: number;
  /** Point radius */
  pointRadius?: number;
  /** Whether to show data labels */
  showDataLabels?: boolean;
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Whether to show grid lines */
  showGridLines?: boolean;
  /** Whether lines should have gradient fill */
  useGradient?: boolean;
}