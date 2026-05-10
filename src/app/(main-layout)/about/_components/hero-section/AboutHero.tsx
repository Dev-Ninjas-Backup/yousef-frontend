"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AboutBg from "@/assets/about/Banner/about_banner.jpg";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";

export default function AboutHero() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  return (
    <section className="relative h-screen w-full overflow-hidden md:mb-12">
      <div className="absolute inset-0">
        <Image
          src={AboutBg}
          alt="Garage background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/60 rounded-lg" />
      </div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="flex items-center gap-2 mb-6 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm font-medium">{trans.hero.established}</span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="mb-4 text-4xl md:text-6xl text-white leading-tight"
        >
          {trans.hero.title1}<br />{trans.hero.title2}
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="text-xl md:text-2xl text-gray-200 mb-6 font-light"
        >
          {trans.hero.subtitle}
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="max-w-3xl text-base md:text-lg text-gray-300 mb-8 leading-relaxed"
        >
          {trans.hero.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
