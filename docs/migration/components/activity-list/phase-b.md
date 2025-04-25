# ActivityList Component Migration - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases for the ActivityList component.

## Component Name: ActivityList

### 1. Implementation Phase

- [x] Create LESS module
  ```less
  .activity-list {
    &__item {
      display: flex;
      padding: 1rem 0;
      border-bottom: 1px solid @border-color-light;
      
      &:last-child { border-bottom: none; }
    }
    
    &__avatar {
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    &__content {
      flex: 1;
    }
    
    &__header {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.25rem;
    }
    
    &__actor {
      font-weight: 600;
      margin-right: 0.5rem;
    }
    
    &__timestamp {
      color: @text-secondary;
      font-size: 0.875rem;
    }
    
    &__message {
      margin-bottom: 0.5rem;
    }
    
    &__target {
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;
      background: @background-secondary;
      border-radius: 4px;
      display: inline-block;
    }
    
    &__load-more {
      text-align: center;
      padding: 1rem 0;
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

- [x] Implement component with render props pattern
  ```tsx
  export function ActivityList({
    items = [],
    isLoading = false,
    emptyState = <div className="activity-list__empty">No activity to show</div>,
    renderItem,
    onLoadMore,
    hasMore = false,
    className,
  }: ActivityListProps) {
    // Format relative time (e.g., "2 hours ago")
    const formatTime = (timestamp: string | Date) => {
      return formatRelative(new Date(timestamp), new Date());
    };
    
    // Default item renderer
    const defaultRenderItem = (item: ActivityItem) => (
      <div className="activity-list__item" key={item.id}>
        {item.actor.avatarUrl && (
          <div className="activity-list__avatar">
            <Avatar src={item.actor.avatarUrl} alt={item.actor.name} size="sm" />
          </div>
        )}
        
        <div className="activity-list__content">
          <div className="activity-list__header">
            <span className="activity-list__actor">{item.actor.name}</span>
            <time 
              className="activity-list__timestamp" 
              dateTime={new Date(item.timestamp).toISOString()}
            >
              {formatTime(item.timestamp)}
            </time>
          </div>
          
          <div className="activity-list__message">{item.content}</div>
          
          {item.target && (
            <div className="activity-list__target">
              {item.target.url ? (
                <Link href={item.target.url}>{item.target.name}</Link>
              ) : (
                <span>{item.target.name}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
    
    // Use custom renderer or default
    const itemRenderer = renderItem || defaultRenderItem;
    
    return (
      <div className={cn('activity-list', className)}>
        {items.length === 0 && !isLoading ? (
          emptyState
        ) : (
          <>
            <div role="feed" aria-busy={isLoading} aria-label="Activity feed">
              {items.map(item => itemRenderer(item))}
            </div>
            
            {isLoading && (
              <div className="activity-list__loading" aria-live="polite">
                <Spinner size="sm" /> Loading activities...
              </div>
            )}
            
            {hasMore && !isLoading && onLoadMore && (
              <div className="activity-list__load-more">
                <Button variant="secondary" onClick={onLoadMore}>
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
  ```

- [x] Create adapter function
  ```tsx
  export function adaptLegacyActivities(activities: LegacyActivity[]): ActivityItem[] {
    return activities.map(activity => ({
      id: activity.id,
      type: activity.type,
      actor: {
        id: activity.user.id || 'unknown',
        name: activity.user.name,
        avatarUrl: activity.user.avatar,
      },
      timestamp: activity.timestamp,
      content: activity.content,
      target: activity.resource ? {
        type: activity.resource.type,
        id: activity.resource.id,
        name: activity.resource.name,
      } : undefined,
    }));
  }
  ```

- [x] Write unit tests
  ```tsx
  describe('ActivityList', () => {
    const mockItems: ActivityItem[] = [
      {
        id: '1',
        type: 'comment',
        actor: { id: 'user1', name: 'John Doe' },
        timestamp: '2025-04-24T10:30:00Z',
        content: 'Added a comment',
        target: { type: 'idea', id: 'idea1', name: 'New Product Idea' },
      },
      {
        id: '2',
        type: 'update',
        actor: { id: 'user2', name: 'Jane Smith' },
        timestamp: '2025-04-24T09:15:00Z',
        content: 'Updated the description',
        target: { type: 'project', id: 'proj1', name: 'Q2 Initiative' },
      },
    ];
    
    it('renders a list of activities', () => {
      render(<ActivityList items={mockItems} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Added a comment')).toBeInTheDocument();
      expect(screen.getByText('New Product Idea')).toBeInTheDocument();
      
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Updated the description')).toBeInTheDocument();
      expect(screen.getByText('Q2 Initiative')).toBeInTheDocument();
    });
    
    it('shows empty state when no items', () => {
      render(<ActivityList items={[]} />);
      expect(screen.getByText('No activity to show')).toBeInTheDocument();
    });
    
    it('shows custom empty state', () => {
      render(
        <ActivityList 
          items={[]} 
          emptyState={<div>Nothing to see here</div>}
        />
      );
      expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
    });
    
    it('shows loading state', () => {
      render(<ActivityList items={[]} isLoading />);
      expect(screen.getByText('Loading activities...')).toBeInTheDocument();
    });
    
    it('supports custom item rendering', () => {
      render(
        <ActivityList 
          items={mockItems}
          renderItem={(item) => (
            <div key={item.id} data-testid="custom-item">
              {item.actor.name}: {item.content}
            </div>
          )}
        />
      );
      
      const customItems = screen.getAllByTestId('custom-item');
      expect(customItems).toHaveLength(2);
      expect(customItems[0]).toHaveTextContent('John Doe: Added a comment');
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
   * ActivityList displays a feed of user activities with customizable rendering.
   * 
   * @example
   * ```tsx
   * <ActivityList 
   *   items={activities}
   *   hasMore={pagination.hasMore}
   *   onLoadMore={loadMoreActivities}
   *   isLoading={isLoading}
   * />
   * ```
   * 
   * With custom rendering:
   * ```tsx
   * <ActivityList
   *   items={activities}
   *   renderItem={(item) => (
   *     <CustomActivityItem key={item.id} activity={item} />
   *   )}
   * />
   * ```
   */
  ```

- [x] Document accessibility considerations
  ```markdown
  ## Accessibility
  - Uses `role="feed"` for screen reader announcement of new items
  - Proper time elements with machine-readable datetime attributes
  - Loading state is announced via aria-live region
  - Semantic HTML structure for content
  ```

### 4 & 5. Cleanup and Review Phases

- [x] Verify all uses working correctly
- [x] Conduct code review
- [x] Verify accessibility compliance

## Migration Completion

- [x] Implementation completed by: Eliza Washington (Date: 2025-04-23)
- [x] Code review completed by: Maria Garcia (Date: 2025-04-24)
- [x] Migration approved by: Miguel Rodriguez (Date: 2025-04-24)

## Post-Migration Notes

The ActivityList component now offers much more flexibility through the render props pattern, allowing consumers to customize the appearance of activity items while maintaining consistent loading, empty states, and pagination behavior. The adapter function made the migration smooth by converting the legacy data format to the new structure.