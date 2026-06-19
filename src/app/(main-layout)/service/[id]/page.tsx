"use client";

import { Inter } from "next/font/google";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GarageHero from "./_components/hero-section/GarageHero";
import ServicesOffered from "./_components/services-offered/ServicesOffered";
import GarageOverview from "./_components/garage-overview/GarageOverview";
import OperatingHours from "./_components/operating-hours/OperatingHours";
import LocationMap from "./_components/location-map/LocationMap";
import GarageReviews from "./_components/reviews/GarageReviews";
import { useGetGarageByIdQuery } from "@/store/api/garageApi";
import { Card } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

interface GarageDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CAR_BRAND_COLORS: Record<string, string> = {
  toyota: "bg-red-50 border-red-200 text-red-700",
  honda: "bg-blue-50 border-blue-200 text-blue-700",
  ford: "bg-indigo-50 border-indigo-200 text-indigo-700",
  bmw: "bg-slate-50 border-slate-300 text-slate-800",
  mercedes: "bg-gray-50 border-gray-300 text-gray-800",
  audi: "bg-zinc-50 border-zinc-300 text-zinc-800",
  nissan: "bg-orange-50 border-orange-200 text-orange-700",
  hyundai: "bg-sky-50 border-sky-200 text-sky-700",
  kia: "bg-rose-50 border-rose-200 text-rose-700",
  chevrolet: "bg-yellow-50 border-yellow-200 text-yellow-700",
  lexus: "bg-emerald-50 border-emerald-200 text-emerald-700",
  volkswagen: "bg-cyan-50 border-cyan-200 text-cyan-700",
};

function getBrandColor(brand: string) {
  const key = brand.toLowerCase();
  for (const [k, v] of Object.entries(CAR_BRAND_COLORS)) {
    if (key.includes(k)) return v;
  }
  return "bg-purple-50 border-purple-200 text-purple-700";
}

export default function GarageDetailsPage({ params }: GarageDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();

  // Skip API call if ID is undefined
  const { data: garageResponse, isLoading, error } = useGetGarageByIdQuery(id, {
    skip: !id || id === 'undefined'
  });

  // Show error if no valid ID
  if (!id || id === 'undefined') {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Garage ID</h1>
          <p className="text-gray-600">Please provide a valid garage ID to view details.</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </main>
    );
  }

  if (error || !garageResponse?.data) {
    return (
      <main className={`${inter.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Garage Not Found</h1>
          <p className="text-gray-600">The garage you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const garage = garageResponse.data;

  // Transform API data to component format
  const garageData = {
    name: garage.name,
    // Only show real rating — 0 means no reviews
    rating: garage.averageRating ?? 0,
    reviews: garage.totalReviews ?? 0,
    distance: "2.5 km away",
    services: garage.services || [],
    operatingHours: [
      {
        day: "Weekdays",
        hours: garage.weekdaysHours || "8:00 AM - 8:00 PM",
        status: "Open" as const,
      },
      {
        day: "Weekends",
        hours: garage.weekendsHours || "9:00 AM - 6:00 PM",
        status: "Open" as const,
      },
    ],
    description: garage.description
      ? [garage.description]
      : [
          "Professional automotive services with certified technicians and state-of-the-art diagnostic tools.",
          "We specialize in everything from routine maintenance and oil changes to complex engine repairs and electrical diagnostics.",
          "Our goal is to provide transparent, reliable, and timely automotive solutions that keep your car performing at its best.",
        ],
    address:
      garage.formattedAddress ||
      `${garage.address}, ${garage.city}, ${garage.emirate}`,
    position: { lat: garage.garageLat, lng: garage.garageLng },
    phone: garage.garagePhone,
    email: garage.email,
    certifications: garage.certifications || [],
    brandExpertise: garage.brandExpertise || [],
    coverPhoto: garage.coverPhoto,
    profileImage: garage.profileImage,
    owner: garage.user,
  };

  return (
    <main className={`${inter.className} bg-[#F8FAFC] min-h-screen pb-16`}>
      <GarageHero
        name={garageData.name}
        rating={garageData.rating}
        reviews={garageData.reviews}
        distance={garageData.distance}
        services={garageData.services}
        operatingHours={garageData.operatingHours}
        coverPhoto={garageData.coverPhoto}
        ownerId={(garage as any).userId}
        phone={garage.garagePhone}
      />

      {/* 2-Column Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl mt-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <GarageOverview
              description={garageData.description}
              image={garageData.profileImage}
            />
            <ServicesOffered services={garageData.services} />

            {/* Brand Expertise Section */}
            {garageData.brandExpertise.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
                      Brand Expertise
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Verified car brands this garage specialises in.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {garageData.brandExpertise.map((brand, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-bold shadow-sm ${getBrandColor(brand)}`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {brand}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Reviews Section */}
            <GarageReviews garageId={id} garageName={garageData.name} />
          </div>

          {/* Sidebar Right Column */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <OperatingHours hours={garageData.operatingHours} />
            <LocationMap
              address={garageData.address}
              position={garageData.position}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
