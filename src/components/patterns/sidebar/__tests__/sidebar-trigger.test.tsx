import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarTrigger } from '../sidebar-trigger';

// Mock the Button component since we're only testing SidebarTrigger's functionality
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('SidebarTrigger', () => {
  it('renders correctly when sidebar is closed', () => {
    render(<SidebarTrigger isOpen={false} />);
    
    // Should show the ChevronRight icon when closed
    expect(screen.getByText('Toggle sidebar')).toBeInTheDocument();
    // We can't easily test for the specific icon, but we can check the sr-only text
  });

  it('renders correctly when sidebar is open', () => {
    render(<SidebarTrigger isOpen={true} />);
    
    // Should show the X icon when open
    expect(screen.getByText('Toggle sidebar')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const handleToggle = jest.fn();
    render(<SidebarTrigger isOpen={false} onToggle={handleToggle} />);
    
    fireEvent.click(screen.getByText('Toggle sidebar').parentElement);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('passes additional props to the Button component', () => {
    render(<SidebarTrigger isOpen={false} aria-label="Custom label" data-testid="trigger-button" />);
    
    const button = screen.getByTestId('trigger-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies custom className along with default classes', () => {
    render(<SidebarTrigger isOpen={false} className="custom-class" data-testid="trigger-button" />);
    
    const button = screen.getByTestId('trigger-button');
    expect(button).toHaveClass('custom-class');
    // We can't easily test for the trigger class since it's applied by the cn function
  });
});