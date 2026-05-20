"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  RefreshCw, 
  DollarSign, 
  MessageSquare, 
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

interface SalesSection {
  id: string;
  title: string;
  icon: any;
  content: string;
  points?: string[];
  callout?: string;
}

const SALES_SECTIONS: SalesSection[] = [
  {
    id: "marketplace-model",
    title: "1. Marketplace Transaction Model",
    icon: ShoppingCart,
    content: "SayaraHub operates strictly as an advertising and scheduling portal connecting vehicle owners with independent auto workshops, towing services, and spare parts sellers. Therefore, the payment dynamics vary depending on the transaction type:",
    points: [
      "No Direct Transactions: SayaraHub does not sell, ship, or warranty any physical spare parts or garage repairs directly.",
      "Direct Contract: When you book a repair service or buy a spare part listed on our platform, the commercial contract is formed solely between you and the respective third-party provider."
    ],
    callout: "Important: Because payments are settled directly between users and garages outside our system, SayaraHub cannot issue refunds for mechanical work, spare parts, or towing bookings."
  },
  {
    id: "service-bookings",
    title: "2. Garage & Recovery Service Policies",
    icon: Info,
    content: "For services scheduled or discovered via the SayaraHub platform (e.g., oil changes, brake repairs, towing services):",
    points: [
      "Service Estimates: Quotes shown on the app are initial estimates. Final billing is settled after the garage inspects your vehicle.",
      "Cancellation & Rescheduling: If you need to cancel a booking, please notify the workshop directly. SayaraHub does not charge cancellation fees.",
      "Warranty on Repairs: Garages determine their own workmanship warranties. We encourage you to ask for a written warranty invoice from the workshop."
    ]
  },
  {
    id: "spare-parts",
    title: "3. Spare Parts Sales & Return Rules",
    icon: RefreshCw,
    content: "Sellers list spare parts (new, OEM, or used) on the SayaraHub marketplace. All parts transactions are subject to the following guidelines:",
    points: [
      "Verification: We highly advise buyers to inspect spare parts personally (checking matching part numbers and compatibility) before completing the purchase.",
      "Returns & Refunds: Return policies are set individually by each seller. Review the seller's refund terms before finalizing the deal.",
      "Shipping & Delivery: Any shipping fees, delivery timelines, or parts transport arrangements must be resolved directly with the parts seller."
    ]
  },
  {
    id: "platform-fees",
    title: "4. Platform Subscriptions & Billing",
    icon: DollarSign,
    content: "For premium listing plans, garage advertisements, or subscription packages purchased directly from SayaraHub:",
    points: [
      "Non-Refundable Fees: All premium subscriptions, promotion fees, and account upgrades purchased from SayaraHub are non-refundable unless specified otherwise.",
      "Billing Errors: In the event of a system error resulting in duplicate charges or incorrect billing, contact billing@sayarahub.com within 30 days for a full adjustment.",
      "Processing Timeline: Approved billing refunds will be credited back to your original payment card within 7 to 10 business days."
    ]
  },
  {
    id: "dispute-mediation",
    title: "5. Mediation & Fraud Protection",
    icon: ShieldCheck,
    content: "To maintain the integrity of our UAE-wide automotive community, SayaraHub offers mediation assistance:",
    points: [
      "Reporting Bad Merchants: If a garage performs substandard work, installs incorrect parts, or refuses to honor an agreed refund, you can file a report through our app.",
      "Platform Actions: Upon verifying fraudulent behavior, SayaraHub will take immediate action, which may include suspending the garage's account or banning the parts seller."
    ]
  }
];

export default function SalesRefundsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("marketplace-model");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const filteredSections = SALES_SECTIONS.filter(
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
      <section className="relative overflow-hidden bg-[#064E3B] text-white py-16 md:py-24 rounded-3xl mt-6 mx-4">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Billing Operations</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Sales & Refunds
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Understand how payments work between you, independent garages, spare parts sellers, and SayaraHub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span>Last Updated: January 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Version 2.0</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
          </div>
        </div>
      </section>

      {/* Direct Payment Highlight */}
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="bg-emerald-50/75 border border-emerald-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[15px]">Direct-to-Garage Payments</h4>
            <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">
              SayaraHub does not process payments for repairs or spare parts on this website. All financial transactions are completed directly with the merchant at their workshop or recovery point.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 mt-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: TOC */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-6 print-hidden">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search Policy</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find policy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Refund Chapters</span>
              <nav className="space-y-1">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? "bg-emerald-50 text-emerald-600" 
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

          {/* Right Column: Detailed content */}
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
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
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
                              <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && (
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-emerald-950 text-xs leading-relaxed">
                        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold">{section.callout}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-base">No policies matched: "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-emerald-600 font-semibold text-sm mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Feedback Box */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print-hidden">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Did this answer your payment questions?</h4>
                <p className="text-slate-500 text-xs mt-0.5">We strive for maximum transparency on transactional limits.</p>
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
                      className="text-emerald-600 font-bold text-sm"
                    >
                      Thank you for your feedback!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Custom refund request CTA */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-emerald-500/10 print-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%)]" />
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl font-extrabold mb-3">
                  Facing billing duplicate issues?
                </h3>
                <p className="text-emerald-100 text-sm leading-relaxed mb-6 font-light">
                  If you bought a premium listing plan and believe you were billed twice in error, file a support request for quick settlement.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-emerald-600 font-bold px-6 py-3 rounded-xl text-sm transition"
                >
                  Contact Billing Support <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// styles for print and offsets
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
