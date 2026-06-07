"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import garageBg from "@/assets/service/banner/section.png";
import { useLanguage } from "@/context/LanguageContext";
import { serviceTranslations } from "@/translations/service";
import { useGetServiceCategoriesQuery } from "@/store/api/garageApi";

interface HeroSectionProps {
  onSearch: (emirate: string, serviceName: string) => void;
  initialValues?: {
    emirate: string;
    serviceName: string;
  };
}

export default function HeroSection({ onSearch, initialValues }: HeroSectionProps) {
  const { t } = useLanguage();
  const trans = t(serviceTranslations);
  const [emirate, setEmirate] = useState("");
  const [serviceName, setServiceName] = useState("");
  
  const { data: serviceCategories } = useGetServiceCategoriesQuery();

  const CANONICAL_SERVICES = [
    "AC Service",
    "Battery Replacement",
    "Body Work",
    "Brake Repair",
    "Diagnostics",
    "Electrical Repair",
    "Emergency Towing",
    "Engine Repair",
    "Oil Change",
    "Suspension Repair",
    "Tire Service",
    "Towing",
    "Transmission Service",
    "Van Doorstep Repair",
  ];

  const CANONICAL_EMIRATES = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
  ];

  // Use API data but filter to only canonical services to avoid duplicates/typos
  const services = serviceCategories?.serviceCategories
    ? [...new Set(serviceCategories.serviceCategories)].filter((s) =>
        CANONICAL_SERVICES.includes(s)
      )
    : CANONICAL_SERVICES;
  
  useEffect(() => {
    if (initialValues) {
      setEmirate(initialValues.emirate || "");
      setServiceName(initialValues.serviceName || "");
    }
  }, [initialValues]);
  
  const handleSearch = () => {
    const selectedEmirate = emirate === "all-emirates" ? "" : emirate;
    const selectedService = serviceName === "all-services" ? "" : serviceName;
    onSearch(selectedEmirate, selectedService);
  };

  return (
    <section className="relative h-[640px] md:h-[720px] w-full overflow-hidden md:mb-16 rounded-2xl md:rounded-3xl">
      <div className="absolute inset-0">
        <Image
          src={garageBg}
          alt="Garage background"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end md:justify-center px-4 pb-12">
        <motion.div
          className="max-w-5xl text-center flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mb-3 text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {trans.hero.title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mb-8 text-lg md:text-xl font-light text-gray-200"
          >
            {trans.hero.subtitle}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } }}
            className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg md:pb-18"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  {trans.hero.yourLocation}
                </label>
                <div className="relative w-full">
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 appearance-none bg-white cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-[50px]"
                  >
                    <option value="all-emirates">{trans.hero.allEmirates}</option>
                    {CANONICAL_EMIRATES.map((em: string, index: number) => (
                      <option key={index} value={em}>
                        {trans.hero.emirates[index] || em}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <ChevronDown className="h-4 w-4 opacity-50 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  {trans.hero.serviceType}
                </label>
                <div className="relative w-full">
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 appearance-none bg-white cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-[50px]"
                  >
                    <option value="all-services">{trans.hero.allServices}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <ChevronDown className="h-4 w-4 opacity-50 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5 flex items-center justify-center gap-2 h-[50px]"
                >
                  <Search size={18} />
                  {trans.hero.searchButton}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
