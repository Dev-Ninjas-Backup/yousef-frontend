"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "./hero-section/HeroSection";
import GarageList from "./garage-list/GarageList";

export default function ServicePageContent() {
  const searchParams = useSearchParams();
  const [searchState, setSearchState] = useState({
    emirate: "",
    serviceName: ""
  });

  useEffect(() => {
    const emirate = searchParams.get('emirate') || "";
    const serviceName = searchParams.get('serviceName') || "";
    
    setSearchState({ emirate, serviceName });
  }, [searchParams]);

  const handleSearch = (emirate: string, serviceName: string) => {
    setSearchState({ emirate, serviceName });
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} initialValues={searchState} />
      <GarageList searchParams={searchState} />
    </>
  );
}