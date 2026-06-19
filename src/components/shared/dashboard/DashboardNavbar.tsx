"use client";

import Image from "next/image";
import Link from "next/link";
import { HardDrive, LogOut, Menu } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { navbarTranslations } from "@/translations/navbar";
import { useGetConversationsQuery } from "@/store/api/privateChatApi";
import { useGetPlatformSettingPublicQuery } from "@/store/fetures/setting.api";

interface DashboardNavbarProps {
  onMenuToggle?: () => void;
}

const DashboardNavbar = ({ onMenuToggle }: DashboardNavbarProps) => {
  const { user, logout, profile } = useAuth();
  const pathname = usePathname();
  const { t } = useLanguage();
  const trans = t(navbarTranslations);
  const { data: platformData } = useGetPlatformSettingPublicQuery();
  const platformName = platformData?.data?.platformName || "SayaraHub";

  const { data: conversations } = useGetConversationsQuery(
    undefined,
    {
      pollingInterval: 30000,
    }
  );

  const totalUnreadCount = conversations
    ? conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0)
    : 0;

  const menuItems = [
    { label: trans.home, href: "/" },
    { label: trans.service, href: "/service" },
    { label: trans.spareParts, href: "/spare-parts" },
    { label: trans.downloadApp, href: "/download-app" },
    { label: trans.aboutUs, href: "/about" },
    { label: trans.contactUs, href: "/contact-us" },
  ];

  const isAdmin = user?.role === "SUPER_ADMIN";
  const messagePath = isAdmin ? "/admin/messages" : "/garage-admin/messages";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image
                src={logoImg}
                alt="SayaraHub"
                width={120}
                height={40}
                className="h-7 lg:h-8 w-auto"
              />
            </Link>

            <div className="hidden sm:flex items-center border-l border-gray-300 pl-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {isAdmin ? "Admin Dashboard" : (profile?.data?.garageName || "Garage Owner")}
                </p>
                <p className="text-xs text-gray-500">
                  {isAdmin
                    ? platformName
                    : profile?.data?.fullName || user?.name || "Garage Admin"}
                </p>
              </div>
              {!isAdmin && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded whitespace-nowrap">
                  {profile?.data?.isVerified ? "Verified" : "Unverified"}
                </span>
              )}
            </div>
          </div>

          {/* Center Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`relative text-gray-600 hover:text-[#0066FF] hover:bg-gray-50/80 transition-all duration-200 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                    isActive ? "text-[#0066FF] bg-blue-50/50 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <NotificationDropdown />

            <Link 
              href={messagePath} 
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

            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                  {isAdmin ? "AD" : "PA"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {isAdmin ? "Admin User" : user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {isAdmin ? "Main Admin" : "Garage Admin"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
