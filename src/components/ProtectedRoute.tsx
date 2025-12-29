"use client";
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { ReactNode, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
  redirectTo?: string;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo,
  fallback 
}: ProtectedRouteProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuthGuard({ requiredRole, redirectTo });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null on server and initial client render to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}