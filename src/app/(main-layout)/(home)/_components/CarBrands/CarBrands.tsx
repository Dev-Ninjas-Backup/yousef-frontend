"use client";
import React from "react";
import Image from "next/image";
import './carBrands.css'
import Subaru from "@/assets/home/carBrands/Subaru.svg";
import Nissan from "@/assets/home/carBrands/Nissan.svg";
import Chery from "@/assets/home/carBrands/Chery.svg";
import Suzuki from "@/assets/home/carBrands/Suzuki.svg";
import Datsun from "@/assets/home/carBrands/Datsun.svg";
import Hyundai from "@/assets/home/carBrands/Hyundai.svg";
import Honda from "@/assets/home/carBrands/Honda.svg";
import BMW from "@/assets/home/carBrands/BMW.svg";
import Mazda from "@/assets/home/carBrands/Mazda.svg";
import Toyota from "@/assets/home/carBrands/Toyota.svg";
import Daihatsu from "@/assets/home/carBrands/Daihatsu.svg";

const brands = [
  { name: "Subaru", logo: Subaru },
  { name: "Nissan", logo: Nissan },
  { name: "Chery", logo: Chery },
  { name: "Suzuki", logo: Suzuki },
  { name: "Datsun", logo: Datsun },
  { name: "Hyundai", logo: Hyundai },
  { name: "Honda", logo: Honda },
  { name: "BMW", logo: BMW },
  { name: "Mazda", logo: Mazda },
  { name: "Toyota", logo: Toyota },
  { name: "Daihatsu", logo: Daihatsu },
];

const CarBrands: React.FC = () => {
  return (
    <section className="w-full py-3 h-[120px] my-12 overflow-hidden">
      <div className="flex items-center h-full animate-scroll">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="shrink-0 mx-8 transition-all duration-300"
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