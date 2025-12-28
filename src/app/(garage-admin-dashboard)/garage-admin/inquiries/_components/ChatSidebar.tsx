"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Check } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  fileUrl?: string | null;
  createdAt: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  customerName: string;
}

export function ChatSidebar({
  isOpen,
  onClose,
  recipientId,
  customerName,
}: ChatSidebarProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket || !isOpen) {
      console.log("⚠️ Socket not ready or chat not open", {
        socket: !!socket,
        isOpen,
      });
      return;
    }

    console.log("🔌 Joining conversation:", recipientId);
    socket.emit("join-conversation", recipientId);

    const handleNewMessage = (newMsg: ChatMessage) => {
      console.log("📨 New message received:", newMsg);
      setMessages((prev) => [...prev, newMsg]);
    };

    socket.on("new-message", handleNewMessage);

    socket.emit("get-messages", recipientId);
    socket.on("message-history", (history: ChatMessage[]) => {
      console.log("📜 Message history received:", history);
      setMessages(history);
    });

    return () => {
      console.log("🔌 Leaving conversation:", recipientId);
      socket.off("new-message", handleNewMessage);
      socket.off("message-history");
      socket.emit("leave-conversation", recipientId);
    };
  }, [socket, isOpen, recipientId]);

  useEffect(() => {
    setMessages([]);
  }, [recipientId]);

  const handleSend = () => {
    if (!message.trim() || !socket || !isConnected || !currentUserId) return;

    console.log("📤 Sending message via socket...");

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      recipientId,
      content: message,
      senderId: currentUserId,
      createdAt: new Date().toISOString(),
    };

    socket.emit("send-message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed right-6 bottom-6 w-80 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-gray-900">
              {customerName}
            </h3>
            <p className="text-xs text-green-600">
              {isConnected ? "Active Now" : "Offline"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-2">
          <div className="flex justify-center my-2">
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              Today
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.senderId === currentUserId;
              const time = new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={msg.id || index}
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
                      <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs flex-shrink-0">
                        👤
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
                        {isMine && <Check className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t p-3">
          <div className="flex items-center gap-1.5">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={!isConnected}
              className="flex-1 h-8 rounded-full text-xs px-3"
            />
            <Button
              onClick={handleSend}
              disabled={!isConnected || !message.trim()}
              className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
