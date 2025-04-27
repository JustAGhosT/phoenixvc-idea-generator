/**
 * Chart configuration interfaces
 * 
 * This file defines configuration interfaces used across chart components.
 */

import React from 'react';
import { ChartDataPoint, ChartSeries, ExtendedChartDataPoint } from './base-types';

/**
 * Axis configuration
 */
export interface ChartAxis {
  /** Show or hide the axis */
  visible?: boolean;
  /** Axis title */
  title?: string;
  /** Format function for axis labels */
  formatLabel?: (value: any) => string;
  /** Minimum value (for numerical axes) */
  min?: number;
  /** Maximum value (for numerical axes) */
  max?: number;
  /** Step size between ticks */
  step?: number;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show axis line */
  showLine?: boolean;
  /** Whether to show ticks */
  showTicks?: boolean;
  /** Custom tick values */
  tickValues?: any[];
  /** Position of the axis */
  position?: 'start' | 'end' | 'center';
}

/**
 * Legend configuration
 */
export interface ChartLegend {
  /** Show or hide the legend */
  visible?: boolean;
  /** Position of the legend */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Legend layout */
  layout?: 'horizontal' | 'vertical';
  /** Whether items can be clicked to toggle visibility */
  interactive?: boolean;
  /** Maximum number of items to show before scrolling */
  maxItems?: number;
  /** Custom formatter for legend items */
  formatItem?: (name: string, color: string) => React.ReactNode;
}

/**
 * Tooltip configuration
 */
export interface ChartTooltip {
  /** Show or hide tooltips */
  visible?: boolean;
  /** Tooltip position strategy */
  position?: 'pointer' | 'element' | 'fixed';
  /** Format function for tooltip content */
  formatter?: (dataPoint: ChartDataPoint | ExtendedChartDataPoint, series?: ChartSeries) => React.ReactNode;
  /** Delay before showing tooltip (ms) */
  showDelay?: number;
  /** Delay before hiding tooltip (ms) */
  hideDelay?: number;
  /** Whether to follow the pointer */
  followPointer?: boolean;
  /** Whether to show shared tooltip for all series at same x value */
  shared?: boolean;
}

/**
 * Animation configuration
 */
export interface ChartAnimation {
  /** Whether to animate the chart */
  enabled?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Animation easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  /** Whether to animate on data updates */
  animateOnUpdate?: boolean;
  /** Delay between series animations (ms) */
  seriesDelay?: number;
}

/**
 * Accessibility configuration
 */
export interface ChartAccessibility {
  /** Whether to enable keyboard navigation */
  keyboardNavigation?: boolean;
  /** Description of the chart for screen readers */
  description?: string;
  /** Whether to announce data point values */
  announceDataPoints?: boolean;
  /** Custom announcement formatter */
  announceFormatter?: (dataPoint: ChartDataPoint | ExtendedChartDataPoint) => string;
}

/**
 * Margin configuration
 */
export interface ChartMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * Chart theme configuration
 */
export interface ChartTheme {
  /** Base font family */
  fontFamily?: string;
  /** Text color */
  textColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Grid line color */
  gridColor?: string;
  /** Axis line color */
  axisColor?: string;
  /** Default series colors */
  colors?: string[];
  /** Title text styles */
  title?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: string | number;
  };
  /** Subtitle text styles */
  subtitle?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: string | number;
  };
  /** Legend styles */
  legend?: {
    fontSize?: number;
    color?: string;
    itemMargin?: string | number;
  };
  /** Tooltip styles */
  tooltip?: {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    boxShadow?: string;
    color?: string;
    fontSize?: number;
    padding?: string | number;
  };
  /** Data label styles */
  dataLabels?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
  };
}

/**
 * Chart context for theme and shared configuration
 */
export interface ChartContextValue {
  /** Chart theme */
  theme: ChartTheme;
  /** Whether animations are enabled globally */
  animationsEnabled: boolean;
  /** Whether to use responsive sizing */
  responsive: boolean;
  /** Default color palette */
  colorPalette: string[];
  /** Whether to use high contrast mode */
  highContrast: boolean;
  /** Locale for number formatting */
  locale: string;
  /** Update the chart context */
  updateContext: (updates: Partial<Omit<ChartContextValue, 'updateContext'>>) => void;
}