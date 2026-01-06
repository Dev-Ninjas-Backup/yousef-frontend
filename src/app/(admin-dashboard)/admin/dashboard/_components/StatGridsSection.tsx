import { StatCard } from "@/components/shared/dashboard/admin/StatCard";
import { useGetDashboardOverviewQuery } from "@/store/fetures/admin.dashboard.api";
import {
  LuUsers,
  LuClock,
  LuTriangleAlert,
  LuMessageSquare,
  LuTrendingUp,
  LuTrendingDown,
  LuStore,
  LuBox,
  LuDollarSign,
  LuBell
} from "react-icons/lu";

const StatGridsSection = () => {
  const { data, isLoading } = useGetDashboardOverviewQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}% from last month`;
  };

  const garageChange = data?.garageStats.percentageChange ?? 0;
  const userChange = data?.userStats.percentageChange ?? 0;
  const partsChange = data?.PartsListing.percentageChange ?? 0;
  const revenueChange = data?.revenueStats.percentageGrowth ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      <StatCard
        icon={LuStore}
        value={data?.garageStats.totalOwners.toString() || "0"}
        label="Total Garages"
        change={formatChange(garageChange)}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        changeColor={garageChange >= 0 ? "text-green-600" : "text-red-600"}
        trendIcon={garageChange >= 0 ? LuTrendingUp : LuTrendingDown}
      />

      <StatCard
        icon={LuUsers}
        value={data?.userStats.total.toLocaleString() || "0"}
        label="Total Users"
        change={formatChange(userChange)}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
        changeColor={userChange >= 0 ? "text-green-600" : "text-red-600"}
        trendIcon={userChange >= 0 ? LuTrendingUp : LuTrendingDown}
      />

      <StatCard
        icon={LuBox}
        value={data?.PartsListing.total.toLocaleString() || "0"}
        label="Spare Parts Listed"
        change={formatChange(partsChange)}
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
        changeColor={partsChange >= 0 ? "text-green-600" : "text-red-600"}
        trendIcon={partsChange >= 0 ? LuTrendingUp : LuTrendingDown}
      />

      <StatCard
        icon={LuDollarSign}
        value={`$${data?.revenueStats.totalRevenueLast30Days.toLocaleString() || "0"}`}
        label="Monthly Revenue"
        change={formatChange(revenueChange)}
        iconBg="bg-green-50"
        iconColor="text-green-600"
        changeColor={revenueChange >= 0 ? "text-green-600" : "text-red-600"}
        trendIcon={revenueChange >= 0 ? LuTrendingUp : LuTrendingDown}
      />

      <StatCard
        icon={LuClock}
        value={data?.pendingAllTotal.pendingApprovalCount.toString() || "0"}
        label="Pending Approvals"
        change="Requires attention"
        iconBg="bg-yellow-50"
        iconColor="text-yellow-600"
        changeColor="text-yellow-600"
        trendIcon={LuTriangleAlert}
      />

      <StatCard
        icon={LuMessageSquare}
        value={data?.messageStats.unreadCount.toString() || "0"}
        label="Unread Messages"
        change="New support requests"
        iconBg="bg-red-50"
        iconColor="text-red-600"
        changeColor="text-red-600"
        trendIcon={LuBell}
      />
    </div>
  );
};

export default StatGridsSection;
