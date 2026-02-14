// interface MapSectionProps {
//   garages?: Array<{
//     id: string;
//     name: string;
//     position: { lat: number; lng: number };
//   }>;
// }

// export default function MapSection({ garages = [] }: MapSectionProps) {
//   // Using first garage location or default Dubai location
//   const lat = garages[0]?.position.lat || 25.2048;
//   const lng = garages[0]?.position.lng || 55.2708;

//   return (
//     <div className="h-full w-full">
//       <iframe
//         width="100%"
//         height="100%"
//         frameBorder="0"
//         src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14440.!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae`}
//         allowFullScreen
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"
//         className="rounded-lg"
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { serviceTranslations } from "@/translations/service";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 25.2048,
  lng: 55.2708,
};

interface MapSectionProps {
  garages?: Array<{
    id: string;
    name: string;
    position: { lat: number; lng: number };
  }>;
}

export default function MapSection({ garages = [] }: MapSectionProps) {
  const { t } = useLanguage();
  const trans = t(serviceTranslations);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const enablePreciseLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(trans.map.locationError);
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setUserLocation(newLocation);
        setMapCenter(newLocation);
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError(trans.map.locationError);
        setIsLoadingLocation(false);
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true, // Enable precise location
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={userLocation ? 15 : 12}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {/* Garage markers */}
        {garages.map((garage) => (
          <Marker
            key={garage.id}
            position={garage.position}
            title={garage.name}
          />
        ))}
        
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            title={trans.map.yourLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>

      {/* Enable Precise Location Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={enablePreciseLocation}
          disabled={isLoadingLocation}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
        >
          {isLoadingLocation ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{trans.map.gettingLocation}</span>
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{userLocation ? trans.map.updateLocation : trans.map.enableLocation}</span>
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-md max-w-md">
          <p className="text-sm">{locationError}</p>
        </div>
      )}
    </div>
  );
}
