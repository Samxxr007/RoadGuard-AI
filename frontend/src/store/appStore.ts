import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

interface AppStore {
  sidebarCollapsed: boolean;
  notifications: Notification[];
  unreadCount: number;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Notification) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      notifications: MOCK_NOTIFICATIONS,
      unreadCount: MOCK_NOTIFICATIONS.filter(n => !n.isRead).length,

      toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      markNotificationRead: (id) => {
        set(state => {
          const notifications = state.notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          );
          return {
            notifications,
            unreadCount: notifications.filter(n => !n.isRead).length,
          };
        });
      },

      markAllRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true })),
          unreadCount: 0,
        }));
      },

      addNotification: (n) => {
        set(state => ({
          notifications: [n, ...state.notifications],
          unreadCount: state.unreadCount + (n.isRead ? 0 : 1),
        }));
      },
    }),
    {
      name: 'roadguard-app',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
