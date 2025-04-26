import { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

/**
 * Basic tooltip with text trigger
 */
export const Basic: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>
        This is a simple tooltip
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * Tooltip with a button trigger
 */
export const WithButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Button with Tooltip
        </button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltips can be used with any element as trigger
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * Tooltip with custom side offset
 */
export const CustomOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for offset tooltip</TooltipTrigger>
      <TooltipContent sideOffset={10}>
        This tooltip has a larger offset
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * Tooltip with custom side placement
 */
export const CustomPlacement: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Tooltip>
        <TooltipTrigger>Top (Default)</TooltipTrigger>
        <TooltipContent>
          Tooltip on top
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger>Right</TooltipTrigger>
        <TooltipContent side="right">
          Tooltip on right
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger>Bottom</TooltipTrigger>
        <TooltipContent side="bottom">
          Tooltip on bottom
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger>Left</TooltipTrigger>
        <TooltipContent side="left">
          Tooltip on left
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

/**
 * Tooltip with rich content
 */
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for rich content</TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Rich Tooltip</h4>
          <p>Tooltips can contain rich content including headings, paragraphs, and other elements.</p>
          <hr className="my-1" />
          <div className="text-xs text-gray-500">Additional information</div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * Tooltip with custom animation duration
 */
export const CustomAnimation: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Custom Animation</TooltipTrigger>
      <TooltipContent className="transition-all duration-300">
        This tooltip has a custom animation duration
      </TooltipContent>
    </Tooltip>
  ),
}