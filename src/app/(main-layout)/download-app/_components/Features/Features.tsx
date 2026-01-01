"use client";
import React from "react";
import Image from "next/image";
import feature_img from "@/assets/download-app/features/feature_img.png";

const Features: React.FC = () => {
  return (
    <section className="py-10 md:py-15 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            "Whatever Your <span className="text-blue-600">Car</span> Needs,
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            We're <span className="text-blue-600">Here</span> to Make It Happen."
          </h3>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-6">
            Sayarahub is a smart automotive platform designed for car owners and service providers across the UAE. It focuses on user convenience, trusted connections, and high-quality vehicle care — all in one place.
          </p>

          {/* App Store Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="h-12 md:h-14">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-full"
              />
            </button>
            <button className="h-12 md:h-14">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on the App Store" 
                className="h-full"
              />
            </button>
          </div>
        </div>

        {/* Phone Mockups */}
        <div className="mt-12">
          <Image
            src={feature_img}
            alt="Features"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;