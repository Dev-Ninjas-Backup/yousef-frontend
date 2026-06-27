"use client";

import {
  useGetAdminContactByIdQuery,
  useGetAdminContactsQuery,
  useReplyAdminMessageMutation,
} from "@/store/fetures/admin.meaasge.api";
import React, { useEffect, useState, useRef } from "react";
import { LuSearch, LuSend, LuPaperclip, LuX } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Bell,
  Info,
  Package,
  UserPlus,
  Sparkles,
  MessageSquare,
  Tag,
  AlertCircle,
  Headphones,
  Send,
  Check,
  FileText,
} from "lucide-react";
import { useGetConversationsQuery } from "@/store/api/privateChatApi";
import { usePrivateChat } from "@/hooks/usePrivateChat";
import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";

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
  userId?: string | null;
  makeasClosed?: boolean;
  phone?: string | null;
  priceBeforeDiscount?: string | null;
  priceAfterDiscount?: string | null;
  attachment?: string | null;
  messages?: {
    id: string;
    contactId: string;
    isFromAdmin: boolean;
    isForGrageAdmin: boolean;
    content: string;
    createdAt: string;
  }[];
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
  userId?: string | null;
}

const formatSubject = (subject: string | null | undefined) => {
  if (!subject) return "";
  return subject
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ─── Live Messages Chat Panel ─────────────────────────────────────────────────
function LiveMessagesPanel() {
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const [selectedConvParticipantId, setSelectedConvParticipantId] = useState<string | null>(null);
  const [selectedConvName, setSelectedConvName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: conversations, isLoading: convsLoading, refetch: refetchConversations } =
    useGetConversationsQuery(undefined, { pollingInterval: 15000 });

  // Find the conversation ID for selected participant
  const currentConversation = conversations?.find(
    (conv) => conv.participant.id === selectedConvParticipantId
  );

  const {
    socket,
    messages: socketMessages,
    sendMessage,
    markAsRead,
    handleTyping,
    stopTyping,
    isConnected,
    getUserStatus,
    getTypingUsers,
  } = usePrivateChat(
    currentConversation?.chatId || null,
    selectedConvParticipantId || undefined
  );

  // Listen for new socket events to refetch
  useEffect(() => {
    if (socket) {
      socket.on("private:new_message", () => refetchConversations());
      socket.on("private:message_read", () => refetchConversations());
      return () => {
        socket.off("private:new_message");
        socket.off("private:message_read");
      };
    }
  }, [socket, refetchConversations]);

  // Query online statuses
  useEffect(() => {
    if (socket && conversations && conversations.length > 0) {
      conversations.forEach((conv) => {
        socket.emit("private:get_user_status", conv.participant.id);
      });
    }
  }, [socket, conversations]);

  // Load messages from REST API when conversation changes
  useEffect(() => {
    if (!selectedConvParticipantId) return;
    setLocalMessages([]);

    if (!currentConversation?.chatId) return;
    const token = Cookies.get("token");
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/private-chat/${currentConversation.chatId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setLocalMessages(data.messages);
      })
      .catch(console.error);
  }, [selectedConvParticipantId, currentConversation?.chatId]);

  // Combine REST + socket messages
  const allMessages = (() => {
    const map = new Map();
    localMessages.forEach((m) => map.set(m.id, m));
    socketMessages.forEach((m) => {
      const belongs =
        selectedConvParticipantId &&
        ((m.senderId === currentUserId && m.recipientId === selectedConvParticipantId) ||
          (m.senderId === selectedConvParticipantId && m.recipientId === currentUserId) ||
          (m as any).conversationId === currentConversation?.chatId);
      if (belongs) {
        const existing = map.get(m.id);
        if (!existing || m.isRead !== existing.isRead) map.set(m.id, m);
      }
    });
    return Array.from(map.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  })();

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  // Mark unread as read
  useEffect(() => {
    if (selectedConvParticipantId && allMessages.length > 0) {
      allMessages
        .filter((m) => m.senderId !== currentUserId && !m.isRead)
        .forEach((m) => markAsRead(m.id));
    }
  }, [selectedConvParticipantId, allMessages, currentUserId, markAsRead]);

  const handleSendLiveMessage = async () => {
    if (!liveMessage.trim() || !selectedConvParticipantId) return;
    setIsUploading(true);
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      formData.append("content", liveMessage.trim());
      formData.append("recipientId", selectedConvParticipantId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/private-chat/send-message/${selectedConvParticipantId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success && data.message) {
        setLocalMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      console.error("Send failed:", err);
    } finally {
      setIsUploading(false);
      setLiveMessage("");
      stopTyping();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const isOnline = selectedConvParticipantId
    ? getUserStatus(selectedConvParticipantId)?.isOnline ?? false
    : false;
  const typingUsers = getTypingUsers();

  const totalUnread = conversations?.reduce((sum, c) => sum + (c.unreadCount || 0), 0) ?? 0;

  const filteredConversations = conversations?.filter((c) =>
    c.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Conversation List */}
      <div className="bg-white rounded-xl border shadow-sm flex flex-col h-[650px] overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800">Live Messages</h3>
            {totalUnread > 0 && (
              <span className="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {totalUnread} new
              </span>
            )}
          </div>
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {convsLoading && (
            <div className="p-8 text-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mx-auto mb-2" />
              Loading conversations…
            </div>
          )}

          {!convsLoading && filteredConversations?.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm font-medium">No live support messages yet</p>
            </div>
          )}

          {filteredConversations
            ?.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .map((conv) => {
              const isSelected = conv.participant.id === selectedConvParticipantId;
              const online = getUserStatus(conv.participant.id)?.isOnline ?? false;
              return (
                <button
                  key={conv.chatId}
                  onClick={() => {
                    setSelectedConvParticipantId(conv.participant.id);
                    setSelectedConvName(conv.participant.fullName);
                  }}
                  className={`w-full text-left p-4 hover:bg-gray-50 flex items-center gap-3 transition-all ${
                    isSelected
                      ? "bg-green-50/70 border-l-4 border-green-600 pl-3"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="relative shrink-0">
                    {conv.participant.profilePhoto ? (
                      <img
                        src={conv.participant.profilePhoto}
                        alt={conv.participant.fullName}
                        className="w-11 h-11 rounded-full object-cover border border-gray-100"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                        {conv.participant.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                        {conv.participant.fullName}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${conv.unreadCount > 0 ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                      {getTypingUsers(conv.participant.id).length > 0 ? (
                        <span className="text-green-600 font-semibold animate-pulse">Typing...</span>
                      ) : (
                        conv.lastMessage?.content || "No messages yet"
                      )}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="shrink-0 min-w-[18px] h-[18px] px-1 bg-green-500 rounded-full text-[9px] font-black text-white flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* Right: Chat View */}
      <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden min-h-[650px] flex flex-col">
        {selectedConvParticipantId ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b bg-white flex items-center gap-3">
              <div className="relative">
                {conversations?.find((c) => c.participant.id === selectedConvParticipantId)?.participant.profilePhoto ? (
                  <img
                    src={conversations?.find((c) => c.participant.id === selectedConvParticipantId)?.participant.profilePhoto}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    alt={selectedConvName}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {selectedConvName.charAt(0).toUpperCase()}
                  </div>
                )}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{selectedConvName}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300"}`} />
                  {typingUsers.length > 0 ? (
                    <span className="text-green-600 font-semibold animate-pulse">Typing…</span>
                  ) : isOnline ? "Online" : "Offline"}
                </p>
              </div>
              <div className="ml-auto">
                <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                  Live Support
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-5 space-y-2">
              {allMessages.length === 0 && (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No messages yet. Start the conversation!
                </div>
              )}

              {allMessages.map((msg) => {
                const isMine = msg.senderId === currentUserId;
                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}
                  >
                    <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                      {!isMine && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {selectedConvName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            isMine
                              ? "bg-green-600 text-white rounded-br-sm"
                              : "bg-white text-gray-900 rounded-bl-sm shadow-sm border border-gray-100"
                          }`}
                        >
                          {msg.content && (
                            <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                          )}

                          {/* File attachments */}
                          {msg.files && msg.files.length > 0 && (
                            <div className={`${msg.content ? "mt-2" : ""} space-y-1`}>
                              {msg.files.map((fileUrl: string, idx: number) => {
                                const fileName = fileUrl.split("/").pop() || "file";
                                const isImg = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
                                return (
                                  <div key={idx}>
                                    {isImg ? (
                                      <div className="max-w-48 max-h-32 overflow-hidden rounded cursor-pointer">
                                        <img
                                          src={fileUrl}
                                          alt={fileName}
                                          className="w-full h-full object-cover"
                                          onClick={() => window.open(fileUrl, "_blank")}
                                        />
                                      </div>
                                    ) : (
                                      <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 p-2 rounded text-xs hover:opacity-80 transition-opacity ${
                                          isMine ? "bg-green-700" : "bg-gray-100 text-gray-700"
                                        }`}
                                      >
                                        <FileText className="w-4 h-4" />
                                        <span className="truncate max-w-32">{fileName}</span>
                                      </a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center gap-0.5 mt-0.5 px-1 ${isMine ? "justify-end" : "justify-start"}`}>
                          <span className="text-[10px] text-gray-400">{time}</span>
                          {isMine && (
                            <div className="flex items-center">
                              <Check className={`w-3 h-3 ${msg.isRead ? "text-green-500" : "text-gray-300"}`} />
                              {msg.isRead && <Check className="w-3 h-3 text-green-500 -ml-1" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {typingUsers.length > 0 && (
                <div className="flex justify-start mb-1">
                  <div className="flex items-end gap-2 max-w-[75%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {selectedConvName.charAt(0).toUpperCase()}
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4 bg-white">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  value={liveMessage}
                  onChange={(e) => {
                    setLiveMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendLiveMessage();
                    }
                  }}
                  placeholder="Type your reply…"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSendLiveMessage}
                  disabled={!liveMessage.trim() || isUploading}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50 transition-all duration-200 shadow-md shadow-green-500/20 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-dashed border-green-200 flex items-center justify-center mb-3">
              <Headphones className="w-8 h-8 text-green-300" />
            </div>
            <p className="text-sm font-semibold text-gray-600">Select a conversation</p>
            <p className="text-xs text-gray-400 mt-1 text-center max-w-xs">
              Choose a chat from the inbox list to read messages and communicate with your users or sellers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const userId = user?.id || "guest";

  const [activeTab, setActiveTab] = useState<"customer" | "garage" | "exclusive" | "system" | "live">("customer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("All Time");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [systemNotifications, setSystemNotifications] = useState<any[]>([]);

  const limit = 50;

  // Live messages unread count for tab badge
  const { data: conversationsData } = useGetConversationsQuery(undefined, {
    pollingInterval: 15000,
  });
  const liveUnreadCount = conversationsData
    ? conversationsData.reduce((sum, c) => sum + (c.unreadCount || 0), 0)
    : 0;

  // Sync tab from URL query parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "customer" || tab === "garage" || tab === "exclusive" || tab === "system" || tab === "live") {
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

  const { data, isLoading } = useGetAdminContactsQuery({ page, limit });

  const { data: singleMessage } = useGetAdminContactByIdQuery(selectedId!, {
    skip: !selectedId || activeTab === "system" || activeTab === "live",
  });

  const [replyAdminMessage, { isLoading: isReplying }] = useReplyAdminMessageMutation();

  useEffect(() => {
    setSelectedId(null);
  }, [page, activeTab]);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timeoutId);
  }, [singleMessage?.data?.messages, selectedId]);

  const messages: UIMessage[] =
    data?.data.map((item) => ({
      id: item.id,
      sender: `${item.FirstName} ${item.LastName}`,
      subject:
        item.subject === "LIMITED_TIME_OFFER"
          ? "Apply for Exclusive Offer"
          : item.subject === "OTHERS" && item.othersubject
          ? item.othersubject
          : item.subject,
      preview: item.message,
      date: new Date(item.createdAt).toLocaleDateString(),
      isUnread: !item.makeasClosed,
      garageOwnerId: item.garageOwnerId,
      userId: item.userId,
    })) ?? [];

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
        const diffDays = Math.ceil(
          Math.abs(now.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24)
        );
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

  const getSubjectType = (id: string) => {
    const original = data?.data.find((item) => item.id === id);
    return original?.subject;
  };

  const customerInquiries = sortedMessages.filter((m) => !m.garageOwnerId && getSubjectType(m.id) !== "LIMITED_TIME_OFFER");
  const businessMessages = sortedMessages.filter((m) => !!m.garageOwnerId && getSubjectType(m.id) !== "LIMITED_TIME_OFFER");
  const exclusiveOffers = sortedMessages.filter((m) => getSubjectType(m.id) === "LIMITED_TIME_OFFER");

  const filteredSystemNotifications = systemNotifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.type.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (dateFilter !== "All Time") {
      const msgDate = new Date(n.createdAt);
      const now = new Date();
      const diffDays = Math.ceil(
        Math.abs(now.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24)
      );
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
    if (!selectedId || (!replyText.trim() && !replyAttachment)) return;
    try {
      let attachmentUrl: string | undefined = undefined;
      if (replyAttachment) {
        setIsUploadingAttachment(true);
        const formData = new FormData();
        formData.append("file", replyAttachment);
        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/aws-file-upload-additional-all/upload-s3-additional`,
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadData = await uploadRes.json();
        if (uploadData && uploadData.file) {
          attachmentUrl = uploadData.file;
        } else {
          throw new Error("Upload failed");
        }
      }

      const res = await replyAdminMessage({
        contactId: selectedId,
        content: replyText,
        attachment: attachmentUrl,
      }).unwrap();

      toast.success(res.message || "Reply sent successfully");
      setReplyText("");
      setReplyAttachment(null);
    } catch {
      toast.error("Failed to send reply or upload attachment");
    } finally {
      setIsUploadingAttachment(false);
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
        {(
          [
            { key: "customer", label: "Customer Inquiries", badge: customerInquiries.length, color: "blue", extra: undefined as string | undefined, icon: undefined as React.ReactNode },
            { key: "garage", label: "Garage Messages", badge: businessMessages.length as number | null, color: "purple", extra: undefined as string | undefined, icon: undefined as React.ReactNode },
            { key: "exclusive", label: "Exclusive Offers", badge: exclusiveOffers.length as number | null, color: "orange", extra: undefined as string | undefined, icon: undefined as React.ReactNode },
            { key: "system", label: "System Alerts", badge: sortedSystemNotifications.length as number | null, color: "gray", extra: undefined as string | undefined, icon: undefined as React.ReactNode },
            { key: "live", label: "Live Messages", badge: liveUnreadCount > 0 ? liveUnreadCount : null as number | null, color: "green", extra: undefined as string | undefined, icon: <Headphones className="w-4 h-4" /> as React.ReactNode },
          ]
        ).map(({ key, label, badge, color, extra, icon }) => {
          const isActive = activeTab === key;
          const activeStyle =
            color === "blue"
              ? "border-blue-600 text-blue-600"
              : color === "purple"
              ? "border-purple-600 text-purple-600"
              : color === "green"
              ? "border-green-600 text-green-600"
              : color === "orange"
              ? "border-orange-500 text-orange-600"
              : "border-gray-800 text-gray-800";
          const badgeBg =
            color === "blue"
              ? "bg-blue-100 text-blue-800"
              : color === "purple"
              ? "bg-purple-100 text-purple-800"
              : color === "green"
              ? "bg-green-100 text-green-800"
              : color === "orange"
              ? "bg-orange-100 text-orange-850"
              : "bg-gray-100 text-gray-800";

          return (
            <button
              key={key}
              onClick={() => { setActiveTab(key as any); setSelectedId(null); }}
              className={`flex items-center gap-2 px-5 py-4 border-b-2 text-sm font-semibold transition-all duration-200 ${
                isActive ? `${activeStyle} font-bold` : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {icon}
              <span>{label}</span>
              {extra && (
                <span className="bg-red-100 text-[#FF3B30] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider scale-95 origin-left">
                  {extra}
                </span>
              )}
              {badge !== null && badge !== undefined && badge > 0 && (
                <span className={`${badgeBg} text-xs px-2 py-0.5 rounded-full font-bold`}>{badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Live Messages Tab */}
      {activeTab === "live" && <LiveMessagesPanel />}

      {/* Other Tabs: 2-col layout */}
      {activeTab !== "live" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left List */}
          <div className="bg-white rounded-xl border flex flex-col h-[650px] shadow-sm overflow-hidden">
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
                  onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
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
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>

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
                      <h3 className="font-bold text-sm text-gray-900 truncate flex items-center gap-1.5">
                        <span>{m.sender}</span>
                        {!m.userId && !m.garageOwnerId && (
                          <span className="bg-amber-100 text-amber-850 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase scale-90 origin-left">
                            Guest
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">{m.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-blue-500" />
                      <p className="text-xs font-semibold text-blue-600 truncate">{formatSubject(m.subject)}</p>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1 mt-1 leading-normal">{m.preview}</p>
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
                    <p className="text-xs text-gray-600 line-clamp-1 mt-1 leading-normal">{m.preview}</p>
                  </button>
                ))}

              {activeTab === "exclusive" &&
                exclusiveOffers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 flex flex-col gap-1 transition-all ${
                      selectedId === m.id
                        ? "bg-orange-50/70 border-l-4 border-orange-500 pl-3"
                        : "border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-gray-900 truncate flex items-center gap-1.5">
                        <span>{m.sender}</span>
                        {!m.userId && !m.garageOwnerId && (
                          <span className="bg-amber-100 text-amber-850 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase scale-90 origin-left">
                            Guest
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">{m.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-orange-500" />
                      <p className="text-xs font-semibold text-orange-600 truncate">{formatSubject(m.subject)}</p>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1 mt-1 leading-normal">{m.preview}</p>
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
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1.5 leading-normal">{n.message}</p>
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
              {!isLoading && activeTab === "exclusive" && exclusiveOffers.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">No exclusive offer requests found</p>
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
                    ) : activeTab === "exclusive" ? (
                      <span className="bg-orange-100 text-orange-850 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                        Exclusive Offer Request
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
                    {singleMessage.data.subject === "LIMITED_TIME_OFFER"
                      ? "Apply for Exclusive Offer"
                      : singleMessage.data.subject === "OTHERS" && singleMessage.data.othersubject
                      ? singleMessage.data.othersubject
                      : formatSubject(singleMessage.data.subject)}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-3">
                    <div className="text-sm text-gray-600 flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-gray-800">From:</span>{" "}
                      <span>{singleMessage.data.FirstName} {singleMessage.data.LastName}</span>
                      {!singleMessage.data.garageOwnerId && !singleMessage.data.userId && (
                        <span className="bg-amber-100 text-amber-850 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                          Guest User
                        </span>
                      )}
                      <span className="text-gray-400">|</span>
                      <span className="text-blue-600 hover:underline">{singleMessage.data.email}</span>
                      {singleMessage.data.phone && (
                        <>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-gray-700">Phone:</span>
                          <span className="text-gray-900">{singleMessage.data.phone}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      {new Date(singleMessage.data.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC] space-y-5 flex flex-col"
                >
                  <div className="flex items-start gap-3 max-w-[85%] self-start bg-white p-5 rounded-2xl rounded-tl-none border border-gray-150 shadow-sm w-full">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-gray-900">
                          {singleMessage.data.FirstName} {singleMessage.data.LastName}
                        </span>
                        {!singleMessage.data.garageOwnerId && !singleMessage.data.userId && (
                          <span className="bg-amber-100 text-amber-850 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                            Guest
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">
                          Original Ticket
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-1">
                        {singleMessage.data.message}
                      </p>
                      
                      {singleMessage.data.subject === "LIMITED_TIME_OFFER" && (
                        (singleMessage.data.priceBeforeDiscount || singleMessage.data.priceAfterDiscount) && (
                          <div className="mt-3 bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {singleMessage.data.priceBeforeDiscount && (
                                <div className="text-xs text-gray-500">
                                  Original: <span className="line-through font-semibold text-gray-700">{singleMessage.data.priceBeforeDiscount} AED</span>
                                </div>
                              )}
                              {singleMessage.data.priceBeforeDiscount && singleMessage.data.priceAfterDiscount && (
                                <div className="text-gray-300 text-xs">|</div>
                              )}
                              {singleMessage.data.priceAfterDiscount && (
                                <div className="text-xs text-gray-500">
                                  Discounted: <span className="font-extrabold text-green-600">{singleMessage.data.priceAfterDiscount} AED</span>
                                </div>
                              )}
                            </div>
                            {singleMessage.data.priceBeforeDiscount && singleMessage.data.priceAfterDiscount && (
                              <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded">
                                SAVE {Math.round(100 - (parseFloat(singleMessage.data.priceAfterDiscount) / parseFloat(singleMessage.data.priceBeforeDiscount)) * 100)}%
                              </span>
                            )}
                          </div>
                        )
                      )}

                      {singleMessage.data.attachment && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Image Attachment</p>
                          <a 
                            href={singleMessage.data.attachment} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block relative rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors shadow-xs group"
                          >
                            <img 
                              src={singleMessage.data.attachment} 
                              alt="Attachment Preview" 
                              className="max-h-[140px] max-w-[200px] object-cover group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                              View Full Size
                            </div>
                          </a>
                        </div>
                      )}

                      <p className="text-[10px] text-gray-400 pt-2 text-right">
                        {new Date(singleMessage.data.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {singleMessage.data.messages && singleMessage.data.messages.length > 0 && (
                    <>
                      {singleMessage.data.messages.map((reply: any, index: number) => {
                        const isReplyFromAdmin = reply.isFromAdmin;
                        return (
                          <div
                            key={reply.id || index}
                            className={`flex max-w-[85%] ${isReplyFromAdmin ? "self-end" : "self-start"}`}
                          >
                            <div
                              className={`p-5 rounded-2xl shadow-sm border text-sm leading-relaxed ${
                                isReplyFromAdmin
                                  ? "bg-blue-600 border-blue-600 text-white rounded-tr-none"
                                  : "bg-white border-gray-150 text-gray-800 rounded-tl-none"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-6 mb-1.5">
                                 <span className={`text-xs font-bold ${isReplyFromAdmin ? "text-blue-100" : "text-gray-900"}`}>
                                   {isReplyFromAdmin
                                     ? "Admin (You)"
                                     : `${singleMessage.data.FirstName} ${
                                         singleMessage.data.garageOwnerId
                                           ? "(Garage Owner)"
                                           : singleMessage.data.userId
                                           ? "(Car Owner)"
                                           : "(Guest)"
                                       }`}
                                 </span>
                              </div>
                              <p className="whitespace-pre-wrap">{reply.content}</p>
                              {reply.attachment && (
                                <div className={`mt-2.5 pt-2.5 border-t ${isReplyFromAdmin ? "border-blue-500/35" : "border-gray-150"}`}>
                                  <a 
                                    href={reply.attachment} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`inline-block relative rounded-lg overflow-hidden border hover:opacity-90 transition-opacity p-1 bg-white ${isReplyFromAdmin ? "border-blue-500" : "border-gray-200"}`}
                                  >
                                    <img 
                                      src={reply.attachment} 
                                      alt="Reply Attachment" 
                                      className="max-h-[120px] max-w-[180px] object-cover rounded"
                                    />
                                  </a>
                                </div>
                              )}
                              <p className={`text-[9px] mt-2 text-right ${isReplyFromAdmin ? "text-blue-200" : "text-gray-400"}`}>
                                {new Date(reply.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                <div className="border-t p-6 bg-white space-y-4">
                  {replyAttachment && (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 px-3 rounded-xl w-fit shadow-xs">
                      <LuPaperclip className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-xs font-semibold text-gray-700 truncate max-w-[200px]">
                        {replyAttachment.name}
                      </span>
                      <button
                        onClick={() => setReplyAttachment(null)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Remove file"
                      >
                        <LuX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Type your reply..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-inner"
                  />
                  
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <input
                        type="file"
                        id="reply-file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setReplyAttachment(e.target.files[0]);
                          }
                        }}
                      />
                      <label
                        htmlFor="reply-file-upload"
                        className="inline-flex items-center gap-2 cursor-pointer p-3 px-4 hover:bg-gray-50 border border-gray-200 rounded-xl transition-all text-xs font-bold text-gray-600 hover:border-gray-300 shadow-xs active:scale-[0.98]"
                      >
                        <LuPaperclip className="w-4 h-4 text-gray-400" />
                        Attach Image
                      </label>
                    </div>

                    <button
                      disabled={(!replyText.trim() && !replyAttachment) || isReplying || isUploadingAttachment}
                      onClick={handleSendReply}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50 transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                      {isReplying || isUploadingAttachment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isUploadingAttachment ? "Uploading..." : "Sending..."}</span>
                        </>
                      ) : (
                        <>
                          <LuSend size={15} />
                          <span>Send Reply</span>
                        </>
                      )}
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
      )}
    </div>
  );
}
