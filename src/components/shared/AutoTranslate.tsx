"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translationService } from "@/services/translation.service";

export function AutoTranslate({ children }: { children: React.ReactNode }) {
  const { language, useGoogleTranslate } = useLanguage();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const originalTexts = useRef<Map<Node, string>>(new Map());
  const [isTranslating, setIsTranslating] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const lastPathname = useRef<string>("");

  // Helper functions moved outside useEffect for reusability
  const collectTexts = (node: Node, texts: string[] = []): string[] => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const text = node.textContent.trim();
      if (text.length > 2 && !/^\d+$/.test(text)) {
        if (!originalTexts.current.has(node)) {
          originalTexts.current.set(node, text);
        }
        texts.push(originalTexts.current.get(node) || text);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (
        !["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "CODE", "PRE"].includes(element.tagName) &&
        element.getAttribute("translate") !== "no"
      ) {
        for (const child of Array.from(node.childNodes)) {
          collectTexts(child, texts);
        }
      }
    }
    return texts;
  };

  const applyTranslations = async (
    node: Node,
    translations: Map<string, string>
  ) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const original = originalTexts.current.get(node);
      if (original && original.length > 2 && !/^\d+$/.test(original)) {
        const translated = translations.get(original) || original;
        if (node.textContent !== translated) {
          node.textContent = translated;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (
        !["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "CODE", "PRE"].includes(element.tagName) &&
        element.getAttribute("translate") !== "no"
      ) {
        if (element.hasAttribute("placeholder")) {
          const placeholder = element.getAttribute("placeholder") || "";
          if (language === "en") {
            const original = element.getAttribute("data-original-placeholder");
            if (original) element.setAttribute("placeholder", original);
          } else {
            if (!element.hasAttribute("data-original-placeholder")) {
              element.setAttribute("data-original-placeholder", placeholder);
            }
            const translated = translations.get(placeholder) || placeholder;
            element.setAttribute("placeholder", translated);
          }
        }

        if (element.hasAttribute("title")) {
          const title = element.getAttribute("title") || "";
          if (language === "en") {
            const original = element.getAttribute("data-original-title");
            if (original) element.setAttribute("title", original);
          } else {
            if (!element.hasAttribute("data-original-title")) {
              element.setAttribute("data-original-title", title);
            }
            const translated = translations.get(title) || title;
            element.setAttribute("title", translated);
          }
        }

        if (element.hasAttribute("alt")) {
          const alt = element.getAttribute("alt") || "";
          if (language === "en") {
            const original = element.getAttribute("data-original-alt");
            if (original) element.setAttribute("alt", original);
          } else {
            if (!element.hasAttribute("data-original-alt")) {
              element.setAttribute("data-original-alt", alt);
            }
            const translated = translations.get(alt) || alt;
            element.setAttribute("alt", translated);
          }
        }

        for (const child of Array.from(node.childNodes)) {
          await applyTranslations(child, translations);
        }
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Reset original texts when route changes
    if (pathname !== lastPathname.current) {
      originalTexts.current.clear();
      lastPathname.current = pathname;
      setIsReady(language === "en" || !useGoogleTranslate);
    }
  }, [pathname, language, useGoogleTranslate]);

  useEffect(() => {
    if (!containerRef.current || !isMounted || isTranslating || !useGoogleTranslate) {
      setIsReady(true);
      return;
    }

    const translateAll = async () => {
      setIsTranslating(true);
      setIsReady(false);

      try {
        if (language === "en") {
          // Restore original texts
          await applyTranslations(containerRef.current!, new Map());
          setIsReady(true);
        } else {
          // Collect all texts
          const texts = collectTexts(containerRef.current!);
          const uniqueTexts = [...new Set(texts)].filter(text => text.length > 2);

          if (uniqueTexts.length === 0) {
            setIsReady(true);
            return;
          }

          // Translate all texts
          const translationMap = new Map<string, string>();
          
          // Process in batches to avoid overwhelming the API
          const batchSize = 10;
          for (let i = 0; i < uniqueTexts.length; i += batchSize) {
            const batch = uniqueTexts.slice(i, i + batchSize);
            await Promise.all(
              batch.map(async (text) => {
                try {
                  const translated = await translationService.translate(text, language);
                  translationMap.set(text, translated);
                } catch (error) {
                  console.error(`Translation failed for: ${text}`, error);
                  translationMap.set(text, text); // Fallback to original
                }
              })
            );
          }

          // Apply translations
          await applyTranslations(containerRef.current!, translationMap);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setIsReady(true);
      } finally {
        setIsTranslating(false);
      }
    };

    // Small delay to ensure DOM is ready and API data is loaded
    const timer = setTimeout(translateAll, 500);
    return () => clearTimeout(timer);
  }, [language, pathname, isMounted, useGoogleTranslate]);

  // Re-translate when DOM content changes (for dynamic API data)
  useEffect(() => {
    if (!containerRef.current || !isMounted || !useGoogleTranslate || language === 'en') {
      return;
    }

    // Watch for DOM mutations (new content added)
    const observer = new MutationObserver((mutations) => {
      // Check if mutations contain text nodes or new elements
      const hasNewContent = mutations.some(mutation => 
        mutation.addedNodes.length > 0 || 
        (mutation.type === 'characterData' && mutation.target.textContent?.trim())
      );

      if (hasNewContent && !isTranslating) {
        // Debounce re-translation
        const timer = setTimeout(() => {
          const translateNewContent = async () => {
            if (!containerRef.current) return;
            
            setIsTranslating(true);
            try {
              const texts = collectTexts(containerRef.current!);
              const uniqueTexts = [...new Set(texts)].filter(text => text.length > 2);

              if (uniqueTexts.length === 0) return;

              const translationMap = new Map<string, string>();
              const batchSize = 10;
              
              for (let i = 0; i < uniqueTexts.length; i += batchSize) {
                const batch = uniqueTexts.slice(i, i + batchSize);
                await Promise.all(
                  batch.map(async (text) => {
                    try {
                      const translated = await translationService.translate(text, language);
                      translationMap.set(text, translated);
                    } catch (error) {
                      translationMap.set(text, text);
                    }
                  })
                );
              }

              await applyTranslations(containerRef.current!, translationMap);
            } finally {
              setIsTranslating(false);
            }
          };
          
          translateNewContent();
        }, 300); // Debounce delay

        return () => clearTimeout(timer);
      }
    });

    // Observe the container for changes
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isMounted, useGoogleTranslate, language, isTranslating]);

  return (
    <div
      ref={containerRef}
      className={isMounted ? (isReady ? "opacity-100" : "opacity-75") : ""}
      style={isMounted ? { transition: "opacity 0.3s ease-in-out" } : undefined}
    >
      {children}
      {isTranslating && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Translating...
        </div>
      )}
    </div>
  );
}