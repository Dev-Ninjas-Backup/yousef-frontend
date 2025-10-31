"use client";

import { useState } from "react";
import { 
  LuSearch, 
  LuDownload, 
  LuEye, 
  LuTrash2,
  LuCheck,
  LuX
} from "react-icons/lu";

// Types
interface Garage {
  id: string;
  name: string;
  since: string;
  owner: string;
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  status: "Approved" | "Pending" | "Rejected";
  revenue: string;
}

// Mock data
const garagesData: Garage[] = [
  {
    id: "1",
    name: "Precision Auto Care",
    since: "Since 2024-01-15",
    owner: "Michael Rodriguez",
    location: "Los Angeles, CA",
    contact: {
      phone: "(555) 123-4567",
      email: "info@precisionautocare.com",
    },
    status: "Approved",
    revenue: "$12,450",
  },
  {
    id: "2",
    name: "QuickFix Auto Service",
    since: "Since 2025-10-20",
    owner: "Sarah Johnson",
    location: "San Diego, CA",
    contact: {
      phone: "(555) 234-5678",
      email: "contact@quickfixauto.com",
    },
    status: "Pending",
    revenue: "$0",
  },
  {
    id: "3",
    name: "Elite Motors Repair",
    since: "Since 2024-03-10",
    owner: "David Chen",
    location: "San Francisco, CA",
    contact: {
      phone: "(555) 345-6789",
      email: "info@elitemotors.com",
    },
    status: "Approved",
    revenue: "$18,900",
  },
];

export default function GarageManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [garages] = useState<Garage[]>(garagesData);

  // Filter garages based on search and status
  const filteredGarages = garages.filter((garage) => {
    const matchesSearch = 
      garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All Status" || garage.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const handleApprove = (id: string) => {
    console.log("Approving garage:", id);
    // Add approve logic here
  };

  const handleReject = (id: string) => {
    console.log("Rejecting garage:", id);
    // Add reject logic here
  };

  const handleView = (id: string) => {
    console.log("Viewing garage:", id);
    // Add view logic here
  };

  const handleDelete = (id: string) => {
    console.log("Deleting garage:", id);
    // Add delete logic here
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
          {/* Search Input */}
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search garages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
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
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                  Garage Name
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Owner
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGarages.map((garage) => (
                <tr key={garage.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{garage.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{garage.since}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{garage.owner}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{garage.location}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm text-gray-900">{garage.contact.phone}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{garage.contact.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        garage.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : garage.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {garage.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-gray-900">{garage.revenue}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-2">
                      {garage.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(garage.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                            title="Approve"
                          >
                            <LuCheck className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(garage.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                            title="Reject"
                          >
                            <LuX className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleView(garage.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(garage.id)}
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
          {filteredGarages.map((garage) => (
            <div key={garage.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{garage.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{garage.since}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    garage.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : garage.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {garage.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Owner</p>
                  <p className="text-sm text-gray-900">{garage.owner}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm text-gray-900">{garage.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm text-gray-900">{garage.contact.phone}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{garage.contact.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Revenue</p>
                  <p className="text-sm font-medium text-gray-900">{garage.revenue}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                {garage.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(garage.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <LuCheck className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(garage.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <LuX className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleView(garage.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <LuEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(garage.id)}
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
        {filteredGarages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No garages found</p>
          </div>
        )}
      </div>
    </div>
  );
}