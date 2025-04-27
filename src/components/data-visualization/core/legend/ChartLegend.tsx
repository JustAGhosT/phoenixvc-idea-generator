import React from 'react';
import { ChartSeries } from '../../types/base-types';
import Legend from './Legend';
import { LegendItemProps } from './LegendItem';

export interface ChartLegendProps {
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
  /** Symbol type to use for legend items */
  symbolType?: 'square' | 'circle' | 'line' | 'triangle' | 'bar';
  /** Custom formatter for legend items */
  formatItem?: (item: Omit<LegendItemProps, 'onToggle'>) => React.ReactNode;
  /** Callback when a series is toggled */
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * ChartLegend component for displaying series information for any chart type
 */
export const ChartLegend: React.FC<ChartLegendProps> = ({
  series,
  colors,
  position = 'bottom',
  layout = 'horizontal',
  interactive = true,
  maxItems,
  symbolType = 'square',
  formatItem,
  onSeriesToggle,
  className = '',
}) => {
  if (series.length <= 1) return null;
  
  // Convert series to legend items
  const legendItems = series.map((item, index) => ({
    id: item.id,
    name: item.name,
    color: item.color || colors[index % colors.length],
    visible: item.visible !== false, // Default to visible if not specified
    symbol: symbolType,
    dashPattern: item.dashPattern
  }));
  
  return (
    <Legend
      items={legendItems}
      position={position}
      layout={layout}
      interactive={interactive}
      maxItems={maxItems}
      formatItem={formatItem}
      onItemToggle={onSeriesToggle}
      className={className}
    />
  );
};

export default ChartLegend;