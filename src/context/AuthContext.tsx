"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual API call
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock login - replace with real API call
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        // Determine role based on email for demo
        role: email.includes("admin")
          ? UserRole.ADMIN
          : email.includes("seller")
          ? UserRole.SELLER
          : UserRole.USER,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect based on role
      switch (mockUser.role) {
        case UserRole.ADMIN:
          router.push("/admin/dashboard");
          break;
        case UserRole.SELLER:
          router.push("/seller/dashboard");
          break;
        case UserRole.USER:
          router.push("/user/dashboard");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
