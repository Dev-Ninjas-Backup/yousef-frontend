import Image from "next/image";
import AcServiceIcon from "@/assets/service/garage/ac_service_icon.svg";
import BatteryReplacement from "@/assets/service/garage/battery_icon.svg";
import TiresIcon from "@/assets/service/garage/tires_icon.svg";
import EngineDiagnosticsIcon from "@/assets/service/garage/engine_icon.svg";
import ElectricalIcon from "@/assets/service/garage/electrical_icon.svg";
import SparesIcon from "@/assets/service/garage/spare_icon.svg";

const services = [
  { icon: AcServiceIcon, label: "AC Service", color: "text-blue-500" },
  {
    icon: BatteryReplacement,
    label: "Battery Replacement",
    color: "text-green-500",
  },
  { icon: TiresIcon, label: "Tires", color: "text-gray-900" },
  {
    icon: EngineDiagnosticsIcon,
    label: "Engine Diagnostics",
    color: "text-gray-400",
  },
  { icon: ElectricalIcon, label: "Electrical", color: "text-yellow-500" },
  { icon: SparesIcon, label: "Spares", color: "text-orange-500" },
];

export default function ServicesOffered() {
  return (
    <section className=" md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-2xl md:text-4xl font-bold text-gray-900">
          Services Offered
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={service.icon}
                alt={service.label}
                width={48}
                height={48}
                className={service.color}
              />
              <span className="text-center text-base font-medium text-gray-700">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
