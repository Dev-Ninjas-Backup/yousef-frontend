"use client";

import MessageCard from "./_components/MessageCard/MessageCard";

const messages = [
  {
    id: 1,
    title: "Product Listing Approved",
    date: "2025-10-24",
    sender: "Platform Admin",
    message: 'Your product "Brake Pad Set - Front" has been approved and is now live on the platform.',
    senderType: "Admin" as const,
    isUnread: true,
  },
  {
    id: 2,
    title: "Product Inquiry",
    date: "2025-10-23",
    sender: "Ahmed Hassan",
    message: "I am interested in purchasing the brake pads. Can we discuss pricing?",
    senderType: "Customer" as const,
    isUnread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-lg">
      <div>
        <h1 className="text-xl  text-gray-900">Messages & Notifications</h1>
        <p className="text-base text-gray-500 mt-1">View messages from customers and admin</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <MessageCard key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
}
