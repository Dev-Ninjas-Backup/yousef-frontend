"use client";

import { useDeleteUserMutation, useGetAllUsersQuery, useLazyGetAllUsersQuery } from "@/store/fetures/admin.user.api";
import { Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { LuSearch, LuDownload, LuEye, LuTrash2, LuUsers, LuUserCheck, LuCreditCard, LuClock } from "react-icons/lu";
import UserDetailsModal from "./UserDetailsModal";

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [dateFilter, setDateFilter] = useState<string>("All Time");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // API Call: Fetching all users with search, pagination, and role filter
  const { data: response, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit,
    search: searchQuery || undefined,
    role: roleFilter || undefined,
  });
  
  // API Call: Soft Delete Mutation
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [triggerGetAllUsers] = useLazyGetAllUsersQuery();
  const [isExporting, setIsExporting] = useState(false);

  const users = response?.data?.data || [];
  const pagination = response?.data?.pagination;
  const stats = response?.data?.stats;

  const filteredUsers = users.filter((user) => {
    // Status filter
    if (statusFilter !== "All Status") {
      const targetIsActive = statusFilter === "Active";
      if (user.isActive !== targetIsActive) return false;
    }
    
    // Date filter
    if (dateFilter !== "All Time") {
      const joinDate = new Date(user.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - joinDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "Today" && diffDays > 1) return false;
      if (dateFilter === "This Week" && diffDays > 7) return false;
      if (dateFilter === "This Month" && diffDays > 30) return false;
      if (dateFilter === "This Year" && diffDays > 365) return false;
    }
    return true;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = "";
    let bValue: any = "";

    if (sortField === "fullName") {
      aValue = a.fullName || "";
      bValue = b.fullName || "";
    } else if (sortField === "email") {
      aValue = a.email || "";
      bValue = b.email || "";
    } else if (sortField === "vehicles") {
      aValue = a.vehicles || 0;
      bValue = b.vehicles || 0;
    } else if (sortField === "createdAt") {
      aValue = new Date(a.createdAt).getTime();
      bValue = new Date(b.createdAt).getTime();
    } else if (sortField === "isActive") {
      aValue = a.isActive ? 1 : 0;
      bValue = b.isActive ? 1 : 0;
    } else if (sortField === "subscriptionType") {
      aValue = a.subscriptionType || "";
      bValue = b.subscriptionType || "";
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      const res = await triggerGetAllUsers({
        page: 1,
        limit: 10000,
        search: searchQuery || undefined,
        role: roleFilter || undefined,
      }).unwrap();

      const allUsers = res?.data?.data || [];
      if (!allUsers.length) {
        alert("No data to export");
        return;
      }

      const filteredAllUsers = allUsers.filter((user) => {
        if (statusFilter !== "All Status") {
          const targetIsActive = statusFilter === "Active";
          if (user.isActive !== targetIsActive) return false;
        }
        
        if (dateFilter !== "All Time") {
          const joinDate = new Date(user.createdAt);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - joinDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (dateFilter === "Today" && diffDays > 1) return false;
          if (dateFilter === "This Week" && diffDays > 7) return false;
          if (dateFilter === "This Month" && diffDays > 30) return false;
          if (dateFilter === "This Year" && diffDays > 365) return false;
        }
        return true;
      });

      if (!filteredAllUsers.length) {
        alert("No matching data to export");
        return;
      }

      // Sort matching users locally based on current sorting
      const sortedAllUsers = [...filteredAllUsers].sort((a, b) => {
        if (!sortField) return 0;
        let aValue: any = "";
        let bValue: any = "";

        if (sortField === "fullName") {
          aValue = a.fullName || "";
          bValue = b.fullName || "";
        } else if (sortField === "email") {
          aValue = a.email || "";
          bValue = b.email || "";
        } else if (sortField === "role") {
          aValue = a.role || "";
          bValue = b.role || "";
        } else if (sortField === "status") {
          aValue = a.isActive ? "Active" : "Inactive";
          bValue = b.isActive ? "Active" : "Inactive";
        } else if (sortField === "createdAt") {
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
        } else if (sortField === "subscriptionType") {
          aValue = a.subscriptionType || "";
          bValue = b.subscriptionType || "";
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      const getAbsoluteUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
      };

      const csvHeaders = [
        "Name",
        "Email", 
        "Phone",
        "Role",
        "Status",
        "Vehicles",
        "Verified",
        "Profile Photo Link",
        "Join Date",
        "Subscription Type"
      ];

      const csvData = sortedAllUsers.map(user => [
        user.fullName || "",
        user.email || "",
        user.phone || "",
        user.role === "SUPER_ADMIN"
          ? "Main Admin"
          : user.role
            ? user.role
                .replace(/_/g, " ")
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "",
        user.isActive ? "Active" : "Inactive",
        (user.vehicles || 0).toString(),
        user.isVerified ? "Yes" : "No",
        getAbsoluteUrl(user.profilePhoto),
        new Date(user.createdAt).toLocaleDateString(),
        user.subscriptionType || "None"
      ]);

      const csvContent = [csvHeaders, ...csvData]
        .map(row => row.map(field => `"${(field || "").replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `users-data-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleView = (id: string) => {
    setSelectedUserId(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user? This is a soft delete.")) {
      try {
        await deleteUser(id).unwrap();
        alert("User deleted successfully");
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handleRoleChange = (role: string) => {
    setRoleFilter(role);
    setPage(1); // Reset to first page when filtering
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

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
            <LuUsers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-950 mt-1">{stats?.totalUsers ?? 0}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="p-3.5 bg-green-50 text-green-600 rounded-2xl">
            <LuUserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Car Owners</p>
            <h3 className="text-2xl font-bold text-gray-950 mt-1">{stats?.carOwners ?? 0}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
            <LuCreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid Partners</p>
            <h3 className="text-2xl font-bold text-gray-950 mt-1">{stats?.activePaid ?? 0}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
            <LuClock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trial Members</p>
            <h3 className="text-2xl font-bold text-gray-950 mt-1">{stats?.activeTrial ?? 0}</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => handleRoleChange(e.target.value)}
            title="Filter users by role"
            aria-label="Filter users by role"
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="CAR_OWNER">Car Owner</option>
            <option value="GARAGE_OWNER">Garage Owner</option>
            <option value="SUPER_ADMIN">Main Admin</option>
            <option value="MEMBER">Member</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            title="Filter users by status"
            aria-label="Filter users by status"
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            title="Filter users by join date"
            aria-label="Filter users by join date"
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Time">All Time</option>
            <option value="Today">Joined Today</option>
            <option value="This Week">Joined This Week</option>
            <option value="This Month">Joined This Month</option>
            <option value="This Year">Joined This Year</option>
          </select>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Loading Overlay */}
        {(isLoading || isFetching || isDeleting) && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("fullName")}
                >
                  <div className="flex items-center gap-1.5">
                    Name
                    {sortField === "fullName" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1.5">
                    Contact
                    {sortField === "email" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-center py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("vehicles")}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    Vehicles
                    {sortField === "vehicles" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1.5">
                    Join Date
                    {sortField === "createdAt" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("subscriptionType")}
                >
                  <div className="flex items-center gap-1.5">
                    Subscription
                    {sortField === "subscriptionType" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  onClick={() => handleSort("isActive")}
                >
                  <div className="flex items-center gap-1.5">
                    Status
                    {sortField === "isActive" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {user.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-[10px] text-blue-600 font-bold">
                          {user.role === "SUPER_ADMIN"
                            ? "Main Admin"
                            : user.role
                              ? user.role
                                  .replace(/_/g, " ")
                                  .toLowerCase()
                                  .split(" ")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")
                              : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.phone || "No Phone"}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <p className="text-sm text-gray-900">{user.vehicles}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.subscriptionType === "Paid Monthly" || user.subscriptionType?.startsWith("Monthly")
                        ? "bg-purple-50 text-purple-700 border border-purple-100"
                        : user.subscriptionType === "Free Trial"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "bg-gray-50 text-gray-500 border border-gray-100"
                    }`}>
                      {user.subscriptionType || "None"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleView(user.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
          {sortedUsers.map((user) => (
            <div key={user.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{user.fullName}</h3>
                    <p className="text-xs text-gray-500 mt-1">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm text-gray-900 truncate">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vehicles</p>
                  <p className="text-sm font-medium text-gray-900">{user.vehicles}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Subscription</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    user.subscriptionType === "Paid Monthly" || user.subscriptionType?.startsWith("Monthly")
                      ? "bg-purple-50 text-purple-700 border border-purple-100"
                      : user.subscriptionType === "Free Trial"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}>
                    {user.subscriptionType || "None"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => handleView(user.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-700 text-sm font-medium bg-gray-50 rounded-lg border border-gray-200">
                  <LuEye className="w-4 h-4" /> View
                </button>
                <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-600 hover:text-red-600 rounded-lg">
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && users.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">No users found</div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.total)} of {pagination.total} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">
                {page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
{selectedUserId && (
  <UserDetailsModal
    userId={selectedUserId}
    onClose={() => setSelectedUserId(null)}
  />
)}

    </div>
  );
}