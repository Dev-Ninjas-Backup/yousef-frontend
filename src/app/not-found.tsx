"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { errorTranslations } from "@/translations/error";

// Fallback translations
const fallbackTrans = {
  title: "Oops! Page Not Found",
  subtitle: "The page you're looking for seems to have taken a detour.",
  description: "Don't worry, even the best mechanics sometimes lose their tools!",
  goHome: "Go Home",
  goBack: "Go Back",
  popularPages: "Popular Pages",
  findGarages: "Find Garages",
  locateNearby: "Locate nearby",
  spareParts: "Spare Parts",
  buySell: "Buy & sell",
  contactUs: "Contact Us",
  getHelp: "Get help",
  supportText: "Need assistance? Our support team is here to help you get back on track."
};

export default function NotFound() {
  // Safe translation hook usage with fallback
  let trans = fallbackTrans;
  try {
    const { t } = useLanguage();
    const translatedTrans = t(errorTranslations.notFound);
    if (translatedTrans && typeof translatedTrans === 'object') {
      trans = translatedTrans;
    }
  } catch {
    // Use fallback if context is not available
    trans = fallbackTrans;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl font-bold text-blue-200 select-none">
              404
            </h1>

            {/* Garage/Car Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-6 shadow-lg">
                <Wrench className="w-16 h-16 text-blue-600" />
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
          <Button asChild className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              {trans.goHome}
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {trans.goBack}
          </Button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {trans.popularPages}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/service"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{trans.findGarages}</p>
                <p className="text-sm text-gray-500">{trans.locateNearby}</p>
              </div>
            </Link>

            <Link
              href="/spare-parts"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Wrench className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{trans.spareParts}</p>
                <p className="text-sm text-gray-500">{trans.buySell}</p>
              </div>
            </Link>

            <Link
              href="/contact-us"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{trans.contactUs}</p>
                <p className="text-sm text-gray-500">{trans.getHelp}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-8">
          {trans.supportText}
        </p>
      </div>
    </div>
  );
}
