"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Star, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DirectionIcon from "@/assets/service/GarageCard/direc_icon.svg";

interface GarageCardProps {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  location: string;
  services: string[];
  description: string;
  priceRange: string;
  status?: string;
  icon?: string;
}

export default function GarageCard({
  id,
  name,
  rating,
  reviews,
  distance,
  location,
  services,
  description,
  priceRange,
  status,
  icon = "wrench",
}: GarageCardProps) {
  return (
    <Card className="cursor-pointer overflow-hidden bg-white shadow-md transition-shadow hover:shadow-2xl py-0">
      <div className="p-5">
        <Link href={`/service/${id}`}>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-3">
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  {status && (
                    <Badge
                      variant={
                        status === "Open 24/7" ? "default" : "destructive"
                      }
                      className={
                        status === "Open 24/7" ? "bg-green-500" : "bg-red-500"
                      }
                    >
                      {status}
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {rating} ({reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <p className="mt-1 text-sm text-gray-500">
                  {distance} • {location}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-3 flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge
                key={index}
                variant="default"
                className="text-xs bg-gray-100 text-gray-800 font-light"
              >
                {service}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-gray-600">{description}</p>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Image
                src={DirectionIcon}
                alt="Direction"
                width={16}
                height={16}
                className="mr-1 border-0"
              />
              Directions
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-green-600 bg-green-600 text-white  hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-green-600 bg-green-600 text-white hover:bg-green-50"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Est. Price</p>
            <p className="font-semibold">{priceRange}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
