"use client";
import { useState } from "react";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useGetAllClientReviewsQuery,
  useCreateClientReviewMutation,
  useUpdateClientReviewMutation,
  useDeleteClientReviewMutation,
} from "@/store/api/clientReviewApi";
import { useAppSelector } from "@/store/hooks";

export default function ReviewForm() {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data: allReviews } = useGetAllClientReviewsQuery();
  const myReview = allReviews?.find((r) => r.userId === userId);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [createReview, { isLoading: isCreating }] =
    useCreateClientReviewMutation();
  const [updateReview, { isLoading: isUpdating }] =
    useUpdateClientReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] =
    useDeleteClientReviewMutation();

  const handleSubmit = async () => {
    if (!reviewText.trim()) return toast.error("Please write a review first.");
    try {
      await createReview({ reviewText, rating: String(rating) }).unwrap();
      toast.success("Review submitted successfully!");
      setReviewText("");
      setRating(5);
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  const handleUpdate = async () => {
    if (!myReview || !reviewText.trim()) return;
    try {
      await updateReview({
        id: myReview.id,
        body: { reviewText, rating: String(rating) },
      }).unwrap();
      toast.success("Review updated!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update review.");
    }
  };

  const handleDelete = async () => {
    if (!myReview) return;
    try {
      await deleteReview(myReview.id).unwrap();
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  const startEdit = () => {
    if (!myReview) return;
    setReviewText(myReview.reviewText);
    setRating(Number(myReview.rating));
    setIsEditing(true);
  };

  // Already has a review — show it
  if (myReview && !isEditing) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Review
        </h3>
        <div className="flex gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${
                star <= Number(myReview.rating)
                  ? "fill-[#3397FF] text-[#3397FF]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 text-sm mb-5">{myReview.reviewText}</p>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={startEdit}
            className="border-[#0A84FF] text-[#0A84FF] hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="border-red-400 text-red-500 hover:bg-red-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    );
  }

  // Write / Edit form
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {isEditing ? "Edit Your Review" : "Share Your Experience"}
      </h3>

      {/* Star selector */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-7 h-7 cursor-pointer transition-colors ${
              star <= (hovered || rating)
                ? "fill-[#3397FF] text-[#3397FF]"
                : "fill-gray-200 text-gray-200"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <Textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        className="mb-4 resize-none min-h-[100px]"
      />

      <div className="flex gap-3">
        <Button
          onClick={isEditing ? handleUpdate : handleSubmit}
          disabled={isCreating || isUpdating}
          className="bg-[#0A84FF] hover:bg-[#0070e0] text-white"
        >
          {isCreating || isUpdating
            ? "Saving..."
            : isEditing
            ? "Update Review"
            : "Submit Review"}
        </Button>
        {isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
