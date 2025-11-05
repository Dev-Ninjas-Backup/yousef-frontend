"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, TrendingUp, Clock, Plus } from "lucide-react";
import PromotionalAdCard from "./_components/PromotionalAdCard/PromotionalAdCard";
import PromotionsStat from "./_components/PromotionsStat/PromotionsStat";
import CreatePromotionalModal from "./_components/CreatePromotionalModal/CreatePromotionalModal";
import img1 from "@/assets/garage-admin/ads-promotions/promotions_img_1.jpg";
import img2 from "@/assets/garage-admin/ads-promotions/promotions_img_2.jpg";

const stats = [
  {
    title: "Free Listings Used",
    value: "2 / 2",
    subtitle: "0 remaining",
    icon: Gift,
    color: "text-blue-600",
  },
  {
    title: "Active Ads",
    value: "2",
    subtitle: "Currently running",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Pending Approval",
    value: "1",
    subtitle: "Awaiting review",
    icon: Clock,
    color: "text-[#D08700]",
  },
];

const promotionalAds = [
  {
    id: 1,
    title: "SpeedPro Garage Dubai - Brake Service Special",
    image: img1,
    status: "Active" as const,
    category: "Garage Service",
    isFree: true,
    description:
      "Get 20% off on brake pad replacement at SpeedPro Garage! Expert mechanics, parts, same-day service.",
    location: "Dubai Marina",
    dateRange: "25/10/2025 - 15/11/2025",
  },
  {
    id: 2,
    title: "SpeedPro Garage Dubai - Brake Service Special",
    image: img2,
    status: "Active" as const,
    category: "Garage Service",
    isFree: true,
    description:
      "Get 20% off on brake pad replacement at SpeedPro Garage! Expert mechanics, parts, same-day service.",
    location: "Dubai Marina",
    dateRange: "25/10/2025 - 15/11/2025",
  },
];

export default function AdsPromotionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">

      <PromotionsStat stats={stats} />
    

      <Card className="bg-[#EFF6FF] border-[#BEDBFF] shadow-none">
        <CardContent className="">
          <p className="text-sm font-bold text-blue-900 mb-1">
            Promotional Pricing:
          </p>
          <p className="text-sm text-blue-800">
            You get 2 free promotional listings. Additional listings cost 20 AED
            each. All free listings used. New ads will require payment.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between py-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">Promotional Ads</h2>
          <p className="text-sm text-gray-500">
            Manage your featured promotions and special offers
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2 text-white" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Create New Ad
        </Button>
      </div>

      <div className="space-y-4">
        {promotionalAds.map((ad) => (
          <PromotionalAdCard key={ad.id} {...ad} />
        ))}
      </div>

      <CreatePromotionalModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
