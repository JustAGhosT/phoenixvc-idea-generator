import React from 'react';
import styles from '../LineChart.module.css';

interface LineChartHeaderProps {
  title?: string;
  subtitle?: string;
}

const LineChartHeader: React.FC<LineChartHeaderProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;
  
  return (
    <div className={styles.lineChartHeaderContainer}>
      {title && <h3 className={styles.lineChartTitle}>{title}</h3>}
      {subtitle && <p className={styles.lineChartDescription}>{subtitle}</p>}
    </div>
  );
};

export default LineChartHeader;