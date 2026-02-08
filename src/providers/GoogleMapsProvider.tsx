"use client";

import { LoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      loadingElement={
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">Loading Maps</p>
              <p className="text-sm text-gray-500 mt-1">Please wait...</p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </LoadScript>
  );
}