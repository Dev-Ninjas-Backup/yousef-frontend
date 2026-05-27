"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import AcServiceIcon from "@/assets/service/garage/ac_service_icon.svg";
import BatteryReplacement from "@/assets/service/garage/battery_icon.svg";
import TiresIcon from "@/assets/service/garage/tires_icon.svg";
import EngineDiagnosticsIcon from "@/assets/service/garage/engine_icon.svg";
import ElectricalIcon from "@/assets/service/garage/electrical_icon.svg";
import SparesIcon from "@/assets/service/garage/spare_icon.svg";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface ServicesOfferedProps {
  services?: string[];
}

const getServiceConfig = (name: string) => {
  const norm = name.toLowerCase().trim();
  
  if (norm.includes("ac service") || norm.includes("air condition")) {
    return { icon: AcServiceIcon, bg: "bg-[#EFF6FF]", border: "border-blue-100", isSvg: true };
  }
  if (norm.includes("battery")) {
    return { icon: BatteryReplacement, bg: "bg-[#F0FDF4]", border: "border-green-100", isSvg: true };
  }
  if (norm.includes("tire") || norm.includes("wheel")) {
    return { icon: TiresIcon, bg: "bg-[#F8FAFC]", border: "border-slate-200", isSvg: true };
  }
  if (norm.includes("diagnostic") || norm.includes("scan")) {
    return { icon: EngineDiagnosticsIcon, bg: "bg-[#F5F3FF]", border: "border-purple-100", isSvg: true };
  }
  if (norm.includes("electrical")) {
    return { icon: ElectricalIcon, bg: "bg-[#FEFCE8]", border: "border-yellow-100", isSvg: true };
  }
  if (norm.includes("spare") || norm.includes("part")) {
    return { icon: SparesIcon, bg: "bg-[#FFF7ED]", border: "border-orange-100", isSvg: true };
  }
  
  // Custom mappings for other common services to make them look great:
  if (norm.includes("oil") || norm.includes("lube") || norm.includes("fluid") || norm.includes("change")) {
    return { icon: Wrench, bg: "bg-[#FEF2F2]", border: "border-red-100", isSvg: false, iconColor: "text-red-500" };
  }
  if (norm.includes("brake")) {
    return { icon: Wrench, bg: "bg-[#FFF1F2]", border: "border-rose-100", isSvg: false, iconColor: "text-rose-500" };
  }
  if (norm.includes("engine") || norm.includes("motor")) {
    return { icon: Wrench, bg: "bg-[#F0FDF4]", border: "border-green-100", isSvg: false, iconColor: "text-green-500" };
  }
  if (norm.includes("body") || norm.includes("paint")) {
    return { icon: Wrench, bg: "bg-[#FDF2F8]", border: "border-pink-100", isSvg: false, iconColor: "text-pink-500" };
  }
  if (norm.includes("towing") || norm.includes("rescue")) {
    return { icon: Wrench, bg: "bg-[#FFF7ED]", border: "border-orange-100", isSvg: false, iconColor: "text-orange-500" };
  }
  
  // Default fallback
  return { icon: Wrench, bg: "bg-[#F8FAFC]", border: "border-slate-100", isSvg: false, iconColor: "text-slate-500" };
};

export default function ServicesOffered({ services = [] }: ServicesOfferedProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);

  // If no services are provided, fallback to default mock list
  const displayServices = services.length > 0 ? services : [
    trans.services.acService,
    trans.services.batteryReplacement,
    trans.services.tires,
    trans.services.engineDiagnostics,
    trans.services.electrical,
    trans.services.spares
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
          {displayServices.map((serviceName, index) => {
            const config = getServiceConfig(serviceName);
            const Icon = config.icon;
            
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-3 rounded-xl bg-slate-50/50 p-5 border border-slate-100 hover:shadow-sm hover:bg-slate-55 transition-all duration-200"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center border ${config.border} shadow-inner`}>
                  {config.isSvg ? (
                    <Image 
                      src={Icon} 
                      alt={serviceName} 
                      width={24} 
                      height={24} 
                      className="object-contain"
                    />
                  ) : (
                    <Icon className={`w-5 h-5 ${config.iconColor || "text-gray-500"}`} />
                  )}
                </div>
                <span className="text-center text-xs md:text-sm font-bold text-slate-800 tracking-tight leading-tight">
                  {serviceName}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
