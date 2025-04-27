import React from 'react';
import { Legend, LegendItem } from '../../core/Legend';
import { ChartSeries } from '../../types/base-types';
interface BarChartLegendProps {
  series: ChartSeries[];
  colors: string[];
  position?: 'top' | 'right' | 'bottom' | 'left';
  layout?: 'horizontal' | 'vertical';
  interactive?: boolean;
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
}

const BarChartLegend: React.FC<BarChartLegendProps> = ({
  series,
  colors,
  position = 'bottom',
  layout = 'horizontal',
  interactive = true,
  onSeriesToggle,
}) => {
  if (series.length <= 1) return null;
  
  // Convert series to legend items
  const legendItems: LegendItem[] = series.map((item, index) => ({
    id: item.id,
    name: item.name,
    color: colors[index % colors.length],
    visible: item.visible,
    symbol: 'square'
  }));
  
  return (
    <Legend
      items={legendItems}
      position={position}
      layout={layout}
      interactive={interactive}
      onItemToggle={onSeriesToggle}
          />
  );
};

export default BarChartLegend;