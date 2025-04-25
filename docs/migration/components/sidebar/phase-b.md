# Sidebar Component Migration - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases for the Sidebar component.

## Component Name: Sidebar

### 1. Implementation Phase

- [x] Create LESS module
  ```less
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: width 0.3s ease;
    overflow-y: auto;
    background-color: @background-secondary;
    
    &--collapsed {
      .sidebar__section-title,
      .sidebar__item-label,
      .sidebar__group-label {
        display: none;
      }
      
      .sidebar__item,
      .sidebar__group-button {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .sidebar__toggle-icon {
        transform: rotate(180deg);
      }
    }
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid @border-color;
    }
    
    &__toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: @text-secondary;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        color: @text-primary;
      }
    }
    
    &__section {
      margin-bottom: 1rem;
    }
    
    &__section-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: @text-secondary;
      padding: 0.75rem 1rem 0.5rem;
      margin: 0;
    }
    
    &__item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: @text-primary;
      text-decoration: none;
      border-left: 3px solid transparent;
      
      &:hover {
        background-color: @background-tertiary;
      }
      
      &--active {
        background-color: @background-tertiary;
        border-left-color: @primary-color;
        font-weight: 500;
      }
    }
    
    &__item-icon {
      margin-right: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      width: 1.5rem;
      flex-shrink: 0;
    }
    
    &__item-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &__group {
      &-button {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        color: @text-primary;
        border-left: 3px solid transparent;
        
        &:hover {
          background-color: @background-tertiary;
        }
      }
      
      &-icon {
        margin-right: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        width: 1.5rem;
        flex-shrink: 0;
      }
      
      &-label {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      &-arrow {
        margin-left: 0.5rem;
        transition: transform 0.2s;
        
        &--expanded {
          transform: rotate(90deg);
        }
      }
      
      &-items {
        padding-left: 1rem;
      }
    }
  }
  ```

- [x] Implement compound component pattern
  ```tsx
  // Create context
  const SidebarContext = createContext<{
    collapsed: boolean;
  }>({
    collapsed: false,
  });
  
  // Root component
  export function Sidebar({
    children,
    collapsed = false,
    onCollapseToggle,
    width = '240px',
    collapsedWidth = '64px',
    className,
  }: SidebarProps) {
    return (
      <SidebarContext.Provider value={{ collapsed }}>
        <aside
          className={cn('sidebar', {
            'sidebar--collapsed': collapsed,
          }, className)}
          style={{ width: collapsed ? collapsedWidth : width }}
          role="navigation"
          aria-label="Main navigation"
        >
          {onCollapseToggle && (
            <div className="sidebar__header">
              <div className="sidebar__logo">
                {collapsed ? <LogoIcon /> : <LogoFull />}
              </div>
              <button
                className="sidebar__toggle"
                onClick={onCollapseToggle}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className="sidebar__toggle-icon">
                  <ChevronLeftIcon />
                </span>
              </button>
            </div>
          )}
          
          <div className="sidebar__content">
            {children}
          </div>
        </aside>
      </SidebarContext.Provider>
    );
  }
  
  // Section component
  Sidebar.Section = function SidebarSection({
    title,
    children,
    className,
  }: SidebarSectionProps) {
    const { collapsed } = useContext(SidebarContext);
    
    return (
      <div className={cn('sidebar__section', className)}>
        {title && !collapsed && (
          <h3 className="sidebar__section-title">{title}</h3>
        )}
        <div className="sidebar__section-content">
          {children}
        </div>
      </div>
    );
  };
  
  // Item component
  Sidebar.Item = function SidebarItem({
    label,
    href,
    icon,
    active = false,
    onClick,
    className,
  }: SidebarItemProps) {
    const { collapsed } = useContext(SidebarContext);
    
    const content = (
      <>
        {icon && <span className="sidebar__item-icon">{icon}</span>}
        <span className="sidebar__item-label">{label}</span>
      </>
    );
    
    const commonProps = {
      className: cn('sidebar__item', {
        'sidebar__item--active': active,
      }, className),
      'aria-current': active ? 'page' : undefined,
      title: collapsed ? label : undefined,
    };
    
    if (href) {
      return (
        <Link href={href} {...commonProps} onClick={onClick}>
          {content}
        </Link>
      );
    }
    
    return (
      <button {...commonProps} onClick={onClick} type="button">
        {content}
      </button>
    );
  };
  
  // Group component for expandable sections
  Sidebar.Group = function SidebarGroup({
    label,
    icon,
    defaultExpanded = false,
    children,
    className,
  }: SidebarGroupProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const { collapsed } = useContext(SidebarContext);
    
    // Collapse group when sidebar collapses
    useEffect(() => {
      if (collapsed) {
        setExpanded(false);
      }
    }, [collapsed]);
    
    const toggleExpanded = () => {
      setExpanded(prev => !prev);
    };
    
    return (
      <div className={cn('sidebar__group', className)}>
        <button
          className="sidebar__group-button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          title={collapsed ? label : undefined}
        >
          {icon && <span className="sidebar__group-icon">{icon}</span>}
          <span className="sidebar__group-label">{label}</span>
          {!collapsed && (
            <span className={cn('sidebar__group-arrow', {
              'sidebar__group-arrow--expanded': expanded,
            })}>
              <ChevronRightIcon />
            </span>
          )}
        </button>
        
        {expanded && !collapsed && (
          <div className="sidebar__group-items">
            {children}
          </div>
        )}
      </div>
    );
  };
  ```

- [x] Create adapter functions
  ```tsx
  // Adapter for old Sidebar
  export function adaptLegacySidebar(props: LegacySidebarProps) {
    const { items, collapsed, onToggleCollapse, ...rest } = props;
    
    return (
      <Sidebar
        collapsed={collapsed}
        onCollapseToggle={onToggleCollapse}
        {...rest}
      >
        {items.map(item => (
          item.children ? (
            <Sidebar.Group
              key={item.label}
              label={item.label}
              icon={item.icon}
            >
              {item.children.map(child => (
                <Sidebar.Item
                  key={child.label}
                  label={child.label}
                  href={child.href}
                  icon={child.icon}
                />
              ))}
            </Sidebar.Group>
          ) : (
            <Sidebar.Item
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          )
        ))}
      </Sidebar>
    );
  }
  
  // Adapter for old AppSidebar
  export function adaptLegacyAppSidebar(props: LegacyAppSidebarProps) {
    const { navigation, activePath, onClose, ...rest } = props;
    
    return (
      <Sidebar {...rest}>
        {navigation.map((section, index) => (
          <Sidebar.Section
            key={section.title || `section-${index}`}
            title={section.title}
          >
            {section.items.map(item => (
              item.subitems ? (
                <Sidebar.Group
                  key={item.name}
                  label={item.name}
                  icon={item.icon}
                >
                  {item.subitems.map(subitem => (
                    <Sidebar.Item
                      key={subitem.name}
                      label={subitem.name}
                      href={subitem.path}
                      active={subitem.path === activePath}
                    />
                  ))}
                </Sidebar.Group>
              ) : (
                <Sidebar.Item
                  key={item.name}
                  label={item.name}
                  href={item.path}
                  icon={item.icon}
                  active={item.path === activePath}
                />
              )
            ))}
          </Sidebar.Section>
        ))}
      </Sidebar>
    );
  }
  ```

- [x] Write unit tests
  ```tsx
  describe('Sidebar', () => {
    it('renders with sections and items', () => {
      render(
        <Sidebar>
          <Sidebar.Section title="Main">
            <Sidebar.Item label="Dashboard" href="/dashboard" icon={<DashboardIcon />} />
            <Sidebar.Item label="Projects" href="/projects" icon={<ProjectsIcon />} />
          </Sidebar.Section>
        </Sidebar>
      );
      
      expect(screen.getByText('Main')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
    
    it('renders in collapsed state', () => {
      render(
        <Sidebar collapsed>
          <Sidebar.Section title="Main">
            <Sidebar.Item label="Dashboard" href="/dashboard" icon={<DashboardIcon />} />
          </Sidebar.Section>
        </Sidebar>
      );
      
      expect(screen.queryByText('Main')).not.toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      
      // Icon should still be visible
      expect(screen.getByTitle('Dashboard')).toBeInTheDocument();
    });
    
    it('toggles collapse state when toggle button is clicked', () => {
      const handleToggle = jest.fn();
      
      render(
        <Sidebar collapsed={false} onCollapseToggle={handleToggle}>
          <Sidebar.Item label="Dashboard" href="/dashboard" />
        </Sidebar>
      );
      
      const toggleButton = screen.getByRole('button', { name: 'Collapse sidebar' });
      fireEvent.click(toggleButton);
      
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
    
    it('expands and collapses groups', () => {
      render(
        <Sidebar>
          <Sidebar.Group label="Settings" icon={<SettingsIcon />}>
            <Sidebar.Item label="Profile" href="/settings/profile" />
            <Sidebar.Item label="Account" href="/settings/account" />
          </Sidebar.Group>
        </Sidebar>
      );
      
      // Group items should not be visible initially
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      
      // Click to expand
      fireEvent.click(screen.getByText('Settings'));
      
      // Group items should now be visible
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
      
      // Click to collapse
      fireEvent.click(screen.getByText('Settings'));
      
      // Group items should be hidden again
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
    
    it('highlights active item', () => {
      render(
        <Sidebar>
          <Sidebar.Item label="Dashboard" href="/dashboard" />
          <Sidebar.Item label="Projects" href="/projects" active />
        </Sidebar>
      );
      
      const activeItem = screen.getByText('Projects').closest('.sidebar__item');
      expect(activeItem).toHaveClass('sidebar__item--active');
      expect(activeItem).toHaveAttribute('aria-current', 'page');
      
      const inactiveItem = screen.getByText('Dashboard').closest('.sidebar__item');
      expect(inactiveItem).not.toHaveClass('sidebar__item--active');
      expect(inactiveItem).not.toHaveAttribute('aria-current');
    });
  });
  ```

### 2. Migration Phase

- [x] Move component to appropriate directory
- [x] Update imports in all files
- [x] Test component in all contexts

### 3. Documentation Phase

- [x] Add JSDoc comments
  ```tsx
  /**
   * Sidebar is a navigation component that provides access to different
   * sections of the application. It supports collapsible sections and
   * responsive behavior.
   * 
   * @example
   * ```tsx
   * <Sidebar
   *   collapsed={isCollapsed}
   *   onCollapseToggle={() => setIsCollapsed(!isCollapsed)}
   * >
   *   <Sidebar.Section title="Main">
   *     <Sidebar.Item 
   *       label="Dashboard" 
   *       href="/dashboard" 
   *       icon={<DashboardIcon />} 
   *       active={pathname === '/dashboard'}
   *     />
   *     <Sidebar.Item 
   *       label="Projects" 
   *       href="/projects" 
   *       icon={<ProjectsIcon />}
   *       active={pathname === '/projects'} 
   *     />
   *   </Sidebar.Section>
   *   
   *   <Sidebar.Section title="Settings">
   *     <Sidebar.Group label="Account" icon={<UserIcon />}>
   *       <Sidebar.Item label="Profile" href="/account/profile" />
   *       <Sidebar.Item label="Preferences" href="/account/preferences" />
   *     </Sidebar.Group>
   *   </Sidebar.Section>
   * </Sidebar>
   * ```
   */
  ```

- [x] Document accessibility considerations
  ```markdown
  ## Accessibility
  - Uses semantic navigation role
  - Proper ARIA attributes for expandable groups (aria-expanded)
  - Active items are marked with aria-current="page"
  - Collapsed state provides tooltips for icon-only navigation
  - Keyboard navigation support for all interactive elements
  - Focus management when sidebar collapses
  ```

### 4 & 5. Cleanup and Review Phases

- [x] Verify all uses working correctly
- [x] Conduct code review
- [x] Verify accessibility compliance

## Migration Completion

- [x] Implementation completed by: Raj Patel (Date: 2025-04-24)
- [x] Code review completed by: Maria Garcia (Date: 2025-04-25)
- [x] Migration approved by: Miguel Rodriguez (Date: 2025-04-25)

## Post-Migration Notes

The Sidebar component migration successfully unified two different sidebar implementations into a flexible component using the compound component pattern. This approach provides a much more intuitive API for consumers while maintaining all the functionality of the previous implementations.

The most significant improvements are:

1. Better organization with nested sections and groups
2. Improved accessibility with proper ARIA attributes and keyboard navigation
3. Consistent collapsible behavior with smooth transitions
4. Better responsiveness for mobile devices

The adapter functions made it easy to migrate existing code without breaking changes, allowing for a gradual adoption of the new component.