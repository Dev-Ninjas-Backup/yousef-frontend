"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tag, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { featuredPromotionsTranslations } from "@/translations/featuredPromotions";
import { useGetExclusiveOffersQuery } from "@/store/api/exclusiveOfferApi";
import { useRouter } from "next/navigation";
import Toyotaimg from "@/assets/home/FeaturedPromotions/ImageWithFallback.png";
import { AnimateOnScroll, StaggerOnScroll, fadeUp, scaleIn } from "@/lib/animations";

const FeaturedPromotions: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(featuredPromotionsTranslations);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [cardScrollPosition, setCardScrollPosition] = useState(0);

  const {
    data: offers = [],
    isLoading,
    error,
  } = useGetExclusiveOffersQuery();

  // Transform API data to match component structure
  const promotions =
    offers?.map((offer) => ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      image: offer.bannerImage || Toyotaimg,
      badge: offer.brand ? `${offer.brand} Discount` : "Exclusive Offer",
      validUntil: offer.validUnit,
      price: offer.price,
      originalPrice: offer.originalPrice,
      brand: offer.brand,
    })) || [];

  const scrollCards = (direction: "left" | "right") => {
    const cardWidth = 200;
    const scrollAmount = cardWidth * 2;

    if (direction === "left") {
      setCardScrollPosition((prev) => Math.max(0, prev - scrollAmount));
    } else {
      const maxScroll = (promotions.length - 3) * cardWidth;
      setCardScrollPosition((prev) => Math.min(maxScroll, prev + scrollAmount));
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  };

  const handleShowDetails = (productId: string) => {
    router.push(`/exclusive-offer/${productId}`);
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
    if (promotions.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, promotions.length]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  if (error || !promotions.length) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center">
          <p className="text-gray-500">
            No exclusive offers or promotions available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <AnimateOnScroll variants={fadeUp}>
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0D6EFD] text-white px-4 py-2 rounded-md mb-4 text-sm md:text-base">
            <Tag className="w-4 h-4" />
            <span className="font-semibold">Exclusive Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-[#101828]">Exclusive Deals & Services</h2>
          <p className="text-base text-gray-600">Discover premium discounts and limited-time deals from famous brands and local workshops.</p>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variants={scaleIn} delay={0.2}>
        <div className="relative mb-8 md:mb-6">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <div className="relative h-[300px] md:h-[500px]">
              <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {promotions.map((promo, idx) => (
                  <div key={promo.id} className="min-w-full relative">
                    <img
                      src={typeof promo.image === "string" ? promo.image : (promo.image as any).src}
                      alt={promo.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55" />
                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white md:py-20 left-4 md:left-10">
                      <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="inline-flex items-center gap-1 bg-green-500 px-2 md:px-3 py-2 rounded-full text-xs md:text-sm">
                          <Tag className="w-3 h-3" />
                          {promo.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white text-black px-2 md:px-3 py-2 rounded-full text-xs md:text-sm">
                          <Clock className="w-3 h-3" />
                          {promo.validUntil}
                        </span>
                      </div>
                      <h3 className="font-bold mb-2 md:mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl">{promo.title}</h3>
                      <p className="text-base mb-2">
                        {promo.originalPrice && (
                          <span className="line-through text-gray-300 text-sm mr-2">
                            {promo.originalPrice} AED
                          </span>
                        )}
                        <span className="text-yellow-400 font-bold">
                          {promo.price ? `${promo.price} AED` : "Free"}
                        </span>
                        {promo.brand && (
                          <span className="ml-2 text-sm">by {promo.brand}</span>
                        )}
                      </p>
                      <p className="text-sm mb-4 md:mb-6 max-w-2xl line-clamp-2">
                        {promo.description}
                      </p>
                      <Button
                        onClick={() => handleShowDetails(promo.id)}
                        className="bg-blue-600 hover:bg-blue-700 w-fit px-6 md:px-8 py-4 md:py-6 rounded-lg text-sm "
                      >
                        {trans.showDetails}
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
        <div className="mb-6 md:mb-8 w-fit mx-auto flex items-center gap-2 px-4 py-2 rounded-full">
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
      </AnimateOnScroll>

      {/* Horizontal Scrollable Cards */}
      <AnimateOnScroll variants={fadeUp} delay={0.4}>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-3 md:gap-4 transition-transform duration-300 ease-in-out my-4"
              style={{ transform: `translateX(-${cardScrollPosition}px)` }}
            >
              {promotions.map((promo, idx) => (
                <button
                  key={promo.id}
                  onClick={() => handleShowDetails(promo.id)}
                  className={`relative bg-white rounded-lg md:rounded-xl shadow-xs overflow-hidden hover:shadow-lg transition-all text-left flex-shrink-0 w-48 md:w-52 border ${
                    idx === currentSlide ? "shadow-md" : ""
                  }`}
                >
                  <div className="relative h-32 md:h-40">
                    <img
                      src={typeof promo.image === "string" ? promo.image : (promo.image as any).src}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 md:p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-semibold text-xs md:text-sm mb-1.5 line-clamp-1 text-gray-800">
                        {promo.title}
                      </h4>
                      <span className="text-[10px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {promo.badge}
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
                      {promo.originalPrice && (
                        <span className="line-through text-gray-400 text-[10px] md:text-xs">
                          {promo.originalPrice} AED
                        </span>
                      )}
                      <span className="font-bold text-green-600 text-xs md:text-sm">
                        {promo.price ? `${promo.price} AED` : "Free"}
                      </span>
                    </div>
                  </div>
                  {/* Selected Highlight Overlay */}
                  {idx === currentSlide && (
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg md:rounded-xl pointer-events-none z-10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll Buttons */}
          {promotions.length > 3 && (
            <>
              <button
                onClick={() => scrollCards("left")}
                disabled={cardScrollPosition === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl p-2 rounded-full transition-all duration-300 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scroll cards left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scrollCards("right")}
                disabled={cardScrollPosition >= (promotions.length - 3) * 200}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl p-2 rounded-full transition-all duration-300 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scroll cards right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default FeaturedPromotions;
