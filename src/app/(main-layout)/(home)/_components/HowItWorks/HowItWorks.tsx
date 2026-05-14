"use client";
import React from "react";
import StepCard from "./_components/StepCard";
import phoneImage1 from "@/assets/home/howItWorks/how-it-works-1.svg";
import phoneImage2 from "@/assets/home/howItWorks/how-it-works-2.svg";
import phoneImage3 from "@/assets/home/howItWorks/how-it-works-3.svg";
import { useLanguage } from "@/context/LanguageContext";
import { howItWorksTranslations } from "@/translations/howItWorks";
import { AnimateOnScroll, fadeUp, fadeLeft, fadeRight } from "@/lib/animations";

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(howItWorksTranslations);

  const stepsData = [
    {
      id: 1,
      title: trans.steps.step1.title,
      description: trans.steps.step1.description,
      imagePosition: "right" as const,
      phoneImage: phoneImage1,
    },
    {
      id: 2,
      title: trans.steps.step2.title,
      description: trans.steps.step2.description,
      imagePosition: "left" as const,
      phoneImage: phoneImage2,
    },
    {
      id: 3,
      title: trans.steps.step3.title,
      description: trans.steps.step3.description,
      imagePosition: "right" as const,
      phoneImage: phoneImage3,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <AnimateOnScroll variants={fadeUp} className="text-center mb-12 md:mb-25">
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-8">
            {trans.title} <span className="text-[#0D6EFD]">{trans.titleHighlight}</span>{trans.titleEnd}
          </h2>
          <p className="text-base md:text-xl text-[#333333] max-w-2xl mx-auto">
            {trans.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="space-y-16 md:space-y-24">
          {stepsData.map((step) => (
            <AnimateOnScroll
              key={step.id}
              variants={step.imagePosition === "right" ? fadeLeft : fadeRight}
            >
              <StepCard
                stepNumber={step.id}
                title={step.title}
                description={step.description}
                imagePosition={step.imagePosition}
                phoneImage={step.phoneImage.src}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
