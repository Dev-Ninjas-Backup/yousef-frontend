import { Inter } from "next/font/google";
import HeroSection from "./_components/hero-section/HeroSection";
import GarageList from "./_components/garage-list/GarageList";

const inter = Inter({ subsets: ["latin"] });

export default function ServicePage() {
  return (
    <main className={`min-h-screen ${inter.className} mb-16`}>
      <HeroSection />
      <GarageList />
    </main>
  );
}
