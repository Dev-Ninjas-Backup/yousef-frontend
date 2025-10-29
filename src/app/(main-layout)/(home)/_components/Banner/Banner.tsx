import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import applestore from "@/assets/home/banner/apple_store.svg";
import playstore from "@/assets/home/banner/playstore.svg";

const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[900px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/path-to-poster-image.jpg"
        >
          <source src="./banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container mx-auto z-10 flex items-center h-full px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Next-Generation
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-500">Automotive</span>
          </h3>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Platform
          </h3>

          <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed">
            Transform your car care experience with{" "}
            <span className="text-white font-semibold">SayaraHub</span>. Access
            trusted garages, mobile mechanics, emergency services, and spare
            parts marketplace, all in one powerful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <Button
              asChild
              className="bg-white hover:bg-gray-100 text-black rounded-lg py-3 px-4 sm:py-4 sm:px-5 w-full sm:w-[160px] md:w-[200px] h-16 sm:h-18 md:h-20"
            >
              <Link href="#" className="flex items-center gap-3">
                <Image
                  src={applestore}
                  alt="Apple Store"
                  className="w-10 h-10 sm:w-6 sm:h-6"
                />
                <div className="text-left">
                  <div className="text-base">Download on the</div>
                  <div className="text-2xl font-semibold">App Store</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              className="bg-white hover:bg-gray-100 text-black rounded-lg py-3 px-4 sm:py-4 sm:px-5 w-full sm:w-[160px] md:w-[200px] h-16 sm:h-18 md:h-20"
            >
              <Link href="#" className="flex items-center gap-3">
                <Image
                  src={playstore}
                  alt="Play Store"
                  className="w-10 h-10 sm:w-6 sm:h-6"
                />
                <div className="text-left">
                  <div className="text-base">Download on the</div>
                  <div className="text-2xl font-semibold">Play Store</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
