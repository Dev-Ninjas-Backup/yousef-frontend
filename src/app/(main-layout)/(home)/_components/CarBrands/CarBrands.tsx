"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Subaru from "@/assets/home/CarBrands/Subaru.svg";
import Nissan from "@/assets/home/CarBrands/Nissan.svg";
import Chery from "@/assets/home/CarBrands/Chery.svg";
import Suzuki from "@/assets/home/CarBrands/Suzuki.svg";
import Datsun from "@/assets/home/CarBrands/Datsun.svg";
import Hyundai from "@/assets/home/CarBrands/Hyundai.jpg";
import Honda from "@/assets/home/CarBrands/Honda.svg";
import BMW from "@/assets/home/CarBrands/BMW.svg";
import Mazda from "@/assets/home/CarBrands/Mazda.svg";
import Toyota from "@/assets/home/CarBrands/Toyota.png";
import Daihatsu from "@/assets/home/CarBrands/Daihatsu.jpg";
import Audi from "@/assets/home/CarBrands/Audi.svg";
import MercedesBenz from "@/assets/home/CarBrands/mercedes-benz.png";
import Mitsubishi from "@/assets/home/CarBrands/Mitsubishi.svg";
import AlfaRomeo from "@/assets/home/CarBrands/alfaromeo.svg";
import Bentley from "@/assets/home/CarBrands/bentley.svg";
import BYD from "@/assets/home/CarBrands/byd-auto.svg";
import Changan from "@/assets/home/CarBrands/changan-automobile.svg";
import Chevrolet from "@/assets/home/CarBrands/chevrolet.jpg";
import Maserati from "@/assets/home/CarBrands/della-maserati.svg";
import Fiat from "@/assets/home/CarBrands/fiat.svg";
import Ford from "@/assets/home/CarBrands/ford.svg";
import GAC from "@/assets/home/CarBrands/gac.svg";
import Geely from "@/assets/home/CarBrands/geely-logo.png";
import GWM from "@/assets/home/CarBrands/gwm.svg";
import Jaguar from "@/assets/home/CarBrands/jaguar-cars.svg";
import Jeep from "@/assets/home/CarBrands/jeep.svg";
import Kia from "@/assets/home/CarBrands/kia.png";
import LandRover from "@/assets/home/CarBrands/land-roverin.png";
import Lexus from "@/assets/home/CarBrands/lexus.jpg";
import MG from "@/assets/home/CarBrands/mg.png";
import Mini from "@/assets/home/CarBrands/mini-logo.svg";
import Porsche from "@/assets/home/CarBrands/porsche.png";
import Skoda from "@/assets/home/CarBrands/skoda-auto.svg";
import Volvo from "@/assets/home/CarBrands/volvo.png";
import Cadillac from "@/assets/home/CarBrands/cadillac.svg";
import Tesla from "@/assets/home/CarBrands/tesla-9.svg";
import Jetour from "@/assets/home/CarBrands/jetour.jpg";
import Haval from "@/assets/home/CarBrands/haval.png";
import JacMotors from "@/assets/home/CarBrands/jac-motors.svg";
import Baic from "@/assets/home/CarBrands/baic.svg";
import Exeed from "@/assets/home/CarBrands/exeed.jpg";
import Zeekr from "@/assets/home/CarBrands/zeekr.svg";
import RollsRoyce from "@/assets/home/CarBrands/rolls-royce.jpg";
import Lamborghini from "@/assets/home/CarBrands/lamborghini.svg";
import Ferrari from "@/assets/home/CarBrands/ferrari.png";
import Rox from "@/assets/home/CarBrands/rox.svg";
import Avatar from "@/assets/home/CarBrands/avatr.svg";
import Hongqi from "@/assets/home/CarBrands/Hongqi.svg";
import RangeRover from "@/assets/home/CarBrands/range-rover.png";

const brands = [
  { name: "Toyota", logo: Toyota },
  { name: "Honda", logo: Honda },
  { name: "Nissan", logo: Nissan },
  { name: "BMW", logo: BMW },
  { name: "Mercedes-Benz", logo: MercedesBenz },
  { name: "Subaru", logo: Subaru },
  { name: "Suzuki", logo: Suzuki, scale: 1.3, wide: true },
  { name: "Mitsubishi", logo: Mitsubishi },
  { name: "Lexus", logo: Lexus, wide: true },
  { name: "Kia", logo: Kia, wide: true },
  { name: "Ford", logo: Ford, wide: true },
  { name: "Chevrolet", logo: Chevrolet, wide: true },
  { name: "Jeep", logo: Jeep, wide: true },
  { name: "Porsche", logo: Porsche },
  { name: "Jaguar", logo: Jaguar, wide: true },
  { name: "Land Rover", logo: LandRover, wide: true },
  { name: "Bentley", logo: Bentley, wide: true },
  { name: "Maserati", logo: Maserati },
  { name: "Alfa Romeo", logo: AlfaRomeo },
  { name: "Fiat", logo: Fiat },
  { name: "Mini", logo: Mini },
  { name: "Volvo", logo: Volvo, wide: true },
  { name: "Skoda", logo: Skoda },
  { name: "Daihatsu", logo: Daihatsu, wide: true },
  { name: "Audi", logo: Audi, wide: true },
  { name: "Hyundai", logo: Hyundai, wide: true },
  { name: "Mazda", logo: Mazda, wide: true },
  { name: "Datsun", logo: Datsun, wide: true },
  { name: "Chery", logo: Chery, wide: true },
  { name: "BYD", logo: BYD, wide: true },
  { name: "Geely", logo: Geely, wide: true },
  { name: "GWM", logo: GWM },
  { name: "GAC", logo: GAC },
  { name: "Changan", logo: Changan, scale: 1.3, wide: true },
  { name: "MG", logo: MG },
  { name: "Cadillac", logo: Cadillac },
  { name: "Tesla", logo: Tesla, wide: true },
  { name: "Jetour", logo: Jetour, wide: true },
  { name: "Haval", logo: Haval, wide: true },
  { name: "Jac Motors", logo: JacMotors, wide: true },
  { name: "Baic", logo: Baic },
  { name: "Exeed", logo: Exeed, scale: 1.3, wide: true },
  { name: "Zeekr", logo: Zeekr, scale: 1.3, wide: true },
  { name: "Rolls Royce", logo: RollsRoyce },
  { name: "Lamborghini", logo: Lamborghini },
  { name: "Ferrari", logo: Ferrari },
  { name: "Rox", logo: Rox },
  { name: "Avatar", logo: Avatar },
  { name: "Hongqi", logo: Hongqi },
  { name: "Range Rover", logo: RangeRover, scale: 1.5, wide: true },
];

const CarBrands: React.FC = () => {
  return (
    <section className="w-full py-3 my-12 overflow-hidden">
      <Marquee gradient={false} speed={40}>
        {brands.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className={`relative flex items-center justify-center mx-4 sm:mx-8 h-14 sm:h-20 shrink-0 ${
              'wide' in brand && brand.wide ? "w-36 sm:w-44" : "w-24 sm:w-32"
            }`}
            style={{ transform: 'scale' in brand ? `scale(${brand.scale})` : "none" }}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CarBrands;
