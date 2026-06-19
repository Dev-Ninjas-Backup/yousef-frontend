"use client";

import { useState } from "react";

import { motion } from "framer-motion";
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
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTodayHoursDescription } from "@/utils/schedule";

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
  position?: {
    lat: number;
    lng: number;
  };
  ownerId?: string;
  phone?: string;
  brandExpertise?: string[];
  profileImage?: string | null;
  weekdaysHours?: string | null;
  weekendsHours?: string | null;
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
  position,
  ownerId,
  phone,
  brandExpertise = [],
  profileImage,
  weekdaysHours,
  weekendsHours,
}: GarageCardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showAllServices, setShowAllServices] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const SERVICES_LIMIT = 4;
  const visibleServices = showAllServices ? services : services.slice(0, SERVICES_LIMIT);
  const hiddenCount = services.length - SERVICES_LIMIT;

  const getStatusColor = () => {
    switch (status) {
      case "Open 24/7":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Emergency":
        return "bg-red-100 text-red-700 border border-red-200";
      case "Open Now":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Closed":
        return "bg-rose-50 text-rose-600 border border-rose-100";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
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

  const handleDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (position?.lat && position?.lng) {
      // Get current location and navigate to Google Maps
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            const { latitude, longitude } = currentPosition.coords;
            const googleMapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          },
          (error) => {
            // If location access denied, open Google Maps without current location
            const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
            window.open(googleMapsUrl, '_blank');
          }
        );
      } else {
        // If geolocation not supported, open Google Maps without current location
        const googleMapsUrl = `https://www.google.com/maps/dir//${position.lat},${position.lng}`;
        window.open(googleMapsUrl, '_blank');
      }
    }
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ownerId) return;
    if (!isAuthenticated) {
      toast.error("Please login to message the garage owner.");
      router.push("/user-auth");
      return;
    }
    
    // Trigger FloatingChatWidget to open with this conversation and pre-filled message
    const event = new CustomEvent('openChat', {
      detail: {
        userId: ownerId,
        userName: name,
        prefilledMessage: `Hi! I'm interested in your garage services at ${name}. Can you provide more information?`
      }
    });
    window.dispatchEvent(event);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phone) {
      setIsCallModalOpen(true);
    }
  };
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
    <Card className="cursor-pointer overflow-hidden bg-white shadow-md transition-shadow hover:shadow-2xl py-0 w-full">
      <div className="p-5">
        <Link href={`/service/${id}`}>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-3 w-full justify-between">
              {/* Info */}

              <div className="flex gap-4">
                {/* Icon or Profile Image */}
                <div
                  className={`flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg overflow-hidden flex-shrink-0 ${!profileImage ? getIconBgColor() : ""}`}
                >
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).parentElement!.classList.add(...getIconBgColor().split(" "));
                      }}
                    />
                  ) : (
                    renderIcon()
                  )}
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
                    {reviews > 0 ? (
                      <>
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
                          {rating.toFixed(1)} ({reviews} reviews)
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">No reviews yet</span>
                    )}
                  </div>
                  {/* Location & Hours */}
                  <p className="mt-1 text-xs md:text-sm text-gray-500 flex flex-wrap items-center gap-1.5">
                    <span>{distance}</span>
                    <span>•</span>
                    <span>{location}</span>
                    {weekdaysHours && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100/80">
                          ⏰ {getTodayHoursDescription(weekdaysHours, weekendsHours)}
                        </span>
                      </>
                    )}
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
          <div className="mb-3 flex flex-wrap gap-1.5 items-center">
            {visibleServices.map((service, index) => (
              <Badge
                key={index}
                variant="default"
                className="text-xs bg-gray-100 text-gray-800 font-light"
              >
                {service}
              </Badge>
            ))}
            {!showAllServices && hiddenCount > 0 && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAllServices(true); }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-0.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                +{hiddenCount} more
              </button>
            )}
            {showAllServices && services.length > SERVICES_LIMIT && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAllServices(false); }}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Show less
              </button>
            )}
          </div>

          {/* Brand Expertise */}
          {brandExpertise.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-gray-500">Experts in:</span>
              {brandExpertise.map((brand, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="text-xs bg-purple-50 text-purple-700 border border-purple-200 font-medium px-2 py-0.5 rounded-full"
                >
                  {brand}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="mb-4 text-sm text-gray-600">{description}</p>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleDirections}
            >
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
              onClick={handleMessage}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-green-600 bg-green-600 text-white hover:bg-green-50"
              onClick={handleCall}
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

    {/* Call Confirmation Dialog */}
    <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
      <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl bg-white border border-slate-100 p-6 shadow-xl z-[9999]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-900">Call Garage</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm mt-1">
            Are you sure you want to call {name}?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-xl font-bold text-slate-800 font-mono tracking-wide">{phone}</p>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0 sm:flex-row justify-center mt-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCallModalOpen(false);
            }}
            className="flex-1 rounded-xl border-slate-205 hover:bg-slate-50 text-slate-600 font-semibold"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (phone) {
                window.location.href = `tel:${phone}`;
              }
              setIsCallModalOpen(false);
            }}
            className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </motion.div>
  );
}
