# Component Migration Checklist - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases of component migration. Use this document after completing [Phase A](./migration-checklist-phase-a.md) to execute the migration plan.

## Component Name: ________________

### 1. Implementation Phase

- [ ] Create the LESS module with component-specific styles
  ```less
  // Example structure
  .component-name {
    // Base styles
    
    // Variants
    &--primary {}
    &--secondary {}
    
    // States
    &--disabled {}
    &--active {}
    
    // Child elements
    &__header {}
    &__content {}
    &__footer {}
    
    // Responsive styles
    @media (max-width: @breakpoint-md) {}
  }
  ```
- [ ] Create the unified component with standardized interface
- [ ] Implement component using appropriate design pattern:
  - [ ] Compound Component pattern
  - [ ] Render Props pattern
  - [ ] Custom Hook pattern
  - [ ] Composition pattern
- [ ] Extract complex logic into custom hooks
- [ ] Implement all necessary functionality
- [ ] Add proper TypeScript typing
- [ ] Ensure responsive behavior
- [ ] Add accessibility features
  - [ ] Semantic HTML
  - [ ] ARIA attributes
  - [ ] Keyboard navigation
  - [ ] Focus management
- [ ] Optimize for performance:
  - [ ] Memoize pure components with React.memo
  - [ ] Use useMemo for expensive calculations
  - [ ] Use useCallback for event handlers
  - [ ] Implement virtualization for long lists if needed
- [ ] Write unit tests
  - [ ] Test component rendering
  - [ ] Test component functionality
  - [ ] Test accessibility
  - [ ] Test edge cases
- [ ] Create Storybook stories
  - [ ] Document all variants
  - [ ] Show interactive examples
  - [ ] Include accessibility guidelines
- [ ] Implement error boundaries if needed

### 2. Migration Phase

- [ ] Move the component to its appropriate directory
- [ ] Update imports in all files that use the component
- [ ] Adjust component usage to match the new interface
- [ ] Implement feature flags for breaking changes if needed
- [ ] Test the component in all contexts where it's used
- [ ] Fix any issues that arise during testing
- [ ] Address any design inconsistencies

### 3. Documentation Phase

- [ ] Add JSDoc comments to the component
  ```tsx
  /**
   * Component description with usage guidelines.
   * 
   * @example
   * ```tsx
   * <ComponentName variant="primary" size="md">
   *   Content
   * </ComponentName>
   * ```
   * 
   * @param props - Component props
   * @returns A React component
   */
  ```
- [ ] Create usage examples
- [ ] Document any props that require special attention
- [ ] Document accessibility considerations
- [ ] Document performance considerations
- [ ] Update any existing documentation that references the component
- [ ] Add component to the component library documentation

### 4. Cleanup Phase

- [ ] Verify all uses of the component are working correctly
- [ ] Remove the old component
- [ ] Remove any unused imports or dependencies
- [ ] Clean up any temporary files or code
- [ ] Remove feature flags if used during migration
- [ ] Run linting and formatting on all modified files

### 5. Review Phase

- [ ] Conduct a code review
- [ ] Check for any performance issues
- [ ] Verify accessibility compliance
- [ ] Ensure documentation is complete and accurate
- [ ] Conduct final testing in all contexts
- [ ] Get sign-off from design team if applicable
- [ ] Update component status in migration tracking

## Migration Completion

- [ ] Implementation completed by: ________________ (Date: __________)
- [ ] Code review completed by: ________________ (Date: __________)
- [ ] Migration approved by: ________________ (Date: __________)

## Post-Migration Notes

Use this section to document any lessons learned, challenges overcome, or future improvements:

```
[Add your notes here]
```