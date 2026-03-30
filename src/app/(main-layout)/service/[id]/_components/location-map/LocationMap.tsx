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

  const handleSeeLocation = () => {
    if (position?.lat && position?.lng) {
      // Open Google Maps with directions
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            const { latitude, longitude } = currentPosition.coords;
            const googleMapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          },
          (error) => {
            // If location access denied, open Google Maps without current location
            const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          }
        );
      } else {
        // If geolocation not supported, open Google Maps without current location
        const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
        window.open(googleMapsUrl, '_blank');
      }
    }
  };

  return (
    <section id="location-map" className="bg-white py-16">
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
              onClick={handleSeeLocation}
            >
              {trans.seeLocation}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[600px]">
          {position?.lat && position?.lng ? (
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${position.lat},${position.lng}&zoom=15`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map location not available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
