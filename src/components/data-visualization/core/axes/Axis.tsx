import React from 'react';
import { ChartAxis } from '../../types';
import styles from './Axis.module.css';
import { AxisLine, AxisTitle } from './parts';
import AxisTick from './parts/AxisTick';

export type AxisPosition = 'top' | 'right' | 'bottom' | 'left';

export interface AxisProps {
  /** Type of axis (x or y) */
  type: 'x' | 'y';
  /** Scale function that converts domain values to pixel values */
  scale: any; // This can be a d3 scale function or a simple function
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Axis configuration */
  config?: ChartAxis;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Custom tick values */
  tickValues?: any[];
  /** Number of ticks to display */
  tickCount?: number;
  /** Custom tick format function */
  tickFormat?: (value: any) => string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Axis component for rendering X and Y axes with ticks and labels
 */
export const Axis: React.FC<AxisProps> = ({
  type,
  scale,
  width,
  height,
  config = {},
  showGrid = false,
  tickValues,
  tickCount = 5,
  tickFormat,
  className = '',
}) => {
  const {
    visible = true,
    title,
    formatLabel,
    showLine = true,
    showTicks = true,
    position = type === 'x' ? 'bottom' : 'left',
  } = config;

  if (!visible) return null;

  // Generate tick values if not provided
  // Check if scale is a D3 scale object with domain and ticks methods
  const isD3Scale = typeof scale === 'function' && 
                    typeof scale.domain === 'function' && 
                    typeof scale.ticks === 'function';
  
  // Use tickValues if provided, otherwise generate them
  const ticks = tickValues || (isD3Scale 
    ? scale.ticks(tickCount) 
    : Array.from({ length: tickCount }, (_, i) => i * (100 / (tickCount - 1))));

  // Format tick labels
  const format = formatLabel || tickFormat || (value => String(value));

  // Calculate positions based on axis type and position
  const isXAxis = type === 'x';
  const axisPosition = isXAxis 
    ? position === 'top' ? 0 : height
    : position === 'right' ? width : 0;

  return (
    <g 
      className={`${styles.axis} ${styles[type]} ${className}`}
      transform={isXAxis ? `translate(0, ${axisPosition})` : `translate(${axisPosition}, 0)`}
    >
      {/* Main axis line */}
      {showLine && (
        <AxisLine
          isXAxis={isXAxis}
          width={width}
          height={height}
        />
      )}

      {/* Ticks and labels */}
      {showTicks && ticks.map((tick: any, i: number) => {
        // Apply scale function to get position
        const tickPosition = typeof scale === 'function' ? scale(tick) : 0;
        
        return (
          <AxisTick
            key={`${type}-tick-${i}`}
            isXAxis={isXAxis}
            position={tickPosition}
            value={tick}
            format={format}
            showGrid={showGrid}
            width={width}
            height={height}
          />
        );
      })}

      {/* Axis title */}
      {title && (
        <AxisTitle
          title={title}
          isXAxis={isXAxis}
          width={width}
          height={height}
        />
      )}
    </g>
  );
};

export default Axis;