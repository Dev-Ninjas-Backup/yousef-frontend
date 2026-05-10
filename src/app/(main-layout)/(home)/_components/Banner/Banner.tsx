"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import applestore from "@/assets/home/banner/apple_store.svg";
import playstore from "@/assets/home/banner/playstore.svg";
import { useLanguage } from "@/context/LanguageContext";
import { bannerTranslations } from "@/translations/banner";

const HeroBanner: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(bannerTranslations);
  return (
    <section className="relative w-full h-[500px]  md:h-[700px] lg:h-[900px] overflow-hidden pt-10 md:pt-0">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        >
          <source src="./banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 rounded-lg" />
      </div>
      <div className="relative container mx-auto z-10 flex items-center h-full px-4">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {trans.title1}
          </motion.h2>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-blue-500">{trans.title2}</span>
          </motion.h3>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            {trans.title3}
          </motion.h3>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed"
          >
            {trans.description}{" "}
            <span className="text-white font-semibold notranslate" translate="no">{trans.appName}</span>
            {trans.descriptionContinue}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
          >
            <Button
              asChild
              className="bg-white hover:bg-gray-100 text-black rounded-lg py-3 px-4 sm:py-4 sm:px-6 w-full sm:w-auto h-14 sm:h-16"
            >
              <Link href="#" className="flex items-center justify-start gap-3">
                <Image
                  src={applestore}
                  alt="Apple Store"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-gray-600">
                    {trans.downloadOn}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold">
                    {trans.appStore}
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              className="bg-white hover:bg-gray-100 text-black rounded-lg py-3 px-4 sm:py-4 sm:px-6 w-full sm:w-auto h-14 sm:h-16"
            >
              <Link href="#" className="flex items-center justify-start gap-3">
                <Image
                  src={playstore}
                  alt="Play Store"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-gray-600">
                    {trans.downloadOn}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold">
                    {trans.playStore}
                  </div>
                </div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
