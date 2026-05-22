"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ProductsHeader } from "./_components/ProductsHeader";
import { ProductsTable } from "./_components/ProductsTable";
import { EmptyProductsState } from "./_components/EmptyProductsState";
import { EditProductModal } from "./_components/EditProductModal";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { useGetMyProductsQuery } from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";

export default function MyProductsPage() {
  const router = useRouter();

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data, isLoading } = useGetMyProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = data || [];

  // Generate category map for quick ID-to-name lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    if (categoriesData?.data?.data) {
      categoriesData.data.data.forEach((cat: any) => {
        map.set(cat.id, cat.name);
      });
    }
    return map;
  }, [categoriesData]);

  // Format categories list for dropdown options
  const categoriesList = useMemo(() => {
    if (categoriesData?.data?.data) {
      return categoriesData.data.data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
      }));
    }
    return [];
  }, [categoriesData]);

  // Combined Search, Filtering, and Sorting logic
  const filteredProducts = useMemo(() => {
    // 1. Filter
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
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
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === "most_inquiries") {
        return (b.inquiries || 0) - (a.inquiries || 0);
      }
      return 0;
    });
  }, [products, searchQuery, statusFilter, conditionFilter, stockFilter, categoryFilter, minPrice, maxPrice, sortBy]);

  const handleAddProduct = () => {
    router.push("/garage-admin/my-products/add-product");
  };

  const handleView = (id: string) => {
    router.push(`/garage-admin/my-products/${id}`);
  };

  const handleEdit = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowEditModal(true);
    }
  };

  const handleDelete = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowDeleteModal(true);
    }
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
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  const isAnyFilterApplied =
    searchQuery ||
    statusFilter !== "all" ||
    conditionFilter !== "all" ||
    stockFilter !== "all" ||
    categoryFilter !== "all" ||
    minPrice ||
    maxPrice;

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-md">
      <ProductsHeader
        onAddProduct={handleAddProduct}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        conditionFilter={conditionFilter}
        onConditionFilterChange={setConditionFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        categories={categoriesList}
        onResetFilters={handleResetFilters}
      />
      {filteredProducts.length > 0 ? (
        <ProductsTable
          products={filteredProducts}
          categoryMap={categoryMap}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : isAnyFilterApplied ? (
        <div className="bg-white rounded-lg border p-12 text-center shadow-sm">
          <p className="text-gray-600 font-medium">
            No products found matching your criteria
          </p>
          <button
            onClick={handleResetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-3 transition-colors"
          >
            Clear Filters & Try Again
          </button>
        </div>
      ) : (
        <EmptyProductsState onAddProduct={handleAddProduct} />
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
