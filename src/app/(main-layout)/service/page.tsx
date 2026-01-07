"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./_components/hero-section/HeroSection";
import GarageList from "./_components/garage-list/GarageList";

const inter = Inter({ subsets: ["latin"] });

export default function ServicePage() {
  const [searchParams, setSearchParams] = useState({
    emirate: "",
    serviceName: ""
  });

  const handleSearch = (emirate: string, serviceName: string) => {
    setSearchParams({ emirate, serviceName });
  };

  return (
    <main className={`min-h-screen ${inter.className} md:mb-16`}>
      <HeroSection onSearch={handleSearch} />
      <GarageList searchParams={searchParams} />
    </main>
  );
}
