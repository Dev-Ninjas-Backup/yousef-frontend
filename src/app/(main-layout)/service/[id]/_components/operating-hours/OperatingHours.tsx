"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface OperatingHoursProps {
  hours: {
    day: string;
    hours: string;
    status: "Open" | "Closed";
  }[];
}

export default function OperatingHours({ hours }: OperatingHoursProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-5">
          <Clock className="w-5 h-5 text-[#2563EB]" />
          {trans.operatingHours}
        </h3>

        <div className="space-y-4">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-inner shrink-0">
                  <Calendar className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 leading-tight">
                    {hour.day}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 mt-0.5">
                    {hour.hours}
                  </span>
                </div>
              </div>
              
              <Badge
                variant="outline"
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  hour.status === "Open"
                    ? "bg-[#F0FDF4] text-[#15803D] border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {hour.status === "Open" ? trans.open : trans.closed}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
