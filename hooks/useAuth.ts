import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export function useAuth(requireAuth = false) {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log('useAuth effect:', { isLoading, requireAuth, isAuthenticated });
    if (!isLoading && requireAuth && !isAuthenticated) {
      console.log('Redirecting to login because not authenticated');
      router.push('/login');
    }
  }, [isLoading, requireAuth, isAuthenticated, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    checkAuth,
  };
}
