"use client";

import { useGetApprovedProductsQuery } from "@/store/api/garageAdminApis/notifications/notifications";
import MessageCard from "./_components/MessageCard/MessageCard";

export default function MessagesPage() {
  const { data: products, isLoading, error } = useGetApprovedProductsQuery();

  if (isLoading) {
    return (
      <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-lg">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Failed to load notifications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-lg">
      <div>
        <h1 className="text-xl text-gray-900">Messages & Notifications</h1>
        <p className="text-base text-gray-500 mt-1">
          View approved products and notifications ({products?.length || 0})
        </p>
      </div>

      {products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products?.map((product) => (
            <MessageCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
