"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import garageBg from "@/assets/service/garage/technical_checking_car_transmission.jpg";
import ChatDialog from "../chat/ChatDialog";

interface GarageHeroProps {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  services: string[];
  operatingHours: {
    day: string;
    hours: string;
    status: "Open" | "Closed";
  }[];
}

export default function GarageHero({
  name,
  rating,
  reviews,
  distance,
  services,
  operatingHours,
}: GarageHeroProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <section className="relative h-[400px] md:h-[720px] w-full mb-[150px] md:mb-[350px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={garageBg}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 " />
      </div>

      {/* Content Card */}
      <div className="absolute left-1/2 top-1/2 md:top-3/4 -translate-x-1/2 w-full max-w-6xl px-4 z-10">
        <Card className="w-full bg-white p-6 md:p-10 shadow-md rounded-2xl">
          <div className="">
            <div className="flex-1">
              {/* Title with green indicator */}
              <div className="flex items-center gap-3 mb-3 justify-between">
                <div className="flex items-center gap-3">
                  {" "}
                  <h1 className="text-base md:text-4xl font-bold text-gray-900">
                    {name}
                  </h1>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>

                {/* See Location Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="self-start rounded-md border px-6 border-blue-500 text-sm md:text-base"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  See location
                </Button>
              </div>

              {/* Rating and Distance */}
              <div className="flex items-center gap-2 text-base mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="text-gray-600">({reviews})</span>
                <span className="text-gray-400 mx-1"> • </span>
                <span className="text-gray-600">{distance}</span>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="flex justify-items-center items-center gap-2">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs md:text-base font-medium text-gray-700 flex items-center"
                    >
                      {service}
                      <span className="text-gray-400 mx-1">•</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setChatOpen(true)}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl w-10 h-10 md:w-12 md:h-12 p-0"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl w-10 h-10 md:w-12 md:h-12 p-0"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-3xl font-bold text-gray-900">
              Operating Hours
            </h2>
            <div className="space-y-4">
              {operatingHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm md:text-lg text-gray-700">
                    {hour.day}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${
                      hour.status === "Open"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    } px-6 py-2 rounded-full font-sm md:text-base font-medium w-24`}
                  >
                    {hour.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        garageName={name}
      />
    </section>
  );
}
