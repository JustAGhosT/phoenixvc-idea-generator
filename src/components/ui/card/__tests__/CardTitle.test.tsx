import { render, screen } from '@testing-library/react';
import { CardTitle } from '../parts/CardTitle';

// Mock the styles import
jest.mock('../Card.modules.css', () => ({
  'card__title': 'card__title',
}));

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });
  
  it('applies the correct base class', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveClass('card__title');
  });
  
  it('renders as h3 by default', () => {
    render(<CardTitle data-testid="title">Default Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H3');
  });
  
  it('renders as the specified heading level', () => {
    const { rerender } = render(<CardTitle as="h1" data-testid="title">H1 Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H1');
    
    rerender(<CardTitle as="h2" data-testid="title">H2 Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H2');
    
    rerender(<CardTitle as="h4" data-testid="title">H4 Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H4');
    
    rerender(<CardTitle as="h5" data-testid="title">H5 Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H5');
    
    rerender(<CardTitle as="h6" data-testid="title">H6 Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H6');
  });
  
  it('combines className with default classes', () => {
    render(<CardTitle className="custom-title" data-testid="title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveClass('card__title', 'custom-title');
  });
  
  it('forwards ref to the underlying heading element', () => {
    const ref = jest.fn();
    render(<CardTitle ref={ref}>Title with ref</CardTitle>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLHeadingElement);
  });
  
  it('passes additional props to the title element', () => {
    render(<CardTitle data-testid="title" aria-label="Card Title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveAttribute('aria-label', 'Card Title');
  });
});