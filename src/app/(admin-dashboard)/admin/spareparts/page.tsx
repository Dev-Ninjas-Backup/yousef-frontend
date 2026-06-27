"use client";

import {
  useApproveProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useLazyExportProductsQuery,
} from "@/store/fetures/admin.parts.api";
import { Loader2, ArrowUpDown, ArrowUp, ArrowDown, Package, Zap, Disc, Settings, Wind, Thermometer, Wrench, Layers, Cpu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  LuSearch,
  LuDownload,
  LuEye,
  LuTrash2,
  LuCheck,
  LuX,
  LuChevronDown,
  LuTrendingUp,
} from "react-icons/lu";
import { useGetPartsCategoriesQuery } from "@/store/fetures/partsCategory.api";
import { useGetPartsCategoryQuery } from "@/store/fetures/admin.dashboard.api";
import ProductDetailsModal from "./ProductDetailsModal";

// Helper functions for category icons and styles
const getCategoryIcon = (categoryName: string, iconClass: string = "w-5 h-5") => {
  const name = categoryName.toLowerCase();
  if (name.includes("engine")) return <Cpu className={iconClass} />;
  if (name.includes("brake")) return <Disc className={iconClass} />;
  if (name.includes("suspension")) return <Layers className={iconClass} />;
  if (name.includes("electrical")) return <Zap className={iconClass} />;
  if (name.includes("transmission")) return <Settings className={iconClass} />;
  if (name.includes("exhaust")) return <Wind className={iconClass} />;
  if (name.includes("cooling")) return <Thermometer className={iconClass} />;
  if (name.includes("tyre") || name.includes("wheel")) return <Disc className={iconClass} />;
  return <Wrench className={iconClass} />;
};

const getCategoryStyles = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("engine")) {
    return {
      bg: "bg-red-50 hover:bg-red-100/80 hover:border-red-300",
      text: "text-red-600",
      border: "border-red-100",
      active: "ring-2 ring-red-500 ring-offset-2 border-red-300 bg-red-100/90 shadow-sm",
    };
  }
  if (name.includes("brake")) {
    return {
      bg: "bg-orange-50 hover:bg-orange-100/80 hover:border-orange-300",
      text: "text-orange-600",
      border: "border-orange-100",
      active: "ring-2 ring-orange-500 ring-offset-2 border-orange-300 bg-orange-100/90 shadow-sm",
    };
  }
  if (name.includes("suspension")) {
    return {
      bg: "bg-amber-50 hover:bg-amber-100/80 hover:border-amber-300",
      text: "text-amber-600",
      border: "border-amber-100",
      active: "ring-2 ring-amber-500 ring-offset-2 border-amber-300 bg-amber-100/90 shadow-sm",
    };
  }
  if (name.includes("electrical")) {
    return {
      bg: "bg-yellow-50 hover:bg-yellow-100/80 hover:border-yellow-300",
      text: "text-yellow-600",
      border: "border-yellow-100",
      active: "ring-2 ring-yellow-500 ring-offset-2 border-yellow-300 bg-yellow-100/90 shadow-sm",
    };
  }
  if (name.includes("transmission")) {
    return {
      bg: "bg-purple-50 hover:bg-purple-100/80 hover:border-purple-300",
      text: "text-purple-600",
      border: "border-purple-100",
      active: "ring-2 ring-purple-500 ring-offset-2 border-purple-300 bg-purple-100/90 shadow-sm",
    };
  }
  if (name.includes("exhaust")) {
    return {
      bg: "bg-pink-50 hover:bg-pink-100/80 hover:border-pink-300",
      text: "text-pink-600",
      border: "border-pink-100",
      active: "ring-2 ring-pink-500 ring-offset-2 border-pink-300 bg-pink-100/90 shadow-sm",
    };
  }
  if (name.includes("cooling")) {
    return {
      bg: "bg-blue-50 hover:bg-blue-100/80 hover:border-blue-300",
      text: "text-blue-600",
      border: "border-blue-100",
      active: "ring-2 ring-blue-500 ring-offset-2 border-blue-300 bg-blue-100/90 shadow-sm",
    };
  }
  if (name.includes("tyre") || name.includes("wheel")) {
    return {
      bg: "bg-teal-50 hover:bg-teal-100/80 hover:border-teal-300",
      text: "text-teal-600",
      border: "border-teal-100",
      active: "ring-2 ring-teal-500 ring-offset-2 border-teal-300 bg-teal-100/90 shadow-sm",
    };
  }
  return {
    bg: "bg-emerald-50 hover:bg-emerald-100/80 hover:border-emerald-300",
    text: "text-emerald-600",
    border: "border-emerald-100",
    active: "ring-2 ring-emerald-500 ring-offset-2 border-emerald-300 bg-emerald-100/90 shadow-sm",
  };
};

const allCategoriesStyle = {
  bg: "bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300",
  text: "text-slate-700",
  border: "border-slate-100",
  active: "ring-2 ring-slate-500 ring-offset-2 border-slate-300 bg-slate-100/90 shadow-sm",
};

export default function SparePartsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch category list and stats dynamically
  const { data: categoriesResponse } = useGetPartsCategoriesQuery({ limit: 100 });
  const { data: categoryStatsRes } = useGetPartsCategoryQuery();

  const dbCategories = categoriesResponse?.data?.data || [];
  const categoryStats = categoryStatsRes?.data?.categoryStatistics || [];
  const totalProducts = categoryStatsRes?.data?.totalProducts || 0;

  // Create a map of categoryName -> count
  const categoryCountMap = new Map<string, number>();
  categoryStats.forEach((stat) => {
    categoryCountMap.set(stat.categoryName.toLowerCase(), stat.productCount);
  });

  // Top category
  const topCategory = categoryStats.length > 0
    ? [...categoryStats].sort((a, b) => b.productCount - a.productCount)[0]
    : null;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    search: searchQuery || undefined,
    category: categoryFilter === "All Categories" ? undefined : categoryFilter,
    page,
    limit,
  });

  const [approveProduct, { isLoading: isApproving }] =
    useApproveProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [triggerExportProducts] = useLazyExportProductsQuery();
  const [isExporting, setIsExporting] = useState(false);

  const spareParts = response?.data || [];
  const pagination = response?.pagination;

  const filteredSpareParts = spareParts.filter((part) => {
    const matchesStatus =
      statusFilter === "All Status" ||
      part.status === statusFilter.toUpperCase();
    if (!matchesStatus) return false;

    if (dateFilter !== "All Time") {
      const subDate = new Date(part.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - subDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (dateFilter === "Today" && diffDays > 1) return false;
      if (dateFilter === "This Week" && diffDays > 7) return false;
      if (dateFilter === "This Month" && diffDays > 30) return false;
      if (dateFilter === "This Year" && diffDays > 365) return false;
    }
    return true;
  });

  const sortedSpareParts = [...filteredSpareParts].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = "";
    let bValue: any = "";

    if (sortField === "partName") {
      aValue = a.partName || "";
      bValue = b.partName || "";
    } else if (sortField === "seller") {
      aValue = a.seller?.name || "";
      bValue = b.seller?.name || "";
    } else if (sortField === "category") {
      aValue = a.category?.name || "";
      bValue = b.category?.name || "";
    } else if (sortField === "price") {
      aValue = Number(a.price) || 0;
      bValue = Number(b.price) || 0;
    } else if (sortField === "status") {
      aValue = a.status || "";
      bValue = b.status || "";
    } else if (sortField === "createdAt") {
      aValue = new Date(a.createdAt).getTime();
      bValue = new Date(b.createdAt).getTime();
    } else if (sortField === "isPromoted") {
      aValue = a.isPromoted ? 1 : 0;
      bValue = b.isPromoted ? 1 : 0;
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleApprove = async (id: string) => {
    try {
      await approveProduct({
        id: id,
        status: "APPROVED",
      }).unwrap();
      alert("Approved!");
    } catch (err) {
      // console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await approveProduct({
        id: id,
        status: "REJECTED",
      }).unwrap();

      alert("Product rejected successfully");
    } catch (err) {
      alert("Failed to reject product");
    }
  };

  const handleView = (id: string) => {
    const product = spareParts.find((item) => item.id === id);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this spare part?")) {
      try {
        await deleteProduct(id).unwrap();
        alert("Product deleted successfully");
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      const res = await triggerExportProducts().unwrap();

      const allParts = res?.data || [];
      if (!allParts.length) {
        alert("No data to export");
        return;
      }

      // Filter all products locally based on status and date
      const filteredAllParts = allParts.filter((part) => {
        const matchesStatus =
          statusFilter === "All Status" ||
          part.status === statusFilter.toUpperCase();
        if (!matchesStatus) return false;

        if (dateFilter !== "All Time") {
          const subDate = new Date(part.createdAt);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - subDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (dateFilter === "Today" && diffDays > 1) return false;
          if (dateFilter === "This Week" && diffDays > 7) return false;
          if (dateFilter === "This Month" && diffDays > 30) return false;
          if (dateFilter === "This Year" && diffDays > 365) return false;
        }
        return true;
      });

      if (!filteredAllParts.length) {
        alert("No matching data to export");
        return;
      }

      // Sort matching products locally based on current sorting
      const sortedAllParts = [...filteredAllParts].sort((a, b) => {
        if (!sortField) return 0;
        let aValue: any = "";
        let bValue: any = "";

        if (sortField === "partName") {
          aValue = a.partName || "";
          bValue = b.partName || "";
        } else if (sortField === "seller") {
          aValue = a.seller?.name || "";
          bValue = b.seller?.name || "";
        } else if (sortField === "category") {
          aValue = a.category?.name || "";
          bValue = b.category?.name || "";
        } else if (sortField === "price") {
          aValue = Number(a.price) || 0;
          bValue = Number(b.price) || 0;
        } else if (sortField === "status") {
          aValue = a.status || "";
          bValue = b.status || "";
        } else if (sortField === "createdAt") {
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
        } else if (sortField === "isPromoted") {
          aValue = a.isPromoted ? 1 : 0;
          bValue = b.isPromoted ? 1 : 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      const getAbsoluteUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
      };

      const csvHeaders = [
        "Part Name",
        "Brand",
        "Category",
        "Price",
        "Condition",
        "Quantity",
        "Status",
        "Seller Name",
        "Seller Email",
        "Seller Phone",
        "Views",
        "Inquiries",
        "Promoted",
        "Uploaded Images Links",
        "Submitted Date",
      ];

      const csvData = sortedAllParts.map((part) => [
        part.partName || "",
        part.brand || "",
        part.category?.name || "",
        part.price || "",
        part.condition || "",
        (part.quantity || 0).toString(),
        part.status || "",
        part.seller?.name || "",
        part.seller?.email || "",
        part.seller?.phoneNumber || "",
        (part.views || 0).toString(),
        (part.inquiries || 0).toString(),
        part.isPromoted ? "Yes" : "No",
        (part.photos || []).map(p => getAbsoluteUrl(p)).join(" | "),
        new Date(part.createdAt).toLocaleDateString(),
      ]);

      const csvContent = [csvHeaders, ...csvData]
        .map((row) => row.map((field) => `"${(field || "").replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `spare-parts-data-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Spare Parts Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve spare parts submissions
          </p>
        </div>
        <button
          onClick={handleExportData}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuDownload className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats + Category — single unified card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Top row: 3 mini stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <LuSearch className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Total Listings</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">{totalProducts}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              <LuTrendingUp className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Top Category</p>
              <p className="text-sm font-bold text-gray-900 leading-tight truncate" title={topCategory?.categoryName}>
                {topCategory ? `${topCategory.categoryName} (${topCategory.productCount})` : "None"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
              <LuCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Total Categories</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">{dbCategories.length}</p>
            </div>
          </div>
        </div>

        {/* Bottom row: category pills */}
        {categoryStats.length > 0 && (
          <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto bg-gray-50/50">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap shrink-0">Filter:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => handleCategoryChange("All Categories")}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                  categoryFilter === "All Categories"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                All <span className="opacity-75">({totalProducts})</span>
              </button>
              {[...categoryStats]
                .sort((a, b) => b.productCount - a.productCount)
                .map((stat) => (
                  <button
                    key={stat.categoryName}
                    onClick={() => handleCategoryChange(stat.categoryName)}
                    title={`${stat.categoryName}: ${stat.productCount} listings`}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                      categoryFilter === stat.categoryName
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {getCategoryIcon(stat.categoryName, "w-2.5 h-2.5")}
                    {stat.categoryName}
                    <span className={`font-bold ${categoryFilter === stat.categoryName ? "text-blue-100" : "text-gray-400"}`}>
                      {stat.productCount}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              title="Filter by category"
              className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All Categories">All Categories ({totalProducts})</option>
              {dbCategories.map((cat) => {
                const count = categoryCountMap.get(cat.name.toLowerCase()) || 0;
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name} ({count})
                  </option>
                );
              })}
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              title="Filter by status"
              className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="DRAFT">Draft</option>
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative sm:w-48">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPage(1);
              }}
              title="Filter by submission date"
              className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {(isLoading || isFetching || isApproving || isDeleting) && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase w-12">
                  SL
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("partName")}
                >
                  <div className="flex items-center gap-1.5">
                    Part Name
                    {sortField === "partName" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("seller")}
                >
                  <div className="flex items-center gap-1.5">
                    Seller
                    {sortField === "seller" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center gap-1.5">
                    Category
                    {sortField === "category" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center gap-1.5">
                    Price
                    {sortField === "price" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("isPromoted")}
                >
                  <div className="flex items-center gap-1.5">
                    Promoted
                    {sortField === "isPromoted" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("status")}
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
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1.5">
                    Submitted
                    {sortField === "createdAt" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedSpareParts.map((part, index) => (
                <tr
                  key={part.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5 text-sm text-gray-500 font-medium w-12">
                    {index + 1}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {part.photos && part.photos.length > 0 ? (
                          <img
                            src={part.photos[0]}
                            alt={part.partName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {part.partName}
                        </p>
                        <p className="text-xs text-gray-500">{part.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">
                    {part.seller?.name || "Unknown"}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">
                    {part.category?.name}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">
                    {part.price} AED
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${part.isPromoted
                          ? "bg-purple-50 text-purple-700 border border-purple-100"
                          : "bg-gray-50 text-gray-400 border border-gray-100"
                        }`}
                    >
                      {part.isPromoted ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${part.status === "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : part.status === "PENDING"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                        }`}
                    >
                      {part.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">
                    {new Date(part.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      {part.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleApprove(part.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <LuCheck className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(part.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <LuX className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleView(part.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(part.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {sortedSpareParts.map((part) => (
            <div key={part.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {part.photos && part.photos.length > 0 ? (
                    <img
                      src={part.photos[0]}
                      alt={part.partName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {part.partName}
                    </h3>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${part.status === "APPROVED"
                          ? "bg-green-50 text-green-700"
                          : part.status === "PENDING"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                        }`}
                    >
                      {part.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{part.brand}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                <div>
                  <p className="text-gray-500 mb-0.5">Category</p>
                  <p className="font-medium text-gray-900 truncate">{part.category?.name || "None"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Price</p>
                  <p className="font-medium text-gray-900">{part.price} AED</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Promoted</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${part.isPromoted
                      ? "bg-purple-50 text-purple-700 border border-purple-100"
                      : "bg-gray-50 text-gray-400 border border-gray-100"
                    }`}>
                    {part.isPromoted ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                {part.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleApprove(part.id)}
                      className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-xs font-medium border border-green-200 flex justify-center items-center gap-1"
                    >
                      <LuCheck className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(part.id)}
                      className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-xs font-medium border border-red-200 flex justify-center items-center gap-1"
                    >
                      <LuX className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleView(part.id)}
                  className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                >
                  <LuEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(part.id)}
                  className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredSpareParts.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No spare parts found
          </div>
        )}
      </div>

      {/* Pagination - Same style as admin users page */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-sm text-gray-500">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
              parts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg whitespace-nowrap">
                {page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
