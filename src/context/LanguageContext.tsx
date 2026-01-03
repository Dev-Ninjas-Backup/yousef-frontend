"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: any) => any;
  useGoogleTranslate: boolean;
  setUseGoogleTranslate: (use: boolean) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [useGoogleTranslate, setUseGoogleTranslate] = useState<boolean>(false);

  useEffect(() => {
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
    localStorage.setItem("language", lang);
    applyRTL(lang);
  };

  const handleSetUseGoogleTranslate = (use: boolean) => {
    setUseGoogleTranslate(use);
    localStorage.setItem("useGoogleTranslate", use.toString());
  };

  /**
   * Translation function with fallback mechanism:
   * 1. If Google Translate is enabled and available, use it
   * 2. Otherwise, use static translations (fallback)
   */
  const t = (translations: any) => {
    // Always use static translations as fallback
    // Google Translate API integration can be added here in future
    // For now, this returns static translations based on current language
    return translations[language] || translations.en;
  };

  return (
    <TranslationContext.Provider
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t,
        useGoogleTranslate,
        setUseGoogleTranslate: handleSetUseGoogleTranslate
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
