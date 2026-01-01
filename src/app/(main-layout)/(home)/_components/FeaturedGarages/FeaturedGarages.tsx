"use client";
import React from "react";
import GarageCard from "./_components/GarageCard/GarageCard";
import dubaiCar from "@/assets/home/FeaturedGarages/featured-garage-dubai.png"
import capitalCar from "@/assets/home/FeaturedGarages/featured-garage-capital.jpg"
import sharjhaCar from "@/assets/home/FeaturedGarages/featured-garage-sharjha.png"

const garages = [
  {
    name: "Dubai Auto Center",
    location: "Al Quoz Industrial Area, Dubai",
    rating: 4.8,
    image: dubaiCar,
  },
  {
    name: "Capital Car Care",
    location: "Mussafah, Abu Dhabi",
    rating: 4.7,
    image: capitalCar,
  },
  {
    name: "Sharjah Motors",
    location: "Industrial Area, Sharjah",
    rating: 4.9,
    image: sharjhaCar,
  },
];

const FeaturedGarages: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl  font-bold text-center text-gray-900 mb-8 md:mb-12">
          Featured Garages Near You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {garages.map((garage) => (
            <GarageCard
              key={garage.name}
              name={garage.name}
              location={garage.location}
              rating={garage.rating}
              image={garage.image.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGarages;
