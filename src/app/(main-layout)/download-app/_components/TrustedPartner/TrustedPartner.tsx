"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dualPhoneImg from "@/assets/download-app/trustedpartner/dual_phone.png";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";

const TrustedPartner: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  const handleAppDownload = () => {
    if (typeof window !== "undefined") {
      window.open("/download-app", "_self");
    }
  };

  const formatTextWithSayaraHub = (text: string, className: string) => {
    if (!text) return null;
    const parts = text.split(/(SayaraHub)/i);
    return parts.map((part, i) => 
      part.toLowerCase() === 'sayarahub' ? (
        <span 
          key={i} 
          onClick={handleAppDownload}
          className={`${className} cursor-pointer hover:underline`}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center md:text-start">
        <motion.div
          className="text-center mb-12 md:mb-16 space-y-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {trans.trustedPartner.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {formatTextWithSayaraHub(trans.trustedPartner.subtitle, "text-blue-600 font-semibold")}
          </p>
        </motion.div>

        <motion.div
          className="relative w-full min-h-[450px] md:min-h-[500px]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          {/* Blue Background with Elegant SVG Wavy Pattern */}
          <div className="absolute inset-0 bg-[#1A73E8] rounded-2xl md:rounded-3xl overflow-hidden">
            <svg 
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay" 
              viewBox="0 0 1000 500" 
              preserveAspectRatio="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <path 
                  key={`wave1-${i}`}
                  d={`M0,${250 + i * 12} C300,${450 - i * 15} 400,${50 + i * 20} 700,${250 + i * 8} C900,${350 - i * 10} 950,${150 + i * 15} 1000,${250 + i * 12}`} 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <path 
                  key={`wave2-${i}`}
                  d={`M0,${150 + i * 25} C350,${50 + i * 15} 450,${450 - i * 20} 800,${200 + i * 15} C950,${100 - i * 10} 980,${400 - i * 20} 1000,${200 + i * 25}`} 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1"
                  opacity="0.6"
                />
              ))}
            </svg>
          </div>

          {/* Content Container - No overflow hidden so image can break out */}
          <div className="relative z-10 grid lg:grid-cols-2 items-center h-full min-h-[500px]">
            
            {/* Left Side: Text and Buttons */}
            <motion.div
              className="text-white flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6 md:p-12 p-8 h-full"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="inline-block px-5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold tracking-wider mb-2">
                GET THE APP
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {trans.trustedPartner.downloadTitle} <span onClick={handleAppDownload} className="italic cursor-pointer hover:underline text-white">{trans.trustedPartner.downloadTitleItalic}</span>
              </h3>
              <p className="text-blue-50 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg text-center md:text-left">
                {formatTextWithSayaraHub(trans.trustedPartner.description, "text-white font-semibold")}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <Link href="/download-app" className="h-12 md:h-14 transition-transform hover:scale-105 block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-full" />
                </Link>
                <Link href="/download-app" className="h-12 md:h-14 transition-transform hover:scale-105 block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-full" />
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Dual Phones INSIDE the container */}
            <motion.div 
              className="relative lg:flex justify-end items-center h-full hidden py-8 pr-4 lg:pr-12 z-20 pointer-events-none"
              initial={{ opacity: 0, x: 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src={dualPhoneImg.src} 
                alt="SayaraHub App Screen" 
                className="w-auto max-h-[420px] lg:max-h-[500px] object-contain drop-shadow-2xl"
              />
            </motion.div>
            
            {/* Mobile/Tablet image fallback */}
            <motion.div 
              className="lg:hidden w-full flex justify-center mt-8 pb-8 px-4 relative z-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
               <img 
                src={dualPhoneImg.src} 
                alt="SayaraHub App Screen" 
                className="w-full max-w-[350px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartner;
