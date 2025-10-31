"use client";
import React from "react";
import Image from "next/image";
import './carBrands.css'
import Subaru from "@/assets/home/CarBrands/Subaru.svg";
import Nissan from "@/assets/home/CarBrands/Nissan.svg";
import Chery from "@/assets/home/CarBrands/Chery.svg";
import Suzuki from "@/assets/home/CarBrands/Suzuki.svg";
import Datsun from "@/assets/home/CarBrands/Datsun.svg";
import Hyundai from "@/assets/home/CarBrands/Hyundai.svg";
import Honda from "@/assets/home/CarBrands/Honda.svg";
import BMW from "@/assets/home/CarBrands/BMW.svg";
import Mazda from "@/assets/home/CarBrands/Mazda.svg";
import Toyota from "@/assets/home/CarBrands/Toyota.svg";
import Daihatsu from "@/assets/home/CarBrands/Daihatsu.svg";

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