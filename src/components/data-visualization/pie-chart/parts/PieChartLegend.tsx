import React, { memo } from 'react';
import styles from '../PieChart.module.css';
import { PieChartData } from './PieChartUtils';

interface PieChartLegendProps {
  data: PieChartData[];
  position: 'top' | 'right' | 'bottom' | 'left';
  layout: 'horizontal' | 'vertical';
  interactive?: boolean;
  onToggle?: (id: string, visible: boolean) => void;
}

// Using React.memo to prevent unnecessary re-renders
export const PieChartLegend: React.FC<PieChartLegendProps> = memo(({
  data,
  position = 'bottom',
  layout = 'horizontal',
  interactive = true,
  onToggle,
}) => {
  // Handle legend item click with debouncing
  const handleLegendItemClick = (id: string, currentVisible: boolean) => {
    if (interactive && onToggle) {
      onToggle(id, !currentVisible);
    }
  };

  // Position-based container class
  const containerClass = `${styles.pieChartLegendContainer} ${styles[`legend${position.charAt(0).toUpperCase() + position.slice(1)}`]} ${styles[layout]}`;

  return (
    <div className={containerClass}>
      {data.map((item, index) => (
        <div
          key={`legend-${index}-${item.id || item.label}`}
          className={styles.pieChartLegendItem}
          onClick={() => handleLegendItemClick(item.id || item.label, item.visible !== false)}
          style={{ opacity: item.visible === false ? 0.5 : 1 }}
          role={interactive ? 'button' : 'presentation'}
          tabIndex={interactive ? 0 : undefined}
          aria-pressed={interactive ? item.visible !== false : undefined}
        >
          <div
            className={styles.pieChartLegendColor}
            style={{ backgroundColor: item.color }}
          />
          <span className={styles.pieChartLegendLabel}>
            {item.name || item.label}
            {item.percentage !== undefined && 
              ` (${(item.percentage * 100).toFixed(1)}%)`}
          </span>
        </div>
      ))}
    </div>
  );
});

// Display name for debugging
PieChartLegend.displayName = 'PieChartLegend';