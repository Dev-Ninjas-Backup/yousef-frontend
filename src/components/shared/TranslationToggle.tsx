"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function TranslationToggle() {
  const { language, setLanguage, setUseGoogleTranslate } = useLanguage();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    // Automatically enable Google Translate when AR is selected
    setUseGoogleTranslate(lang === "ar");
    
    // Hard refresh to properly reset state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="flex items-center bg-black/40 rounded-full overflow-hidden">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-3 py-1 text-sm transition-colors ${
            language === "en" 
              ? "bg-white/20 text-white font-semibold" 
              : "text-white/70 hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("ar")}
          className={`px-3 py-1 text-sm transition-colors ${
            language === "ar" 
              ? "bg-white/20 text-white font-semibold" 
              : "text-white/70 hover:text-white"
          }`}
        >
          AR
        </button>
      </div>

      {/* Language Indicator */}
      <Globe className="w-4 h-4 text-white/60" />
    </div>
  );
}