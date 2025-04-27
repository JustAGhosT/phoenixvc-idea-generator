import type { StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ButtonToolbar } from '../ButtonToolbar';
import { SegmentedControl } from '../SegmentedControl';
import meta from './ButtonToolbar.stories-meta';

// Mock icons for stories
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

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

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
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

type Story = StoryObj<typeof ButtonToolbar>;

// Real-world example: Text editor toolbar
export const TextEditorToolbar: Story = {
  render: () => {
    const alignOptions = [
      { value: 'left', label: 'Left', icon: <AlignLeftIcon /> },
      { value: 'center', label: 'Center', icon: <AlignCenterIcon /> },
      { value: 'right', label: 'Right', icon: <AlignRightIcon /> }
    ];
    
    return (
      <div className="border rounded-md p-2 bg-gray-50">
        <ButtonToolbar spacing="sm" align="space-between" responsive>
          {/* Text formatting */}
          <ButtonGroup>
            <Button 
              variant="ghost" 
              size="sm" 
              icons={{ only: true }}
              aria-label="Bold"
            >
              <BoldIcon />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              icons={{ only: true }}
              aria-label="Italic"
            >
              <ItalicIcon />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              icons={{ only: true }}
              aria-label="Underline"
            >
              <UnderlineIcon />
            </Button>
          </ButtonGroup>
          
          {/* List formatting */}
          <ButtonGroup>
            <Button 
              variant="ghost" 
              size="sm" 
              icons={{ only: true }}
              aria-label="Bulleted List"
            >
              <ListIcon />
            </Button>
          </ButtonGroup>
          
          {/* Text alignment */}
          <SegmentedControl
            options={alignOptions}
            defaultValue="left"
            size="sm"
            iconsOnly
            variant="ghost"
          />
          
          {/* Save button */}
          <ButtonGroup>
            <Button 
              variant="primary" 
              size="sm" 
              icons={{ left: <SaveIcon /> }}
            >
              Save
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        
        <div className="mt-4 p-4 border rounded bg-white min-h-[100px]">
          <p className="text-gray-400">Type your content here...</p>
        </div>
      </div>
    );
  }
};

// Pagination example
export const PaginationExample: Story = {
  render: () => {
    return (
      <div className="p-4 border rounded-md">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Search Results</h3>
          <p className="text-sm text-gray-500">Showing results 1-10 of 89</p>
        </div>
        
        <div className="flex flex-col space-y-2 p-2 border-t border-b">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="p-2 border-b last:border-0">
              <h4 className="font-medium">Result item {i}</h4>
              <p className="text-sm text-gray-600">
                This is a sample search result description that shows a preview of the content.
              </p>
            </div>
          ))}
        </div>
        
        <ButtonToolbar align="space-between" className="mt-4">
          <ButtonGroup>
            <Button size="sm" variant="outline">Previous</Button>
            <Button size="sm" variant="outline">Next</Button>
          </ButtonGroup>
          
          <ButtonGroup>
            <Button size="sm" variant={true ? 'primary' : 'outline'}>1</Button>
            <Button size="sm" variant="outline">2</Button>
            <Button size="sm" variant="outline">3</Button>
            <Button size="sm" variant="outline">...</Button>
            <Button size="sm" variant="outline">9</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
};