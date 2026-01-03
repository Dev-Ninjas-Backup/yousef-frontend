"use client";
import Image, { StaticImageData } from "next/image";
import garageOverviewBg from "@/assets/service/garage/garage_overview.png";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface GarageOverviewProps {
  description: string[];
  image?: string | StaticImageData;
}

export default function GarageOverview({
  description,
  image = garageOverviewBg,
}: GarageOverviewProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <h2 className="mb-8 text-2xl md:text-4xl font-bold text-gray-900">
              {trans.garageOverview}
            </h2>
            <div className="space-y-6">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-600 leading-relaxed text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-2xl">
            <Image src={image} alt="Garage" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
