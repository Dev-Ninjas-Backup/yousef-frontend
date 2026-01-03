"use client";

import { useEffect, useState } from 'react';

export type Language = 'en' | 'ar';

// Translation cache to avoid repeated API calls
const translationCache: Record<string, Record<string, string>> = {
  en: {},
  ar: {}
};

let currentLanguage: Language = 'en';
let languageChangeCallbacks: ((lang: Language) => void)[] = [];

// Google Cloud Translation API endpoint
const TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(currentLanguage);

  useEffect(() => {
    const callback = (lang: Language) => setLanguage(lang);
    languageChangeCallbacks.push(callback);
    
    return () => {
      languageChangeCallbacks = languageChangeCallbacks.filter(cb => cb !== callback);
    };
  }, []);

  return language;
};

// Translate text using Google Cloud Translation API
export const translateText = async (text: string, targetLang: Language): Promise<string> => {
  // Check cache first
  if (translationCache[targetLang][text]) {
    return translationCache[targetLang][text];
  }

  // If English, return as is
  if (targetLang === 'en') {
    return text;
  }

  try {
    // Check if API key is available
    if (!API_KEY) {
      console.warn('Google Translate API key not found. Using manual translations.');
      return text;
    }

    const response = await fetch(`${TRANSLATE_API}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        source: 'en',
        format: 'text'
      })
    });

    if (response.ok) {
      const data = await response.json();
      const translated = data.data.translations[0].translatedText;
      translationCache[targetLang][text] = translated;
      return translated;
    }
  } catch (error) {
    console.error('Translation error:', error);
  }

  // Fallback to original text
  return text;
};

// Manual translations as fallback (free tier)
const manualTranslations: Record<string, Record<Language, string>> = {
  'Home': { en: 'Home', ar: 'الرئيسية' },
  'Service': { en: 'Service', ar: 'الخدمة' },
  'Spare Parts': { en: 'Spare Parts', ar: 'قطع الغيار' },
  'Download App': { en: 'Download App', ar: 'تحميل التطبيق' },
  'About Us': { en: 'About Us', ar: 'من نحن' },
  'Contact us': { en: 'Contact us', ar: 'اتصل بنا' },
  'Login': { en: 'Login', ar: 'تسجيل الدخول' },
  'Dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
  'Logout': { en: 'Logout', ar: 'تسجيل الخروج' },
  'Language': { en: 'Language', ar: 'اللغة' },
  'English': { en: 'English', ar: 'الإنجليزية' },
  'Arabic': { en: 'Arabic', ar: 'العربية' },
  'Back': { en: 'Back', ar: 'رجوع' },
  'Verify Your Email': { en: 'Verify Your Email', ar: 'تحقق من بريدك الإلكتروني' },
  "We've sent a 6-digit code to": { en: "We've sent a 6-digit code to", ar: 'لقد أرسلنا رمزًا مكونًا من 6 أرقام إلى' },
  'Enter OTP': { en: 'Enter OTP', ar: 'أدخل رمز التحقق' },
  'Verifying...': { en: 'Verifying...', ar: 'جاري التحقق...' },
  'Verify OTP': { en: 'Verify OTP', ar: 'تحقق من الرمز' },
  'Reset Your Password': { en: 'Reset Your Password', ar: 'إعادة تعيين كلمة المرور' },
  "Enter your email address and we'll send you a reset code": { en: "Enter your email address and we'll send you a reset code", ar: 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز إعادة التعيين' },
  'Email Address': { en: 'Email Address', ar: 'عنوان البريد الإلكتروني' },
  'Enter your email': { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
  'Sending...': { en: 'Sending...', ar: 'جاري الإرسال...' },
  'Send Reset Code': { en: 'Send Reset Code', ar: 'إرسال رمز إعادة التعيين' },
  'Enter Reset Code & New Password': { en: 'Enter Reset Code & New Password', ar: 'أدخل رمز إعادة التعيين وكلمة المرور الجديدة' },
  'Reset Code': { en: 'Reset Code', ar: 'رمز إعادة التعيين' },
  'New Password': { en: 'New Password', ar: 'كلمة المرور الجديدة' },
  'Enter new password': { en: 'Enter new password', ar: 'أدخل كلمة المرور الجديدة' },
  'Confirm New Password': { en: 'Confirm New Password', ar: 'تأكيد كلمة المرور الجديدة' },
  'Confirm new password': { en: 'Confirm new password', ar: 'تأكيد كلمة المرور الجديدة' },
  'Resetting...': { en: 'Resetting...', ar: 'جاري إعادة التعيين...' },
  'Reset Password': { en: 'Reset Password', ar: 'إعادة تعيين كلمة المرور' }
};

// Get translation (uses manual translations as fallback)
export const t = (text: string, lang: Language = currentLanguage): string => {
  if (manualTranslations[text]) {
    return manualTranslations[text][lang];
  }
  return text;
};

export const switchToEnglish = () => {
  console.log('Switching to English');
  currentLanguage = 'en';
  languageChangeCallbacks.forEach(callback => callback('en'));
  localStorage.setItem('selectedLanguage', 'en');
  toggleRTL(false);
};

export const switchToArabic = () => {
  console.log('Switching to Arabic');
  currentLanguage = 'ar';
  languageChangeCallbacks.forEach(callback => callback('ar'));
  localStorage.setItem('selectedLanguage', 'ar');
  toggleRTL(true);
};

export const toggleRTL = (isArabic: boolean) => {
  const html = document.documentElement;
  if (isArabic) {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }
};

export const getCurrentLanguage = () => currentLanguage;

export const initializeLanguage = () => {
  const savedLang = localStorage.getItem('selectedLanguage') as Language;
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    currentLanguage = savedLang;
    toggleRTL(savedLang === 'ar');
    languageChangeCallbacks.forEach(callback => callback(savedLang));
  }
};

export default function GoogleTranslationAPI() {
  useEffect(() => {
    initializeLanguage();
  }, []);

  return null;
}