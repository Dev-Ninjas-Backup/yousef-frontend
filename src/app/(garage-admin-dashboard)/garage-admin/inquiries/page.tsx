"use client";

import { useState } from "react";
import { InquiryCard } from "./_components/InquiryCard";
import { EmptyInquiriesState } from "./_components/EmptyInquiriesState";

const mockInquiries = [
  {
    id: "1",
    productName: "Brake Pad Set - Front",
    date: "2025-10-24",
    status: "New" as const,
    customerName: "Ahmed Hassan",
    phone: "+971 50 234 5678",
    email: "ahmed@example.com",
    message: "Is this compatible with Mercedes E-Class 2020?",
  },
  {
    id: "2",
    productName: "Engine Oil Filter",
    date: "2025-10-23",
    status: "Replied" as const,
    customerName: "Mohammed Ali",
    phone: "+971 55 345 6789",
    email: "mohammed@example.com",
    message: "Do you have bulk pricing for 10+ units?",
  },
];

export default function InquiriesPage() {
  const [inquiries] = useState(mockInquiries);

  const handleReply = (id: string) => {
    console.log("Reply to inquiry:", id);
  };

  const handleMarkClosed = (id: string) => {
    console.log("Mark as closed:", id);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-md">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Customer Inquiries</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage customer messages and inquiries
        </p>
      </div>

      {/* Inquiries List */}
      {inquiries.length > 0 ? (
        <div className="space-y-4 ">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onReply={handleReply}
              onMarkClosed={handleMarkClosed}
            />
          ))}
        </div>
      ) : (
        <EmptyInquiriesState />
      )}
    </div>
  );
}
