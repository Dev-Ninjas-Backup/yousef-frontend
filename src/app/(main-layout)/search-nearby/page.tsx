"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetNearbyGaragesQuery } from "@/store/api/garageApi";
import Image from "next/image";

function SearchNearbyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(10);

  useEffect(() => {
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");
    const radiusParam = searchParams.get("radius");

    if (latParam && lngParam) {
      setLat(parseFloat(latParam));
      setLng(parseFloat(lngParam));
      setRadius(radiusParam ? parseFloat(radiusParam) : 10);
    }
  }, [searchParams]);

  const { data: garagesResponse, isLoading, error } = useGetNearbyGaragesQuery(
    { lat: lat!, lng: lng!, radius },
    { skip: !lat || !lng }
  );

  const garages = garagesResponse?.garages || [];

  const handleGarageClick = (garageId: string) => {
    router.push(`/garage/${garageId}`);
  };

  if (isLoading || !lat || !lng) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load nearby garages</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nearby Garages</h1>
              <p className="text-gray-600 mt-2">
                Found {garages?.length || 0} garages within {radius}km of your location
              </p>
            </div>
          </div>
        </motion.div>

        {/* Garages Grid */}
        {garages && garages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {garages.map((garage: any, index: number) => (
              <motion.div
                key={garage.id}
                onClick={() => handleGarageClick(garage.id)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  {garage.coverPhoto ? (
                    <Image
                      src={garage.coverPhoto}
                      alt={garage.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  {/* Distance Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-sm font-medium">
                      {garage.distance?.toFixed(1) || "N/A"} km
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {garage.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {garage.city}, {garage.emirate}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {garage.formattedAddress}
                  </p>

                  {/* Services */}
                  {garage.services && garage.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {garage.services.slice(0, 3).map((service: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {service}
                        </span>
                      ))}
                      {garage.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{garage.services.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  {garage.averageRating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium ml-1">
                          {garage.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({garage.totalReviews || 0} reviews)
                      </span>
                    </div>
                  )}

                  {/* Hours */}
                  {garage.weekdaysHours && (
                    <p className="text-xs text-gray-500 mt-2">
                      {garage.weekdaysHours}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              No garages found within {radius}km of your location
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchNearbyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SearchNearbyContent />
    </Suspense>
  );
}
