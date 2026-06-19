"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, Search } from "lucide-react";
import GarageCard from "../garage-card/GarageCard";
import MapSection from "../map-section/MapSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useGetGaragesQuery, useGetServiceCategoriesQuery } from "@/store/api/garageApi";

interface SearchableSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: string[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage?: string;
  allLabel?: string;
}

function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage = "No results found.",
  allLabel = "All Services",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full sm:w-[180px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border rounded-lg h-10 px-3 py-2 flex items-center justify-between text-sm shadow-sm text-left hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <span className="truncate text-gray-900 font-medium">
          {value || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-full bg-white border rounded-lg shadow-lg z-50 p-1.5 flex flex-col max-h-[300px] min-w-[200px]">
          <div className="relative mb-1.5">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8 pr-3 py-1 w-full bg-gray-50 border rounded-md text-xs h-8 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 max-h-[220px] scrollbar-thin scrollbar-thumb-gray-200">
            {search === "" && (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md cursor-pointer transition-colors ${
                  value === null
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {allLabel}
              </button>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md cursor-pointer transition-colors block truncate ${
                    value === option
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-2.5 py-2 text-xs text-gray-500 text-center">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [allGarages, setAllGarages] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const observerTarget = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setSelectedService(searchParams.serviceName || null);
  }, [searchParams.serviceName]);

  const { data: servicesData } = useGetServiceCategoriesQuery();
  const servicesList = servicesData?.serviceCategories || [
    "AC Service",
    "Battery Replacement",
    "Body Work",
    "Brake Repair",
    "Diagnostics",
    "Electrical Repair",
    "Emergency Towing",
    "Engine Repair",
    "Oil Change",
    "Suspension Repair",
    "Tire Service",
    "Towing",
    "Transmission Service",
    "Mobile Van Repair Service",
  ];

  const servicesToExclude = [
    "Emergency Towing",
    "Mobile Van Repair Service",
    "Car Van Mobile Service",
    "Van Doorstep Repair"
  ];
  const filteredServicesList = servicesList.filter(
    (service: string) => !servicesToExclude.includes(service)
  );

  const limit = showMap ? 10 : 10;

  // Fetch geolocation for distance sorting
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation not available or permission denied:", error.message);
        }
      );
    }
  }, []);

  // API call with search and filter parameters
  const {
    data: garagesResponse,
    isLoading,
    isFetching,
    error,
  } = useGetGaragesQuery({
    page: currentPage,
    limit,
    emirate: searchParams.emirate || undefined,
    serviceName: selectedService || undefined,
    search: debouncedSearch || undefined,
    brandExpertise: selectedExpertise || undefined,
    sortBy: sortBy || undefined,
    userLat: userCoords ? userCoords.lat.toString() : undefined,
    userLng: userCoords ? userCoords.lng.toString() : undefined,
  });

  // Reset when showMap, search params, filters, sorting, or garage search query change
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
  }, [searchParams, showMap, selectedService, selectedExpertise, sortBy, debouncedSearch]);

  // Transform and accumulate garages for infinite scroll
  useEffect(() => {
    if (garagesResponse?.data?.data) {
      const newGarages = garagesResponse.data.data.map((garage: any) => ({
        id: garage.id,
        name: garage.name,
        rating: garage.averageRating || 0,
        reviews: garage.totalReviews || 0,
        distance: garage.distance || "2.5 km away",
        location: `${garage.city}, ${garage.emirate}`,
        services: garage.services || [],
        description: garage.description || "Professional automotive services",
        priceRange: "AED 150-300",
        status: "Open Now",
        position: { lat: garage.garageLat, lng: garage.garageLng },
        profileImage: garage.profileImage || null,
        icon: "wrench",
        iconColor: "red",
        phone: garage.garagePhone,
        email: garage.email,
        address: garage.formattedAddress,
        hours: {
          weekdays: garage.weekdaysHours,
          weekends: garage.weekendsHours,
        },
        ownerId: garage.userId,
        brandExpertise: garage.brandExpertise || [],
      }));

      if (showMap) {
        // Infinite scroll: accumulate garages only if page > 1
        if (currentPage === 1) {
          setAllGarages(newGarages);
        } else {
          setAllGarages((prev) => {
            const existingIds = new Set(prev.map((g) => g.id));
            const uniqueNew = newGarages.filter(
              (g: any) => !existingIds.has(g.id),
            );
            return [...prev, ...uniqueNew];
          });
        }
        setHasMore(newGarages.length === limit);
      } else {
        // Pagination: replace garages
        setAllGarages(newGarages);
      }
    }
  }, [garagesResponse, showMap, limit, currentPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (!showMap || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [showMap, hasMore, isLoading]);

  const garages = allGarages;

  const pagination = garagesResponse?.data?.pagination;
  const totalGarages = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if ((isLoading || isFetching) && currentPage === 1) {
    return (
      <section id="garages-list" className="relative py-8">
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
    <section id="garages-list" className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Row: Title + Map Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {totalGarages} {trans.list.garagesFound}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {searchParams.emirate && `in ${searchParams.emirate}`}
                {searchParams.serviceName && ` for ${searchParams.serviceName}`}
              </p>
            </div>

            {/* Show Map Switch */}
            <div className="flex items-center justify-between sm:justify-start gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs h-10 w-full sm:w-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{trans.list.showMap}</span>
              <Switch
                checked={showMap}
                onCheckedChange={setShowMap}
                className="bg-blue-600 data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>

          {/* Bottom Row: Filters + Quick Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-2">
            {/* Filter Dropdowns Group */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Garage Name Search Bar (Moved here, first in group) */}
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={trans.filters?.searchGarage || "Search for specific garage..."}
                  className="pl-9 pr-4 w-full bg-white border border-gray-200 shadow-xs rounded-lg h-10 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200 shadow-xs h-10">
                  <SelectValue placeholder={trans.list.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">{trans.list.sortBy}</SelectItem>
                  <SelectItem value="rating">
                    {trans.list.sortByRating}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Service Filter (Searchable) */}
              <SearchableSelect
                value={selectedService}
                onChange={setSelectedService}
                options={filteredServicesList}
                placeholder={trans.filters?.allServices || "All Services"}
                searchPlaceholder={trans.filters?.searchService || "Search services..."}
                allLabel={trans.filters?.allServices || "All Services"}
              />

              {/* Brand Expertise Filter */}
              <Select
                value={selectedExpertise || "all"}
                onValueChange={(val) => setSelectedExpertise(val === "all" ? null : val)}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200 shadow-xs h-10">
                  <SelectValue placeholder={trans.filters?.expertsIn || "Experts In"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{trans.filters?.allExpertises || "All Expertises"}</SelectItem>
                  {[
                    "American cars",
                    "Japanese cars",
                    "British cars",
                    "German cars",
                    "Korean cars",
                    "French cars",
                    "Italian cars",
                  ].map((origin) => (
                    <SelectItem key={origin} value={origin}>
                      {origin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Action Filter Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Emergency Towing Button */}
              <Button
                variant={selectedService === "Emergency Towing" ? "default" : "outline"}
                onClick={() => setSelectedService(selectedService === "Emergency Towing" ? null : "Emergency Towing")}
                className={`h-10 px-5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto ${
                  selectedService === "Emergency Towing"
                    ? "bg-red-600 text-white hover:bg-red-700 border border-red-600 shadow-inner"
                    : "bg-white text-red-600 border border-red-200 hover:bg-rose-50 hover:border-red-300"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse mr-1"></span>
                {trans.filters?.emergencyTowing || "Emergency Towing"}
              </Button>

              {/* Mobile Home Car Service Button */}
              <Button
                variant={selectedService === "Mobile Van Repair Service" ? "default" : "outline"}
                onClick={() => setSelectedService(selectedService === "Mobile Van Repair Service" ? null : "Mobile Van Repair Service")}
                className={`h-10 px-5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto ${
                  selectedService === "Mobile Van Repair Service"
                    ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-inner"
                    : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {trans.filters?.mobileHomeService || "Mobile Home Car Service"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Desktop: Map Background + Cards Overlay | Mobile: Cards then Map */}
        <div
          className={`${showMap ? "lg:relative lg:h-[1150px] overflow-hidden rounded-xl space-y-8 sm:space-y-0" : "md:block"}`}
        >
          {/* Map - Below on mobile, Background on desktop */}
          {showMap && (
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl lg:absolute lg:inset-0 lg:h-full lg:z-0">
              <MapSection garages={garages} />
            </div>
          )}

          {/* Hide/Show Toggle Button - Desktop Only */}
          {showMap && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`hidden lg:flex absolute top-4 z-20 items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "lg:left-[592px]" : "lg:left-4"
              }`}
              title={isSidebarOpen ? "Hide Garages List" : "Show Garages List"}
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}

          {/* Garage Cards */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              showMap
                ? `lg:absolute lg:top-4 lg:z-10 lg:w-full lg:max-w-xl lg:max-h-[calc(100%-2rem)] lg:overflow-y-auto lg:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                    isSidebarOpen 
                      ? "lg:left-4 lg:opacity-100 lg:translate-x-0" 
                      : "lg:-translate-x-[110%] lg:opacity-0 lg:pointer-events-none"
                  }`
                : "md:grid md:grid-cols-2 md:gap-4"
            }`}
          >
            <div
              className={
                showMap ? "space-y-4" : "space-y-4 md:space-y-0 md:contents"
              }
            >


              {garages.length > 0 ? (
                <>
                  {garages.map((garage: any) => (
                    <GarageCard key={garage.id} {...garage} />
                  ))}
                  {/* Infinite scroll trigger */}
                  {showMap && hasMore && (
                    <div ref={observerTarget} className="py-6 text-center">
                      {isLoading && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md inline-flex items-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Loading more garages...
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    No garages found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination - Only show when map is OFF */}
        {!showMap && totalPages > 1 && (
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
