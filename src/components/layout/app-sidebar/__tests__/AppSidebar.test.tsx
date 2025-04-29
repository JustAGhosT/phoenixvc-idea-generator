import { render, screen } from '@testing-library/react';
import { AppSidebar } from '../AppSidebar';

// Mock the sidebar context
jest.mock('@/contexts/sidebar-context', () => ({
  useSidebarContext: () => ({
    isOpen: true,
    toggleSidebar: jest.fn(),
    closeSidebar: jest.fn(),
    openSidebar: jest.fn(),
  }),
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock the Sidebar component with a simpler approach that doesn't pass custom props to DOM elements
jest.mock('@/components/patterns/sidebar', () => {
  const SidebarMock = {
    Root: ({ children, expanded, open, onOverlayClick, ...props }) => (
      <div 
        data-testid="sidebar-root" 
        data-expanded={expanded ? "true" : "false"} 
        data-open={open ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    ),
    Header: ({ children, collapsed, ...props }) => (
      <div 
        data-testid="sidebar-header" 
        data-collapsed={collapsed ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    ),
    Content: ({ children, ...props }) => (
      <div data-testid="sidebar-content" {...props}>
        {children}
      </div>
    ),
    Section: ({ title, children, isOpen, ...props }) => (
      <div 
        data-testid={`sidebar-section-${title}`} 
        data-is-open={isOpen ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    ),
    Item: ({ title, isActive, isOpen, itemIndex, icon, badge, href, ...props }) => (
      <div 
        data-testid={`sidebar-item-${title}`}
        data-is-active={isActive ? "true" : "false"}
        data-is-open={isOpen ? "true" : "false"}
        data-item-index={itemIndex}
        data-href={href}
        {...props}
      >
        {title}
      </div>
    ),
    Footer: ({ children, ...props }) => (
      <div data-testid="sidebar-footer" {...props}>
        {children}
      </div>
    ),
    Rail: ({ onResize, ...props }) => <div data-testid="sidebar-rail" {...props} />,
    Trigger: ({ isOpen, onToggle, ...props }) => (
      <button 
        data-testid="sidebar-trigger" 
        data-is-open={isOpen ? "true" : "false"}
        onClick={onToggle}
        {...props} 
      />
    ),
  };
  
  return { Sidebar: SidebarMock };
});

describe('AppSidebar', () => {
  it('renders the sidebar structure correctly', () => {
    render(<AppSidebar />);
    
    // Check main components
    expect(screen.getByTestId('sidebar-root')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-rail')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument();
  });

  it('passes isOpen state to relevant components', () => {
    render(<AppSidebar />);
    
    // Check if data attributes are set correctly instead of props
    expect(screen.getByTestId('sidebar-root')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('sidebar-header')).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('sidebar-trigger')).toHaveAttribute('data-is-open', 'true');
  });
});