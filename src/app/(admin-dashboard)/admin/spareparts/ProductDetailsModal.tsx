"use client";

import { X, Package, User, DollarSign, Calendar, Eye, MessageSquare, Star, Tag, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsModalProps {
  product: any | null;
  onClose: () => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              Spare Part Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border">
                {product.photos && product.photos.length > 0 ? (
                  <Image
                    src={product.photos[selectedImageIndex]}
                    alt={product.partName}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {product.photos && product.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.photos.map((photo: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={photo}
                        alt={`${product.partName} ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.partName}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.status === "APPROVED" ? "bg-green-100 text-green-800" :
                    product.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {product.status}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                </div>
                <p className="text-gray-600">Brand: <span className="font-semibold">{product.brand}</span></p>
              </div>

              {/* Product Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Tag className="w-4 h-4 text-purple-600" />}
                  label="Category"
                  value={product.category?.name || "Not specified"}
                />
                <InfoCard
                  icon={<Package className="w-4 h-4 text-green-600" />}
                  label="Condition"
                  value={product.condition || "Not specified"}
                />
                <InfoCard
                  icon={<Package className="w-4 h-4 text-orange-600" />}
                  label="Quantity"
                  value={product.quantity?.toString() || "Not specified"}
                />
                <InfoCard
                  icon={<Calendar className="w-4 h-4 text-blue-600" />}
                  label="Listed Date"
                  value={new Date(product.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />
              </div>

              {/* Seller Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Seller Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{product.seller?.name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{product.seller?.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{product.seller?.phoneNumber || "Not provided"}</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  icon={<Eye className="w-5 h-5 text-blue-600" />}
                  label="Views"
                  value={product.views || 0}
                />
                <StatCard
                  icon={<MessageSquare className="w-5 h-5 text-green-600" />}
                  label="Inquiries"
                  value={product.inquiries || 0}
                />
                <StatCard
                  icon={<Star className="w-5 h-5 text-yellow-600" />}
                  label="Promoted"
                  value={product.isPromoted ? "Yes" : "No"}
                />
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  );
}
