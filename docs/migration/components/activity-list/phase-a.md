# ActivityList Component Migration - Phase A

This checklist covers the identification and design phases for migrating the ActivityList component.

## Component Name: ActivityList

### 1. Identification Phase

- [x] Identify all instances of the component
  - `components/activity/ActivityList.tsx`
  - `components/dashboard/RecentActivity.tsx`
- [x] Current props interface
  ```typescript
  interface ActivityListProps {
    activities: Array<{
      id: string;
      type: 'comment' | 'update' | 'create' | 'delete';
      user: { name: string; avatar?: string };
      timestamp: string | Date;
      content: string;
      resource?: { type: string; id: string; name: string };
    }>;
    limit?: number;
    onLoadMore?: () => void;
    isLoading?: boolean;
  }
  ```
- [x] Variations in usage
  - Dashboard shows limited items with no pagination
  - Activity page shows full list with load more functionality
- [x] Current styling: Mix of inline styles and CSS modules
- [x] State management: Simple props-based rendering

### 2. Design Phase

- [x] Component classification: Composite Component (Molecule)
- [x] Standardized interface
  ```typescript
  export interface ActivityItem {
    id: string;
    type: 'comment' | 'update' | 'create' | 'delete' | 'assign' | 'custom';
    actor: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    timestamp: string | Date;
    content: string;
    target?: {
      type: string;
      id: string;
      name: string;
      url?: string;
    };
    meta?: Record<string, any>;
  }
  
  export interface ActivityListProps {
    items: ActivityItem[];
    isLoading?: boolean;
    emptyState?: React.ReactNode;
    renderItem?: (item: ActivityItem) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    className?: string;
  }
  ```
- [x] Directory: `src/components/data-display/activity-list/`
- [x] Design pattern: Composition pattern with render props option
- [x] Accessibility requirements
  - Semantic list structure
  - Proper time formatting with `<time>` element
  - Loading state announcements

### 3. Migration Strategy

- [x] Migration approach: Direct replacement with adapter
- [x] Breaking changes: Renamed props and restructured item format
- [x] Estimated effort: 2 days total

## Phase A Approval

- [x] Design approved by: Sarah Chen (Date: 2025-04-21)
- [x] Technical approach approved by: Miguel Rodriguez (Date: 2025-04-22)
- [x] Ready to proceed to Phase B