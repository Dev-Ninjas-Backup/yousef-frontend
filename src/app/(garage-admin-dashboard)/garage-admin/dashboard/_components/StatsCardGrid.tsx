"use client";
import { StatsCard } from "./StatsCard";
import {
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Package,
  TrendingUp,
} from "lucide-react";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";
import { StatsCardSkeleton } from "./loadings/StatsCardSkeleton";

const StatsCardGrid = () => {
  const { data, error, isLoading } = overView.useGetStatsQuery();
  console.log(data, "stats card data................");
  if (isLoading) {
    return <StatsCardSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        icon={Package}
        value={data?.totalProducts!}
        label="Total Listings"
        iconColor="text-blue-600"
        bgColor="bg-blue-50"
        trend={{ icon: TrendingUp, color: "text-blue-600" }}
      />
      <StatsCard
        icon={CheckCircle}
        value={data?.activeListings!}
        label="Active Listings"
        iconColor="text-green-600"
        bgColor="bg-green-50"
        trend={{ icon: TrendingUp, color: "text-green-600" }}
      />
      <StatsCard
        icon={AlertTriangle}
        value={data?.pendingApproval!}
        label="Pending Approval"
        iconColor="text-yellow-600"
        bgColor="bg-yellow-50"
      />
      <StatsCard
        icon={MessageSquare}
        value={data?.totalInquiries!}
        label="Total Inquiries"
        iconColor="text-purple-600"
        bgColor="bg-purple-50"
        trend={{ icon: TrendingUp, color: "text-purple-600" }}
      />
    </div>
  );
};

export default StatsCardGrid;
