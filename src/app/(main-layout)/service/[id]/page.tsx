"use client";

import { Inter } from "next/font/google";
import { Loader2 } from "lucide-react";
import { use } from "react";
import GarageHero from "./_components/hero-section/GarageHero";
import ServicesOffered from "./_components/services-offered/ServicesOffered";
import GarageOverview from "./_components/garage-overview/GarageOverview";
import OperatingHours from "./_components/operating-hours/OperatingHours";
import LocationMap from "./_components/location-map/LocationMap";
import { useGetGarageByIdQuery } from "@/store/api/garageApi";

const inter = Inter({ subsets: ["latin"] });

interface GarageDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GarageDetailsPage({ params }: GarageDetailsPageProps) {
  const { id } = use(params);
  console.log('Garage ID from params:', id); // Debug log
  
  // Skip API call if ID is undefined
  const { data: garageResponse, isLoading, error } = useGetGarageByIdQuery(id, {
    skip: !id || id === 'undefined'
  });
  
  // Show error if no valid ID
  if (!id || id === 'undefined') {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Garage ID</h1>
          <p className="text-gray-600">Please provide a valid garage ID to view details.</p>
        </div>
      </main>
    );
  }
  
  if (isLoading) {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </main>
    );
  }

  if (error || !garageResponse?.data) {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Garage Not Found</h1>
          <p className="text-gray-600">The garage you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const garage = garageResponse.data;
  
  // Transform API data to component format
  const garageData = {
    name: garage.name,
    rating: garage.averageRating || 4.5,
    reviews: garage.totalReviews || 0,
    distance: "2.5 km away", // Can be calculated based on user location
    services: garage.services || [],
    operatingHours: [
      {
        day: "Weekdays",
        hours: garage.weekdaysHours || "8:00 AM - 8:00 PM",
        status: "Open" as const,
      },
      {
        day: "Weekends", 
        hours: garage.weekendsHours || "9:00 AM - 6:00 PM",
        status: "Open" as const
      },
    ],
    description: garage.description ? [garage.description] : [
      "Professional automotive services with certified technicians and state-of-the-art diagnostic tools.",
      "We specialize in everything from routine maintenance and oil changes to complex engine repairs and electrical diagnostics.",
      "Our goal is to provide transparent, reliable, and timely automotive solutions that keep your car performing at its best."
    ],
    address: garage.formattedAddress || `${garage.address}, ${garage.city}, ${garage.emirate}`,
    position: { lat: garage.garageLat, lng: garage.garageLng },
    phone: garage.garagePhone,
    email: garage.email,
    certifications: garage.certifications || [],
    brandExpertise: garage.brandExpertise || [],
    coverPhoto: garage.coverPhoto,
    profileImage: garage.profileImage,
    owner: garage.user
  };

  return (
    <main className={inter.className}>
      <GarageHero
        name={garageData.name}
        rating={garageData.rating}
        reviews={garageData.reviews}
        distance={garageData.distance}
        services={garageData.services}
        operatingHours={garageData.operatingHours}
      />
      <ServicesOffered />
      <GarageOverview description={garageData.description} />
      <OperatingHours hours={garageData.operatingHours} />
      <LocationMap
        address={garageData.address}
        position={garageData.position}
      />
    </main>
  );
}
