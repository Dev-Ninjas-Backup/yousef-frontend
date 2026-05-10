"use client";
import { Heart, ThumbsUp, Clock } from "lucide-react";
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
    },
    {
      icon: ThumbsUp,
      title: trans.values.honestService.title,
      description: trans.values.honestService.description,
    },
    {
      icon: Clock,
      title: trans.values.reliability.title,
      description: trans.values.reliability.description,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 my-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm">{trans.values.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {trans.values.subtitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {trans.values.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl hover:bg-gray-800/70 transition-all items-center text-center flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
