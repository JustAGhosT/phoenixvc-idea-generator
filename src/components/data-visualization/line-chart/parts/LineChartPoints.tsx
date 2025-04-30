import React from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from '../LineChart.module.css';
import { defaultColors } from './LineChartUtils';

interface LineChartPointsProps {
  /** Series data to display */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
  /** Radius of the points */
  pointRadius?: number;
  /** Colors for the points */
  colors?: string[];
  /** Callback when a point is clicked */
  onPointClick?: (dataPoint: ChartDataPoint, index: number, series: ChartSeries<ChartDataPoint>) => void;
  /** Callback when mouse enters a point */
  onPointMouseEnter?: (event: React.MouseEvent, dataPoint: ChartDataPoint, series: ChartSeries<ChartDataPoint>) => void;
  /** Callback when mouse leaves a point */
  onPointMouseLeave?: (event: React.MouseEvent) => void;
}

/**
 * LineChartPoints component for rendering the data points in a line chart
 */
const LineChartPoints: React.FC<LineChartPointsProps> = ({
  series,
  width,
  height,
  maxValue,
  pointRadius = 4,
  colors = defaultColors,
  onPointClick,
  onPointMouseEnter,
  onPointMouseLeave,
}) => {
  if (!series || series.length === 0) {
    return null;
  }

  return (
    <g className={styles.pointsContainer}>
      {series.map((seriesItem, seriesIndex) => {
        const color = colors[seriesIndex % colors.length];
        
        return seriesItem.data.map((dataPoint, dataIndex) => {
          const x = dataIndex * (width / (seriesItem.data.length - 1));
          const y = height - (dataPoint.value / maxValue) * height;
          
          return (
            <circle
              key={`point-${seriesIndex}-${dataIndex}`}
              className={styles.lineChartPoint}
              cx={x}
              cy={y}
              r={pointRadius}
              fill={color}
              stroke="white"
              strokeWidth={1}
              onClick={() => onPointClick?.(dataPoint, dataIndex, seriesItem)}
              onMouseEnter={(e) => onPointMouseEnter?.(e, dataPoint, seriesItem)}
              onMouseLeave={onPointMouseLeave}
              data-label={dataPoint.label}
              data-value={dataPoint.value}
              data-series={seriesItem.name}
            />
          );
        });
      })}
    </g>
  );
};

export default LineChartPoints;