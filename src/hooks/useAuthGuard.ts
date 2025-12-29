"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { getStoredAuthData } from '@/lib/auth';

interface UseAuthGuardOptions {
  requiredRole?: string[];
  redirectTo?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { requiredRole, redirectTo } = options;

  useEffect(() => {
    // Check localStorage for auth data
    const storedAuth = getStoredAuthData();
    
    if (!storedAuth && !isAuthenticated) {
      // No auth data found, redirect to login
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/user-auth');
      }
      return;
    }

    // Check role if required
    if (requiredRole && storedAuth) {
      const userRole = storedAuth.user.role;
      if (!requiredRole.includes(userRole)) {
        // Wrong role, redirect to appropriate auth page
        switch (userRole) {
          case 'CAR_OWNER':
            router.push('/user/dashboard');
            break;
          case 'GARAGE_OWNER':
            router.push('/garage-admin/dashboard');
            break;
          case 'SUPER_ADMIN':
            router.push('/admin/dashboard');
            break;
          default:
            router.push('/user-auth');
        }
      }
    }
  }, [isAuthenticated, user, requiredRole, redirectTo, router]);

  return {
    isAuthenticated: isAuthenticated || !!getStoredAuthData(),
    user: user || getStoredAuthData()?.user
  };
};