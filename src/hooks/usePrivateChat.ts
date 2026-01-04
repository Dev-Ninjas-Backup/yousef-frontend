"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { Message, TypingUser, UserStatus, useGetMessagesQuery } from "@/store/api/privateChatApi";

export function usePrivateChat(conversationId: string | null, recipientId?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [userStatuses, setUserStatuses] = useState<Map<string, UserStatus>>(new Map());
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
      console.log("📨 New message:", message);
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on("private:message_edited", (message: Message) => {
      setMessages((prev) => 
        prev.map(msg => msg.id === message.id ? message : msg)
      );
    });

    socketInstance.on("private:message_deleted", (messageId: string) => {
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isDeleted: true, content: "This message was deleted" }
            : msg
        )
      );
    });

    // Typing events
    socketInstance.on("private:user_typing", (data: TypingUser) => {
      setTypingUsers((prev) => {
        const filtered = prev.filter(user => user.userId !== data.userId);
        return data.isTyping ? [...filtered, data] : filtered;
      });
    });

    // Status events
    socketInstance.on("private:user_status", (status: UserStatus) => {
      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(status.userId, status);
        return newMap;
      });
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

  // Clear messages when conversation changes
  useEffect(() => {
    setMessages([]);
    setTypingUsers([]);
  }, [conversationId, recipientId]);

  // Load conversation
  useEffect(() => {
    if (!socket || !recipientId) return;

    socket.emit("private:load_single_conversation", recipientId);

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

  // Typing indicator
  const handleTyping = useCallback(() => {
    if (!socket || !recipientId) return;
    
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("private:typing_start", { recipientId });
      
      setTimeout(() => {
        setIsTyping(false);
        socket.emit("private:typing_stop", { recipientId });
      }, 3000);
    }
  }, [socket, recipientId, isTyping]);

  // Send message
  const sendMessage = useCallback((content: string) => {
    if (!socket || !recipientId || !content.trim()) return;

    socket.emit("private:send_message", {
      recipientId,
      content,
    });
  }, [socket, recipientId]);

  // Edit message
  const editMessage = useCallback((messageId: string, content: string) => {
    if (!socket || !content.trim()) return;

    socket.emit("private:edit_message", {
      messageId,
      content,
    });
  }, [socket]);

  // Delete message
  const deleteMessage = useCallback((messageId: string) => {
    if (!socket) return;

    socket.emit("private:delete_message", { messageId });
  }, [socket]);

  // Mark as read
  const markAsRead = useCallback((messageId: string) => {
    if (!socket) return;

    socket.emit("private:mark_as_read", { messageId });
  }, [socket]);

  // Get user status
  const getUserStatus = useCallback((userId: string): UserStatus | null => {
    return userStatuses.get(userId) || null;
  }, [userStatuses]);

  // Get typing users for current conversation
  const getTypingUsers = useCallback(() => {
    return typingUsers.filter(user => user.userId === recipientId);
  }, [typingUsers, recipientId]);

  return {
    messages,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead,
    handleTyping,
    isConnected,
    getUserStatus,
    getTypingUsers,
    refetchMessages: refetch,
  };
}
