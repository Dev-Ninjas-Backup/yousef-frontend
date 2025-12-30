"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsHeader } from "./_components/ProductsHeader";
import { ProductsTable } from "./_components/ProductsTable";
import { EmptyProductsState } from "./_components/EmptyProductsState";
import { EditProductModal } from "./_components/EditProductModal";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { useGetMyProductsQuery } from "@/store/api/garageAdminApis/products/products";

export default function MyProductsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading } = useGetMyProductsQuery();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = data || [];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      product.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-md">
      <ProductsHeader
        onAddProduct={handleAddProduct}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {filteredProducts.length > 0 ? (
        <ProductsTable
          products={filteredProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : searchQuery || statusFilter !== "all" ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <p className="text-gray-600">
            No products found matching your criteria
          </p>
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
