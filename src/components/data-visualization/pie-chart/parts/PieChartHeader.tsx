import React from 'react';
import styles from '../PieChart.module.css';

interface PieChartHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PieChartHeader: React.FC<PieChartHeaderProps> = ({
  title,
  subtitle,
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className={styles.header}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};