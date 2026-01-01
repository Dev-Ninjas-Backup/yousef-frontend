"use client";

import { useDeleteGarageMutation, useGetGaragesQuery , useUpdateGarageStatusMutation } from "@/store/fetures/admin.api";
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
// Import the hooks from your adminApiSlice


export default function GarageManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // API Call: Fetching data with search and status params
  const { data: response, isLoading, isFetching } = useGetGaragesQuery({
    name: searchQuery || undefined,
    status: statusFilter === "All Status" ? undefined : statusFilter.toUpperCase(),
    page: 1,
    limit: 50,
  });

  // API Call: Delete Mutation
  const [updateStatus, { isLoading: isUpdating }] = useUpdateGarageStatusMutation();
  const [deleteGarage, { isLoading: isDeleting }] = useDeleteGarageMutation();

  const garages = response?.data || [];

  const handleExportData = () => {
    console.log("Exporting data...");
  };

const handleApprove = async (id: string) => {
    try {
      await updateStatus({ id, status: 'APPROVE' }).unwrap();
      console.log("Garage approved successfully");
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleReject = async (id: string) => {
    if (confirm("Are you sure you want to decline this garage?")) {
      try {
        await updateStatus({ id, status: 'DECLINE' }).unwrap();
        console.log("Garage declined successfully");
      } catch (error) {
        console.error("Failed to decline:", error);
      }
    }
  };

  const handleView = (id: string) => {
    window.location.href = `/admin/garages/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this garage?")) {
      try {
        await deleteGarage(id).unwrap();
        alert("Garage deleted successfully");
      } catch (error) {
        alert("Failed to delete garage");
      }
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Garage Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all registered garages
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
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option>All Status</option>
              <option value="APPROVE">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="DECLINE">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Loading Overlay for re-fetching */}
        {(isFetching || isDeleting) && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Garage Name</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {garages.map((garage) => (
                <tr key={garage.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{garage.Garage_Name || "No Name Set"}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Joined: {new Date(garage.createdAt).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{garage.ownerName}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm text-gray-900">{garage.phone || "N/A"}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{garage.Contract || ""}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      garage.garageStatus === "APPROVE" ? "bg-green-50 text-green-700" : 
                      garage.garageStatus === "PENDING" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                    }`}>
                      {garage.garageStatus}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-gray-900">${garage.revenue.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      {garage.garageStatus === "PENDING" && (
                        <>
                          <button onClick={() => handleApprove(garage.userId)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                            <LuCheck className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button onClick={() => handleReject(garage.userId)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                            <LuX className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}
                      <button onClick={() => handleView(garage.userId)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(garage.userId)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Kept same layout, mapped to API fields) */}
        <div className="lg:hidden divide-y divide-gray-100">
          {garages.map((garage) => (
            <div key={garage.userId} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{garage.Garage_Name || "No Name"}</h3>
                  <p className="text-xs text-gray-500 mt-1">{new Date(garage.createdAt).toDateString()}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  garage.garageStatus === "APPROVE" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {garage.garageStatus}
                </span>
              </div>
              {/* ... Other mobile details similarly mapped ... */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                 <button onClick={() => handleDelete(garage.userId)} className="p-2 text-gray-600 hover:text-red-600 rounded-lg">
                    <LuTrash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && garages.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">No garages found</div>
        )}
      </div>
    </div>
  );
}