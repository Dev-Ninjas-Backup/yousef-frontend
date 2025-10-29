"use client";

import { Button } from "@/components/ui/button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { ArrowRight } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface LocationMapProps {
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function LocationMap({ address, position }: LocationMapProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Location & Map</h2>
            <p className="text-gray-600">{address}</p>
          </div>
          <Button variant="link" className="text-blue-600">
            See location
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={position}
              zoom={15}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              <Marker position={position} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
}
