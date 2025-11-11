"use client";

import { useState } from "react";
import { LuSearch, LuPlus, LuSend } from "react-icons/lu";

// Types
interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  isUnread: boolean;
  fullMessage?: string;
  senderDetails?: string;
}

// Mock data
const messagesData: Message[] = [
  {
    id: "1",
    sender: "QuickFix Auto Service",
    subject: "New Garage Registration",
    preview: "We would like to register our garage on your...",
    date: "2025-10-24",
    isUnread: true,
    senderDetails: "From: QuickFix Auto Service • October 24, 2025",
    fullMessage: `Hello Admin,

We would like to register our garage, QuickFix Auto Service, on your platform. We have been operating in San Diego for over 10 years and offer a full range of automotive services including repairs, maintenance, and diagnostics.

We look forward to partnering with your platform and serving your customers.

Best regards,
Sarah Johnson
Owner, QuickFix Auto Service`,
  },
  {
    id: "2",
    sender: "John Doe",
    subject: "Buying issue",
    preview: "I am facing an issue while buy a aparts.",
    date: "2025-10-23",
    isUnread: true,
    senderDetails: "From: John Doe • October 23, 2025",
    fullMessage: `Hello Admin,

I am facing an issue while buy a aparts.

Please help me resolve this issue.

Thanks,
John Doe`,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages] = useState<Message[]>(messagesData);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    messages[0]
  );
  const [replyText, setReplyText] = useState("");

  // Filter messages based on search
  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReply = () => {
    console.log("Sending reply:", replyText);
    setReplyText("");
    // Add send logic here
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", replyText);
    // Add save draft logic here
  };

  const handleNewMessage = () => {
    console.log("Creating new message...");
    // Add new message logic here
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Messages & Support
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and respond to messages from users and partners
          </p>
        </div>
        <button
          onClick={handleNewMessage}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuPlus className="w-4 h-4" />
          New Message
        </button>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Messages List - Left Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Messages List */}
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === message.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {message.sender}
                    </h3>
                    {message.isUnread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0"></span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                  {message.preview}
                </p>
                <p className="text-xs text-gray-400">{message.date}</p>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredMessages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-sm">No messages found</p>
            </div>
          )}
        </div>

        {/* Message Detail - Right Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Message Header */}
              <div className="p-5 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedMessage.senderDetails}
                </p>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-5 sm:p-6 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.fullMessage}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t border-gray-100 p-5 sm:p-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LuSend className="w-4 h-4" />
                    Send Reply
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    Save Draft
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500 text-sm">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}