"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Users, CheckCircle2 } from "lucide-react";
import contactHeroimg from "@/assets/contactus/contactus-img.png";
import { useLanguage } from "@/context/LanguageContext";
import { contactTranslations } from "@/translations/contact";

const ContactHero: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(contactTranslations);

  const renderTitle = (text: string) => {
    // "We're Here to Help You Anytime."
    const cleanText = text.replace("Anytime.", "Anytime");
    const parts = cleanText.split("Help You Anytime");
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}<br className="hidden md:block" />
          Help You <span className="text-[#2563eb]">Anytime</span>
        </>
      );
    }
    // Fallback for other languages
    if (cleanText.includes("Anytime")) {
        const p = cleanText.split("Anytime");
        return <>{p[0]}<span className="text-[#2563eb]">Anytime</span>{p[1]}</>;
    }
    return cleanText;
  };

  const renderDescription = (text: string) => {
    const parts = text.split("assist. ");
    if (parts.length > 1) {
      return (
        <div className="flex flex-col gap-6">
          <p className="text-gray-300 text-[14px] md:text-[15px] leading-[1.7] max-w-[480px] font-medium">
            {parts[0]}assist.
          </p>
          <p className="text-gray-300 text-[14px] md:text-[15px] leading-[1.7] max-w-[480px] font-medium">
            {parts[1]}
          </p>
        </div>
      );
    }
    return (
      <p className="text-gray-300 text-[14px] md:text-[15px] leading-[1.7] max-w-[480px] font-medium">
        {text}
      </p>
    );
  };

  return (
    <section className="relative w-full bg-[#030914] overflow-hidden flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[650px] font-sans">
      {/* Right Image Background */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <Image
          src={contactHeroimg}
          alt="Contact us"
          fill
          className="object-cover object-[center_right] lg:object-[80%_center]"
          priority
        />
        {/* Gradients to blend image seamlessly into the dark background */}
        {/* Left-to-right fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/90 via-30% to-transparent" />
        {/* Overall dark overlay */}
        <div className="absolute inset-0 bg-[#030914]/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16 lg:pt-[120px] lg:pb-24">
        <div className="w-full lg:w-[50%] flex flex-col gap-6 lg:pr-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1e40af] px-4 py-2 rounded-full w-fit mb-6">
              <Headphones className="w-[14px] h-[14px] text-white" strokeWidth={2.5} />
              <span className="text-[11px] font-bold tracking-widest text-white uppercase">WE&apos;RE HERE FOR YOU</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
              {renderTitle(trans.hero.title)}
            </h1>

            {renderDescription(trans.hero.description)}
          </motion.div>

          {/* Features Row */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8 w-full lg:min-w-[650px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Feature 1 */}
            <div className="flex flex-row items-start gap-3">
              <div className="w-[42px] h-[42px] rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-[20px] h-[20px] text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col pt-0.5">
                <h4 className="text-white font-bold text-[14px]">Fast Support</h4>
                <p className="text-gray-400 text-[12px] leading-[1.4] mt-1 pr-2">We respond quickly to get you the help you need.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-row items-start gap-3">
              <div className="w-[42px] h-[42px] rounded-full bg-[#172554] flex items-center justify-center shrink-0">
                <Users className="w-[20px] h-[20px] text-blue-300" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col pt-0.5">
                <h4 className="text-white font-bold text-[14px]">Expert Team</h4>
                <p className="text-gray-400 text-[12px] leading-[1.4] mt-1 pr-2">Automotive professionals ready to assist you.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-row items-start gap-3">
              <div className="w-[42px] h-[42px] rounded-full bg-[#172554] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-[20px] h-[20px] text-blue-300" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col pt-0.5">
                <h4 className="text-white font-bold text-[14px]">Hassle-Free</h4>
                <p className="text-gray-400 text-[12px] leading-[1.4] mt-1 pr-2">Simple, clear, and stress-free communication.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
