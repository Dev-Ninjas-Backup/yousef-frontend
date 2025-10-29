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
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold">Operating Hours</h2>

        <div className="max-w-md space-y-3">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <span className="font-medium text-gray-700">{hour.day}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{hour.hours}</span>
                <Badge
                  variant={hour.status === "Open" ? "default" : "destructive"}
                  className={
                    hour.status === "Open" ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {hour.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
