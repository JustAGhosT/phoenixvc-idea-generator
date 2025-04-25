# ProjectsList Component Migration - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases for the ProjectsList component.

## Component Name: ProjectsList

### 1. Implementation Phase

- [x] Create LESS module
  ```less
  .projects-list {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    &__filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    &__list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    &__card {
      border: 1px solid @border-color;
      border-radius: 0.5rem;
      padding: 1rem;
      transition: box-shadow 0.2s;
      
      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
    
    &__card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    &__card-title {
      font-weight: 600;
      font-size: 1.125rem;
      margin: 0;
    }
    
    &__card-status {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      
      &--active { background: @success-color-light; color: @success-color-dark; }
      &--completed { background: @info-color-light; color: @info-color-dark; }
      &--on-hold { background: @warning-color-light; color: @warning-color-dark; }
      &--draft { background: @neutral-color-light; color: @neutral-color-dark; }
    }
    
    &__progress {
      margin: 0.75rem 0;
    }
    
    &__meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: @text-secondary;
    }
    
    &__members {
      display: flex;
      margin-top: 0.75rem;
    }
    
    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }
    
    &__tag {
      font-size: 0.75rem;
      background: @background-tertiary;
      padding: 0.125rem 0.5rem;
      border-radius: 1rem;
    }
    
    &__empty {
      padding: 2rem;
      text-align: center;
      color: @text-secondary;
    }
    
    &__loading {
      padding: 1rem;
      text-align: center;
    }
  }
  ```

- [x] Implement component with subcomponents
  ```tsx
  export function ProjectsList({
    projects = [],
    isLoading = false,
    layout = 'grid',
    emptyState = <div className="projects-list__empty">No projects found</div>,
    onSelectProject,
    onFilterChange,
    filters = {},
    sortOptions,
    selectedSort,
    onSortChange,
    className,
  }: ProjectsListProps) {
    // Local state for layout toggle if not controlled
    const [localLayout, setLocalLayout] = useState(layout);
    const activeLayout = layout || localLayout;
    
    // Handle project selection
    const handleProjectClick = (projectId: string) => {
      if (onSelectProject) {
        onSelectProject(projectId);
      }
    };
    
    // Format date helper
    const formatDate = (date: string | Date | undefined) => {
      if (!date) return 'No date';
      return format(new Date(date), 'MMM d, yyyy');
    };
    
    // Render project card
    const renderProject = (project: ProjectItem) => (
      <div 
        key={project.id}
        className="projects-list__card"
        onClick={() => handleProjectClick(project.id)}
        tabIndex={0}
        role="button"
        aria-label={`View ${project.name} details`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleProjectClick(project.id);
          }
        }}
      >
        <div className="projects-list__card-header">
          <h3 className="projects-list__card-title">{project.name}</h3>
          <span className={`projects-list__card-status projects-list__card-status--${project.status}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        
        {project.description && (
          <p className="projects-list__description">{project.description}</p>
        )}
        
        <div className="projects-list__progress">
          <ProgressBar 
            value={project.progress} 
            label={`${project.progress}% Complete`}
          />
        </div>
        
        <div className="projects-list__meta">
          {project.dueDate && (
            <span>Due: {formatDate(project.dueDate)}</span>
          )}
        </div>
        
        {project.members && project.members.length > 0 && (
          <div className="projects-list__members">
            <AvatarGroup 
              users={project.members.map(m => ({ 
                id: m.id, 
                name: m.name, 
                src: m.avatarUrl 
              }))}
              max={5}
            />
          </div>
        )}
        
        {project.tags && project.tags.length > 0 && (
          <div className="projects-list__tags">
            {project.tags.map(tag => (
              <span key={tag} className="projects-list__tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    );
    
    return (
      <div className={cn('projects-list', className)}>
        <div className="projects-list__header">
          <h2>Projects</h2>
          
          <div className="projects-list__controls">
            {sortOptions && onSortChange && (
              <Select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Sort projects"
              >
                {sortOptions.map(option => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
            
            <div className="projects-list__layout-toggle">
              <ToggleButtonGroup
                value={activeLayout}
                onChange={(val) => setLocalLayout(val as 'grid' | 'list' | 'compact')}
                aria-label="Change layout"
              >
                <ToggleButton value="grid" aria-label="Grid layout">
                  <GridIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="List layout">
                  <ListIcon />
                </ToggleButton>
                <ToggleButton value="compact" aria-label="Compact layout">
                  <CompactIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        
        {onFilterChange && (
          <div className="projects-list__filters">
            <StatusFilter
              value={filters.status || []}
              onChange={(status) => onFilterChange({ ...filters, status })}
            />
            
            <TagFilter
              value={filters.tags || []}
              onChange={(tags) => onFilterChange({ ...filters, tags })}
            />
            
            <SearchInput
              value={filters.search || ''}
              onChange={(search) => onFilterChange({ ...filters, search })}
              placeholder="Search projects..."
            />
          </div>
        )}
        
        {isLoading ? (
          <div className="projects-list__loading" aria-live="polite">
            <Spinner size="md" /> Loading projects...
          </div>
        ) : projects.length === 0 ? (
          emptyState
        ) : (
          <div 
            className={`projects-list__${activeLayout}`}
            role="region"
            aria-label="Projects list"
          >
            {projects.map(renderProject)}
          </div>
        )}
      </div>
    );
  }
  
  // Subcomponents for filters
  ProjectsList.StatusFilter = function StatusFilter({ value, onChange, options }) {
    // Implementation of status filter
    return <FilterChips options={options} value={value} onChange={onChange} />;
  };
  
  ProjectsList.TagFilter = function TagFilter({ value, onChange, options }) {
    // Implementation of tag filter
    return <FilterDropdown options={options} value={value} onChange={onChange} />;
  };
  ```

- [x] Create adapter function
  ```tsx
  export function adaptLegacyProjects(legacyProjects: LegacyProject[]): ProjectItem[] {
    return legacyProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      progress: project.progress,
      dueDate: project.dueDate,
      members: project.members?.map(member => ({
        id: member.id,
        name: member.name,
        avatarUrl: member.avatar,
      })),
    }));
  }
  ```

- [x] Write unit tests
  ```tsx
  describe('ProjectsList', () => {
    const mockProjects: ProjectItem[] = [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Redesign the company website',
        status: 'active',
        progress: 75,
        dueDate: '2025-05-15',
        members: [
          { id: 'user1', name: 'John Doe' },
          { id: 'user2', name: 'Jane Smith' },
        ],
        tags: ['design', 'frontend'],
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Create a new mobile app',
        status: 'on-hold',
        progress: 30,
        dueDate: '2025-06-30',
        members: [
          { id: 'user3', name: 'Mike Johnson' },
        ],
        tags: ['mobile', 'development'],
      },
    ];
    
    it('renders projects in grid layout by default', () => {
      render(<ProjectsList projects={mockProjects} />);
      
      expect(screen.getByText('Website Redesign')).toBeInTheDocument();
      expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
      expect(screen.getByText('75% Complete')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('On-hold')).toBeInTheDocument();
      
      const gridContainer = screen.getByRole('region', { name: 'Projects list' });
      expect(gridContainer).toHaveClass('projects-list__grid');
    });
    
    it('renders projects in list layout when specified', () => {
      render(<ProjectsList projects={mockProjects} layout="list" />);
      
      const listContainer = screen.getByRole('region', { name: 'Projects list' });
      expect(listContainer).toHaveClass('projects-list__list');
    });
    
    it('shows empty state when no projects', () => {
      render(<ProjectsList projects={[]} />);
      expect(screen.getByText('No projects found')).toBeInTheDocument();
    });
    
    it('calls onSelectProject when project is clicked', () => {
      const handleSelect = jest.fn();
      render(<ProjectsList projects={mockProjects} onSelectProject={handleSelect} />);
      
      fireEvent.click(screen.getByText('Website Redesign'));
      expect(handleSelect).toHaveBeenCalledWith('1');
    });
    
    it('renders filters when onFilterChange is provided', () => {
      const handleFilterChange = jest.fn();
      render(
        <ProjectsList 
          projects={mockProjects} 
          onFilterChange={handleFilterChange}
          filters={{ status: ['active'], tags: [], search: '' }}
        />
      );
      
      expect(screen.getByPlaceholderText('Search projects...')).toBeInTheDocument();
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
   * ProjectsList displays a collection of projects with filtering, sorting,
   * and layout options.
   * 
   * @example
   * ```tsx
   * <ProjectsList 
   *   projects={projects}
   *   layout="grid"
   *   onSelectProject={handleProjectSelect}
   *   onFilterChange={handleFilterChange}
   *   filters={{ status: ['active'], tags: [], search: '' }}
   *   sortOptions={[
   *     { key: 'name', label: 'Name' },
   *     { key: 'dueDate', label: 'Due Date' },
   *   ]}
   *   selectedSort="dueDate"
   *   onSortChange={handleSortChange}
   * />
   * ```
   */
  ```

- [x] Document accessibility considerations
  ```markdown
  ## Accessibility
  - Projects are navigable by keyboard
  - Layout toggle buttons have proper ARIA labels
  - Filter controls are properly labeled
  - Loading state is announced via aria-live region
  - Project cards have appropriate role and keyboard interaction
  ```

### 4 & 5. Cleanup and Review Phases

- [x] Verify all uses working correctly
- [x] Conduct code review
- [x] Verify accessibility compliance

## Migration Completion

- [x] Implementation completed by: David Kim (Date: 2025-04-24)
- [x] Code review completed by: Maria Garcia (Date: 2025-04-25)
- [x] Migration approved by: Miguel Rodriguez (Date: 2025-04-25)

## Post-Migration Notes

The ProjectsList component now offers much more flexibility with filtering, sorting, and multiple layout options. The composition pattern with subcomponents for filters makes the code more maintainable and allows for easy extension with new filter types. The adapter function made it easy to migrate from the legacy format while enhancing the data structure with new fields like tags.