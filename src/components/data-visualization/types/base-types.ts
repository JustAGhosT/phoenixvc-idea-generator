/**
 * Base chart data types
 * 
 * This file defines the fundamental data structures used across all chart components.
 */

import React from 'react';

/**
 * Basic data point interface for charts
 */
export interface ChartDataPoint {
  /** Unique identifier for the data point */
  id?: string;
  /** The label for this data point */
  label: string;
  /** The value for this data point */
  value: number;
  /** Optional color for this data point */
  color?: string;
  /** Calculated percentage of total (set by chart components) */
  percentage?: number;
}

/**
 * Extended data point with optional properties
 */
export interface ExtendedChartDataPoint extends ChartDataPoint {
  /** Optional tooltip content for this data point */
  tooltip?: string | React.ReactNode;
  /** Optional flag to highlight this data point */
  highlighted?: boolean;
  /** Optional metadata for this data point */
  metadata?: Record<string, any>;
}

/**
 * Radar chart specific data point
 */
export interface RadarChartDataPoint {
  /** The axis identifier for this data point */
  axis: string;
  /** The value for this data point */
  value: number;
  /** Optional tooltip content */
  tooltip?: string | React.ReactNode;
}

/**
 * Series data for multi-series charts (line, bar)
 */
export interface ChartSeries<T = ChartDataPoint> {
  /** Unique identifier for the series */
  id: string;
  /** Display name for the series */
  name: string;
  /** Data points in this series */
  data: T[];
  /** Optional color for the series */
  color?: string;
  /** Whether this series is visible */
  visible?: boolean;
  /** Optional dash pattern for line charts */
  dashPattern?: string;
  /** Optional line/bar thickness */
  thickness?: number;
  /** Optional opacity for the series */
  opacity?: number;
}