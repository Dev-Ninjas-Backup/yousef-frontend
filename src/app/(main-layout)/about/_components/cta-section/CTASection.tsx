"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ClipboardCheck, Wrench, Handshake, Users, ShieldCheck } from "lucide-react";
import Cta1 from "@/assets/about/cta/c_1.png";
import Cta2 from "@/assets/about/cta/c_2.png";
import Cta3 from "@/assets/about/cta/c_3.png";

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1280px] mx-auto relative rounded-[40px] bg-[#124cc9] overflow-hidden shadow-2xl">
        
        {/* Background Dot Pattern (Top Right) */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_2px,transparent_2px)] bg-[size:24px_24px] opacity-40 mix-blend-overlay pointer-events-none" />
        {/* Soft Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full w-fit">
                <span className="text-[11px] text-blue-100 font-bold tracking-widest uppercase">Your Journey, Our Mission</span>
              </div>

              <h2 className="text-4xl md:text-[54px] font-extrabold text-white leading-[1.1] tracking-tight">
                Be Part of <span className="text-[#38bdf8]">Our Story</span>
              </h2>

              <p className="text-blue-100/90 text-[15px] md:text-[17px] leading-relaxed max-w-xl">
                Whether you&apos;re a car owner, garage owner, or partner, join us as we redefine automotive service for the digital age.
              </p>
            </motion.div>

            {/* Features Row */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-row items-start gap-4">
                <div className="w-[48px] h-[48px] rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-lg">
                  <ClipboardCheck className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                </div>
                <div className="flex flex-col pt-1">
                  <h4 className="text-white font-bold text-[15px]">For Car Owners</h4>
                  <p className="text-blue-200/90 text-[13px] leading-[1.4] mt-1 pr-2">Find verified services near you, fast.</p>
                </div>
              </div>
              
              <div className="flex flex-row items-start gap-4">
                <div className="w-[48px] h-[48px] rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-lg">
                  <Wrench className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                </div>
                <div className="flex flex-col pt-1">
                  <h4 className="text-white font-bold text-[15px]">For Garages</h4>
                  <p className="text-blue-200/90 text-[13px] leading-[1.4] mt-1 pr-2">Grow your business and connect with more customers.</p>
                </div>
              </div>

              <div className="flex flex-row items-start gap-4">
                <div className="w-[48px] h-[48px] rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-lg">
                  <Handshake className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                </div>
                <div className="flex flex-col pt-1">
                  <h4 className="text-white font-bold text-[15px]">For Partners</h4>
                  <p className="text-blue-200/90 text-[13px] leading-[1.4] mt-1 pr-2">Collaborate and build the future of auto services.</p>
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/contact-us">
                <button className="group flex items-center justify-center gap-2 bg-white text-[#124cc9] font-bold px-8 py-3.5 rounded-[12px] hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Mail className="w-[18px] h-[18px]" />
                  Contact Us
                </button>
              </Link>
              <Link href="/service">
                <button className="group flex items-center justify-center gap-2 bg-transparent border-[1.5px] border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-[12px] transition-all">
                  Get Started
                  <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>

            {/* Footer Text */}
            <motion.div 
              className="flex items-center gap-2 mt-6 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ShieldCheck className="w-[18px] h-[18px] text-blue-300 shrink-0" />
              <span className="text-blue-200/90 text-[13px] font-medium tracking-wide">
                Chosen by customers. Driven by innovation. Built for the future.
              </span>
            </motion.div>
          </div>

          {/* Right Column: Image Collage */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center pl-0 lg:pl-8 mt-10 lg:mt-0">
            <div className="relative w-full max-w-[500px] aspect-[4/3.8] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl bg-[#124cc9]">
              
              {/* Rotated Inner Grid */}
              <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[10deg] flex flex-col gap-3 md:gap-4">
                
                {/* Top Image */}
                <motion.div 
                  className="relative w-full h-[58%] rounded-[20px] overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Image src={Cta1} alt="Mechanic" fill className="object-cover -rotate-[10deg] scale-[1.35]" />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
                </motion.div>
                
                {/* Bottom Row */}
                <div className="relative w-full h-[42%] flex flex-row gap-3 md:gap-4">
                  {/* Bottom Left */}
                  <motion.div 
                    className="relative w-[58%] h-full rounded-[20px] overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Image src={Cta2} alt="Driver" fill className="object-cover -rotate-[10deg] scale-[1.35]" />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
                  </motion.div>
                  
                  {/* Bottom Right */}
                  <motion.div 
                    className="relative w-[42%] h-full rounded-[20px] overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Image src={Cta3} alt="Partnership" fill className="object-cover -rotate-[10deg] scale-[1.35]" />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
                  </motion.div>
                </div>

              </div>

              {/* Center Blue Badge */}
              <motion.div 
                className="absolute z-40 bg-[#2563eb] w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-[18px] md:rounded-[22px] shadow-xl flex items-center justify-center top-[54%] left-[48%] -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", bounce: 0.5 }}
              >
                <Users className="w-8 h-8 md:w-9 md:h-9 text-white" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

