import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, SlidersHorizontal, RotateCcw } from "lucide-react";

interface ProductsHeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  conditionFilter: string;
  onConditionFilterChange: (value: string) => void;
  stockFilter: string;
  onStockFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  categories: { id: string; name: string }[];
  onResetFilters: () => void;
}

export function ProductsHeader({
  onAddProduct,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  conditionFilter,
  onConditionFilterChange,
  stockFilter,
  onStockFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  categories,
  onResetFilters,
}: ProductsHeaderProps) {
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  return (
    <div className="space-y-4">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your spare parts listings
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <Button
            onClick={() => onStatusFilterChange(statusFilter === "draft" ? "all" : "draft")}
            variant={statusFilter === "draft" ? "default" : "outline"}
            className={`w-full sm:w-auto font-semibold rounded-xl px-4 py-2.5 transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
              statusFilter === "draft"
                ? "bg-gray-850 bg-gray-800 text-white hover:bg-gray-900 border-transparent"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            Drafts
          </Button>
          <Button
            onClick={onAddProduct}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-xl px-4 py-2.5 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, brand, or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired / Ended</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="most_viewed">Sort: Views</option>
              <option value="most_inquiries">Sort: Inquiries</option>
            </select>

            {/* Advanced Filters Trigger */}
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                showFiltersPanel
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showFiltersPanel && (
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-slide-down">
            {/* Condition Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Condition</label>
              <select
                value={conditionFilter}
                onChange={(e) => onConditionFilterChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
              >
                <option value="all">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Availability */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Stock</label>
              <select
                value={stockFilter}
                onChange={(e) => onStockFilterChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
              >
                <option value="all">All Stock</option>
                <option value="instock">In Stock</option>
                <option value="outofstock">Out of Stock</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Price Range (AED)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Reset Filters Option */}
            <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
