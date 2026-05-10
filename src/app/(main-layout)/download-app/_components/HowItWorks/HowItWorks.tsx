"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            {trans.howItWorks.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-4 md:mt-6 px-4">
            {trans.howItWorks.description}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {trans.howItWorks.steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center text-gray-800 text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">
                  {index + 1}
                </div>

                {index < trans.howItWorks.steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-7 start-1/2 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0"
                    style={{ width: "calc(100% + 2rem)" }}
                  />
                )}

                {index < trans.howItWorks.steps.length && (
                  <>
                    <div
                      className="md:hidden absolute left-1/2 w-0.5 h-16 translate-x-1/ border-l-2 border-dashed border-gray-300 z-0"
                      style={{ top: "1rem" }}
                    />
                  </>
                )}

                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
