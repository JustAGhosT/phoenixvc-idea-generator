import { render, screen } from '@testing-library/react';
import { AppSidebar } from '../AppSidebar';
import { useSidebarContext } from '@/contexts/sidebar-context';

// Mock the sidebar context
jest.mock('@/contexts/sidebar-context', () => ({
  useSidebarContext: jest.fn(),
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the Sidebar component
jest.mock('@/components/patterns/sidebar', () => ({
  Sidebar: {
    Root: ({ children, ...props }) => <div data-testid="sidebar-root" {...props}>{children}</div>,
    Header: ({ children, ...props }) => <div data-testid="sidebar-header" {...props}>{children}</div>,
    Content: ({ children, ...props }) => <div data-testid="sidebar-content" {...props}>{children}</div>,
    Section: ({ title, children, ...props }) => <div data-testid={`sidebar-section-${title}`} {...props}>{children}</div>,
    Item: ({ title, ...props }) => <div data-testid={`sidebar-item-${title}`} {...props}>{title}</div>,
    Footer: ({ children, ...props }) => <div data-testid="sidebar-footer" {...props}>{children}</div>,
    Rail: (props) => <div data-testid="sidebar-rail" {...props} />,
    Trigger: (props) => <button data-testid="sidebar-trigger" {...props} />,
  },
}));

describe('AppSidebar', () => {
  beforeEach(() => {
    // Mock the sidebar context values
    (useSidebarContext as jest.Mock).mockReturnValue({
      isOpen: true,
      toggleSidebar: jest.fn(),
    });
    
    // Mock the pathname
    (require('next/navigation').usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the sidebar structure correctly', () => {
    render(<AppSidebar />);
    
    // Check main components
    expect(screen.getByTestId('sidebar-root')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-rail')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument();
    
    // Check sections
    expect(screen.getByTestId('sidebar-section-Projects')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-section-Analysis')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-section-Resources')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-section-Settings')).toBeInTheDocument();
    
    // Check some items
    expect(screen.getByTestId('sidebar-item-Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-Risk Intelligence')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-Settings')).toBeInTheDocument();
  });

  it('passes isOpen state to relevant components', () => {
    render(<AppSidebar />);
    
    const rootElement = screen.getByTestId('sidebar-root');
    expect(rootElement).toHaveAttribute('expanded', 'true');
    expect(rootElement).toHaveAttribute('open', 'true');
    
    const headerElement = screen.getByTestId('sidebar-header');
    expect(headerElement).toHaveAttribute('collapsed', 'false');
    
    // Logo text should be visible when sidebar is open
    expect(screen.getByText('DeFi Risk Intel')).toBeInTheDocument();
  });

  it('hides footer and logo text when sidebar is closed', () => {
    // Mock the sidebar as closed
    (useSidebarContext as jest.Mock).mockReturnValue({
      isOpen: false,
      toggleSidebar: jest.fn(),
    });
    
    render(<AppSidebar />);
    
    // Logo text should not be visible
    expect(screen.queryByText('DeFi Risk Intel')).not.toBeInTheDocument();
    
    // Footer should not be rendered
    expect(screen.queryByTestId('sidebar-footer')).not.toBeInTheDocument();
  });
});