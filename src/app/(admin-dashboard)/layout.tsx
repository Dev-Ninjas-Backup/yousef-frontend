"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { UserRole } from "@/types/auth";
import { adminNavItems } from "@/config/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex min-h-screen">
        <DashboardSidebar navItems={adminNavItems} title="Admin Dashboard" />
        <main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    // </ProtectedRoute>
  );
}
