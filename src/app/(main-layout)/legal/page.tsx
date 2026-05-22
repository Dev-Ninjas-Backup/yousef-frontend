"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  Building, 
  Copyright, 
  Gavel, 
  ShieldCheck,
  Search, 
  Printer, 
  Check, 
  Info, 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface LegalSection {
  id: string;
  title: string;
  icon: any;
  content: string;
  points?: string[];
  callout?: string;
}

const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: "company-info",
    title: "1. Corporate Profile & Registry",
    icon: Building,
    content: "SayaraHub is an online automotive marketplace platform, registered and operating within the Emirate of Dubai, United Arab Emirates. The platform is designed to facilitate local connections between car owners and automotive service operators.",
    points: [
      "Company Entity: SayaraHub Portal (Registered in Dubai, UAE).",
      "Trade License Number: [To be provided by the Client upon official licensing].",
      "Jurisdiction: Dubai Economic Department (DED) regulations."
    ],
    callout: "Note to Users: SayaraHub does not sell spare parts or execute mechanical services. We are a digital portal facilitating third-party connections."
  },
  {
    id: "intellectual-property",
    title: "2. Intellectual Property & Trademark Protection",
    icon: Copyright,
    content: "All material displayed on our platform, including source code, database structures, UI/UX designs, logo graphics, brand typography, and promotional copywriting, is the exclusive property of SayaraHub and is protected under UAE Trademark Law and Copyright Law.",
    points: [
      "Trademarks: The name 'SayaraHub', the logo, and custom slogans are registered trademarks. Any usage requires written authorization.",
      "Restrictions: Scraping database tables, reproducing UI templates, or extracting telephone numbers of mechanics for direct marketing database compilation is strictly prosecuted."
    ]
  },
  {
    id: "disclaimer-info",
    title: "3. Disclaimer of Professional Advice",
    icon: Info,
    content: "The content, mechanical guides, diagnostic suggestions, and reviews published on SayaraHub are provided for general informational purposes only:",
    points: [
      "No Auto Advice: Platform information does not substitute for professional vehicle diagnostics. Always consult a certified workshop before conducting major repairs.",
      "User Reviews: Reviews and ratings represent the opinions of individual users and do not reflect the views or endorsements of SayaraHub."
    ]
  },
  {
    id: "third-party-disclaimer",
    title: "4. Third-Party Services Disclaimer",
    icon: ShieldCheck,
    content: "Our services rely on independent third-party operators (mechanics, garages, towing providers) who register their businesses on our platform:",
    points: [
      "Operational Autonomy: Each garage operates independently. They are responsible for acquiring necessary DED permits, commercial licenses, and liability insurances.",
      "No Endorsement: The presence of a garage profile on SayaraHub does not imply a safety audit or endorsement of their physical repairs."
    ]
  },
  {
    id: "consumer-rights",
    title: "5. UAE Consumer Protection Compliance",
    icon: Gavel,
    content: "SayaraHub operates in harmony with UAE Federal Law No. 15 of 2020 on Consumer Protection:",
    points: [
      "Direct Grievance: Since transactions are direct, service-related complaints (e.g. poor paint quality, faulty engine repairs) must be raised directly with the servicing garage.",
      "Mediation Support: While we hold no financial liability, users can submit dispute reports to SayaraHub support for account review and mediation."
    ]
  },
  {
    id: "governing-law",
    title: "6. Jurisdiction & Law Enforcement",
    icon: Scale,
    content: "Our legal parameters are framed under the laws of the UAE. Any legal challenges, copyright infringements, or claims will be resolved in UAE courts.",
    points: [
      "Law Enforcement Requests: We cooperate with Dubai Police and other federal authorities to disclose data in cases of stolen parts sales or road hazard violations."
    ]
  }
];

export default function LegalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("company-info");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const filteredSections = LEGAL_SECTIONS.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (section.points &&
        section.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {styleTag}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1E1B4B] text-white py-16 md:py-24 rounded-3xl mt-6 mx-4">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6">
            <Scale className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">Regulatory Profile</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Legal Information
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Review the corporate registry details, disclaimer policies, and trademarks associated with the SayaraHub brand.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span>Last Updated: January 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Version 2.0</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
          </div>
        </div>
      </section>

      {/* UAE Licensing Info Callout */}
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="bg-purple-50/75 border border-purple-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[15px]">UAE Trade Licensing</h4>
            <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">
              This digital portal operates in alignment with the UAE Department of Economy and Tourism directives. Registered trade licenses will be updated post official launching.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 mt-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Sticky Navigation */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-6 print-hidden">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search Corporate Data</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find info..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Legal Chapters</span>
              <nav className="space-y-1">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? "bg-purple-50 text-purple-600" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{section.title.split(". ")[1]}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5" : "text-slate-300"}`} />
                    </button>
                  );
                })}
                {filteredSections.length === 0 && (
                  <p className="text-slate-400 text-xs py-2 px-1">No legal chapters found.</p>
                )}
              </nav>
            </div>
          </aside>

          {/* Right: Detailed Text */}
          <section className="lg:col-span-3 space-y-6 min-w-0 print-full-width">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 space-y-10">
              
              {filteredSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32 border-b border-slate-100 last:border-b-0 pb-10 last:pb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="p-2.5 bg-purple-50 text-purple-600 rounded-2xl">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                        {section.title}
                      </h2>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {section.content}
                    </p>

                    {section.points && (
                      <ul className="space-y-3.5 mb-6">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-purple-500" strokeWidth={3} />
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && (
                      <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex gap-3 text-purple-900 text-xs leading-relaxed">
                        <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="font-semibold">{section.callout}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-base">No content found matching: "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-purple-600 font-semibold text-sm mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Feedback Box */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print-hidden">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Was this legal structure helpful?</h4>
                <p className="text-slate-500 text-xs mt-0.5">Your input helps us stay transparent and compliant.</p>
              </div>
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {feedback === null ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setFeedback("yes")}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs transition shrink-0 whitespace-nowrap"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-slate-500" /> Yes, clear
                      </button>
                      <button 
                        onClick={() => setFeedback("no")}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs transition shrink-0 whitespace-nowrap"
                      >
                        <ThumbsDown className="w-3.5 h-3.5 text-slate-500" /> No, too complex
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      key="thanks"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-purple-600 font-bold text-sm"
                    >
                      Thank you for your feedback!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Corporate/Partner support CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-purple-500/10 print-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%)]" />
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl font-extrabold mb-3">
                  Have official legal inquiries?
                </h3>
                <p className="text-purple-100 text-sm leading-relaxed mb-6 font-light">
                  If you are a legal representative or compliance officer representing auto networks, please send formal communications to our registry division.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-purple-600 font-bold px-6 py-3 rounded-xl text-sm transition"
                >
                  Contact Registry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// styling for print and margins
const styleTag = (
  <style dangerouslySetInnerHTML={{__html: `
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      .print-hidden {
        display: none !important;
      }
      .print-full-width {
        width: 100% !important;
        max-width: 100% !important;
        grid-column: span 4 / span 4 !important;
      }
      nav, footer, .fixed, button, input {
        display: none !important;
      }
      main {
        padding-bottom: 0 !important;
      }
    }
  `}} />
);
