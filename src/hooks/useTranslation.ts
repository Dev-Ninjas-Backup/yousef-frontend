"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translationService } from '@/services/translation.service';

export function useTranslation() {
  const { language, useGoogleTranslate } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const t = (text: string): string => {
    if (language === 'en') return text;
    if (!useGoogleTranslate) return text; // Use static translations instead
    return translations[text] || text;
  };

  const translateText = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    if (!useGoogleTranslate) return text;
    if (translations[text]) return translations[text];

    const translated = await translationService.translate(text, language);
    setTranslations(prev => ({ ...prev, [text]: translated }));
    return translated;
  };

  return { t, translateText, language };
}

export function useTranslatedText(text: string): string {
  const { language, useGoogleTranslate } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    if (language === 'en' || !useGoogleTranslate) {
      setTranslatedText(text);
      return;
    }

    let isMounted = true;

    translationService.translate(text, language).then(translated => {
      if (isMounted) {
        setTranslatedText(translated);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [text, language, useGoogleTranslate]);

  return translatedText;
}

// Hook for static translations with Google Translate fallback
export function useStaticTranslation() {
  const { language, t: contextT, useGoogleTranslate } = useLanguage();

  const t = (translations: any): any => {
    // Always use static translations first (fast and reliable)
    const staticTranslation = contextT(translations);
    
    // If Google Translate is enabled and we have dynamic content, 
    // we can enhance it later
    return staticTranslation;
  };

  return { t, language, useGoogleTranslate };
}