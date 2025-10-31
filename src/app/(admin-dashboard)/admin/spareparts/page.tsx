"use client";

import { useState } from "react";
import {
  LuSearch,
  LuDownload,
  LuEye,
  LuTrash2,
  LuCheck,
  LuX,
} from "react-icons/lu";

// Types
interface SparePart {
  id: string;
  partName: string;
  seller: string;
  category: string;
  price: string;
  status: "Approved" | "Pending" | "Rejected";
  submitted: string;
}

// Mock data
const sparePartsData: SparePart[] = [
  {
    id: "1",
    partName: "Brake Pad Set - Front",
    seller: "Auto Parts Pro",
    category: "Brakes",
    price: "$89.99",
    status: "Approved",
    submitted: "2025-10-15",
  },
  {
    id: "2",
    partName: "Engine Oil Filter",
    seller: "Quality Parts Inc",
    category: "Engine",
    price: "$12.99",
    status: "Pending",
    submitted: "2025-10-22",
  },
];

export default function SparePartsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [spareParts] = useState<SparePart[]>(sparePartsData);

  // Filter spare parts based on search, category, and status
  const filteredSpareParts = spareParts.filter((part) => {
    const matchesSearch =
      part.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" || part.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All Status" || part.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleExportData = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const handleApprove = (id: string) => {
    console.log("Approving spare part:", id);
    // Add approve logic here
  };

  const handleReject = (id: string) => {
    console.log("Rejecting spare part:", id);
    // Add reject logic here
  };

  const handleView = (id: string) => {
    console.log("Viewing spare part:", id);
    // Add view logic here
  };

  const handleDelete = (id: string) => {
    console.log("Deleting spare part:", id);
    // Add delete logic here
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Spare Parts Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve spare parts submissions
          </p>
        </div>
        <button
          onClick={handleExportData}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuDownload className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative sm:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option>All Categories</option>
              <option>Brakes</option>
              <option>Engine</option>
              <option>Suspension</option>
              <option>Electrical</option>
              <option>Body Parts</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Part Name
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seller
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSpareParts.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-gray-900">
                      {part.partName}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{part.seller}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{part.category}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{part.price}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        part.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : part.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {part.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{part.submitted}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-2">
                      {part.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(part.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                            title="Approve"
                          >
                            <LuCheck className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(part.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                            title="Reject"
                          >
                            <LuX className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleView(part.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(part.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredSpareParts.map((part) => (
            <div
              key={part.id}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {part.partName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted: {part.submitted}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    part.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : part.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {part.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Seller</p>
                  <p className="text-sm text-gray-900">{part.seller}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="text-sm text-gray-900">{part.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <p className="text-sm font-medium text-gray-900">
                    {part.price}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                {part.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(part.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <LuCheck className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(part.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <LuX className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleView(part.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <LuEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(part.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSpareParts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No spare parts found</p>
          </div>
        )}
      </div>
    </div>
  );
}