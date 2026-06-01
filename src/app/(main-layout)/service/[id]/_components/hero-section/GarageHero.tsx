"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, MessageCircle, BadgeCheck, Clock, Navigation } from "lucide-react";
import Image from "next/image";
import garageBg from "@/assets/service/garage/technical_checking_car_transmission.jpg";
import ChatDialog from "../chat/ChatDialog";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

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
  coverPhoto?: string;
  ownerId?: string;
  phone?: string;
}

export default function GarageHero({
  name,
  rating,
  reviews,
  distance,
  services,
  operatingHours,
  coverPhoto,
  ownerId,
  phone,
}: GarageHeroProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);
  const [chatOpen, setChatOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleMessage = async () => {
    if (!ownerId) return;
    if (!isAuthenticated) {
      toast.error("Please login to message the garage owner.");
      router.push("/user-auth");
      return;
    }
    
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private-chat/send-message/${ownerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: `Hi! I'm interested in your garage services at ${name}. Can you provide more information?`,
          recipientId: ownerId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const event = new CustomEvent('openChat', {
          detail: {
            userId: ownerId,
            userName: name
          }
        });
        window.dispatchEvent(event);
      } else {
        toast.error(data.message || "Failed to start conversation.");
      }
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast.error("Failed to start conversation. Please try again.");
    }
  };

  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleSeeLocationScroll = () => {
    const locationSection = document.getElementById('location-map');
    if (locationSection) {
      locationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const currentStatus = operatingHours[0]?.status || "Open";
  const currentHours = operatingHours[0]?.hours || "8:00 AM - 8:00 PM";

  return (
    <section className="bg-white pt-24 pb-6 border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Full-width Wide Banner Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm group mb-8">
          <Image
            src={coverPhoto || garageBg}
            alt={name}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 group-hover:scale-102"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Distance overlay badge */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-md">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-bold text-slate-800">{distance}</span>
          </div>
        </div>

        {/* Header Block: Title, Info, and CTA buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6">
          <div className="space-y-3">
            {/* Title & Verified Badge */}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {name}
              </h1>
              <BadgeCheck className="w-8 h-8 text-white fill-[#1877F2] shrink-0" />
            </div>

            {/* Ratings & Quick details */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-extrabold text-slate-900">{rating > 0 ? rating.toFixed(1) : "0.0"}</span>
                <span className="text-slate-500">({reviews > 0 ? `${reviews} reviews` : "No reviews yet"})</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              
              {/* Live Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                  currentStatus === "Open" 
                    ? "bg-[#F0FDF4] border-green-100 text-[#15803D]" 
                    : "bg-red-50 border-red-100 text-red-700"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    currentStatus === "Open" ? "bg-[#16A34A] animate-pulse" : "bg-red-500"
                  }`} />
                  {currentStatus === "Open" ? `Open • Closes at ${currentHours.split('-')[1]?.trim() || '8:00 PM'}` : "Closed"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              onClick={handleSeeLocationScroll}
              variant="outline"
              className="bg-white border border-[#BFDBFE] hover:bg-[#EFF6FF] text-[#2563EB] font-bold rounded-xl px-6 h-12 text-sm md:text-base transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              See Location
            </Button>
            
            <Button 
              onClick={handleMessage}
              className="bg-[#16A34A] hover:bg-green-700 text-white font-bold rounded-xl px-6 h-12 text-sm md:text-base border-0 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2 fill-current" />
              Message
            </Button>

            {phone && (
              <Button 
                onClick={handleCall}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl w-12 h-12 p-0 shrink-0 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

      </div>

      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        garageName={name}
      />
    </section>
  );
}
