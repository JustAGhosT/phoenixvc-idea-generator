/**
 * Funnel Chart specific types
 */

import { BaseChartProps } from './base-chart-props';
import { ChartDataPoint, ExtendedChartDataPoint } from './base-types';

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