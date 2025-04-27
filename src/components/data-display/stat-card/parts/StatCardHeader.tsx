import React, { memo } from 'react';
import styles from '../StatCard.module.css';

export interface StatCardHeaderProps {
  /** Title of the stat card */
  title: string;
  /** ID for accessibility */
  titleId: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Heading level for the title (default is h3) */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const StatCardHeader = memo<StatCardHeaderProps>(({
  title,
  titleId,
  icon,
  headingLevel = 'h3'
}) => {
  // Dynamically create the heading element based on headingLevel
  const Heading = headingLevel;
  
  return (
    <header className={styles.header}>
      <Heading id={titleId} className={styles.title}>{title}</Heading>
      {icon && <div className={styles.iconContainer} aria-hidden="true">{icon}</div>}
    </header>
  );
});

StatCardHeader.displayName = 'StatCardHeader';