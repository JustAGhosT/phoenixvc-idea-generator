# QuoteDisplay Component Migration - Phase A

This checklist covers the identification and design phases for migrating the QuoteDisplay component.

## Component Name: QuoteDisplay

### 1. Identification Phase

- [x] Identify all instances of the component
  - `components/marketing/Quote.tsx`
  - `components/testimonials/TestimonialCard.tsx`
- [x] Current props interface
  ```typescript
  // In marketing/Quote.tsx
  interface QuoteProps {
    text: string;
    author: string;
    company?: string;
    avatar?: string;
    className?: string;
  }
  
  // In testimonials/TestimonialCard.tsx
  interface TestimonialCardProps {
    quote: string;
    name: string;
    position?: string;
    organization?: string;
    image?: string;
    rating?: number;
    variant?: 'light' | 'dark';
  }
  ```
- [x] Variations in usage
  - Marketing pages use simple quotes with minimal styling
  - Testimonials page uses cards with ratings and more details
- [x] Current styling: Inconsistent approaches between implementations
- [x] State management: Simple presentational components

### 2. Design Phase

- [x] Component classification: Core Component (Atom)
- [x] Standardized interface
  ```typescript
  export interface QuoteDisplayProps {
    quote: string;
    author: {
      name: string;
      title?: string;
      organization?: string;
      avatarUrl?: string;
    };
    rating?: number;
    variant?: 'simple' | 'card' | 'featured';
    appearance?: 'light' | 'dark';
    className?: string;
    citation?: string;
  }
  ```
- [x] Directory: `src/components/common/display/quote-display/`
- [x] Design pattern: Simple component with variants
- [x] CSS Module structure with Tailwind
  ```css
  /* Proposed CSS Module structure */
  .container {
    @apply relative;
  }
  
  /* Variants */
  .simple {
    @apply py-4;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md;
  }
  
  .featured {
    @apply bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 rounded-r-lg;
  }
  
  /* Quote content */
  .quoteText {
    @apply text-gray-800 dark:text-gray-200 italic mb-4 relative;
  }
  
  .quoteText::before {
    @apply text-gray-400 dark:text-gray-600 text-4xl absolute -top-2 -left-2 opacity-50;
    content: '"';
  }
  
  .authorContainer {
    @apply flex items-center mt-4;
  }
  
  .avatar {
    @apply w-10 h-10 rounded-full mr-3 object-cover;
  }
  
  .authorInfo {
    @apply flex flex-col;
  }
  
  .authorName {
    @apply text-gray-900 dark:text-gray-100 font-medium;
  }
  
  .authorTitle {
    @apply text-gray-600 dark:text-gray-400 text-sm;
  }
  
  .organization {
    @apply text-gray-500 dark:text-gray-500 text-sm;
  }
  
  .citation {
    @apply text-gray-500 dark:text-gray-500 text-xs mt-2 italic;
  }
  
  /* Rating */
  .rating {
    @apply flex mt-2;
  }
  
  .star {
    @apply text-yellow-500 mr-0.5;
  }
  
  /* Appearance */
  .light {
    @apply bg-white text-gray-900;
  }
  
  .dark {
    @apply bg-gray-800 text-white;
  }
  ```
- [x] Accessibility requirements
  - Use semantic `<blockquote>` and `<cite>` elements
  - Ensure proper heading structure
  - Accessible rating display
  - Proper color contrast in all modes

### 3. Migration Strategy

- [x] Migration approach: Direct replacement
- [x] Breaking changes: Unified props structure
- [x] Estimated effort: 1 day total
- [x] Tailwind integration: Leverage Tailwind utilities for consistent styling

## Phase A Approval

- [x] Design approved by: Sarah Chen (Date: 2025-04-21)
- [x] Technical approach approved by: Miguel Rodriguez (Date: 2025-04-21)
- [x] Ready to proceed to Phase B