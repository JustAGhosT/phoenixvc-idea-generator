import React from 'react';
import styles from '../PieChart.module.css';

export const PieChartNoData: React.FC = () => {
  return (
    <div className={styles.noData}>
      <p>No data available</p>
    </div>
  );
};