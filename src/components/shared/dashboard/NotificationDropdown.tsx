"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import {
  Bell,
  MessageSquare,
  Package,
  UserPlus,
  Info,
  Check,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link: string;
}

export default function NotificationDropdown() {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userId = user?.id || "guest";

  // Load notifications from local storage on mount/user change
  useEffect(() => {
    const saved = localStorage.getItem(`sayarahub_notifications_${userId}`);
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      // Seed initial dummy notifications to ensure it is not empty
      let initial: NotificationItem[] = [];
      if (user?.role === "SUPER_ADMIN") {
        initial = [
          {
            id: "welcome-admin",
            type: "System",
            title: "Welcome Admin!",
            message: "Welcome to SayaraHub Admin Portal. Monitor user registrations, garages, and spare parts approval.",
            createdAt: new Date().toISOString(),
            read: false,
            link: "/admin/dashboard",
          },
          {
            id: "pending-inquiry",
            type: "CustomerInquiryAlert",
            title: "Toyota Camry Brake Pads Inquiry",
            message: "A customer has sent an inquiry regarding brake pads compatibility.",
            createdAt: new Date(Date.now() - 900000).toISOString(),
            read: false,
            link: "/admin/messages?tab=customer",
          },
          {
            id: "pending-garage",
            type: "UserRegistration",
            title: "Garage Registration Pending",
            message: "A new garage profile has been uploaded and is waiting for your review and approval.",
            createdAt: new Date(Date.now() - 1800000).toISOString(),
            read: false,
            link: "/admin/garages",
          },
          {
            id: "pending-part",
            type: "ProductApproveUpdate",
            title: "Spare Part Pending Review",
            message: "A new spare part listing has been submitted and requires admin approval.",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            read: false,
            link: "/admin/spareparts",
          }
        ];
      } else {
        initial = [
          {
            id: "welcome",
            type: "System",
            title: "Welcome to SayaraHub!",
            message: user?.role === "GARAGE_OWNER"
              ? "Your Garage Partner Plan is now active with unlimited listings."
              : "Welcome to SayaraHub Dashboard. Track your parts and profile here.",
            createdAt: new Date().toISOString(),
            read: false,
            link: user?.role === "GARAGE_OWNER" ? "/garage-admin/subscription" : "/user/settings",
          },
          {
            id: "inquiry-sample",
            type: "CustomerInquiryAlert",
            title: "Inquiries System Active",
            message: "Potential buyers can now contact your business. All incoming inquiries will appear here.",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            read: false,
            link: user?.role === "GARAGE_OWNER" ? "/garage-admin/inquiries" : "/user/dashboard",
          }
        ];
      }
      setNotifications(initial);
      localStorage.setItem(`sayarahub_notifications_${userId}`, JSON.stringify(initial));
    }
  }, [userId, user?.role]);

  // Connect to the WebSocket namespace for notifications
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const socketInstance = io(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
      auth: { token: `Bearer ${token}` },
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected to notification gateway");
    });

    const addNotification = (type: string, title: string, message: string, link: string) => {
      setNotifications((prev) => {
        const newItem: NotificationItem = {
          id: Date.now().toString(),
          type,
          title,
          message,
          createdAt: new Date().toISOString(),
          read: false,
          link,
        };
        const updated = [newItem, ...prev];
        localStorage.setItem(`sayarahub_notifications_${userId}`, JSON.stringify(updated));
        return updated;
      });
    };

    socketInstance.on("customer-inquiry-alert", (data: any) => {
      console.log("📨 Received Inquiry socket event:", data);
      const inquiryId = data.meta?.inquiryId;
      const senderEmail = data.meta?.senderEmail;
      let link = "/garage-admin/inquiries";
      if (inquiryId) {
        link += `?inquiryId=${inquiryId}`;
      } else if (senderEmail) {
        link += `?email=${encodeURIComponent(senderEmail)}`;
      }

      addNotification(
        "CustomerInquiryAlert",
        data.title || "New Customer Inquiry",
        data.message || "A customer has inquired about your spare part.",
        link
      );
    });

    socketInstance.on("user-registration", (data: any) => {
      console.log("👤 Received User Registration event:", data);
      addNotification(
        "UserRegistration",
        data.title || "New User Registered",
        data.message || "A new user has signed up on the platform.",
        "/admin/users"
      );
    });

    socketInstance.on("new-message", (data: any) => {
      console.log("💬 Received Message event:", data);
      const partnerId = data.meta?.fromUserId;
      const baseLink = user?.role === "GARAGE_OWNER" ? "/garage-admin/messages" : "/user/messages";
      const link = partnerId ? `${baseLink}?userId=${partnerId}` : baseLink;
      addNotification(
        "NewMessage",
        data.title || "New Message Received",
        data.message || "You have received a new message.",
        link
      );
    });

    socketInstance.on("product-approve-update", (data: any) => {
      console.log("📦 Received Product Approval update:", data);
      const link = user?.role === "GARAGE_OWNER" ? "/garage-admin/my-products" : "/user/my-products";
      const status = data.meta?.status ? data.meta.status.toLowerCase() : "updated";
      addNotification(
        "ProductApproveUpdate",
        `Product ${data.meta?.status || "Updated"}`,
        `Your product listing status is now ${status}.`,
        link
      );
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userId, user?.role]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(`sayarahub_notifications_${userId}`, JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem(`sayarahub_notifications_${userId}`);
  };

  const handleNotificationClick = (item: NotificationItem) => {
    const updated = notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem(`sayarahub_notifications_${userId}`, JSON.stringify(updated));
    setIsOpen(false);
    router.push(item.link);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "CustomerInquiryAlert":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "ProductApproveUpdate":
        return <Package className="w-4 h-4 text-green-600" />;
      case "UserRegistration":
        return <UserPlus className="w-4 h-4 text-orange-600" />;
      default:
        return <Info className="w-4 h-4 text-purple-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "CustomerInquiryAlert":
        return "bg-blue-50 border-blue-100";
      case "ProductApproveUpdate":
        return "bg-green-50 border-green-100";
      case "UserRegistration":
        return "bg-orange-50 border-orange-100";
      default:
        return "bg-purple-50 border-purple-100";
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg focus:outline-none"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#FF3B30] text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden origin-top-right transition-all">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-950 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We'll alert you when something happens.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-gray-50 flex gap-3 transition-colors relative group",
                    !item.read && "bg-blue-50/20"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 mt-0.5", getBgColor(item.type))}>
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      {item.type === "CustomerInquiryAlert" ? (
                        <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">Customer Message</span>
                      ) : ["UserRegistration", "ProductApproveUpdate"].includes(item.type) ? (
                        <span className="bg-purple-100 text-purple-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">Garage Message</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">System Alert</span>
                      )}
                      {item.type === "CustomerInquiryAlert" && (
                        <span className="bg-red-100 text-[#FF3B30] text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                          High Priority
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-1">
                      <p className={cn("text-xs font-semibold text-gray-950 truncate", !item.read && "font-bold")}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-normal">
                      {item.message}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 bg-gray-50/50 border-t border-gray-100 flex justify-end">
              <button
                onClick={clearAll}
                className="text-xs text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors py-1 px-2 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
