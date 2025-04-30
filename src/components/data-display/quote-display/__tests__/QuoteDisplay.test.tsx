import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { QuoteDisplay } from '../QuoteDisplay';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('QuoteDisplay', () => {
  // Basic rendering tests
  describe('rendering', () => {
    it('renders the quote text correctly', () => {
      const quoteText = 'The best way to predict the future is to invent it.';
      render(<QuoteDisplay quote={quoteText} />);
      
      expect(screen.getByText(quoteText)).toBeInTheDocument();
    });

    it('renders with author when provided', () => {
      render(
        <QuoteDisplay 
          quote="The best way to predict the future is to invent it." 
          author="Alan Kay"
        />
      );
      
      expect(screen.getByText('Alan Kay')).toBeInTheDocument();
    });

    it('renders with source when provided', () => {
      render(
        <QuoteDisplay 
          quote="The best way to predict the future is to invent it." 
          source="1971 meeting"
        />
      );
      
      expect(screen.getByText('1971 meeting')).toBeInTheDocument();
    });

    it('renders with date when provided', () => {
      render(
        <QuoteDisplay 
          quote="The best way to predict the future is to invent it." 
          date="1971"
        />
      );
      
      expect(screen.getByText('1971')).toBeInTheDocument();
    });

    it('renders with full attribution', () => {
      render(
        <QuoteDisplay 
          quote="The best way to predict the future is to invent it." 
          author="Alan Kay"
          source="1971 meeting"
          date="1971"
        />
      );
      
      expect(screen.getByText('Alan Kay')).toBeInTheDocument();
      expect(screen.getByText('1971 meeting')).toBeInTheDocument();
      expect(screen.getByText('1971')).toBeInTheDocument();
    });

    it('applies the correct variant class', () => {
      const { rerender } = render(
        <QuoteDisplay quote="Test quote" variant="primary" />
      );
      
      const quote = screen.getByText('Test quote').closest('.quoteDisplay');
      expect(quote).toHaveClass('variantPrimary');
      
      rerender(<QuoteDisplay quote="Test quote" variant="success" />);
      expect(quote).toHaveClass('variantSuccess');
    });

    it('applies the correct size class', () => {
      const { rerender } = render(
        <QuoteDisplay quote="Test quote" size="sm" />
      );
      
      const quote = screen.getByText('Test quote').closest('.quoteDisplay');
      expect(quote).toHaveClass('sizeSM');
      
      rerender(<QuoteDisplay quote="Test quote" size="lg" />);
      expect(quote).toHaveClass('sizeLG');
    });

    it('applies the correct layout class', () => {
      const { rerender } = render(
        <QuoteDisplay quote="Test quote" layout="centered" />
      );
      
      const quote = screen.getByText('Test quote').closest('.quoteDisplay');
      expect(quote).toHaveClass('layoutCentered');
      
      rerender(<QuoteDisplay quote="Test quote" layout="bordered" />);
      expect(quote).toHaveClass('layoutBordered');
    });

    it('renders in loading state when loading is true', () => {
      render(<QuoteDisplay quote="Loading quote" loading={true} />);
      
      const quote = screen.queryByText('Loading quote');
      expect(quote).not.toBeInTheDocument(); // Text should be hidden in loading state
      
      const quoteElement = screen.getByRole('figure');
      expect(quoteElement).toHaveClass('loading');
    });
  });

  // Icon tests
  describe('icons', () => {
    it('renders with default quote icon when showIcon is true', () => {
      render(<QuoteDisplay quote="Test quote" showIcon={true} />);
      
      const iconContainer = screen.getByRole('figure').querySelector('.quoteDisplayIconContainer');
      expect(iconContainer).toBeInTheDocument();
    });

    it('does not render icon when showIcon is false', () => {
      render(<QuoteDisplay quote="Test quote" showIcon={false} />);
      
      const iconContainer = screen.getByRole('figure').querySelector('.quoteDisplayIconContainer');
      expect(iconContainer).not.toBeInTheDocument();
    });

    it('renders with custom icon when provided', () => {
      const customIcon = <div data-testid="custom-icon">★</div>;
      render(<QuoteDisplay quote="Test quote" icon={customIcon} />);
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  // Interactive behavior tests
  describe('interactive behavior', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <QuoteDisplay 
          quote="Click me" 
          onClick={handleClick}
        />
      );
      
      const quote = screen.getByRole('button');
      await user.click(quote);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct ARIA attributes when interactive', () => {
      render(
        <QuoteDisplay 
          quote="Interactive quote" 
          onClick={() => {}}
        />
      );
      
      const quote = screen.getByRole('button');
      expect(quote).toHaveAttribute('tabIndex', '0');
    });

    it('triggers onClick when Enter key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <QuoteDisplay 
          quote="Press Enter" 
          onClick={handleClick}
        />
      );
      
      const quote = screen.getByRole('button');
      // Use tab to focus the element instead of calling focus() directly
      await user.tab();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('triggers onClick when Space key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <QuoteDisplay 
          quote="Press Space" 
          onClick={handleClick}
        />
      );
      
      const quote = screen.getByRole('button');
      // Use tab to focus the element instead of calling focus() directly
      await user.tab();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('adds interactive class when onClick is provided', () => {
      render(
        <QuoteDisplay 
          quote="Interactive quote" 
          onClick={() => {}}
        />
      );
      
      const quote = screen.getByRole('button');
      expect(quote).toHaveClass('quoteDisplayInteractive');
    });
  });

  // Animation tests
  describe('animation', () => {
    it('applies animation class when animation prop is provided', () => {
      const { rerender } = render(
        <QuoteDisplay quote="Animated quote" animation="fadeIn" />
      );
      
      const quote = screen.getByText('Animated quote').closest('.quoteDisplay');
      expect(quote).toHaveClass('fadeIn');
      
      rerender(<QuoteDisplay quote="Animated quote" animation="scaleIn" />);
      expect(quote).toHaveClass('scaleIn');
    });

    it('does not apply animation class when animation is "none"', () => {
      render(<QuoteDisplay quote="No animation" animation="none" />);
      
      const quote = screen.getByText('No animation').closest('.quoteDisplay');
      expect(quote).not.toHaveClass('fadeIn');
      expect(quote).not.toHaveClass('scaleIn');
    });
  });

  // Language attribute tests
  describe('language attribute', () => {
    it('applies lang attribute when lang prop is provided', () => {
      render(
        <QuoteDisplay 
          quote="La vie est belle" 
          lang="fr"
        />
      );
      
      const quote = screen.getByText('La vie est belle').closest('.quoteDisplay');
      expect(quote).toHaveAttribute('lang', 'fr');
    });
  });

  // Loading state tests
  describe('loading state', () => {
    it('indicates loading state with aria-busy', () => {
      render(<QuoteDisplay quote="Loading" loading={true} />);
      
      const quote = screen.getByRole('figure');
      expect(quote).toHaveAttribute('aria-busy', 'true');
    });

    it('renders loading UI for attribution when in loading state', () => {
      render(
        <QuoteDisplay 
          quote="Loading" 
          author="Author"
          loading={true}
        />
      );
      
      // Author text should not be visible in loading state
      expect(screen.queryByText('Author')).not.toBeInTheDocument();
      
      // But the figcaption element should still exist
      const figcaption = screen.getByRole('figure').querySelector('figcaption');
      expect(figcaption).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <QuoteDisplay 
          quote="The best way to predict the future is to invent it." 
          author="Alan Kay"
          source="1971 meeting"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when interactive', async () => {
      const { container } = render(
        <QuoteDisplay 
          quote="Click me" 
          author="Interactive Author"
          onClick={() => {}}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations in loading state', async () => {
      const { container } = render(
        <QuoteDisplay 
          quote="Loading" 
          author="Loading Author"
          loading={true}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('uses semantic HTML structure', () => {
      render(
        <QuoteDisplay 
          quote="Semantic HTML test" 
          author="Test Author"
        />
      );
      
      // Check for semantic elements
      expect(screen.getByRole('figure')).toBeInTheDocument();
      
      // Find the blockquote element
      const blockquote = screen.getByRole('figure').querySelector('blockquote');
      expect(blockquote).toBeInTheDocument();
      expect(blockquote).toHaveTextContent('Semantic HTML test');
      
      // Find the figcaption element
      const figcaption = screen.getByRole('figure').querySelector('figcaption');
      expect(figcaption).toBeInTheDocument();
      expect(figcaption).toHaveTextContent('Test Author');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('renders without attribution elements when no author, source, or date is provided', () => {
      render(<QuoteDisplay quote="Quote without attribution" />);
      
      const figcaption = screen.getByRole('figure').querySelector('figcaption');
      expect(figcaption).not.toBeInTheDocument();
});

    it('handles empty string values gracefully', () => {
      render(
        <QuoteDisplay 
          quote="" 
          author=""
          source=""
          date=""
        />
      );
      
      // Component should render without errors
      expect(screen.getByRole('figure')).toBeInTheDocument();
    });
  });
});