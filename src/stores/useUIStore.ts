import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type SidebarState = 'expanded' | 'collapsed' | 'hidden';

interface UIState {
  // Theme
  themeMode: ThemeMode;
  
  // Sidebar
  sidebarState: SidebarState;
  
  // Search
  searchOpen: boolean;
  searchQuery: string;
  
  // Modal
  activeModal: string | null;
  modalData: any;
  
  // Toast
  toasts: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
  }>;
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  
  setSidebarState: (state: SidebarState) => void;
  toggleSidebar: () => void;
  
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  
  showToast: (message: string, type: 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Theme
      themeMode: 'system',
      
      // Sidebar
      sidebarState: 'expanded',
      
      // Search
      searchOpen: false,
      searchQuery: '',
      
      // Modal
      activeModal: null,
      modalData: null,
      
      // Toast
      toasts: [],
      
      // Theme actions
      setThemeMode: (mode) => set({ themeMode: mode }),
      toggleThemeMode: () => {
        const currentMode = get().themeMode;
        const newMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
        set({ themeMode: newMode });
      },
      
      // Sidebar actions
      setSidebarState: (state) => set({ sidebarState: state }),
      toggleSidebar: () => {
        const currentState = get().sidebarState;
        const newState: SidebarState = 
          currentState === 'expanded' ? 'collapsed' : 
          currentState === 'collapsed' ? 'expanded' : 
          'expanded';
        set({ sidebarState: newState });
      },
      
      // Search actions
      setSearchOpen: (open) => set({ searchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Modal actions
      openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
      
      // Toast actions
      showToast: (message, type, duration = 5000) => {
        const id = Math.random().toString(36).substring(2, 9);
        const toast = { id, message, type, duration };
        
        set(state => ({
          toasts: [...state.toasts, toast]
        }));
        
        // Auto-dismiss after duration
        if (duration > 0) {
          setTimeout(() => {
            get().dismissToast(id);
          }, duration);
        }
      },
      
      dismissToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id)
        }));
      },
      
      clearAllToasts: () => set({ toasts: [] }),
    }),
    {
      name: 'ui-storage', // unique name for localStorage
      partialize: (state) => ({ 
        themeMode: state.themeMode,
        sidebarState: state.sidebarState
      }),
    }
  )
);