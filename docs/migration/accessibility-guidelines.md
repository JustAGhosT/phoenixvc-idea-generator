# Accessibility Guidelines

This document outlines accessibility guidelines for component migration to ensure all components are usable by people with disabilities and comply with WCAG 2.1 AA standards.

## Core Accessibility Principles

All migrated components should follow these core principles:

1. **Perceivable** - Information must be presentable to users in ways they can perceive
2. **Operable** - User interface components must be operable
3. **Understandable** - Information and operation must be understandable
4. **Robust** - Content must be robust enough to be interpreted by a variety of user agents

## Component Accessibility Requirements

### 1. Semantic HTML

- Use appropriate HTML elements for their intended purpose
- Use heading tags (`<h1>` through `<h6>`) in logical order
- Use lists (`<ul>`, `<ol>`, `<dl>`) for list content
- Use `<button>` for clickable actions, `<a>` for navigation
- Use `<table>` for tabular data with proper headers

```tsx
// Good example
<button onClick={handleClick}>Submit</button>

// Bad example
<div onClick={handleClick}>Submit</div>
```

### 2. ARIA Attributes

- Add ARIA attributes when HTML semantics are not sufficient
- Use `aria-label` for elements without visible text
- Use `aria-expanded`, `aria-haspopup` for expandable components
- Use `aria-controls` to associate controls with their targets
- Use `aria-live` regions for dynamic content updates

```tsx
// Example of ARIA usage
<button 
  aria-expanded={isOpen} 
  aria-controls="dropdown-menu"
  onClick={toggleMenu}
>
  Menu
</button>
<div 
  id="dropdown-menu" 
  role="menu" 
  hidden={!isOpen}
>
  {/* Menu items */}
</div>
```

### 3. Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Use logical tab order (tab index of 0 or not specified)
- Implement keyboard shortcuts for complex interactions
- Ensure focus states are visible
- Trap focus in modals and dialogs

```tsx
// Example of keyboard navigation in a dialog
const Dialog = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Save previous focus
      const previousFocus = document.activeElement;
      
      // Focus the dialog
      dialogRef.current.focus();
      
      // Restore focus when dialog closes
      return () => {
        previousFocus.focus();
      };
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

### 4. Color and Contrast

- Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Don't rely on color alone to convey information
- Provide additional indicators (icons, text, patterns)
- Support high contrast mode

```less
// Example of accessible color usage
.button {
  // Base button with sufficient contrast
  background-color: @primary-color;
  color: @white;
  
  // Additional indicator beyond color
  &.active {
    background-color: @primary-color-dark;
    border: 2px solid @black;
    font-weight: bold;
  }
  
  // High contrast mode support
  @media (forced-colors: active) {
    border: 1px solid ButtonText;
  }
}
```

### 5. Text and Typography

- Use relative units (em, rem) instead of fixed units (px)
- Ensure text can be resized up to 200% without loss of content
- Maintain line height of at least 1.5 for paragraph text
- Ensure sufficient spacing between paragraphs (at least 1.5 times line height)

```less
// Example of accessible typography
.text {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  
  // Allow text to wrap
  overflow-wrap: break-word;
  word-wrap: break-word;
}
```

### 6. Forms and Inputs

- Associate labels with form controls using `for` attribute
- Group related form elements with `fieldset` and `legend`
- Provide clear error messages and validation
- Support autocomplete where appropriate

```tsx
// Example of accessible form
<form>
  <div>
    <label htmlFor="name">Name</label>
    <input 
      id="name" 
      name="name" 
      type="text"
      aria-required="true"
      aria-invalid={errors.name ? "true" : "false"}
    />
    {errors.name && (
      <div role="alert">{errors.name}</div>
    )}
  </div>
  
  <fieldset>
    <legend>Contact Preferences</legend>
    <div>
      <input type="checkbox" id="email-pref" name="contact" value="email" />
      <label htmlFor="email-pref">Email</label>
    </div>
    <div>
      <input type="checkbox" id="phone-pref" name="contact" value="phone" />
      <label htmlFor="phone-pref">Phone</label>
    </div>
  </fieldset>
</form>
```

### 7. Images and Media

- Provide alternative text for images using `alt` attribute
- Make decorative images presentational with empty alt text
- Provide captions and transcripts for audio/video content
- Ensure media is not auto-playing with sound

```tsx
// Example of accessible image usage
<img 
  src="/path/to/chart.png" 
  alt="Bar chart showing revenue growth by quarter" 
/>

// Decorative image
<img 
  src="/path/to/decorative.png" 
  alt="" 
  role="presentation" 
/>
```

### 8. Dynamic Content

- Announce important content changes with ARIA live regions
- Provide sufficient time for users to read content
- Allow users to pause, stop, or hide moving content
- Avoid content that flashes more than three times per second

```tsx
// Example of ARIA live region
const Notification = ({ message }) => {
  return (
    <div 
      role="status" 
      aria-live="polite"
      className="notification"
    >
      {message}
    </div>
  );
};
```

## Accessibility Testing

### Automated Testing

- Use tools like axe-core, jest-axe, or Lighthouse
- Integrate accessibility testing into CI/CD pipeline
- Set up automated checks for common issues

```tsx
// Example of jest-axe testing
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './Button';

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

- Test with keyboard navigation only
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with high contrast mode
- Test with text zoom (up to 200%)
- Test with reduced motion settings

## Accessibility Checklist

For each migrated component, complete this accessibility checklist:

- [ ] Component uses semantic HTML
- [ ] Interactive elements are keyboard accessible
- [ ] ARIA attributes are used appropriately
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Component doesn't rely on color alone to convey information
- [ ] Text is resizable up to 200% without loss of content
- [ ] Component works with screen readers
- [ ] Component supports high contrast mode
- [ ] Component respects reduced motion preferences
- [ ] Automated accessibility tests pass

## Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)