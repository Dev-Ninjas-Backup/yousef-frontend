"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";

export default function CTASection() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  return (
    <section className="py-20 px-4 bg-blue-600 mt-28">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl text-white mb-6">
          {trans.cta.title}
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          {trans.cta.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact-us">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2 px-6"
            >
              <Mail className="w-4 h-4" />
              {trans.cta.contactUs}
            </Button>
          </Link>
          <Link href="/service">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2 px-6"
            >
              {trans.cta.getStarted}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
