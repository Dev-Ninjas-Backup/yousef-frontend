import React from "react";
import Image from "next/image";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GarageCardProps {
  id?: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  latitude?: number;
  longitude?: number;
  garageOwnerId?: string;
}

const GarageCard: React.FC<GarageCardProps> = ({ 
  id,
  name, 
  location, 
  rating, 
  image, 
  latitude, 
  longitude,
  garageOwnerId 
}) => {
  
  const handleGetDirections = () => {
    if (latitude && longitude) {
      // Open Google Maps with directions
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    } else {
      // Fallback to search by name and location
      const searchQuery = encodeURIComponent(`${name} ${location}`);
      const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleMessage = () => {
    if (garageOwnerId) {
      // Dispatch custom event to open FloatingChat with garage owner
      const chatEvent = new CustomEvent('openChat', {
        detail: {
          recipientId: garageOwnerId,
          recipientName: name,
          initialMessage: `Hi! I'm interested in your garage services at ${location}. Could you please provide more information?`
        }
      });
      window.dispatchEvent(chatEvent);
    } else {
      // Fallback - just open the chat widget
      const chatEvent = new CustomEvent('openChat', {
        detail: {
          initialMessage: `Hi! I'm interested in ${name} garage services. Could you please provide more information?`
        }
      });
      window.dispatchEvent(chatEvent);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow p-0 max-w-[390px]">
      <div className="relative h-40 md:h-48 w-full">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="(max-width: 200px) 100vw, (max-width: 390px) 50vw, 33vw"
        />
      </div>
      <CardContent className="pb-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-base md:text-xl">{name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-[#4B5563]">{rating}</span>
          </div>
        </div>
        <p className="text-xs md:text-base text-[#4B5563] mb-4 flex items-center gap-1">
          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
          {location}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            size="sm" 
            onClick={handleGetDirections}
            className="w-full sm:flex-1 bg-[#2563EB] hover:bg-blue-50 hover:text-[#333333] text-[#E5E7EB] text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5 rounded-md"
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Get Directions
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleMessage}
            className="w-full sm:flex-1 bg-[#16A34A] text-[#E5E7EB] hover:bg-green-50 hover:text-[#333333] border-0 text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5 rounded-md"
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageCard;