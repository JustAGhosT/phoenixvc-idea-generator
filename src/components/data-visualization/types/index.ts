/**
 * Chart types barrel file
 * 
 * This file exports all chart types from the various type files.
 */

// Base types
export * from './base-chart-props';
export * from './base-types';
export * from './chart-config';

// Chart-specific types
export * from './bar-chart-types';
export * from './funnel-chart-types';
export * from './gauge-chart-types';
export * from './heatmap-types';
export * from './line-chart-types';
export * from './pie-chart-types';
export * from './radar-chart-types';
export * from './scatter-plot-types';

// Add this to your types file or create it if it doesn't exist
export type AxisPosition = 'top' | 'right' | 'bottom' | 'left';

export interface ChartAxis {
  /** Whether the axis is visible */
  visible?: boolean;
  /** Axis title */
  title?: string;
  /** Function to format tick labels */
  formatLabel?: (value: any) => string;
  /** Whether to show the axis line */
  showLine?: boolean;
  /** Whether to show tick marks */
  showTicks?: boolean;
  /** Position of the axis */
  position?: AxisPosition;
}

// Add other types as needed