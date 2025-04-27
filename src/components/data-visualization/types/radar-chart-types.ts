/**
 * Radar/Spider Chart specific types
 */

import { BaseChartProps } from './base-chart-props';
import { ChartSeries, RadarChartDataPoint } from './base-types';

/**
 * Radar Chart specific props
 */
export interface RadarChartProps extends BaseChartProps {
  /** Data for the radar chart */
  data: ChartSeries<RadarChartDataPoint>[];
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