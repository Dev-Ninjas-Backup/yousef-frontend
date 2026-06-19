"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Star, Loader2, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { StarDisplay } from "./StarRating";
import ReviewForm from "./ReviewForm";
import { useGetGarageReviewsQuery, useGetGarageReviewStatsQuery } from "@/store/api/reviewApi";
import { useAuth } from "@/context/AuthContext";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

interface GarageReviewsProps {
  garageId: string;
  garageName: string;
}

const STAR_COLORS: Record<number, string> = {
  5: "bg-green-500",
  4: "bg-lime-500",
  3: "bg-yellow-400",
  2: "bg-orange-400",
  1: "bg-red-500",
};

const SUB_RATINGS = [
  { key: "serviceQuality" as const, label: "Service Quality" },
  { key: "timeliness" as const, label: "Timeliness" },
  { key: "valueForMoney" as const, label: "Value for Money" },
];

export default function GarageReviews({ garageId, garageName }: GarageReviewsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: reviewsData, isLoading: reviewsLoading } = useGetGarageReviewsQuery({
    garageId,
    page,
    limit: 6,
    rating: ratingFilter,
  });

  const { data: statsData, isLoading: statsLoading } = useGetGarageReviewStatsQuery(garageId);

  const reviews = reviewsData?.data?.reviews ?? [];
  const pagination = reviewsData?.data?.pagination;
  const stats = statsData?.data;

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast.info("Please login to write a review.");
      router.push("/user-auth");
      return;
    }
    setIsFormOpen(true);
  };

  const handleFilterChange = (star: number | undefined) => {
    setRatingFilter(star);
    setPage(1);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Reviews & Ratings
            </h2>
            {stats && (
              <span className="text-sm text-slate-400 font-medium">
                ({stats.totalReviews})
              </span>
            )}
          </div>
          <button
            onClick={handleWriteReview}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all duration-150 shadow-sm hover:shadow active:scale-95"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Write a Review
          </button>
        </div>

        {/* Stats Panel */}
        {statsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ) : stats && stats.totalReviews > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-100">
            {/* Left — Overall Score */}
            <div className="flex flex-col items-center justify-center py-8 px-6 border-b md:border-b-0 md:border-r border-slate-100">
              <span className="text-6xl font-black text-slate-900 leading-none">
                {stats.averageRatings.overall.toFixed(1)}
              </span>
              <StarDisplay rating={stats.averageRatings.overall} size="lg" />
              <p className="text-sm text-slate-400 mt-2">out of 5 · {stats.totalReviews} reviews</p>

              {/* Sub-category scores */}
              <div className="mt-5 w-full max-w-[200px] space-y-2">
                {SUB_RATINGS.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{label}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${(stats.averageRatings[key] / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 w-6">
                        {stats.averageRatings[key].toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Distribution Histogram */}
            <div className="py-8 px-8 flex flex-col justify-center space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution] ?? 0;
                const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleFilterChange(ratingFilter === star ? undefined : star)}
                    className={`flex items-center gap-3 group transition-opacity ${
                      ratingFilter !== undefined && ratingFilter !== star ? "opacity-40" : ""
                    }`}
                  >
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-slate-600 w-6 shrink-0">
                      {star}<Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${STAR_COLORS[star]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, delay: (5 - star) * 0.05, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-6 text-right shrink-0">{count}</span>
                  </button>
                );
              })}
              {ratingFilter !== undefined && (
                <button
                  onClick={() => handleFilterChange(undefined)}
                  className="text-xs text-blue-500 hover:text-blue-700 mt-1 text-left font-medium"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        ) : stats && stats.totalReviews === 0 ? (
          <div className="py-12 px-6 text-center border-b border-slate-100">
            <Star className="h-10 w-10 text-gray-200 fill-gray-200 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">No reviews yet</p>
            <p className="text-slate-400 text-sm mt-1">Be the first to share your experience!</p>
            <button
              onClick={handleWriteReview}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Write the First Review
            </button>
          </div>
        ) : null}

        {/* Review List */}
        <div className="px-6 py-4">
          {reviewsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-5"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="shrink-0">
                      {review.user.profilePhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.user.profilePhoto}
                          alt={review.user.fullName}
                          className="h-10 w-10 rounded-full object-cover border border-slate-100"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {review.user.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.user.fullName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarDisplay rating={review.overallExperience} size="sm" />
                            <span className="text-xs text-slate-400">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>
                        {review.recommendation && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-100 rounded-full px-2.5 py-1 font-medium shrink-0">
                            <ThumbsUp className="h-3 w-3" />
                            Recommends
                          </span>
                        )}
                      </div>

                      {/* Comment */}
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Sub-ratings (compact) */}
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {[
                          { label: "Service", value: review.serviceQuality },
                          { label: "Timeliness", value: review.timeliness },
                          { label: "Value", value: review.valueForMoney },
                        ].map(({ label, value }) => (
                          <span key={label} className="text-xs text-slate-400 flex items-center gap-1">
                            {label}:
                            <StarDisplay rating={value} size="sm" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-slate-400 text-sm">
              No reviews match your filter.
            </p>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Review Form Modal */}
      <ReviewForm
        garageId={garageId}
        garageName={garageName}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
