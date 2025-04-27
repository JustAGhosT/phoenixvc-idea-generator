/**
 * Gauge Chart specific types
 */

import { BaseChartProps } from './base-chart-props';

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