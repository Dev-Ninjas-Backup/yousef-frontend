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

const locationItems = [
  { value: "dubai", label: "Dubai" },
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "sharjah", label: "Sharjah" },
  { value: "ajman", label: "Ajman" },
  { value: "umm-al-quwain", label: "Umm Al Quwain" },
  { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { value: "fujairah", label: "Fujairah" },
];

const serviceItems = [
  { value: "maintenance", label: "General Maintenance" },
  { value: "repair", label: "Repair Services" },
  { value: "inspection", label: "Vehicle Inspection" },
  { value: "oil-change", label: "Oil Change" },
  { value: "tire-service", label: "Tire Service" },
  { value: "battery", label: "Battery Service" },
  { value: "ac-service", label: "AC Service" },
  { value: "brake-service", label: "Brake Service" },
  { value: "emergency", label: "Emergency Service" },
];

const SearchGarages: React.FC = () => {
  const [emirate, setEmirate] = useState("");
  const [serviceType, setServiceType] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { emirate, serviceType });
  };

  return (
    <section
      className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${search_garage_bg.src})` }}
    >
      <Card className="shadow-xl max-w-4xl w-full bg-white">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl text-center font-bold">
            Search Nearby Garages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white">
            <Select value={emirate} onValueChange={setEmirate}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Select Emirate" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {locationItems.map((location) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="hover:bg-gray-100 border-0"
                  >
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {serviceItems.map((service) => (
                  <SelectItem
                    key={service.value}
                    value={service.value}
                    className="hover:bg-gray-100"
                  >
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 md:px-8 rounded-lg  sm:min-w-[180px] md:min-w-[244px]"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SearchGarages;
