import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (userData: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'> & { password: string; confirmPassword: string }) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return { success: false, error: data.error };
      }

      set({ 
        user: data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Error de conexión' };
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return { success: false, error: data.error };
      }

      set({ 
        user: data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Error de conexión' };
    }
  },

  checkAuth: async () => {
    try {
      console.log('Checking auth...');
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      console.log('Auth check response:', { ok: response.ok, data });

      if (response.ok) {
        console.log('Setting authenticated state');
        set({ 
          user: data.user, 
          isAuthenticated: true 
        });
      } else {
        console.log('Setting unauthenticated state');
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({ 
        user: null, 
        isAuthenticated: false 
      });
    }
  },
}));
