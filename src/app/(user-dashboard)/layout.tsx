"use client";

import { ReactNode } from "react";
import UserNavbar from "@/components/shared/dashboard/user/UserNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole={["CAR_OWNER"]} redirectTo="/user-auth">
      <div className="min-h-screen bg-gray-50 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <UserNavbar />
          <main className="pt-4 pb-8">
            <div className="">{children}</div>
          </main>
        </div>
        <FloatingChatWidget />
      </div>
    </ProtectedRoute>
  );
}
