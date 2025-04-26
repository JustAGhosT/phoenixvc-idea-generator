import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

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
        <Card.Header data-testid="card-header">Header</Card.Header>
        <Card.Content data-testid="card-content">Content</Card.Content>
        <Card.Footer data-testid="card-footer">Footer</Card.Footer>
      </Card>
    );
    
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    
    expect(screen.getByTestId('card-header')).toHaveClass('card__header');
    expect(screen.getByTestId('card-content')).toHaveClass('card__content');
    expect(screen.getByTestId('card-footer')).toHaveClass('card__footer');
  });
  
  it('passes additional props to the card element', () => {
    render(<Card data-testid="card" aria-label="Test Card">Card</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test Card');
  });
});