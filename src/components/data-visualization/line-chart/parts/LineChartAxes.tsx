import React from 'react';
import { Axis, GridLines } from '../../core';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import { ChartAxis } from '../../types/index';

interface LineChartAxesProps {
  /** Series data to display */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
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
 * LineChartAxes component for rendering the axes and grid lines in a line chart
 */
const LineChartAxes: React.FC<LineChartAxesProps> = ({
  series,
  width,
  height,
  maxValue,
  xAxis,
  yAxis,
  showGridLines = true,
  gridLineCount = 5,
}) => {
  if (!series || series.length === 0 || !series[0].data.length) {
    return null;
  }

  const primarySeries = series[0];
  const dataCount = primarySeries.data.length;

  return (
    <>
      {/* Grid lines */}
      {showGridLines && (
        <GridLines 
          type="y"
          scale={(value: number) => height - (value / maxValue) * height}
          width={width}
          height={height}
          tickCount={gridLineCount}
        />
      )}
      
      {/* X-axis (categories) */}
      <Axis 
        type="x"
        scale={(value: number) => value * (width / (dataCount - 1))}
        width={width}
        height={height}
        config={xAxis}
        tickValues={primarySeries.data.map(d => d.label)}
        tickFormat={(value: string) => value}
      />
      
      {/* Y-axis (values) */}
      <Axis 
        type="y"
        scale={(value: number) => height - (value / maxValue) * height}
        width={width}
        height={height}
        config={yAxis}
        showGrid={false}
      />
    </>
  );
};

export default LineChartAxes;