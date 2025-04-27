import { ChartDataPoint, ExtendedChartDataPoint } from '../../types/base-types';

// Default colors for pie slices
const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#14b8a6', // teal
  '#6366f1', // indigo
  '#a855f7', // violet
  '#64748b', // slate
];

// Extended data type for pie chart with calculated angles and percentages
export interface PieChartData extends ExtendedChartDataPoint {
  id: string;
  name?: string;
  startAngle: number;
  angle: number;
  percentage: number;
  visible?: boolean;
}

interface PieChartOptions {
  sortSlices?: boolean;
  startAngle?: number;
  endAngle?: number;
  padAngle?: number;
}

/**
 * Type guard to check if item is an ExtendedChartDataPoint
 */
function isExtendedDataPoint(item: ChartDataPoint | ExtendedChartDataPoint): item is ExtendedChartDataPoint {
  return 'color' in item;
}

/**
 * Calculate pie chart data with angles and percentages
 */
export const calculatePieData = (
  data: ChartDataPoint[] | ExtendedChartDataPoint[],
  options: PieChartOptions = {}
): PieChartData[] => {
  const {
    sortSlices = true,
    startAngle = 0,
    endAngle = 360,
    padAngle = 0,
  } = options;

  // Filter out negative or zero values
  const validData = data.filter(item => item.value > 0);
  
  if (validData.length === 0) return [];
  
  // Calculate total value
  const total = validData.reduce((sum, item) => sum + item.value, 0);
  
  // Sort data by value if needed
  const sortedData = sortSlices
    ? [...validData].sort((a, b) => b.value - a.value)
    : validData;
  
  // Calculate available angle range
  const availableAngle = endAngle - startAngle;
  const totalPadding = padAngle * (sortedData.length - 1);
  const effectiveAngle = availableAngle - totalPadding;
  
  // Calculate angles and percentages
  let currentAngle = startAngle;
  return sortedData.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * effectiveAngle;
    
    // Check if item has color property (is ExtendedChartDataPoint)
    const itemColor = isExtendedDataPoint(item) ? item.color : undefined;
    
    // Create pie data object
    const pieData: PieChartData = {
      ...item,
      id: 'id' in item ? (item as any).id : `slice-${index}`,
      name: 'name' in item ? (item as any).name : item.label,
      startAngle: currentAngle,
      angle,
      percentage,
      color: itemColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      visible: 'visible' in item ? (item as any).visible !== false : true,
    };
    
    // Update current angle for next slice
    currentAngle += angle + padAngle;
    
    return pieData;
  });
};