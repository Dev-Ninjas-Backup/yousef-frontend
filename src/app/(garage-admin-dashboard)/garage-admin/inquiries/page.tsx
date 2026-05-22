"use client";

import { useState, useMemo } from "react";
import { InquiryCard } from "./_components/InquiryCard";
import { EmptyInquiriesState } from "./_components/EmptyInquiriesState";
import { useGetCustomInquiriesQuery } from "@/store/api/garageAdminApis/myGarage/garageInquiryApi";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function InquiriesPage() {
  const { data, error, isLoading } = useGetCustomInquiriesQuery();
  const inquiries = data || [];

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const handleMarkClosed = (id: string) => {
    console.log("Mark as closed:", id);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSubjectFilter("all");
    setStatusFilter("all");
    setSortBy("newest");
  };

  const filteredInquiries = useMemo(() => {
    // 1. Filter
    const filtered = inquiries.filter((inquiry) => {
      const customerName = `${inquiry.FirstName} ${inquiry.LastName}`;
      const matchesSearch =
        customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        subjectFilter === "all" || inquiry.subject === subjectFilter;

      const isReplied = inquiry.messages && inquiry.messages.length > 0;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "new" && !isReplied) ||
        (statusFilter === "replied" && isReplied);

      return matchesSearch && matchesSubject && matchesStatus;
    });

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });
  }, [inquiries, searchQuery, subjectFilter, statusFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Error loading inquiries. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const isAnyFilterApplied = searchQuery || subjectFilter !== "all" || statusFilter !== "all";

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-md">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Inquiries
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage customer messages and inquiries ({filteredInquiries.length})
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, email, or message content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="replied">Replied</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
            </select>

            {/* Advanced Filters Trigger */}
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                showFiltersPanel
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showFiltersPanel && (
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-slide-down">
            {/* Subject Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Subject Type</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
              >
                <option value="all">All Subjects</option>
                <option value="CAR_PARTS">Car Parts</option>
                <option value="CAR_SERVICE">Car Service</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            {/* Reset Filters Option */}
            <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Cards List */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onMarkClosed={handleMarkClosed}
            />
          ))}
        </div>
      ) : isAnyFilterApplied ? (
        <div className="bg-white rounded-lg border p-12 text-center shadow-sm">
          <p className="text-gray-600 font-medium">
            No inquiries found matching your criteria
          </p>
          <button
            onClick={handleResetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-3 transition-colors"
          >
            Clear Filters & Try Again
          </button>
        </div>
      ) : (
        <EmptyInquiriesState />
      )}
    </div>
  );
}
