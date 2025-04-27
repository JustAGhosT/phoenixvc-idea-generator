import React from 'react';
import styles from './BarChart.module.css';

interface BarChartHeaderProps {
  title?: string;
  subtitle?: string;
}

const BarChartHeader: React.FC<BarChartHeaderProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;
  
  return (
    <div className={styles.headerContainer}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.description}>{subtitle}</p>}
    </div>
  );
};

export default BarChartHeader;