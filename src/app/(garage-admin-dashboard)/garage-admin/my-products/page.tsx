"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductsHeader } from "./_components/ProductsHeader";
import { ProductsTable } from "./_components/ProductsTable";
import { EmptyProductsState } from "./_components/EmptyProductsState";
import { EditProductModal } from "./_components/EditProductModal";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { useGetMyProductsQuery, useUpdateProductMutation } from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import Pagination from "@/app/(admin-dashboard)/admin/garages/_components/Pagination";
import { toast } from "sonner";

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
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: responseData, isLoading } = useGetMyProductsQuery({
    page,
    limit,
    search: searchQuery || undefined,
    status: statusFilter || undefined,
    condition: conditionFilter || undefined,
    stock: stockFilter || undefined,
    categoryId: categoryFilter || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sortBy,
  });
  const { data: categoriesData } = useGetCategoriesQuery();

  const products = responseData?.data || [];
  const pagination = responseData?.pagination;

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter, conditionFilter, stockFilter, categoryFilter, minPrice, maxPrice, sortBy]);

  const [updateProduct] = useUpdateProductMutation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

  const filteredProducts = products;

  const handleAddProduct = () => {
    router.push("/garage-admin/my-products/add-product");
  };

  const handleView = (id: string) => {
    router.push(`/garage-admin/my-products/${id}`);
  };

  const handleEdit = (id: string) => {
    const product = products.find((p: any) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowEditModal(true);
    }
  };

  const handleDelete = (id: string, isPermanent = false) => {
    const product = products.find((p: any) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsPermanentDelete(isPermanent);
      setShowDeleteModal(true);
    }
  };

  const handleRepost = async (product: any) => {
    try {
      await updateProduct({ id: product.id, data: { status: "PENDING" } }).unwrap();
      toast.success("Listing reposted successfully! It is now pending admin approval.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to repost listing");
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
        <div className="space-y-4">
          <ProductsTable
            products={filteredProducts}
            categoryMap={categoryMap}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRepost={handleRepost}
          />
          {pagination && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={limit}
              onPageChange={setPage}
            />
          )}
        </div>
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
            isPermanent={isPermanentDelete}
          />
        </>
      )}
    </div>
  );
}
