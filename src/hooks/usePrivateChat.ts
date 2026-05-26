"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import {
  Message,
  TypingUser,
  UserStatus,
  useGetMessagesQuery,
} from "@/store/api/privateChatApi";

export function usePrivateChat(
  conversationId: string | null,
  recipientId?: string
) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [userStatuses, setUserStatuses] = useState<Map<string, UserStatus>>(
    new Map()
  );
  const [isTyping, setIsTyping] = useState(false);

  // Load messages from REST API
  const { data: apiMessages, refetch } = useGetMessagesQuery(
    conversationId || "",
    { skip: !conversationId }
  );

  // Update messages when API data loads
  useEffect(() => {
    if (apiMessages) {
      setMessages(apiMessages);
    }
  }, [apiMessages]);

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

    // Message events
    socketInstance.on("private:new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on("private:message_edited", (message: Message) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === message.id ? message : msg))
      );
    });

    socketInstance.on("private:message_deleted", (messageId: string) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, isDeleted: true, content: "This message was deleted" }
            : msg
        )
      );
    });

    // Typing events
    socketInstance.on("private:typing_start", (data: { conversationId: string; userId: string }) => {
      setTypingUsers((prev) => {
        const filtered = prev.filter((user) => user.userId !== data.userId);
        return [...filtered, { userId: data.userId, fullName: "Someone", isTyping: true }];
      });
    });

    socketInstance.on("private:typing_stop", (data: { conversationId: string; userId: string }) => {
      setTypingUsers((prev) => 
        prev.filter((user) => user.userId !== data.userId)
      );
    });

    // Status events
    socketInstance.on("private:user_status", (status: UserStatus) => {
      console.log("📨 [usePrivateChat Hook] Received private:user_status event:", status);
      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(status.userId, status);
        return newMap;
      });
    });

    socketInstance.on("private:error", (error) => {
      console.error("❌ [usePrivateChat Hook] Socket error:", error);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ [usePrivateChat Hook] Socket disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🔌 [usePrivateChat Hook] Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, []);

  // Clear messages when conversation changes
  useEffect(() => {
    setMessages([]);
    setTypingUsers([]);
  }, [conversationId, recipientId]);

  // Load conversation
  useEffect(() => {
    if (!socket || !recipientId) {
      console.log("ℹ️ [usePrivateChat Hook] Skipping load conversation: socket or recipientId missing", { hasSocket: !!socket, recipientId });
      return;
    }

    console.log("📤 [usePrivateChat Hook] Requesting conversation and user status for:", recipientId);
    socket.emit("private:load_single_conversation", recipientId);
    socket.emit("private:get_user_status", recipientId);

    const handleConversation = (data: any) => {
      if (data.messages) {
        setMessages(data.messages);
      }
    };

    socket.on("private:new_conversation", handleConversation);

    return () => {
      socket.off("private:new_conversation", handleConversation);
    };
  }, [socket, recipientId]);

  // Typing indicator with timeout
  const handleTyping = useCallback(() => {
    if (!socket || !recipientId) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("private:typing_start", {
        conversationId: conversationId || "",
        recipientId
      });

      // Auto stop typing after 3 seconds
      setTimeout(() => {
        if (isTyping) {
          setIsTyping(false);
          socket.emit("private:typing_stop", {
            conversationId: conversationId || "",
            recipientId
          });
        }
      }, 3000);
    }
  }, [socket, conversationId, recipientId, isTyping]);

  // Stop typing manually
  const stopTyping = useCallback(() => {
    if (!socket || !recipientId || !isTyping) return;
    
    setIsTyping(false);
    socket.emit("private:typing_stop", {
      conversationId: conversationId || "",
      recipientId
    });
  }, [socket, conversationId, recipientId, isTyping]);

  // Send message
  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !recipientId || !content.trim()) return;

      socket.emit("private:send_message", {
        recipientId,
        content,
      });
    },
    [socket, recipientId]
  );

  // Edit message
  const editMessage = useCallback(
    (messageId: string, content: string) => {
      if (!socket || !content.trim()) return;

      socket.emit("private:edit_message", {
        messageId,
        content,
      });
    },
    [socket]
  );

  // Delete message
  const deleteMessage = useCallback(
    (messageId: string) => {
      if (!socket) return;

      socket.emit("private:delete_message", { messageId });
    },
    [socket]
  );

  // Mark as read
  const markAsRead = useCallback(
    (messageId: string) => {
      if (!socket) return;

      socket.emit("private:mark_as_read", { messageId });
    },
    [socket]
  );

  // Get user status
  const getUserStatus = useCallback(
    (userId: string): UserStatus | null => {
      const status = userStatuses.get(userId) || null;
      console.log(`🔍 [usePrivateChat Hook] getUserStatus called for user ${userId}:`, status);
      return status;
    },
    [userStatuses]
  );

  // Get typing users
  const getTypingUsers = useCallback((userId?: string) => {
    if (userId) {
      return typingUsers.filter((user) => user.userId === userId);
    }
    return typingUsers.filter((user) => user.userId === recipientId);
  }, [typingUsers, recipientId]);

  return {
    socket,
    messages,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead,
    handleTyping,
    stopTyping,
    isConnected,
    getUserStatus,
    getTypingUsers,
    refetchMessages: refetch,
  };
}
