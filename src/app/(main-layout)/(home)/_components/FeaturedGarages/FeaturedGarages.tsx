"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import GarageCard from "./_components/GarageCard/GarageCard";
import { useLanguage } from "@/context/LanguageContext";
import { featuredGaragesTranslations } from "@/translations/featuredGarages";
import { useGetFeaturedGaragesQuery } from "@/store/api/promotionalApi";
import dubaiCar from "@/assets/home/FeaturedGarages/featured-garage-dubai.png";

const FeaturedGarages: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(featuredGaragesTranslations);
  
  const { data: featuredData, isLoading, error } = useGetFeaturedGaragesQuery();
  
  // Transform API data to match component structure
  const garages = featuredData?.garages?.map((garage) => ({
    id: garage.id,
    name: garage.garageName,
    location: `${garage.street}, ${garage.city}, ${garage.emirate}`,
    rating: garage.averageRating || 0,
    image: garage.coverPhoto || garage.profileImage || dubaiCar.src,
    totalReviews: garage.totalReviews,
    services: garage.services,
    phone: garage.garagePhone,
    email: garage.email,
    latitude: garage.garageLat,
    longitude: garage.garageLng,
    garageOwnerId: garage.user?.id
  })) || [];

  if (isLoading) {
    return (
      <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !garages.length) {
    return (
      <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-gray-500">No featured garages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl  font-bold text-center text-gray-900 mb-8 md:mb-12">
          {trans.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {garages.map((garage) => (
            <GarageCard
              key={garage.id}
              id={garage.id}
              name={garage.name}
              location={garage.location}
              rating={garage.rating}
              image={garage.image}
              latitude={garage.latitude}
              longitude={garage.longitude}
              garageOwnerId={garage.garageOwnerId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGarages;