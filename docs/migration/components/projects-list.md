# ProjectsList Component Migration

## Current Implementations

Currently, there are multiple implementations of the ProjectsList component:

1. **Dashboard ProjectsList** (`components/dashboard/projects-list.tsx`)
   - Used to display projects on the dashboard
   - Simple implementation with fixed styling
   - Limited configurability
   - No support for filtering or sorting

2. **Projects Page List** (`components/projects/projects-grid.tsx`)
   - Used on the main projects page
   - Grid-based layout rather than list
   - Different data structure and rendering logic
   - Includes more detailed project information

3. **User Projects List** (`components/profile/user-projects.tsx`)
   - Used on user profile pages
   - Shows projects associated with a specific user
   - Different styling and information display

## Migration Plan

### Target Location
- New unified component: `components/features/projects/ProjectsList.tsx`
- LESS module: `components/features/projects/ProjectsList.less`
- Supporting components: `components/features/projects/ProjectCard.tsx`, `components/features/projects/ProjectListItem.tsx`

### Directory Structure

```
components/
└── features/
    └── projects/
        ├── index.ts
        ├── ProjectsList.tsx
        ├── ProjectsList.less
        ├── ProjectCard.tsx
        ├── ProjectCard.less
        ├── ProjectListItem.tsx
        ├── ProjectListItem.less
        └── ProjectsList.test.tsx
```

### Standardized Interface

The new component will use a standardized interface that supports all use cases:

```typescript
export interface ProjectStatus {
  id: string;
  name: string;
  color: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  progress?: number;
  dueDate?: Date | string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  thumbnail?: string;
  members?: ProjectMember[];
  tags?: string[];
  metrics?: {
    tasks?: {
      total: number;
      completed: number;
    };
    budget?: {
      allocated: number;
      spent: number;
      currency?: string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export type ProjectsViewMode = 'list' | 'grid' | 'compact';
export type ProjectsSortField = 'title' | 'createdAt' | 'updatedAt' | 'dueDate' | 'progress' | 'status';
export type ProjectsSortOrder = 'asc' | 'desc';

export interface ProjectsListProps {
  projects: ProjectData[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  viewMode?: ProjectsViewMode;
  onViewModeChange?: (mode: ProjectsViewMode) => void;
  sortField?: ProjectsSortField;
  sortOrder?: ProjectsSortOrder;
  onSortChange?: (field: ProjectsSortField, order: ProjectsSortOrder) => void;
  filter?: {
    status?: string[];
    search?: string;
    tags?: string[];
    members?: string[];
  };
  onFilterChange?: (filter: any) => void;
  showViewToggle?: boolean;
  showFilters?: boolean;
  showSort?: boolean;
  showSearch?: boolean;
  onProjectClick?: (project: ProjectData) => void;
  onCreateProject?: () => void;
  pagination?: {
    pageSize: number;
    currentPage: number;
    totalItems: number;
  };
  onPageChange?: (page: number) => void;
  className?: string;
  itemClassName?: string;
  renderItem?: (project: ProjectData, viewMode: ProjectsViewMode) => React.ReactNode;
  showMembers?: boolean;
  maxMembers?: number;
  showTags?: boolean;
  maxTags?: number;
  showMetrics?: boolean;
  metricTypes?: string[];
  actionMenu?: (project: ProjectData) => React.ReactNode;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export interface ProjectCardProps {
  project: ProjectData;
  onClick?: (project: ProjectData) => void;
  className?: string;
  showMembers?: boolean;
  maxMembers?: number;
  showTags?: boolean;
  maxTags?: number;
  showMetrics?: boolean;
  metricTypes?: string[];
  actionMenu?: (project: ProjectData) => React.ReactNode;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export interface ProjectListItemProps {
  project: ProjectData;
  onClick?: (project: ProjectData) => void;
  className?: string;
  showMembers?: boolean;
  maxMembers?: number;
  showTags?: boolean;
  maxTags?: number;
  showMetrics?: boolean;
  metricTypes?: string[];
  actionMenu?: (project: ProjectData) => React.ReactNode;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  compact?: boolean;
}
```

### LESS Module Design

The LESS module will include styles for:
- List container with proper spacing and layout
- Grid layout with responsive sizing
- Project card styling with consistent typography and spacing
- Project list item styling for list view
- Status badge styling with dynamic colors
- Progress bar styling and animations
- Member avatar group styling
- Tag styling and truncation
- Loading state with skeleton animation
- Empty state presentation
- Filter and sort controls styling
- Pagination controls
- Hover and focus states for interactive elements
- Selection styling for selectable mode
- Responsive behavior for different screen sizes

### Implementation Strategy

1. Create the LESS modules for all project list components
2. Implement the core components with all features
3. Add support for different view modes (list, grid, compact)
4. Implement filtering, sorting, and pagination functionality
5. Create unit tests and Storybook stories
6. Update imports in dashboard and project pages
7. Test thoroughly in all contexts
8. Remove old implementations once migration is complete

### Usage Examples

#### Basic Usage

```tsx
<ProjectsList 
  projects={allProjects} 
  loading={isLoading}
  onProjectClick={handleProjectClick}
/>
```

#### Grid View with Filters

```tsx
<ProjectsList 
  projects={filteredProjects}
  viewMode="grid"
  showViewToggle
  showFilters
  showSort
  showSearch
  filter={{
    status: selectedStatuses,
    search: searchQuery,
    tags: selectedTags
  }}
  onFilterChange={handleFilterChange}
  sortField="updatedAt"
  sortOrder="desc"
  onSortChange={handleSortChange}
  pagination={{
    pageSize: 12,
    currentPage: currentPage,
    totalItems: totalProjects
  }}
  onPageChange={setCurrentPage}
  showMembers
  showTags
  maxTags={3}
/>
```

#### Compact List with Selection

```tsx
<ProjectsList 
  projects={userProjects}
  viewMode="compact"
  selectable
  selectedIds={selectedProjectIds}
  onSelectionChange={setSelectedProjectIds}
  showMembers={false}
  actionMenu={(project) => (
    <DropdownMenu>
      <DropdownMenuItem onClick={() => handleEdit(project)}>Edit</DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleArchive(project)}>Archive</DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleDelete(project)}>Delete</DropdownMenuItem>
    </DropdownMenu>
  )}
/>
```

#### Custom Rendering

```tsx
<ProjectsList 
  projects={teamProjects}
  renderItem={(project, viewMode) => (
    <div className="custom-project-card">
      <div className="custom-project-header">
        <h3>{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="custom-project-description">{project.description}</p>
      <div className="custom-project-footer">
        <AvatarGroup users={project.members} max={3} />
        <Button onClick={() => handleViewProject(project)}>View Details</Button>
      </div>
    </div>
  )}
/>
```

#### Empty State

```tsx
<ProjectsList 
  projects={[]}
  emptyState={
    <div className="text-center p-8">
      <FolderIcon className="h-16 w-16 mx-auto text-gray-400" />
      <h3 className="mt-2 text-lg font-medium">No projects found</h3>
      <p className="mt-1 text-gray-500">Get started by creating a new project</p>
      <Button className="mt-4" onClick={handleCreateProject}>Create Project</Button>
    </div>
  }
  onCreateProject={handleCreateProject}
/>
```

## Accessibility Considerations

- Use semantic HTML elements for list and grid structures
- Ensure proper keyboard navigation for interactive elements
- Add proper ARIA attributes for dynamic content
- Ensure sufficient color contrast for text, status badges, and tags
- Use proper heading hierarchy for project titles
- Add proper alt text for project thumbnails and member avatars
- Ensure filter and sort controls are accessible
- Implement proper focus management for interactive elements
- Add proper ARIA attributes for selection state
- Ensure pagination controls are accessible

## Performance Considerations

- Use virtualization for long project lists
- Implement pagination for large datasets
- Optimize image loading with proper sizing and lazy loading
- Use memoization to prevent unnecessary re-renders
- Consider using React.memo for project items
- Implement efficient filtering and sorting methods
- Optimize rendering of member avatars and tags
- Consider using CSS Grid for efficient layout calculations
- Implement efficient state management for filters and sorting

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- View mode switching
- Filtering functionality
- Sorting functionality
- Pagination behavior
- Selection functionality
- Loading state rendering
- Empty state rendering
- Custom item rendering
- Accessibility requirements
- Responsive behavior
- Proper handling of project data

## Migration Checklist

- [ ] **Identification Phase**
  - [x] Identify all project list components in the codebase
  - [x] List all files where these components are used
  - [x] Document the current props and behavior
  - [x] Identify variations in usage

- [ ] **Design Phase**
  - [x] Design a standardized interface
  - [x] Identify the appropriate directory
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the LESS modules
  - [ ] Create the ProjectsList component
  - [ ] Create the ProjectCard component
  - [ ] Create the ProjectListItem component
  - [ ] Implement view mode switching
  - [ ] Implement filtering and sorting
  - [ ] Implement pagination
  - [ ] Implement selection functionality
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard page
  - [ ] Update imports in projects page
  - [ ] Update imports in profile pages
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

- Need to support different view modes (list, grid, compact)
- Consider adding animation for view mode transitions
- Ensure consistent handling of project statuses with appropriate colors
- Add support for progress visualization
- Consider adding sorting capabilities
- Ensure proper handling of long project titles and descriptions
- Consider adding tooltips for truncated content
- Support for interactive elements within project items
- Consider adding drag-and-drop functionality for reordering
- Add support for different member avatar sizes and fallbacks
- Consider adding filtering by multiple criteria
- Support for batch actions on selected projects

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 1 day
- LESS module implementation: 1 day
- Component implementation: 2 days
- Testing and refinement: 1-2 days
- Migration of existing usages: 1 day
- Documentation and cleanup: 0.5 day

**Required Resources:**
- 1 Frontend developer (primary)
- Design review for styling consistency
- QA support for testing in different contexts

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Inconsistent project data structure | High | Create adapter functions to normalize data |
| Performance issues with large project lists | Medium | Implement virtualization and pagination |
| Complex filtering requirements | Medium | Design an extensible filter system with composable filters |
| Visual inconsistencies between view modes | Medium | Create shared styling tokens and consistent design patterns |

## Success Criteria

The migration will be considered successful when:
1. All existing project list implementations are migrated to the new component
2. The component supports all current view modes and functionality
3. Performance is equal to or better than the original implementations
4. The component is visually consistent with the design system
5. The component is fully accessible
6. All tests pass, including interaction tests
7. The old implementations are safely removed