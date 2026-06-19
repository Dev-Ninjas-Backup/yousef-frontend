import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GarageCardProps {
  garage: any;
  onClick: () => void;
}

export function GarageCard({ garage, onClick }: GarageCardProps) {
  const totalReviews = garage.reviews?.length || 0;
  const averageRating = totalReviews > 0
    ? garage.reviews.reduce((sum: number, r: any) => sum + r.overallExperience, 0) / totalReviews
    : 0;

  const getStatusColor = () => {
    switch (garage.status) {
      case "APPROVE":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-gray-200">
        <img
          src={garage.coverPhoto}
          alt={garage.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-semibold text-base text-gray-900 truncate">
            {garage.name}
          </h3>
          <Badge className={getStatusColor()}>
            {garage.status}
          </Badge>
        </div>
        
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-slate-800">{averageRating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({totalReviews} reviews)</span>
          </div>
          <span className="text-slate-200 text-xs">•</span>
          <span className="text-slate-500 text-xs">
            📍 {garage.city}, {garage.emirate}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">
          {garage.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {garage.services.slice(0, 3).map((service: string) => (
            <span
              key={service}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {service}
            </span>
          ))}
          {garage.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{garage.services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
