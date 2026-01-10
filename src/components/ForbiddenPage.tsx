"use client";

import { Shield, Home, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { errorTranslations } from "@/translations/error";

export default function ForbiddenPage() {
  const { t } = useLanguage();
  const trans = t(errorTranslations.forbidden);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 403 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 403 Text */}
            <h1 className="text-9xl font-bold text-red-200 select-none">
              403
            </h1>

            {/* Shield Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-6 shadow-lg">
                <Shield className="w-16 h-16 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {trans.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {trans.subtitle}
          </p>
          <p className="text-gray-500">
            {trans.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button asChild className="bg-red-600 hover:bg-red-700 px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Access?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/user-auth"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Login</p>
                <p className="text-sm text-gray-500">Sign in to access</p>
              </div>
            </Link>

            <Link
              href="/contact-us"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Request access</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-8">
          If you believe you should have access to this page, please contact our support team.
        </p>
      </div>
    </div>
  );
}