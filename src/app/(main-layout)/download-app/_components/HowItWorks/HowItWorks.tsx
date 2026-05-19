"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";
import { MapPin, MessageCircle, ShieldCheck, Download, Navigation, Info } from "lucide-react";
import Image from "next/image";
import h1 from "@/assets/download-app/howItworks/h_1.png";
import h2 from "@/assets/download-app/howItworks/h_2.png";
import h3 from "@/assets/download-app/howItworks/h_3.png";
import h4 from "@/assets/download-app/howItworks/h_4.png";
import h5 from "@/assets/download-app/howItworks/h_5.png";

const stepIcons = [Download, MapPin, MessageCircle, Navigation, ShieldCheck];
const stepImages = [h1, h2, h3, h4, h5];

const badgeIcons = [MapPin, MessageCircle, ShieldCheck];

const numberColors = [
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-600",
  "bg-yellow-50 text-yellow-600",
  "bg-purple-50 text-purple-600",
  "bg-red-50 text-red-600"
];

const tagColors = [
  "text-blue-600 bg-blue-50",
  "text-green-600 bg-green-50",
  "text-yellow-600 bg-yellow-50",
  "text-purple-600 bg-purple-50",
  "text-red-600 bg-red-50"
];

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Header */}
        <motion.div
          className="text-center mb-4 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            {trans.howItWorks.titlePrefix}{" "}
            <span className="text-blue-600">{trans.howItWorks.titleHighlight}</span>{" "}
            {trans.howItWorks.titleSuffix}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4 whitespace-pre-line">
            {trans.howItWorks.description}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8">
            {trans.howItWorks.badges?.map((badge: string, index: number) => {
              const Icon = badgeIcons[index] || ShieldCheck;
              return (
                <div key={index} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50/60 text-blue-700 text-sm md:text-base font-semibold shadow-sm border border-blue-100/60">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  {badge}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="w-full mx-auto relative pt-8">
          {/* Connecting Line - desktop only */}
          <div className="hidden lg:block absolute top-[56px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 xl:gap-8 relative z-10">
            {trans.howItWorks.steps?.map((step: any, index: number) => {
              const TagIcon = stepIcons[index] || ShieldCheck;
              const numColorClass = numberColors[index];
              const tColorClass = tagColors[index];
              const imageUrl = stepImages[index];

              return (
                <motion.div
                  key={index}
                  className="flex flex-col relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  {/* Number Indicator */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm ${numColorClass} ring-[6px] ring-white`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col h-full overflow-hidden">
                    {/* Image */}
                    <div className="h-44 md:h-48 relative w-full bg-gray-50 overflow-hidden border-b border-gray-50">
                      <Image src={imageUrl} alt={step.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow text-center items-center">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                        {step.description}
                      </p>
                      
                      {/* Tag */}
                      <div className={`mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${tColorClass}`}>
                        <TagIcon className="w-4 h-4" />
                        {step.tag}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Notice Section */}
        {trans.howItWorks.notice && (
          <motion.div
            className="mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-50/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-blue-100 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-grow z-10 pr-0 sm:pr-16">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="font-bold text-blue-900">{trans.howItWorks.noticeTitle}</span>{" "}
                  {trans.howItWorks.notice}
                </p>
              </div>
              
              <div className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center">
                <ShieldCheck className="w-16 h-16" fill="#3b82f6" color="white" strokeWidth={1} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
