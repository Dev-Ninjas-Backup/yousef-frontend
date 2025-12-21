"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, setLoading, logout } from "@/store/slices/authSlice";
import { User, UserRole } from "@/types/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setCredentials({ user }));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  return <>{children}</>;
};

// Custom hook for auth operations
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      // Mock login - replace with real API call
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        role: email.includes("admin")
          ? UserRole.SUPER_ADMIN
          : email.includes("garage")
          ? UserRole.GARAGE_OWNER
          : email.includes("car")
          ? UserRole.CAR_OWNER
          : UserRole.MEMBER,
      };

      dispatch(setCredentials({ user: mockUser }));
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect based on role
      switch (mockUser.role) {
        case UserRole.SUPER_ADMIN:
          router.push("/admin/dashboard");
          break;
        case UserRole.GARAGE_OWNER:
          router.push("/garage-admin/dashboard");
          break;
        case UserRole.CAR_OWNER:
          router.push("/user/dashboard");
          break;
        case UserRole.MEMBER:
          router.push("/user/dashboard");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout: handleLogout,
    isLoading,
  };
};
