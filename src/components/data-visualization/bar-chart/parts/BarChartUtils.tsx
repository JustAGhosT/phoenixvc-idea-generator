import { ChartDataPoint, ChartSeries } from '../../types/base-types';

/**
 * Process chart data into a standardized format
 */
export const processBarChartData = (
  data: any[] | ChartSeries<ChartDataPoint>[]
): { 
  series: ChartSeries<ChartDataPoint>[];
  maxValue: number;
} => {
  // Check if data is an array of data points or series
  const isDataPoint = Array.isArray(data) && 
    data.length > 0 && 
    'label' in data[0] && 
    'value' in data[0];
  
  const isSeries = Array.isArray(data) && 
    data.length > 0 && 
    'id' in data[0] && 
    'name' in data[0] && 
    'data' in data[0];
  
  let processedSeries: ChartSeries<ChartDataPoint>[] = [];
  let maxVal = 0;
  
  if (isDataPoint) {
    // Data is an array of data points, create a single series
    const dataPoints = data as ChartDataPoint[];
    processedSeries = [{
      id: 'default',
      name: 'Default',
      data: dataPoints
    }];
    
    // Find max value
    dataPoints.forEach(point => {
      if (point.value > maxVal) maxVal = point.value;
    });
  } 
  else if (isSeries) {
    // Data is already in series format
    processedSeries = data as ChartSeries<ChartDataPoint>[];
    
    // Find max value across all series
    processedSeries.forEach(series => {
      series.data.forEach(point => {
        if (point.value > maxVal) maxVal = point.value;
      });
    });
  }
  else {
    // Invalid data format
    console.error('Invalid data format provided to BarChart');
    processedSeries = [];
    maxVal = 100;
  }
  
  return { 
    series: processedSeries,
    maxValue: maxVal || 100 // Default to 100 if no data or all values are 0
  };
};

/**
 * Get the maximum value for a chart, considering stacking if enabled
 */
export const getMaxValue = (
  series: ChartSeries<ChartDataPoint>[],
  stacked: boolean
): number => {
  if (!series || series.length === 0) {
    return 100;
  }
  
  if (!stacked || series.length === 1) {
    // Find the maximum value across all series
    let maxVal = 0;
    series.forEach(seriesItem => {
      seriesItem.data.forEach(point => {
        if (point.value > maxVal) maxVal = point.value;
      });
    });
    return maxVal || 100;
  }
  
  // For stacked bars, find the maximum sum of values at each data point
  const primarySeries = series[0];
  const dataCount = primarySeries.data.length;
  
  let maxVal = 0;
  
  // For each data point position
  for (let i = 0; i < dataCount; i++) {
    let sum = 0;
    
    // Sum the values from each series at this position
    series.forEach(seriesItem => {
      if (i < seriesItem.data.length) {
        sum += seriesItem.data[i].value || 0;
      }
    });
    
    if (sum > maxVal) maxVal = sum;
  }
  
  return maxVal || 100;
};

/**
 * Default formatter for values
 */
export const formatValue = (value: number): string => {
  if (typeof value !== 'number') return '';
  
  // Format large numbers
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  
  return value.toString();
};

/**
 * Default chart colors
 */
export const defaultColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#8b5cf6', // purple
  '#f97316', // orange
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#f59e0b', // amber
  '#6366f1', // indigo
  '#84cc16', // lime
];

export default {
  processBarChartData,
  getMaxValue,
  formatValue,
  defaultColors,
};