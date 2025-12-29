import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { promotionalAdApi } from "@/store/api/garageAdminApis/promotionalAd/promotionalAd";
import { Clock, Gift, LucideIcon, TrendingUp } from "lucide-react";
import React from "react";

interface PromotionsStatProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

const PromotionsStat = () => {
  const { data: promotinalStast, isLoading: promotionalStatsLoading } =
    promotionalAdApi.useGetPromotionalAdStatsQuery();
  const stats = [
    {
      title: "Free Listings Used",
      value: promotinalStast?.freeListingUsed,
      subtitle: "0 remaining",
      icon: Gift,
      color: "text-blue-600",
    },
    {
      title: "Active Ads",
      value: promotinalStast?.activeAds,
      subtitle: "Currently running",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Pending Approval",
      value: promotinalStast?.pendingApproval,
      subtitle: "Awaiting review",
      icon: Clock,
      color: "text-[#D08700]",
    },
  ];
  if (promotionalStatsLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-none">
          <CardContent className="">
            <div className="flex flex-col gap-2 ">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-base font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromotionsStat;
