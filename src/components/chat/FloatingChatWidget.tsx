"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Search, ArrowLeft, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetConversationsQuery } from "@/store/api/privateChatApi";
import { usePrivateChat } from "@/hooks/usePrivateChat";
import { useAppSelector } from "@/store/hooks";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnread, setHasUnread] = useState(false);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data: conversations, isLoading } = useGetConversationsQuery(
    undefined,
    {
      skip: !isOpen,
      pollingInterval: 30000,
    }
  );

  const { messages, sendMessage, isConnected } = usePrivateChat(
    selectedChat?.id || null
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      const hasNew = conversations.some((conv) => conv.lastMessage);
      setHasUnread(hasNew);
    }
  }, [conversations]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  const filteredConversations = conversations?.filter((conv) =>
    conv.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg z-50 flex items-center justify-center transition-all"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {hasUnread && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {!selectedChat && (
        <>
          <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold">Messages</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9 h-9"
              />
            </div>
          </div>

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
                  onClick={() => {
                    setSelectedChat({
                      id: conv.participant.id,
                      name: conv.participant.fullName,
                    });
                    setHasUnread(false);
                  }}
                  className="w-full p-3 hover:bg-gray-50 flex items-center gap-3 border-b transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {conv.participant.fullName.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {conv.participant.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conv.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>

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

      {selectedChat && (
        <>
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
              onClick={() => {
                setIsOpen(false);
                setSelectedChat(null);
              }}
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

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
                          <span className="text-xs text-gray-400">{time}</span>
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
          </div>

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
  );
}
