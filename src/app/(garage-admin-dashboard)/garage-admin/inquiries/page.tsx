"use client";

import { InquiryCard } from "./_components/InquiryCard";
import { EmptyInquiriesState } from "./_components/EmptyInquiriesState";
import { useGetCustomInquiriesQuery } from "@/store/api/garageAdminApis/myGarage/garageInquiryApi";

export default function InquiriesPage() {
  const { data, error, isLoading } = useGetCustomInquiriesQuery();
  const inquiries = data || [];

  const handleMarkClosed = (id: string) => {
    console.log("Mark as closed:", id);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Error loading inquiries. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-50 rounded-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Customer Inquiries
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage customer messages and inquiries ({inquiries.length})
          </p>
        </div>

        {inquiries.length === 0 ? (
          <EmptyInquiriesState />
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                onMarkClosed={handleMarkClosed}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
