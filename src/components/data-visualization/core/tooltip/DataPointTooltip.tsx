import React from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from './Tooltip.module.css';

export interface DataPointTooltipProps {
  /** The data point to display */
  dataPoint: ChartDataPoint;
  /** The series the data point belongs to */
  series?: ChartSeries;
  /** Format function for the value */
  formatValue?: (value: number) => string;
  /** Whether to show the series name */
  showSeries?: boolean;
  /** Color of the data point */
  color?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * DataPointTooltip component for displaying information about a specific data point
 */
export const DataPointTooltip: React.FC<DataPointTooltipProps> = ({
  dataPoint,
  series,
  formatValue = (value) => String(value),
  showSeries = true,
  color,
  className = '',
}) => {
  return (
    <div className={`${styles.tooltipDataPointTooltip} ${className}`}>
      {color && (
        <div 
          className={styles.tooltipColorIndicator} 
          style={{ backgroundColor: color }}
        />
      )}
      <div className={styles.tooltipContent}>
        <h4 className={styles.tooltipTitle}>{dataPoint.label}</h4>
        <div className={styles.tooltipBody}>
          {showSeries && series && (
            <div className={styles.tooltipSeriesName}>{series.name}: </div>
          )}
          <div className={styles.tooltipValue}>
            {formatValue(dataPoint.value)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPointTooltip;