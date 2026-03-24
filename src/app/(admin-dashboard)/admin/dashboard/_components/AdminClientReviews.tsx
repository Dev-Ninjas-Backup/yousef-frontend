"use client";
import { useState } from "react";
import { StarIcon, Trash2, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetAllClientReviewsQuery,
  useAdminDeleteClientReviewMutation,
} from "@/store/api/clientReviewApi";

export default function AdminClientReviews() {
  const { data: reviews, isLoading } = useGetAllClientReviewsQuery();
  const [adminDelete, { isLoading: isDeleting }] =
    useAdminDeleteClientReviewMutation();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await adminDelete(id).unwrap();
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = (reviews ?? []).filter(
    (r) =>
      r.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.reviewText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Client Reviews
          </h2>
          <p className="text-sm text-gray-500">
            {reviews?.length ?? 0} total reviews
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-10 text-sm">
          No reviews found.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarImage
                  src={review.user?.profilePhoto ?? ""}
                  alt={review.user?.fullName}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                  {review.user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") ?? "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-gray-900">
                    {review.user?.fullName ?? "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {review.user?.email}
                  </span>
                </div>
                <div className="flex gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Number(review.rating)
                          ? "fill-[#3397FF] text-[#3397FF]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {review.reviewText}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(review.id)}
                disabled={isDeleting && deletingId === review.id}
                className="shrink-0 text-red-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
