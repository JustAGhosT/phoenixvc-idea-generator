import { render, screen, fireEvent } from '@testing-library/react';
import { StatCard } from './StatCard';
import { Rocket } from 'lucide-react';

describe('StatCard Component', () => {
  // Basic rendering tests
  it('renders with basic props', () => {
    render(
      <StatCard 
        title="Total Users" 
        value={1234} 
        description="Active users this month" 
      />
    );
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('Active users this month')).toBeInTheDocument();
  });
  
  // Icon tests
  it('renders with string icon', () => {
    render(
      <StatCard 
        title="Ideas" 
        value={42} 
        icon="lightbulb" 
      />
    );
    
    // Check that an icon is rendered (can't easily check the specific icon)
    expect(document.querySelector('.card-icon')).toBeInTheDocument();
  });

  it('renders with ReactNode icon', () => {
    render(
      <StatCard 
        title="Projects" 
        value={8} 
        icon={<Rocket data-testid="rocket-icon" className="h-5 w-5" />} 
      />
    );
    
    expect(screen.getByTestId('rocket-icon')).toBeInTheDocument();
  });
  
  // Variant tests
  it('applies variant classes correctly', () => {
    const { container, rerender } = render(
      <StatCard 
        title="Critical Issues" 
        value={3} 
        variant="danger" 
      />
    );
    
    expect(container.querySelector('.stat-card.danger')).toBeInTheDocument();
    
    rerender(
      <StatCard 
        title="Critical Issues" 
        value={3} 
        variant="success" 
      />
    );
    
    expect(container.querySelector('.stat-card.success')).toBeInTheDocument();
  });
  
  // Trend tests
  it('renders trend indicator correctly', () => {
    render(
      <StatCard 
        title="Revenue" 
        value="$5,231" 
        trend={{
          value: 12.5,
          label: "vs last month",
          direction: "up",
          isGood: true
        }} 
      />
    );
    
    expect(screen.getByText('+12.5')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    
    // Check that the trend class is applied
    const trendElement = screen.getByText('+12.5').closest('.trend-indicator');
    expect(trendElement).toHaveClass('up');
    expect(trendElement).toHaveClass('good');
  });
  
  it('renders negative trend correctly', () => {
    render(
      <StatCard 
        title="Expenses" 
        value="$2,845" 
        trend={{
          value: 8.3,
          label: "vs last month",
          direction: "down",
          isGood: true // down is good for expenses
        }} 
      />
    );
    
    expect(screen.getByText('-8.3')).toBeInTheDocument();
    
    // Check that the trend class is applied
    const trendElement = screen.getByText('-8.3').closest('.trend-indicator');
    expect(trendElement).toHaveClass('down');
    expect(trendElement).toHaveClass('good');
  });
  
  // Loading state test
  it('shows loading state correctly', () => {
    const { container } = render(
      <StatCard 
        title="Data" 
        value="--" 
        loading={true} 
      />
    );
    
    expect(container.querySelector('.stat-card.loading')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument(); // Em dash for loading
  });
  
  // Interactive behavior test
  it('handles click events', () => {
    const handleClick = jest.fn();
    
    render(
      <StatCard 
        title="Clickable Card" 
        value={42} 
        onClick={handleClick} 
      />
    );
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Keyboard accessibility test
  it('supports keyboard interaction', () => {
    const handleClick = jest.fn();
    
    render(
      <StatCard 
        title="Keyboard Accessible" 
        value={42} 
        onClick={handleClick} 
      />
    );
    
    const card = screen.getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // Compact mode test
  it('renders in compact mode', () => {
    const { container } = render(
      <StatCard 
        title="Compact Card" 
        value={24} 
        compact={true} 
      />
    );
    
    expect(container.querySelector('.stat-card.compact')).toBeInTheDocument();
  });
  
  // Prefix and suffix test
  it('renders value with prefix and suffix', () => {
    render(
      <StatCard 
        title="Price" 
        value={99.99} 
        valuePrefix="$" 
        valueSuffix=" USD" 
      />
    );
    
    expect(screen.getByText('$99.99 USD')).toBeInTheDocument();
});
  
  // Tooltip test
  it('renders with tooltip', () => {
    render(
      <StatCard 
        title="With Tooltip" 
        value={42} 
        tooltipContent="This is a tooltip" 
      />
    );
    
    // Tooltip content is not visible until hover
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    
    // Hover to show tooltip (in actual implementation)
    // This is a simplified check since tooltips often use portals
    // and require more complex testing
  });
  
  // Accessibility attributes test
  it('has proper accessibility attributes', () => {
    render(
      <StatCard 
        title="Accessible Card" 
        value={42} 
        description="Description for screen readers" 
      />
    );
    
    // Check for aria-labelledby and aria-describedby
    const titleId = screen.getByText('Accessible Card').id;
    const descriptionId = screen.getByText('Description for screen readers').id;
    
    const card = screen.getByText('42').closest('.stat-card');
    expect(card).toHaveAttribute('aria-labelledby', titleId);
    expect(card).toHaveAttribute('aria-describedby', descriptionId);
  });
});