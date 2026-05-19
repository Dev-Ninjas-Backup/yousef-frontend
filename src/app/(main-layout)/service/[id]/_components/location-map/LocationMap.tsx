"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
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

  const handleSeeLocation = () => {
    if (position?.lat && position?.lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            const { latitude, longitude } = currentPosition.coords;
            const googleMapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          },
          (error) => {
            const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          }
        );
      } else {
        const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
        window.open(googleMapsUrl, '_blank');
      }
    }
  };

  return (
    <motion.div
      id="location-map"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#2563EB]" />
          {trans.locationMap}
        </h3>

        {/* Address text */}
        <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
          {address}
        </p>

        {/* Map iframe */}
        <div className="overflow-hidden rounded-xl border border-slate-100 h-[220px] relative mb-4">
          {position?.lat && position?.lng ? (
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${position.lat},${position.lng}&zoom=15`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 text-slate-400">
              <MapPin className="w-8 h-8 animate-bounce" />
              <p className="font-semibold text-xs">Map not available</p>
            </div>
          )}
        </div>

        {/* Navigation Button */}
        <Button 
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl h-11 text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          onClick={handleSeeLocation}
        >
          <Navigation className="w-4 h-4" />
          {trans.seeLocation}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
    </motion.div>
  );
}
