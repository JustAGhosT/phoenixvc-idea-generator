# Accessibility Guidelines

This document outlines comprehensive accessibility guidelines for component migration to ensure all components are usable by people with disabilities and comply with WCAG 2.1 AA standards, aligned with our new component architecture principles.

## Core Accessibility Principles

All migrated components should follow these core principles:

1. **Perceivable** - Information must be presentable to users in ways they can perceive
2. **Operable** - User interface components must be operable
3. **Understandable** - Information and operation must be understandable
4. **Robust** - Content must be robust enough to be interpreted by a variety of user agents

## Component Accessibility Requirements by Component Type

### Core Components (Atoms)

Basic building blocks must have rock-solid accessibility foundations:

- Use native HTML elements whenever possible (`<button>`, `<input>`, etc.)
- Implement proper ARIA roles and attributes when extending native elements
- Ensure keyboard navigation works without mouse interaction
- Maintain focus states that are clearly visible
- Provide programmatically associated labels for all form controls

```tsx
// Example of accessible atom component
export function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  ariaLabel,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(`button button--${variant} button--${size}`, {
        'button--disabled': disabled
      })}
      disabled={disabled}
      aria-label={ariaLabel || typeof children === 'string' ? undefined : ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Composite Components (Molecules)

Components composed of multiple atoms must maintain accessibility context:

- Ensure proper keyboard navigation between child components
- Use appropriate ARIA relationships (`aria-controls`, `aria-owns`, etc.)
- Implement proper focus management, especially for interactive components
- Ensure state changes are announced to screen readers

```tsx
// Example of accessible molecule component
export function Accordion({ items, defaultExpanded = [] }: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);
  
  return (
    <div className="accordion">
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;
        
        return (
          <div key={item.id} className="accordion-item">
            <h3>
              <button
                id={headerId}
                className="accordion-header"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
              >
                {item.title}
                <span className="accordion-icon" aria-hidden="true">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="accordion-panel"
              hidden={!isExpanded}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Feature Components (Organisms)

Complex components that implement specific features must handle advanced accessibility concerns:

- Implement proper keyboard shortcuts with appropriate documentation
- Manage focus trapping for modal dialogs and similar components
- Use `aria-live` regions for dynamic content updates
- Implement proper error handling and status messaging
- Consider touch target sizes for mobile accessibility

```tsx
// Example of accessible organism component
export function DataTable({ columns, data, sortable = true }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [page, setPage] = useState(1);
  
  // Announce sort changes to screen readers
  const [announcement, setAnnouncement] = useState('');
  
  const handleSort = (columnId: string) => {
    // Sort logic
    setAnnouncement(`Table sorted by ${columnName} in ${direction} order`);
  };
  
  return (
    <div className="data-table-container">
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">{announcement}</div>
      
      <table className="data-table">
        <caption className="data-table-caption">
          {caption}
          {description && <div className="data-table-description">{description}</div>}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.id}
                scope="col"
                aria-sort={getSortDirection(column.id)}
              >
                {sortable && column.sortable !== false ? (
                  <button 
                    className="sort-button"
                    onClick={() => handleSort(column.id)}
                    aria-label={`Sort by ${column.name}`}
                  >
                    {column.name}
                    <span className="sort-icon" aria-hidden="true">
                      {getSortIcon(column.id)}
                    </span>
                  </button>
                ) : column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
        </tbody>
      </table>
      
      {/* Pagination with keyboard navigation */}
      <div className="pagination" role="navigation" aria-label="Pagination">
        {/* Pagination controls */}
      </div>
    </div>
  );
}
```

### Layout Components

Components that control page structure must ensure proper document structure:

- Use appropriate landmark roles (`main`, `nav`, `aside`, etc.)
- Implement proper heading hierarchy
- Provide skip links for keyboard navigation
- Ensure responsive layouts maintain content order for screen readers

```tsx
// Example of accessible layout component
export function PageLayout({ header, sidebar, main, footer }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <header role="banner" className="header">
        {header}
      </header>
      
      <div className="layout-container">
        <nav role="navigation" aria-label="Main Navigation" className="sidebar">
          {sidebar}
        </nav>
        
        <main id="main-content" role="main" className="main-content">
          {main}
        </main>
      </div>
      
      <footer role="contentinfo" className="footer">
        {footer}
      </footer>
    </div>
  );
}
```

## Accessibility Implementation by Design Pattern

### Compound Component Pattern

When implementing compound components, ensure accessibility relationships are maintained:

```tsx
// Accessible compound component example
export function Tabs({ children, defaultValue, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabsId = useId();
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabsId }}>
      <div className="tabs-container" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children, label = "Tabs" }) {
  const { tabsId } = useTabsContext();
  
  return (
    <div 
      role="tablist" 
      aria-label={label}
      className="tabs-list"
    >
      {children}
    </div>
  );
};

Tabs.Tab = function Tab({ value, children }) {
  const { activeTab, setActiveTab, tabsId } = useTabsContext();
  const isActive = activeTab === value;
  const id = `${tabsId}-tab-${value}`;
  const panelId = `${tabsId}-panel-${value}`;
  
  return (
    <button
      id={id}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
      onKeyDown={(e) => {
        // Handle arrow key navigation between tabs
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          // Navigation logic
        }
      }}
    >
      {children}
    </button>
  );
};

Tabs.Content = function TabContent({ value, children }) {
  const { activeTab, tabsId } = useTabsContext();
  const isActive = activeTab === value;
  const id = `${tabsId}-panel-${value}`;
  const tabId = `${tabsId}-tab-${value}`;
  
  return (
    <div 
      id={id}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isActive}
      className="tab-content"
    >
      {children}
    </div>
  );
};
```

### Custom Hook Pattern

When extracting logic to custom hooks, include accessibility concerns:

```tsx
// Accessible custom hook example
function useFormField(initialValue = '', validationFn = () => '') {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const id = useId();
  
  const validate = useCallback(() => {
    const errorMessage = validationFn(value);
    setError(errorMessage);
    return !errorMessage;
  }, [value, validationFn]);
  
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    if (touched) validate();
  }, [touched, validate]);
  
  const handleBlur = useCallback(() => {
    setTouched(true);
    validate();
  }, [validate]);
  
  return {
    value,
    setValue,
    touched,
    error,
    handleChange,
    handleBlur,
    validate,
    // Accessibility-enhanced props
    inputProps: {
      id,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': error ? 'true' : 'false',
      'aria-describedby': error ? `${id}-error` : undefined,
    },
    labelProps: {
      htmlFor: id,
    },
    errorProps: {
      id: `${id}-error`,
      role: 'alert',
    }
  };
}
```

## Responsive Accessibility Considerations

Ensure components remain accessible across different screen sizes:

- Maintain logical reading order in responsive layouts
- Ensure touch targets are at least 44×44 pixels on mobile
- Provide alternatives to hover interactions for touch devices
- Test focus management in both desktop and mobile views
- Ensure text remains readable when zoomed to 200%

```tsx
// Example of responsive accessibility
.card {
  // Base styles
  padding: 1rem;
  
  // Ensure touch targets are large enough on mobile
  @media (max-width: 768px) {
    .card__button {
      min-height: 44px;
      min-width: 44px;
      padding: 0.75rem 1rem;
    }
    
    // Increase spacing between interactive elements
    .card__actions > * + * {
      margin-left: 0.75rem;
    }
  }
  
  // Ensure text remains readable when zoomed
  .card__content {
    max-width: 100%;
    overflow-wrap: break-word;
  }
}
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
- Test with different viewport sizes

## Component-Specific Accessibility Checklists

### Form Components

- [ ] Labels are programmatically associated with inputs
- [ ] Required fields are indicated both visually and programmatically
- [ ] Error messages are linked to inputs using `aria-describedby`
- [ ] Error states use `aria-invalid="true"`
- [ ] Form groups use `fieldset` and `legend` where appropriate
- [ ] Custom form controls have proper ARIA roles and states

### Interactive Components

- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Custom keyboard shortcuts are documented and don't conflict with browser/screen reader shortcuts
- [ ] Drag and drop interfaces have keyboard alternatives
- [ ] Tooltips and popovers are accessible via keyboard
- [ ] Modal dialogs trap focus and can be dismissed with ESC key

### Data Visualization Components

- [ ] Charts have appropriate text alternatives
- [ ] Data tables use proper table structure with headers
- [ ] Interactive visualizations can be navigated with keyboard
- [ ] Color is not the only means of conveying information
- [ ] Patterns or textures supplement color differences
- [ ] Critical information is available in text format

## Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)
- [Deque University](https://dequeuniversity.com/)