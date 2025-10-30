import Image from "next/image";
import React from "react";
import howitworks from "@/assets/download-app/howItworks/how-it-works.svg";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-4 md:mt-6 px-4">
            Sayarahub is a smart automotive platform designed for car owners and
            service providers across the UAE. It focuses on user convenience,
            trusted connections, and high-quality vehicle care — all in one place.
          </p>
        </div>
        
        <div className="mt-8 md:mt-12 lg:mt-16">
          <Image 
            src={howitworks} 
            alt="How It Works" 
            className="w-full h-auto max-w-5xl mx-auto" 
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;