/**
 * QuoteDisplay component
 * 
 * A component for displaying quotes, testimonials, or pull quotes with attribution and styling options.
 * 
 * @example
 * ```tsx
 * <QuoteDisplay 
 *   quote="The best way to predict the future is to invent it." 
 *   author="Alan Kay"
 *   source="1971 meeting"
 *   variant="primary"
 * />
 * ```
 */

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/classnames';
import { QuoteIcon } from 'lucide-react';
import React, { memo, useCallback, useId } from 'react';
import styles from './QuoteDisplay.module.css';
import { QuoteAttribution, QuoteContent } from './parts';

/**
 * Supported color variants for the QuoteDisplay
 */
export type QuoteDisplayVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * Supported size variants for the QuoteDisplay
 */
export type QuoteDisplaySize = 'sm' | 'md' | 'lg';

/**
 * Supported layout variants for the QuoteDisplay
 */
export type QuoteDisplayLayout = 'default' | 'centered' | 'bordered' | 'minimal';

/**
 * Map of icon identifiers to component names
 */
export type QuoteIconIdentifier = 'quote' | 'quote-alt' | 'testimonial' | 'message' | 'chat' | 'speech';
/**
 * Props for the QuoteDisplay component
 */
export interface QuoteDisplayProps {
  /** The quote text to display */
  quote: string;
  /** The person or entity who said or wrote the quote */
  author?: string;
  /** The source of the quote (book, speech, etc.) */
  source?: string;
  /** Optional date of the quote */
  date?: string;
  /** Color variant for the quote */
  variant?: QuoteDisplayVariant;
  /** Size variant for the quote */
  size?: QuoteDisplaySize;
  /** Layout style for the quote */
  layout?: QuoteDisplayLayout;
  /** Whether to show the quote icon */
  showIcon?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom icon to display instead of the default quote icon (string identifier or React node) */
  icon?: QuoteIconIdentifier | React.ReactNode;
  /** Whether the quote is in a loading state */
  loading?: boolean;
  /** Optional click handler for interactive quotes */
  onClick?: () => void;
  /** Optional tooltip content */
  tooltipContent?: React.ReactNode;
  /** Optional animation effect */
  animation?: 'none' | 'fadeIn' | 'scaleIn';
  /** Optional language of the quote (for proper typography) */
  lang?: string;
  /** Optional accessible label for screen readers */
  ariaLabel?: string;
  /** Optional citation URL */
  citationUrl?: string;
}

/**
 * QuoteDisplay component for displaying quotes and testimonials
 */
export const QuoteDisplay = memo<QuoteDisplayProps>(({
  quote,
  author,
  source,
  date,
  variant = 'default',
  size = 'md',
  layout = 'default',
  showIcon = true,
  className,
  icon,
  loading = false,
  onClick,
  tooltipContent,
  animation = 'none',
  lang,
  ariaLabel,
  citationUrl,
}) => {
  // Generate unique IDs for accessibility
  const quoteId = useId();
  const attributionId = useId();
  
  // Determine if the quote is interactive
  const isInteractive = !!onClick;
  
  // Build the CSS class names
  const quoteClasses = cn(
    styles.quoteDisplay,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`size${size.toUpperCase()}`],
    styles[`layout${layout.charAt(0).toUpperCase() + layout.slice(1)}`],
    loading && styles.loading,
    isInteractive && styles.quoteDisplayInteractive,
    animation !== 'none' && styles[animation],
    className
  );
  
  // Handle keyboard interaction for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  }, [isInteractive, onClick]);
  
  // Determine the icon to display
  const quoteIcon = React.useMemo(() => {
    if (!showIcon) return null;
    
    if (typeof icon === 'string') {
      // Handle string icon identifiers
      switch (icon) {
        case 'quote-alt':
          return <span className={styles.iconAlt}>"</span>;
        case 'testimonial':
          return <span className={styles.testimonialIcon}>★</span>;
        case 'message':
          return <span className={styles.messageIcon}>💬</span>;
        case 'chat':
          return <span className={styles.chatIcon}>🗨️</span>;
        case 'speech':
          return <span className={styles.speechIcon}>🗣️</span>;
        case 'quote':
        default:
          return <QuoteIcon className={styles.quoteDisplayIcon} />;
      }
    }
    
    return icon || <QuoteIcon className={styles.quoteDisplayIcon} />;
  }, [icon, showIcon]);
  
  // ARIA attributes for accessibility
  const ariaAttributes = {
    role: isInteractive ? 'button' : undefined,
    tabIndex: isInteractive ? 0 : undefined,
    onClick: isInteractive ? onClick : undefined,
    onKeyDown: isInteractive ? handleKeyDown : undefined,
    'aria-busy': loading,
    'aria-labelledby': ariaLabel ? undefined : `${quoteId} ${attributionId}`,
    'aria-label': ariaLabel
  };
  
  // Create the quote content
  const quoteContent = (
    <figure 
      className={quoteClasses}
      {...ariaAttributes}
      lang={lang}
    >
      {quoteIcon && <div className={styles.quoteDisplayIconContainer}>{quoteIcon}</div>}
      
      <QuoteContent 
        quote={quote} 
        loading={loading} 
        id={quoteId}
        citationUrl={citationUrl}
      />
      
      {(author || source || date) && (
        <QuoteAttribution 
          author={author} 
          source={source} 
          date={date} 
          loading={loading}
          id={attributionId}
        />
      )}
    </figure>
  );
  
  // Wrap with tooltip if tooltipContent is provided
  if (tooltipContent) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {quoteContent}
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return quoteContent;
});

QuoteDisplay.displayName = 'QuoteDisplay';

export default QuoteDisplay;