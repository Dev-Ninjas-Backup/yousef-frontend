import { Loader2, Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto">
            <Wrench className="w-10 h-10 text-blue-600" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-24 h-24 text-blue-400 animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Please wait while we prepare your content
        </p>

        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}