import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import spareParts from "../../../../../assets/home/SpareParts/spare_parts.jpg";

const SpareParts: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden">
        <Image
          src={spareParts.src}
          alt="Spare Parts Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold text-white mb-3 md:mb-4 leading-tight">
            Buy or Sell Genuine Spare Parts
            <br className="hidden sm:block" />
            All in One Place
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mb-4 md:mb-6 leading-relaxed">
            Find authentic spare parts for your car from verified garages and
            sellers.
            <br className="hidden sm:block" />
            Have unused parts? List them on the platform and connect with real
            buyers
            <br className="hidden sm:block" />
            instantly. From filters and brakes to accessories, everything is
            just a click away!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
            <Button className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-lg w-full sm:w-auto whitespace-nowrap">
              Buy Parts
            </Button>
            <Button className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-lg w-full sm:w-auto whitespace-nowrap">
              Sell Your Parts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpareParts;