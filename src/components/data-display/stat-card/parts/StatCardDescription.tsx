import { memo } from 'react';
import styles from '../StatCard.module.css';

export interface StatCardDescriptionProps {
  /** Description text */
  description: string;
  /** ID for accessibility */
  descriptionId: string;
}

export const StatCardDescription = memo<StatCardDescriptionProps>(({
  description,
  descriptionId
}) => {
  return (
    <p id={descriptionId} className={styles.description}>
      {description}
    </p>
  );
});

StatCardDescription.displayName = 'StatCardDescription';