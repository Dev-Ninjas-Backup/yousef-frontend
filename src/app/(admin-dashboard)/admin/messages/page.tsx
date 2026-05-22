"use client";

import {
  useGetAdminContactByIdQuery,
  useGetAdminContactsQuery,
  useReplyAdminMessageMutation,
} from "@/store/fetures/admin.meaasge.api";
import { useEffect, useState } from "react";
import { LuSearch, LuSend } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Bell, Info, Package, UserPlus, Sparkles, MessageSquare, Tag, AlertCircle } from "lucide-react";

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
  makeasClosed?: boolean;
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
  garageOwnerId?: string | null;
}

const formatSubject = (subject: string | null | undefined) => {
  if (!subject) return "";
  return subject
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const userId = user?.id || "guest";

  const [activeTab, setActiveTab] = useState<"customer" | "garage" | "system">("customer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("All Time");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [systemNotifications, setSystemNotifications] = useState<any[]>([]);

  const limit = 50; // Use larger page size for local filtering

  // Sync tab from URL query parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "customer" || tab === "garage" || tab === "system") {
        setActiveTab(tab);
      }
    }
  }, []);

  // Fetch notifications from local storage
  useEffect(() => {
    const saved = localStorage.getItem(`sayarahub_notifications_${userId}`);
    if (saved) {
      setSystemNotifications(JSON.parse(saved));
    }
  }, [userId, activeTab]);

  const { data, isLoading } = useGetAdminContactsQuery({
    page,
    limit,
  });

  const { data: singleMessage } = useGetAdminContactByIdQuery(selectedId!, {
    skip: !selectedId || activeTab === "system",
  });

  const [replyAdminMessage, { isLoading: isReplying }] = useReplyAdminMessageMutation();

  useEffect(() => {
    setSelectedId(null);
  }, [page, activeTab]);

  const messages: UIMessage[] =
    data?.data.map((item) => ({
      id: item.id,
      sender: `${item.FirstName} ${item.LastName}`,
      subject: item.subject,
      preview: item.message,
      date: new Date(item.createdAt).toLocaleDateString(),
      isUnread: !item.makeasClosed,
      garageOwnerId: item.garageOwnerId,
    })) ?? [];

  // Filter contacts (Customer/Garage messages)
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (dateFilter !== "All Time") {
      const originalItem = data?.data.find((item) => item.id === m.id);
      if (originalItem) {
        const msgDate = new Date(originalItem.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - msgDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (dateFilter === "Today" && diffDays > 1) return false;
        if (dateFilter === "This Week" && diffDays > 7) return false;
        if (dateFilter === "This Month" && diffDays > 30) return false;
        if (dateFilter === "This Year" && diffDays > 365) return false;
      }
    }
    return true;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const aItem = data?.data.find((item) => item.id === a.id);
    const bItem = data?.data.find((item) => item.id === b.id);
    if (!aItem || !bItem) return 0;
    const aTime = new Date(aItem.createdAt).getTime();
    const bTime = new Date(bItem.createdAt).getTime();
    return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
  });

  // Filtered Lists by Tab
  const customerInquiries = sortedMessages.filter((m) => !m.garageOwnerId);
  const businessMessages = sortedMessages.filter((m) => !!m.garageOwnerId);

  // Filter system notifications
  const filteredSystemNotifications = systemNotifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.type.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (dateFilter !== "All Time") {
      const msgDate = new Date(n.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - msgDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "Today" && diffDays > 1) return false;
      if (dateFilter === "This Week" && diffDays > 7) return false;
      if (dateFilter === "This Month" && diffDays > 30) return false;
      if (dateFilter === "This Year" && diffDays > 365) return false;
    }
    return true;
  });

  const sortedSystemNotifications = [...filteredSystemNotifications].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
  });

  // Automatically select first item on tab or data change
  useEffect(() => {
    if (activeTab === "customer" && customerInquiries.length > 0 && !selectedId) {
      setSelectedId(customerInquiries[0].id);
    } else if (activeTab === "garage" && businessMessages.length > 0 && !selectedId) {
      setSelectedId(businessMessages[0].id);
    } else if (activeTab === "system" && sortedSystemNotifications.length > 0 && !selectedId) {
      setSelectedId(sortedSystemNotifications[0].id);
    }
  }, [activeTab, customerInquiries, businessMessages, sortedSystemNotifications, selectedId]);

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

  const getSystemIcon = (type: string) => {
    switch (type) {
      case "CustomerInquiryAlert":
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case "ProductApproveUpdate":
        return <Package className="w-5 h-5 text-green-600" />;
      case "UserRegistration":
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  const selectedSystemNotification = sortedSystemNotifications.find((n) => n.id === selectedId);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages & Support</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer inquiries, business messages, and view system alerts
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-2 rounded-t-xl">
        <button
          onClick={() => {
            setActiveTab("customer");
            setSelectedId(null);
          }}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all duration-200 ${
            activeTab === "customer"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <span>Customer Inquiries</span>
          <span className="bg-red-100 text-[#FF3B30] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider scale-95 origin-left">
            Prioritized
          </span>
          {customerInquiries.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {customerInquiries.length}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("garage");
            setSelectedId(null);
          }}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all duration-200 ${
            activeTab === "garage"
              ? "border-purple-600 text-purple-600 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <span>Garage Messages</span>
          {businessMessages.length > 0 && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {businessMessages.length}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("system");
            setSelectedId(null);
          }}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all duration-200 ${
            activeTab === "system"
              ? "border-gray-800 text-gray-800 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <span>System Alerts</span>
          {sortedSystemNotifications.length > 0 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {sortedSystemNotifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="bg-white rounded-xl border flex flex-col h-[650px] shadow-sm overflow-hidden">
          {/* Search & Filters */}
          <div className="p-4 border-b space-y-3 bg-gray-50/50">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab} messages...`}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setPage(1);
                }}
                title="Filter by date received"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="All Time">All Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
                title="Sort order"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {isLoading && (
              <div className="p-8 text-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mx-auto mb-2" />
                Loading messages…
              </div>
            )}

            {activeTab === "customer" &&
              customerInquiries.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 flex flex-col gap-1 transition-all ${
                    selectedId === m.id
                      ? "bg-blue-50/70 border-l-4 border-blue-600 pl-3"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-gray-900 truncate">{m.sender}</h3>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">{m.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-blue-500" />
                    <p className="text-xs font-semibold text-blue-600 truncate">{formatSubject(m.subject)}</p>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1 mt-1 leading-normal">
                    {m.preview}
                  </p>
                </button>
              ))}

            {activeTab === "garage" &&
              businessMessages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 flex flex-col gap-1 transition-all ${
                    selectedId === m.id
                      ? "bg-purple-50/70 border-l-4 border-purple-600 pl-3"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-gray-900 truncate">{m.sender}</h3>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">{m.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-purple-500" />
                    <p className="text-xs font-semibold text-purple-600 truncate">{formatSubject(m.subject)}</p>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1 mt-1 leading-normal">
                    {m.preview}
                  </p>
                </button>
              ))}

            {activeTab === "system" &&
              sortedSystemNotifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 flex items-start gap-3 transition-all ${
                    selectedId === n.id
                      ? "bg-gray-100 border-l-4 border-gray-800 pl-3 font-semibold"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="mt-0.5 shrink-0 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                    {getSystemIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-xs text-gray-950 truncate leading-snug">{n.title}</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 font-medium">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {n.type}
                    </span>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1.5 leading-normal">
                      {n.message}
                    </p>
                  </div>
                </button>
              ))}

            {!isLoading && activeTab === "customer" && customerInquiries.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No customer inquiries found</p>
              </div>
            )}

            {!isLoading && activeTab === "garage" && businessMessages.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No garage messages found</p>
              </div>
            )}

            {!isLoading && activeTab === "system" && sortedSystemNotifications.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No system alerts found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden min-h-[650px]">
          {activeTab !== "system" && singleMessage ? (
            <div className="flex flex-col h-full bg-slate-50/10">
              <div className="p-6 border-b bg-white">
                <div className="flex items-center gap-2 mb-2">
                  {activeTab === "customer" ? (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                      Customer Inquiry
                    </span>
                  ) : (
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                      Garage Message
                    </span>
                  )}
                  {singleMessage.data.makeasClosed && (
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Closed
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {formatSubject(singleMessage.data.subject)}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">From:</span> {singleMessage.data.FirstName} {singleMessage.data.LastName}
                    <span className="text-gray-400 mx-2">|</span>
                    <span className="text-blue-600 hover:underline">{singleMessage.data.email}</span>
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    {new Date(singleMessage.data.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-white m-6 rounded-xl border border-gray-200/60 shadow-sm leading-relaxed text-gray-700 text-sm whitespace-pre-wrap">
                {singleMessage.data.message}
              </div>

              <div className="border-t p-6 bg-white space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Type your reply..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-inner"
                />
                <div className="flex justify-end">
                  <button
                    disabled={!replyText.trim() || isReplying}
                    onClick={handleSendReply}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50 transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    <LuSend size={15} />
                    {isReplying ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "system" && selectedSystemNotification ? (
            <div className="flex flex-col h-full bg-slate-50/10">
              <div className="p-6 border-b bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    System Alert Log
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {selectedSystemNotification.type}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {selectedSystemNotification.title}
                </h2>
                <p className="text-xs text-gray-400 mt-2 font-medium">
                  Received: {new Date(selectedSystemNotification.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-white m-6 rounded-xl border border-gray-200/60 shadow-sm leading-relaxed text-gray-700 text-sm whitespace-pre-wrap">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message Body</h4>
                {selectedSystemNotification.message}
              </div>

              {selectedSystemNotification.link && (
                <div className="border-t p-6 bg-white flex justify-end">
                  <button
                    onClick={() => router.push(selectedSystemNotification.link)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    <Sparkles size={16} />
                    Go to Target Section
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-dashed flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium">Select a message or system alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
