import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import RecentListingParts from "@/assets/garage-admin/dashboard/recent-listing/recent_listing_parts.jpg";
import Image from "next/image";

export function RecentListings() {
  const listings = [
    {
      id: 1,
      name: "Brake Pad Set - Front",
      category: "Brembo • Brakes",
      price: "AED 450",
      status: "Approved",
      icon: CheckCircle,
    },
    {
      id: 2,
      name: "Engine Oil Filter",
      category: "Mann • Engine",
      price: "AED 85",
      status: "Approved",
      icon: CheckCircle,
    },
    {
      id: 3,
      name: "Air Suspension Compressor",
      category: "AMK • Suspension",
      price: "AED 1250",
      status: "Pending",
      icon: Clock,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Listings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image
                  src={RecentListingParts}
                  alt={listing.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">
                  {listing.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {listing.category}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                {listing.price}
              </span>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  listing.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <listing.icon className="w-3 h-3" />
                <span>{listing.status}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
