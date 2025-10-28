"use client";
import React from "react";
import Image from "next/image";
import './carBrands.css'

const brands = [
  { name: "Subaru", logo: "https://cdn.worldvectorlogo.com/logos/subaru-6.svg" },
  { name: "Nissan", logo: "https://cdn.worldvectorlogo.com/logos/nissan-6.svg" },
  { name: "Chery", logo: "https://cdn.worldvectorlogo.com/logos/chery.svg" },
  { name: "Suzuki", logo: "https://cdn.worldvectorlogo.com/logos/suzuki-logo.svg" },
  { name: "Datsun", logo: "https://cdn.worldvectorlogo.com/logos/datsun.svg" },
  { name: "Hyundai", logo: "https://cdn.worldvectorlogo.com/logos/hyundai-motor-company-logo.svg" },
  { name: "Honda", logo: "https://cdn.worldvectorlogo.com/logos/honda-2.svg" },
  { name: "BMW", logo: "https://cdn.worldvectorlogo.com/logos/bmw.svg" },
  { name: "Mazda", logo: "https://cdn.worldvectorlogo.com/logos/mazda-logo-1997.svg" },
  { name: "Toyota", logo: "https://cdn.worldvectorlogo.com/logos/toyota-6.svg" },
  { name: "Daihatsu", logo: "https://cdn.worldvectorlogo.com/logos/daihatsu-logo.svg" },
  { name: "Mitsubishi", logo: "https://cdn.worldvectorlogo.com/logos/mitsubishi-motors-logo.svg" },
];

const CarBrands: React.FC = () => {
  return (
    <section className="w-full bg-white py-3 h-[120px] mb-10 overflow-hidden">
      <div className="flex items-center h-full animate-scroll">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={85}
              height={85}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    
    </section>
  );
};

export default CarBrands;