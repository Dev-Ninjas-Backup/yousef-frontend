"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EditProductModal } from "./_components/EditProductModal";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import {
  useGetUserMyProductsQuery,
  Product,
} from "@/store/api/userApis/products/userProducts";
import {
  Eye,
  Package,
  Edit,
  Trash2,
  X,
  Calendar,
  User,
  Phone,
  Mail,
  LayoutGrid,
  List,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Product Details Modal Component
function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              {product.photos && product.photos.length > 0 ? (
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={product.photos[0]}
                      alt={product.partName}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.photos.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.photos.slice(1, 5).map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                        >
                          <Image
                            src={photo}
                            alt={`${product.partName} ${index + 2}`}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border border-gray-100">
                  <span className="text-gray-400 text-sm">No images</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Status */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      product.status === "APPROVED"
                        ? "bg-green-550 bg-green-50 text-green-700 border border-green-100"
                        : product.status === "PENDING"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                          : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.isPromoted && (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      Promoted
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {product.partName}
                </h1>
                <p className="text-2xl font-extrabold text-blue-600">
                  AED {Number(product.price).toFixed(2)}
                </p>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">Condition:</span>
                  <span className="text-xs font-semibold text-gray-700">{product.condition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">Brand:</span>
                  <span className="text-xs font-semibold text-gray-700">{product.brand || "Generic"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">Quantity:</span>
                  <span
                    className={`text-xs font-semibold ${
                      product.quantity === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity === 0
                      ? "Sold Out"
                      : `${product.quantity} available`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">Views:</span>
                  <span className="text-xs font-semibold text-gray-700">{product.views}</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1.5">Description</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed bg-gray-50/50 p-3.5 rounded-lg border border-gray-100">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Seller Info */}
              {product.seller && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">
                    Seller Information
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs">
                      <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-gray-500">Name:</span>
                      <span className="font-semibold text-gray-700">{product.seller.name}</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          product.seller.sellerType === "VERIFIED_SUPPLIER"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {product.seller.sellerType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-gray-500">Email:</span>
                      <span className="font-semibold text-gray-700">{product.seller.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-semibold text-gray-700">{product.seller.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="border-t pt-4 text-xs text-gray-400 flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserMyProductsPage() {
  const router = useRouter();

  // Filters State
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const { data, isLoading } = useGetUserMyProductsQuery();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductForView, setSelectedProductForView] = useState<Product | null>(null);

  const products = data || [];

  // Extract unique categories (categoryId or fallback) from listings to offer as a filter
  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.categoryId) cats.add(p.categoryId);
    });
    return Array.from(cats);
  }, [products]);

  // Combined Search, Filtering, and Sorting logic
  const processedProducts = useMemo(() => {
    // 1. Search & Filter
    const filtered = products.filter((product: Product) => {
      const matchesSearch =
        product.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (product.categoryId?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "promoted" && product.isPromoted) ||
        product.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesCondition =
        conditionFilter === "all" ||
        product.condition.toLowerCase() === conditionFilter.toLowerCase();

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "instock" && product.quantity > 0) ||
        (stockFilter === "outofstock" && product.quantity === 0);

      const matchesCategory =
        categoryFilter === "all" ||
        product.categoryId === categoryFilter;

      const priceNum = Number(product.price);
      const matchesMinPrice = !minPrice || priceNum >= Number(minPrice);
      const matchesMaxPrice = !maxPrice || priceNum <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCondition &&
        matchesStock &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "price_asc") {
        return Number(a.price) - Number(b.price);
      }
      if (sortBy === "price_desc") {
        return Number(b.price) - Number(a.price);
      }
      if (sortBy === "most_viewed") {
        return b.views - a.views;
      }
      return 0;
    });
  }, [products, searchQuery, statusFilter, conditionFilter, stockFilter, categoryFilter, minPrice, maxPrice, sortBy]);

  const handleAddProduct = () => {
    router.push("/user/my-products/add-product");
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProductForView(product);
  };

  const closeViewModal = () => {
    setSelectedProductForView(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setConditionFilter("all");
    setStockFilter("all");
    setCategoryFilter("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage your products listings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            View, filter, sort, and manage all your spare parts listings.
          </p>
        </div>
        <Button
          onClick={handleAddProduct}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2.5 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="promoted">Promoted Only</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="most_viewed">Sort: Views</option>
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

            {/* Grid/List View Mode Toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden shrink-0 bg-gray-50">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 transition-all ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
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
                onChange={(e) => setConditionFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              >
                <option value="all">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Availability */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Stock</label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              >
                <option value="all">All Inventory</option>
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
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Reset Filters Option */}
            <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
              <button
                onClick={handleResetFilters}
                className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Representation Grid / List */}
      {processedProducts.length > 0 ? (
        viewMode === "grid" ? (
          /* Grid View - Compact Layout (3-4 listings per row) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {processedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all flex flex-col group relative"
              >
                {/* Image Container */}
                <div className="relative h-44 w-full bg-gray-50 overflow-hidden shrink-0">
                  {product.photos && product.photos.length > 0 ? (
                    <Image
                      src={product.photos[0]}
                      alt={product.partName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full shadow-sm ${
                        product.status === "APPROVED"
                          ? "bg-green-500 text-white"
                          : product.status === "PENDING"
                            ? "bg-amber-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {product.status}
                    </span>
                    {product.isPromoted && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white shadow-sm">
                        Promoted
                      </span>
                    )}
                  </div>

                  {/* Sold Out Overlay */}
                  {product.quantity === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold rounded border border-gray-100">
                        {product.condition}
                      </span>
                      {product.brand && (
                        <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold rounded border border-gray-100">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors" title={product.partName}>
                      {product.partName}
                    </h3>

                    {/* Views & Stock indicator */}
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                      <span className={product.quantity === 0 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                        {product.quantity === 0 ? "Sold Out" : `${product.quantity} Available`}
                      </span>
                      <span className="flex items-center gap-0.5 shrink-0">
                        <Eye className="w-3 h-3" />
                        {product.views}
                      </span>
                    </div>
                  </div>

                  {/* Bottom details & Compact actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-sm font-extrabold text-blue-600">
                      AED {Number(product.price).toFixed(2)}
                    </span>
                    <div className="flex gap-1">
                      {/* View Button */}
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Listing"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View - Table Layout (Detailed Management Format) */
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Condition</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Availability</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Created</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Updated</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider max-w-xs">Description</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {processedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Thumbnail Image */}
                      <td className="p-4">
                        <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                          {product.photos && product.photos.length > 0 ? (
                            <Image
                              src={product.photos[0]}
                              alt={product.partName}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[10px] text-gray-400">
                              N/A
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Name & Status badges */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <span
                            onClick={() => handleViewDetails(product)}
                            className="font-bold text-gray-800 text-sm hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.partName}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${
                                product.status === "APPROVED"
                                  ? "bg-green-550 bg-green-50 text-green-700"
                                  : product.status === "PENDING"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-red-50 text-red-700"
                              }`}
                            >
                              {product.status}
                            </span>
                            {product.isPromoted && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-blue-50 text-blue-700">
                                Promoted
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 text-xs font-semibold text-gray-600">
                        {product.categoryId || "Uncategorized"}
                      </td>

                      {/* Condition */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-gray-50 border border-gray-150 text-gray-600 capitalize">
                          {product.condition.toLowerCase()}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-xs font-bold text-blue-600">
                        AED {Number(product.price).toFixed(2)}
                      </td>

                      {/* Stock/Availability */}
                      <td className="p-4 text-xs">
                        <span
                          className={`font-semibold ${
                            product.quantity === 0 ? "text-red-500" : "text-green-600"
                          }`}
                        >
                          {product.quantity === 0 ? "Sold Out" : `${product.quantity} Stock`}
                        </span>
                      </td>

                      {/* Date Created */}
                      <td className="p-4 text-xs text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>

                      {/* Date Updated */}
                      <td className="p-4 text-xs text-gray-400">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </td>

                      {/* Description Short Preview */}
                      <td className="p-4 text-xs text-gray-500 max-w-xs truncate" title={product.description}>
                        {product.description || "-"}
                      </td>

                      {/* Views */}
                      <td className="p-4 text-xs font-semibold text-gray-500">
                        {product.views}
                      </td>

                      {/* Actions Column */}
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewDetails(product)}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* Empty Filters or No Products State */
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <SlidersHorizontal className="w-6 h-6 text-gray-300" />
          </div>
          <h3 className="text-base font-bold text-gray-800">No Listings Found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, status filters, or clear all filters to view listings.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProductForView && (
        <ProductDetailsModal
          product={selectedProductForView}
          isOpen={!!selectedProductForView}
          onClose={closeViewModal}
        />
      )}

      {selectedProduct && (
        <>
          <EditProductModal
            open={showEditModal}
            onOpenChange={setShowEditModal}
            product={selectedProduct}
          />
          <DeleteProductModal
            open={showDeleteModal}
            onOpenChange={setShowDeleteModal}
            productId={selectedProduct.id}
            productName={selectedProduct.partName}
          />
        </>
      )}
    </div>
  );
}
