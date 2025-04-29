import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidebarSection } from '../sidebar-section';

/**
 * Addressing "Missing modules or imports":
 * 
 * 1. Mock the CSS module to avoid import errors
 * 2. Create a simple object that mimics the expected CSS classes
 * 3. This prevents the test from failing due to missing CSS modules
 */
jest.mock('../sidebar.module.css', () => ({
  group: 'group-class',
  groupLabel: 'group-label-class',
  menu: 'menu-class'
}));

describe('SidebarSection Component', () => {
  /**
   * Basic rendering test with default props
   */
  it('renders with title and children when isOpen is true (default)', () => {
    // Arrange
    const testTitle = 'Test Section';
    const testItems = ['Item 1', 'Item 2'];
    
    // Act
    render(
      <SidebarSection title={testTitle}>
        {testItems.map((item, index) => (
          <li key={index} data-testid={`item-${index}`}>{item}</li>
        ))}
      </SidebarSection>
    );

    // Assert - Using reliable DOM queries
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    testItems.forEach((item, index) => {
      expect(screen.getByTestId(`item-${index}`)).toBeInTheDocument();
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  /**
   * Testing conditional rendering based on props
   */
  it('hides title when isOpen is false', () => {
    // Arrange
    const testTitle = 'Hidden Title';
    
    // Act
    render(
      <SidebarSection title={testTitle} isOpen={false}>
        <li>Test Item</li>
      </SidebarSection>
    );

    // Assert - Using queryByText for elements that might not exist
    // This addresses "DOM element selection issues" by using the right query
    expect(screen.queryByText(testTitle)).not.toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  /**
   * Testing class names to ensure proper styling
   */
  it('applies correct CSS classes to elements', () => {
    // Arrange
    const testTitle = 'Styled Section';
    
    // Act
    const { container } = render(
      <SidebarSection title={testTitle}>
        <li>Test Item</li>
      </SidebarSection>
    );

    // Assert - Using DOM traversal and class checking
    // This addresses "Class name mismatches" by checking against our mocked values
    
    // Check the group class on the outer div
    const groupElement = container.firstChild;
    expect(groupElement).toHaveClass('group-class');
    
    // Find the div that contains the title directly
    const titleContainer = screen.getByText(testTitle).closest('div');
    expect(titleContainer).toHaveClass('group-label-class');
    
    // Check the menu class
    const menuElement = screen.getByRole('list');
    expect(menuElement).toHaveClass('menu-class');
  });

  /**
   * Testing with complex nested children
   */
  it('renders with complex nested children', () => {
    // Arrange & Act
    render(
      <SidebarSection title="Complex Section">
        <li data-testid="parent-item">
          Parent Item
          <ul>
            <li data-testid="nested-item">Nested Item</li>
          </ul>
        </li>
      </SidebarSection>
    );

    // Assert - Using testids for reliable selection of deeply nested elements
    expect(screen.getByTestId('parent-item')).toBeInTheDocument();
    expect(screen.getByTestId('nested-item')).toBeInTheDocument();
    expect(screen.getByText('Parent Item')).toBeInTheDocument();
    expect(screen.getByText('Nested Item')).toBeInTheDocument();
  });

  /**
   * Testing with empty children
   */
  it('renders correctly with no children', () => {
    // Arrange & Act
    render(<SidebarSection title="Empty Section" />);

    // Assert
    expect(screen.getByText('Empty Section')).toBeInTheDocument();
    
    // The menu should still exist even with no children
    const menuElement = screen.getByRole('list');
    expect(menuElement).toBeInTheDocument();
    expect(menuElement.children.length).toBe(0);
  });

  /**
   * Testing with very long title
   */
  it('handles long section titles', () => {
    // Arrange
    const longTitle = 'This is a very long section title that might cause layout issues in some cases';
    
    // Act
    render(
      <SidebarSection title={longTitle}>
        <li>Test Item</li>
      </SidebarSection>
    );

    // Assert
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });
});