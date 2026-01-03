"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import img3 from "@/assets/download-app/trustedpartner/top-img.png";
import img4 from "@/assets/download-app/trustedpartner/bottom-img.png";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";

const TrustedPartner: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center md:text-start">
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {trans.trustedPartner.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {trans.trustedPartner.subtitle}
          </p>
        </div>

        <div className="bg-[#1A73E8] rounded-2xl md:rounded-3xl overflow-hidden h-[600px]">
          <div className="grid lg:grid-cols-2 items-center h-full">
            <div className="text-white flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6 md:p-12 p-6 h-full">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {trans.trustedPartner.downloadTitle} <span className="italic">{trans.trustedPartner.downloadTitleItalic}</span>
              </h3>
              <p className="text-blue-50 text-sm md:text-base lg:text-lg leading-relaxed">
                {trans.trustedPartner.description}
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 max-w-[200px] text-white px-6 md:px-8 py-4 md:py-6 rounded-lg text-sm md:text-base w-full sm:w-auto">
                {trans.trustedPartner.downloadButton}
              </Button>
            </div>

           <div className="relative lg:flex justify-center items-end mt-6 lg:mt-0 h-full hidden">
              <div className="absolute left-0 -bottom-5 z-10">
                <div className="w-30">
                  <img 
                    src={img4.src} 
                    alt="SayaraHub App Screen 1" 
                    className="w-full h-auto rounded-xl md:rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute right-1/4 translate-x-1/3 -top-5">
                <div className="w-30">
                  <img 
                    src={img3.src} 
                    alt="SayaraHub App Screen 2" 
                    className="w-full h-auto rounded-xl md:rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;
