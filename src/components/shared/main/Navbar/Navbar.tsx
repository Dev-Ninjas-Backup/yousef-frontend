"use client";
import Link from "next/link";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logo from "@/assets/navbar/sayarahub_navbar.svg";
import scroll_logo from "@/assets/navbar/sayarahub_scroll.svg";

const showMyAccount = true;
const menuItems = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Download App", href: "/download-app" },
  { label: "About Us", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const pathname = usePathname();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <nav className="fixed z-50 w-full py-4 px-4 md:px-8 bg-white/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {isScrolled ? (
            <Image
              src={scroll_logo}
              alt="SayaraHub"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          ) : (
            <Image
              src={logo}
              alt="SayaraHub"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          )}
        </Link>

<div
          className={`hidden md:flex items-center gap-2 backdrop-blur-md rounded-full px-8 py-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 relative ${
            isScrolled ? "bg-black/40" : "bg-white/5"
          }`}
        >
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
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
        {/* My Account */}
        {showMyAccount && (
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-white hover:text-[#0A84FF] py-2 px-4 rounded-full bg-black/40  shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <span
              className={`text-sm md:text-xl ${
                // isScrolled ? "text-black" : "text-white/80" " --- IGNORE ---
                isScrolled ? "text-white/80" : "text-white/80"
              }`}
            >
              My Account
            </span>
            <UserCircle
              className={`w-5 h-5 md:w-6 md:h-6 ${
                isScrolled ? "text-white/80" : "text-white/80"
              }`}
            />
          </Link>
        )}

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
