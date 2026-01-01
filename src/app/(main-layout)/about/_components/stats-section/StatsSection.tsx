import { Lightbulb, Rocket, TrendingUp, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import AboutStats from "@/assets/about/stats/about_stats.jpg";

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "850+", label: "Parts Available" },
  { value: "4.9", label: "Average Rating", icon: true },
];

const timeline = [
  {
    icon: Lightbulb,
    title: "The Idea",
    description:
      "Identifying the gap in reliable automotive services across the UAE",
  },
  {
    icon: Rocket,
    title: "Launch 2025",
    description:
      "Platform goes live with verified garages and spare parts marketplace",
  },
  {
    icon: TrendingUp,
    title: "Growth & Expansion",
    description: "Continuous innovation and expanding partnerships nationwide",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4 md:my-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={AboutStats}
                alt="Mechanic working"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-600  text-white rounded-2xl p-6 shadow-2xl drop-shadow-2xl">
              <div className="text-4xl font-bold">2025</div>
              <div className="text-sm">Year Founded</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 bg-blue-100 rounded-full py-2 px-4 w-fit">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl  text-gray-900 mb-6">
              Where Innovation Meets Tradition
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
              <p>
                In 2025, we embarked on a mission to transform the automotive
                service industry. Recognizing the gap between car owners and
                reliable service providers, we created a comprehensive platform
                designed to simplify vehicle maintenance and parts procurement.
              </p>
              <p>
                What started as a vision to bring transparency and convenience
                to automotive services has evolved into a thriving marketplace.
                We combine cutting-edge technology with time-tested expertise,
                offering everything from routine maintenance to premium auto
                parts all in one seamless platform.
              </p>
              <p>
                Today, we&apos;re proud to serve a growing community of car
                enthusiasts, daily commuters, and professional mechanics who
                trust us for quality, reliability, and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl text-blue-600 mb-1 flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.icon && <Star className="w-6 h-6 fill-blue-600" />}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative grid md:grid-cols-3 gap-2 md:gap-24">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div className="relative bg-gradient-to-br from-blue-50/50 to-white p-6 pt-8 rounded-xl shadow-sm border border-blue-100">
                {/* Icon at top center */}
                <div className="mx-auto mb-4 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                {/* Gradient line under icon */}
                {/* <div className="mx-auto mb-4 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" /> */}

                <h3 className="text-lg font-semibold text-blue-600 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {item.description}
                </p>
              </div>

              {/* Connecting line between cards - Desktop */}
              {index < timeline.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-full w-24 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400" />
              )}

              {/* Mobile vertical connecting line */}
              {index < timeline.length - 1 && (
                <div className="md:hidden mx-auto  w-0.5 h-16 bg-gradient-to-b from-blue-500 to-blue-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
