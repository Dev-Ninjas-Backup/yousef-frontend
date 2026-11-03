"use client";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./_components/FaqItem";
import { useLanguage } from "@/context/LanguageContext";
import { faqTranslations } from "@/translations/faq";
import { AnimateOnScroll, StaggerOnScroll, fadeUp } from "@/lib/animations";

const Faq: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(faqTranslations);

  return (
    <>
      <section className="w-full py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variants={fadeUp} className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#101010] mb-4">
              {trans.title}
            </h2>
            <p className="text-base md:text-lg text-[#101010]">
              {trans.subtitle}
            </p>
          </AnimateOnScroll>

          <StaggerOnScroll>
            <Accordion type="single" collapsible className="space-y-4">
              {trans.faqs.map((faq: any, index: number) => (
                <AnimateOnScroll key={`item-${index + 1}`} variants={fadeUp} delay={index * 0.05}>
                  <FaqItem
                    id={`item-${index + 1}`}
                    question={faq.question}
                    answer={faq.answer}
                  />
                </AnimateOnScroll>
              ))}
            </Accordion>
          </StaggerOnScroll>
        </div>
      </section>
    </>
  );
};

export default Faq;
