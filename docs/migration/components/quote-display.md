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
- LESS module: `components/common/display/QuoteDisplay.less`

### Directory Structure

```
components/
└── common/
    └── display/
        ├── index.ts
        ├── QuoteDisplay.tsx
        ├── QuoteDisplay.less
        └── QuoteDisplay.test.tsx
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

### LESS Module Design

The LESS module will include styles for:
- Card variant with proper padding, borders, and typography
- Floating variant with animation and positioning
- Responsive behavior for different screen sizes
- Proper spacing and typography aligned with design system
- Transition animations for both variants
- Dark mode support

### Implementation Strategy

1. Create the LESS module with styling for both variants
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
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the LESS module
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

## Notes and Considerations

- Need to consolidate the quote collections from both implementations
- Consider adding the ability to provide custom quotes
- Ensure animations work smoothly on all browsers
- Add proper ARIA attributes for accessibility
- Consider adding a dismiss button for the floating variant
- Support for custom styling via className
- Add support for theming and dark mode
- Consider adding a loading state for asynchronous quote fetching
- Add support for RTL languages

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 0.5 day
- LESS module implementation: 0.5 day
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