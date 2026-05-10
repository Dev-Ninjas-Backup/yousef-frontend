"use client";
import { Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutStats from "@/assets/about/stats/about_stats.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";
import { Lightbulb, Rocket, TrendingUp } from "lucide-react";

export default function StatsSection() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  const stats = [
    { value: "500+", label: trans.stats.happyCustomers },
    { value: "850+", label: trans.stats.partsAvailable },
    { value: "4.9", label: trans.stats.averageRating, icon: true },
  ];

  const timeline = [
    {
      icon: Lightbulb,
      title: trans.stats.timeline.idea.title,
      description: trans.stats.timeline.idea.description,
    },
    {
      icon: Rocket,
      title: trans.stats.timeline.launch.title,
      description: trans.stats.timeline.launch.description,
    },
    {
      icon: TrendingUp,
      title: trans.stats.timeline.growth.title,
      description: trans.stats.timeline.growth.description,
    },
  ];
  return (
    <section className="py-16 px-4 md:my-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-start mb-16"
          dir="ltr"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
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
              <div className="text-sm">{trans.stats.yearFounded}</div>
            </div>
          </div>

          <div dir="auto">
            <div className="flex items-center gap-2 mb-4 bg-blue-100 rounded-full py-2 px-4 w-fit">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">
                {trans.stats.ourStory}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold  text-gray-900 mb-6">
              {trans.stats.title}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
              {trans.stats.content.map((paragraph: any, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl text-blue-600 mb-1 flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.icon && <Star className="w-6 h-6 fill-blue-600" />}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-2 md:gap-24" dir="ltr">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
