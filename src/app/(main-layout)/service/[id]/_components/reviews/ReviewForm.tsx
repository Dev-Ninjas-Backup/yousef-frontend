"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ThumbsUp, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { StarPicker } from "./StarRating";
import { useSubmitReviewMutation } from "@/store/api/reviewApi";

interface ReviewFormProps {
  garageId: string;
  garageName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface RatingState {
  overallExperience: number;
  serviceQuality: number;
  timeliness: number;
  valueForMoney: number;
}

const RATING_FIELDS: { key: keyof RatingState; label: string; description: string }[] = [
  { key: "overallExperience", label: "Overall Experience", description: "How was your overall experience?" },
  { key: "serviceQuality", label: "Service Quality", description: "Quality of the repair/service work" },
  { key: "timeliness", label: "Timeliness", description: "Was the work completed on time?" },
  { key: "valueForMoney", label: "Value for Money", description: "Was it worth the price?" },
];

export default function ReviewForm({ garageId, garageName, isOpen, onClose }: ReviewFormProps) {
  const [ratings, setRatings] = useState<RatingState>({
    overallExperience: 0,
    serviceQuality: 0,
    timeliness: 0,
    valueForMoney: 0,
  });
  const [comment, setComment] = useState("");
  const [recommendation, setRecommendation] = useState<boolean | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const isValid =
    ratings.overallExperience > 0 &&
    ratings.serviceQuality > 0 &&
    ratings.timeliness > 0 &&
    ratings.valueForMoney > 0 &&
    comment.trim().length >= 10;

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setAttempted(true);
      toast.error("Please fill in all required fields before submitting.", {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
      return;
    }

    try {
      await submitReview({
        garageId,
        ...ratings,
        comment: comment.trim(),
        ...(recommendation !== null ? { recommendation } : {}),
      }).unwrap();

      toast.success("Review submitted successfully! Thank you for your feedback.", {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });
      onClose();
      setRatings({ overallExperience: 0, serviceQuality: 0, timeliness: 0, valueForMoney: 0 });
      setComment("");
      setRecommendation(null);
      setAttempted(false);
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to submit review. Please try again.";
      toast.error(msg);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
                <p className="text-sm text-gray-500 mt-0.5">{garageName}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Star Rating Rows */}
              <div className="space-y-3">
                {RATING_FIELDS.map(({ key, label, description }) => {
                  const isMissing = attempted && ratings[key] === 0;
                  const isDone = ratings[key] > 0;
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 border transition-colors ${
                        isMissing
                          ? "bg-red-50 border-red-200"
                          : isDone
                          ? "bg-green-50 border-green-100"
                          : "bg-gray-50 border-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5 flex-wrap">
                          {label}
                          {isMissing && (
                            <span className="text-xs font-medium text-red-500 bg-red-100 px-1.5 py-0.5 rounded-md">
                              Required
                            </span>
                          )}
                          {isDone && (
                            <span className="text-xs font-bold text-green-500">✓</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                      </div>
                      <StarPicker
                        value={ratings[key]}
                        onChange={(v) => setRatings((prev) => ({ ...prev, [key]: v }))}
                        size="md"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-gray-100" />

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this garage... (minimum 10 characters)"
                  rows={4}
                  maxLength={1000}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
                    attempted && comment.trim().length < 10
                      ? "border-red-300 bg-red-50"
                      : comment.trim().length >= 10
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                <p
                  className={`text-xs mt-1 text-right ${
                    attempted && comment.trim().length < 10
                      ? "text-red-500 font-medium"
                      : comment.length < 10 && comment.length > 0
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  {comment.length}/1000
                  {comment.trim().length < 10 && comment.length > 0
                    ? ` — ${10 - comment.trim().length} more character${10 - comment.trim().length > 1 ? "s" : ""} needed`
                    : ""}
                </p>
              </div>

              {/* Recommendation */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Would you recommend this garage?
                  <span className="text-xs font-normal text-gray-400 ml-1">(optional)</span>
                </p>
                <div className="flex gap-3">
                  {[
                    { value: true, label: "Yes, definitely!", color: "green" },
                    { value: false, label: "Not really", color: "red" },
                  ].map(({ value, label, color }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setRecommendation(recommendation === value ? null : value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
                        recommendation === value
                          ? color === "green"
                            ? "bg-green-50 border-green-300 text-green-700"
                            : "bg-red-50 border-red-300 text-red-700"
                          : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${value === false ? "rotate-180" : ""}`} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                All ratings and comment are required
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 shadow-sm hover:shadow active:scale-95 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
