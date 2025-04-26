import { render, screen } from '@testing-library/react';
import { CardHeader } from '../parts/CardHeader';

// Mock the styles import
jest.mock('../Card.module.css', () => ({
  'card__header': 'card__header',
  'card__header--with-actions': 'card__header--with-actions',
}));

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <CardHeader>
        <div data-testid="header-content">Header Content</div>
      </CardHeader>
    );
    
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });
  
  it('applies the correct base class', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('card__header');
  });
  
  it('applies the with-actions class when withActions prop is true', () => {
    render(<CardHeader data-testid="header" withActions>Header with Actions</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('card__header--with-actions');
  });
  
  it('combines className with default classes', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('card__header', 'custom-header');
  });
  
  it('forwards ref to the underlying div element', () => {
    const ref = jest.fn();
    render(<CardHeader ref={ref}>Header with ref</CardHeader>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });
  
  it('passes additional props to the header element', () => {
    render(<CardHeader data-testid="header" aria-label="Header Section">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveAttribute('aria-label', 'Header Section');
  });
});