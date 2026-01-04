"use client";

import { ReactNode } from "react";
import UserNavbar from "@/components/shared/dashboard/user/UserNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole={["CAR_OWNER"]} redirectTo="/user-auth">
      <div className="px-[5%] mx-auto min-h-screen bg-gray-50">
        <UserNavbar />
        <main className=" p-4 sm:p-6 lg:p-8">
          <div className="">{children}</div>
        </main>
        <FloatingChatWidget />
      </div>
    </ProtectedRoute>
  );
}
