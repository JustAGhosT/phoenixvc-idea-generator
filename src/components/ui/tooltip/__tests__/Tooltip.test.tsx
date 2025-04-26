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
    
    // Wait for the tooltip to appear
    const content = await screen.findByText('Tooltip content')
    expect(content).toBeInTheDocument()
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
    
    // Wait for the tooltip to appear
    const content = await screen.findByText('Tooltip content')
    expect(content).toBeInTheDocument()
    
    // Unhover
    await userEvent.unhover(trigger)
    
    // Check that content is no longer in the document
    // Note: This might need a waitFor depending on animation timing
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
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
    
    const content = await screen.findByText('Tooltip content')
    expect(content).toHaveClass('custom-class')
  })
})