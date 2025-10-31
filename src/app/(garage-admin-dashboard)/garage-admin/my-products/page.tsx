"use client";

import { useState } from "react";
import { ProductsHeader } from "./_components/ProductsHeader";
import { ProductsTable } from "./_components/ProductsTable";
import { EmptyProductsState } from "./_components/EmptyProductsState";

const mockProducts = [
  {
    id: "1",
    name: "Brake Pad Set - Front",
    brand: "Brembo",
    category: "Brakes",
    price: 450,
    stock: 15,
    status: "Approved" as const,
    views: 45,
    inquiries: 8,
    image: "",
  },
  {
    id: "2",
    name: "Engine Oil Filter",
    brand: "Mann",
    category: "Engine",
    price: 85,
    stock: 30,
    status: "Approved" as const,
    views: 32,
    inquiries: 5,
    image: "",
  },
  {
    id: "3",
    name: "Air Suspension Compressor",
    brand: "AMK",
    category: "Suspension",
    price: 1250,
    stock: 3,
    status: "Pending" as const,
    views: 12,
    inquiries: 2,
    image: "",
  },
];

export default function MyProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products] = useState(mockProducts);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProduct = () => {
    console.log("Add product");
  };

  const handleView = (id: string) => {
    console.log("View product:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit product:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete product:", id);
  };

  return (
    <div className="p-6 space-y-6">
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
          <p className="text-gray-600">No products found matching your criteria</p>
        </div>
      ) : (
        <EmptyProductsState onAddProduct={handleAddProduct} />
      )}
    </div>
  );
}
