"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import search_garage_bg from "../../../../../assets/home/searchGarage/search_garage_bg.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { searchGaragesTranslations } from "@/translations/searchGarages";
import { useRouter } from "next/navigation";
import { useGetServiceCategoriesQuery } from "@/store/api/garageApi";

const SearchGarages: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(searchGaragesTranslations);
  const router = useRouter();
  const [emirate, setEmirate] = useState("");
  const [serviceType, setServiceType] = useState("");
  
  const { data: serviceCategories } = useGetServiceCategoriesQuery();
  
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
    const params = new URLSearchParams();
    
    if (emirate && emirate !== "all-emirates") {
      params.set('emirate', emirate);
    }
    
    if (serviceType && serviceType !== "all-services") {
      params.set('serviceName', serviceType);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/service?${queryString}` : '/service';
    
    router.push(url);
  };

  return (
    <section
      className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${search_garage_bg.src})` }}
    >
      <Card className="shadow-xl max-w-4xl w-full bg-white">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl text-center font-bold">
            {trans.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white">
            <Select value={emirate} onValueChange={setEmirate}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Select Emirate" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all-emirates" className="hover:bg-gray-100 border-0">
                  All Emirates
                </SelectItem>
                {emirates.map((em) => (
                  <SelectItem
                    key={em}
                    value={em}
                    className="hover:bg-gray-100 border-0"
                  >
                    {em}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all-services" className="hover:bg-gray-100">
                  All Services
                </SelectItem>
                {serviceCategories?.serviceCategories.map((service) => (
                  <SelectItem
                    key={service}
                    value={service}
                    className="hover:bg-gray-100"
                  >
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 md:px-8 rounded-lg  sm:min-w-[180px] md:min-w-[244px]"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              {trans.search}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SearchGarages;
