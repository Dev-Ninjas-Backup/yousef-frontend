"use client";

import React from "react";
import { useGetExclusiveOfferByIdQuery } from "@/store/api/exclusiveOfferApi";
import { useGetGarageByIdQuery } from "@/store/api/garageApi";
import {
  Clock,
  Tag,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Navigation,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ExclusiveOfferDetailProps {
  id: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const ExclusiveOfferDetail: React.FC<ExclusiveOfferDetailProps> = ({
  id,
  isModal = false,
  onClose,
}) => {
  const router = useRouter();

  const { data: offer, isLoading, error } = useGetExclusiveOfferByIdQuery(id);

  const { data: garageRes } = useGetGarageByIdQuery(offer?.garageId || "", {
    skip: !offer?.garageId,
  });
  const garage = garageRes?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading offer details...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <Tag className="w-5 h-5 text-red-505" />
        </div>
        <p className="text-sm font-bold text-gray-800">Offer not found</p>
        <p className="text-xs text-gray-500 max-w-xs">
          The exclusive offer you are looking for might have expired or been removed.
        </p>
        {!isModal && (
          <Button onClick={() => router.push("/")} className="mt-2 bg-blue-600 text-white rounded-xl">
            Go to Home
          </Button>
        )}
      </div>
    );
  }

  const handleChat = () => {
    if (garage?.user?.id) {
      // Dispatches custom event which is captured by FloatingChatWidget
      const event = new CustomEvent("openChat", {
        detail: { ownerId: garage.user.id },
      });
      window.dispatchEvent(event);
      toastMessage("Opening chat with garage owner...");
    } else {
      toastMessage("Chat option is only available for offers linked to a garage.");
    }
  };

  const handleDirections = () => {
    if (garage?.garageLat && garage?.garageLng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${garage.garageLat},${garage.garageLng}`;
      window.open(url, "_blank");
    } else if (garage?.formattedAddress) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        garage.formattedAddress
      )}`;
      window.open(url, "_blank");
    } else {
      toastMessage("Location address is not specified.");
    }
  };

  const toastMessage = (msg: string) => {
    // Attempt standard alert if toast is not ready
    try {
      import("sonner").then(({ toast }) => toast(msg));
    } catch {
      alert(msg);
    }
  };

  const content = (
    <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border shadow-xl max-w-3xl mx-auto w-full relative">
      {/* Close button for modals */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded-full z-20 transition-all hover:scale-110"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Banner image */}
      <div className="relative h-[250px] sm:h-[350px] w-full bg-slate-100">
        <img
          src={offer.bannerImage}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute bottom-4 left-4 sm:left-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 bg-green-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow">
            <Tag className="w-3.5 h-3.5" />
            {offer.brand ? `${offer.brand} Offer` : "Exclusive Deal"}
          </span>
          <span className="inline-flex items-center gap-1 bg-white text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-full shadow">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            {offer.validUnit}
          </span>
        </div>
      </div>

      {/* Core details */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {offer.title}
          </h1>
          {offer.brand && (
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mt-1.5">
              Brand promotion: {offer.brand}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-[#f8fafc] border rounded-2xl p-4 sm:p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pricing details</p>
            <div className="flex items-baseline gap-2.5">
              {offer.originalPrice && (
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  {offer.originalPrice} AED
                </span>
              )}
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-green-600">
                {offer.price ? `${offer.price} AED` : "Free offer"}
              </span>
            </div>
          </div>
          {offer.originalPrice && offer.price && (
            <span className="bg-red-50 border border-red-100 text-red-650 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs">
              SAVE {Math.round(100 - (parseFloat(offer.price) / parseFloat(offer.originalPrice)) * 100)}%
            </span>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">About this offer</h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {offer.description}
          </p>
        </div>

        {/* Linked Garage section */}
        {garage ? (
          <div className="border border-blue-100 bg-blue-50/20 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-blue-100 shrink-0 bg-white relative">
                  {garage.profileImage ? (
                    <img
                      src={garage.profileImage}
                      alt={garage.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 text-blue-650 flex items-center justify-center font-bold text-lg">
                      {garage.name.substring(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">{garage.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="line-clamp-1">{garage.formattedAddress}</span>
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => router.push(`/service/${garage.id}`)}
                className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold gap-1.5 h-9 shrink-0 shadow-xs"
              >
                <span>Visit Garage Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleChat}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold gap-1.5 h-10 shadow-md shadow-green-500/10"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={handleDirections}
                className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold gap-1.5 h-10 shadow-xs"
              >
                <Navigation className="w-4 h-4 text-blue-500" />
                Directions
              </Button>
            </div>
          </div>
        ) : offer.garageId ? (
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            <span>Retrieving linked workshop details...</span>
          </div>
        ) : (
          <div className="border border-dashed border-gray-250 rounded-2xl p-5 text-center bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">General Promotion</p>
            <p className="text-sm text-gray-650 font-bold mt-1">Available at famous brand stores</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto mt-0.5">
              This offer is a general manufacturer or brand discount, not tied to any single local garage.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return content;
};
