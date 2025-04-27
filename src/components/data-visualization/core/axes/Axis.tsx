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
  scale: any; // This would typically be a d3 scale function
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
  const ticks = tickValues || (scale.ticks ? scale.ticks(tickCount) : scale.domain());

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
        const tickPosition = scale(tick);
        
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