import React from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from '../LineChart.module.css';
import { defaultColors, generateAreaPath, generateLinePath } from './LineChartUtils';

interface LineChartLinesProps {
  /** Series data to display */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
  /** Whether to show area under the lines */
  showArea?: boolean;
  /** Whether to use curved lines */
  curved?: boolean;
  /** Line width */
  lineWidth?: number;
  /** Whether to use gradient fills */
  useGradient?: boolean;
  /** Colors for the lines */
  colors?: string[];
}

/**
 * LineChartLines component for rendering the lines in a line chart
 */
const LineChartLines: React.FC<LineChartLinesProps> = ({
  series,
  width,
  height,
  maxValue,
  showArea = false,
  curved = false,
  lineWidth = 2,
  useGradient = false,
  colors = defaultColors,
}) => {
  if (!series || series.length === 0) {
    return null;
  }

  return (
    <g className={styles.lineChartLinesContainer}>
      {/* Define gradients if needed */}
      {useGradient && (
        <defs>
          {series.map((seriesItem, seriesIndex) => {
            const color = seriesItem.color || colors[seriesIndex % colors.length];
            return (
              <linearGradient
                key={`line-gradient-${seriesIndex}`}
                id={`line-gradient-${seriesIndex}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.2} />
              </linearGradient>
            );
          })}
        </defs>
      )}

      {/* Render areas first (if enabled) */}
      {showArea && series.map((seriesItem, seriesIndex) => {
        if (seriesItem.visible === false) return null;
        
        const color = seriesItem.color || colors[seriesIndex % colors.length];
        const areaPath = generateAreaPath(
          seriesItem.data,
          width,
          height,
          maxValue,
          curved
        );

        return (
          <path
            key={`area-${seriesIndex}`}
            className={styles.lineChartArea}
            d={areaPath}
            fill={useGradient ? `url(#line-gradient-${seriesIndex})` : color}
            opacity={0.2}
            data-testid={`line-area-${seriesItem.id || seriesIndex}`}
          />
        );
      })}

      {/* Render lines */}
      {series.map((seriesItem, seriesIndex) => {
        if (seriesItem.visible === false) return null;
        
        const color = seriesItem.color || colors[seriesIndex % colors.length];
        const linePath = generateLinePath(
          seriesItem.data,
          width,
          height,
          maxValue,
          curved
        );

        return (
          <path
            key={`line-${seriesIndex}`}
            className={styles.lineChartLine}
            d={linePath}
            stroke={color}
            strokeWidth={lineWidth}
            strokeDasharray={seriesItem.dashPattern || 'none'}
            fill="none"
            data-series={seriesItem.name}
            data-testid={`line-path-${seriesItem.id || seriesIndex}`}
          />
        );
      })}
    </g>
  );
};

export default LineChartLines;