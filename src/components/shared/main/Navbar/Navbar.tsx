"use client";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, Globe, ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import { useLanguage } from "@/context/LanguageContext";
import { navbarTranslations } from "@/translations/navbar";
import { TranslationToggle } from "@/components/shared/TranslationToggle";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth();

  const trans = t(navbarTranslations);

  const menuItems = [
    { label: trans.home, href: "/" },
    { label: trans.service, href: "/service" },
    { label: trans.spareParts, href: "/spare-parts" },
    { label: trans.downloadApp, href: "/download-app" },
    { label: trans.aboutUs, href: "/about" },
    { label: trans.contactUs, href: "/contact-us" },
  ];

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case UserRole.CAR_OWNER:
      case UserRole.MEMBER:
        return "/user/dashboard";
      case UserRole.GARAGE_OWNER:
        return "/garage-admin/dashboard";
      case UserRole.SUPER_ADMIN:
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const handleLanguageChange = (lang: "en" | "ar" | "hi") => {
    setIsLangMenuOpen(false);
    setLanguage(lang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown")) {
        setIsLangMenuOpen(false);
      }
      if (!target.closest(".user-dropdown")) {
        setIsUserMenuOpen(false);
      }
    };

    if (isLangMenuOpen || isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLangMenuOpen, isUserMenuOpen]);

  return (
    <nav className="fixed z-50 w-full py-4 px-4 lg:mt-4 lg:px-8 bg-white/70 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
      <div className="container mx-auto flex items-center justify-between gap-2 lg:gap-4">
        <Link href="/" className="flex items-center">
          <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Image
              src={scroll_logo}
              alt="SayaraHub"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto drop-shadow-md"
            />
          </div>
        </Link>

        <div className="hidden bg-black/40 lg:flex items-center gap-1 xl:gap-2 backdrop-blur-md rounded-full px-4 xl:px-8 py-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 relative flex-1 mx-4 justify-center">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`relative text-white/80 hover:text-white transition-colors px-2 xl:px-4 py-2 rounded-full hover:bg-white/5 whitespace-nowrap text-sm xl:text-base ${
                  isActive ? "text-white font-semibold" : ""
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-9 h-1 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Translation Toggle - always visible, sits beside hamburger on mobile */}
          <TranslationToggle />

          {/* Auth buttons - desktop only */}
          {isAuthenticated ? (
            <div className="hidden lg:block relative user-dropdown">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-white hover:text-[#0A84FF] py-2 px-4 rounded-full bg-black/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
              >
                <span className="text-sm text-white/80">{user?.name}</span>
                <UserCircle className="w-5 h-5 text-white/80" />
                <ChevronDown className="w-4 h-4 text-white/80" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden">
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
                  >
                    {trans.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {trans.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/user-auth"
              className="hidden lg:flex items-center gap-2 text-white hover:text-[#0A84FF] py-2 px-4 rounded-full bg-black/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <span className="text-sm text-white/80">{trans.login}</span>
              <UserCircle className="w-5 h-5 text-white/80" />
            </Link>
          )}

          {/* Hamburger button - grouped with language toggle on mobile */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="px-4 py-2 text-white/60 text-sm font-semibold">
                {trans.language}
              </div>
              <div className="px-4 py-2">
                <TranslationToggle />
              </div>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 ${
                  language === "en" ? "bg-white/5 font-semibold" : ""
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange("ar")}
                className={`w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 ${
                  language === "ar" ? "bg-white/5 font-semibold" : ""
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>العربية</span>
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className={`w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 ${
                  language === "hi" ? "bg-white/5 font-semibold" : ""
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>हिन्दी</span>
              </button>
            </div>

            <div className="border-t border-white/10 pt-4 mt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-white/60 text-sm font-semibold">
                    {user?.name}
                  </div>
                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>{trans.dashboard}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{trans.logout}</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/user-auth"
                  className="flex items-center gap-2 text-white hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>{trans.login}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
