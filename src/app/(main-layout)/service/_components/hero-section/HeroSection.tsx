"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
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
  
  useEffect(() => {
    if (initialValues) {
      setEmirate(initialValues.emirate || "");
      setServiceName(initialValues.serviceName || "");
    }
  }, [initialValues]);
  
  const emirates = [
    "Abu Dhabi",
    "Dubai", 
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ];
  
  const handleSearch = () => {
    const selectedEmirate = emirate === "all-emirates" ? "" : emirate;
    const selectedService = serviceName === "all-services" ? "" : serviceName;
    onSearch(selectedEmirate, selectedService);
  };

  return (
    <section className="relative h-[640px] md:h-[720px] w-full overflow-hidden md:mb-16 ">
      <div className="absolute inset-0">
        <Image
          src={garageBg}
          alt="Garage background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/80 rounded-lg" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end md:justify-center px-4 pb-12">
        <div className="max-w-5xl text-center flex flex-col items-center">
          <h1 className="mb-3 text-4xl font-bold leading-tight text-white md:text-6xl">
            {trans.hero.title}
          </h1>
          <p className="mb-8 text-lg md:text-xl font-light text-gray-200">
            {trans.hero.subtitle}
          </p>

          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg md:pb-18">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  {trans.hero.yourLocation}
                </label>
                <Select value={emirate} onValueChange={setEmirate}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 appearance-none bg-white cursor-pointer text-gray-700">
                    <SelectValue placeholder="Select Emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-emirates">All Emirates</SelectItem>
                    {emirates.map((em) => (
                      <SelectItem key={em} value={em}>{em}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  {trans.hero.serviceType}
                </label>
                <Select value={serviceName} onValueChange={setServiceName}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 appearance-none bg-white cursor-pointer text-gray-700">
                    <SelectValue placeholder={trans.hero.allServices} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-services">All Services</SelectItem>
                    {serviceCategories?.serviceCategories.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5 flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  {trans.hero.searchButton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
