"use client";
import React from "react";
import Image from "next/image";
import { Check, CircleArrowOutUpRight } from "lucide-react";
import phoneImage from "@/assets/download-app/DownloadHero/iPhone-13-Pro-Front.svg";

const DownloadHero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden mt-10">
      {/* Soft gradient background effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, #9BB2D4 0%, #B6D1F9 15%, #D8E5FA 35%, #DBE9FE 55%, #E6F0FF 75%, #E8F1FF 90%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Left Content */}
          <div className=" w-full lg:w-auto flex flex-col gap-7">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                WE ARE
              </h1>
              <h2 className="text-4xl md:text-5xl font-semibold">DRIVEN BY</h2>
              <p className="text-gray-700 text-base md:text-lg max-w-md font-semibold">
                Trusted by thousands of car owners and garages across the UAE.
              </p>
            </div>
            <button className="bg-blue-600 max-w-[300px] text-center hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium flex items-center gap-2 justify-center">
              Download the app now <CircleArrowOutUpRight className="h-5 w-5 ml-3" />
            </button>
          </div>

          {/* Center - Phone Image */}
          <div className="relative flex items-center justify-center w-full lg:w-auto shrink-0">
            <div className="absolute top-20 md:top-26 left-1/4 -translate-x-1/2 bg-blue-600 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs md:text-sm z-10 whitespace-nowrap">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-600" />
              </div>
              Search nearby garage
            </div>

            <Image
              src={phoneImage}
              alt="SayaraHub App"
              className="w-80 md:w-100 h-auto object-contain"
            />

            <div className="absolute bottom-40 md:bottom-50 left-1/2 -translate-x-1/5 bg-green-500 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs md:text-sm z-10 whitespace-nowrap">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
              </div>
              Get emergency towing
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-4 w-full lg:w-auto">
            <h3 className="text-5xl md:text-6xl font-semibold">INNOVATION</h3>
            <p className="max-w-xs text-lg md:text-xl font-semibold text-[#39393B]">
              Award-winning automotive tech platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadHero;
