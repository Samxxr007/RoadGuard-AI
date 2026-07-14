import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';
import { MOCK_USERS, DEMO_CREDENTIALS } from '../data/mockData';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const credential = DEMO_CREDENTIALS.find(
          c => c.email === email && c.password === password
        );
        
        if (!credential) {
          set({ isLoading: false });
          toast.error('Invalid email or password');
          return false;
        }
        
        const user = MOCK_USERS.find(u => u.email === email);
        if (!user) {
          set({ isLoading: false });
          return false;
        }
        
        const token = `mock-jwt-${user.role}-${Date.now()}`;
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        toast('Signed out successfully', { icon: '👋' });
      },

      hasRole: (roles: UserRole[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },
    }),
    {
      name: 'roadguard-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
