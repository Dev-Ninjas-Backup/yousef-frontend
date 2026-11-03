"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Scale, 
  ShieldAlert,
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

interface TermsSection {
  id: string;
  title: string;
  icon: any;
  content: string;
  points?: string[];
  callout?: string;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: FileText,
    content: "By creating an account, downloading our mobile application, or browsing the SayaraHub website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, you are prohibited from using the platform and must cease operations immediately.",
    points: [
      "You must be at least 18 years of age (the legal driving age in the UAE) to register and request services.",
      "If you register on behalf of a commercial garage or towing business, you warrant that you hold the legal authority to bind that entity to these terms."
    ]
  },
  {
    id: "platform-scope",
    title: "2. Scope of Platform Services",
    icon: Users,
    content: "SayaraHub operates strictly as a digital marketplace intermediary. We provide the technology that connects vehicle owners (\"Users\") with independent automotive workshops, mobile mechanics, towing operators, and spare parts merchants (\"Service Providers\").",
    points: [
      "SayaraHub is not a car workshop, mechanic, or towing fleet operator. We do not provide physical repair, recovery, or maintenance services.",
      "All service contracts, spare parts sales, warranties, and service execution are negotiated and agreed upon directly between the User and the Service Provider."
    ],
    callout: "Important: We do not inspect, guarantee, or take responsibility for the quality, safety, legality, or timing of any service or part provided by third-party garages."
  },
  {
    id: "user-accounts",
    title: "3. Account Registration & Obligations",
    icon: ShieldAlert,
    content: "To unlock services like bidding, booking, or chat, you must create a verified account. You agree to provide accurate and updated information:",
    points: [
      "Accuracy: You must provide your correct mobile number, email, and vehicle profile (Make, Model, Year, Plate No.).",
      "Account Security: You are solely responsible for all activities occurring under your account. Do not share your login credentials or OTPs with anyone.",
      "Suspension: We reserve the right to suspend or terminate accounts that provide false details, harass providers, or write fake reviews."
    ]
  },
  {
    id: "dealings-payments",
    title: "4. Direct Dealings & Payments",
    icon: CreditCard,
    content: "SayaraHub simplifies connections, but we do not interfere with financial transactions:",
    points: [
      "No In-App Payment Processing: Currently, SayaraHub does not process payments for repairs or spare parts on our servers.",
      "Direct Payments: Users pay the service provider directly at their workshop or to the towing driver via cash, card machine, or bank transfer as agreed.",
      "Pricing Discrepancies: Quotes provided on the platform are estimates based on user descriptions. Final prices may be adjusted by the garage upon physical vehicle inspection."
    ]
  },
  {
    id: "provider-rules",
    title: "5. Service Provider Conduct & Licenses",
    icon: Scale,
    content: "Automotive businesses registering on SayaraHub must comply with the commercial laws of the UAE:",
    points: [
      "Valid Licensing: Garages and towing providers must possess valid trade licenses from UAE municipal authorities.",
      "True Representation: Providers must describe their services, specialties, and parts availability truthfully without misleading descriptions."
    ]
  },
  {
    id: "acceptable-use",
    title: "6. Prohibited Activities",
    icon: AlertTriangle,
    content: "Users and providers are strictly prohibited from engaging in the following behaviors on SayaraHub:",
    points: [
      "Illegitimate Parts: Listing stolen auto parts, counterfeit components, or illegal modifications prohibited by UAE traffic laws.",
      "Spamming & Scraping: Utilizing automated scripts to scrape garage listings, telephone numbers, or catalog data.",
      "Bypassing Platform: Creating fake requests solely to extract contact numbers and then conducting deals maliciously to evade feedback reviews."
    ]
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property Rights",
    icon: FileText,
    content: "All proprietary software, databases, designs, logos, UI elements, and brand names of SayaraHub are owned exclusively by us or our licensors and are protected under UAE and international copyright laws.",
    points: [
      "License to User: We grant you a limited, non-transferable, revocable license to access our platform for personal auto service discovery.",
      "User Content License: By posting parts photos or workshop reviews, you grant SayaraHub a worldwide, royalty-free license to display and use that content for marketing."
    ]
  },
  {
    id: "liability-limits",
    title: "8. Limitation of Liability",
    icon: ShieldAlert,
    content: "To the maximum extent permitted by UAE law, SayaraHub, its directors, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:",
    points: [
      "Physical damage, engine failures, or incorrect parts installed on your vehicle by any independent garage found on our platform.",
      "Personal injury or delayed vehicle recovery during towing operations.",
      "Any disputes or arguments arising between users and service providers."
    ],
    callout: "Limitation: Your sole remedy for dissatisfaction with a service or product is to resolve the matter directly with the service provider."
  },
  {
    id: "disclaimers",
    title: "9. Disclaimer of Warranties",
    icon: AlertTriangle,
    content: "The platform is provided on an \"AS IS\" and \"AS AVAILABLE\" basis. SayaraHub makes no warranties, express or implied, regarding:",
    points: [
      "Uninterrupted or error-free access to our GPS garage mapping services.",
      "The accuracy or reliability of reviews written by other platform users."
    ]
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Jurisdiction",
    icon: Scale,
    content: "These Terms and Conditions shall be governed by, and construed in accordance with, the Federal Laws of the United Arab Emirates and the local laws of the Emirate of Dubai.",
    points: [
      "Any dispute, controversy, or claim arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts of Dubai, UAE."
    ]
  },
  {
    id: "term-changes",
    title: "11. Modifications to Terms",
    icon: FileText,
    content: "We reserves the right to modify these terms at any time. Updates will take effect immediately upon being posted on this page. We encourage you to review this page periodically. Continued use of the platform after updates indicates your consent to the changes."
  }
];

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("acceptance");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const filteredSections = TERMS_SECTIONS.filter(
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
      <section className="relative overflow-hidden bg-[#0F172A] text-white py-16 md:py-24 rounded-3xl mt-6 mx-4">
        {/* Grid and Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">Legal Framework</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Please read these terms carefully before registering your vehicle or listing your garage services on SayaraHub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span>Last Updated: January 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Version 2.0</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
          </div>
        </div>
      </section>

      {/* Dubai Court Jurisdiction Callout */}
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="bg-indigo-50/75 border border-indigo-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
          <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[15px]">Governing Jurisdiction</h4>
            <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">
              These terms are established in strict compliance with UAE Commercial Laws, with the courts of the Emirate of Dubai holding exclusive jurisdiction over any contractual disputes.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 mt-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Sidebar Table of Contents */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-6 print-hidden">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search Terms</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Chapters</span>
              <nav className="space-y-1">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? "bg-indigo-50 text-indigo-600" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{section.title.split(". ")[1]}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5" : "text-slate-300"}`} />
                    </button>
                  );
                })}
                {filteredSections.length === 0 && (
                  <p className="text-slate-400 text-xs py-2 px-1">No chapters found.</p>
                )}
              </nav>
            </div>
          </aside>

          {/* Right: Main Document Content */}
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
                      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
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
                              <Check className="w-3 h-3 text-indigo-500" strokeWidth={3} />
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && (
                      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex gap-3 text-red-900 text-xs leading-relaxed">
                        <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
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
                    className="text-indigo-600 font-semibold text-sm mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Helpful Feedback */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print-hidden">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Did you understand our terms?</h4>
                <p className="text-slate-500 text-xs mt-0.5">We aim for maximum clarity in user agreements.</p>
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
                      className="text-indigo-600 font-bold text-sm"
                    >
                      Thank you for your feedback!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contact Support CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-indigo-500/10 print-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%)]" />
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl font-extrabold mb-3">
                  Need custom service agreements?
                </h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6 font-light">
                  If you are a registered garage in Dubai, Abu Dhabi, or Sharjah and need assistance setting up your listing terms, speak to our merchant support.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-indigo-600 font-bold px-6 py-3 rounded-xl text-sm transition"
                >
                  Contact Merchant Support <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// Styling for print and offsets
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
