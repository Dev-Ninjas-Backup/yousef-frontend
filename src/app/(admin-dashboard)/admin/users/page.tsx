"use client";

import { useState } from "react";
import { LuSearch, LuDownload, LuEye, LuTrash2 } from "react-icons/lu";

// Types
interface User {
  id: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  vehicles: number;
  joinDate: string;
  status: "Active" | "Inactive" | "Suspended";
}

// Mock data
const usersData: User[] = [
  {
    id: "1",
    name: "John Doe",
    contact: {
      email: "john.doe@example.com",
      phone: "(555) 111-2222",
    },
    vehicles: 2,
    joinDate: "2024-05-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    contact: {
      email: "jane.smith@example.com",
      phone: "(555) 222-3333",
    },
    vehicles: 1,
    joinDate: "2024-06-20",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState<User[]>(usersData);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.phone.includes(searchQuery);

    return matchesSearch;
  });

  const handleExportData = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const handleView = (id: string) => {
    console.log("Viewing user:", id);
    // Add view logic here
  };

  const handleDelete = (id: string) => {
    console.log("Deleting user:", id);
    // Add delete logic here
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all platform users
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

      {/* Search Section */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
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
                  Name
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehicles
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm text-gray-900">
                        {user.contact.email}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {user.contact.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900 text-center">
                      {user.vehicles}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{user.joinDate}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : user.status === "Inactive"
                          ? "bg-gray-50 text-gray-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(user.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Joined: {user.joinDate}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : user.status === "Inactive"
                      ? "bg-gray-50 text-gray-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm text-gray-900">
                    {user.contact.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {user.contact.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vehicles</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.vehicles}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleView(user.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-700 text-sm font-medium bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <LuEye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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
        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}