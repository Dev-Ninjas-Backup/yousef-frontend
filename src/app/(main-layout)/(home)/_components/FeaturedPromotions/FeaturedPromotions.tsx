"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tag, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Toyotaimg from "@/assets/home/FeaturedPromotions/ImageWithFallback.png";
import bmwimg from "@/assets/home/FeaturedPromotions/featured-bmw-service.png";
import marcedesimg from "@/assets/home/FeaturedPromotions/featured-marcedes.jpg";
import spedoGarageimg from "@/assets/home/FeaturedPromotions/featured-spedogarage.jpg";
import bmwbrakeimg from "@/assets/home/FeaturedPromotions/featured-garage-dubai.png";

const promotions = [
  {
    id: 1,
    title: "Original Toyota Parts Sale",
    description:
      "Exclusive offer: Toyota parts now available! parts with warranty. Up to 30% off on selected items.",
    image: Toyotaimg,
    badge: "Featured Parts",
    validUntil: "Oct 30, 2025",
  },
  {
    id: 2,
    title: "BMW Service Special",
    description:
      "Premium BMW service packages now available! Expert technicians. Save up to 25% on maintenance.",
    image: bmwimg,
    badge: "Featured Service",
    validUntil: "Nov 15, 2025",
  },
  {
    id: 3,
    title: "Mercedes Parts Collection",
    description:
      "Mercedes parts in stock! OEM quality with warranty coverage. Limited time offer - 20% discount.",
    image: marcedesimg,
    badge: "Featured Parts",
    validUntil: "Dec 01, 2025",
  },
  {
    id: 4,
    title: "SpeedPro Garage Dubai",
    description:
      "Top-rated garage services with certified mechanics. Complete car maintenance and repair solutions.",
    image: spedoGarageimg,
    badge: "Featured Garage",
    validUntil: "Dec 15, 2025",
  },
  {
    id: 5,
    title: "BMW Brake System Parts",
    description:
      "Premium BMW brake components available now! High-performance parts with manufacturer warranty.",
    image: bmwbrakeimg,
    badge: "Premium Parts",
    validUntil: "Jan 01, 2026",
  },
];

const FeaturedPromotions: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection("right");
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentSlide(
      (prev) => (prev - 1 + promotions.length) % promotions.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 bg-[#0D6EFD] text-white px-4 py-2 rounded-md mb-4 text-sm md:text-base">
          <Tag className="w-4 h-4" />
          <span className="font-semibold">Featured Coming Soon</span>
        </div>
        <h2 className="text-base mb-2 text-[#101828]">
          Exclusive Offers & Featured Services
        </h2>
        <p className="text-base text-gray-600">
          Discover top-rated garages and exclusive deals on spare parts
        </p>
      </div>

      <div className="relative mb-8 md:mb-6">
        <div className="overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative h-[300px] md:h-[500px]">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promotions.map((promo, idx) => (
                <div key={promo.id} className="min-w-full relative">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white md:py-20 left-4 md:left-10">
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
                      <span className="inline-flex items-center gap-1 bg-green-500 px-2 md:px-3 py-2 rounded-full text-xs md:text-sm">
                        <Tag className="w-3 h-3" />
                        {promo.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-white text-black px-2 md:px-3 py-2 rounded-full text-xs md:text-sm">
                        <Clock className="w-3 h-3" />
                        Valid until {promo.validUntil}
                      </span>
                    </div>
                    <h3 className=" font-bold mb-2 md:mb-3">{promo.title}</h3>
                    <p className="text-base  mb-4 md:mb-6 max-w-2xl">
                      {promo.description}
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-fit px-6 md:px-8 py-4 md:py-6 rounded-lg text-sm ">
                      Show Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md p-1.5 md:p-2 rounded-full transition-all duration-300 z-10 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-7 md:h-7 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md p-1.5 md:p-2 rounded-full transition-all duration-300 z-10 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-7 md:h-7 text-white" />
        </button>
      </div>
      <div className="  mb-6 md:mb-8 w-fit mx-auto flex items-center gap-2 px-4 py-2 rounded-full">
        {promotions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {promotions.map((promo, idx) => (
          <button
            key={promo.id}
            onClick={() => goToSlide(idx)}
            className={`bg-white rounded-lg md:rounded-xl shadow-xs overflow-hidden hover:shadow-lg transition-all text-left ${
              idx === currentSlide ? "shadow-md" : ""
            }`}
          >
            <div className="relative h-32 md:h-40">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 md:p-4">
              <h4 className="font-semibold text-xs md:text-sm mb-1 line-clamp-1">
                {promo.title}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-600 mb-2 border inline py-1 px-2 rounded-md">
                {promo.badge}
              </p>
              <div className="flex items-center justify-between gap-1 mt-1 ">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-xs md:text-sm text-yellow-400"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-[9px] md:text-xs text-gray-500">
                  (4.61 89 reviews)
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPromotions;
