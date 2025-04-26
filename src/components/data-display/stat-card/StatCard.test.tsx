import { fireEvent, render, screen } from '@testing-library/react';
import { AlertCircleIcon } from 'lucide-react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders with basic props', () => {
    render(<StatCard title="Users" value={1234} />);
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });
  
  it('renders with description', () => {
    render(
      <StatCard 
        title="Users" 
        value={1234} 
        description="Active users this month" 
      />
    );
    
    expect(screen.getByText('Active users this month')).toBeInTheDocument();
  });
  
  it('renders with string icon', () => {
    render(
      <StatCard 
        title="Ideas" 
        value={42} 
        icon="lightbulb" 
      />
    );
    
    // Check that an icon element is present
    const iconContainer = screen.getByText('Ideas').parentElement?.querySelector('[aria-hidden="true"]');
    expect(iconContainer).toBeInTheDocument();
  });
  
  it('renders with React node icon', () => {
    render(
      <StatCard 
        title="Issues" 
        value={3} 
        icon={<AlertCircleIcon data-testid="custom-icon" />} 
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  it('renders with trend indicator', () => {
    render(
      <StatCard 
        title="Growth" 
        value={15} 
        trend={{
          value: 5.2,
          direction: 'up',
          label: 'vs last month',
          isGood: true
        }}
      />
    );
    
    expect(screen.getByText('+5.2')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByTestId('trend-indicator')).toHaveClass('good');
  });
  
  it('renders negative trend correctly', () => {
    render(
      <StatCard 
        title="Bounce Rate" 
        value="24.8%" 
        trend={{
          value: 3.2,
          direction: 'up',
          label: 'vs last month',
          isGood: false
        }}
      />
    );
    
    expect(screen.getByText('+3.2')).toBeInTheDocument();
    expect(screen.getByTestId('trend-indicator')).toHaveClass('bad');
  });
  
  it('renders in loading state', () => {
    render(
      <StatCard 
        title="Loading" 
        value="--" 
        loading={true} 
      />
    );
    
    expect(screen.getByText('Loading')).toBeInTheDocument();
    // The value should be rendered but visually hidden in loading state
    const card = screen.getByText('Loading').closest('.statCard');
    expect(card).toHaveClass('loading');
  });
  
  it('is interactive when onClick is provided', () => {
    const handleClick = jest.fn();
    render(
      <StatCard 
        title="Clickable" 
        value={100} 
        onClick={handleClick} 
      />
    );
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('supports keyboard navigation for interactive cards', () => {
    const handleClick = jest.fn();
    render(
      <StatCard 
        title="Keyboard Accessible" 
        value={100} 
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
  
  it('applies value formatting correctly', () => {
    render(
      <StatCard 
        title="Revenue" 
        value={1000} 
        valuePrefix="$" 
        valueSuffix=".00" 
      />
    );
    
    expect(screen.getByText('$1000.00')).toBeInTheDocument();
  });
  
  it('uses formatter function when provided', () => {
    const formatter = (value: number | string) => `$${Number(value).toLocaleString()}`;
    render(
      <StatCard 
        title="Revenue" 
        value={1000000} 
        formatter={formatter} 
      />
    );
    
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
  });
  
  it('applies compact styling when specified', () => {
    render(
      <StatCard 
        title="Compact" 
        value={42} 
        compact={true} 
      />
    );
    
    const card = screen.getByText('Compact').closest('.statCard');
    expect(card).toHaveClass('compact');
  });
});