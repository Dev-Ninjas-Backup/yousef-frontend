"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Check, ArrowLeft, Search } from "lucide-react";
import { usePrivateChat } from "@/hooks/usePrivateChat";
import { useAppSelector } from "@/store/hooks";
import { useGetConversationsQuery } from "@/store/api/privateChatApi";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  // Get all conversations
  const { data: conversations, isLoading } = useGetConversationsQuery(
    undefined,
    {
      skip: !isOpen,
    }
  );

  // Get messages for selected chat
  const { messages, sendMessage, isConnected } = usePrivateChat(
    selectedChat?.id || null
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  const filteredConversations = conversations?.filter((conv) =>
    conv.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed right-6 bottom-6 w-80 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* User List View */}
        {!selectedChat && (
          <>
            {/* Header */}
            <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold">Messages</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-9 h-9"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : filteredConversations?.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              ) : (
                filteredConversations?.map((conv) => (
                  <button
                    key={conv.chatId}
                    onClick={() =>
                      setSelectedChat({
                        id: conv.participant.id,
                        name: conv.participant.fullName,
                      })
                    }
                    className="w-full p-3 hover:bg-gray-50 flex items-center gap-3 border-b transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {conv.participant.fullName.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {conv.participant.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage?.content || "No messages yet"}
                      </p>
                    </div>

                    {/* Time */}
                    {conv.lastMessage && (
                      <span className="text-xs text-gray-400">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </>
        )}

        {/* Chat View */}
        {selectedChat && (
          <>
            {/* Header */}
            <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                  className="h-6 w-6 p-0 text-white hover:bg-blue-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h3 className="font-semibold text-sm">{selectedChat.name}</h3>
                  <p className="text-xs opacity-90">
                    {isConnected ? "Active" : "Offline"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-2">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderId === currentUserId;
                  const time = new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isMine ? "justify-end" : "justify-start"
                      } mb-1`}
                    >
                      <div
                        className={`flex items-end gap-1.5 max-w-[80%] ${
                          isMine ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {!isMine && (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                            {selectedChat.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <div
                            className={`rounded-xl px-3 py-1.5 ${
                              isMine
                                ? "bg-blue-500 text-white rounded-br-sm"
                                : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                            }`}
                          >
                            <p className="text-xs leading-relaxed break-words">
                              {msg.content}
                            </p>
                          </div>
                          <div
                            className={`flex items-center gap-0.5 mt-0.5 px-1 ${
                              isMine ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span className="text-xs text-gray-400">
                              {time}
                            </span>
                            {isMine && (
                              <Check className="w-3 h-3 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t p-3">
              <div className="flex items-center gap-1.5">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={!isConnected}
                  className="flex-1 h-9 rounded-full text-sm px-4"
                />
                <Button
                  onClick={handleSend}
                  disabled={!isConnected || !message.trim()}
                  className="h-9 w-9 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
