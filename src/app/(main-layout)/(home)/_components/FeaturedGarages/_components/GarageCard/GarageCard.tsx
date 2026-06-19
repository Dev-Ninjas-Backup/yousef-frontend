"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, MessageCircle, BadgeCheck, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { isGarageCurrentlyOpen, getTodayHoursDescription } from "@/utils/schedule";

interface GarageCardProps {
  id?: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  latitude?: number;
  longitude?: number;
  garageOwnerId?: string;
  totalReviews?: number;
  services?: any[];
  profileImage?: string;
  weekdaysHours?: string | null;
  weekendsHours?: string | null;
}

const GarageCard: React.FC<GarageCardProps> = ({ 
  id,
  name, 
  location, 
  rating, 
  image, 
  latitude, 
  longitude,
  garageOwnerId,
  totalReviews = 0,
  services,
  profileImage,
  weekdaysHours,
  weekendsHours,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  const handleGetDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (latitude && longitude) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    } else {
      const searchQuery = encodeURIComponent(`${name} ${location}`);
      const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!garageOwnerId) return;

    if (!isAuthenticated) {
      toast.error("Please login to message the garage owner.");
      router.push("/user-auth");
      return;
    }

    const chatEvent = new CustomEvent('openChat', {
      detail: {
        userId: garageOwnerId,
        userName: name,
        prefilledMessage: `Hi! I'm interested in your garage services at ${name} (${location}). Could you please provide more information?`
      }
    });
    window.dispatchEvent(chatEvent);
  };

  // Mock services if empty for demonstration of the design
  const displayServices = services && services.length > 0 
    ? services.map(s => typeof s === 'string' ? s : s?.name || "Service") 
    : ["Maintenance", "Oil Change", "AC Repair", "Diagnostics"];
    
  const topServices = displayServices.slice(0, 3);
  const remainingServices = displayServices.length - 3;

  return (
    <Link href={`/service/${id}`} className="block group h-full">
      <Card className="overflow-hidden hover:shadow-xl transition-shadow p-0 max-w-[390px] border border-gray-100 rounded-xl relative bg-white flex flex-col h-full">
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <Image 
            src={image} 
            alt={name || 'Garage image'} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Open Now Badge */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm z-10">
             <div className={`w-2 h-2 rounded-full ${(!weekdaysHours || isGarageCurrentlyOpen(weekdaysHours, weekendsHours)) ? "bg-[#16A34A]" : "bg-rose-500"}`}></div>
             <span className="text-xs font-bold text-gray-800">
               {(!weekdaysHours || isGarageCurrentlyOpen(weekdaysHours, weekendsHours)) ? "Open Now" : "Closed"}
             </span>
          </div>
        </div>

        <CardContent className="p-5 pt-6 relative flex-1 flex flex-col pb-5">
          <div className="flex items-start gap-3 mb-5">
            {/* Logo */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
               {profileImage ? (
                  <Image src={profileImage} alt={name} width={56} height={56} className="object-cover w-full h-full" />
               ) : (
                  <div className="text-white text-xl font-bold">{name?.charAt(0) || 'G'}</div>
               )}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 pr-2">
                     <h3 className="font-bold text-gray-900 text-lg md:text-xl truncate group-hover:text-[#2563EB] transition-colors">{name}</h3>
                     <BadgeCheck className="w-5 h-5 text-white fill-[#1877F2] flex-shrink-0" />
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                     <div className="flex items-center gap-1">
                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                       <span className="font-bold text-gray-900">{rating?.toFixed(1) || "0.0"}</span>
                     </div>
                     <span className="text-xs text-gray-500">({totalReviews || 0})</span>
                  </div>
               </div>
               {/* Subtitle / Specialties - hardcoded to match design since it's not in the model */}
               <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">All Makes, All Models</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 text-sm text-gray-500">
            <div className="flex items-center gap-2 truncate flex-1 pr-4">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <span className="text-[#2563EB] font-medium whitespace-nowrap flex-shrink-0">4.5 km</span>
          </div>

          {/* Services Tags */}
          <div className="flex flex-nowrap gap-2 mb-5 overflow-x-auto scrollbar-hide w-full py-0.5">
            {topServices.map((service, idx) => (
              <Badge key={idx} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-gray-100 font-medium border border-gray-100 rounded-md px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0">
                 {service}
              </Badge>
            ))}
            {remainingServices > 0 && (
              <Badge variant="secondary" className="bg-[#EFF6FF] text-[#2563EB] hover:bg-blue-100 font-medium border border-blue-50 rounded-md px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0">
                +{remainingServices}
              </Badge>
            )}
          </div>

          {/* Status */}
          <div className={`rounded-lg px-4 py-2.5 flex items-center gap-2 mb-6 border mt-auto ${
            (!weekdaysHours || isGarageCurrentlyOpen(weekdaysHours, weekendsHours))
              ? "bg-[#F0FDF4] border-green-50 text-[#15803D]"
              : "bg-rose-50 border-rose-100 text-rose-700"
          }`}>
             <Clock className={`w-4 h-4 ${(!weekdaysHours || isGarageCurrentlyOpen(weekdaysHours, weekendsHours)) ? "text-[#16A34A]" : "text-rose-500"}`} />
             <span className="text-sm font-medium">
               {(!weekdaysHours || isGarageCurrentlyOpen(weekdaysHours, weekendsHours)) ? "Open Now" : "Closed"}
               {weekdaysHours && ` • ${getTodayHoursDescription(weekdaysHours, weekendsHours)}`}
             </span>
          </div>

          <div className="flex gap-3 mt-auto">
            <Button 
              onClick={handleGetDirections}
              variant="outline"
              className="flex-1 bg-white border border-[#BFDBFE] hover:bg-[#EFF6FF] text-[#2563EB] font-semibold rounded-lg h-12 text-sm z-10"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              onClick={handleMessage}
              className="flex-1 bg-[#16A34A] hover:bg-green-700 text-white font-semibold rounded-lg border-0 h-12 text-sm z-10"
            >
              <MessageCircle className="w-4 h-4 mr-2 fill-current" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GarageCard;