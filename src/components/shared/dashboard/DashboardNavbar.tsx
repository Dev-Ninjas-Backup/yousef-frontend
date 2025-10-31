"use client";

import Image from "next/image";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3">
          <Image src={logoImg} alt="SayaraHub" width={120} height={40} className="h-8 w-auto" />
          <div className="border-l border-gray-300 pl-3">
            <p className="text-sm font-semibold text-gray-900">
              {isAdmin ? "Admin Dashboard" : "Premium Auto Parts LLC"}
            </p>
            <p className="text-xs text-gray-500">
              {isAdmin ? "SayaraHub" : "Dubai, UAE"}
            </p>
          </div>
          {!isAdmin && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
              Verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

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
                {isAdmin ? "Super Admin" : "Garage Admin"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
