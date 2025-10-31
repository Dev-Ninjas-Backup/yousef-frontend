"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoIosLogOut } from "react-icons/io";
import { HiX } from "react-icons/hi";
import { LuLayoutGrid } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { NavItem } from "@/config/navigation";

interface DashboardSidebarProps {
  navItems: NavItem[];
  title?: string;
}

const DashboardSidebar = ({ navItems, title = "Florida Yacht Trader" }: DashboardSidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-2 left-2 z-60 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <HiX className="w-6 h-6 text-gray-700" />
        ) : (
          <LuLayoutGrid className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
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
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                <li key={item.label}>
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
