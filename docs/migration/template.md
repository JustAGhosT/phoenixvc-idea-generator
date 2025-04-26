# Component Migration Template

This document provides a comprehensive template for migrating components to our new design system. The migration process is divided into two phases:

## Phase A: Identification & Design
Focus on identifying all instances of the component and designing a standardized interface.

## Phase B: Implementation & Migration
Focus on implementing the new component and migrating existing usages.

---

# [Component Name] Migration - Phase A

This checklist covers the identification and design phases for migrating the [Component Name] component.

## Component Name: [Component Name]

### 1. Identification Phase

- [ ] Identify all instances of the component
  - List all files where the component is used
  - Note any variations or similar components that should be consolidated
- [ ] Current props interface
  ```typescript
  // Document current interfaces
  ```
- [ ] Variations in usage
  - Document different ways the component is currently used
  - Note any context-specific customizations
- [ ] Current styling approach
  - Document current styling methods (CSS, inline styles, CSS-in-JS, etc.)
- [ ] State management
  - Document how state is currently managed in the component

### 2. Design Phase

- [ ] Component classification (Atom, Molecule, Organism, etc.)
- [ ] Standardized interface
  ```typescript
  // Define new standardized interface
  ```
- [ ] Directory structure
  - Define where the component will live in the new structure
- [ ] Design pattern
  - Decide on appropriate design patterns (compound components, render props, etc.)
- [ ] CSS Module structure
  ```css
  /* Proposed CSS Module structure */
  ```
- [ ] Accessibility requirements
  - Document WCAG compliance needs
  - Define semantic HTML structure
  - Note any special accessibility considerations

### 3. Migration Strategy

- [ ] Migration approach (direct replacement, adapter pattern, etc.)
- [ ] Breaking changes and how to handle them
- [ ] Estimated effort
- [ ] Integration with design system

## Phase A Approval

- [ ] Design approved by: [Name] (Date: YYYY-MM-DD)
- [ ] Technical approach approved by: [Name] (Date: YYYY-MM-DD)
- [ ] Ready to proceed to Phase B

---

# [Component Name] Migration - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases for the [Component Name] component.

## Component Name: [Component Name]

### 1. Implementation Phase

- [ ] Create CSS/LESS module
  ```css
  /* Implement CSS Module */
  ```
- [ ] Implement component with variants
  ```tsx
  // Implement component
  ```
- [ ] Create adapter functions (if needed)
  ```tsx
  // Implement adapters for legacy components
  ```
- [ ] Write unit tests
  ```tsx
  // Implement tests
  ```
- [ ] Create Storybook stories (if applicable)
  ```tsx
  // Implement Storybook stories
  ```

### 2. Migration Phase

- [ ] Move component to appropriate directory
- [ ] Update imports in all files
- [ ] Test component in all contexts
- [ ] Address any issues found during testing

### 3. Documentation Phase

- [ ] Add JSDoc comments
  ```tsx
  /**
   * Component documentation
   */
  ```
- [ ] Document usage examples
- [ ] Document props
- [ ] Document accessibility considerations
- [ ] Document performance considerations

### 4. Cleanup Phase

- [ ] Verify all uses working correctly
- [ ] Remove old components
- [ ] Remove unused imports
- [ ] Clean up any temporary code

### 5. Review Phase

- [ ] Conduct code review
- [ ] Check for performance issues
- [ ] Verify accessibility compliance
- [ ] Ensure documentation is complete
- [ ] Final testing in all contexts

## Migration Completion

- [ ] Implementation completed by: [Name] (Date: YYYY-MM-DD)
- [ ] Code review completed by: [Name] (Date: YYYY-MM-DD)
- [ ] Migration approved by: [Name] (Date: YYYY-MM-DD)

## Post-Migration Notes

[Document any lessons learned, challenges overcome, or special considerations for future reference]