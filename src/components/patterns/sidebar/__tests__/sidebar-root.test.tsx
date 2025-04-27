import { render, screen } from '@testing-library/react';
import { SidebarRoot } from '../sidebar-root';

describe('SidebarRoot', () => {
  it('renders children correctly', () => {
    render(
      <SidebarRoot>
        <div data-testid="test-child">Test Content</div>
      </SidebarRoot>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Content');
  });

  it('applies expanded class when expanded prop is true', () => {
    const { container } = render(
      <SidebarRoot expanded={true}>
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveClass('expanded');
    expect(container.firstChild).not.toHaveClass('collapsed');
  });

  it('applies collapsed class when expanded prop is false', () => {
    const { container } = render(
      <SidebarRoot expanded={false}>
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveClass('collapsed');
    expect(container.firstChild).not.toHaveClass('expanded');
  });

  it('sets data-state attribute based on open prop', () => {
    const { container, rerender } = render(
      <SidebarRoot open={true}>
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveAttribute('data-state', 'open');
    
    rerender(
      <SidebarRoot open={false}>
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveAttribute('data-state', 'closed');
  });

  it('passes additional props to the root element', () => {
    const { container } = render(
      <SidebarRoot data-custom="test" aria-label="Sidebar">
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveAttribute('data-custom', 'test');
    expect(container.firstChild).toHaveAttribute('aria-label', 'Sidebar');
  });

  it('merges custom className with default classes', () => {
    const { container } = render(
      <SidebarRoot className="custom-class">
        <div>Content</div>
      </SidebarRoot>
    );
    
    expect(container.firstChild).toHaveClass('root');
    expect(container.firstChild).toHaveClass('expanded');
    expect(container.firstChild).toHaveClass('custom-class');
  });
});