import { useAuthStore } from './useAuthStore';
import { useProjectStore } from './useProjectStore';
import { useIdeaStore } from './useIdeaStore';
import { useNotificationStore } from './useNotificationStore';
import { useUIStore } from './useUIStore';
import { useSettingsStore } from './useSettingsStore';

/**
 * Custom hook that provides access to all application stores in one place.
 * This makes it easier to access multiple stores without having to import each one individually.
 */
export const useStore = () => {
  return {
    auth: useAuthStore(),
    projects: useProjectStore(),
    ideas: useIdeaStore(),
    notifications: useNotificationStore(),
    ui: useUIStore(),
    settings: useSettingsStore(),
  };
};

export type RootStore = ReturnType<typeof useStore>;