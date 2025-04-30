import { cn } from '@/utils/classnames';
import { memo } from 'react';
import styles from '../QuoteDisplay.module.css';

export interface StatCardDescriptionProps {
  /** Author of the quote */
  author?: string;
  /** Source of the quote */
  source?: string;
  /** Date of the quote */
  date?: string;
  /** Whether the quote is in a loading state */
  loading?: boolean;
  /** ID for accessibility */
  id?: string;
}

export const QuoteAttribution = memo<StatCardDescriptionProps>(({
  author,
  source,
  date,
  loading = false,
  id
}) => {
  if (loading) {
    return (
      <figcaption id={id} className={styles.quoteDisplayAttribution}>
        <div className={cn(styles.quoteDisplayLoadingLine, styles.quoteDisplayLoadingAuthor)} />
      </figcaption>
    );
  }
  
  return (
    <figcaption id={id} className={styles.quoteDisplayAttribution}>
      {author && <cite className={styles.quoteDisplayAuthor}>{author}</cite>}
      
      {(source || date) && (
        <div className={styles.quoteDisplaySource}>
          {source && <span className={styles.sourceText}>{source}</span>}
          {source && date && <span className={styles.quoteDisplaySeparator}>, </span>}
          {date && <span className={styles.quoteDisplayDate}>{date}</span>}
        </div>
      )}
    </figcaption>
  );
});

QuoteAttribution.displayName = 'QuoteAttribution';