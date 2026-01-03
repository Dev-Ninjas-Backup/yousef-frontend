/**
 * Translation Utility with Google Translate API Integration
 * 
 * This utility provides a fallback mechanism:
 * 1. Primary: Google Translate API (when available and enabled)
 * 2. Fallback: Static translations from translation files
 */

type Language = "en" | "ar";

interface TranslateOptions {
  text: string;
  targetLang: Language;
  sourceLang?: Language;
}

/**
 * Translate text using Google Translate API
 * Falls back to returning original text if API fails
 */
export async function translateWithGoogle({
  text,
  targetLang,
  sourceLang = "en",
}: TranslateOptions): Promise<string> {
  // If target language is same as source, return original text
  if (targetLang === sourceLang) {
    return text;
  }

  try {
    // Google Translate API endpoint (requires API key)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      console.warn("Google Translate API key not found. Using fallback translations.");
      return text;
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Google Translate API failed:", error);
    // Return original text as fallback
    return text;
  }
}

/**
 * Get translation with fallback mechanism
 * 1. Try Google Translate API if enabled
 * 2. Use static translations as fallback
 */
export function getTranslation(
  translations: any,
  language: Language,
  useGoogleTranslate: boolean = false
): any {
  // Always use static translations (reliable and fast)
  // Google Translate can be enabled for dynamic content in future
  return translations[language] || translations.en;
}

/**
 * Check if Google Translate API is available
 */
export function isGoogleTranslateAvailable(): boolean {
  return !!process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
}

/**
 * Translate dynamic content (user-generated, API responses, etc.)
 * This is useful for content that doesn't have static translations
 */
export async function translateDynamicContent(
  content: string,
  targetLang: Language
): Promise<string> {
  if (!isGoogleTranslateAvailable()) {
    return content;
  }

  return translateWithGoogle({
    text: content,
    targetLang,
    sourceLang: "en",
  });
}
