"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";
import { garageAdminNavItems } from "@/config/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export default function GarageAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole={["GARAGE_OWNER"]} redirectTo="/garage-auth">
      <div className="flex min-h-screen mx-auto">
        <DashboardNavbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <DashboardSidebar
          navItems={garageAdminNavItems}
          title="Seller Dashboard"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-80 pt-16 p-4 sm:p-6 lg:p-8 md:mt-20 mt-5">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
        <FloatingChatWidget />
      </div>
    </ProtectedRoute>
  );
}
