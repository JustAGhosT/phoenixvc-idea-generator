import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StatCard } from '../StatCard';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('StatCard', () => {
  // Basic rendering tests
  describe('rendering', () => {
    it('renders the title and value correctly', () => {
      render(<StatCard title="Total Users" value={1234} />);
      
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('renders with description when provided', () => {
      render(
        <StatCard 
          title="Revenue" 
          value="$8,492" 
          description="Monthly revenue"
        />
      );
      
      expect(screen.getByText('Monthly revenue')).toBeInTheDocument();
    });

    it('applies the correct variant class', () => {
      const { rerender } = render(
        <StatCard title="Test" value="100" variant="primary" />
      );
      
      const card = screen.getByText('Test').closest('.statCard');
      expect(card).toHaveClass('variantPrimary');
      
      rerender(<StatCard title="Test" value="100" variant="success" />);
      expect(card).toHaveClass('variantSuccess');
    });

    it('renders in loading state when loading is true', () => {
      render(<StatCard title="Loading" value="--" loading={true} />);
      
      const card = screen.getByText('Loading').closest('.statCard');
      expect(card).toHaveClass('loading');
    });

    it('renders in compact mode when compact is true', () => {
      render(<StatCard title="Compact" value="100" compact={true} />);
      
      const card = screen.getByText('Compact').closest('.statCard');
      expect(card).toHaveClass('compact');
    });
  });

  // Icon tests
  describe('icons', () => {
    it('renders with string icon identifier', () => {
      render(<StatCard title="Users" value={42} icon="users" />);
      
      // Check if an SVG icon is rendered
      const iconContainer = screen.getByText('Users').parentElement?.querySelector('.iconContainer');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders with custom React node icon', () => {
      const customIcon = <div data-testid="custom-icon">🚀</div>;
      render(<StatCard title="Custom" value={42} icon={customIcon} />);
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  // Trend indicator tests
  describe('trend indicators', () => {
    it('renders positive trend correctly', () => {
      render(
        <StatCard 
          title="Revenue" 
          value="$8,492" 
          trend={{
            value: 12.5,
            label: "vs last month",
            direction: "up",
            isGood: true
          }}
        />
      );
      
      const trendIndicator = screen.getByTestId('trend-indicator');
      expect(trendIndicator).toHaveClass('up');
      expect(trendIndicator).toHaveClass('good');
      expect(trendIndicator).toHaveTextContent('+12.5');
      expect(trendIndicator).toHaveTextContent('vs last month');
    });

    it('renders negative trend correctly', () => {
      render(
        <StatCard 
          title="Bounce Rate" 
          value="24.8%" 
          trend={{
            value: 3.2,
            label: "vs last month",
            direction: "up",
            isGood: false
          }}
        />
      );
      
      const trendIndicator = screen.getByTestId('trend-indicator');
      expect(trendIndicator).toHaveClass('up');
      expect(trendIndicator).toHaveClass('bad');
      expect(trendIndicator).toHaveTextContent('+3.2');
    });

    it('renders neutral trend correctly', () => {
      render(
        <StatCard 
          title="Stability" 
          value="100%" 
          trend={{
            value: 0,
            label: "no change",
            direction: "neutral"
          }}
        />
      );
      
      const trendIndicator = screen.getByTestId('trend-indicator');
      expect(trendIndicator).toHaveClass('neutral');
      expect(trendIndicator).toHaveTextContent('0');
    });
  });

  // Interactive behavior tests
  describe('interactive behavior', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <StatCard 
          title="Clickable" 
          value="Click me" 
          onClick={handleClick}
        />
      );
      
      // Using role="button" to find the interactive card
      const card = screen.getByRole('button');
      await user.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct ARIA attributes when interactive', () => {
      render(
        <StatCard 
          title="Interactive" 
          value="Click me" 
          onClick={() => {}}
        />
      );
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('triggers onClick when Enter key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <StatCard 
          title="Keyboard" 
          value="Press Enter" 
          onClick={handleClick}
        />
      );
      
      // Use tab to focus the element instead of calling focus() directly
      await user.tab();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('triggers onClick when Space key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <StatCard 
          title="Keyboard" 
          value="Press Space" 
          onClick={handleClick}
        />
      );
      
      // Use tab to focus the element instead of calling focus() directly
      await user.tab();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Formatting tests
  describe('value formatting', () => {
    it('applies prefix and suffix correctly', () => {
      render(
        <StatCard 
          title="Price" 
          value={100} 
          valuePrefix="$"
          valueSuffix=".00"
        />
      );
      
      expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('uses custom formatter when provided', () => {
      const formatter = (value: number | string) => 
        `${Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
      
      render(
        <StatCard 
          title="Revenue" 
          value={1234567} 
          formatter={formatter}
        />
      );
      
      expect(screen.getByText('$1,234,567.00')).toBeInTheDocument();
    });
  });

  // Tooltip tests
  describe('tooltip', () => {
    it('renders with tooltip when tooltipContent is provided', () => {
      render(
        <StatCard 
          title="With Tooltip" 
          value={42} 
          tooltipContent="This is a tooltip"
        />
      );
      
      // Note: Actual tooltip visibility would need to be tested in an integration test
      // Here we're just checking that the component renders without errors
      expect(screen.getByText('With Tooltip')).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <StatCard title="Accessible" value={100} description="Testing accessibility" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with trend', async () => {
      const { container } = render(
        <StatCard 
          title="Trend" 
          value={100} 
          trend={{
            value: 10,
            label: "increase",
            direction: "up",
            isGood: true
          }}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct aria attributes', () => {
      render(
        <StatCard 
          title="ARIA Test" 
          value={100} 
          description="With description"
        />
      );
      
      const card = screen.getByText('ARIA Test').closest('.statCard');
      
      // The title ID is dynamically generated, so we check that it exists
      expect(card).toHaveAttribute('aria-labelledby');
      
      // The description ID is dynamically generated, so we check that it exists
      expect(card).toHaveAttribute('aria-describedby');
    });

    it('uses custom ariaLabel when provided', () => {
      render(
        <StatCard 
          title="ARIA Label" 
          value={100} 
          ariaLabel="Custom ARIA label"
        />
      );
      
      const card = screen.getByText('ARIA Label').closest('.statCard');
      expect(card).toHaveAttribute('aria-label', 'Custom ARIA label');
    });

    it('indicates loading state with aria-busy', () => {
      render(<StatCard title="Loading" value="--" loading={true} />);
      
      const card = screen.getByText('Loading').closest('.statCard');
      expect(card).toHaveAttribute('aria-busy', 'true');
    });
  });
});