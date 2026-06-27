"use client";
import React, { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import search_garage_bg from "../../../../../assets/home/searchGarage/search_garage_bg.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { searchGaragesTranslations } from "@/translations/searchGarages";
import { useRouter } from "next/navigation";
import { useLazyGetNearbyGaragesQuery } from "@/store/api/garageApi";
import { toast } from "sonner";
import { isGarageCurrentlyOpen } from "@/utils/schedule";
import GarageCard from "@/app/(main-layout)/service/_components/garage-card/GarageCard";

const SearchGarages: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(searchGaragesTranslations);
  const router = useRouter();
  const [showNearbySearch, setShowNearbySearch] = useState(false);
  const [radius, setRadius] = useState("10");
  const [customRadius, setCustomRadius] = useState("");
  const [nearbyResults, setNearbyResults] = useState<any[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchedRadius, setSearchedRadius] = useState<number | null>(null);

  const [getNearbyGarages, { isLoading: isLoadingNearby }] =
    useLazyGetNearbyGaragesQuery();

  const handleNearbySearch = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const searchRadius = customRadius
          ? parseFloat(customRadius)
          : parseFloat(radius);

        try {
          const result = await getNearbyGarages({
            lat: latitude,
            lng: longitude,
            radius: searchRadius,
          }).unwrap();

          const garages = result.garages || [];
          if (searchRadius === 100000) {
            setNearbyResults(garages);
          } else {
            setNearbyResults(garages.slice(0, 5));
          }
          setSearchedRadius(searchRadius);
          setShowNearbySearch(true);
          toast.success(
            searchRadius === 100000
              ? `Found ${garages.length} garages`
              : `Found ${garages.length} garages within ${searchRadius}km`,
          );
        } catch (error: any) {
          const errorMessage = error?.data?.message;
          if (Array.isArray(errorMessage)) {
            toast.error(errorMessage[0] || "Failed to fetch nearby garages");
          } else if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          } else {
            toast.error("Failed to fetch nearby garages");
          }
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        toast.error("Unable to retrieve your location");
      },
    );
  };

  const handleViewAll = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const searchRadius = customRadius
          ? parseFloat(customRadius)
          : parseFloat(radius);
        router.push(
          `/service?lat=${latitude}&lng=${longitude}&radius=${searchRadius}#garages-list`,
        );
      });
    }
  };

  const handleGarageClick = (garageId: string) => {
    router.push(`/service/${garageId}`);
  };

  return (
    <section
      className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${search_garage_bg.src})` }}
    >
      <motion.div
        className="shadow-xl max-w-4xl w-full bg-white p-4 md:p-8 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-xl md:text-2xl text-center font-bold">
          {trans.title}
        </div>

        <div>
          {/* Nearby Search Section */}
          <div className="py-6">
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="w-full sm:flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Search Radius
                </label>
                <Select value={radius} onValueChange={setRadius}>
                  <SelectTrigger className="w-full h-[50px] px-4 border-gray-300 rounded-lg bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="5">
                      <span>5 km</span>
                    </SelectItem>
                    <SelectItem value="10">
                      <span>10 km</span>
                    </SelectItem>
                    <SelectItem value="20">
                      <span>20 km</span>
                    </SelectItem>
                    <SelectItem value="50">
                      <span>50 km</span>
                    </SelectItem>
                    <SelectItem value="100000">
                      <span>Full Radius</span>
                    </SelectItem>
                    <SelectItem value="custom">
                      <span>Custom</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {radius === "custom" && (
                <div className="w-full sm:flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Custom Radius (km)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={customRadius}
                    onChange={(e) => setCustomRadius(e.target.value)}
                    placeholder="Enter km"
                    className="h-[50px] px-4 border-gray-300 rounded-lg"
                  />
                </div>
              )}

              <Button
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 h-[50px] rounded-lg sm:min-w-[200px]"
                onClick={handleNearbySearch}
                disabled={isLoadingLocation || isLoadingNearby}
              >
                {isLoadingLocation || isLoadingNearby ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 mr-2" />
                )}
                Search Nearby
              </Button>
            </div>
          </div>

          {/* Nearby Results */}
          {showNearbySearch && nearbyResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {searchedRadius === 100000
                    ? "Nearby Garages"
                    : "Nearby Garages (Top 5)"}
                </h3>
                <Button
                  variant="link"
                  onClick={handleViewAll}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {nearbyResults.map((garage) => (
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
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default SearchGarages;
