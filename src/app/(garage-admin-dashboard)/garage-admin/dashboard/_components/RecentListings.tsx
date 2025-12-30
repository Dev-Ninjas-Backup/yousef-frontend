"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import RecentListingParts from "@/assets/garage-admin/dashboard/recent-listing/recent_listing_parts.jpg";
import Image from "next/image";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";

export function RecentListings() {
  const { data, isLoading } = overView.useGetRecentListingsQuery();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "APPROVED":
        return { icon: CheckCircle, label: "Approved", className: "bg-green-100 text-green-700" };
      case "PENDING":
        return { icon: Clock, label: "Pending", className: "bg-yellow-100 text-yellow-700" };
      case "REJECTED":
        return { icon: XCircle, label: "Rejected", className: "bg-red-100 text-red-700" };
      default:
        return { icon: Clock, label: status, className: "bg-gray-100 text-gray-700" };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Listings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((listing) => {
            const statusConfig = getStatusConfig(listing.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div
                key={listing.id}
                className="flex items-center justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                    <Image
                      src={listing.photos[0] || RecentListingParts}
                      alt={listing.partName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      {listing.partName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {listing.brand} • {listing.category.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                    {listing.price}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusConfig.className}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{statusConfig.label}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No recent listings</p>
        )}
      </CardContent>
    </Card>
  );
}
