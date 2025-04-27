import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../../button/Button';

describe('ButtonGroup', () => {
  it('renders correctly with default props', () => {
    render(
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass('buttonGroup');
    expect(group).toHaveClass('buttonGroup--horizontal');
  });

  it('applies vertical orientation class', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toHaveClass('buttonGroup--vertical');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(
      <ButtonGroup fullWidth>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toHaveClass('buttonGroup--fullWidth');
  });

  it('applies dividers class when dividers is true', () => {
    render(
      <ButtonGroup dividers>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toHaveClass('buttonGroup--dividers');
  });

  it('applies attached class when attached is true', () => {
    render(
      <ButtonGroup attached>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toHaveClass('buttonGroup--attached');
  });

  it('passes additional props to the underlying div', () => {
    render(
      <ButtonGroup data-testid="custom-group" aria-label="Navigation Options">
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByTestId('custom-group');
    expect(group).toHaveAttribute('aria-label', 'Navigation Options');
  });

  it('applies custom className', () => {
    render(
      <ButtonGroup className="custom-class">
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByRole('group');
    expect(group).toHaveClass('custom-class');
  });
});