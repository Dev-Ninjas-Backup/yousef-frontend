"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "./_components/ServiceCard/ServiceCard";
import location from "../../../../../assets/home/icons/location.svg";
import pickup_car from "../../../../../assets/home/icons/pickup_car.svg";
import spare_parts from "../../../../../assets/home/icons/spare_parts.svg";

const services = [
  {
    icon: location,
    title: "Garage Directory & Selection",
    description:
      "Search and filter garages by service type, vehicle model, location, or rating with complete transparency on pricing and reviews.",
  },
  {
    icon: pickup_car,
    title: "Car Pickup & Transport",
    description:
      "Request instant towing or emergency recovery with driver tracking, ETA updates, and preferred drop-off selection.",
  },
  {
    icon: spare_parts,
    title: "Spare Parts Marketplace",
    description:
      "Browse, buy, and sell auto parts from sellers and garages with quality guarantees.",
  },
];

const AutomotiveSolutions: React.FC = () => {
  return (
    <section className="container mx-auto py-10 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-[#333333] mb-3 md:mb-6">
            Complete Automotive Solutions
          </h2>
          <p className="text-base md:text-2xl text-[#333333] max-w-3xl mx-auto">
            Six essential automotive services united in one powerful platform,
            designed to make car care effortless and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-8 md:px-10 py-5 md:py-6 rounded-lg text-base
           font-semibold"
          >
            Find garage
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AutomotiveSolutions;
