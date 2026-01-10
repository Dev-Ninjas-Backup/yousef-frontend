"use client";

import { Clock, Wrench, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { errorTranslations } from "@/translations/error";

export default function MaintenancePage() {
  const { t } = useLanguage();
  const trans = t(errorTranslations.maintenance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Maintenance Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large Maintenance Icon */}
            <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-16 h-16 text-yellow-600" />
            </div>

            {/* Animated Gears */}
            <div className="absolute top-4 right-1/3">
              <div className="w-8 h-8 bg-yellow-200 rounded-full animate-spin-slow flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
            <div className="absolute top-8 left-1/3">
              <div className="w-6 h-6 bg-orange-200 rounded-full animate-spin-reverse flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {trans.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {trans.subtitle}
          </p>
          <p className="text-gray-500 mb-6">
            {trans.description}
          </p>

          {/* Estimated Time */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">
              {trans.estimatedTime}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-yellow-600 h-2 rounded-full animate-pulse" style={{ width: "65%" }}></div>
          </div>
          <p className="text-sm text-gray-500">Maintenance in progress...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={() => window.location.reload()}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3"
          >
            <Clock className="w-5 h-5 mr-2" />
            Check Status
          </Button>

          <Button asChild variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stay Updated
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
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Get updates</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-8">
          Follow us on social media for real-time updates on maintenance progress.
        </p>
      </div>
    </div>
  );
}