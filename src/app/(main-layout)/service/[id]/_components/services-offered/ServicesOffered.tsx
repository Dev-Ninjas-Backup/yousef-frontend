import { 
  Snowflake, 
  Battery, 
  Wrench, 
  Zap, 
  Settings 
} from "lucide-react";

const services = [
  { icon: Snowflake, label: "AC Service" },
  { icon: Battery, label: "Battery Replacement" },
  { icon: Settings, label: "Tires" },
  { icon: Wrench, label: "Engine Diagnostics" },
  { icon: Zap, label: "Electrical" },
  { icon: Settings, label: "Spares" },
];

export default function ServicesOffered() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Services Offered</h2>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 rounded-lg border p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-center text-sm font-medium">
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
