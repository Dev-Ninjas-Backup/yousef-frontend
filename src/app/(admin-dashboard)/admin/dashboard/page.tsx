"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import StatGridsSection from "./_components/StatGridsSection";
import PartsByCategories from "./_components/PartsByCategories";
import RecentActivity from "./_components/RecentActivity";
import RevenueTrends from "./_components/RevenueTrends";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-1 sm:mb-2">
          Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Monitor platform performance and key metrics
        </p>
      </div>

      {/* Stats Grid - 3 columns on mobile, 6 on desktop */}
      <StatGridsSection />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {/* Revenue Trends Chart */}
        <RevenueTrends />

        {/* Parts by Category Chart */}
        <PartsByCategories />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default AdminDashboard;
