import { ChartDataPoint, ChartSeries } from '../../types/base-types';

/**
 * Process chart data into a standardized format
 */
export const processLineChartData = (
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
    console.error('Invalid data format provided to LineChart');
    processedSeries = [];
    maxVal = 100;
  }
  
  return { 
    series: processedSeries,
    maxValue: maxVal || 100 // Default to 100 if no data or all values are 0
  };
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

/**
 * Generate path data for a line
 */
export const generateLinePath = (
  data: ChartDataPoint[],
  width: number,
  height: number,
  maxValue: number,
  curved: boolean = false
): string => {
  if (!data || data.length === 0) return '';
  
  const dataCount = data.length;
  
  // Generate points
  const points = data.map((point, index) => {
    const x = index * (width / (dataCount - 1));
    const y = height - (point.value / maxValue) * height;
    return { x, y };
  });
  
  if (points.length === 1) {
    // If only one point, draw a small horizontal line
    const { x, y } = points[0];
    return `M${x - 1},${y} L${x + 1},${y}`;
  }
  
  // Generate path
  let path = `M${points[0].x},${points[0].y}`;
  
  if (curved) {
    // Curved line using cubic bezier curves
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Control points for the curve
      const controlX1 = current.x + (next.x - current.x) / 3;
      const controlY1 = current.y;
      const controlX2 = next.x - (next.x - current.x) / 3;
      const controlY2 = next.y;
      
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`;
    }
  } else {
    // Straight line segments
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x},${points[i].y}`;
    }
  }
  
  return path;
};

/**
 * Generate path data for an area under the line
 */
export const generateAreaPath = (
  data: ChartDataPoint[],
  width: number,
  height: number,
  maxValue: number,
  curved: boolean = false
): string => {
  if (!data || data.length === 0) return '';
  
  const dataCount = data.length;
  
  // Generate points
  const points = data.map((point, index) => {
    const x = index * (width / (dataCount - 1));
    const y = height - (point.value / maxValue) * height;
    return { x, y };
  });
  
  if (points.length === 1) {
    // If only one point, draw a small area
    const { x, y } = points[0];
    return `M${x - 1},${height} L${x - 1},${y} L${x + 1},${y} L${x + 1},${height} Z`;
  }
  
  // Start at the bottom left
  let path = `M${points[0].x},${height} L${points[0].x},${points[0].y}`;
  
  if (curved) {
    // Curved line using cubic bezier curves
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Control points for the curve
      const controlX1 = current.x + (next.x - current.x) / 3;
      const controlY1 = current.y;
      const controlX2 = next.x - (next.x - current.x) / 3;
      const controlY2 = next.y;
      
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`;
    }
  } else {
    // Straight line segments
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x},${points[i].y}`;
    }
  }
  
  // Complete the path back to the bottom
  path += ` L${points[points.length - 1].x},${height} Z`;
  
  return path;
};

export default {
  processLineChartData,
  formatValue,
  defaultColors,
  generateLinePath,
  generateAreaPath,
};