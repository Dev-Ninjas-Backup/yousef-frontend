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
  ArrowLeft,
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
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header section (only shown in modal mode) */}
      {isModal && (
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Offer Details</h2>
        </div>
      )}

      {/* Main Content Grid */}
      <div className={`${isModal ? "p-6" : "container mx-auto px-4 py-8"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Box (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative shadow-sm">
              <img
                src={offer.bannerImage}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              
              {/* Floating Badges */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                <span className="inline-flex items-center gap-1 bg-green-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                  <Tag className="w-3.5 h-3.5" />
                  {offer.brand ? `${offer.brand} Offer` : "Exclusive Deal"}
                </span>
                <span className="inline-flex items-center gap-1 bg-white text-gray-800 font-semibold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {offer.validUnit}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Info details (col-span-7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Header Section */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {offer.brand && (
                  <span className="inline-block bg-[#eff5ff] text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
                    {offer.brand}
                  </span>
                )}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Promoted
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {offer.title}
              </h1>
              <div className="flex items-baseline gap-2.5">
                {offer.originalPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    {offer.originalPrice} AED
                  </span>
                )}
                <span className="text-2xl font-extrabold text-green-600">
                  {offer.price ? `${offer.price} AED` : "Free offer"}
                </span>
                {offer.originalPrice && offer.price && (
                  <span className="bg-red-50 border border-red-100 text-red-650 font-bold text-[10px] px-2.5 py-0.5 rounded-lg ml-2">
                    SAVE {Math.round(100 - (parseFloat(offer.price) / parseFloat(offer.originalPrice)) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1.5">Description</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed bg-gray-550/5 bg-gray-50/50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap">
                {offer.description}
              </p>
            </div>

            {/* Linked Garage / Seller Information */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Seller Information
              </h3>
              
              {garage ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-550/5 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-white relative">
                      {garage.profileImage ? (
                        <img
                          src={garage.profileImage}
                          alt={garage.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-100 text-blue-650 flex items-center justify-center font-bold text-base">
                          {garage.name.substring(0, 1).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-sm">{garage.name}</h4>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                          Garage
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="line-clamp-1">{garage.formattedAddress}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/service/${garage.id}`)}
                      className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold gap-1.5 h-9 shrink-0 shadow-xs"
                    >
                      <span>Visit Garage</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      onClick={handleChat}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold gap-1.5 h-9 shadow-md shadow-green-500/10"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat WhatsApp
                    </Button>
                  </div>
                </div>
              ) : offer.garageId ? (
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  <span>Retrieving linked workshop details...</span>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center bg-gray-50/50">
                  <p className="text-xs font-semibold text-gray-450 uppercase tracking-wider">General Promotion</p>
                  <p className="text-sm text-gray-650 font-bold mt-1">Available at famous brand stores</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  if (!isModal) {
    return (
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Back Button */}
        <div className="flex justify-start">
          <Button
            variant="outline"
            className="group bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 shadow-sm hover:shadow-md flex items-center gap-2 px-5 py-2.5 h-auto rounded-xl transition-all"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold text-sm">Back to Home</span>
          </Button>
        </div>

        {/* Card wrapper */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
