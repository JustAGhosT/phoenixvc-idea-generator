# QuoteDisplay Component Migration

## Current Implementations

Currently, there are two implementations of the QuoteDisplay component:

1. **Misc QuoteDisplay** (`components/misc/quote-display.tsx`)
   - Floating notification-style quote that appears after a delay
   - Appears in the bottom-right corner
   - Fades in after a delay
   - Uses setTimeout for display logic
   - Has limited configurability

2. **Layout QuoteDisplay** (`components/layout/quote-display.tsx`)
   - Card-based quote display
   - Refreshes quotes at a specified interval
   - Used in the dashboard page
   - Uses setInterval for refresh logic
   - Has a fixed design with no variants

## Migration Plan

### Target Location
- New unified component: `components/common/display/QuoteDisplay.tsx`
- CSS Module: `components/common/display/QuoteDisplay.module.css`

### Directory Structure

```
components/
└── common/
    └── display/
        ├── index.ts
        ├── QuoteDisplay.tsx
        ├── QuoteDisplay.module.css
        └── __tests__/
            ├── QuoteDisplay.test.tsx
            └── QuoteDisplay.stories.tsx
```

### Standardized Interface

The new component will use a standardized interface that supports both display variants:

```typescript
export interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: number;
  tags?: string[];
}

export interface QuoteDisplayProps {
  className?: string;
  quotes?: Quote[];
  variant?: "card" | "floating";
  refreshInterval?: number; // in milliseconds
  autoShow?: boolean;
  showDelay?: number; // in milliseconds
  hideDelay?: number; // in milliseconds, for floating variant
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"; // for floating variant
  onQuoteChange?: (quote: Quote) => void;
  cardProps?: {
    title?: string;
    className?: string;
    showRefreshButton?: boolean;
  };
}
```

### CSS Module with Tailwind Design

The CSS Module will include styles for:
- Card variant with proper padding, borders, and typography
- Floating variant with animation and positioning
- Responsive behavior for different screen sizes
- Proper spacing and typography aligned with design system
- Transition animations for both variants
- Dark mode support

```css
/* QuoteDisplay.module.css */
.container {
  @apply relative;
}

/* Card variant */
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md;
}

.cardHeader {
  @apply flex justify-between items-center mb-4;
}

.cardTitle {
  @apply text-lg font-medium text-gray-900 dark:text-gray-100;
}

.refreshButton {
  @apply p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full transition-colors;
}

/* Floating variant */
.floating {
  @apply fixed z-50 max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg;
  animation: fadeIn 0.5s ease-in-out;
}

.topRight {
  @apply top-4 right-4;
}

.topLeft {
  @apply top-4 left-4;
}

.bottomRight {
  @apply bottom-4 right-4;
}

.bottomLeft {
  @apply bottom-4 left-4;
}

.closeButton {
  @apply absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full transition-colors;
}

/* Quote content */
.quoteText {
  @apply text-gray-800 dark:text-gray-200 italic mb-4 relative;
}

.quoteText::before {
  @apply text-gray-400 dark:text-gray-600 text-4xl absolute -top-2 -left-2 opacity-50;
  content: '"';
}

.quoteAuthor {
  @apply text-gray-600 dark:text-gray-400 text-sm font-medium;
}

.quoteSource {
  @apply text-gray-500 dark:text-gray-500 text-xs mt-1;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); }
}

.fadeOut {
  animation: fadeOut 0.5s ease-in-out forwards;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .floating {
    @apply max-w-[calc(100vw-2rem)] mx-4;
  }
}
```

### Implementation Strategy

1. Create the CSS Module with Tailwind styling for both variants
2. Implement the new QuoteDisplay component with all features
3. Add a collection of default quotes
4. Create unit tests and Storybook stories
5. Update imports in dashboard and other pages
6. Test thoroughly in all contexts
7. Remove old implementations once migration is complete

### Usage Examples

#### Current Usage in Dashboard

```tsx
<QuoteDisplay />
```

#### New Usage in Dashboard

```tsx
<QuoteDisplay 
  variant="card" 
  className="mb-6"
  cardProps={{
    title: "Quote of the Day",
    showRefreshButton: true
  }}
  refreshInterval={86400000} // 24 hours
/>
```

#### Usage as Floating Quote

```tsx
<QuoteDisplay 
  variant="floating" 
  showDelay={3000} 
  hideDelay={10000}
  refreshInterval={120000} 
  position="bottom-right"
  autoShow={true}
/>
```

#### With Custom Quotes

```tsx
<QuoteDisplay 
  variant="card"
  quotes={[
    { 
      text: "Innovation distinguishes between a leader and a follower.", 
      author: "Steve Jobs" 
    },
    { 
      text: "The best way to predict the future is to invent it.", 
      author: "Alan Kay" 
    }
  ]}
  onQuoteChange={(quote) => console.log(`Now showing: ${quote.text}`)}
/>
```

## Accessibility Considerations

- Use proper ARIA attributes for dynamic content
- Ensure floating quotes can be dismissed via keyboard
- Provide sufficient time to read quotes before auto-dismissal
- Ensure sufficient color contrast for text
- Make sure animations respect reduced motion preferences
- Add proper focus management for interactive elements
- Include aria-live regions for dynamically changing content

## Performance Considerations

- Use `useCallback` for event handlers
- Implement proper cleanup of intervals and timeouts
- Minimize re-renders with proper React patterns
- Lazy load quotes collection when using defaults
- Use CSS transitions instead of JavaScript animations where possible
- Ensure animations don't cause layout shifts

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- Timer-based functionality (showing/hiding)
- Quote rotation functionality
- User interactions (dismiss, refresh)
- Accessibility requirements
- Responsive behavior
- Proper cleanup of timers

## Migration Checklist

- [ ] **Identification Phase**
  - [x] Identify all instances of the component in the codebase
  - [x] List all files where the component is used
  - [x] Document the current props interface and behavior
  - [x] Identify variations in usage

- [ ] **Design Phase**
  - [x] Design a standardized interface
  - [x] Identify the appropriate directory
  - [x] Create CSS Module structure with Tailwind
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the CSS Module with Tailwind utilities
  - [ ] Create the unified component
  - [ ] Implement both display variants
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard page
  - [ ] Update imports in other pages
  - [ ] Test in all contexts
  - [ ] Address any issues found during testing

- [ ] **Documentation Phase**
  - [ ] Add JSDoc comments
  - [ ] Create usage examples
  - [ ] Document props
  - [ ] Add accessibility documentation
  - [ ] Document performance considerations

- [ ] **Cleanup Phase**
  - [ ] Verify all uses are working
  - [ ] Remove old components
  - [ ] Remove unused imports
  - [ ] Clean up any temporary code

- [ ] **Review Phase**
  - [ ] Conduct code review
  - [ ] Check for performance issues
  - [ ] Verify accessibility
  - [ ] Ensure documentation is complete
  - [ ] Final testing in all contexts

## Implementation Example

```tsx
// QuoteDisplay.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/utils/classnames';
import styles from './QuoteDisplay.module.css';
import { RefreshCw, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { defaultQuotes } from './quotes-data';

export interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: number;
  tags?: string[];
}

export interface QuoteDisplayProps {
  className?: string;
  quotes?: Quote[];
  variant?: "card" | "floating";
  refreshInterval?: number;
  autoShow?: boolean;
  showDelay?: number;
  hideDelay?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onQuoteChange?: (quote: Quote) => void;
  cardProps?: {
    title?: string;
    className?: string;
    showRefreshButton?: boolean;
  };
}

export function QuoteDisplay({
  className,
  quotes = defaultQuotes,
  variant = "card",
  refreshInterval,
  autoShow = true,
  showDelay = 0,
  hideDelay = 7000,
  position = "bottom-right",
  onQuoteChange,
  cardProps = {},
}: QuoteDisplayProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [visible, setVisible] = useState(!showDelay);
  const [exiting, setExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentQuote = quotes[currentQuoteIndex];
  
  // Function to rotate to the next quote
  const rotateQuote = useCallback(() => {
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    setCurrentQuoteIndex(nextIndex);
    if (onQuoteChange) {
      onQuoteChange(quotes[nextIndex]);
    }
  }, [currentQuoteIndex, quotes, onQuoteChange]);
  
  // Handle showing the quote after delay
  useEffect(() => {
    if (autoShow && showDelay > 0 && !visible) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, showDelay);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoShow, showDelay, visible]);
  
  // Handle hiding the floating quote after delay
  useEffect(() => {
    if (variant === "floating" && visible && hideDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setExiting(true);
        // Add a timeout for the animation to complete
        setTimeout(() => {
          setVisible(false);
          setExiting(false);
        }, 500); // Match animation duration
      }, hideDelay);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [variant, visible, hideDelay]);
  
  // Handle quote rotation interval
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      intervalRef.current = setInterval(rotateQuote, refreshInterval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshInterval, rotateQuote]);
  
  // Handle closing the floating quote
  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 500); // Match animation duration
  }, []);
  
  // Don't render if not visible
  if (!visible) {
    return null;
  }
  
  // Render card variant
  if (variant === "card") {
    return (
      <Card className={cn(styles.card, className, cardProps.className)}>
        {(cardProps.title || cardProps.showRefreshButton) && (
          <CardHeader className={styles.cardHeader}>
            {cardProps.title && <CardTitle className={styles.cardTitle}>{cardProps.title}</CardTitle>}
            {cardProps.showRefreshButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={rotateQuote}
                className={styles.refreshButton}
                aria-label="Show next quote"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
        )}
        <CardContent>
          <blockquote>
            <p className={styles.quoteText}>{currentQuote.text}</p>
            <footer>
              <cite className={styles.quoteAuthor}>{currentQuote.author}</cite>
              {currentQuote.source && (
                <div className={styles.quoteSource}>
                  {currentQuote.source}
                  {currentQuote.year && `, ${currentQuote.year}`}
                </div>
              )}
            </footer>
          </blockquote>
        </CardContent>
      </Card>
    );
  }
  
  // Render floating variant
  return (
    <div 
      className={cn(
        styles.floating,
        styles[position],
        exiting && styles.fadeOut,
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close quote"
      >
        <X className="h-4 w-4" />
      </Button>
      <blockquote>
        <p className={styles.quoteText}>{currentQuote.text}</p>
        <footer>
          <cite className={styles.quoteAuthor}>{currentQuote.author}</cite>
          {currentQuote.source && (
            <div className={styles.quoteSource}>
              {currentQuote.source}
              {currentQuote.year && `, ${currentQuote.year}`}
            </div>
          )}
        </footer>
      </blockquote>
    </div>
  );
}
```

## Notes and Considerations

- Need to consolidate the quote collections from both implementations
- Consider adding the ability to provide custom quotes
- Ensure animations work smoothly on all browsers
- Add proper ARIA attributes for accessibility
- Add dismiss button for the floating variant
- Support for custom styling via className
- Add support for theming and dark mode
- Consider adding a loading state for asynchronous quote fetching
- Add support for RTL languages

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 0.5 day
- CSS Module with Tailwind implementation: 0.5 day
- Component implementation: 1 day
- Testing and refinement: 1 day
- Migration of existing usages: 0.5 day
- Documentation and cleanup: 0.5 day

**Required Resources:**
- 1 Frontend developer (primary)
- Design review for styling consistency
- QA support for testing in different contexts

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Timer-based functionality inconsistencies | Medium | Thorough testing of all timing scenarios |
| Animation performance issues | Low | Use CSS transitions, test on lower-end devices |
| Quote content overflow | Low | Implement text truncation and responsive sizing |
| Interference with other floating UI elements | Medium | Add configurable positioning and z-index management |

## Success Criteria

The migration will be considered successful when:
1. All existing QuoteDisplay usages are migrated to the new component
2. Both card and floating variants work correctly in all contexts
3. Animations and transitions are smooth and performant
4. The component is fully accessible
5. All tests pass, including timing-based tests
6. The old implementations are safely removed