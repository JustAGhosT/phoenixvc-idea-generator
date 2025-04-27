import React from 'react';
import { Axis, GridLines } from '../../core';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
// Import ChartAxis from the same place that the Axis component expects it
import { ChartAxis } from '../../types/index';

interface BarChartAxesProps {
  /** Series data to display */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
  /** Chart orientation */
  orientation: 'horizontal' | 'vertical';
  /** X-axis configuration */
  xAxis?: ChartAxis;
  /** Y-axis configuration */
  yAxis?: ChartAxis;
  /** Whether to show grid lines */
  showGridLines?: boolean;
  /** Number of grid lines to show */
  gridLineCount?: number;
}

/**
 * BarChartAxes component for rendering the axes and grid lines in a bar chart
 */
const BarChartAxes: React.FC<BarChartAxesProps> = ({
  series,
  width,
  height,
  maxValue,
  orientation,
  xAxis,
  yAxis,
  showGridLines = true,
  gridLineCount = 5,
}) => {
  if (!series || series.length === 0 || !series[0].data.length) {
    return null;
  }

  const isVertical = orientation === 'vertical';
  const primarySeries = series[0];
  const dataCount = primarySeries.data.length;

  return (
    <>
      {/* Grid lines */}
      {showGridLines && (
        <GridLines 
          type={isVertical ? 'y' : 'x'} 
          scale={(value: number) => isVertical 
            ? height - (value / maxValue) * height 
            : (value / maxValue) * width
          }
          width={width}
          height={height}
          tickCount={gridLineCount}
        />
      )}
      
      {/* Category axis (X for vertical, Y for horizontal) */}
      <Axis 
        type={isVertical ? 'x' : 'y'} 
        scale={(value: number) => isVertical 
          ? value * (width / dataCount) + (width / dataCount) / 2
          : value * (height / dataCount) + (height / dataCount) / 2
        }
        width={width}
        height={height}
        config={isVertical ? xAxis : yAxis}
        tickValues={primarySeries.data.map(d => d.label)}
        tickFormat={(value: string) => value}
      />
      
      {/* Value axis (Y for vertical, X for horizontal) */}
      <Axis 
        type={isVertical ? 'y' : 'x'} 
        scale={(value: number) => isVertical 
          ? height - (value / maxValue) * height
          : (value / maxValue) * width
        }
        width={width}
        height={height}
        config={isVertical ? yAxis : xAxis}
        showGrid={false}
      />
    </>
  );
};

export default BarChartAxes;