"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  X,
  Search,
  ArrowLeft,
  Send,
  Check,
  Paperclip,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  ChevronRight,
  Plus,
  Globe,
  Languages,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetConversationsQuery, Message } from "@/store/api/privateChatApi";
import { usePrivateChat } from "@/hooks/usePrivateChat";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import UserDashboardSidebar from "@/components/shared/dashboard/user/UserDashboardSidebar";
import Cookies from "js-cookie";
import { translationService } from "@/services/translation.service";

export default function UserMessagesPage() {
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
    avatar?: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Translation states
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, { text: string; lang: 'en' | 'ar' | 'hi' }>>({});
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [globalChatLang, setGlobalChatLang] = useState<'en' | 'ar' | 'hi'>('en');
  const [showGlobalLangMenu, setShowGlobalLangMenu] = useState(false);

  // Handle single message translation
  const handleTranslateMessage = async (msgId: string, content: string, lang: 'en' | 'ar' | 'hi') => {
    setActiveMenuId(null);
    if (lang === 'en') {
      setTranslatedMessages(prev => {
        const copy = { ...prev };
        delete copy[msgId];
        return copy;
      });
      return;
    }
    try {
      const translated = await translationService.translate(content, lang);
      setTranslatedMessages(prev => ({
        ...prev,
        [msgId]: { text: translated, lang }
      }));
    } catch (e) {
      console.error("Message translation failed", e);
    }
  };

  // Handle global chat translation
  const handleGlobalTranslate = async (lang: 'en' | 'ar' | 'hi') => {
    setGlobalChatLang(lang);
    setShowGlobalLangMenu(false);
    if (lang === 'en') {
      setTranslatedMessages({});
      return;
    }

    try {
      const messagesToTranslate = allMessages.filter(m => m.content);
      const texts = messagesToTranslate.map(m => m.content);
      const translations = await translationService.translateBatch(texts, lang);

      const newTranslations: Record<string, { text: string; lang: 'en' | 'ar' | 'hi' }> = {};
      messagesToTranslate.forEach((msg, idx) => {
        newTranslations[msg.id] = { text: translations[idx], lang };
      });
      setTranslatedMessages(newTranslations);
    } catch (e) {
      console.error("Global translation failed", e);
    }
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch active conversations list
  const { data: conversations, isLoading: isConversationsLoading, refetch: refetchConversations } = useGetConversationsQuery(
    undefined,
    {
      pollingInterval: 15000, // Poll every 15s for new messages/chats
    }
  );

  // Current active conversation helper
  const activeConversation = useMemo(() => {
    if (!selectedChat) return null;
    return conversations?.find((conv) => conv.participant.id === selectedChat.id) || null;
  }, [selectedChat, conversations]);

  // Socket chat hook integration
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
    activeConversation?.chatId || null,
    selectedChat?.id
  );

  const typingUsers = getTypingUsers();

  // Listen for socket events to refetch conversation statuses and unread counts
  useEffect(() => {
    if (socket) {
      const handleRefetch = () => {
        refetchConversations();
      };
      socket.on("private:new_message", handleRefetch);
      socket.on("private:message_read", handleRefetch);
      return () => {
        socket.off("private:new_message", handleRefetch);
        socket.off("private:message_read", handleRefetch);
      };
    }
  }, [socket, refetchConversations]);

  // Query online status for all active conversations in the inbox list
  useEffect(() => {
    if (socket && conversations && conversations.length > 0) {
      conversations.forEach((conv) => {
        socket.emit("private:get_user_status", conv.participant.id);
      });
    }
  }, [socket, conversations]);

  // Fetch initial message history from API on selected chat change
  useEffect(() => {
    if (selectedChat?.id) {
      setLocalMessages([]); // Clear previous messages
      setSelectedFiles([]); // Clear any staging files

      if (activeConversation?.chatId) {
        const token = Cookies.get("token");
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/private-chat/${activeConversation.chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.messages) {
              setLocalMessages(data.messages);
            }
          })
          .catch((err) => console.error("Failed to load message history:", err));
      }
    }
  }, [selectedChat?.id, activeConversation?.chatId]);

  // Combine REST API messages with real-time Socket messages (ignoring duplicates)
  const allMessages = useMemo(() => {
    const messageMap = new Map<string, Message>();

    // Add REST loaded messages
    localMessages.forEach((msg) => {
      messageMap.set(msg.id, msg);
    });

    // Add Socket messages belonging to this chat
    const currentConvId = activeConversation?.chatId;
    socketMessages.forEach((msg) => {
      const belongsToCurrentChat =
        selectedChat &&
        ((msg.senderId === currentUserId && msg.recipientId === selectedChat.id) ||
          (msg.senderId === selectedChat.id && msg.recipientId === currentUserId) ||
          (msg as any).conversationId === currentConvId);

      if (belongsToCurrentChat) {
        const existingMsg = messageMap.get(msg.id);
        if (!existingMsg || msg.isEdited || msg.isDeleted || msg.isRead !== existingMsg.isRead) {
          messageMap.set(msg.id, msg);
        }
      }
    });

    return Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [localMessages, socketMessages, selectedChat, activeConversation, currentUserId]);

  // Mark unread messages as read when viewing a chat
  useEffect(() => {
    if (selectedChat?.id && allMessages.length > 0) {
      const unreadMessages = allMessages.filter(m => m.senderId !== currentUserId && !m.isRead);
      if (unreadMessages.length > 0) {
        unreadMessages.forEach(msg => {
          markAsRead(msg.id);
        });
        refetchConversations();
      }
    }
  }, [selectedChat?.id, allMessages, currentUserId, markAsRead, refetchConversations]);

  // Auto-scroll to bottom of conversation stream (within container, not full page)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages, typingUsers]);

  // Reset translations when selected chat changes
  useEffect(() => {
    setTranslatedMessages({});
    setActiveMenuId(null);
    setGlobalChatLang('en');
    setShowGlobalLangMenu(false);
  }, [selectedChat?.id]);

  // Automatically translate new incoming messages if global translation is active
  useEffect(() => {
    if (globalChatLang !== 'en' && allMessages.length > 0) {
      const lastMessage = allMessages[allMessages.length - 1];
      if (lastMessage && lastMessage.content && !translatedMessages[lastMessage.id]) {
        translationService.translate(lastMessage.content, globalChatLang).then(translated => {
          setTranslatedMessages(prev => ({
            ...prev,
            [lastMessage.id]: { text: translated, lang: globalChatLang }
          }));
        });
      }
    }
  }, [allMessages.length, globalChatLang]);

  // Handle file inputs
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 5)); // Cap at 5 files
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Send message handler (supports both text and attachments)
  const handleSendMessage = async () => {
    if ((!messageText.trim() && selectedFiles.length === 0) || !selectedChat) return;

    setIsUploading(true);
    const token = Cookies.get("token");

    try {
      let fileUrls: string[] = [];

      // Step 1: Upload files to S3 if attachments exist
      if (selectedFiles.length > 0) {
        const uploadFormData = new FormData();
        selectedFiles.forEach((file) => {
          uploadFormData.append("files", file);
        });

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/aws-file-upload-additional-all/upload-s3-additional-multiple`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: uploadFormData,
          }
        );

        const uploadData = await uploadRes.json();
        if (uploadData.files && uploadData.files.length > 0) {
          fileUrls = uploadData.files;
        }
      }

      // Step 2: Send Message FormData
      const msgFormData = new FormData();
      const textContent = messageText.trim() || (fileUrls.length > 0 ? "File shared" : "");
      msgFormData.append("content", textContent);
      msgFormData.append("recipientId", selectedChat.id);

      if (fileUrls.length > 0) {
        fileUrls.forEach((url) => {
          msgFormData.append("files[]", url);
        });
      }

      const sendRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/private-chat/send-message/${selectedChat.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: msgFormData,
        }
      );

      const sendData = await sendRes.json();
      if (sendData.success && sendData.message) {
        setLocalMessages((prev) => [...prev, sendData.message]);
        refetchConversations();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsUploading(false);
      setMessageText("");
      setSelectedFiles([]);
      stopTyping();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleTextInput = (val: string) => {
    setMessageText(val);
    handleTyping();
  };

  // Filter conversation list based on query
  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    return conversations.filter((conv) =>
      conv.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const activeUserStatus = selectedChat ? getUserStatus(selectedChat.id) : null;
  const isOnline = activeUserStatus?.isOnline ?? false;
  console.log("🖥️ [UserMessagesPage] rendering with:", {
    selectedChatId: selectedChat?.id,
    activeUserStatus,
    isOnline,
  });

  return (
    <div className="w-full pt-1 pb-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        {/* Left Column - Dedicated Chat Area */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header */}
          <div className="space-y-1">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-3">
              {isMobileChatOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMobileChatOpen(false)}
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </Button>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Messages
                </h1>
                <p className="text-sm text-gray-500">
                  Chat with buyers and sellers about listings and spare parts
                </p>
              </div>
            </div>
          </div>

          {/* Main Inbox Card Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex h-[620px]">

            {/* 1. Inbox List Pane */}
            <div className={`w-full lg:w-1/3 flex flex-col border-r border-gray-100 ${isMobileChatOpen ? 'hidden lg:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="pl-9 h-10 bg-white border-gray-200 focus-visible:ring-blue-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {isConversationsLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12 gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Loading conversations...</span>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-600">No messages yet</p>
                    <p className="text-xs text-gray-400 mt-1">Start chatting with sellers via spare parts detail pages.</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const isSelected = selectedChat?.id === conv.participant.id;
                    const isUserTyping = typingUsers.some((u) => u.userId === conv.participant.id);
                    const convUserStatus = getUserStatus(conv.participant.id);
                    const userOnline = convUserStatus?.isOnline ?? false;
                    const date = new Date(conv.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric"
                    });

                    return (
                      <button
                        key={conv.chatId}
                        onClick={() => {
                          setSelectedChat({
                            id: conv.participant.id,
                            name: conv.participant.fullName,
                            avatar: conv.participant.profilePhoto
                          });
                          setIsMobileChatOpen(true);
                        }}
                        className={`w-full p-4 flex items-start gap-3.5 transition-all text-left hover:bg-gray-50/70 ${isSelected ? "bg-blue-50/40 border-l-4 border-blue-600" : ""
                          }`}
                      >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          {conv.participant.profilePhoto ? (
                            <img
                              src={conv.participant.profilePhoto}
                              alt={conv.participant.fullName}
                              className="w-11 h-11 rounded-full object-cover border border-gray-100"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                              {conv.participant.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          {userOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1.5">
                            <h4 className="font-bold text-sm text-gray-900 truncate">
                              {conv.participant.fullName}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {date}
                            </span>
                          </div>
                          <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                            {isUserTyping ? (
                              <span className="text-blue-600 font-semibold animate-pulse">Typing...</span>
                            ) : (
                              conv.lastMessage?.content || "Shared a file"
                            )}
                          </p>
                        </div>

                        {/* Unread count badge */}
                        {conv.unreadCount > 0 && (
                          <span className="shrink-0 min-w-[18px] h-[18px] px-1.5 bg-blue-600 rounded-full text-[9px] font-black text-white flex items-center justify-center shadow-sm animate-pulse mt-1.5 self-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* 2. Message Detail Pane */}
            <div className={`w-full lg:w-2/3 flex flex-col bg-gray-50/30 ${!isMobileChatOpen ? 'hidden lg:flex' : 'flex'}`}>
              <AnimatePresence mode="wait">
                {!selectedChat ? (
                  // Empty State
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 text-blue-600 border border-blue-100">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-1">Select a conversation</h3>
                    <p className="text-xs text-gray-500 max-w-sm">
                      Choose a chat from the inbox list to read messages and communicate with your buyers or sellers.
                    </p>
                  </motion.div>
                ) : (
                  // Active Chat Area
                  <motion.div
                    key="active-chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="lg:hidden p-0 h-8 w-8 text-gray-500"
                          onClick={() => setIsMobileChatOpen(false)}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className="relative">
                          {selectedChat.avatar ? (
                            <img
                              src={selectedChat.avatar}
                              alt={selectedChat.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-100"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                              {selectedChat.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"
                            }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-gray-900">{selectedChat.name}</h3>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {isOnline ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>

                      {/* Global Translation Selector */}
                      <div className="flex items-center gap-2 relative notranslate" translate="no">
                        <div className="relative">
                          <button
                            onClick={() => setShowGlobalLangMenu(!showGlobalLangMenu)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm cursor-pointer ${showGlobalLangMenu ? 'bg-gray-100 text-blue-600 border-blue-300' : ''
                              }`}
                            title="Translate Chat"
                          >
                            <Languages className="w-3.5 h-3.5" />
                            <span>{globalChatLang === 'ar' ? 'العربية' : globalChatLang === 'hi' ? 'हिन्दी' : ''}</span>
                            <ChevronDown className="w-3 h-3 opacity-60" />
                          </button>

                          {showGlobalLangMenu && (
                            <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 p-1 flex flex-col gap-0.5 text-xs text-gray-700 min-w-[120px] z-50">
                              <button
                                onClick={() => handleGlobalTranslate('en')}
                                className={`px-3 py-2 hover:bg-gray-50 rounded-lg text-left font-semibold ${globalChatLang === 'en' ? 'bg-blue-50 text-blue-600 font-bold' : ''
                                  }`}
                              >
                                Original
                              </button>
                              <button
                                onClick={() => handleGlobalTranslate('ar')}
                                className={`px-3 py-2 hover:bg-gray-50 rounded-lg text-left font-semibold ${globalChatLang === 'ar' ? 'bg-blue-50 text-blue-600 font-bold' : ''
                                  }`}
                              >
                                العربية (AR)
                              </button>
                              <button
                                onClick={() => handleGlobalTranslate('hi')}
                                className={`px-3 py-2 hover:bg-gray-50 rounded-lg text-left font-semibold ${globalChatLang === 'hi' ? 'bg-blue-50 text-blue-600 font-bold' : ''
                                  }`}
                              >
                                हिन्दी (HI)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Chat Feed */}
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3.5"
                    >
                      {allMessages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                          No messages yet. Send a message to start conversation.
                        </div>
                      ) : (
                        allMessages.map((msg) => {
                          const isMine = msg.senderId === currentUserId;
                          const time = new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });

                          return (
                            <div
                              key={msg.id}
                              className={`flex ${isMine ? "justify-end" : "justify-start"} group mb-1`}
                            >
                              <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                                {!isMine && (
                                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                    {selectedChat.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <div
                                    className={`rounded-2xl px-4 py-2 text-xs leading-relaxed break-words shadow-sm ${isMine
                                      ? "bg-blue-600 text-white rounded-br-sm"
                                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                                      }`}
                                  >
                                    {msg.content && (
                                      <div>
                                        <p>{translatedMessages[msg.id] ? translatedMessages[msg.id].text : msg.content}</p>
                                        {translatedMessages[msg.id] && (
                                          <span className={`block text-[9px] mt-1 font-light ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
                                            (Translated to {translatedMessages[msg.id].lang === 'hi' ? 'Hindi' : translatedMessages[msg.id].lang === 'ar' ? 'Arabic' : 'English'})
                                          </span>
                                        )}
                                      </div>
                                    )}

                                    {/* Files */}
                                    {msg.files && msg.files.length > 0 && (
                                      <div className={`${msg.content ? "mt-2" : ""} space-y-2`}>
                                        {msg.files.map((fileUrl, idx) => {
                                          const fileName = fileUrl.split("/").pop() || "file";
                                          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

                                          return (
                                            <div key={idx}>
                                              {isImage ? (
                                                <div
                                                  className="max-w-[200px] max-h-[140px] overflow-hidden rounded-lg cursor-pointer border border-gray-100 hover:opacity-90"
                                                  onClick={() => window.open(fileUrl, "_blank")}
                                                >
                                                  <img
                                                    src={fileUrl}
                                                    alt={fileName}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>
                                              ) : (
                                                <a
                                                  href={fileUrl}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className={`inline-flex items-center gap-2 p-2 rounded-lg text-[11px] font-medium transition-all ${isMine
                                                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                    }`}
                                                >
                                                  <FileText className="w-3.5 h-3.5" />
                                                  <span className="truncate max-w-[120px]">{fileName}</span>
                                                </a>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>

                                  {/* Timestamp */}
                                  <div className={`flex items-center gap-1 text-[10px] text-gray-400 ${isMine ? 'justify-end' : 'justify-start'}`}>
                                    <span>{time}</span>
                                    {isMine && (
                                      <div className="flex items-center">
                                        <Check
                                          className={`w-3.5 h-3.5 ${msg.isRead ? "text-blue-500" : "text-gray-400"}`}
                                        />
                                        {msg.isRead && (
                                          <Check className="w-3.5 h-3.5 text-blue-500 -ml-1.5" />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Individual Message Translation Button */}
                                {msg.content && (
                                  <div className="relative opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0">
                                    <button
                                      onClick={() => setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                                      className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                      title="Translate message"
                                    >
                                      <Globe className="w-3.5 h-3.5" />
                                    </button>

                                    {activeMenuId === msg.id && (
                                      <div className={`absolute z-30 bottom-full mb-1 bg-white rounded-lg shadow-lg border border-gray-150 p-1 flex gap-1 text-[10px] ${isMine ? 'right-0' : 'left-0'
                                        }`}>
                                        <button onClick={() => handleTranslateMessage(msg.id, msg.content, 'en')} className="px-1.5 py-0.5 hover:bg-gray-100 rounded font-semibold text-gray-700">EN</button>
                                        <button onClick={() => handleTranslateMessage(msg.id, msg.content, 'ar')} className="px-1.5 py-0.5 hover:bg-gray-100 rounded font-semibold text-gray-700">AR</button>
                                        <button onClick={() => handleTranslateMessage(msg.id, msg.content, 'hi')} className="px-1.5 py-0.5 hover:bg-gray-100 rounded font-semibold text-gray-700">HI</button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}

                      {/* Typing indicator bubble */}
                      {typingUsers.length > 0 && (
                        <div className="flex justify-start">
                          <div className="flex items-end gap-2 max-w-[75%]">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                              {selectedChat.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                              <div className="flex space-x-1.5 items-center py-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Staging Files List */}
                    {selectedFiles.length > 0 && (
                      <div className="bg-white border-t border-gray-100 px-4 py-2 flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative bg-gray-100 rounded-lg p-2 flex items-center gap-2 border border-gray-200">
                            {file.type.startsWith("image/") ? (
                              <ImageIcon className="w-4 h-4 text-blue-500" />
                            ) : (
                              <FileText className="w-4 h-4 text-blue-500" />
                            )}
                            <span className="text-xs truncate max-w-[100px] text-gray-700">{file.name}</span>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 p-0.5 rounded-full hover:bg-red-50"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Send box */}
                    <div className="bg-white border-t border-gray-100 p-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                          ref={fileInputRef}
                          id="page-file-input"
                          aria-label="Upload files"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl h-10 w-10 text-gray-500 hover:bg-gray-100 border border-gray-200"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          ref={inputRef}
                          value={messageText}
                          onChange={(e) => handleTextInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Write a message..."
                          disabled={isUploading}
                          className="flex-1 h-10 bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl text-xs px-4"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={isUploading || (!messageText.trim() && selectedFiles.length === 0)}
                          className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 p-0 shadow-md active:scale-95"
                        >
                          {isUploading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 text-white" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column - User Sidebar */}
        <UserDashboardSidebar activePage="dashboard" />

      </div>
    </div>
  );
}
