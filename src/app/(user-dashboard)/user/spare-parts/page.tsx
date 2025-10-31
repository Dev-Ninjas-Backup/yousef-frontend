"use client";

import { useState } from "react";
import Image from "next/image";
import demoImg from "@/assets/demo.png";

// Types
interface SparePart {
  id: string;
  title: string;
  price: number;
  condition: "New" | "Used";
  category: "Gates" | "Engines" | "Brakes" | "Other";
  soldBy: string;
  image: string;
}

// Mock data
const mockSpareParts: SparePart[] = [
  {
    id: "1",
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New",
    category: "Gates",
    soldBy: "Engine Parts Pro",
    image: demoImg.src,
  },
  {
    id: "2",
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New",
    category: "Gates",
    soldBy: "Engine Parts Pro",
    image: demoImg.src,
  },
  {
    id: "3",
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New",
    category: "Gates",
    soldBy: "Engine Parts Pro",
    image: demoImg.src,
  },
];

export default function UserSparePartsPage() {
  const [spareParts] = useState<SparePart[]>(mockSpareParts);

  const handleViewDetails = (id: string) => {
    console.log("View details:", id);
    // Add view details logic
  };

  const handleRepost = (id: string) => {
    console.log("Repost:", id);
    // Add repost logic
  };

  const handleMarkAsSold = (id: string) => {
    console.log("Mark as sold:", id);
    // Add mark as sold logic
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-700">
          Manage your publish listing
        </h1>
      </div>

      {/* Spare Parts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
        {spareParts.map((part) => (
          <div
            key={part.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
              <Image
                src={part.image}
                alt={part.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                  {part.condition}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                  {part.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {part.title}
              </h3>

              {/* Price */}
              <p className="text-lg font-semibold text-blue-600 mb-3">
                ${part.price.toFixed(2)}
              </p>

              {/* Sold By */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-4">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Sold by: {part.soldBy}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewDetails(part.id)}
                  className="flex-1 px-3 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View details
                </button>
                <button
                  onClick={() => handleRepost(part.id)}
                  className="flex-1 px-3 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Re-post
                </button>
                <button
                  onClick={() => handleMarkAsSold(part.id)}
                  className="flex-1 px-3 py-2 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-600 hover:bg-red-50 transition-colors"
                >
                  Mark as sold
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no parts) */}
      {spareParts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No spare parts listed
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You haven't published any spare parts yet. Start by adding your first listing.
            </p>
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Add New Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}