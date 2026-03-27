"use client";

import { useEffect, useState } from 'react';
import { loadGoogleTranslateScript } from '@/hooks/useGoogleTranslate';

if (typeof window !== "undefined" && typeof window.Node !== "undefined") {
  const originalRemoveChild = window.Node.prototype.removeChild;
  window.Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (console) {
        console.warn("[GoogleTranslate] Caught removeChild error. Node is no longer a child of this parent.", child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments as any) as T;
  };

  const originalInsertBefore = window.Node.prototype.insertBefore;
  window.Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.warn("[GoogleTranslate] Caught insertBefore error. Reference node is no longer a child of this parent.", referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments as any) as T;
  };
}

interface GoogleTranslateWrapperProps {
    children: React.ReactNode;
}

export const GoogleTranslateWrapper = ({ children }: GoogleTranslateWrapperProps) => {
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        // Wait for content to fully render first
        const renderTimer = setTimeout(() => {
            setContentReady(true);
            console.log('[GoogleTranslateWrapper] Content rendered, now loading translation...');

            // NOW load Google Translate after content is stable
            loadGoogleTranslateScript()
                .then(() => {
                    console.log('[GoogleTranslateWrapper] ✅ Script loaded');
                })
                .catch((error) => {
                    console.error('[GoogleTranslateWrapper] ❌ Error loading:', error);
                });
        }, 2000);

        return () => clearTimeout(renderTimer);
    }, []);

    return (
        <>
            <div
                id="google_translate_element"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    zIndex: -999, // Hide the native widget to use our dropdown instead
                    opacity: 0,
                    pointerEvents: 'none'
                }}
            >
            </div>
            {children}
        </>
    );
};
