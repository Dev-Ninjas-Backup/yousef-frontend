"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface LocationMapProps {
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function LocationMap({ address, position }: LocationMapProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              {trans.locationMap}
            </h2>
            <p className="text-lg text-gray-600">{address}</p>
          </div>
          <div className="flex items-end-safe">
            <Button
              variant="link"
              className="text-red-600 hover:text-red-700 text-base font-medium self-start p-0"
            >
              {trans.seeLocation}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[600px]">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14440.!2d${position.lng}!3d${position.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
