"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { UserRole } from "@/types/auth";
import { userNavItems } from "@/config/navigation";
import UserNavbar from "@/components/shared/dashboard/user/UserNavbar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    // <ProtectedRoute allowedRoles={[UserRole.USER]}>
      <div className="px-[5%] mx-auto min-h-screen bg-gray-50">
        <UserNavbar />
        <main className=" p-4 sm:p-6 lg:p-8">
          <div className="">{children}</div>
        </main>
      </div>
    // </ProtectedRoute>
  );
}
