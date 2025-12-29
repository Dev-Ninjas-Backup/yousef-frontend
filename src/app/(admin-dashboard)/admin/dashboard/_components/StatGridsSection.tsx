import { StatCard } from "@/components/shared/dashboard/admin/StatCard";
import {
  LuUsers,
  LuClock,
  LuTriangleAlert,
  LuMessageSquare,
  LuTrendingUp,
  LuStore,
  LuBox,
  LuDollarSign,
  LuBell
} from "react-icons/lu";

const StatGridsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {/* Total Garages */}
      <StatCard
        icon={LuStore}
        value="45"
        label="Total Garages"
        change="+17% from last month"
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        changeColor="text-green-600"
        trendIcon={LuTrendingUp}
      />

      {/* Total Users */}
      <StatCard
        icon={LuUsers}
        value="1,250"
        label="Total Users"
        change="+8% from last month"
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
        changeColor="text-green-600"
        trendIcon={LuTrendingUp}
      />

      {/* Spare Parts Listed */}
      <StatCard
        icon={LuBox}
        value="850"
        label="Spare Parts Listed"
        change="+10% from last month"
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
        changeColor="text-green-600"
        trendIcon={LuTrendingUp}
      />

      {/* Monthly Revenue */}
      <StatCard
        icon={LuDollarSign}
        value="$45,780"
        label="Monthly Revenue"
        change="+6% from last month"
        iconBg="bg-green-50"
        iconColor="text-green-600"
        changeColor="text-green-600"
        trendIcon={LuTrendingUp}
      />

      {/* Pending Approvals */}
      <StatCard
        icon={LuClock}
        value="12"
        label="Pending Approvals"
        change="Requires attention"
        iconBg="bg-yellow-50"
        iconColor="text-yellow-600"
        changeColor="text-yellow-600"
        trendIcon={LuTriangleAlert}
      />

      {/* Unread Messages */}
      <StatCard
        icon={LuMessageSquare}
        value="8"
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
