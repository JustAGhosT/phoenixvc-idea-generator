import { render, screen } from '@testing-library/react';
import { Card } from '../Card';
import { CardContent } from '../parts/CardContent';
import { CardDescription } from '../parts/CardDescription';
import { CardFooter } from '../parts/CardFooter';
import { CardHeader } from '../parts/CardHeader';
import { CardTitle } from '../parts/CardTitle';

// Mock the styles import
jest.mock('../Card.module.css', () => ({
  card: 'card',
  'card--default': 'card--default',
  'card--outline': 'card--outline',
  'card--elevated': 'card--elevated',
  'card--filled': 'card--filled',
  'card--gradient': 'card--gradient',
  'card--ghost': 'card--ghost',
  'card--interactive': 'card--interactive',
  'card--padding-none': 'card--padding-none',
  'card--padding-sm': 'card--padding-sm',
  'card--padding-md': 'card--padding-md',
  'card--padding-lg': 'card--padding-lg',
  'card--full-width': 'card--full-width',
  'card__header': 'card__header',
  'card__header--with-actions': 'card__header--with-actions',
  'card__content': 'card__content',
  'card__footer': 'card__footer',
  'card__title': 'card__title',
  'card__description': 'card__description',
}));

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="card-content">Card Content</div>
      </Card>
    );
    
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
  
  it('applies the correct variant class', () => {
    const { rerender } = render(<Card data-testid="card">Default Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--default');
    
    rerender(<Card data-testid="card" variant="outline">Outline Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--outline');
    
    rerender(<Card data-testid="card" variant="elevated">Elevated Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--elevated');
    
    rerender(<Card data-testid="card" variant="filled">Filled Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--filled');
    
    rerender(<Card data-testid="card" variant="gradient">Gradient Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--gradient');
    
    rerender(<Card data-testid="card" variant="ghost">Ghost Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--ghost');
  });
  
  it('applies the interactive class when interactive prop is true', () => {
    render(<Card data-testid="card" interactive>Interactive Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--interactive');
  });
  
  it('applies the correct padding class', () => {
    const { rerender } = render(<Card data-testid="card">Default Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--padding-md');
    
    rerender(<Card data-testid="card" padding="none">No Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--padding-none');
    
    rerender(<Card data-testid="card" padding="sm">Small Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--padding-sm');
    
    rerender(<Card data-testid="card" padding="lg">Large Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--padding-lg');
  });
  
  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Card data-testid="card" fullWidth>Full Width Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card--full-width');
  });
  
  it('renders compound components correctly', () => {
    render(
      <Card>
        <CardHeader data-testid="card-header">Header</CardHeader>
        <CardContent data-testid="card-content">Content</CardContent>
        <CardFooter data-testid="card-footer">Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    
    expect(screen.getByTestId('card-header')).toHaveClass('card__header');
    expect(screen.getByTestId('card-content')).toHaveClass('card__content');
    expect(screen.getByTestId('card-footer')).toHaveClass('card__footer');
});
  
  it('renders title and description correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle data-testid="card-title">Card Title</CardTitle>
          <CardDescription data-testid="card-description">Card Description</CardDescription>
        </CardHeader>
      </Card>
    );
    
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    
    expect(screen.getByTestId('card-title')).toHaveClass('card__title');
    expect(screen.getByTestId('card-description')).toHaveClass('card__description');
  });
  
  it('passes additional props to the card element', () => {
    render(<Card data-testid="card" aria-label="Test Card">Card</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test Card');
  });
  
  it('supports header with actions layout', () => {
    render(
      <Card>
        <CardHeader withActions data-testid="card-header">
          <CardTitle>Title</CardTitle>
          <div data-testid="actions">Actions</div>
        </CardHeader>
      </Card>
    );
    
    expect(screen.getByTestId('card-header')).toHaveClass('card__header--with-actions');
    expect(screen.getByTestId('actions')).toBeInTheDocument();
  });
  
  it('supports custom heading level in CardTitle', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle as="h1" data-testid="h1-title">H1 Title</CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle as="h2" data-testid="h2-title">H2 Title</CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle as="h6" data-testid="h6-title">H6 Title</CardTitle>
        </CardHeader>
      </Card>
    );
    
    expect(screen.getByTestId('h1-title').tagName).toBe('H1');
    expect(screen.getByTestId('h2-title').tagName).toBe('H2');
    expect(screen.getByTestId('h6-title').tagName).toBe('H6');
  });
  
  it('combines className with default classes', () => {
    render(
      <Card className="custom-class" data-testid="card">
        <CardHeader className="custom-header" data-testid="header">
          <CardTitle className="custom-title" data-testid="title">Title</CardTitle>
          <CardDescription className="custom-description" data-testid="description">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content" data-testid="content">Content</CardContent>
        <CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('card')).toHaveClass('card', 'custom-class');
    expect(screen.getByTestId('header')).toHaveClass('card__header', 'custom-header');
    expect(screen.getByTestId('title')).toHaveClass('card__title', 'custom-title');
    expect(screen.getByTestId('description')).toHaveClass('card__description', 'custom-description');
    expect(screen.getByTestId('content')).toHaveClass('card__content', 'custom-content');
    expect(screen.getByTestId('footer')).toHaveClass('card__footer', 'custom-footer');
  });
  
  it('forwards ref to the underlying div element', () => {
    const ref = jest.fn();
    render(<Card ref={ref}>Card with ref</Card>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });
  
  it('supports multiple variant combinations', () => {
    render(
      <div>
        <Card data-testid="card1" variant="elevated" interactive>Card 1</Card>
        <Card data-testid="card2" variant="outline" fullWidth>Card 2</Card>
        <Card data-testid="card3" variant="ghost" padding="lg">Card 3</Card>
      </div>
    );
    
    expect(screen.getByTestId('card1')).toHaveClass('card--elevated', 'card--interactive');
    expect(screen.getByTestId('card2')).toHaveClass('card--outline', 'card--full-width');
    expect(screen.getByTestId('card3')).toHaveClass('card--ghost', 'card--padding-lg');
  });
});