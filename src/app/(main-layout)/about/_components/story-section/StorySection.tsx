"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Target, Shield, Award, Gem, Heart, Users, MapPin, ShieldCheck, Eye, Link2 } from "lucide-react";
import OurStory from "@/assets/about/story/our_story.png";
import OurMission from "@/assets/about/story/our_mission.png";
import OurVision from "@/assets/about/story/our_vision.png";
import Empowering from "@/assets/about/story/empowering.png";

export default function StorySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto space-y-24 md:space-y-32">
        
        {/* Our Story Block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] text-blue-600 px-3.5 py-1.5 rounded-full w-fit">
              <BookOpen className="w-4 h-4" />
              <span className="text-[13px] font-semibold tracking-wide">Our Story</span>
            </div>

            <h2 className="text-4xl md:text-[44px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Built from a passion<br />
              for better <span className="text-blue-600">car care.</span>
            </h2>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              <strong className="text-gray-800">SayaraHub</strong> was founded in 2025 with a simple mission: to bring <strong className="text-gray-800">honest, reliable, and high-quality automotive services</strong> to the UAE community.
            </p>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              What started as a small idea has grown into a full-service platform connecting car owners with verified garages, towing providers, and spare parts sellers.
            </p>

            {/* Features Row - Single Container */}
            <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 bg-[#f6f9fc] rounded-[24px] p-6 lg:px-8 lg:py-6 select-none">
              <div className="flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
                <Shield className="w-[26px] h-[26px] text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">Honest</h4>
                  <p className="text-gray-500 text-[13px] leading-tight mt-0.5">No hidden agendas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
                <Award className="w-[26px] h-[26px] text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">Reliable</h4>
                  <p className="text-gray-500 text-[13px] leading-tight mt-0.5">You can count on</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
                <Gem className="w-[26px] h-[26px] text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">Quality</h4>
                  <p className="text-gray-500 text-[13px] leading-tight mt-0.5">That drives loyalty</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="relative rounded-[32px] overflow-hidden aspect-[4/3.2] shadow-xl flex flex-col justify-end p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image src={OurStory} alt="Mechanic working on an engine" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            {/* Dark solid card */}
            <div className="relative z-10 bg-[#161b22]/90 backdrop-blur-sm border border-white/5 rounded-[20px] p-5 md:px-6 md:py-5 flex items-center gap-4 shadow-2xl w-fit transition-all duration-300 hover:scale-105 hover:bg-[#161b22] hover:border-white/15 select-none">
              <div className="w-[42px] h-[42px] rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                 <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col gap-0.5">
                 <p className="text-white font-bold text-[15px] leading-tight">Chosen by customers.</p>
                 <p className="text-gray-300 font-medium text-[14px] leading-tight">Driven by service.</p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Our Mission Block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Content (Left) */}
          <motion.div 
            className="order-2 lg:order-1 relative rounded-[32px] overflow-hidden aspect-[4/3.2] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image src={OurMission} alt="Mechanic opening car trunk" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* Text Content (Right) */}
          <motion.div 
            className="order-1 lg:order-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] text-blue-600 px-3.5 py-1.5 rounded-full w-fit">
              <Target className="w-4 h-4" />
              <span className="text-[13px] font-semibold tracking-wide">Our Mission</span>
            </div>

            <h2 className="text-4xl md:text-[44px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Making car services<br />
              <span className="text-blue-600">simpler, faster, and smarter.</span>
            </h2>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              We&apos;re on a mission to revolutionize how car owners in the UAE find and connect with automotive services.
            </p>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              <strong className="text-gray-800">SayaraHub</strong> creates a digital ecosystem where you can discover garages, mechanics, towing services, and spare parts sellers—all in one place.
              <br/>
              <strong className="text-gray-800 mt-2 block">No hassle. No uncertainty. Just the right connections.</strong>
            </p>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              With real-time locations, verified listings, and transparent information, we help you save time, reduce stress, and get back on the road with confidence.
            </p>

            {/* Features Row - Separate Chips */}
            <div className="mt-4 flex flex-wrap lg:flex-nowrap items-center gap-3 select-none">
              <div className="flex items-center gap-3 bg-[#f6f9fc] rounded-[16px] py-3.5 px-4 flex-1 min-w-[140px] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50 group cursor-default">
                <Users className="w-6 h-6 text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <p className="font-bold text-gray-900 text-[13px] leading-[1.3] transition-colors duration-300 group-hover:text-blue-600">Built for<br/>Car Owners</p>
              </div>
              
              <div className="flex items-center gap-3 bg-[#f6f9fc] rounded-[16px] py-3.5 px-4 flex-1 min-w-[140px] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50 group cursor-default">
                <MapPin className="w-6 h-6 text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <p className="font-bold text-gray-900 text-[13px] leading-[1.3] transition-colors duration-300 group-hover:text-blue-600">UAE-Wide<br/>Coverage</p>
              </div>

              <div className="flex items-center gap-3 bg-[#f6f9fc] rounded-[16px] py-3.5 px-4 flex-1 min-w-[140px] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50 group cursor-default">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <p className="font-bold text-gray-900 text-[13px] leading-[1.3] transition-colors duration-300 group-hover:text-blue-600">Focused on<br/>Reliability</p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Our Vision Block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] text-blue-600 px-3.5 py-1.5 rounded-full w-fit">
              <Eye className="w-4 h-4" />
              <span className="text-[13px] font-semibold tracking-wide">Our Vision</span>
            </div>

            <h2 className="text-4xl md:text-[44px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Building the future of<br />
              automotive, <span className="text-blue-600">together.</span>
            </h2>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              To become the UAE&apos;s most comprehensive automotive platform connecting car owners, garages, and suppliers under one digital roof. We envision a future where every vehicle service, repair, or part purchase is just a few clicks away, supported by innovation, technology, and customer care.
            </p>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              Our goal is to empower both customers and service providers by fostering a transparent, efficient, and customer-first automotive community that drives the industry forward.
            </p>

            {/* Features Row - 3 Vertical Cards */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 select-none">
              <div className="bg-[#f6f9fc] rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 transition-all duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-blue-50 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Users className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px] leading-tight transition-colors duration-300 group-hover:text-blue-600">One Platform</h4>
                  <p className="text-gray-500 text-[13px] leading-[1.4] mt-1.5">All automotive needs, connected in one place.</p>
                </div>
              </div>
              
              <div className="bg-[#f6f9fc] rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 transition-all duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-blue-50 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Shield className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px] leading-tight transition-colors duration-300 group-hover:text-blue-600">Future-Ready</h4>
                  <p className="text-gray-500 text-[13px] leading-[1.4] mt-1.5">Powered by innovation and technology.</p>
                </div>
              </div>

              <div className="bg-[#f6f9fc] rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 transition-all duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-blue-50 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Heart className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px] leading-tight transition-colors duration-300 group-hover:text-blue-600">Built on Care</h4>
                  <p className="text-gray-500 text-[13px] leading-[1.4] mt-1.5">Customer satisfaction drives everything we do.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="relative rounded-[32px] overflow-hidden aspect-[4/3.5] shadow-xl flex flex-col justify-end p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image src={OurVision} alt="Mechanic under car" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            
            {/* Dark glass card */}
            <div className="relative z-10 bg-[#1a202c]/90 backdrop-blur-md border border-white/5 rounded-[20px] p-5 md:px-6 md:py-5 flex items-center gap-5 shadow-2xl w-fit transition-all duration-300 hover:scale-105 hover:bg-[#1a202c] hover:border-white/15 select-none">
              <div className="flex items-center justify-center shrink-0">
                 <Target className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                 <p className="text-white font-bold text-[14px] leading-tight mb-1">Our vision is simple:</p>
                 <p className="text-gray-300 font-medium text-[13px] leading-tight">Better services. Smarter connections.</p>
                 <p className="text-gray-300 font-medium text-[13px] leading-tight">Stronger journeys ahead.</p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Empowering Block */}
        <motion.div 
          className="bg-[#f8faff] rounded-[40px] p-6 sm:p-10 lg:p-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image Left */}
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/4.5] shadow-xl flex flex-col justify-end p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 group">
              <Image src={Empowering} alt="Wrenches and tools" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Dark Card */}
              <div className="relative z-10 bg-[#161b22]/90 backdrop-blur-sm border border-white/5 rounded-[24px] p-6 flex items-center gap-5 shadow-2xl w-fit transition-all duration-300 hover:scale-105 hover:bg-[#161b22] hover:border-white/15 select-none">
                <div className="w-[46px] h-[46px] rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                   <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex flex-col gap-1">
                   <p className="text-white font-bold text-[14px] leading-tight">Stronger connections.</p>
                   <p className="text-white font-bold text-[14px] leading-tight">Better experiences.</p>
                   <p className="text-white font-bold text-[14px] leading-tight">Built for everyone.</p>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full w-fit">
                  <Users className="w-4 h-4" />
                  <span className="text-[13px] font-semibold tracking-wide">Our Promise</span>
                </div>

                <h2 className="text-4xl md:text-[44px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                  Empowering Drivers and<br />
                  Garages <span className="text-blue-600">Alike</span>
                </h2>

                <p className="text-gray-500 text-[15px] leading-relaxed">
                  We believe in supporting both sides of the journey. Drivers seek fast, quality service, and garages need the digital tools to grow. From secure communication to listings, every feature is designed with integrity and reliability at its core.
                </p>
              </div>

              {/* Vertical Features */}
              <div className="flex flex-col gap-7 select-none">
                <div className="flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50/50 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Users className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">User-Centric</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed mt-1">Transparent with user reviews and service providers in one place.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50/50 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Link2 className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">Instant Connection</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed mt-1">Easily navigate between garages, spare parts sellers, and towing services.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 border border-transparent hover:border-blue-50/50 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <ShieldCheck className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="mt-1">
                    <h4 className="font-bold text-gray-900 text-[15px] transition-colors duration-300 group-hover:text-blue-600">Transparency First</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed mt-1">Honest reviews, real-time updates, and open communication build loyalty.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
