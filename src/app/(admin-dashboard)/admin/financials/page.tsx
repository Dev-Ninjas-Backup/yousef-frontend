"use client";

import { useState } from "react";
import {
  LuDollarSign,
  LuTrendingUp,
  LuCalendar,
  LuDownload,
  LuEye,
  LuWarehouse,
  LuPackage,
} from "react-icons/lu";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetFinancialOverviewQuery, useGetLast30DaysDataQuery, useGetRevenueChartDataQuery } from "@/store/fetures/financial.api";

// Import your API hooks


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Stat Card Component (Unchanged)
const StatCard = ({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
  trendIcon: TrendIcon,
}: {
  icon: any;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
  trendIcon?: any;
}) => (
  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
      </div>
      {TrendIcon && <TrendIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
    </div>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

export default function FinancialOverviewPage() {
  const [dateFilter] = useState("Last 30 Days");

  // API Queries
  const { data: overview, isLoading: isOverviewLoading } = useGetFinancialOverviewQuery();
  const { data: chartRawData } = useGetRevenueChartDataQuery();
  const { data: transactions, isLoading: isTransLoading } = useGetLast30DaysDataQuery();

  // Extract specific revenue types from the API response
  const garageRevenue = overview?.revenueByType?.find(r => r.type === "GARAGE_SUBSCRIPTION")?.amount || 0;
  const partsRevenue = overview?.revenueByType?.find(r => r.type === "MONTHLY_PEY_PRODUCT")?.amount || 0;

  // Chart Data Mapping
  const chartData = {
    labels: chartRawData?.map(d => d.month.split(" ")[0]) || ["Loading..."],
    datasets: [
      {
        label: "revenue",
        data: chartRawData?.map(d => d.revenue) || [0],
        backgroundColor: "#3B82F6",
        borderRadius: 4,
        barThickness: 50,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
          font: { size: 12, family: "Inter, sans-serif" },
          color: "#6B7280",
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9CA3AF" } },
      y: { 
        grid: { color: "#F3F4F6" }, 
        ticks: { 
            color: "#9CA3AF",
            callback: (value: any) => (value >= 1000 ? `${value / 1000}k` : value)
        } 
      },
    },
  };

  const handleExportData = () => console.log("Exporting data...");
  const handleView = (id: string) => console.log("Viewing transaction:", id);

  if (isOverviewLoading || isTransLoading) {
    return <div className="p-10 text-center">Loading Financial Data...</div>;
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Financial Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Track revenue, payments, and transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
            <LuCalendar className="w-4 h-4" />
            {dateFilter}
          </button>
          <button onClick={handleExportData} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <LuDownload className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        <StatCard
          icon={LuDollarSign}
          value={`$${overview?.thisMonthRevenue?.toLocaleString() || "0"}`}
          label="Total Revenue (This Month)"
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trendIcon={LuTrendingUp}
        />
        <StatCard
          icon={LuWarehouse}
          value={`$${garageRevenue.toLocaleString()}`}
          label="Garage Services Revenue"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trendIcon={LuTrendingUp}
        />
        <StatCard
          icon={LuPackage}
          value={`$${partsRevenue.toLocaleString()}`}
          label="Parts Sales Revenue"
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trendIcon={LuTrendingUp}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Revenue & Transactions</h2>
        <div className="h-64 sm:h-72 lg:h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions?.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-sm text-gray-900">{trx.type.replace("_", " ")}</td>
                  <td className="py-4 px-5 text-sm text-gray-900">{trx.customerName}</td>
                  <td className="py-4 px-5 text-sm font-medium text-gray-900">${trx.amount.toLocaleString()}</td>
                  <td className="py-4 px-5 text-sm text-gray-900">{trx.date}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      trx.status === "COMPLETED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button onClick={() => handleView(trx.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <LuEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {transactions?.map((trx) => (
            <div key={trx.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{trx.customerName}</h3>
                  <p className="text-xs text-gray-500 mt-1">{trx.type.replace("_", " ")} • {trx.date}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  trx.status === "COMPLETED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {trx.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">${trx.amount.toLocaleString()}</p>
                <button onClick={() => handleView(trx.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <LuEye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}