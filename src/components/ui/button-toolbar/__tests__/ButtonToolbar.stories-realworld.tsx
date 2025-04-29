import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';
import { ButtonGroup } from '../../button-group/ButtonGroup';

type Story = StoryObj<typeof ButtonToolbar>;

// SVG icons for the example
const BoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
  </svg>
);

const ItalicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4"></line>
    <line x1="14" y1="20" x2="5" y2="20"></line>
    <line x1="15" y1="4" x2="9" y2="20"></line>
  </svg>
);

const UnderlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
    <line x1="4" y1="21" x2="20" y2="21"></line>
  </svg>
);

const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="10" x2="3" y2="10"></line>
    <line x1="21" y1="6" x2="3" y2="6"></line>
    <line x1="21" y1="14" x2="3" y2="14"></line>
    <line x1="17" y1="18" x2="3" y2="18"></line>
  </svg>
);

const AlignCenterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="10" x2="6" y2="10"></line>
    <line x1="21" y1="6" x2="3" y2="6"></line>
    <line x1="21" y1="14" x2="3" y2="14"></line>
    <line x1="18" y1="18" x2="6" y2="18"></line>
  </svg>
);

const AlignRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="10" x2="7" y2="10"></line>
    <line x1="21" y1="6" x2="3" y2="6"></line>
    <line x1="21" y1="14" x2="3" y2="14"></line>
    <line x1="21" y1="18" x2="7" y2="18"></line>
  </svg>
);

// Real-world example: Text editor toolbar
export const RealWorldExample: Story = {
  render: () => (
    <div className="border rounded-md p-2">
      <ButtonToolbar spacing="sm">
        <ButtonGroup>
          <Button variant="outline" iconButton aria-label="Bold">
            <BoldIcon />
          </Button>
          <Button variant="outline" iconButton aria-label="Italic">
            <ItalicIcon />
          </Button>
          <Button variant="outline" iconButton aria-label="Underline">
            <UnderlineIcon />
          </Button>
        </ButtonGroup>
        
        <ButtonGroup>
          <Button variant="outline" iconButton aria-label="Align Left">
            <AlignLeftIcon />
          </Button>
          <Button variant="outline" iconButton aria-label="Align Center">
            <AlignCenterIcon />
          </Button>
          <Button variant="outline" iconButton aria-label="Align Right">
            <AlignRightIcon />
          </Button>
        </ButtonGroup>
        
        <ButtonGroup>
          <Button variant="outline">Heading</Button>
          <Button variant="outline">Paragraph</Button>
        </ButtonGroup>
      </ButtonToolbar>
      
      <div className="mt-2 p-4 border rounded-md min-h-[200px]">
        <p className="text-gray-400">Type your content here...</p>
      </div>
    </div>
  )
};