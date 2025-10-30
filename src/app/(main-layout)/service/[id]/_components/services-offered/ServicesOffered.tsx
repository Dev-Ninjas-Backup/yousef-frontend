import {
  Snowflake,
  Battery,
  Wrench,
  Zap,
  Settings,
  CircleDot,
} from "lucide-react";

const services = [
  { icon: Snowflake, label: "AC Service", color: "text-blue-500" },
  { icon: Battery, label: "Battery Replacement", color: "text-green-500" },
  { icon: CircleDot, label: "Tires", color: "text-gray-900" },
  { icon: Wrench, label: "Engine Diagnostics", color: "text-gray-400" },
  { icon: Zap, label: "Electrical", color: "text-yellow-500" },
  { icon: Settings, label: "Spares", color: "text-orange-500" },
];

export default function ServicesOffered() {
  return (
    <section className=" md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-2xl md:text-4xl font-bold text-gray-900">
          Services Offered
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className={`h-12 w-12 ${service.color}`} />
                <span className="text-center text-base font-medium text-gray-700">
                  {service.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
