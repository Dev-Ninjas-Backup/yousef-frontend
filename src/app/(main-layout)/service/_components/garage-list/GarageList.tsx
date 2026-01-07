"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import GarageCard from "../garage-card/GarageCard";
import MapSection from "../map-section/MapSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLanguage } from "@/context/LanguageContext";
import { serviceTranslations } from "@/translations/service";
import { useGetGaragesQuery } from "@/store/api/garageApi";

interface GarageListProps {
  searchParams: {
    emirate: string;
    serviceName: string;
  };
}

export default function GarageList({ searchParams }: GarageListProps) {
  const { t } = useLanguage();
  const trans = t(serviceTranslations);
  const [showMap, setShowMap] = useState(true);
  const [sortBy, setSortBy] = useState("distance");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  // API call with search parameters
  const {
    data: garagesResponse,
    isLoading,
    error,
  } = useGetGaragesQuery({
    page: currentPage,
    limit,
    emirate: searchParams.emirate || undefined,
    serviceName: searchParams.serviceName || undefined,
  });

  // Reset to first page when search params change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  // Transform API data for components
  const garages =
    (Array.isArray(garagesResponse?.data?.data)
      ? garagesResponse.data.data
      : []
    )?.map((garage: any) => ({
      id: garage.id,
      name: garage.name,
      rating: garage.averageRating || 4.5,
      reviews: garage.totalReviews || 0,
      distance: "2.5 km away",
      location: `${garage.city}, ${garage.emirate}`,
      services: garage.services || [],
      description: garage.description || "Professional automotive services",
      priceRange: "AED 150-300",
      status: "Open Now",
      position: { lat: garage.garageLat, lng: garage.garageLng },
      icon: "wrench",
      iconColor: "red",
      phone: garage.garagePhone,
      email: garage.email,
      address: garage.formattedAddress,
      hours: {
        weekdays: garage.weekdaysHours,
        weekends: garage.weekendsHours,
      },
    })) || [];

  const pagination = garagesResponse?.data?.pagination;
  const totalGarages = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-600">
              Failed to load garages. Please try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {totalGarages} {trans.list.garagesFound}
            </h2>
            <p className="text-sm text-gray-600">
              {searchParams.emirate && `in ${searchParams.emirate}`}
              {searchParams.serviceName && ` for ${searchParams.serviceName}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder={trans.list.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">{trans.list.sortBy}</SelectItem>
                <SelectItem value="rating">
                  {trans.list.sortByRating}
                </SelectItem>
                <SelectItem value="price">{trans.list.sortByPrice}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{trans.list.showMap}</span>
              <Switch
                checked={showMap}
                onCheckedChange={setShowMap}
                className="bg-blue-600 data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Desktop: Map Background + Cards Overlay | Mobile: Cards then Map */}
        <div
          className={`space-y-4 ${
            showMap ? "lg:relative lg:h-[1150px]" : "md:block"
          }`}
        >
          {/* Map - Below on mobile, Background on desktop */}
          {showMap && (
            <div className="h-[400px] w-full overflow-hidden rounded-xl lg:absolute lg:inset-0 lg:h-full lg:z-0">
              <MapSection garages={garages} />
            </div>
          )}

          {/* Garage Cards */}
          <div
            className={`${
              showMap
                ? "space-y-4 flex flex-col lg:absolute lg:left-4 lg:top-4 lg:z-10 lg:w-full lg:max-w-xl"
                : "md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0"
            }`}
          >
            {garages.length > 0 ? (
              garages.map((garage: any) => (
                <GarageCard key={garage.id} {...garage} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No garages found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    className={`cursor-pointer ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <span className="px-4">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer bg-gray-100"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={`cursor-pointer ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-800"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
