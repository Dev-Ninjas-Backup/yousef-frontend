"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { UserRole } from "@/types/auth";
import { garageAdminNavItems } from "@/config/navigation";

export default function GarageAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
    <div
      className="flex min-h-screen bg-white"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <DashboardSidebar
        navItems={garageAdminNavItems}
        title="Garage Admin Dashboard"
      />
      <main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
    // </ProtectedRoute>
  );
}
