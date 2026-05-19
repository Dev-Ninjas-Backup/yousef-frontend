"use client";
import { Heart, ThumbsUp, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";

export default function ValuesSection() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  const values = [
    {
      icon: Heart,
      title: trans.values.customerCare.title,
      description: trans.values.customerCare.description,
      gradient: "from-rose-500 to-pink-600",
      glow: "hover:shadow-rose-500/20",
    },
    {
      icon: ThumbsUp,
      title: trans.values.honestService.title,
      description: trans.values.honestService.description,
      gradient: "from-blue-500 to-indigo-600",
      glow: "hover:shadow-blue-500/20",
    },
    {
      icon: Clock,
      title: trans.values.reliability.title,
      description: trans.values.reliability.description,
      gradient: "from-emerald-500 to-teal-600",
      glow: "hover:shadow-emerald-500/20",
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contained dark card */}
        <div className="relative bg-gray-950 rounded-2xl md:rounded-3xl px-8 md:px-14 py-16 overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-800/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-purple-800/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Header */}
          <motion.div
            className="text-center mb-14 relative z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm font-medium">{trans.values.title}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {trans.values.subtitle}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              {trans.values.description}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${value.glow} flex flex-col`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <div className={`bg-gradient-to-br ${value.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

