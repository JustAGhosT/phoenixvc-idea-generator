import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, TooltipProvider } from '../'

describe('Tooltip', () => {
  it('renders correctly with trigger and content', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
    )
    
    expect(screen.getByText('Hover me')).toBeInTheDocument()
    // Content is not visible until hover
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })
  
  it('shows content on hover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
    )
    
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    // Use findAllByText instead of findByText to handle multiple elements
    const contentElements = await screen.findAllByText('Tooltip content')
    // Check that at least one element with the content exists
    expect(contentElements.length).toBeGreaterThan(0)
  })
  
  it('hides content on unhover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
    )
    
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    // Use findAllByText to get all matching elements
    const contentElements = await screen.findAllByText('Tooltip content')
    expect(contentElements.length).toBeGreaterThan(0)
    
    // Unhover
    await userEvent.unhover(trigger)
    
    // Wait for the tooltip to disappear
    // We need to add a small delay to allow for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check that content is no longer in the document
    expect(screen.queryAllByText('Tooltip content')).toHaveLength(0)
  })
  
  it('applies custom className to content', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content className="custom-class">
            Tooltip content
          </Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
    )
    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    // Use a more specific query to get the visible tooltip content
    // Look for the element that has both the text and the custom class
    const contentElements = await screen.findAllByText('Tooltip content');
    
    // Find the element with the custom class
    const contentWithClass = contentElements.find(element => 
      element.classList.contains('custom-class') || 
      element.parentElement?.classList.contains('custom-class')
    );
    expect(contentWithClass).toBeDefined();
    expect(contentWithClass?.classList.contains('custom-class') || 
           contentWithClass?.parentElement?.classList.contains('custom-class')).toBe(true);
  })
})