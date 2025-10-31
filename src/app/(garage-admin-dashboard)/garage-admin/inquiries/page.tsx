"use client";

import InquiryCard from "./_components/InquiryCard/InquiryCard";

const inquiries = [
  {
    id: 1,
    title: "Brake Pad Set - Front",
    date: "2025-10-24",
    customer: "Ahmed Hassan",
    message: "Is this compatible with Mercedes E-Class 2020?",
    status: "New",
    replied: false,
  },
  {
    id: 2,
    title: "Engine Oil Filter",
    date: "2025-10-23",
    customer: "Mohammed Ali",
    message: "Do you have bulk pricing for 10+ units?",
    status: "Replied",
    replied: true,
  },
];

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Customer Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">Manage customer messages and inquiries</p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} {...inquiry} />
        ))}
      </div>
    </div>
  );
}