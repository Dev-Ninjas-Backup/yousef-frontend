import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutBg from "@/assets/about/Banner/about_banner.jpg";
import Image from "next/image";
export default function AboutHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden md:mb-12">
      <div className="absolute inset-0">
        <Image
          src={AboutBg}
          alt="Garage background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/60 rounded-lg" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center gap-2 mb-6 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm font-medium">
            Established 2025
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>

        <h1 className="mb-4 text-4xl md:text-6xl text-white leading-tight">
          Redefining Automotive
          <br />
          Excellence
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-6 font-light">
          Driving Trust and Innovation in Every Mile
        </p>

        <p className="max-w-3xl text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
          Established in 2025, our platform was created to transform the car
          service experience across the UAE, connecting vehicle owners with
          verified garages, towing services, and Parts listed here are provided
          by third-party sellers. We do not supply or take responsibility for
          their quality or authenticity.
        </p>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          Join Our Journey
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
