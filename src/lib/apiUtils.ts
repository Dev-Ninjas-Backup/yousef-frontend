/**
 * Utility to add language parameter to API URLs
 */

export const getCurrentLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
};

export const addLangParam = (url: string): string => {
  const lang = getCurrentLanguage();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}lang=${lang}`;
};

export const withLang = (endpoint: string) => {
  return addLangParam(endpoint);
};