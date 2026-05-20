import Link from "next/link";
import { LuUser, LuSettings, LuPackage } from "react-icons/lu";

type TabType = "profile" | "settings" | "my-products";

interface UserDashboardHeaderProps {
  activeTab: TabType;
}

export default function UserDashboardHeader({ activeTab }: UserDashboardHeaderProps) {
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
    <div className="w-full space-y-4">
      {/* Account Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your profile, published listing, and preferences
          </p>
        </div>
        
        {/* Shield Illustration - Compact version */}
        <div className="hidden md:block relative shrink-0 w-16 h-16">
          <div className="absolute inset-0 bg-blue-50/80 rounded-full opacity-60"></div>
          <div className="absolute inset-1 bg-blue-50/30 rounded-full border border-blue-100 flex items-center justify-center shadow-inner">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1 sm:gap-3 overflow-x-auto scrollbar-hide bg-[#ECECF0] rounded-full max-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Link
              href={tab.path}
              key={tab.id}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all rounded-full ${
                isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
