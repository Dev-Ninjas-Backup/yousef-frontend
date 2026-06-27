"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetNearbyGaragesQuery } from "@/store/api/garageApi";
import { isGarageCurrentlyOpen } from "@/utils/schedule";
import GarageCard from "@/app/(main-layout)/service/_components/garage-card/GarageCard";

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
                Found {garages?.length || 0} garages {radius === 100000 ? "with full radius" : `within ${radius}km`} of your location
              </p>
            </div>
          </div>
        </motion.div>

        {/* Garages Grid */}
        {garages && garages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {garages.map((garage: any) => (
              <GarageCard
                key={garage.id}
                id={garage.id}
                name={garage.name}
                rating={garage.averageRating || 0}
                reviews={garage.totalReviews || 0}
                distance={typeof garage.distance === "number" ? `${garage.distance.toFixed(1)} km` : (garage.distance || "")}
                location={`${garage.city || ""}, ${garage.emirate || ""}`}
                services={garage.services || []}
                description={garage.description || ""}
                priceRange={garage.priceRange || "AED 150-300"}
                status={
                  (garage.isOpenNow !== undefined
                    ? garage.isOpenNow
                    : isGarageCurrentlyOpen(
                        garage.weekdaysHours,
                        garage.weekendsHours
                      ))
                    ? "Open Now"
                    : "Closed"
                }
                position={{ lat: garage.garageLat, lng: garage.garageLng }}
                ownerId={garage.userId || garage.user?.id}
                phone={garage.garagePhone || garage.user?.phone}
                brandExpertise={garage.brandExpertise || []}
                profileImage={garage.profileImage}
                weekdaysHours={garage.weekdaysHours}
                weekendsHours={garage.weekendsHours}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              No garages found {radius === 100000 ? "with full radius" : `within ${radius}km`} of your location
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
