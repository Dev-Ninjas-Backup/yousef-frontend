"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, CircleArrowOutUpRight } from "lucide-react";
import phoneImage from "@/assets/download-app/DownloadHero/download-hero.png";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";

const DownloadHero: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden mt-6 sm:mt-8 md:mt-10 bg-white">
      {/* Dynamic Background: Grid + Glowing Center */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left text */}
          <motion.div
            className="w-full lg:w-auto lg:flex-1 flex flex-col gap-6 lg:gap-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {trans.hero.title1}
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-700 mt-2">
                  {trans.hero.title2}
                </span>
              </h1>
              <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed">
                {trans.hero.subtitle1}
              </p>
            </div>
            
            <button className="group relative bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3 justify-center w-full sm:w-auto sm:max-w-[320px] mx-auto lg:mx-0 text-base sm:text-lg shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10">{trans.hero.downloadButton}</span>
              <CircleArrowOutUpRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {/* Shimmer effect inside button */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
            </button>
          </motion.div>

          {/* Center: Phone image with floating tooltips */}
          <motion.div
            className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[480px] mx-auto lg:mx-0 lg:flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Tooltip 1 - Floating animation */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] sm:top-[18%] md:top-[20%] -left-4 sm:-left-8 md:-left-12 bg-white/90 backdrop-blur-md border border-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm z-20"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <span className="font-semibold">{trans.hero.badge1}</span>
            </motion.div>

            <div className="relative aspect-[9/16] drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)]">
              <Image
                src={phoneImage}
                alt="SayaraHub App"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Tooltip 2 - Floating animation with offset delay */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[35%] sm:bottom-[30%] md:bottom-[35%] -right-4 sm:-right-8 md:-right-12 bg-white/90 backdrop-blur-md border border-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm z-20"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <span className="font-semibold">{trans.hero.badge2}</span>
            </motion.div>
          </motion.div>

          {/* Right text */}
          <motion.div
            className="w-full lg:w-auto lg:flex-1 text-center lg:text-left space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 leading-tight pb-2">
              {trans.hero.title3}
            </h3>
            <p className="max-w-xs mx-auto lg:mx-0 text-base sm:text-lg md:text-xl font-medium text-gray-600">
              {trans.hero.subtitle2}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Define the shimmer animation in global css or here using style tag as a quick fix if not in tailwind.config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
};

export default DownloadHero;
