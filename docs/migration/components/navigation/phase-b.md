# Navigation Component Migration - Phase B

This checklist will cover the implementation, migration, documentation, cleanup, and review phases for the Navigation component.

## Component Name: Navigation

### 1. Implementation Phase (Planned)

- [ ] Create LESS module
  ```less
  // Planned structure for Navigation.less
  .nav {
    &--horizontal { display: flex; }
    &--vertical { display: flex; flex-direction: column; }
    
    &__item {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      
      &--active { font-weight: bold; }
      
      &-icon { margin-right: 0.5rem; }
    }
    
    // Mobile navigation
    &__toggle { display: none; }
    
    @media (max-width: @breakpoint-sm) {
      &--horizontal {
        flex-direction: column;
        display: none;
        
        &.nav--open { display: flex; }
      }
      
      &__toggle { 
        display: block;
        @media (min-width: @breakpoint-sm) { display: none; }
      }
    }
  }
  ```

- [ ] Implement compound component pattern
  ```tsx
  // Planned implementation - not yet implemented
  // Create context
  const NavigationContext = createContext<{
    orientation: 'horizontal' | 'vertical';
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }>({
    orientation: 'horizontal',
    isOpen: false,
    setIsOpen: () => {},
  });
  
  // Root component
  export function Navigation({
    children,
    orientation = 'horizontal',
    collapsible = false,
    className,
  }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <NavigationContext.Provider value={{ orientation, isOpen, setIsOpen }}>
        <nav
          className={cn(
            'nav',
            `nav--${orientation}`,
            { 'nav--open': isOpen },
            className
          )}
          role="navigation"
        >
          {children}
        </nav>
      </NavigationContext.Provider>
    );
  }
  
  // Item component
  Navigation.Item = function NavigationItem({
    href,
    active,
    icon,
    children,
    className,
  }: NavigationItemProps) {
    return (
      <Link
        href={href}
        className={cn(
          'nav__item',
          { 'nav__item--active': active },
          className
        )}
        aria-current={active ? 'page' : undefined}
      >
        {icon && <span className="nav__item-icon">{icon}</span>}
        {children}
      </Link>
    );
  };
  
  // Toggle component for mobile
  Navigation.Toggle = function NavigationToggle({ label = 'Menu' }) {
    const { isOpen, setIsOpen } = useContext(NavigationContext);
    
    return (
      <button
        className="nav__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {label}
        <span className="nav__toggle-icon">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </button>
    );
  };
  ```

- [ ] Write unit tests
  ```tsx
  // Planned tests - not yet implemented
  describe('Navigation', () => {
    it('renders horizontal navigation by default', () => {
      render(
        <Navigation>
          <Navigation.Item href="/home">Home</Navigation.Item>
          <Navigation.Item href="/about">About</Navigation.Item>
        </Navigation>
      );
      
      expect(screen.getByRole('navigation')).toHaveClass('nav--horizontal');
    });
    
    it('shows active item correctly', () => {
      render(
        <Navigation>
          <Navigation.Item href="/home" active>Home</Navigation.Item>
          <Navigation.Item href="/about">About</Navigation.Item>
        </Navigation>
      );
      
      const activeItem = screen.getByText('Home').closest('a');
      expect(activeItem).toHaveClass('nav__item--active');
      expect(activeItem).toHaveAttribute('aria-current', 'page');
    });
  });
  ```

### 2. Migration Phase (Planned)

- [ ] Create adapter component for backward compatibility
- [ ] Update imports in all files
- [ ] Test component in all contexts

### 3. Documentation Phase (Planned)

- [ ] Add JSDoc comments
- [ ] Document accessibility considerations

### 4 & 5. Cleanup and Review Phases (Planned)

- [ ] Verify all uses working correctly
- [ ] Conduct code review
- [ ] Verify accessibility compliance

## Migration Status

- [ ] Implementation: Not started
- [ ] Code review: Not started
- [ ] Migration approval: Not started

## Implementation Notes

This document represents the planned approach for migrating the Navigation component. The actual implementation has not yet begun. The current Navigation component (MainNav.tsx) remains in its original location and structure.

### Current Implementation

The current Navigation component is implemented in `components/layout/MainNav.tsx` and uses a different approach than the planned compound component pattern. The migration will involve significant refactoring to implement the new pattern and LESS styling.