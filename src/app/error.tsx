"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large Error Text */}
            <h1 className="text-9xl font-bold text-red-200 select-none">
              500
            </h1>

            {/* Error Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-6 shadow-lg">
                <AlertTriangle className="w-16 h-16 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            We're experiencing some technical difficulties.
          </p>
          <p className="text-gray-500">
            Our team has been notified and is working to fix the issue.
          </p>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Error Details:</h3>
            <p className="text-sm text-gray-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={reset}
            className="bg-red-600 hover:bg-red-700 px-6 py-3"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <div className="flex justify-center">
            <Link
              href="/contact-us"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Report Issue</p>
                <p className="text-sm text-gray-500">Contact support</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-8">
          We apologize for the inconvenience. Please try again or contact support.
        </p>
      </div>
    </div>
  );
}