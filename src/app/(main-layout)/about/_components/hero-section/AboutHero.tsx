"use client";
import { Sparkles, MapPin, Wrench, Star } from "lucide-react";
import { motion } from "framer-motion";
import AboutBg from "@/assets/about/Banner/about_banner.jpg";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";

export default function AboutHero() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  return (
    <section className="relative min-h-[480px] md:min-h-[560px] w-full overflow-hidden flex items-center rounded-2xl md:rounded-3xl">
      {/* Background Image */}
      <Image
        src={AboutBg}
        alt="About SayaraHub"
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover"
        priority
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 w-full flex flex-col justify-center pt-28 pb-20 md:pt-32 md:pb-24">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full w-fit transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:border-white/35 cursor-default select-none"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-semibold tracking-wide">{trans.hero.established}</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            {trans.hero.title1}
            <span className="block text-blue-400">{trans.hero.title2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-lg md:text-xl text-blue-200 font-medium mb-4"
          >
            {trans.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl"
          >
            {trans.hero.description}
          </motion.p>

          {/* Quick stat chips */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: <MapPin className="w-4 h-4" />, label: "UAE-Wide Coverage" },
              { icon: <Wrench className="w-4 h-4" />, label: "Verified Garages" },
              { icon: <Star className="w-4 h-4" />, label: "500+ Happy Users" },
            ].map((chip, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:border-white/35 cursor-default select-none shadow-sm hover:shadow-md"
              >
                <span className="text-blue-300">{chip.icon}</span>
                {chip.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
