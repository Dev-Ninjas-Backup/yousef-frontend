import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  iconColor: string;
  bgColor: string;
  trend?: { icon: LucideIcon; color: string };
}

export function StatsCard({
  icon: Icon,
  value,
  label,
  bgColor,
  trend,
}: StatsCardProps) {
  const TrendIcon = trend?.icon;

  const cardBgMap: Record<string, string> = {
    "bg-blue-50": "bg-blue-50",
    "bg-green-50": "bg-green-50",
    "bg-yellow-50": "bg-yellow-50",
    "bg-purple-50": "bg-purple-50",
  };

  const iconBgMap: Record<string, string> = {
    "bg-blue-50": "bg-blue-600",
    "bg-green-50": "bg-green-600",
    "bg-yellow-50": "bg-yellow-600",
    "bg-purple-50": "bg-purple-600",
  };

  const trendIconMap: Record<string, string> = {
    "bg-blue-50": "text-blue-600",
    "bg-green-50": "text-green-600",
    "bg-yellow-50": "text-yellow-600",
    "bg-purple-50": "text-purple-600",
  };

  return (
    <Card
      className={`p-6 relative overflow-hidden ${
        cardBgMap[bgColor] || bgColor
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`${iconBgMap[bgColor] || bgColor} p-3 rounded-lg`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        {TrendIcon && (
          <TrendIcon
            className={`${trendIconMap[bgColor] || trend.color} w-5 h-5`}
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </Card>
  );
}
