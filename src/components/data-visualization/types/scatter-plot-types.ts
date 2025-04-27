/**
 * Scatter Plot specific types
 */

import React from 'react';
import { BaseChartProps } from './base-chart-props';
import { ChartAxis } from './chart-config';

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