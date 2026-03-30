"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import sparePartsBg from "@/assets/spareparts/banner/spare_parts_banner.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { sparePartsPageTranslations } from "@/translations/spareParts";

interface SparePartsHeroProps {
  onSellClick: () => void;
}

export default function SparePartsHero({ onSellClick }: SparePartsHeroProps) {
  const { t } = useLanguage();
  const trans = t(sparePartsPageTranslations);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleBrowseParts = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSellNow = () => {
    if (user?.role === 'GARAGE_OWNER') {
      router.push('/garage-admin/my-products/add-product');
    } else {
      router.push('/user/my-products/add-product');
    }
  };

  return (
    <section className="relative h-[450px] md:h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={sparePartsBg}
          alt="Garage background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/80 rounded-lg" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
          {trans.hero.title}
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-8">
          {trans.hero.description}
        </p>
        <div className="flex gap-4">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleBrowseParts}
          >
            {trans.hero.browseParts}
          </Button>
          <Button
            onClick={handleSellNow}
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10"
          >
            {trans.hero.sellNow}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
