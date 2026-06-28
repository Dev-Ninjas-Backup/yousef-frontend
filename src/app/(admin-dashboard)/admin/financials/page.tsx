"use client";

import { useState, useEffect } from "react";
import {
  LuDollarSign,
  LuTrendingUp,
  LuCalendar,
  LuDownload,
  LuEye,
  LuWarehouse,
  LuPackage,
  LuSearch,
  LuSparkles,
  LuUserCheck,
  LuTag,
  LuLayers,
  LuX,
} from "react-icons/lu";
import { Bar } from "react-chartjs-2";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetLast30DaysDataQuery, Transaction } from "@/store/fetures/financial.api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
      </div>
      {TrendIcon && <TrendIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
    </div>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

const formatBillingType = (type: string, planType?: string) => {
  if (!type) return "N/A";
  switch (type) {
    case "GARAGE_SUBSCRIPTION":
      return "Garage Subscription";
    case "MONTHLY_PEY_PRODUCT":
      return planType?.toUpperCase() === "BASIC" ? "Basic Seller Subscription" : "Pro Seller Subscription";
    case "PAY_PER_PRODUCT":
      return "Pay Per Listing";
    case "PRODUCT_PROMOTION":
      return "Product Promotion";
    case "PRODUCT_PROMOTION_CREDIT":
      return "Promotion Credit";
    case "GENERAL":
      return "General Charge";
    default:
      return type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  }
};

export default function FinancialOverviewPage() {
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [selectedTrx, setSelectedTrx] = useState<Transaction | null>(null);

  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [sortField, setSortField] = useState<string | null>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, statusFilter, dateFilter]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // API Queries (fetches all payments dynamically now)
  const { data: transactions = [], isLoading: isTransLoading } = useGetLast30DaysDataQuery();

  // Helper function to format currency in AED
  const formatAED = (val: number) => {
    return `AED ${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Filter transactions based on date range (applied globally)
  const dateFilteredTransactions = transactions.filter((trx) => {
    if (!trx.date) return true;
    const trxDate = new Date(trx.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    trxDate.setHours(0, 0, 0, 0);

    if (dateFilter === "Last 7 Days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return trxDate >= sevenDaysAgo;
    }
    if (dateFilter === "Last 30 Days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return trxDate >= thirtyDaysAgo;
    }
    if (dateFilter === "Last 90 Days") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      return trxDate >= ninetyDaysAgo;
    }
    if (dateFilter === "This Month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return trxDate >= startOfMonth;
    }
    if (dateFilter === "This Year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return trxDate >= startOfYear;
    }
    return true; // All Time
  });

  // Calculate detailed financial metrics (only for completed payments in the filtered range)
  const completedFilter = dateFilteredTransactions.filter(trx => trx.status === "COMPLETED");

  const totalRevenue = completedFilter.reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;
  
  const garageRevenue = completedFilter
    .filter(trx => trx.type === "GARAGE_SUBSCRIPTION")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const basicSubRevenue = completedFilter
    .filter(trx => trx.type === "MONTHLY_PEY_PRODUCT" && trx.planType?.toUpperCase() === "BASIC")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const proSubRevenue = completedFilter
    .filter(trx => trx.type === "MONTHLY_PEY_PRODUCT" && trx.planType?.toUpperCase() !== "BASIC")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const payPerListingRevenue = completedFilter
    .filter(trx => trx.type === "PAY_PER_PRODUCT")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const promotionRevenue = completedFilter
    .filter(trx => trx.type === "PRODUCT_PROMOTION" || trx.type === "PRODUCT_PROMOTION_CREDIT")
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const promotion7DaysRevenue = completedFilter
    .filter(
      (trx) =>
        (trx.type === "PRODUCT_PROMOTION" || trx.type === "PRODUCT_PROMOTION_CREDIT") &&
        (trx.planType === "7" || (!trx.planType && (trx.amount || 0) / 100 <= 49))
    )
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const promotion15DaysRevenue = completedFilter
    .filter(
      (trx) =>
        (trx.type === "PRODUCT_PROMOTION" || trx.type === "PRODUCT_PROMOTION_CREDIT") &&
        (trx.planType === "15" || (!trx.planType && (trx.amount || 0) / 100 > 49))
    )
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  const otherRevenue = completedFilter
    .filter(trx => 
      trx.type !== "GARAGE_SUBSCRIPTION" && 
      trx.type !== "MONTHLY_PEY_PRODUCT" && 
      trx.type !== "PAY_PER_PRODUCT" && 
      trx.type !== "PRODUCT_PROMOTION" && 
      trx.type !== "PRODUCT_PROMOTION_CREDIT"
    )
    .reduce((sum, trx) => sum + (trx.amount || 0), 0) / 100;

  // Chart Data Mapping (group completed payments by month name)
  const monthlyData: Record<string, number> = {};
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  completedFilter.forEach((trx) => {
    const d = new Date(trx.date);
    const mName = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const key = `${mName} ${year}`;
    monthlyData[key] = (monthlyData[key] || 0) + (trx.amount || 0) / 100;
  });

  const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const chartData = {
    labels: sortedMonths.length > 0 ? sortedMonths : ["No Data"],
    datasets: [
      {
        label: "Revenue (AED)",
        data: sortedMonths.length > 0 ? sortedMonths.map(m => monthlyData[m]) : [0],
        backgroundColor: "#3B82F6",
        borderRadius: 4,
        barThickness: 40,
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

  // Search & Type & Status filters for charges table
  const filteredTransactions = dateFilteredTransactions.filter((trx) => {
    const matchesSearch =
      trx.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (typeFilter !== "All Types" && trx.type !== typeFilter) return false;
    if (statusFilter !== "All Status" && trx.status !== statusFilter) return false;

    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: any = "";
    let bValue: any = "";
    
    if (sortField === "type") {
      aValue = a.type || "";
      bValue = b.type || "";
    } else if (sortField === "customerId") {
      aValue = a.customerId || "";
      bValue = b.customerId || "";
    } else if (sortField === "customerName") {
      aValue = a.customerName || "";
      bValue = b.customerName || "";
    } else if (sortField === "amount") {
      aValue = Number(a.amount) || 0;
      bValue = Number(b.amount) || 0;
    } else if (sortField === "date") {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    } else if (sortField === "status") {
      aValue = a.status || "";
      bValue = b.status || "";
    }
    
    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination calculations
  const totalEntries = sortedTransactions.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + pageSize);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 3;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
      }
      
      if (start > 2) {
        pages.push("ellipsis-start");
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      
      pages.push(totalPages);
    }
    
    return pages.map((page, idx) => {
      if (typeof page === "string") {
        return (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all select-none ${
            currentPage === page
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "border border-transparent text-gray-750 hover:bg-gray-100 hover:border-gray-200"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  // Clean export CSV matching filtered and sorted list
  const handleExportData = () => {
    if (!sortedTransactions.length) {
      alert("No data to export");
      return;
    }

    const csvHeaders = [
      "Charge ID",
      "Billing Type",
      "Plan Tier",
      "Customer ID",
      "Customer Name",
      "Customer Email",
      "Amount (AED)",
      "Charge Date",
      "Payment Method",
      "Payment Status"
    ];

    const csvData = sortedTransactions.map(trx => [
      trx.id || "",
      formatBillingType(trx.type, trx.planType),
      trx.planType || (trx.type === "MONTHLY_PEY_PRODUCT" ? "PRO" : ""),
      trx.customerId || "",
      trx.customerName || "",
      trx.customerEmail || "",
      trx.amount ? (trx.amount / 100).toFixed(2) : "0.00",
      trx.date || "",
      trx.method || "",
      trx.status || ""
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${(field || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `platform-charges-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (id: string) => {
    const found = transactions.find((t) => t.id === id);
    if (found) {
      setSelectedTrx(found);
    }
  };

  if (isTransLoading) {
    return <div className="p-10 text-center text-sm font-semibold text-gray-500">Loading Financial Data...</div>;
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Financial Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Track platform charges, subscriptions, and advertisement revenues</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Custom Styled Select Dropdown matching button */}
          <div className="relative">
            <LuCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              title="Global date range"
              className="pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm appearance-none"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
              <option value="All Time">All Time</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0"></div>
          </div>

          <button onClick={handleExportData} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <LuDownload className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Dynamic 7-Card Specific Revenue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        <StatCard
          icon={LuDollarSign}
          value={formatAED(totalRevenue)}
          label={`Total Revenue (${dateFilter})`}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trendIcon={LuTrendingUp}
        />
        <StatCard
          icon={LuWarehouse}
          value={formatAED(garageRevenue)}
          label={`Garage Subscriptions (${dateFilter})`}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trendIcon={LuTrendingUp}
        />
        {/* Seller Subscriptions breakdown card */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <LuUserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <LuTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2">Seller Subscriptions ({dateFilter})</p>
          <div className="grid grid-cols-3 gap-2 border border-gray-100 rounded-lg overflow-hidden">
            <div className="text-center py-2 px-1 bg-indigo-50">
              <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">Normal</p>
              <p className="text-base font-bold text-indigo-700 mt-0.5">{formatAED(basicSubRevenue)}</p>
            </div>
            <div className="text-center py-2 px-1 bg-purple-50">
              <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">Pro</p>
              <p className="text-base font-bold text-purple-700 mt-0.5">{formatAED(proSubRevenue)}</p>
            </div>
            <div className="text-center py-2 px-1 bg-gray-50">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Total</p>
              <p className="text-base font-bold text-gray-800 mt-0.5">{formatAED(basicSubRevenue + proSubRevenue)}</p>
            </div>
          </div>
        </div>
        <StatCard
          icon={LuTag}
          value={formatAED(payPerListingRevenue)}
          label={`Pay Per Listing Fees (${dateFilter})`}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trendIcon={LuTrendingUp}
        />
        {/* Product Promotions breakdown card */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-50 flex items-center justify-center">
              <LuSparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <LuTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2">Product Promotions ({dateFilter})</p>
          <div className="grid grid-cols-3 gap-2 border border-gray-100 rounded-lg overflow-hidden">
            <div className="text-center py-2 px-1 bg-amber-50/50">
              <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">7 Days</p>
              <p className="text-base font-bold text-amber-700 mt-0.5">{formatAED(promotion7DaysRevenue)}</p>
            </div>
            <div className="text-center py-2 px-1 bg-yellow-50/50">
              <p className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wider">15 Days</p>
              <p className="text-base font-bold text-yellow-700 mt-0.5">{formatAED(promotion15DaysRevenue)}</p>
            </div>
            <div className="text-center py-2 px-1 bg-gray-50">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Total</p>
              <p className="text-base font-bold text-gray-800 mt-0.5">{formatAED(promotion7DaysRevenue + promotion15DaysRevenue)}</p>
            </div>
          </div>
        </div>
        <StatCard
          icon={LuLayers}
          value={formatAED(otherRevenue)}
          label={`Other/General Charges (${dateFilter})`}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
          trendIcon={LuTrendingUp}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Revenue & Transactions Trend</h2>
        <div className="h-64 sm:h-72 lg:h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Charges (Sub & Promo) Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Platform Charges</h2>
            <p className="text-xs text-gray-500 mt-0.5">Audit log of system-related subscriptions, listing fees, and promotional charges</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customer, ID, type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              title="Filter by transaction type"
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Types">All Types</option>
              <option value="GARAGE_SUBSCRIPTION">Garage Subscription</option>
              <option value="MONTHLY_PEY_PRODUCT">Seller Subscription</option>
              <option value="PAY_PER_PRODUCT">Pay Per Listing</option>
              <option value="PRODUCT_PROMOTION">Product Promotion</option>
              <option value="PRODUCT_PROMOTION_CREDIT">Promotion Credit</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Filter by payment status"
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th
                  onClick={() => handleSort("type")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Billing Type
                    {sortField === "type" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("customerName")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Customer
                    {sortField === "customerName" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("customerId")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Customer ID
                    {sortField === "customerId" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Amount
                    {sortField === "amount" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("date")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Date
                    {sortField === "date" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Status
                    {sortField === "status" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-sm text-gray-900">
                    {formatBillingType(trx.type, trx.planType)}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-955">
                    <div>
                      <p className="font-medium text-gray-900">{trx.customerName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{trx.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs text-gray-500 font-mono" title={trx.customerId}>
                    <span className="break-all select-all">{trx.customerId || "N/A"}</span>
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-900">
                    {formatAED((trx.amount || 0) / 100)}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-600">{trx.date}</td>
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
          {sortedTransactions.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No transactions match the selected filters.
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {paginatedTransactions.map((trx) => (
            <div key={trx.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{trx.customerName}</h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {trx.customerId || "N/A"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatBillingType(trx.type, trx.planType)} • {trx.date}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  trx.status === "COMPLETED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {trx.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">{formatAED((trx.amount || 0) / 100)}</p>
                <button onClick={() => handleView(trx.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <LuEye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {sortedTransactions.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No transactions match the selected filters.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalEntries > 0 && (
          <div className="px-4 py-4 sm:px-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-550 font-medium">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <p className="text-xs text-gray-500 font-medium ml-4">
                Showing <span className="font-semibold text-gray-900">{totalEntries === 0 ? 0 : startIndex + 1}</span> to{" "}
                <span className="font-semibold text-gray-900">{endIndex}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalEntries}</span> entries
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm select-none"
              >
                Previous
              </button>
              
              {renderPageNumbers()}
              
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm select-none"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTrx && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-gray-900 text-lg">Transaction Details</h3>
              <button
                onClick={() => setSelectedTrx(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close details"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Header Status & Amount */}
              <div className="text-center pb-4 border-b border-gray-100">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  selectedTrx.status === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedTrx.status}
                </span>
                <h4 className="text-3xl font-extrabold text-gray-900">{formatAED((selectedTrx.amount || 0) / 100)}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {formatBillingType(selectedTrx.type, selectedTrx.planType)}
                </p>
              </div>

              {/* Detail Sections */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Transaction ID</p>
                  <p className="text-gray-900 font-semibold mt-1 truncate" title={selectedTrx.id}>{selectedTrx.id}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Date & Time</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedTrx.date}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Customer Name</p>
                  <p className="text-gray-900 font-semibold mt-1">{selectedTrx.customerName || "N/A"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Customer Email</p>
                  <p className="text-gray-900 font-semibold mt-1 truncate" title={selectedTrx.customerEmail}>{selectedTrx.customerEmail || "N/A"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Payment Method</p>
                  <p className="text-gray-900 font-semibold mt-1 capitalize">{selectedTrx.method || "card"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Customer ID</p>
                  <p className="text-gray-900 font-mono text-xs mt-1 select-all" title={selectedTrx.customerId}>{selectedTrx.customerId || "N/A"}</p>
                </div>
                {selectedTrx.type === "MONTHLY_PEY_PRODUCT" && (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Plan Tier</p>
                    <p className="text-gray-900 font-semibold mt-1 uppercase">{selectedTrx.planType || "PRO"}</p>
                  </div>
                )}
                {selectedTrx.productID && (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Product ID</p>
                    <p className="text-gray-900 font-semibold mt-1 truncate" title={selectedTrx.productID}>{selectedTrx.productID}</p>
                  </div>
                )}
                {selectedTrx.updatedAt && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Last Updated</p>
                    <p className="text-gray-900 font-semibold mt-1">{new Date(selectedTrx.updatedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={() => setSelectedTrx(null)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}