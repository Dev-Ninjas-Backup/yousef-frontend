import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface PromotionsStatProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

const PromotionsStat = ({ stats }: { stats: PromotionsStatProps[] }) => {
  return  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
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
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.subtitle}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>;
};

export default PromotionsStat;
