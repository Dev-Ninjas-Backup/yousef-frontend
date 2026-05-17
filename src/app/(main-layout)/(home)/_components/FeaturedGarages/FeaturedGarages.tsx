"use client";
import React, { useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import GarageCard from "./_components/GarageCard/GarageCard";
import { useLanguage } from "@/context/LanguageContext";
import { featuredGaragesTranslations } from "@/translations/featuredGarages";
import { useGetFeaturedGaragesQuery } from "@/store/api/promotionalApi";
import dubaiCar from "@/assets/home/FeaturedGarages/featured-garage-dubai.png";
import { AnimateOnScroll, StaggerOnScroll, fadeUp, scaleIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedGarages: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(featuredGaragesTranslations);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { data: featuredData, isLoading, error } = useGetFeaturedGaragesQuery();
  
  // Transform API data to match component structure
  const garages = featuredData?.garages?.map((garage: any) => ({
    id: garage.id,
    name: garage.name || garage.garageName,
    location: `${garage.street}, ${garage.city}, ${garage.emirate}`,
    rating: garage.averageRating || 0,
    image: garage.coverPhoto || garage.profileImage || dubaiCar.src,
    totalReviews: garage.totalReviews,
    services: garage.services,
    phone: garage.garagePhone,
    email: garage.email,
    latitude: garage.garageLat,
    longitude: garage.garageLng,
    garageOwnerId: garage.user?.id,
    profileImage: garage.profileImage,
  })) || [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-[#F8FAFC] py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !garages.length) {
    return (
      <section className="w-full bg-[#F8FAFC] py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-500">No featured garages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F8FAFC] py-12 md:py-16 lg:py-20 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variants={fadeUp}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                <span className="text-slate-900">Featured Garages </span>
                <span className="text-[#2563EB]">Near You</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl">Top-rated garages in your area, ready to help.</p>
            </div>
            
            <div className="hidden sm:flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <StaggerOnScroll className="flex gap-6 w-max">
            {garages.map((garage) => (
              <AnimateOnScroll key={garage.id} variants={scaleIn} className="snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-[390px]">
                <GarageCard
                  id={garage.id}
                  name={garage.name}
                  location={garage.location}
                  rating={garage.rating}
                  image={garage.image}
                  latitude={garage.latitude}
                  longitude={garage.longitude}
                  garageOwnerId={garage.garageOwnerId}
                  totalReviews={garage.totalReviews}
                  services={garage.services}
                  profileImage={garage.profileImage}
                />
              </AnimateOnScroll>
            ))}
          </StaggerOnScroll>
        </div>
        
        {/* Hide scrollbar for webkit browsers */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />

        <AnimateOnScroll variants={fadeUp} className="mt-8 md:mt-12 flex justify-center">
          <div className="bg-[#EFF6FF] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 max-w-4xl w-full mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center shadow-sm shrink-0">
              <MapPin className="w-8 h-8 text-[#2563EB]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Want to see more options?</h3>
              <p className="text-slate-600">View all garages near you on the map.</p>
            </div>
            <Link href="/garages" className="w-full sm:w-auto">
              <Button className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl px-8 h-14 text-base font-semibold w-full">
                View All Garages
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};

export default FeaturedGarages;