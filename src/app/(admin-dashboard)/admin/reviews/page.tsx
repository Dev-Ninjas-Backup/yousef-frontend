"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { LuSearch, LuDownload, LuTrash2, LuStar } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  useGetAllClientReviewsQuery,
  useAdminDeleteClientReviewMutation,
} from "@/store/api/clientReviewApi";
import ProtectedRoute from "@/components/ProtectedRoute";

const ITEMS_PER_PAGE = 10;

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <LuStar
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating
              ? "fill-[#3397FF] text-[#3397FF]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewsContent() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: reviews, isLoading } = useGetAllClientReviewsQuery();
  const [adminDelete, { isLoading: isDeleting }] =
    useAdminDeleteClientReviewMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setDeletingId(id);
    try {
      await adminDelete(id).unwrap();
      toast.success("Review deleted successfully.");
    } catch {
      toast.error("Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExport = () => {
    if (!filtered.length) return toast.error("No data to export.");
    const headers = ["Name", "Email", "Rating", "Review", "Date"];
    const rows = filtered.map((r) => [
      r.user?.fullName ?? "",
      r.user?.email ?? "",
      r.rating,
      r.reviewText.replace(/"/g, "'"),
      new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((f) => `"${f}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `client-reviews-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Filter
  const filtered = (reviews ?? []).filter((r) => {
    const matchSearch =
      r.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.reviewText?.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.email?.toLowerCase().includes(search.toLowerCase());
    const matchRating = ratingFilter
      ? Number(r.rating) === Number(ratingFilter)
      : true;
    return matchSearch && matchRating;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const avgRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Client Reviews
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {reviews?.length ?? 0} total reviews · Avg rating: {avgRating} ★
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuDownload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = (reviews ?? []).filter(
            (r) => Number(r.rating) === star
          ).length;
          return (
            <div
              key={star}
              onClick={() => {
                setRatingFilter(ratingFilter === String(star) ? "" : String(star));
                setPage(1);
              }}
              className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
                ratingFilter === String(star)
                  ? "border-blue-500 shadow-md"
                  : "border-gray-100 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                <LuStar className="w-4 h-4 fill-[#3397FF] text-[#3397FF]" />
                <span className="font-semibold text-gray-900">{star}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-400">reviews</p>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or review text..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <select
            value={ratingFilter}
            onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}
            aria-label="Filter by rating"
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {(isLoading || (isDeleting && deletingId)) && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Review
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={review.user?.profilePhoto ?? ""} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
                          {review.user?.fullName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {review.user?.fullName ?? "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {review.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <StarDisplay rating={Number(review.rating)} />
                    <span className="text-xs text-gray-400 mt-0.5 block">
                      {review.rating}/5
                    </span>
                  </td>
                  <td className="py-4 px-5 max-w-xs">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {review.reviewText}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={isDeleting && deletingId === review.id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {paginated.map((review) => (
            <div key={review.id} className="p-4 sm:p-5 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.user?.profilePhoto ?? ""} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                      {review.user?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {review.user?.fullName ?? "Unknown"}
                    </p>
                    <p className="text-xs text-gray-400">{review.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  disabled={isDeleting && deletingId === review.id}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
              <StarDisplay rating={Number(review.rating)} />
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {review.reviewText}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && paginated.length === 0 && (
          <div className="py-16 text-center">
            <LuStar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No reviews found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} reviews
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">
                {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <ProtectedRoute requiredRole={["SUPER_ADMIN"]} redirectTo="/admin-auth">
      <ReviewsContent />
    </ProtectedRoute>
  );
}
