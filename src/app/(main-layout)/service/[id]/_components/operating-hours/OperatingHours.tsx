import { Badge } from "@/components/ui/badge";

interface OperatingHoursProps {
  hours: {
    day: string;
    hours: string;
    status: "Open" | "Closed";
  }[];
}

export default function OperatingHours({ hours }: OperatingHoursProps) {
  return (
    <section className="bg-white md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 md:mb-10 text-2xl md:text-4xl font-bold text-gray-900">
          Operating Hours
        </h2>

        <div className="max-w-2xl space-y-2 md:space-y-6">
          {hours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-lg text-gray-700">{hour.day}</span>
              <Badge
                variant="outline"
                className={`${
                  hour.status === "Open"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } px-8 py-2 rounded-full text-base font-medium w-20 md:w-32`}
              >
                {hour.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
