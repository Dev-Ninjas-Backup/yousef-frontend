"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const token = Cookies.get("token");
    if (!token) {
      console.log("⚠️ No token found, socket not connecting");
      return;
    }

    console.log("🔌 Attempting to connect socket...");
    const socketInstance = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
      {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected, ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected, reason:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      setIsConnected(false);
    });

    socketInstance.on("reconnect_attempt", (attempt) => {
      console.log("🔄 Reconnection attempt:", attempt);
    });

    socketInstance.on("reconnect", () => {
      console.log("✅ Socket reconnected");
      setIsConnected(true);
    });

    // Debug: Listen to all events
    socketInstance.onAny((eventName, ...args) => {
      console.log("📨 Socket event received:", eventName, args);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🔌 Disconnecting socket...");
      socketInstance.disconnect();
    };
  }, [isMounted]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
