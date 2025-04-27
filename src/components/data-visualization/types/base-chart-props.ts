/**
 * Base chart props interface
 * 
 * This file defines the base props interface that all chart components extend.
 */

import React from 'react';
import { ChartDataPoint, ChartSeries, ExtendedChartDataPoint } from './base-types';
import {
  ChartAccessibility,
  ChartAnimation,
  ChartLegend,
  ChartMargin,
  ChartTooltip
} from './chart-config';

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