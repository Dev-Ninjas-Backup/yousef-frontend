"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft, LuUser, LuSettings, LuWrench } from "react-icons/lu";
import path from "path";

type TabType = "profile" | "settings" | "spare-parts";

interface UserNavbarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const UserNavbar = ({ activeTab = "profile", onTabChange }: UserNavbarProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(activeTab);

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
      id: "spare-parts" as TabType,
      label: "Spare Parts",
      icon: LuWrench,
      path: "/user/spare-parts",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="py-4 border-b border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <LuArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Account Header */}
        <div className="py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your profile, published listing, and preferences
          </p>
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
                  isActive
                    ? "bg-white p-1 rounded-full"
                    : "text-black"
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