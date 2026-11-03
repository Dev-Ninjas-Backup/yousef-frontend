"use client";

import { useLanguage } from "@/context/LanguageContext";
import { legalTranslations } from "@/translations/legal";
import { 
  Map, 
  Compass, 
  UserCheck, 
  FileText, 
  ArrowRight, 
  Home, 
  HelpCircle,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SitemapPage() {
  const { t } = useLanguage();
  const trans = t(legalTranslations).sitemap;

  // Define premium styling attributes for each section
  const sectionStyles = [
    {
      badgeBg: "bg-blue-50 text-blue-600 border-blue-100",
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      hoverBorder: "hover:border-blue-200 hover:shadow-blue-500/[0.04]",
      linkHover: "hover:text-blue-600 hover:bg-blue-50/50",
      bulletColor: "bg-blue-500"
    },
    {
      badgeBg: "bg-purple-50 text-purple-600 border-purple-100",
      icon: <UserCheck className="w-6 h-6 text-purple-600" />,
      hoverBorder: "hover:border-purple-200 hover:shadow-purple-500/[0.04]",
      linkHover: "hover:text-purple-600 hover:bg-purple-50/50",
      bulletColor: "bg-purple-500"
    },
    {
      badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      hoverBorder: "hover:border-emerald-200 hover:shadow-emerald-500/[0.04]",
      linkHover: "hover:text-emerald-600 hover:bg-emerald-50/50",
      bulletColor: "bg-emerald-500"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0F1D] text-white py-16 md:py-24 rounded-3xl mt-6 mx-4">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Map className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Navigation Central</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {trans.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            {trans.description}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <span>Explore all directories</span>
            <span>•</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>SayaraHub Platform Map</span>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-12 mt-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trans.sections.map((section: any, sectionIndex: number) => {
              const styles = sectionStyles[sectionIndex] || sectionStyles[0];
              return (
                <motion.div
                  key={sectionIndex}
                  className={`bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm transition-all duration-300 ${styles.hoverBorder} hover:shadow-xl hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl border ${styles.badgeBg}`}>
                      {styles.icon}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  </div>

                  {/* Links List */}
                  <ul className="space-y-2">
                    {section.links.map((link: any, linkIndex: number) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.url}
                          className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium text-slate-700 transition-all group ${styles.linkHover}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full ${styles.bulletColor} opacity-70 group-hover:scale-125 transition-transform`} />
                            <span>{link.name}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Help Section */}
          <motion.div 
            className="mt-16 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_60%)]" />
            
            <HelpCircle className="w-12 h-12 mx-auto mb-6 text-indigo-400" />
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-xl mx-auto font-light leading-relaxed">
              If you are having trouble locating a specific feature, vehicle registry setting, or partner garage near you, please consult our support team.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-lg shadow-blue-500/20"
              >
                Contact Support <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold px-8 py-3.5 rounded-xl text-sm transition"
              >
                <Home className="w-4 h-4" /> Go to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
