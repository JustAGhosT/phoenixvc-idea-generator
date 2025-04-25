# ActivityList Component Migration

## Current Implementations

Currently, there are multiple implementations of the ActivityList component:

1. **Dashboard ActivityList** (`components/dashboard/activity-list.tsx`)
   - Used to display recent user activities on the dashboard
   - Simple implementation with fixed styling
   - Limited configurability
   - No support for filtering or pagination

2. **Project ActivityList** (`components/projects/activity-feed.tsx`)
   - Similar functionality but different naming and props
   - Used in project detail pages
   - Different styling approach
   - Includes user avatars and timestamps

3. **Idea ActivityList** (`components/ideas/activity-stream.tsx`)
   - Another variation with different naming
   - Used in idea detail pages
   - Different data structure and rendering logic

## Migration Plan

### Target Location
- New unified component: `components/common/display/ActivityList.tsx`
- LESS module: `components/common/display/ActivityList.less`
- Supporting components: `components/common/display/ActivityItem.tsx`

### Directory Structure

```
components/
└── common/
    └── display/
        ├── index.ts
        ├── ActivityList.tsx
        ├── ActivityList.less
        ├── ActivityItem.tsx
        ├── ActivityItem.less
        └── ActivityList.test.tsx
```

### Standardized Interface

The new component will use a standardized interface that supports all use cases:

```typescript
export type ActivityType = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'comment' 
  | 'assign' 
  | 'complete' 
  | 'share' 
  | 'upload'
  | 'download'
  | 'login'
  | 'custom';

export interface ActivityUser {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface ActivityResource {
  id: string;
  type: 'idea' | 'project' | 'task' | 'comment' | 'document' | 'user' | string;
  name: string;
  url?: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  user: ActivityUser;
  resource?: ActivityResource;
  secondaryResource?: ActivityResource;
  timestamp: Date | string;
  message?: string;
  metadata?: Record<string, any>;
}

export interface ActivityListProps {
  activities: ActivityItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  maxItems?: number;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  filter?: ActivityType | ActivityType[];
  groupByDate?: boolean;
  dateFormat?: string;
  timeFormat?: string;
  className?: string;
  itemClassName?: string;
  compact?: boolean;
  showUserAvatar?: boolean;
  showIcon?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
  renderItem?: (activity: ActivityItem) => React.ReactNode;
}

export interface ActivityItemProps {
  activity: ActivityItem;
  dateFormat?: string;
  timeFormat?: string;
  className?: string;
  compact?: boolean;
  showUserAvatar?: boolean;
  showIcon?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
}
```

### LESS Module Design

The LESS module will include styles for:
- List container with proper spacing and layout
- Activity item styling with consistent typography
- User avatar styling and positioning
- Activity icon styling with type-specific colors
- Timestamp formatting and positioning
- Loading state with skeleton animation
- Empty state presentation
- Compact variant for space-constrained layouts
- Responsive behavior for different screen sizes
- Date group headers when grouping by date
- Proper hover and focus states

### Implementation Strategy

1. Create the LESS modules for the ActivityList and ActivityItem components
2. Implement the core components with all features
3. Add helper functions for formatting and displaying activities
4. Create unit tests and Storybook stories
5. Update imports in dashboard, project, and idea pages
6. Test thoroughly in all contexts
7. Remove old implementations once migration is complete

### Usage Examples

#### Basic Usage

```tsx
<ActivityList 
  activities={recentActivities} 
  maxItems={5}
  showLoadMore
  onLoadMore={handleLoadMore}
/>
```

#### With Filtering

```tsx
<ActivityList 
  activities={projectActivities}
  filter={['comment', 'update', 'assign']}
  groupByDate
  showUserAvatar
  showIcon
/>
```

#### Compact Version

```tsx
<ActivityList 
  activities={userActivities}
  compact
  maxItems={3}
  className="border rounded-md p-4"
/>
```

#### Custom Rendering

```tsx
<ActivityList 
  activities={ideaActivities}
  renderItem={(activity) => (
    <div className="custom-activity-item">
      <UserAvatar user={activity.user} size="sm" />
      <div className="custom-activity-content">
        <strong>{activity.user.name}</strong> {getActivityVerb(activity.type)}{' '}
        <a href={activity.resource?.url}>{activity.resource?.name}</a>
        <span className="custom-timestamp">{formatDate(activity.timestamp)}</span>
      </div>
    </div>
  )}
/>
```

#### Loading State

```tsx
<ActivityList 
  activities={[]}
  loading
  maxItems={5}
/>
```

#### Empty State

```tsx
<ActivityList 
  activities={[]}
  emptyState={
    <div className="text-center p-4">
      <NoDataIcon className="h-12 w-12 mx-auto text-gray-400" />
      <p className="mt-2 text-gray-500">No activity recorded yet</p>
    </div>
  }
/>
```

## Accessibility Considerations

- Use semantic HTML elements (ul, li) for list structure
- Ensure proper focus management for interactive elements
- Add proper ARIA attributes for dynamic content
- Ensure sufficient color contrast for text and icons
- Use proper time elements with machine-readable datetime attributes
- Add proper alt text for user avatars
- Ensure links have descriptive text
- Consider adding aria-live regions for dynamically loading content
- Ensure proper keyboard navigation for interactive elements

## Performance Considerations

- Use virtualization for long activity lists
- Implement pagination or infinite scrolling for large datasets
- Optimize avatar loading with proper sizing and caching
- Use memoization to prevent unnecessary re-renders
- Consider using React.memo for activity items
- Implement efficient date grouping logic
- Optimize timestamp formatting to minimize calculations
- Use efficient filtering methods for activity types

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- Filtering functionality
- Date grouping behavior
- Loading state rendering
- Empty state rendering
- Custom item rendering
- Pagination/load more functionality
- Accessibility requirements
- Responsive behavior
- Proper formatting of timestamps

## Migration Checklist

- [x] **Identification Phase**
  - [x] Identify all activity list components in the codebase
  - [x] List all files where these components are used
  - [x] Document the current props and behavior
  - [x] Identify variations in usage

- [x] **Design Phase**
  - [x] Design a standardized interface
  - [x] Identify the appropriate directory
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the LESS modules
  - [ ] Create the ActivityList component
  - [ ] Create the ActivityItem component
  - [ ] Implement filtering functionality
  - [ ] Implement date grouping
  - [ ] Implement loading state
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard page
  - [ ] Update imports in project pages
  - [ ] Update imports in idea pages
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

- Need to support different activity types with appropriate icons and colors
- Consider adding animation for new activities
- Ensure consistent formatting of timestamps
- Add support for grouping activities by date
- Consider adding filtering capabilities
- Ensure proper handling of long user names and resource names
- Consider adding tooltips for truncated content
- Support for interactive elements within activity items
- Consider adding support for activity details expansion
- Add support for different avatar sizes and fallbacks
- Consider adding real-time updates for new activities

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 0.5 day
- LESS module implementation: 0.5 day
- Component implementation: 1 day
- Testing and refinement: 1 day
- Migration of existing usages: 1 day
- Documentation and cleanup: 0.5 day

**Required Resources:**
- 1 Frontend developer (primary)
- Design review for styling consistency
- QA support for testing in different contexts

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Inconsistent activity data structure | High | Create adapter functions to normalize data |
| Performance issues with large activity lists | Medium | Implement virtualization and pagination |
| Inconsistent timestamp formatting | Low | Create centralized date formatting utilities |
| Missing activity types | Medium | Design an extensible type system with fallbacks |

## Success Criteria

The migration will be considered successful when:
1. All existing activity list implementations are migrated to the new component
2. The component handles all current activity types correctly
3. Performance is equal to or better than the original implementations
4. The component is visually consistent with the design system
5. The component is fully accessible
6. All tests pass, including interaction tests
7. The old implementations are safely removed