"use client";

import { useApproveProductMutation, useDeleteProductMutation, useGetProductsQuery } from "@/store/fetures/admin.parts.api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  LuSearch,
  LuDownload,
  LuEye,
  LuTrash2,
  LuCheck,
  LuX,
} from "react-icons/lu";

export default function SparePartsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const { data: response, isLoading, isFetching } = useGetProductsQuery({
    search: searchQuery || undefined,
    category: categoryFilter === "All Categories" ? undefined : categoryFilter,
    limit: 50,
  });

  const [approveProduct, { isLoading: isApproving }] = useApproveProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const spareParts = response?.data || [];

  const filteredSpareParts = spareParts.filter((part) => {
    const matchesStatus =
      statusFilter === "All Status" || part.status === statusFilter.toUpperCase();
    return matchesStatus;
  });

const handleApprove = async (id: string) => {
  try {
    // Ensure 'id' here is just the string (e.g., "c55796a5...")
    await approveProduct({
      id: id,
      status: "APPROVED",
    }).unwrap();
    alert("Approved!");
  } catch (err) {
    // console.error(err);
  }
};

const handleReject = async (id: string) => {
  try {
    await approveProduct({
      id: id,
      status: "REJECTED",
    }).unwrap();

    alert("Product rejected successfully");
  } catch (err) {
    alert("Failed to reject product");
  }
};


  const handleView = (id: string) => {
    window.location.href = `/admin/products/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this spare part?")) {
      try {
        await deleteProduct(id).unwrap();
        alert("Product deleted successfully");
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

const handleExportData = ()=> {
  // 
}

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* ... Header and Search sections stay exactly the same ... */}
      
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
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Engine Parts fdg</option>
              <option>Brakes</option>
              {/* Categories should ideally be fetched from an API */}
            </select>
          </div>

          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              <option>All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>


      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {(isLoading || isFetching || isApproving || isDeleting) && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Part Name</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Seller</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSpareParts.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{part.partName}</p>
                      <p className="text-xs text-gray-500">{part.brand}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">{part.seller?.name || "Unknown"}</td>
                  <td className="py-4 px-5 text-sm text-gray-900">{part.category?.name}</td>
                  <td className="py-4 px-5 text-sm text-gray-900">${part.price}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      part.status === "APPROVED" ? "bg-green-50 text-green-700" : 
                      part.status === "PENDING" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                    }`}>
                      {part.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900">{new Date(part.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      {/* Only show Approve/Reject if status is PENDING */}
                      {part.status === "PENDING" && (
                        <>
                          <button 
                            onClick={() => handleApprove(part.id)} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <LuCheck className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button 
                            onClick={() => handleReject(part.id)} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <LuX className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}
                      
                      {/* View and Delete always visible */}
                      <button onClick={() => handleView(part.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(part.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredSpareParts.map((part) => (
            <div key={part.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">{part.partName}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${part.status === "APPROVED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                  {part.status}
                </span>
              </div>
              
              <div className="flex gap-2 pt-3 border-t">
                {/* Conditional Buttons for Mobile */}
                {part.status === "PENDING" && (
                  <>
                    <button onClick={() => handleApprove(part.id)} className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-xs font-medium border border-green-200 flex justify-center items-center gap-1">
                      <LuCheck className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => handleReject(part.id)} className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-xs font-medium border border-red-200 flex justify-center items-center gap-1">
                      <LuX className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                )}
                
                <button onClick={() => handleView(part.id)} className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600"><LuEye className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(part.id)} className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600"><LuTrash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}