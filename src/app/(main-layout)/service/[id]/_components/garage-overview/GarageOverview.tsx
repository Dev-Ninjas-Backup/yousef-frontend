import Image from "next/image";

interface GarageOverviewProps {
  description: string[];
  image?: string;
}

export default function GarageOverview({
  description,
  image = "/images/garage-overview.jpg",
}: GarageOverviewProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold">Garage Overview</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Description */}
          <div className="space-y-4">
            {description.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[300px] overflow-hidden rounded-xl lg:h-full">
            <Image
              src={image}
              alt="Garage"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
