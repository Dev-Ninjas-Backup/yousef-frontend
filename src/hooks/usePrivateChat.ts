"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { Message } from "@/store/api/privateChatApi";

export function usePrivateChat(recipientId: string | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Socket connection
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const socketInstance = io(`${process.env.NEXT_PUBLIC_API_URL}/pv/message`, {
      auth: { token: `Bearer ${token}` },
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected to chat");
      setIsConnected(true);
    });

    socketInstance.on("private:success", (userId) => {
      console.log("✅ Authenticated:", userId);
    });

    socketInstance.on("private:new_message", (message: Message) => {
      console.log("📨 New message:", message);
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on("private:error", (error) => {
      console.error("❌ Error:", error);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Load conversation
  useEffect(() => {
    if (!socket || !recipientId) return;

    socket.emit("private:load_single_conversation", recipientId);

    const handleConversation = (data: any) => {
      setMessages(data.messages || []);
    };

    socket.on("private:new_conversation", handleConversation);

    return () => {
      socket.off("private:new_conversation", handleConversation);
    };
  }, [socket, recipientId]);

  // Send message
  const sendMessage = (content: string) => {
    if (!socket || !recipientId || !content.trim()) return;

    socket.emit("private:send_message", {
      recipientId,
      content,
    });
  };

  return { messages, sendMessage, isConnected };
}
