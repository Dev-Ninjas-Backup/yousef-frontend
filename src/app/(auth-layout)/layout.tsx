"use client";

import { ReactNode } from "react";

import { TranslationProvider } from "@/context/LanguageContext";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <TranslationProvider>
      <div> {children}</div>
    </TranslationProvider>
  );
};

export default MainLayout;
