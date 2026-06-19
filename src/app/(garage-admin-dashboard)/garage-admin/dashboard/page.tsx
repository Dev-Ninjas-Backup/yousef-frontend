"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { SubscriptionAlert } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/SubscriptionAlert";
import { PerformanceSummary } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/PerformanceSummary";
import { RecentActivity } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/RecentActivity";
import { RecentListings } from "@/app/(garage-admin-dashboard)/garage-admin/dashboard/_components/RecentListings";
import ReviewForm from "@/app/(user-dashboard)/user/dashboard/_components/ReviewForm";

import ProtectedRoute from "@/components/ProtectedRoute";
import StatsCardGrid from "./_components/StatsCardGrid";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function GarageAdminDashboardContent() {
  const { data: profileData } = useGetUserProfileQuery();
  const [selectedGarageId, setSelectedGarageId] = useState<string>("all");

  const garages = profileData?.data?.garages || [];
  const activeGarageId = selectedGarageId === "all" ? undefined : selectedGarageId;

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl text-gray-900 font-bold">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor your listings and performance
          </p>
        </div>

        {garages.length > 1 && (
          <div className="w-64">
            <Select
              value={selectedGarageId}
              onValueChange={setSelectedGarageId}
            >
              <SelectTrigger className="bg-white border-gray-200 shadow-sm focus:ring-indigo-500">
                <SelectValue placeholder="All Garages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Garages</SelectItem>
                {garages.map((garage) => (
                  <SelectItem key={garage.id} value={garage.id}>
                    {garage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <SubscriptionAlert />
      </div>

      <StatsCardGrid garageId={activeGarageId} />

      {/* Quick Actions & Performance Summary */}
      <div className="grid grid-cols-1">
        <PerformanceSummary garageId={activeGarageId} />
      </div>

      {/* Frequent Actions */}
      {/* <FrequentActions /> */}

      {/* Recent Activity & Recent Listings */}
      <div className="grid grid-cols-1 gap-6">
        <RecentActivity garageId={activeGarageId} />
        <RecentListings garageId={activeGarageId} />
      </div>

      <ReviewForm />
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
