import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
  };
}

export interface AppSettings {
  defaultView: 'list' | 'grid' | 'table';
  itemsPerPage: number;
  autoSave: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
}

interface SettingsState {
  userPreferences: UserPreferences;
  appSettings: AppSettings;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  resetUserPreferences: () => void;
  resetAppSettings: () => void;
  fetchSettings: (userId?: string) => Promise<void>;
  saveSettings: () => Promise<void>;
  clearError: () => void;
}

const defaultUserPreferences: UserPreferences = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  emailNotifications: true,
  pushNotifications: false,
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
  }
};

const defaultAppSettings: AppSettings = {
  defaultView: 'list',
  itemsPerPage: 10,
  autoSave: true,
  autoRefresh: false,
  refreshInterval: 60,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      userPreferences: defaultUserPreferences,
      appSettings: defaultAppSettings,
      isLoading: false,
      error: null,

      updateUserPreferences: (preferences) => {
        set(state => ({
          userPreferences: {
            ...state.userPreferences,
            ...preferences,
            accessibility: {
              ...state.userPreferences.accessibility,
              ...(preferences.accessibility || {})
            }
          }
        }));
      },

      updateAppSettings: (settings) => {
        set(state => ({
          appSettings: {
            ...state.appSettings,
            ...settings
          }
        }));
      },

      resetUserPreferences: () => {
        set({ userPreferences: defaultUserPreferences });
      },

      resetAppSettings: () => {
        set({ appSettings: defaultAppSettings });
      },

      fetchSettings: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/settings?userId=${userId}`);
          // const data = await response.json();
          
          // For demo purposes, we'll just use the current state or defaults
          // We're not changing anything here, but in a real app you would
          // set the state with the fetched data
          
          set(state => ({ 
            isLoading: false,
            // In a real app: userPreferences: data.userPreferences, appSettings: data.appSettings
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch settings', 
            isLoading: false 
          });
        }
      },

      saveSettings: async () => {
        set({ isLoading: true, error: null });
        try {
          // Get current settings
          const { userPreferences, appSettings } = get();
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make an API call here
          // await fetch('/api/settings', { 
          //   method: 'POST', 
          //   body: JSON.stringify({ userPreferences, appSettings }) 
          // });
          
          set({ isLoading: false });
          
          // Show success message (you could integrate with UI store here)
          console.log('Settings saved successfully');
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to save settings', 
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'settings-storage', // unique name for localStorage
      partialize: (state) => ({ 
        userPreferences: state.userPreferences,
        appSettings: state.appSettings
      }),
    }
  )
);