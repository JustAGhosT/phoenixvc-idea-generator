import React from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from './Tooltip.module.css';

export interface MultiSeriesDataPointTooltipProps {
  /** Label for the data point (usually x-axis value) */
  label: string;
  /** Array of series data to display */
  seriesData: Array<{
    series: ChartSeries;
    dataPoint: ChartDataPoint;
    color: string;
  }>;
  /** Format function for values */
  formatValue?: (value: number) => string;
  /** Additional CSS class */
  className?: string;
}

/**
 * MultiSeriesDataPointTooltip component for displaying information about multiple series at a data point
 */
export const MultiSeriesDataPointTooltip: React.FC<MultiSeriesDataPointTooltipProps> = ({
  label,
  seriesData,
  formatValue = (value) => String(value),
  className = '',
}) => {
  return (
    <div className={`${styles.tooltipMultiSeriesDataPointTooltip} ${className}`}>
      <h4 className={styles.tooltipTitle}>{label}</h4>
      <div className={styles.tooltipBody}>
        {seriesData.map((item, index) => (
          <div key={`series-${index}`} className={styles.tooltipSeriesItem}>
            <div 
              className={styles.tooltipColorIndicator} 
              style={{ backgroundColor: item.color }}
            />
            <div className={styles.tooltipSeriesName}>{item.series.name}:</div>
            <div className={styles.tooltipValue}>
              {formatValue(item.dataPoint.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSeriesDataPointTooltip;