"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { downloadAppTranslations } from "@/translations/downloadApp";
import sparePartsImg from "@/assets/home/SpareParts/spare_parts.jpg";
import Link from "next/link";

const MarketplaceFeature: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(downloadAppTranslations);

  const features = [
    {
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      text: trans.marketplace?.feature1 || "Thousands of Genuine Parts",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-400" />,
      text: trans.marketplace?.feature2 || "Direct Buyer-Seller Chat",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      text: trans.marketplace?.feature3 || "Secure & Verified Listings",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Marketplace Integration
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {trans.marketplace?.title || "Buy & Sell Auto Parts"}
              </h2>
              <p className="text-xl text-gray-400 font-medium">
                {trans.marketplace?.subtitle || "The Ultimate Spare Parts Marketplace"}
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg">
              {trans.marketplace?.description || "Looking for genuine car parts or trying to sell your old accessories? SayaraHub's built-in marketplace connects buyers and sellers across the UAE. From brake pads to engine components, find exactly what you need at the best prices."}
            </p>

            <ul className="space-y-5">
              {features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                  className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="bg-white/10 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-lg text-gray-200">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-4">
              <Link href="/spare-parts">
                <button className="group relative bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
                  {trans.marketplace?.downloadButton || "Explore Marketplace"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] group">
              <Image 
                src={sparePartsImg} 
                alt="Spare Parts Marketplace" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Floating UI Elements over the image */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <div className="text-white font-bold text-lg">Brake Pads Set</div>
                  <div className="text-blue-300 text-sm">Genuine OEM Part</div>
                </div>
                <div className="text-white font-bold text-xl bg-blue-600 px-4 py-2 rounded-lg">
                  $120
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:10px_10px]" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:10px_10px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MarketplaceFeature;
