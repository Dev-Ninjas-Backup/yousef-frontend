import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { StatsCard } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/StatsCard";
import { SubscriptionAlert } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/SubscriptionAlert";
import { FreeListingsAlert } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/FreeListingsAlert";
import { QuickActions } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/QuickActions";
import { FrequentActions } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/FrequentActions";
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
        <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <SubscriptionAlert />
        <FreeListingsAlert />
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Package}
          value={8}
          label="Total Listings"
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
          trend={{ icon: TrendingUp, color: "text-blue-600" }}
        />
        <StatsCard
          icon={CheckCircle}
          value={6}
          label="Active Listings"
          iconColor="text-green-600"
          bgColor="bg-green-50"
          trend={{ icon: TrendingUp, color: "text-green-600" }}
        />
        <StatsCard
          icon={AlertTriangle}
          value={2}
          label="Pending Approval"
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatsCard
          icon={MessageSquare}
          value={24}
          label="Total Inquiries"
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
          trend={{ icon: TrendingUp, color: "text-purple-600" }}
        />
      </div> */}
      <StatsCardGrid />

      {/* Quick Actions & Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <PerformanceSummary />
      </div>

      {/* Frequent Actions */}
      <FrequentActions />

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
