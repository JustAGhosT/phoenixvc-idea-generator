import React from 'react';
import { ChartLegend } from '../../core/legend';
import { ChartSeries } from '../../types/base-types';

interface LineChartLegendProps {
  /** Series data to display in the legend */
  series: ChartSeries[];
  /** Colors for the series */
  colors: string[];
  /** Legend position */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Legend layout */
  layout?: 'horizontal' | 'vertical';
  /** Whether items can be toggled */
  interactive?: boolean;
  /** Maximum number of items to show before scrolling */
  maxItems?: number;
  /** Callback when a series is toggled */
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * LineChartLegend component for displaying series information
 */
const LineChartLegend: React.FC<LineChartLegendProps> = ({
  series,
  colors,
  position = 'bottom',
  layout = 'horizontal',
  interactive = true,
  maxItems,
  onSeriesToggle,
  className = '',
}) => {
  return (
    <ChartLegend
      series={series}
      colors={colors}
      position={position}
      layout={layout}
      interactive={interactive}
      maxItems={maxItems}
      symbolType="line"
      onSeriesToggle={onSeriesToggle}
      className={className}
    />
  );
};

export default LineChartLegend;