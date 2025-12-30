import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { SubscriptionAlert } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/SubscriptionAlert";
import { FreeListingsAlert } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/FreeListingsAlert";
import { PerformanceSummary } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/PerformanceSummary";
import { RecentActivity } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/RecentActivity";
import { RecentListings } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/RecentListings";

import ProtectedRoute from "@/components/ProtectedRoute";
import StatsCardGrid from "./_components/StatsCardGrid";

function GarageAdminDashboardContent() {
  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl  text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor your listings and performance
          </p>
        </div>
      
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <SubscriptionAlert />
        <FreeListingsAlert />
      </div>

      <StatsCardGrid />

      {/* Quick Actions & Performance Summary */}
      <div className="grid grid-cols-1 ">
        <PerformanceSummary />
      </div>

      {/* Frequent Actions */}
      {/* <FrequentActions /> */}

      {/* Recent Activity & Recent Listings */}
      <div className="grid grid-cols-1 gap-6">
        <RecentActivity />
        <RecentListings />
      </div>
    </div>
  );
}

export default function GarageAdminDashboard() {
  return (
    <ProtectedRoute requiredRole={["GARAGE_OWNER"]} redirectTo="/garage-auth">
      <GarageAdminDashboardContent />
    </ProtectedRoute>
  );
}
