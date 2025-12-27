"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";
import { adminNavItems } from "@/config/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole={["SUPER_ADMIN"]} redirectTo="/admin-auth">
      <div className="flex min-h-screen bg-gray-50">
        <DashboardNavbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <DashboardSidebar
          navItems={adminNavItems}
          title="Admin Dashboard"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-80 pt-16 p-4 sm:p-6 lg:p-8 md:mt-20 mt-5">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
