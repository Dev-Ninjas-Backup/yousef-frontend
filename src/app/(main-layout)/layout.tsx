"use client";

import { ReactNode } from "react";
import Footer from "@/components/shared/main/Footer/Footer";
import Navbar from "@/components/shared/main/Navbar/Navbar";
import { TranslationProvider } from "@/context/LanguageContext";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <TranslationProvider>
      <div>
        <Navbar />
        <div className="p-3"> {children}</div>
        <Footer />
        <FloatingChatWidget />
      </div>
    </TranslationProvider>
  );
};

export default MainLayout;
