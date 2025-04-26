# Accessibility Standards

We prioritize accessibility in our component design to ensure our application is usable by everyone, including people with disabilities.

## Accessibility Principles

Our accessibility approach is guided by the following principles:

1. **Perceivable** - Information and UI components must be presentable to users in ways they can perceive
2. **Operable** - UI components and navigation must be operable
3. **Understandable** - Information and operation of the UI must be understandable
4. **Robust** - Content must be robust enough to be interpreted by a variety of user agents

## WCAG Compliance

We aim to meet WCAG 2.1 AA standards for all components, which includes:

1. **Color contrast** - Text meets 4.5:1 contrast ratio (3:1 for large text)
2. **Keyboard accessibility** - All functionality is available using a keyboard
3. **Screen reader support** - Content is properly announced by screen readers
4. **Focus management** - Focus is visible and follows a logical order
5. **Alternative text** - Images have appropriate alternative text

## Implementation Guidelines

### 1. Semantic HTML

We use the correct HTML elements for their intended purpose:

```tsx
// Good: Using semantic HTML
<button onClick={handleClick}>Click me</button>
<a href="/about">About</a>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Bad: Using non-semantic elements
<div onClick={handleClick} className="button">Click me</div>
<div onClick={() => navigate('/about')} className="link">About</div>
```

#### Semantic HTML Best Practices

1. **Use buttons for actions** - Use `<button>` for interactive controls that trigger actions
2. **Use links for navigation** - Use `<a>` for navigation to other pages
3. **Use heading levels correctly** - Use `<h1>` through `<h6>` in a hierarchical order
4. **Use lists for related items** - Use `<ul>`, `<ol>`, and `<li>` for lists
5. **Use tables for tabular data** - Use `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` for tabular data

### 2. ARIA Attributes

We add appropriate ARIA attributes when HTML semantics are not sufficient:

```tsx
// Dialog component with ARIA attributes
function Dialog({ isOpen, onClose, title, children }) {
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className={isOpen ? 'dialog open' : 'dialog'}
    >
      <h2 id="dialog-title">{title}</h2>
      <div id="dialog-description">
        {children}
      </div>
      <button 
        onClick={onClose}
        aria-label="Close dialog"
      >
        &times;
      </button>
    </div>
  )
}
```

#### ARIA Best Practices

1. **Use ARIA roles** - Add `role` attributes when HTML semantics are not sufficient
2. **Use aria-label** - Provide accessible names for elements without visible text
3. **Use aria-labelledby** - Reference visible text as a label for another element
4. **Use aria-describedby** - Reference content that describes an element
5. **Use aria-expanded** - Indicate whether a control is expanded or collapsed
6. **Use aria-controls** - Indicate which element is controlled by the current element
7. **Use aria-live** - Announce dynamic content changes to screen readers
8. **Use aria-hidden** - Hide decorative elements from screen readers

### 3. Keyboard Navigation

We ensure all interactive elements are keyboard accessible:

```tsx
// Keyboard accessible dropdown
function Dropdown({ label, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(prev + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
      case 'Space':
        e.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          selectOption(options[focusedIndex])
        } else {
          setIsOpen(prev => !prev)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
    }
  }
  
  const selectOption = (option) => {
    setSelectedOption(option)
    onChange(option)
    setIsOpen(false)
  }
  
  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <button 
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedOption ? selectedOption.label : label}
      </button>
      
      {isOpen && (
        <ul 
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`option-${index}`}
              role="option"
              aria-selected={selectedOption?.value === option.value}
              tabIndex={-1}
              onClick={() => selectOption(option)}
              className={index === focusedIndex ? 'focused' : ''}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

#### Keyboard Navigation Best Practices

1. **Support standard keyboard interactions** - Follow established patterns for keyboard interactions
2. **Manage focus** - Ensure focus is visible and follows a logical order
3. **Trap focus in modals** - Keep focus within modal dialogs when they are open
4. **Provide keyboard shortcuts** - Add keyboard shortcuts for common actions
5. **Test with keyboard only** - Verify that all functionality works with keyboard only

### 4. Focus Management

We implement proper focus management for interactive components:

```tsx
// Focus management in a dialog
function AccessibleDialog({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)
  const [previousFocus, setPreviousFocus] = useState(null)
  
  // Save previous active element and focus the dialog when opened
  useEffect(() => {
    if (isOpen) {
      setPreviousFocus(document.activeElement)
      dialogRef.current?.focus()
    }
  }, [isOpen])
  
  // Restore focus when dialog closes
  useEffect(() => {
    return () => {
      if (previousFocus && !isOpen) {
        previousFocus.focus()
      }
    }
  }, [isOpen, previousFocus])
  
  // Trap focus within the dialog
  const handleKeyDown = (e) => {
    if (!isOpen || e.key !== 'Tab') return
    
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div 
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="dialog"
    >
      <h2 id="dialog-title">{title}</h2>
      <div className="dialog-content">
        {children}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

#### Focus Management Best Practices

1. **Make focus visible** - Ensure focus indicators are visible
2. **Manage focus for modals** - Move focus to modal dialogs when they open
3. **Restore focus** - Return focus to the triggering element when a modal closes
4. **Trap focus** - Keep focus within modal dialogs when they are open
5. **Provide skip links** - Allow users to skip navigation and go directly to main content

### 5. Color and Contrast

We ensure sufficient color contrast and don't rely solely on color to convey information:

```css
/* Good contrast */
.button {
  /* WCAG AA compliant - 4.5:1 contrast ratio */
  background-color: #2563eb;
  color: white;
}

/* Additional indicators beyond color */
.error-message {
  color: #dc2626; /* Red */
  border-left: 4px solid #dc2626;
  padding-left: 1rem;
}

.error-message::before {
  content: "⚠️ ";
}
```

#### Color and Contrast Best Practices

1. **Meet contrast requirements** - Ensure text meets WCAG AA contrast requirements
2. **Don't rely on color alone** - Use additional indicators like icons, patterns, or text
3. **Support high contrast mode** - Test with high contrast mode
4. **Provide sufficient contrast for focus indicators** - Ensure focus indicators are visible
5. **Test with color blindness simulators** - Verify that information is perceivable with various types of color blindness

### 6. Form Accessibility

We implement accessible forms with proper labels, error messages, and validation:

```tsx
// Accessible form field
function FormField({ id, label, type = 'text', error, ...props }) {
  const fieldId = id || `field-${useId()}`
  const errorId = `${fieldId}-error`
  
  return (
    <div className="form-field">
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <div id={errorId} className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}
```

#### Form Accessibility Best Practices

1. **Use labels for form controls** - Associate labels with form controls using `htmlFor`
2. **Group related fields** - Use `fieldset` and `legend` to group related fields
3. **Provide clear error messages** - Display error messages with `aria-describedby`
4. **Mark required fields** - Indicate required fields with `aria-required`
5. **Validate input** - Provide validation feedback with `aria-invalid`

### 7. Responsive and Mobile Accessibility

We ensure our components are accessible on all devices and screen sizes:

```css
/* Responsive touch targets */
.button {
  /* Minimum touch target size of 44x44px */
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Responsive font sizes */
@media (max-width: 768px) {
  body {
    font-size: 16px; /* Minimum font size for readability */
  }
}
```

#### Mobile Accessibility Best Practices

1. **Use sufficient touch target sizes** - Ensure touch targets are at least 44x44px
2. **Support pinch zoom** - Don't disable pinch zoom
3. **Test with screen readers on mobile** - Verify that content is accessible with VoiceOver and TalkBack
4. **Support device orientation changes** - Ensure content is accessible in both portrait and landscape
5. **Use responsive design** - Adapt layouts for different screen sizes

### 8. Accessible Components Example

Here's an example of an accessible dialog component that implements many of these practices:

```tsx
// Accessible dialog component
import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.css';
import { cn } from '@/utils/classnames';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  
  // Save previous active element and focus the dialog when opened
  useEffect(() => {
    if (isOpen) {
      setPreviousFocus(document.activeElement as HTMLElement);
      dialogRef.current?.focus();
      
      // Prevent body scrolling when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scrolling when dialog is closed
      document.body.style.overflow = '';
    }
  }, [isOpen]);
  
  // Restore focus when dialog closes
  useEffect(() => {
    return () => {
      if (previousFocus && !isOpen) {
        previousFocus.focus();
      }
    };
  }, [isOpen, previousFocus]);
  
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Trap focus within the dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || e.key !== 'Tab' || !dialogRef.current) return;
    
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  
  // Close when clicking overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(styles.dialog, className)}
      >
        <header className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className={styles.closeButton}
          >
            &times;
          </button>
        </header>
        
        {description && (
          <div id="dialog-description" className={styles.description}>
            {description}
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
```

## Testing for Accessibility

We test our components for accessibility using a combination of automated and manual testing:

### 1. Automated Testing

We use automated tools to catch common accessibility issues:

```tsx
// Example accessibility test with jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });
});
```

### 2. Manual Testing

We supplement automated testing with manual testing:

1. **Keyboard testing** - Verify that all functionality works with keyboard only
2. **Screen reader testing** - Test with screen readers like NVDA, JAWS, VoiceOver, and TalkBack
3. **Zoom testing** - Test with browser zoom at 200% and 400%
4. **Contrast testing** - Verify color contrast with tools like the WebAIM Contrast Checker
5. **Reduced motion testing** - Test with reduced motion settings enabled

## Resources

1. [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
2. [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
3. [Inclusive Components](https://inclusive-components.design/)
4. [A11y Project Checklist](https://www.a11yproject.com/checklist/)
5. [Axe DevTools](https://www.deque.com/axe/)