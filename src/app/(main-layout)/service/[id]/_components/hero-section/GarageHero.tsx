"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import garageBg from "@/assets/service/banner/section.png";

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
  return (
    <section className="relative h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={garageBg} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <Card className="w-full max-w-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title */}
              <h1 className="mb-2 text-2xl font-bold">{name}</h1>

              {/* Rating & Distance */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-sm text-gray-600">({reviews})</span>
                </div>
                <span className="text-sm text-gray-600">{distance}</span>
              </div>

              {/* Services */}
              <div className="mb-4 flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>

            {/* See Location Button */}
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              See location
            </Button>
          </div>

          {/* Operating Hours */}
          <div className="mt-6 border-t pt-4">
            <h3 className="mb-3 font-semibold">Operating Hours</h3>
            <div className="space-y-2">
              {operatingHours.map((hour, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{hour.day}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{hour.hours}</span>
                    <Badge
                      variant={
                        hour.status === "Open" ? "default" : "destructive"
                      }
                      className={
                        hour.status === "Open" ? "bg-green-500" : "bg-red-500"
                      }
                    >
                      {hour.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
