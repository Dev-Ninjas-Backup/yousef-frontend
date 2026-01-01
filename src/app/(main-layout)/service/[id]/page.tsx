import { Inter } from "next/font/google";
import GarageHero from "./_components/hero-section/GarageHero";
import ServicesOffered from "./_components/services-offered/ServicesOffered";
import GarageOverview from "./_components/garage-overview/GarageOverview";
import OperatingHours from "./_components/operating-hours/OperatingHours";
import LocationMap from "./_components/location-map/LocationMap";

const inter = Inter({ subsets: ["latin"] });

// Mock data - Replace with actual data fetching
const garageData = {
  name: "Al Majid Auto Service",
  rating: 4.8,
  reviews: 127,
  distance: "0.3 km",
  services: ["AC", "Engine", "Brakes", "Towing"],
  operatingHours: [
    {
      day: "Sat - Thu: 8:00 AM - 8:00 PM",
      hours: "8:00 AM - 8:00 PM",
      status: "Open" as const,
    },
    { day: "Friday", hours: "Closed", status: "Closed" as const },
  ],
  description: [
    "Al Noor Auto Garage has grown into one of Dubai's most trusted multi-brand car service centres. With a team of certified technicians and state-of-the-art diagnostic tools, we specialize in everything from routine maintenance and oil changes to complex engine repairs and electrical diagnostics.",
    "We take pride in using only spare parts and advanced repair technology to ensure every vehicle receives dealership-level care at affordable rates. Our facility is equipped to handle all major car brands, ensuring precise attention to detail and customer satisfaction at every step.",
    "Whether it's a quick check-up, a complete overhaul, or emergency repair work, our goal is to provide transparent, reliable, and timely automotive solutions that keep your car performing at its best because your safety and trust are our top priorities.",
  ],
  address: "Al Qusais Industrial Area 2, Dubai, UAE",
  position: { lat: 25.2854, lng: 55.3781 },
};

export default function GarageDetailsPage() {
  return (
    <main className={inter.className}>
      <GarageHero
        name={garageData.name}
        rating={garageData.rating}
        reviews={garageData.reviews}
        distance={garageData.distance}
        services={garageData.services}
        operatingHours={garageData.operatingHours}
      />
      <ServicesOffered />
      <GarageOverview description={garageData.description} />
      <OperatingHours hours={garageData.operatingHours} />
      <LocationMap
        address={garageData.address}
        position={garageData.position}
      />
    </main>
  );
}
