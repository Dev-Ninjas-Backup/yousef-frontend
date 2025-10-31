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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types
interface Transaction {
  id: string;
  type: string;
  source: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

// Mock data
const transactionsData: Transaction[] = [
  {
    id: "1",
    type: "Garage",
    source: "Precision Auto Care",
    amount: "$450.00",
    date: "2025-10-24",
    status: "Completed",
  },
  {
    id: "2",
    type: "Parts",
    source: "Auto Parts Pro",
    amount: "$89.99",
    date: "2025-10-23",
    status: "Completed",
  },
];

// Stat Card Component
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
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
      </div>
      {TrendIcon && (
        <TrendIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
      )}
    </div>
    <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

export default function FinancialOverviewPage() {
  const [dateFilter] = useState("Last 30 Days");
  const [transactions] = useState<Transaction[]>(transactionsData);

  // Revenue & Transactions Chart Data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "revenue",
        data: [35000, 38000, 40000, 38000, 42000, 45000],
        backgroundColor: "#3B82F6",
        borderRadius: 4,
        barThickness: 50,
      },
      {
        label: "transactions",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#10B981",
        borderRadius: 4,
        barThickness: 50,
      },
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
          font: {
            size: 12,
            family: "Inter, system-ui, sans-serif",
          },
          color: "#6B7280",
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1F2937",
        bodyColor: "#1F2937",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return context.dataset.label + ": " + context.parsed.y.toLocaleString();
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: "#F3F4F6",
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
            family: "Inter, system-ui, sans-serif",
          },
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: "#F3F4F6",
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
            family: "Inter, system-ui, sans-serif",
          },
          padding: 8,
          callback: function (value: any) {
            return value >= 1000 ? value / 1000 + "000" : value;
          },
        },
        beginAtZero: true,
        max: 60000,
      },
    },
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const handleView = (id: string) => {
    console.log("Viewing transaction:", id);
    // Add view logic here
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Financial Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track revenue, payments, and transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
            <LuCalendar className="w-4 h-4" />
            {dateFilter}
          </button>
          <button
            onClick={handleExportData}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <LuDownload className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Total Revenue */}
        <StatCard
          icon={LuDollarSign}
          value="$45,780"
          label="Total Revenue (This Month)"
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trendIcon={LuTrendingUp}
        />

        {/* Garage Services Revenue */}
        <StatCard
          icon={LuWarehouse}
          value="$31,350"
          label="Garage Services Revenue"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trendIcon={LuTrendingUp}
        />

        {/* Parts Sales Revenue */}
        <StatCard
          icon={LuPackage}
          value="$14,430"
          label="Parts Sales Revenue"
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trendIcon={LuTrendingUp}
        />
      </div>

      {/* Revenue & Transactions Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Revenue & Transactions
        </h2>
        <div className="h-64 sm:h-72 lg:h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{transaction.type}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">
                      {transaction.source}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.amount}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{transaction.date}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : transaction.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => handleView(transaction.id)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <LuEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {transaction.source}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {transaction.type} • {transaction.date}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    transaction.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : transaction.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>

              {/* Amount and Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">
                  {transaction.amount}
                </p>
                <button
                  onClick={() => handleView(transaction.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <LuEye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}