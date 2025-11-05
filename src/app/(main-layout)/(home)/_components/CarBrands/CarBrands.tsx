"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
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
import Audi from "@/assets/home/CarBrands//Audi.svg";
import MercedesBenz from "@/assets/home/CarBrands/Mercedes-Benz.svg";
import Mitsubishi from "@/assets/home/CarBrands/Mitsubishi.svg";

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
  { name: "Audi", logo: Audi },
  { name: "MercedesBenz", logo: MercedesBenz },
  { name: "Daihatsu", logo: Daihatsu },
  { name: "Mitsubishi", logo: Mitsubishi },
];

const CarBrands: React.FC = () => {
  return (
    <section className="w-full py-3 h-[120px] my-12 overflow-hidden">
      <div className="flex items-center h-full ">
        <Marquee>
          {[...brands, ...brands].map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="shrink-0 mx-8 ">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={85}
                height={85}
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CarBrands;
