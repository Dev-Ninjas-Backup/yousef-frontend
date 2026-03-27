"use client";

import { changeLanguage, isTranslateReady } from "@/hooks/useGoogleTranslate";
import { useCallback, useEffect, useState } from "react";
import { Globe, ChevronDown, Loader2 } from "lucide-react";

export interface Language {
    code: string;
    name: string;
}

const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
];

interface LanguageDropdownProps {
    onLanguageChange?: (language: Language) => void;
}

export const LanguageDropdown = ({ onLanguageChange }: LanguageDropdownProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [ready, setReady] = useState(false);

    // Check if Google Translate is ready
    useEffect(() => {
        let isMounted = true;

        const checkReady = () => {
            if (!isMounted) return;

            if (isTranslateReady()) {
                setReady(true);
                loadSavedLanguage();
            } else {
                setTimeout(checkReady, 300);
            }
        };

        const timer = setTimeout(checkReady, 500);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    const loadSavedLanguage = useCallback(() => {
        if (typeof window === "undefined") return;
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            try {
                const lang = JSON.parse(savedLanguage);

                // Verify it's in our supported list
                const foundLang = languages.find(l => l.code === lang.code) || languages[0];
                setSelectedLanguage(foundLang);

                // Apply the saved language
                setTimeout(() => {
                    if (foundLang.code !== 'en') {
                        changeLanguage(foundLang.code).then(() => {
                            updateRTL(foundLang.code);
                        }).catch(err => {
                            console.error('[LanguageDropdown] Failed to restore language:', err);
                        });
                    } else {
                        // Native DOM is already English, no need to trigger Google Translate
                        updateRTL('en');
                    }
                }, 300);
            } catch (e) {
                console.error('[LanguageDropdown] Failed to parse saved language:', e);
            }
        }
    }, []);

    const updateRTL = (code: string) => {
        const html = document.documentElement;
        if (code === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', code);
        }
    }

    const handleLanguageChange = useCallback(async (language: Language) => {
        if (!ready) return;

        setSelectedLanguage(language);
        setIsDropdownOpen(false);

        try {
            localStorage.setItem('selectedLanguage', JSON.stringify(language));
        } catch (e) {
            console.error('[LanguageDropdown] Failed to save language:', e);
        }

        if (onLanguageChange) {
            onLanguageChange(language);
        }

        try {
            if (language.code === 'en') {
                // To safely return to pure native English without Google Translates weird paraphrasing, 
                // we clear the translation cookies and reload the page.
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
                window.location.reload();
            } else {
                const success = await changeLanguage(language.code);
                if (!success) {
                    console.error('[LanguageDropdown] Language change failed');
                } else {
                    updateRTL(language.code);
                }
            }
        } catch (error) {
            console.error('[LanguageDropdown] Error changing language:', error);
        }
    }, [ready, onLanguageChange]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                title={ready ? 'Change Language' : 'Loading translation...'}
                disabled={!ready}
            >
                <Globe className="w-5 h-5 text-white/80" />
                <span className="hidden md:inline text-sm text-white/80">
                    {selectedLanguage.name}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-white/80 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />

                {!ready && (
                    <Loader2 className="w-4 h-4 text-white/50 animate-spin ml-1" />
                )}
            </button>

            {isDropdownOpen && (
                <>
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden z-[99]">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language)}
                                disabled={!ready}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${selectedLanguage.code === language.code
                                        ? "bg-white/10 text-white font-semibold"
                                        : "text-white/80 hover:bg-white/5"
                                    } ${!ready ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <span className="text-sm">{language.name}</span>
                                {selectedLanguage.code === language.code && (
                                    <span className="ml-auto text-green-400">✓</span>
                                )}
                            </button>
                        ))}

                        {!ready && (
                            <div className="px-4 py-2 text-xs text-white/50 border-t border-white/10">
                                Loading translation...
                            </div>
                        )}
                    </div>

                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                </>
            )}
        </div>
    );
};

export default LanguageDropdown;
