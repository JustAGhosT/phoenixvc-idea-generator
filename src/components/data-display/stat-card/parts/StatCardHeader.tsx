import React, { memo } from 'react';
import styles from '../StatCard.module.css';

export interface StatCardHeaderProps {
  /** Title of the stat card */
  title: string;
  /** ID for accessibility */
  titleId: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
}

export const StatCardHeader = memo<StatCardHeaderProps>(({
  title,
  titleId,
  icon
}) => {
  return (
    <div className={styles.header}>
      <h3 id={titleId} className={styles.title}>{title}</h3>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
    </div>
  );
});

StatCardHeader.displayName = 'StatCardHeader';