"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Failed to load profile",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="w-full flex items-center justify-center py-20 px-4">
      <div className="flex flex-col items-center gap-5 max-w-sm text-center">
        {/* Animated error icon */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-30" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 shadow-md">
            <AlertCircle className="w-9 h-9 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-gray-800 font-semibold text-lg">
            Something went wrong
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Retry button */}
        <button
          onClick={onRetry ?? (() => window.location.reload())}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}