"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, setLoading, logout } from "@/store/slices/authSlice";
import { User, UserRole } from "@/types/auth";
import { useGetProfileQuery, useLoginMutation } from "@/store/api/authApi";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = Cookies.get("user");
    const token = Cookies.get("token");
    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setCredentials({ user, token }));
      } catch (error) {
        Cookies.remove("user");
        Cookies.remove("token");
      }
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  return <>{children}</>;
};

// Custom hook for auth operations
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );
    const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated, 
  });
  const router = useRouter();

  const [loginMutation] = useLoginMutation();

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const response = await loginMutation({ email, password }).unwrap();
      const { token, user: apiUser } = response.result.data;

      const user: User = {
        id: apiUser.id,
        name: apiUser.fullName,
        email: apiUser.email,
        role: apiUser.role as UserRole,
      };

      dispatch(setCredentials({ user, token }));
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("token", token, { expires: 7 });

      // Redirect based on role
      switch (user.role) {
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
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/");
  };

  return {
    user,
    profile,
    isAuthenticated,
    login,
    logout: handleLogout,
    isLoading,
  };
};
