"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductsHeader } from "./_components/ProductsHeader";
import { EmptyProductsState } from "./_components/EmptyProductsState";
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
} from "lucide-react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
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
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
                          className="aspect-square bg-gray-100 rounded overflow-hidden"
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
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No images</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Status */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : product.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.isPromoted && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Promoted
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.partName}
                </h1>
                <p className="text-3xl font-bold text-blue-600">
                  AED {Number(product.price).toFixed(2)}
                </p>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Condition:</span>
                  <span className="text-sm font-medium">
                    {product.condition}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Brand:</span>
                  <span className="text-sm font-medium">{product.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span
                    className={`text-sm font-medium ${
                      product.quantity === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity === 0
                      ? "Sold Out"
                      : `${product.quantity} available`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Views:</span>
                  <span className="text-sm font-medium">{product.views}</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Seller Info */}
              {product.seller && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Seller Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">
                        {product.seller.name}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.seller.sellerType === "VERIFIED_SUPPLIER"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.seller.sellerType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {product.seller.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">
                        {product.seller.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Created:{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Updated:{" "}
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading } = useGetUserMyProductsQuery();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductForView, setSelectedProductForView] =
    useState<Product | null>(null);

  const products = data || [];

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch =
      product.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      product.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
    <div className=" space-y-6 bg-gray-50 rounded-md">
      <ProductsHeader
        onAddProduct={handleAddProduct}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                {product.photos && product.photos.length > 0 ? (
                  <Image
                    src={product.photos[0]}
                    alt={product.partName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : product.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Promoted Badge */}
                {product.isPromoted && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Promoted
                    </span>
                  </div>
                )}

                {/* Sold Out Overlay */}
                {product.quantity === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                    {product.condition}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                    {product.brand}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.partName}
                </h3>

                {/* Price */}
                <p className="text-lg font-semibold text-blue-600 mb-2">
                  AED {Number(product.price).toFixed(2)}
                </p>

                {/* Quantity & Views */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    <span
                      className={
                        product.quantity === 0
                          ? "text-red-600 font-medium"
                          : "text-green-600"
                      }
                    >
                      {product.quantity === 0
                        ? "Sold Out"
                        : `${product.quantity} available`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{product.views} views</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searchQuery || statusFilter !== "all" ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <p className="text-gray-600">
            No products found matching your criteria
          </p>
        </div>
      ) : (
        <EmptyProductsState onAddProduct={handleAddProduct} />
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
