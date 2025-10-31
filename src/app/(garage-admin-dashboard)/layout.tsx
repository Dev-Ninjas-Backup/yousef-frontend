"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { UserRole } from "@/types/auth";
import { garageAdminNavItems } from "@/config/navigation";
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";

export default function GarageAdminLayout({ children }: { children: ReactNode }) {
  return (
    // <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
   <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar navItems={garageAdminNavItems} title="Garage Dashboard" />
      <div className="flex-1 lg:ml-80">
        <DashboardNavbar />
        <main className="pt-20 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
