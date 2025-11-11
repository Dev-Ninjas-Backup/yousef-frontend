"use client";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";

const showMyAccount = true;
export const menuItems = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Download App", href: "/download-app" },
  { label: "About Us", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const pathname = usePathname();

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown")) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLangMenuOpen]);


  return (
    <nav className="fixed z-50 w-full py-4 px-4 md:mt-4 md:px-8 bg-white/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="">
            <Image
              src={scroll_logo}
              alt="SayaraHub"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          </div>
        </Link>

        <div className="hidden bg-black/40 md:flex  items-center gap-2 backdrop-blur-md rounded-full px-8 py-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 relative">
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
                className={`relative text-white/80 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5 whitespace-nowrap ${
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

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="hidden md:block relative language-dropdown">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-[#0A84FF] py-2 px-4 rounded-full bg-black/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <Globe className="w-5 h-5 text-white/80" />
              <ChevronDown className="w-4 h-4 text-white/80" />
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden">
                <button
                  onClick={() => handleLanguageChange("English")}
                  className={`w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 transition-colors ${
                    selectedLang === "English" ? "bg-white/5 font-semibold" : ""
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("Arabic")}
                  className={`w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 transition-colors ${
                    selectedLang === "Arabic" ? "bg-white/5 font-semibold" : ""
                  }`}
                >
                  عربي
                </button>
              </div>
            )}
          </div>

          {/* My Account */}
          {showMyAccount && (
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 text-white hover:text-[#0A84FF] py-2 px-4 rounded-full bg-black/40  shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <span className="text-sm md:hidden lg:flex text-white/80 ">
                My Account
              </span>
              <UserCircle className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
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

            {/* Mobile Language Selector */}
            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="px-4 py-2 text-white/60 text-sm font-semibold">
                Language
              </div>
              <button
                onClick={() => handleLanguageChange("English")}
                className={`w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 ${
                  selectedLang === "English" ? "bg-white/5 font-semibold" : ""
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange("Arabic")}
                className={`w-full text-left flex items-center gap-2 text-white/80 hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 ${
                  selectedLang === "Arabic" ? "bg-white/5 font-semibold" : ""
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Arabic</span>
              </button>
            </div>

            {showMyAccount && (
              <Link
                href="/account"
                className="flex items-center gap-2 text-white hover:text-[#0A84FF] transition-colors px-4 py-2 rounded-lg hover:bg-white/5 mt-2 border-t border-white/10 pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>My Account</span>
                <UserCircle className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
