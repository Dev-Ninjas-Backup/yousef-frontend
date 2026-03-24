"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

export function TranslationToggle() {
  const { language, setLanguage, setUseGoogleTranslate } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: "en" | "ar" | "hi") => {
    setLanguage(lang);
    // Automatically enable Google Translate when AR or HI is selected
    setUseGoogleTranslate(lang !== "en");
    setIsOpen(false);

    // Hard refresh to properly reset state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
      >
        <Globe className="w-5 h-5 text-white/80" />
        <span className="hidden md:inline text-sm text-white/80">
          {currentLanguage.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/80 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() =>
                handleLanguageChange(lang.code as "en" | "ar" | "hi")
              }
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                language === lang.code
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="text-sm">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
