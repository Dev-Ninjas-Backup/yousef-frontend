"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import contactHeroimg from "@/assets/contactus/contactus-img.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { contactTranslations } from "@/translations/contact";

const ContactHero: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(contactTranslations);

  const scrollToGetInTouch = () => {
    document.getElementById('get-in-touch')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[450px] md:h-[500px] lg:h-[720px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={contactHeroimg}
          alt="Contact us"
          fill
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-black/50 rounded-lg" />
      </div>

      <motion.div
        className="mt-10 md:mt-1 relative container mx-auto z-10 flex flex-col items-center justify-center h-full px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
        >
          {trans.hero.title}
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="text-sm sm:text-base md:text-3xl text-gray-200 mb-4 md:mb-6 max-w-4xl"
        >
          {trans.hero.description}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <Button onClick={scrollToGetInTouch} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-6 rounded-lg text-sm md:text-xl font-medium">
            {trans.hero.button}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
