import React from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from '../BarChart.module.css';

interface BarChartItemProps {
  item: ChartDataPoint;
  index: number;
  series: ChartSeries<ChartDataPoint>;
  maxValue: number;
  color: string;
  formatValue: (value: number) => string;
  onBarClick: (dataPoint: ChartDataPoint, index: number, series: ChartSeries<ChartDataPoint>) => void;
  orientation: 'vertical' | 'horizontal';
}

const BarChartItem: React.FC<BarChartItemProps> = ({
  item,
  index,
  series,
  maxValue,
  color,
  formatValue,
  onBarClick,
  orientation
}) => {
  const handleClick = () => {
    onBarClick(item, index, series);
  };
  
  const isHorizontal = orientation === 'horizontal';
  const itemClassName = `${styles.barChartItem} ${isHorizontal ? styles.barChartHorizontal : ''}`;
  
  return (
    <div 
      className={itemClassName}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${item.label}: ${formatValue(item.value)}`}
    >
      <div className={styles.barChartHeader}>
        <span className={styles.barChartLabel}>{item.label}</span>
        <span className={styles.barChartValue}>{formatValue(item.value)}</span>
      </div>
      <div className={styles.barChartProgressContainer}>
        <div 
          className={`${styles.barChartProgressBar} ${styles[color]}`}
          style={{ width: `${(item.value / maxValue) * 100}%` }}
          role="progressbar"
          aria-valuenow={item.value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
        />
      </div>
    </div>
  );
};

export default BarChartItem;