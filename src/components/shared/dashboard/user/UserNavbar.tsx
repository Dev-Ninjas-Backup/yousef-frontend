import { useState } from "react";
import Link from "next/link";
import {
  LuArrowLeft,
  LuUser,
  LuSettings,
  LuPackage,
} from "react-icons/lu";
import { useGetUserProfileQuery } from "@/store/api/userApi";

type TabType = "profile" | "settings" | "my-products";

interface UserNavbarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const UserNavbar = ({
  activeTab = "profile",
  onTabChange,
}: UserNavbarProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(activeTab);
  const { data: profileData } = useGetUserProfileQuery();
  const user = profileData?.data;

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    {
      id: "profile" as TabType,
      label: "Profile",
      icon: LuUser,
      path: "/user/dashboard",
    },
    {
      id: "settings" as TabType,
      label: "Settings",
      icon: LuSettings,
      path: "/user/settings",
    },
    {
      id: "my-products" as TabType,
      label: "My Products",
      icon: LuPackage,
      path: "/user/my-products",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button & Header Actions */}
        <div className="py-4 border-b border-gray-100 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <LuArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors shrink-0">
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                3
              </span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.fullName || "User Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                  {user?.fullName ? user.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "YS"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Header */}
        <div className="py-6 sm:py-8 flex items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your profile, published listing, and preferences
            </p>
          </div>
          
          {/* Shield Illustration */}
          <div className="hidden md:block relative shrink-0 w-24 h-24">
            <div className="absolute inset-0 bg-blue-50/80 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute inset-2 bg-blue-50/30 rounded-full border border-blue-100 flex items-center justify-center shadow-inner">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            {/* Background design elements */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400/35 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400/25 rounded-full"></div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 p-1 sm:gap-3 overflow-x-auto scrollbar-hide bg-[#ECECF0] rounded-full max-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;

            return (
              <Link
                href={tab.path}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? "bg-white p-1 rounded-full text-blue-600 shadow-sm" : "text-black"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
