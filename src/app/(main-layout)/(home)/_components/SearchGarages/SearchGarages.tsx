"use client";
import React, { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
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

const SearchGarages: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(searchGaragesTranslations);
  const router = useRouter();
  const [showNearbySearch, setShowNearbySearch] = useState(false);
  const [radius, setRadius] = useState("10");
  const [customRadius, setCustomRadius] = useState("");
  const [nearbyResults, setNearbyResults] = useState<any[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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
          setNearbyResults(garages.slice(0, 5));
          setShowNearbySearch(true);
          toast.success(
            `Found ${garages.length} garages within ${searchRadius}km`,
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
          `/service?lat=${latitude}&lng=${longitude}&radius=${searchRadius}`,
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
      <div className="shadow-xl max-w-4xl w-full bg-white p-4 md:p-8 rounded-lg">
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
                    <SelectItem value="5"><span>5 km</span></SelectItem>
                    <SelectItem value="10"><span>10 km</span></SelectItem>
                    <SelectItem value="20"><span>20 km</span></SelectItem>
                    <SelectItem value="50"><span>50 km</span></SelectItem>
                    <SelectItem value="custom"><span>Custom</span></SelectItem>
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
                  Nearby Garages (Top 5)
                </h3>
                <Button
                  variant="link"
                  onClick={handleViewAll}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {nearbyResults.map((garage) => (
                  <div
                    key={garage.id}
                    onClick={() => handleGarageClick(garage.id)}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Left: Main Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {garage.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {garage.address}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600">
                              {garage.distance?.toFixed(1)} km
                            </span>
                          </div>
                        </div>

                        {/* Rating & Status */}
                        <div className="flex items-center gap-4 mb-3">
                          {garage.averageRating && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500 text-lg">★</span>
                              <span className="font-semibold text-gray-900">
                                {garage.averageRating.toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({garage.totalReviews} reviews)
                              </span>
                            </div>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              garage.isOpenNow
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {garage.isOpenNow ? "Open Now" : "Closed"}
                          </span>
                        </div>

                        {/* Brand Expertise */}
                        {garage.brandExpertise &&
                          garage.brandExpertise.length > 0 && (
                            <div className="mb-2">
                              <span className="text-xs text-gray-600 font-medium">
                                Expertise:{" "}
                              </span>
                              <span className="text-xs text-gray-700">
                                {garage.brandExpertise.join(", ")}
                              </span>
                            </div>
                          )}

                        {/* Hours & Contact */}
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          {garage.weekdaysHours && (
                            <span>⏰ {garage.weekdaysHours}</span>
                          )}
                          {garage.user?.phone && (
                            <span>📞 {garage.user.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchGarages;
