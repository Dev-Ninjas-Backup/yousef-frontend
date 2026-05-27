"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/footer/sayarahub.svg";
import { LogOut, LayoutDashboard, Settings, Package, User } from "lucide-react";
import NotificationDropdown from "../NotificationDropdown";
import { useGetConversationsQuery } from "@/store/api/privateChatApi";

const UserNavbar = () => {
  const { data: profileData } = useGetUserProfileQuery();
  const user = profileData?.data;
  const { logout } = useAuth();

  const { data: conversations } = useGetConversationsQuery(
    undefined,
    {
      pollingInterval: 30000,
    }
  );

  const totalUnreadCount = conversations
    ? conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0)
    : 0;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Top Navbar Row */}
        <div className="py-4 border-b border-gray-100 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Image
              src={logo}
              alt="SayaraHub Logo"
              width={140}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <NotificationDropdown />

            <Link 
              href="/user/messages" 
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors shrink-0 block relative"
              aria-label="Messages"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {totalUnreadCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[16px] h-4 px-1.5 bg-red-500 rounded-full border border-white text-[9px] font-black text-white flex items-center justify-center shadow-sm">
                  {totalUnreadCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:scale-105 block"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.fullName || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                    {user?.fullName ? user.fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() : "YS"}
                  </div>
                )}
              </button>

              {/* Premium Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Profile Header */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate mt-0.5">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {user?.email || ""}
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1.5">
                    <Link
                      href="/user/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/user/my-products"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <Package className="w-4 h-4 text-gray-400" />
                      My Products
                    </Link>
                    <Link
                      href="/user/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-gray-100 py-1.5">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
