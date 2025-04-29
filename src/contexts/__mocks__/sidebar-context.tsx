// Mock implementation of the sidebar context
const mockToggleSidebar = jest.fn();
const mockCloseSidebar = jest.fn();
const mockOpenSidebar = jest.fn();

// Default mock implementation returns isOpen as true
const mockUseSidebarContext = jest.fn().mockReturnValue({
  isOpen: true,
  toggleSidebar: mockToggleSidebar,
  closeSidebar: mockCloseSidebar,
  openSidebar: mockOpenSidebar,
});

// Export the mock functions
export {
  mockUseSidebarContext as useSidebarContext,
  mockToggleSidebar,
  mockCloseSidebar,
  mockOpenSidebar,
};

// Mock the SidebarProvider component
export const SidebarProvider = ({ children }) => children;