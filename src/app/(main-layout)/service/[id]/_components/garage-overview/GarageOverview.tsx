"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import garageOverviewBg from "@/assets/service/garage/garage_overview.png";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface GarageOverviewProps {
  description: string[];
  image?: string | StaticImageData;
}

export default function GarageOverview({
  description,
  image = garageOverviewBg,
}: GarageOverviewProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  const imageSrc = image && image !== "" ? image : garageOverviewBg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Description Block */}
          <div className="lg:col-span-7">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              {trans.garageOverview}
            </h2>
            <div className="space-y-4">
              {description.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-slate-600 leading-relaxed text-sm md:text-base font-medium"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image Block */}
          <div className="lg:col-span-5 relative h-[220px] sm:h-[280px] overflow-hidden rounded-xl border border-slate-100 shadow-inner">
            <Image 
              src={imageSrc} 
              alt="Garage Overview" 
              fill 
              sizes="(max-width: 1024px) 100vw, 533px"
              className="object-cover" 
            />
          </div>

        </div>
      </Card>
    </motion.div>
  );
}
