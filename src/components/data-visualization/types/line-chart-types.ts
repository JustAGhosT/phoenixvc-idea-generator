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