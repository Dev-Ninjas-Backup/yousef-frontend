"use client";

import { X } from "lucide-react";

interface ProductDetailsModalProps {
  product: any | null;
  onClose: () => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Spare Part Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <Detail label="Part Name" value={product.partName} />
          <Detail label="Brand" value={product.brand} />
          <Detail label="Category" value={product.category?.name || "N/A"} />
          <Detail label="Seller" value={product.seller?.name || "Unknown"} />
          <Detail label="Price" value={`$${product.price}`} />
          <Detail label="Stock" value={product.stock ?? "N/A"} />
          <Detail
                label="Status"
                value={
                    <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === "APPROVED"
                        ? "bg-green-50 text-green-700"
                        : product.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                    >
                    {product.status}
                    </span>
                }
            />

          <Detail
            label="Submitted On"
            value={new Date(product.createdAt).toLocaleDateString()}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
