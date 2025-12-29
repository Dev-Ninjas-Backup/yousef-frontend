"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");

  return (
    <section className="relative h-[640px] md:h-[720px] w-full overflow-hidden md:mb-16 ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={garageBg}
          alt="Garage background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/80 rounded-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end md:justify-center px-4 pb-12">
        <div className="max-w-5xl text-center flex flex-col items-center">
          <h1 className="mb-3 text-4xl font-bold leading-tight text-white md:text-6xl">
            Find Car Service & Towing
          </h1>
          <p className="mb-8 text-lg md:text-xl font-light text-gray-200">
            Locate nearby garages, get directions, and <br /> contact services
            instantly
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg md:pb-18">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Your Location
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <MapPin size={18} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full outline-none text-gray-700"
                  />
                </div>
              </div>
              {/* Service Type Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Service Type
                </label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 appearance-none bg-white cursor-pointer text-gray-700">
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="repair">Car Repair</SelectItem>
                    <SelectItem value="towing">Towing</SelectItem>
                    <SelectItem value="oil-change">Oil Change</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5 flex items-center justify-center gap-2">
                  <Search size={18} />
                  Search Garages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
