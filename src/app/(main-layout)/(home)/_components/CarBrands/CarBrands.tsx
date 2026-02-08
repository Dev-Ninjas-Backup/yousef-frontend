"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Subaru from "@/assets/home/CarBrands/Subaru.svg";
import Nissan from "@/assets/home/CarBrands/Nissan.svg";
import Chery from "@/assets/home/CarBrands/chery.svg";
import Suzuki from "@/assets/home/CarBrands/suzuki.svg";
import Datsun from "@/assets/home/CarBrands/Datsun.svg";
import Hyundai from "@/assets/home/CarBrands/Hyundai.svg";
import Honda from "@/assets/home/CarBrands/Honda.svg";
import BMW from "@/assets/home/CarBrands/BMW.svg";
import Mazda from "@/assets/home/CarBrands/Mazda.svg";
import Toyota from "@/assets/home/CarBrands/Toyota.svg";
import Daihatsu from "@/assets/home/CarBrands/Daihatsu.svg";
import Audi from "@/assets/home/CarBrands/Audi.svg";
import MercedesBenz from "@/assets/home/CarBrands/mercedes-benz.svg";
import Mitsubishi from "@/assets/home/CarBrands/Mitsubishi.svg";
import AlfaRomeo from "@/assets/home/CarBrands/alfaromeo.svg";
import Bentley from "@/assets/home/CarBrands/bentley.svg";
import BYD from "@/assets/home/CarBrands/byd-auto.svg";
import Changan from "@/assets/home/CarBrands/changan-automobile.svg";
import Chevrolet from "@/assets/home/CarBrands/chevrolet.svg";
import Maserati from "@/assets/home/CarBrands/della-maserati.svg";
import Fiat from "@/assets/home/CarBrands/fiat.svg";
import Ford from "@/assets/home/CarBrands/ford.svg";
import GAC from "@/assets/home/CarBrands/gac.svg";
import Geely from "@/assets/home/CarBrands/geely-logo.svg";
import GWM from "@/assets/home/CarBrands/gwm.svg";
import Jaguar from "@/assets/home/CarBrands/jaguar-cars.svg";
import Jeep from "@/assets/home/CarBrands/jeep.svg";
import Kia from "@/assets/home/CarBrands/kia.svg";
import LandRover from "@/assets/home/CarBrands/land-roverin.svg";
import Lexus from "@/assets/home/CarBrands/lexus.svg";
import MG from "@/assets/home/CarBrands/mg.svg";
import Mini from "@/assets/home/CarBrands/mini-logo.svg";
import Porsche from "@/assets/home/CarBrands/porsche.svg";
import Skoda from "@/assets/home/CarBrands/skoda-auto.svg";
import Volvo from "@/assets/home/CarBrands/volvo.svg";

const brands = [
  { name: "Toyota", logo: Toyota },
  { name: "Honda", logo: Honda },
  { name: "Nissan", logo: Nissan },
  { name: "BMW", logo: BMW },
  { name: "Mercedes-Benz", logo: MercedesBenz },
  { name: "Audi", logo: Audi },
  { name: "Hyundai", logo: Hyundai },
  { name: "Mazda", logo: Mazda },
  { name: "Subaru", logo: Subaru },
  { name: "Suzuki", logo: Suzuki },
  { name: "Mitsubishi", logo: Mitsubishi },
  { name: "Lexus", logo: Lexus },
  { name: "Kia", logo: Kia },
  { name: "Ford", logo: Ford },
  { name: "Chevrolet", logo: Chevrolet },
  { name: "Jeep", logo: Jeep },
  { name: "Porsche", logo: Porsche },
  { name: "Jaguar", logo: Jaguar },
  { name: "Land Rover", logo: LandRover },
  { name: "Bentley", logo: Bentley },
  { name: "Maserati", logo: Maserati },
  { name: "Alfa Romeo", logo: AlfaRomeo },
  { name: "Fiat", logo: Fiat },
  { name: "Mini", logo: Mini },
  { name: "Volvo", logo: Volvo },
  { name: "Skoda", logo: Skoda },
  { name: "Daihatsu", logo: Daihatsu },
  { name: "Datsun", logo: Datsun },
  { name: "Chery", logo: Chery },
  { name: "BYD", logo: BYD },
  { name: "Geely", logo: Geely },
  { name: "GWM", logo: GWM },
  { name: "GAC", logo: GAC },
  { name: "Changan", logo: Changan },
  { name: "MG", logo: MG },
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
