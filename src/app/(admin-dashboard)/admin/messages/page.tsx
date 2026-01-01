"use client";

import {
  useGetAdminContactByIdQuery,
  useGetAdminContactsQuery,
  useReplyAdminMessageMutation,
} from "@/store/fetures/admin.meaasge.api";
import { useEffect, useState } from "react";
import { LuSearch, LuPlus, LuSend } from "react-icons/lu";
import { toast } from "react-toastify";


export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface AdminContact {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  subject: string;
  message: string;
  othersubject?: string | null;
  createdAt: string;
  updatedAt: string;
  garageOwnerId?: string | null;
}

export interface AdminContactsResponse {
  success: boolean;
  message: string;
  data: AdminContact[];
  meta: PaginationMeta;
}

interface UIMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  isUnread: boolean;
}


export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);

  const limit = 2;


  const { data, isLoading } = useGetAdminContactsQuery({
    page,
    limit,
  });

  const total = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const { data: singleMessage } = useGetAdminContactByIdQuery(selectedId!, {
    skip: !selectedId,
  });

  const [replyAdminMessage, { isLoading: isReplying }] =
    useReplyAdminMessageMutation();


  useEffect(() => {
    setSelectedId(null);
  }, [page]);

  const messages: UIMessage[] =
    data?.data.map((item) => ({
      id: item.id,
      sender: `${item.FirstName} ${item.LastName}`,
      subject: item.subject,
      preview: item.message,
      date: new Date(item.createdAt).toLocaleDateString(),
      isUnread: true,
    })) ?? [];

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (filteredMessages.length && !selectedId) {
      setSelectedId(filteredMessages[0].id);
    }
  }, [filteredMessages, selectedId]);


  const handleSendReply = async () => {
    if (!selectedId || !replyText.trim()) return;

    try {
      const res = await replyAdminMessage({
        contactId: selectedId,
        content: replyText,
      }).unwrap();

      toast.success(res.message || "Reply sent successfully");
      setReplyText("");
    } catch (err: unknown) {
      toast.error("Failed to send reply");
    }
  };

  const handleNewMessage = () => {
    toast.info("New message flow not implemented yet");
  };


  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Messages & Support</h1>
          <p className="text-sm text-gray-500">
            View and respond to messages from users and partners
          </p>
        </div>
        <button
          onClick={handleNewMessage}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg"
        >
          <LuPlus size={16} />
          New Message
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
       {/* Left List */}
<div className="bg-white rounded-xl border flex flex-col h-[600px]">
  {/* Search */}
  <div className="p-4 border-b">
    <div className="relative">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search messages..."
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm"
      />
    </div>
  </div>

  {/* Messages List */}
  <div className="flex-1 overflow-y-auto divide-y">
    {isLoading && (
      <p className="p-4 text-sm text-gray-500">Loading messages…</p>
    )}

    {filteredMessages.map((m) => (
      <button
        key={m.id}
        onClick={() => setSelectedId(m.id)}
        className={`w-full text-left p-4 hover:bg-gray-50 ${
          selectedId === m.id ? "bg-blue-50" : ""
        }`}
      >
        <h3 className="font-semibold text-sm">{m.sender}</h3>
        <p className="text-sm text-gray-700">{m.subject}</p>
        <p className="text-xs text-gray-500 line-clamp-1">{m.preview}</p>
        <p className="text-xs text-gray-400 mt-1">{m.date}</p>
      </button>
    ))}

    {!isLoading && filteredMessages.length === 0 && (
      <p className="p-6 text-center text-sm text-gray-500">
        No messages found
      </p>
    )}
  </div>

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-3 py-1.5 text-sm border rounded disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1.5 text-sm border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )}
</div>



        {/* Right Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border">
          {singleMessage ? (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {singleMessage.data.subject}
                </h2>
                <p className="text-sm text-gray-500">
                  From: {singleMessage.data.FirstName}{" "}
                  {singleMessage.data.LastName}
                </p>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap">
                  {singleMessage.data.message}
                </p>
              </div>

              <div className="border-t p-6">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Type your reply..."
                  className="w-full p-3 bg-gray-50 border rounded-lg text-sm"
                />
                <button
                  disabled={!replyText.trim() || isReplying}
                  onClick={handleSendReply}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  <LuSend size={16} />
                  {isReplying ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
        
    </div>
  );
}
