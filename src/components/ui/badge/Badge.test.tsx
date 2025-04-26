import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>);
    
    expect(screen.getByText('New')).toBeInTheDocument();
  });
  
  it('applies different variants correctly', () => {
    const { rerender } = render(<Badge data-testid="badge">Default</Badge>);
    
    let badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--default');
    
    rerender(<Badge data-testid="badge" variant="primary">Primary</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--primary');
    
    rerender(<Badge data-testid="badge" variant="secondary">Secondary</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--secondary');
    
    rerender(<Badge data-testid="badge" variant="success">Success</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--success');
    
    rerender(<Badge data-testid="badge" variant="warning">Warning</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--warning');
    
    rerender(<Badge data-testid="badge" variant="danger">Danger</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--danger');
    
    rerender(<Badge data-testid="badge" variant="info">Info</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--info');
  });
  
  it('applies different sizes correctly', () => {
    const { rerender } = render(<Badge data-testid="badge" size="sm">Small</Badge>);
    
    let badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--sm');
    
    rerender(<Badge data-testid="badge" size="md">Medium</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--md');
    
    rerender(<Badge data-testid="badge" size="lg">Large</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--lg');
  });
  
  it('applies rounded class when rounded prop is true', () => {
    render(<Badge data-testid="badge" rounded>42</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--rounded');
  });
  
  it('applies outline classes when outline prop is true', () => {
    const { rerender } = render(<Badge data-testid="badge" outline>Outline</Badge>);
    
    let badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--outline');
    expect(badge).toHaveClass('badge--outline-default');
    
    rerender(<Badge data-testid="badge" outline variant="primary">Primary Outline</Badge>);
    badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--outline');
    expect(badge).toHaveClass('badge--outline-primary');
  });
  
  it('combines multiple style props correctly', () => {
    render(<Badge data-testid="badge" variant="success" size="lg" rounded outline>Success</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge--success');
    expect(badge).toHaveClass('badge--lg');
    expect(badge).toHaveClass('badge--rounded');
    expect(badge).toHaveClass('badge--outline');
    expect(badge).toHaveClass('badge--outline-success');
  });
  
  it('passes additional props to the span element', () => {
    render(<Badge data-testid="badge" aria-label="Status indicator">Status</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('aria-label', 'Status indicator');
  });
  
  it('applies additional className when provided', () => {
    render(<Badge data-testid="badge" className="custom-class">Custom</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('custom-class');
  });
});