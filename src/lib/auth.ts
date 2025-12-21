import { UserRole } from '@/types/auth';
import Cookies from 'js-cookie';

export const getRedirectPath = (role: string, isGarageVerified?: boolean): string => {
  switch (role) {
    case 'CAR_OWNER':
      return '/user/dashboard';
    case 'GARAGE_OWNER':
      return '/garage-admin/dashboard'; // Always redirect to dashboard, modal will handle verification
    case 'SUPER_ADMIN':
      return '/admin/dashboard';
    case 'MEMBER':
      return '/user/dashboard';
    default:
      return '/';
  }
};

export const isValidRole = (role: string): boolean => {
  return ['CAR_OWNER', 'GARAGE_OWNER', 'SUPER_ADMIN', 'MEMBER'].includes(role);
};

export const storeAuthData = (token: string, user: any) => {
  Cookies.set('token', token, { expires: 7, sameSite: 'lax' });
  Cookies.set('user', JSON.stringify(user), { expires: 7, sameSite: 'lax' });
};

export const clearAuthData = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

export const getStoredAuthData = () => {
  const token = Cookies.get('token');
  const userStr = Cookies.get('user');
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return { token, user };
    } catch (error) {
      clearAuthData();
      return null;
    }
  }
  
  return null;
};

export const shouldShowVerificationModal = (user: any): boolean => {
  return user?.role === 'GARAGE_OWNER' && !user?.isGarageVerified;
};