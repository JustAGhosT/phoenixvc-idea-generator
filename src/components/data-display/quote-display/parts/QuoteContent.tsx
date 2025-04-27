import { memo } from 'react';
import styles from '../QuoteDisplay.module.css';

export interface QuoteContentProps {
  /** The quote text to display */
  quote: string;
  /** Whether the quote is in a loading state */
  loading?: boolean;
  /** ID for accessibility */
  id?: string;
  /** Optional citation URL */
  citationUrl?: string;
}

export const QuoteContent = memo<QuoteContentProps>(({
  quote,
  loading = false,
  id,
  citationUrl
}) => {
  const blockquoteProps = {
    className: styles.quoteContent,
    id,
    cite: citationUrl
  };

  return (
    <blockquote {...blockquoteProps}>
      {loading ? (
        <div className={styles.loadingText}>
          <div className={styles.loadingLine} />
          <div className={styles.loadingLine} />
          <div className={styles.loadingLine} />
        </div>
      ) : (
        quote
      )}
    </blockquote>
  );
});

QuoteContent.displayName = 'QuoteContent';