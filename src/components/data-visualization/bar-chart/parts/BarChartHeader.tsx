import React from 'react';
import styles from '../BarChart.module.css';

interface BarChartHeaderProps {
  title?: string;
  subtitle?: string;
}

const BarChartHeader: React.FC<BarChartHeaderProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;
  
  return (
    <div className={styles.barChartHeaderContainer}>
      {title && <h3 className={styles.barChartTitle}>{title}</h3>}
      {subtitle && <p className={styles.barChartDescription}>{subtitle}</p>}
    </div>
  );
};

export default BarChartHeader;