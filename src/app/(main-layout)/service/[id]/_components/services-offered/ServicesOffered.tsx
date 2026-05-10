"use client";
import Image from "next/image";
import { motion } from "framer-motion";
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
    { icon: AcServiceIcon, label: trans.services.acService, color: "text-blue-500" },
    { icon: BatteryReplacement, label: trans.services.batteryReplacement, color: "text-green-500" },
    { icon: TiresIcon, label: trans.services.tires, color: "text-gray-900" },
    { icon: EngineDiagnosticsIcon, label: trans.services.engineDiagnostics, color: "text-gray-400" },
    { icon: ElectricalIcon, label: trans.services.electrical, color: "text-yellow-500" },
    { icon: SparesIcon, label: trans.services.spares, color: "text-orange-500" },
  ];

  return (
    <section className=" md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-10 text-2xl md:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {trans.servicesOffered}
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 lg:gap-[2.5rem] md:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Image src={service.icon} alt={service.label} width={48} height={48} className={service.color} />
              <span className="text-center text-base font-medium text-gray-700">{service.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
