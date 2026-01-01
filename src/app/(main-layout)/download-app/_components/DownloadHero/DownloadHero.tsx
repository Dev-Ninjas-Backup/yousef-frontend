"use client";
import React from "react";
import Image from "next/image";
import { Check, CircleArrowOutUpRight } from "lucide-react";
import phoneImage from "@/assets/download-app/DownloadHero/download-hero.png";

const DownloadHero: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-12 md:py-10 lg:py-15 overflow-hidden mt-6 sm:mt-8 md:mt-10">
      {/* Soft gradient background effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, #9BB2D4 0%, #B6D1F9 15%, #D8E5FA 35%, #DBE9FE 55%, #E6F0FF 75%, #E8F1FF 90%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between ">
          
          {/* Left Content */}
          <div className="w-full lg:w-auto lg:flex-1 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                WE ARE
         
              <span className="text-3xl block sm:text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight">
                DRIVEN BY
              </span>
         

              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg font-semibold max-w-md mx-auto lg:mx-0">
                Trusted by thousands of car owners and garages across the UAE.
              </p>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg font-medium flex items-center gap-3 justify-center w-full sm:w-auto sm:max-w-[320px] mx-auto lg:mx-0 text-sm sm:text-base">
              Download the app now
              <CircleArrowOutUpRight className="h-5 w-5" />
            </button>
          </div>

          {/* Center - Phone Image */}
          <div className="relative w-full sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] mx-auto lg:mx-0 lg:flex-shrink-0">
            {/* Top Left Badge */}
            <div className="absolute top-[20%] sm:top-[18%] md:top-[20%] -left-2 sm:-left-4 md:-left-6 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs sm:text-sm z-10 max-w-[160px] sm:max-w-none">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
              </div>
              <span className="whitespace-nowrap">Search nearby garage</span>
            </div>

            {/* Phone Image */}
            <div className="relative aspect-[9/16]">
              <Image
                src={phoneImage}
                alt="SayaraHub App"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Center Badge */}
            <div className="absolute bottom-[40%] sm:bottom-[28%] md:bottom-[40%] left-1/2 -translate-x-1/4 translate-y-1/2 bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs sm:text-sm z-10 max-w-[180px] sm:max-w-none">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
              </div>
              <span className="whitespace-nowrap">Get emergency towing</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-auto lg:flex-1 text-center lg:text-left space-y-3 sm:space-y-4">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              INNOVATION
            </h3>
            <p className="max-w-xs mx-auto lg:mx-0 text-base sm:text-lg md:text-xl font-semibold text-[#39393B]">
              Award-winning automotive tech platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadHero;