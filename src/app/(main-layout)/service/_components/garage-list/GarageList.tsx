"use client";

import { useState } from "react";
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
import { icons } from "lucide-react";

const garagesData = [
  {
    id: "1",
    name: "Al Futtaim Auto Service",
    rating: 4.8,
    reviews: 1142,
    distance: "2.3 km away",
    location: "Dubai Marina",
    services: ["Car Repair", "Oil Change", "Towing", "Emergency"],
    description:
      "Professional auto repair services with certified mechanics. Specializing in all car brands with parts.",
    priceRange: "AED 150-300",
    status: "Open 24/7",
    position: { lat: 25.0772, lng: 55.1398 },
    icon: "wrench",
    iconColor: "red",
  },
  {
    id: "2",
    name: "Emirates Towing Service",
    rating: 4.5,
    reviews: 892,
    distance: "1.8 km away",
    location: "JBR",
    services: ["Towing", "Roadside Assist", "Battery Jump", "Lockout"],
    description:
      "Fast and reliable towing service available 24/7. Professional drivers with modern equipment for safe transport.",
    priceRange: "AED 200-400",
    status: "Emergency",
    position: { lat: 25.0818, lng: 55.1364 },
    icon: "truck",
    iconColor: "red",
  },
  {
    id: "3",
    name: "Dubai Quick Fix",
    rating: 4.9,
    reviews: 1523,
    distance: "3.1 km away",
    location: "Business Bay",
    services: ["Battery Service", "Tire Change", "AC Repair", "Diagnostics"],
    description:
      "Expert automotive services focusing on electrical systems and air conditioning repairs.",
    priceRange: "AED 100-250",
    status: "Open Now",
    position: { lat: 25.1872, lng: 55.2631 },
    icon: "zap",
    iconColor: "purple",
  },
  {
    id: "4",
    name: "Speed Oil Change Center",
    rating: 4.5,
    reviews: 687,
    distance: "4.2 km away",
    location: "Sheikh Zayed Road",
    services: ["Oil Change", "Filter Replace", "Car Wash", "Inspection"],
    description:
      "Quick oil change service with premium oils. Complete vehicle inspection and maintenance packages available.",
    priceRange: "AED 80-180",
    status: "Closes 10 PM",
    position: { lat: 25.1124, lng: 55.1979 },
    icon: "droplet",
    iconColor: "orange",
  },
];

export default function GarageList() {
  const [showMap, setShowMap] = useState(true);
  const [sortBy, setSortBy] = useState("distance");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">23 Garages Found</h2>
            <p className="text-sm text-gray-600">Near Dubai Marina</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort by Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Sort by Distance</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
              </SelectContent>
            </Select>

            {/* Show Map Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Show Map</span>
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
              <MapSection garages={garagesData} />
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
            {garagesData.map((garage) => (
              <GarageCard key={garage.id} {...garage} />
            ))}
          </div>
        </div>

        {/* Pagination - Below map and cards */}
        <div className="mt-6 flex">
          <Pagination className="justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="bg-gray-100" href="#">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="bg-gray-100" href="#">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="px-4">...</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="bg-gray-100" href="#">
                  28
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
