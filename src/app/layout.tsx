import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { TranslationProvider } from "@/context/LanguageContext";
import { GoogleTranslateWrapper } from "@/components/shared/GoogleTranslateWrapper";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { GoogleMapsProvider } from "@/providers/GoogleMapsProvider";
import {ToastContainer} from "react-toastify"
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sayara Hub",
  description: "Your Ultimate Car Service Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased bg-white`}
      >
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          <ToastContainer />
          <TranslationProvider>
            <GoogleMapsProvider>
              <AuthProvider>
                <GoogleTranslateWrapper>
                  {children}
                  <ScrollToTop />
                </GoogleTranslateWrapper>
              </AuthProvider>
            </GoogleMapsProvider>
          </TranslationProvider>
        </ReduxProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
