import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonToolbar } from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  it('renders correctly with default props', () => {
    render(<ButtonToolbar>Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveClass('buttonToolbar');
    expect(toolbar).toHaveClass('buttonToolbar--spacing-md');
    expect(toolbar).toHaveClass('buttonToolbar--align-left');
  });

  it('applies custom spacing class', () => {
    render(<ButtonToolbar spacing="lg">Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('buttonToolbar--spacing-lg');
  });

  it('applies custom alignment class', () => {
    render(<ButtonToolbar align="center">Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('buttonToolbar--align-center');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<ButtonToolbar fullWidth>Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('buttonToolbar--fullWidth');
  });

  it('applies responsive class when responsive is true', () => {
    render(<ButtonToolbar responsive>Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('buttonToolbar--responsive');
  });

  it('passes additional props to the underlying div', () => {
    render(
      <ButtonToolbar data-testid="custom-toolbar" aria-label="Formatting Options">
        Button Groups
      </ButtonToolbar>
    );
    
    const toolbar = screen.getByTestId('custom-toolbar');
    expect(toolbar).toHaveAttribute('aria-label', 'Formatting Options');
  });

  it('applies custom className', () => {
    render(<ButtonToolbar className="custom-class">Button Groups</ButtonToolbar>);
    
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('custom-class');
  });
});