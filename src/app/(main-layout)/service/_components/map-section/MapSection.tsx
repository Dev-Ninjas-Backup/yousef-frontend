"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
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
  return (
    <div className="h-full w-full">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {garages.map((garage) => (
            <Marker
              key={garage.id}
              position={garage.position}
              title={garage.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
