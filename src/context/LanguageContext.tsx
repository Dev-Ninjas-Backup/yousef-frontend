"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: any) => any;
  useGoogleTranslate: boolean;
  setUseGoogleTranslate: (use: boolean) => void;
  isClient: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [useGoogleTranslate, setUseGoogleTranslate] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguage(savedLang);
      applyRTL(savedLang);
    }

    // Check if Google Translate API is available
    const googleTranslateEnabled = localStorage.getItem("useGoogleTranslate") === "true";
    setUseGoogleTranslate(googleTranslateEnabled);
  }, []);

  const applyRTL = (lang: Language) => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (lang === "ar") {
        html.setAttribute("dir", "rtl");
        html.setAttribute("lang", "ar");
      } else {
        html.setAttribute("dir", "ltr");
        html.setAttribute("lang", "en");
      }
    }
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (isClient) {
      localStorage.setItem("language", lang);
    }
    applyRTL(lang);
  };

  const handleSetUseGoogleTranslate = (use: boolean) => {
    setUseGoogleTranslate(use);
    if (isClient) {
      localStorage.setItem("useGoogleTranslate", use.toString());
    }
  };

  /**
   * Translation function with hybrid approach:
   * 1. Static translations (primary - fast and reliable)
   * 2. Google Translate API (secondary - for dynamic content)
   */
  const t = (translations: any) => {
    // For static translations, always use the predefined translations
    if (translations && typeof translations === 'object' && translations[language]) {
      return translations[language] || translations.en;
    }
    
    // For dynamic strings (when translations is a string), 
    // use Google Translate if enabled
    if (typeof translations === 'string' && useGoogleTranslate && language !== 'en') {
      // This would be handled by useTranslatedText hook for dynamic content
      return translations;
    }
    
    // Fallback
    return translations;
  };

  return (
    <TranslationContext.Provider
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t,
        useGoogleTranslate,
        setUseGoogleTranslate: handleSetUseGoogleTranslate,
        isClient
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useLanguage must be used within TranslationProvider");
  }
  return context;
}
