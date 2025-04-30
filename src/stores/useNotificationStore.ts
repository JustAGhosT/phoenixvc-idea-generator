import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
  userId?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchNotifications: (userId?: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  clearError: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      fetchNotifications: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/notifications?userId=${userId}`);
          // const data = await response.json();
          
          // For demo purposes, we'll just set some mock notifications
          const mockNotifications: Notification[] = [
            {
              id: '1',
              title: 'New Comment',
              message: 'John Doe commented on your idea "AI-Powered Market Analysis Tool"',
              type: 'info',
              read: false,
              createdAt: new Date().toISOString(),
              link: '/ideas/1',
              userId: userId || 'user1'
            },
            {
              id: '2',
              title: 'Idea Approved',
              message: 'Your idea "Blockchain-Based Voting System" has been approved',
              type: 'success',
              read: true,
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              link: '/ideas/2',
              userId: userId || 'user1'
            },
            {
              id: '3',
              title: 'System Update',
              message: 'The platform will be down for maintenance tonight from 2-4 AM',
              type: 'warning',
              read: false,
              createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
              userId: userId || 'user1'
            }
          ];
          
          const unreadCount = mockNotifications.filter(n => !n.read).length;
          
          set({ 
            notifications: mockNotifications, 
            unreadCount,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch notifications', 
            isLoading: false 
          });
        }
      },

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          read: false
        };
        
        set(state => ({ 
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },

      markAsRead: (id) => {
        set(state => {
          const updatedNotifications = state.notifications.map(notification => 
            notification.id === id 
              ? { ...notification, read: true } 
              : notification
          );
          
          const unreadCount = updatedNotifications.filter(n => !n.read).length;
          
          return { 
            notifications: updatedNotifications,
            unreadCount
          };
        });
      },

      markAllAsRead: () => {
        set(state => {
          const updatedNotifications = state.notifications.map(notification => 
            ({ ...notification, read: true })
          );
          
          return { 
            notifications: updatedNotifications,
            unreadCount: 0
          };
        });
      },

      deleteNotification: (id) => {
        set(state => {
          const filteredNotifications = state.notifications.filter(
            notification => notification.id !== id
          );
          
          const unreadCount = filteredNotifications.filter(n => !n.read).length;
          
          return { 
            notifications: filteredNotifications,
            unreadCount
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'notification-storage', // unique name for localStorage
      partialize: (state) => ({ 
        notifications: state.notifications,
        unreadCount: state.unreadCount
      }),
    }
  )
);