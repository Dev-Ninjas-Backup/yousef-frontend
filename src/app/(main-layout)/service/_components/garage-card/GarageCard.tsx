"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Star } from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
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
  iconColor?: string;
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
  iconColor = "blue",
}: GarageCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Open 24/7":
        return "bg-green-200 text-green-800";
      case "Emergency":
        return "bg-red-200 text-red-800";
      case "Open Now":
        return "bg-blue-200 text-blue-800";
      case "Closes 10 PM":
        return "bg-orange-200 text-orange-800";
      default:
        return "bg-gray-500 text-gray-800";
    }
  };

  const getIconBgColor = () => {
    switch (iconColor) {
      case "red":
        return "bg-red-50";
      case "purple":
        return "bg-purple-50";
      case "orange":
        return "bg-orange-50";
      default:
        return "bg-blue-50";
    }
  };

  const getIconColor = () => {
    switch (iconColor) {
      case "red":
        return "text-red-600";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-600";
      default:
        return "text-blue-600";
    }
  };

  const renderIcon = () => {
    const iconClass = `md:h-8 md:w-8 h-4 w-4 ${getIconColor()}`;
    switch (icon) {
      case "truck":
        return <FaTruck className={iconClass} />;
      case "zap":
        return <FaCarBattery className={iconClass} />;
      case "droplet":
        return <FaOilCan className={iconClass} />;
      default:
        return <AiFillTool className={iconClass} />;
    }
  };
  return (
    <Card className="cursor-pointer overflow-hidden bg-white shadow-md transition-shadow hover:shadow-2xl py-0 w-full">
      <div className="p-5">
        <Link href={`/service/${id}`}>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-3 w-full justify-between">
              {/* Info */}

              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg ${getIconBgColor()}`}
                >
                  {renderIcon()}
                </div>
                <div>
                  {" "}
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold">
                      {name}
                    </h3>
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
              <div>
                {status && (
                  <Badge variant="default" className={`${getStatusColor()} `}>
                    {status}
                  </Badge>
                )}
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

          {/* <div className="text-right">
            <p className="text-xs text-gray-500">Est. Price</p>
            <p className="font-semibold">{priceRange}</p>
          </div> */}
        </div>
      </div>
    </Card>
  );
}
