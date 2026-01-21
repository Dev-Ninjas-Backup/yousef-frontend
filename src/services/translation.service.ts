import axios from 'axios';

const GOOGLE_TRANSLATE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export interface TranslationCache {
  [key: string]: string;
}

interface GoogleTranslation {
  translatedText: string;
}

class TranslationService {
  private cache: Map<string, TranslationCache> = new Map();

  async translate(text: string, targetLang: string): Promise<string> {
    if (!text || !targetLang) return text;
    if (targetLang === 'en') return text;

    const cacheKey = `${text}_${targetLang}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached[text] || text;

    // Check if API key is available
    if (!GOOGLE_TRANSLATE_API_KEY) {
      console.warn('Google Translate API key not found. Using original text.');
      return text;
    }

    try {
      const response = await axios.post(
        `${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          q: text,
          target: targetLang,
          format: 'text',
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      
      // Cache the translation
      const langCache = this.cache.get(targetLang) || {};
      langCache[text] = translatedText;
      this.cache.set(targetLang, langCache);

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }

  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    if (!texts.length || targetLang === 'en') return texts;

    if (!GOOGLE_TRANSLATE_API_KEY) {
      return texts;
    }

    try {
      const response = await axios.post(
        `${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          q: texts,
          target: targetLang,
          format: 'text',
        }
      );

      const translations = response.data.data.translations.map((t: GoogleTranslation) => t.translatedText);
      
      // Cache batch translations
      const langCache = this.cache.get(targetLang) || {};
      texts.forEach((text, index) => {
        langCache[text] = translations[index];
      });
      this.cache.set(targetLang, langCache);

      return translations;
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts;
    }
  }

  clearCache() {
    this.cache.clear();
  }

  isApiAvailable(): boolean {
    return !!GOOGLE_TRANSLATE_API_KEY;
  }
}

export const translationService = new TranslationService();