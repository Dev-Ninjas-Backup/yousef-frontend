"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoIosLogOut } from "react-icons/io";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { NavItem } from "@/config/navigation";
import { Badge } from "@/components/ui/badge";

interface DashboardSidebarProps {
  navItems: NavItem[];
  title?: string;
  isOpen?: boolean;

  onClose?: () => void;
}

const DashboardSidebar = ({
  navItems,
  title = "Florida Yacht Trader",
  isOpen = false,

  onClose,
}: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const closeMobileMenu = useCallback(() => {
    onClose?.();
  }, [onClose]);
  let message = 1;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-[280px] lg:w-[310px] xl:w-80 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* User Info */}
        {user && (
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-blue-600 capitalize">{user.role}</p>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.label} className=" relative">
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium",
                      isActive
                        ? "bg-[#0066FF] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className={isActive ? "text-white" : "text-black"}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                  {item?.qty && (
                    <Badge className=" absolute top-2 md:top-3 bottom-2 right-10 bg-[#ECEEF2] h-5 min-w-5 rounded-md  p-2 py-3 font-mono tabular-nums text-black">
                      {item?.qty}
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#FF3B30] text-white rounded-lg hover:bg-[#E5342A] transition-colors active:scale-[0.98]"
          >
            <IoIosLogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
