import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
