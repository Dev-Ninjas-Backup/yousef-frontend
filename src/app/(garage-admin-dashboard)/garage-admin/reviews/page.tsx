"use client";

import { useState, useEffect } from "react";
import { useGetUserProfileQuery } from "@/store/api/garageAdminApis/userProfileApi";
import { useGetGarageReviewsQuery, useGetGarageReviewStatsQuery } from "@/store/api/reviewApi";
import { Loader2, Star, Search, Download, ChevronLeft, ChevronRight, MessageSquare, ThumbsUp, ThumbsDown, SlidersHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Reusable solid star rating display
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const roundedRating = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= roundedRating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function GarageOwnerReviewsPage() {
  // Fetch user profile to get owned garages
  const { data: profileResponse, isLoading: profileLoading } = useGetUserProfileQuery();
  const garages = profileResponse?.data?.garages || [];

  const [selectedGarageId, setSelectedGarageId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Handle debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Set default garage when profile finishes loading
  useEffect(() => {
    if (garages.length > 0 && !selectedGarageId) {
      setSelectedGarageId(garages[0].id);
    }
  }, [garages, selectedGarageId]);

  // Fetch reviews for the selected garage
  const { data: reviewsResponse, isLoading: reviewsLoading } = useGetGarageReviewsQuery(
    {
      garageId: selectedGarageId,
      page,
      limit: 10,
      rating: ratingFilter,
    },
    { skip: !selectedGarageId }
  );

  // Fetch review statistics
  const { data: statsResponse, isLoading: statsLoading } = useGetGarageReviewStatsQuery(
    selectedGarageId,
    { skip: !selectedGarageId }
  );

  const reviews = reviewsResponse?.data?.reviews || [];
  const pagination = reviewsResponse?.data?.pagination;
  const stats = statsResponse?.data;

  // Filter reviews client-side for search query matching
  const filteredReviews = reviews.filter((review) => {
    if (!debouncedSearch) return true;
    const searchLower = debouncedSearch.toLowerCase();
    return (
      review.comment.toLowerCase().includes(searchLower) ||
      review.user.fullName.toLowerCase().includes(searchLower)
    );
  });

  const handleGarageChange = (id: string) => {
    setSelectedGarageId(id);
    setPage(1);
    setRatingFilter(undefined);
    setSearchQuery("");
  };

  const handleFilterByStar = (star: number) => {
    setRatingFilter(ratingFilter === star ? undefined : star);
    setPage(1);
  };

  const handleExportCSV = () => {
    if (!reviews.length) {
      toast.error("No reviews available to export.");
      return;
    }

    const activeGarage = garages.find((g) => g.id === selectedGarageId);
    const headers = [
      "Customer Name",
      "Rating",
      "Service Quality",
      "Timeliness",
      "Value For Money",
      "Comment",
      "Recommends",
      "Date",
    ];

    const rows = reviews.map((r) => [
      r.user.fullName,
      r.overallExperience,
      r.serviceQuality,
      r.timeliness,
      r.valueForMoney,
      `"${r.comment.replace(/"/g, '""')}"`,
      r.recommendation ? "Yes" : "No",
      new Date(r.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `reviews_${activeGarage?.name.toLowerCase().replace(/\s+/g, "_") || "garage"}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (garages.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-xl mx-auto shadow-sm mt-8">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Star size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">No Garages Listed Yet</h2>
        <p className="text-slate-500 mt-2">
          Please add and set up your garage profile first to start receiving and managing reviews.
        </p>
      </div>
    );
  }

  const activeGarageName = garages.find((g) => g.id === selectedGarageId)?.name || "Your Garage";

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reviews & Ratings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of customer feedback for {activeGarageName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Garage Selector Dropdown (only if owner owns multiple garages) */}
          {garages.length > 1 && (
            <div className="w-64">
              <Select value={selectedGarageId} onValueChange={handleGarageChange}>
                <SelectTrigger className="bg-white border-slate-200 shadow-sm rounded-xl focus:ring-blue-500">
                  <SelectValue placeholder="Select Garage" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {garages.map((garage) => (
                    <SelectItem key={garage.id} value={garage.id} className="cursor-pointer">
                      {garage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 h-40 flex items-center justify-center shadow-sm">
              <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Overall Score */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Score</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-black text-slate-900">
                  {stats.averageRatings.overall.toFixed(1)}
                </span>
                <span className="text-slate-400 font-medium">/ 5.0</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
              <StarRating rating={stats.averageRatings.overall} size={20} />
              <span className="text-sm font-semibold text-slate-500">{stats.totalReviews} customer reviews</span>
            </div>
          </div>

          {/* Card 2: Sub-category Quality Scores */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Service Category Breakdown</p>
            <div className="space-y-3">
              {[
                { label: "Service Quality", val: stats.averageRatings.serviceQuality },
                { label: "Timeliness", val: stats.averageRatings.timeliness },
                { label: "Value for Money", val: stats.averageRatings.valueForMoney },
              ].map(({ label, val }) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-900">{val.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${(val / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Rating Distribution Histogram */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating Distribution</p>
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution] ?? 0;
                const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                const isActive = ratingFilter === star;
                return (
                  <button
                    key={star}
                    onClick={() => handleFilterByStar(star)}
                    className={`w-full flex items-center gap-3 transition-opacity ${
                      ratingFilter !== undefined && !isActive ? "opacity-40" : ""
                    }`}
                  >
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-slate-600 w-5 shrink-0">
                      {star}★
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 w-6 text-right shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews by comment or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
          />
        </div>

        {/* Rating Filter Select */}
        <div className="w-full md:w-48">
          <Select
            value={ratingFilter === undefined ? "all" : String(ratingFilter)}
            onValueChange={(val) => {
              setRatingFilter(val === "all" ? undefined : Number(val));
              setPage(1);
            }}
          >
            <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-slate-400" />
                <SelectValue placeholder="Filter Ratings" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars only</SelectItem>
              <SelectItem value="4">4 Stars only</SelectItem>
              <SelectItem value="3">3 Stars only</SelectItem>
              <SelectItem value="2">2 Stars only</SelectItem>
              <SelectItem value="1">1 Star only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters (conditional) */}
        {(ratingFilter !== undefined || searchQuery) && (
          <button
            onClick={() => {
              setRatingFilter(undefined);
              setSearchQuery("");
              setPage(1);
            }}
            className="px-4 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Reviews List Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {reviewsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="w-10 h-10 shrink-0 border border-slate-100">
                    <AvatarImage src={review.user.profilePhoto ?? ""} alt={review.user.fullName} />
                    <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-sm">
                      {review.user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{review.user.fullName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={review.overallExperience} size={14} />
                          <span className="text-xs text-slate-400">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Recommendation Status */}
                      <div>
                        {review.recommendation !== undefined && (
                          review.recommendation ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 rounded-full px-2.5 py-1">
                              <ThumbsUp size={12} />
                              Recommends
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-full px-2.5 py-1">
                              <ThumbsDown size={12} />
                              No Recommendation
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                      {review.comment}
                    </p>

                    {/* Breakdown stars (smaller) */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 pt-3 border-t border-slate-100/50">
                      {[
                        { label: "Service", val: review.serviceQuality },
                        { label: "Timeliness", val: review.timeliness },
                        { label: "Value", val: review.valueForMoney },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">{label}:</span>
                          <StarRating rating={val} size={12} />
                          <span className="text-xs font-bold text-slate-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <MessageSquare className="w-12 h-12 text-slate-200 fill-slate-50 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No reviews found</h3>
            <p className="text-sm text-slate-400 mt-1">
              {debouncedSearch || ratingFilter !== undefined
                ? "No reviews match your filter parameters."
                : "Your garage hasn't received any reviews yet."}
            </p>
          </div>
        )}

        {/* Pagination bar */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500">
              Page {page} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    p === page
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
