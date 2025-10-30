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

const SearchGarages: React.FC = () => {
  const [emirate, setEmirate] = useState("");
  const [serviceType, setServiceType] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { emirate, serviceType });
    // Add your search logic here
  };

  return (
    <section
      className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${search_garage_bg.src})` }}
    >
      <Card className="shadow-xl max-w-4xl w-full">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="text-xl md:text-2xl text-center font-bold">
            Search Nearby Garages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Select value={emirate} onValueChange={setEmirate}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Select Emirate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
                <SelectItem value="ajman">Ajman</SelectItem>
                <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                <SelectItem value="fujairah">Fujairah</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] md:h-[58px] px-4 py-6 border-gray-300 rounded-lg bg-white text-gray-700">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">General Maintenance</SelectItem>
                <SelectItem value="repair">Repair Services</SelectItem>
                <SelectItem value="inspection">Vehicle Inspection</SelectItem>
                <SelectItem value="oil-change">Oil Change</SelectItem>
                <SelectItem value="tire-service">Tire Service</SelectItem>
                <SelectItem value="battery">Battery Service</SelectItem>
                <SelectItem value="ac-service">AC Service</SelectItem>
                <SelectItem value="brake-service">Brake Service</SelectItem>
                <SelectItem value="emergency">Emergency Service</SelectItem>
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