"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-[#0A84FF]/80 backdrop-blur-md border border-[#0A84FF]/40 shadow-[0_0_15px_rgba(10,132,255,0.4)] text-white hover:bg-[#0A84FF] transition-all duration-300"
      title="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
