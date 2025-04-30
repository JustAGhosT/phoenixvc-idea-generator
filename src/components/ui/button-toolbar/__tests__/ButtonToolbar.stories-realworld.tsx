import type { StoryObj } from '@storybook/react';
import { ButtonGroup } from '../../button-group/ButtonGroup';
import { Button } from '../../button/Button';
import { IconButton } from '../../button/variants';
import { ButtonToolbar } from '../ButtonToolbar';

type Story = StoryObj<typeof ButtonToolbar>;

// Mock icons for the stories
const BoldIcon = () => <span>B</span>;
const ItalicIcon = () => <span>I</span>;
const UnderlineIcon = () => <span>U</span>;
const AlignLeftIcon = () => <span>←</span>;
const AlignCenterIcon = () => <span>↔</span>;
const AlignRightIcon = () => <span>→</span>;

export const PaginationExample: Story = {
  name: 'Pagination Example',
  args: {
    align: 'center',
    children: (
      <>
        <Button variant="outline">Previous</Button>
        <Button>1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </>
    )
  }
};

export const TextEditorToolbar: Story = {
  name: 'Text Editor Toolbar',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <ButtonToolbar spacing="sm">
        <ButtonGroup>
          <IconButton variant="outline" icon={<BoldIcon />} aria-label="Bold" />
          <IconButton variant="outline" icon={<ItalicIcon />} aria-label="Italic" />
          <IconButton variant="outline" icon={<UnderlineIcon />} aria-label="Underline" />
        </ButtonGroup>
        
        <ButtonGroup>
          <IconButton variant="outline" icon={<AlignLeftIcon />} aria-label="Align Left" />
          <IconButton variant="outline" icon={<AlignCenterIcon />} aria-label="Align Center" />
          <IconButton variant="outline" icon={<AlignRightIcon />} aria-label="Align Right" />
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  )
};