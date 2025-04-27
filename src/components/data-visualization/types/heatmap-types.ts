/**
 * Heatmap specific types
 */

import React from 'react';
import { BaseChartProps } from './base-chart-props';
import { ChartAxis } from './chart-config';

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