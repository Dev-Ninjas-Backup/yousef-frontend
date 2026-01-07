"use client";

import { Suspense } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./_components/hero-section/HeroSection";
import GarageList from "./_components/garage-list/GarageList";
import ServicePageContent from "./_components/ServicePageContent";

const inter = Inter({ subsets: ["latin"] });

export default function ServicePage() {
  return (
    <main className={`min-h-screen ${inter.className} md:mb-16`}>
      <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
        <ServicePageContent />
      </Suspense>
    </main>
  );
}
