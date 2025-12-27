import { Badge } from "@/components/ui/badge";

interface GarageCardProps {
  garage: any;
  onClick: () => void;
}

export function GarageCard({ garage, onClick }: GarageCardProps) {
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
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {garage.name}
          </h3>
          <Badge className={getStatusColor()}>
            {garage.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          📍 {garage.city}, {garage.emirate}
        </p>
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
