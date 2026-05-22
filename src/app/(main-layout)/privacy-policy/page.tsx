"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
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

interface PolicySection {
  id: string;
  title: string;
  icon: any;
  content: string;
  points?: string[];
  callout?: string;
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction & Scope",
    icon: FileText,
    content: "SayaraHub (\"we\", \"our\", or \"us\") is a premium automotive digital marketplace platform operating in the United Arab Emirates. This Privacy Policy details how we collect, store, use, and protect your personal information when you use our website, mobile application, and related services. By accessing or using SayaraHub, you agree to the practices described in this policy.",
    points: [
      "Our platform connects vehicle owners with independent automotive service providers, including garages, mechanics, towing service providers, and spare parts sellers.",
      "We process all personal data in compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL) and other applicable local regulations."
    ],
    callout: "Important Notice: SayaraHub acts strictly as an intermediary marketplace. We do not own, manage, or employ the independent garages, towing services, or parts sellers listed on our platform."
  },
  {
    id: "information-collect",
    title: "2. Information We Collect",
    icon: Eye,
    content: "To provide our specialized automotive marketplace services, we need to collect certain information. The type of information we collect depends on your interactions with our platform:",
    points: [
      "Personal Account Details: Name, email address, mobile phone number, profile picture, and account passwords.",
      "Vehicle Profiles: Vehicle make, model, year of manufacture, license plate number, chassis number (VIN), and detailed vehicle service history or issue descriptions.",
      "Precise Location Data: Real-time GPS location of your device to help you locate nearby garages or to route emergency towing services to your exact coordinates.",
      "Communications Logs: Text chats, inquiries, quote requests, and call histories initiated between users and garages/sellers through our in-app messaging.",
      "Technical Device Data: IP address, device type, operating system version, browser type, and user activity logs."
    ]
  },
  {
    id: "how-we-collect",
    title: "3. Methods of Data Collection",
    icon: Info,
    content: "We collect data from various sources to ensure smooth operation of our services:",
    points: [
      "Direct Inputs: Information you fill in during registration, profile creation, service requests, or spare parts listing forms.",
      "Automatic Tracking: Data gathered via cookies, web beacons, and analytical logs when you navigate through our app or website.",
      "Service Providers: Status updates or reports provided by garages and towing partners regarding your active bookings."
    ]
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information",
    icon: Lock,
    content: "Your data is utilized to enhance your experience, maintain platform security, and coordinate services:",
    points: [
      "Service Facilitation: Matching your vehicle issues with verified garages capable of resolving them.",
      "Emergency Routing: Sharing your GPS coordinates with towing providers when you request roadside assistance.",
      "Direct Communication: Enabling in-app messaging so you can negotiate pricing and confirm bookings directly with sellers and mechanics.",
      "Safety & Fraud Prevention: Verifying user identities, managing reviews, and preventing fraudulent listings.",
      "Notifications: Sending service reminders, updates, verification codes, and security notices."
    ],
    callout: "SayaraHub does not process financial transactions on our servers. All financial arrangements and payments are made directly between you and the respective service providers."
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing & Third Parties",
    icon: Shield,
    content: "We respect your privacy and only share your data under strict circumstances necessary for service delivery:",
    points: [
      "With Service Providers: Sharing your vehicle info, problem description, and location with garages or towing operators you choose to engage with.",
      "With Analytics Partners: Using third-party tools (e.g. Google Analytics) to understand app performance and traffic flow.",
      "Under Legal Mandates: Sharing data with UAE regulatory authorities or courts when required by law to protect public safety or legal rights.",
      "No Selling of Data: We never sell, rent, or lease your personal information to third-party advertising companies."
    ]
  },
  {
    id: "data-storage",
    title: "6. Data Storage & Security Measures",
    icon: Lock,
    content: "We implement advanced industry-standard safeguards to secure your personal information:",
    points: [
      "Encryption: All data transmitted between your device and our servers is encrypted using Secure Socket Layer (SSL/TLS) protocols.",
      "Access Controls: Internal data access is strictly limited to authorized personnel who require it to support platform operations.",
      "User Responsibility: You are responsible for maintaining the confidentiality of your account credentials, including passwords and OTPs."
    ],
    callout: "While we employ maximum efforts, no transmission method over the internet or cloud storage is 100% secure. We cannot guarantee absolute security."
  },
  {
    id: "your-rights",
    title: "7. Your Rights & Choices",
    icon: Shield,
    content: "Under UAE data protection guidelines, you have several controls over your personal information:",
    points: [
      "Access & Edit: You can update your profile details and vehicle information directly through your dashboard at any time.",
      "Account Deletion: You have the right to request permanent deletion of your account and associated personal data by contacting our support.",
      "Location Control: You can turn off GPS tracking in your mobile device settings, though this will disable location-based garage searches and towing services.",
      "Notification Settings: You can opt-out of promotional emails and push notifications through your user account preferences."
    ]
  },
  {
    id: "cookies",
    title: "8. Cookies & Tracking Technologies",
    icon: Info,
    content: "We use cookies to improve your user experience and track platform analytics:",
    points: [
      "Essential Cookies: Used to keep you logged in and remember your language preferences (English/Arabic/Hindi).",
      "Performance Cookies: Used to analyze how users interact with our features, helping us optimize page speed and layout."
    ]
  },
  {
    id: "children-privacy",
    title: "9. Children's Privacy",
    icon: Shield,
    content: "Our services are designed exclusively for individuals who are at least 18 years of age (the legal driving age in the UAE). We do not knowingly collect personal data from anyone under 18. If we discover such data has been collected, we will delete it immediately."
  },
  {
    id: "policy-updates",
    title: "10. Updates to this Policy",
    icon: FileText,
    content: "We reserve the right to revise this Privacy Policy to reflect changes in our services, technology, or UAE legal requirements. Any modifications will be posted here with an updated 'Last Updated' date. Continued use of the platform constitutes agreement to the updated terms."
  },
  {
    id: "contact-us",
    title: "11. Contact & Support Information",
    icon: Info,
    content: "If you have any questions, clarifications, or complaints regarding this Privacy Policy or our data management practices, please reach out to us:",
    points: [
      "For General Privacy Inquiries: privacy@sayarahub.com",
      "For Legal & Compliance Matters: legal@sayarahub.com",
      "Registered Address: SayaraHub Digital Portal, Dubai, United Arab Emirates"
    ]
  }
];

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const filteredSections = POLICY_SECTIONS.filter(
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
      <section className="relative overflow-hidden bg-[#0A0F1D] text-white py-16 md:py-24 rounded-3xl mt-6 mx-4">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">SayaraHub Security Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Learn how we manage, protect, and process your personal and vehicle data in accordance with UAE federal guidelines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span>Last Updated: January 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Version 2.0</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
          </div>
        </div>
      </section>

      {/* UAE PDPL Callout Banner */}
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="bg-blue-50/75 border border-blue-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[15px]">UAE PDPL Compliant</h4>
            <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">
              This policy is structured to fully align with the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL), granting you full control over how your location and identity records are used.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="container mx-auto px-4 mt-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: TOC and Search */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-6 print-hidden">
            {/* Search Box */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search Policy</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Navigation List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Table of Contents</span>
              <nav className="space-y-1">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{section.title.split(". ")[1]}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5" : "text-slate-300"}`} />
                    </button>
                  );
                })}
                {filteredSections.length === 0 && (
                  <p className="text-slate-400 text-xs py-2 px-1">No matching sections found.</p>
                )}
              </nav>
            </div>
          </aside>

          {/* Right Column: Detailed Text */}
          <section className="lg:col-span-3 space-y-6 min-w-0 print-full-width">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 space-y-10">
              
              {filteredSections.map((section, index) => {
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
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
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
                              <Check className="w-3 h-3 text-blue-500" strokeWidth={3} />
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && (
                      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-900 text-xs leading-relaxed">
                        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{section.callout}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-base">No results matched your search term: "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 font-semibold text-sm mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Helpful Feedback Widget */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print-hidden">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Was this policy helpful?</h4>
                <p className="text-slate-500 text-xs mt-0.5">Help us make our policies easier to read.</p>
              </div>
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {feedback === null ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setFeedback("yes")}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs transition shrink-0 whitespace-nowrap"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-slate-500" /> Yes, it was
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
                      className="text-blue-600 font-bold text-sm"
                    >
                      Thank you for your feedback!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Help / Contact CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-blue-500/10 print-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%)]" />
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl font-extrabold mb-3">
                  Have doubts about your data?
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6 font-light">
                  If you need clarification about how we secure your chassis number, vehicle images, or live GPS tracking data, contact our security officer.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-600 font-bold px-6 py-3 rounded-xl text-sm transition"
                >
                  Ask a Question <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// Print and scroll-margin stylesheet styles
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
