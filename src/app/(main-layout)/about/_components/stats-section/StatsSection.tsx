"use client";
import { Search, ClipboardList, MessageSquare, ArrowRight, Wrench, Truck, Settings, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutStats from "@/assets/about/stats/about_stats.png";
import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans">
      <div className="max-w-[1280px] mx-auto space-y-24 md:space-y-32">
        
        {/* Top Section: Feature Highlight */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side: Image */}
          <motion.div 
            className="relative rounded-[24px] overflow-hidden aspect-square shadow-lg flex flex-col justify-end p-8 md:p-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image src={AboutStats} alt="Mechanic" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            
            <div className="relative z-10 flex flex-col gap-8 md:gap-10">
              {/* Big text on image */}
              <div>
                <h2 className="text-5xl md:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
                  Find.<br/>
                  <span className="text-blue-500">Connect.</span><br/>
                  Fix your car.
                </h2>
              </div>

              {/* Dark glass card */}
              <div className="bg-[#0f141e] border border-white/10 rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-2xl w-fit min-w-[260px]">
                <div className="flex-shrink-0">
                   <ShieldCheck className="w-7 h-7 text-blue-500" strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-0.5">
                   <p className="text-white font-bold text-[13px] leading-tight">No middleman.</p>
                   <p className="text-white font-bold text-[13px] leading-tight">No payments.</p>
                   <p className="text-blue-500 font-bold text-[13px] leading-tight">Just direct contact.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Text & List */}
          <motion.div 
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-50/80 text-blue-600 px-3 py-1.5 rounded-full w-fit">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[13px] font-semibold">About SayaraHub</span>
            </div>

            <h2 className="text-4xl md:text-[44px] lg:text-[48px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              The fastest way to find<br/>
              car services <span className="text-blue-600">in the UAE</span>
            </h2>

            <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl">
              SayaraHub connects you with nearby garages, towing services, and spare parts sellers — all in one place.
            </p>

            <p className="text-gray-900 font-bold text-[15px]">
              No middleman. No payments. Just direct contact.
            </p>

            <div className="flex flex-col gap-3.5 mt-2">
              {[
                { icon: Wrench, title: "Find garages by speciality", desc: "From engine repair to bodywork, find the right experts near you." },
                { icon: Truck, title: "Get towing near your location", desc: "24/7 towing services, available when you need them." },
                { icon: Settings, title: "Browse parts & contact sellers", desc: "Discover spare parts and connect directly with sellers." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 md:px-5 md:py-4 rounded-[16px] border border-gray-100 bg-white hover:border-gray-200 transition-colors">
                  <div className="w-[46px] h-[46px] rounded-full bg-[#f0f5ff] text-blue-600 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">{item.title}</h4>
                    <p className="text-gray-500 text-[13px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/services" className="mt-3 bg-[#1d64f2] hover:bg-blue-700 text-white font-medium text-[15px] py-3 px-6 rounded-xl flex items-center gap-2 w-fit transition-colors">
              Explore Services
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section: How it works */}
        <motion.div 
          className="bg-[#f8f9fc] rounded-[24px] md:rounded-[32px] p-8 md:p-14 lg:p-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16 flex flex-col items-center">
            <span className="text-[#1d64f2] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">SIMPLE. FAST. DIRECT.</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 mb-4 tracking-tight">
              How <span className="text-[#1d64f2]">SayaraHub</span> Works
            </h2>
            <p className="text-gray-600 text-[15px]">
              We make it easy to find the right service or part and connect directly.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6 relative max-w-5xl mx-auto">
            {/* Arrows for desktop */}
            <div className="hidden md:flex absolute top-1/2 left-[31%] -translate-y-1/2 text-blue-200 z-0">
               <ArrowRight className="w-6 h-6 text-[#cce0ff]" strokeWidth={2} strokeDasharray="4 2" />
               <div className="w-8 lg:w-16 h-0 border-t-2 border-dashed border-[#cce0ff] absolute top-1/2 left-full -translate-y-1/2 -ml-1"></div>
               <div className="w-8 lg:w-16 h-0 border-t-2 border-dashed border-[#cce0ff] absolute top-1/2 right-full -translate-y-1/2 -mr-1"></div>
            </div>
            <div className="hidden md:flex absolute top-1/2 right-[31%] -translate-y-1/2 text-blue-200 z-0">
               <ArrowRight className="w-6 h-6 text-[#cce0ff]" strokeWidth={2} strokeDasharray="4 2" />
               <div className="w-8 lg:w-16 h-0 border-t-2 border-dashed border-[#cce0ff] absolute top-1/2 left-full -translate-y-1/2 -ml-1"></div>
               <div className="w-8 lg:w-16 h-0 border-t-2 border-dashed border-[#cce0ff] absolute top-1/2 right-full -translate-y-1/2 -mr-1"></div>
            </div>

            {[
              { icon: Search, num: "1", title: "Search", desc: "Find garages, towing, or parts in seconds." },
              { icon: ClipboardList, num: "2", title: "Compare", desc: "View options, specialities, and details." },
              { icon: MessageSquare, num: "3", title: "Contact", desc: "Contact them via the platform or call directly." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-white rounded-2xl p-6 lg:p-8 flex-1 w-full flex items-center gap-5 border border-gray-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-[#f0f5ff] text-[#1d64f2] flex items-center justify-center font-bold text-[11px]">
                  {step.num}
                </div>
                <div className="w-16 h-16 rounded-full bg-[#f0f5ff] text-[#1d64f2] flex items-center justify-center shrink-0">
                  <step.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed pr-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="mt-10 md:mt-12 bg-white/80 border border-gray-100 rounded-[14px] p-3 md:p-4 flex items-center justify-center gap-2 max-w-3xl mx-auto text-center">
             <Info className="w-[18px] h-[18px] text-gray-400 shrink-0" />
             <p className="text-gray-500 text-[13px] font-medium">
               SayaraHub does not handle payments or delivery. All deals are made directly between users and providers.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


