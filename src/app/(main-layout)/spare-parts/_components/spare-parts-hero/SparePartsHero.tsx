import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import sparePartsBg from "@/assets/spareparts/banner/spare_parts_banner.jpg";

interface SparePartsHeroProps {
  onSellClick: () => void;
}

export default function SparePartsHero({ onSellClick }: SparePartsHeroProps) {
  return (
    <section className="relative h-[450px] md:h-[720px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={sparePartsBg}
          alt="Garage background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
          Start Buying or Selling Today
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-8">
          Join the UAE's most reliable platform for spare parts trading.
          Transparent, simple, and secure, designed for everyone in the
          automotive ecosystem.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Browse Parts
          </Button>
          <Button
            onClick={onSellClick}
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10"
          >
            Sell Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
