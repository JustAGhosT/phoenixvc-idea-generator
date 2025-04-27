import React from 'react';
import { DataPointTooltip } from '../../core/tooltip';
import { ChartTooltip } from '../../core/tooltip/ChartTooltip';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';

interface LineChartTooltipProps {
  /** Whether the tooltip is visible */
  visible: boolean;
  /** X position of the tooltip */
  x: number;
  /** Y position of the tooltip */
  y: number;
  /** Data point being hovered */
  dataPoint?: ChartDataPoint;
  /** Series the data point belongs to */
  series?: ChartSeries<ChartDataPoint>;
  /** Custom tooltip content */
  customContent?: React.ReactNode;
  /** Format function for values */
  formatValue?: (value: number) => string;
}

/**
 * LineChartTooltip component for rendering tooltips in a line chart
 */
const LineChartTooltip: React.FC<LineChartTooltipProps> = ({
  visible,
  x,
  y,
  dataPoint,
  series,
  customContent,
  formatValue = (value) => value.toString(),
}) => {
  // If custom content is provided, use that
  if (customContent) {
    return (
      <ChartTooltip
        visible={visible}
        x={x}
        y={y}
        content={customContent}
      />
    );
  }

  // If no data point, don't show tooltip
  if (!dataPoint) {
    return null;
  }

  // Default tooltip with data point info
  return (
    <ChartTooltip
      visible={visible}
      x={x}
      y={y}
      content={
        <DataPointTooltip
          dataPoint={dataPoint}
          series={series}
          formatValue={formatValue}
          showSeries={!!series}
          color={series?.color}
        />
      }
    />
  );
};

export default LineChartTooltip;