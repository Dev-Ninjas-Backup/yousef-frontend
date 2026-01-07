"use client";
import { Badge } from "@/components/ui/badge";
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
    <section className="bg-white md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 md:mb-10 text-2xl md:text-4xl font-bold text-gray-900">
          {trans.operatingHours}
        </h2>

        <div className="max-w-2xl space-y-2 md:space-y-6">
          {hours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-900">{hour.day}</span>
                <span className="text-sm text-gray-600">{hour.hours}</span>
              </div>
              <Badge
                variant="outline"
                className={`${
                  hour.status === "Open"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } px-8 py-2 rounded-full text-base font-medium w-20 md:w-32`}
              >
                {hour.status === "Open" ? trans.open : trans.closed}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
