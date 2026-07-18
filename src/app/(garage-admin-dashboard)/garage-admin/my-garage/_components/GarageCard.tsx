import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GarageCardProps {
  garage: any;
  onClick: () => void;
}

import { useState } from "react";

const DefaultCoverPhoto = ({ name }: { name: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex flex-col items-center justify-center relative overflow-hidden p-6 text-white select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-30" />
    <svg className="w-12 h-12 mb-1.5 opacity-90 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 0l-5.25 1.91-5.25-1.91L5.25 3m12 0v12.75M12.75 5.818V10.75M12.75 10.75H20.25M9 10.75H3.75M9 10.75V21M3.75 10.75V21" />
    </svg>
    <span className="font-extrabold tracking-wider text-sm relative z-10 uppercase drop-shadow-md text-center max-w-full truncate px-2">
      {name}
    </span>
    <span className="text-[9px] opacity-75 uppercase tracking-widest mt-0.5 relative z-10 font-medium">
      SayaraHub Partner
    </span>
  </div>
);

export function GarageCard({ garage, onClick }: GarageCardProps) {
  const [imgError, setImgError] = useState(false);
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
        {(!garage.coverPhoto || imgError) ? (
          <DefaultCoverPhoto name={garage.name} />
        ) : (
          <img
            src={garage.coverPhoto}
            alt={garage.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}
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
