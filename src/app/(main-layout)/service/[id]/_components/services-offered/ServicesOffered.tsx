"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import AcServiceIcon from "@/assets/service/garage/ac_service_icon.svg";
import BatteryReplacement from "@/assets/service/garage/battery_icon.svg";
import TiresIcon from "@/assets/service/garage/tires_icon.svg";
import EngineDiagnosticsIcon from "@/assets/service/garage/engine_icon.svg";
import ElectricalIcon from "@/assets/service/garage/electrical_icon.svg";
import SparesIcon from "@/assets/service/garage/spare_icon.svg";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

export default function ServicesOffered() {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  const services = [
    { icon: AcServiceIcon, label: trans.services.acService, bg: "bg-[#EFF6FF]", border: "border-blue-100" },
    { icon: BatteryReplacement, label: trans.services.batteryReplacement, bg: "bg-[#F0FDF4]", border: "border-green-100" },
    { icon: TiresIcon, label: trans.services.tires, bg: "bg-[#F8FAFC]", border: "border-slate-200" },
    { icon: EngineDiagnosticsIcon, label: trans.services.engineDiagnostics, bg: "bg-[#F5F3FF]", border: "border-purple-100" },
    { icon: ElectricalIcon, label: trans.services.electrical, bg: "bg-[#FEFCE8]", border: "border-yellow-100" },
    { icon: SparesIcon, label: trans.services.spares, bg: "bg-[#FFF7ED]", border: "border-orange-100" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            {trans.servicesOffered}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Specialized services equipped with advanced tools and experts.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 rounded-xl bg-slate-50/50 p-5 border border-slate-100 hover:shadow-sm hover:bg-slate-55 transition-all duration-200"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center border ${service.border} shadow-inner`}>
                <Image 
                  src={service.icon} 
                  alt={service.label} 
                  width={24} 
                  height={24} 
                  className="object-contain"
                />
              </div>
              <span className="text-center text-xs md:text-sm font-bold text-slate-800 tracking-tight leading-tight">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
