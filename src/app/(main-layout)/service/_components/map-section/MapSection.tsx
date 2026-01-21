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

import { GoogleMap, Marker } from "@react-google-maps/api";

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
    </div>
  );
}
