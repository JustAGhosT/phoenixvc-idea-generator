export interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: any;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface BaseChartProps {
  height?: number | string;
  width?: number | string;
  title?: string;
  description?: string;
  series: ChartSeries[];
  colors?: string[];
  formatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}