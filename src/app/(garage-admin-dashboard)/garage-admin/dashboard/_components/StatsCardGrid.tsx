"use client";
import { StatsCard } from "./StatsCard";
import {
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Package,
  TrendingUp,
  Coins,
  FileText,
} from "lucide-react";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import { StatsCardSkeleton } from "./loadings/StatsCardSkeleton";

interface StatsCardGridProps {
  garageId?: string;
}

const StatsCardGrid = ({ garageId }: StatsCardGridProps) => {
  const { data, isLoading } = overView.useGetStatsQuery(garageId);
  const { data: profileData, isLoading: isProfileLoading } = useGetUserProfileQuery();

  if (isLoading || isProfileLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCardSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatsCard
        icon={Coins}
        value={`${profileData?.data?.promotionCredits || 0} AED`}
        label="Promotion Credits"
        iconColor="text-indigo-600"
        bgColor="bg-indigo-50"
      />
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
        icon={FileText}
        value={data?.totalDrafts || 0}
        label="Total Drafts"
        iconColor="text-gray-600"
        bgColor="bg-gray-50"
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
