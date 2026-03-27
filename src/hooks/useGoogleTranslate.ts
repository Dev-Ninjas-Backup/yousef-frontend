// useGoogleTranslate.ts
export const loadGoogleTranslateScript = (): Promise<void> => {
    // If already initialized and working, return immediately
    if (typeof window !== "undefined" && window.google?.translate?.TranslateElement) {
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            console.log('[GoogleTranslate] Already initialized and working');
            return Promise.resolve();
        }
    }

    return new Promise<void>((resolve, reject) => {
        // Wait for container to be ready
        const waitForContainer = () => {
            const container = document.getElementById('google_translate_element');
            if (!container) {
                console.log('[GoogleTranslate] Container not found, waiting...');
                setTimeout(waitForContainer, 100);
                return;
            }

            console.log('[GoogleTranslate] Container found!');
            initializeScript(container, resolve, reject);
        };

        waitForContainer();
    });
};

function initializeScript(
    container: HTMLElement,
    resolve: () => void,
    reject: (error: Error) => void
) {
    if (typeof window === "undefined") return;
    
    // Remove existing script if any
    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) {
        console.log('[GoogleTranslate] Removing existing script...');
        existingScript.remove();
    }

    // Setup global callback
    (window as any).googleTranslateElementInit = () => {
        console.log('[GoogleTranslate] Init callback triggered');

        setTimeout(() => {
            try {
                initializeTranslateElement(container);

                waitForSelectElement(30000)
                    .then(() => {
                        console.log('[GoogleTranslate] ✅ Initialization complete');
                        resolve();
                    })
                    .catch((error) => {
                        console.error('[GoogleTranslate] ❌ Failed:', error);
                        reject(error);
                    });
            } catch (error) {
                console.error('[GoogleTranslate] ❌ Exception:', error);
                reject(error as Error);
            }
        }, 100);
    };

    // Load script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    script.onerror = (error) => {
        console.error('[GoogleTranslate] Script load failed:', error);
        reject(new Error('Failed to load Google Translate script'));
    };

    document.head.appendChild(script);
    console.log('[GoogleTranslate] Script added to head');
}

function initializeTranslateElement(container: HTMLElement): void {
    // Clear container
    container.innerHTML = '';

    if (!(window as any).google?.translate?.TranslateElement) {
        throw new Error('Google Translate API not available');
    }

    console.log('[GoogleTranslate] Creating TranslateElement with VERTICAL layout...');

    try {
        const InlineLayout = (window as any).google.translate.TranslateElement.InlineLayout;

        new (window as any).google.translate.TranslateElement(
            {
                pageLanguage: 'en',
                includedLanguages: 'en,de,th,es,ru,zh-CN,ja,ar,hi',
                layout: InlineLayout.VERTICAL,
                autoDisplay: false,
                multilanguagePage: true
            },
            'google_translate_element'
        );

        console.log('[GoogleTranslate] TranslateElement created');
    } catch (error) {
        console.error('[GoogleTranslate] Creation error:', error);
        throw error;
    }
}

function waitForSelectElement(timeout = 30000): Promise<void> {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let attemptCount = 0;

        const check = setInterval(() => {
            attemptCount++;
            const elapsed = Date.now() - startTime;

            if (attemptCount % 20 === 0) {
                console.log(`[GoogleTranslate] Waiting for select... ${Math.floor(elapsed / 1000)}s`);
            }

            const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;

            if (selectElement) {
                console.log('[GoogleTranslate] ✅ Select element found after', elapsed, 'ms');
                clearInterval(check);
                resolve();
                return;
            }

            if (elapsed > timeout) {
                console.error('[GoogleTranslate] ❌ Timeout after', elapsed, 'ms');
                clearInterval(check);
                reject(new Error('Timeout waiting for select element'));
            }
        }, 50);
    });
}

export const changeLanguage = (languageCode: string): Promise<boolean> => {
    console.log('[GoogleTranslate] Changing to:', languageCode);

    return new Promise((resolve) => {
        if (typeof document === "undefined") {
            resolve(false);
            return;
        }
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;

        if (!selectElement) {
            console.error('[GoogleTranslate] ❌ Select element not found');
            resolve(false);
            return;
        }

        console.log('[GoogleTranslate] Current:', selectElement.value, '→', languageCode);

        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

        console.log('[GoogleTranslate] ✅ Language changed');
        resolve(true);
    });
};

export const getCurrentLanguage = (): string => {
    if (typeof document === "undefined") return '';
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    return selectElement?.value || '';
};

export const isTranslateReady = (): boolean => {
    if (typeof document === "undefined") return false;
    return !!document.querySelector('.goog-te-combo');
};

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit?: () => void;
    }
}
