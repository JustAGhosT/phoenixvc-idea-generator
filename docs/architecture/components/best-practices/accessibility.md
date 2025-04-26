# Accessibility Best Practices

This document outlines our best practices for creating accessible components.

## Accessibility Principles

1. **Perceivable** - Information must be presentable in ways all users can perceive
2. **Operable** - Interface components must be operable by all users
3. **Understandable** - Information and operation must be understandable to all users
4. **Robust** - Content must be robust enough to work with assistive technologies

## Semantic HTML

### Use Appropriate Elements

Use semantic HTML elements that convey meaning:

```tsx
// Good: Semantic HTML
<article>
  <h2>Article Title</h2>
  <p>Article content...</p>
  <footer>
    <p>Posted on <time dateTime="2023-01-15">January 15, 2023</time></p>
  </footer>
</article>

// Bad: Non-semantic HTML
<div className="article">
  <div className="title">Article Title</div>
  <div className="content">Article content...</div>
  <div className="footer">
    <div>Posted on January 15, 2023</div>
  </div>
</div>
```

### Landmarks

Use landmark elements to help users navigate:

```tsx
<header>
  <nav>
    {/* Navigation content */}
  </nav>
</header>

<main>
  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Title</h2>
    {/* Section content */}
  </section>
</main>

<footer>
  {/* Footer content */}
</footer>
```

## Keyboard Accessibility

### Focus Management

Ensure all interactive elements can be accessed via keyboard:

```tsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  
  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Focus Trapping

Trap focus within modal dialogs and other overlay components:

```tsx
function useFocusTrap(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    return () => element.removeEventListener('keydown', handleTabKey);
  }, [ref]);
}
```

## ARIA Attributes

### Use ARIA Appropriately

Use ARIA attributes to enhance accessibility when needed:

```tsx
// Button with loading state
<button 
  aria-busy={isLoading}
  aria-disabled={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Expandable section
<div>
  <button 
    aria-expanded={isExpanded}
    aria-controls="content-section"
    onClick={() => setIsExpanded(!isExpanded)}
  >
    {isExpanded ? 'Hide Details' : 'Show Details'}
  </button>
  
  <div 
    id="content-section"
    hidden={!isExpanded}
  >
    Content goes here...
  </div>
</div>
```

### ARIA Roles

Use ARIA roles to clarify the purpose of elements:

```tsx
// Custom checkbox
<div 
  role="checkbox"
  aria-checked={isChecked}
  tabIndex={0}
  onClick={() => setIsChecked(!isChecked)}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsChecked(!isChecked);
      e.preventDefault();
    }
  }}
>
  {isChecked ? '✓' : ''}
</div>

// Alert message
<div role="alert">
  Your profile has been updated successfully.
</div>
```

## Forms

### Form Labels

Always use labels for form controls:

```tsx
// Good: Explicit label
<div>
  <label htmlFor="username">Username</label>
  <input id="username" type="text" />
</div>

// Also good: Implicit label
<label>
  Username
  <input type="text" />
</label>

// Bad: No label
<div>
  <span>Username</span>
  <input type="text" />
</div>
```

### Error Messages

Provide accessible error messages for form validation:

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && (
    <div id="email-error" role="alert">
      {error}
    </div>
  )}
</div>
```

## Images and Media

### Alternative Text

Provide alternative text for images:

```tsx
// Informative image
<img src="chart.png" alt="Q1 sales increased by 25% compared to last year" />

// Decorative image
<img src="decorative-divider.png" alt="" role="presentation" />
```

### Video and Audio

Provide captions and transcripts for video and audio content:

```tsx
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" label="English" />
  Your browser does not support the video tag.
</video>
```

## Color and Contrast

### Sufficient Contrast

Ensure sufficient color contrast between text and background:

```css
/* Good: High contrast */
.button {
  background-color: #0056b3;
  color: #ffffff; /* 7.5:1 contrast ratio */
}

/* Bad: Low contrast */
.button {
  background-color: #6c757d;
  color: #e2e2e2; /* 2.5:1 contrast ratio - insufficient */
}
```

### Don't Rely on Color Alone

Don't use color as the only means of conveying information:

```tsx
// Bad: Color alone
<div style={{ color: isError ? 'red' : 'green' }}>
  Status: {status}
</div>

// Good: Color + icon/text
<div 
  style={{ color: isError ? 'red' : 'green' }}
  aria-live="polite"
>
  Status: {isError ? '❌ Error' : '✓ Success'}
</div>
```

## Dynamic Content

### Live Regions

Use ARIA live regions for dynamic content updates:

```tsx
function Notifications() {
  const [messages, setMessages] = useState([]);
  
  return (
    <div aria-live="polite" aria-atomic="false">
      {messages.map(message => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}
```

### Loading States

Clearly communicate loading states:

```tsx
function DataTable({ isLoading, data }) {
  return (
    <div>
      {isLoading ? (
        <div role="status">
          <span>Loading data...</span>
          <div className="spinner" aria-hidden="true"></div>
        </div>
      ) : (
        <table>
          {/* Table content */}
        </table>
      )}
    </div>
  );
}
```

## Testing Accessibility

### Automated Testing

Use automated testing tools to catch common accessibility issues:

```tsx
// Example using jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

test('Button component has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

Supplement automated tests with manual testing:

1. Test with keyboard navigation only
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Test with browser zoom up to 200%
4. Test with high contrast mode

## Responsive Accessibility

### Touch Targets

Ensure touch targets are large enough:

```css
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 8px 16px;
}
```

### Responsive Design

Ensure accessibility across device sizes:

```css
/* Base styles for all devices */
.nav-item {
  padding: 12px;
}

/* Larger touch targets on small screens */
@media (max-width: 768px) {
  .nav-item {
    padding: 16px;
  }
}
```

## Common Accessibility Patterns

### Skip Links

Provide skip links to bypass navigation:

```tsx
function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      
      <header>
        <nav>{/* Navigation content */}</nav>
      </header>
      
      <main id="main-content">
        {children}
      </main>
      
      <footer>{/* Footer content */}</footer>
    </>
  );
}
```

### Accessible Modals

Create accessible modal dialogs:

```tsx
function Modal({ isOpen, onClose, title, children }) {
  // Implementation with proper focus management, ARIA attributes, etc.
  
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```