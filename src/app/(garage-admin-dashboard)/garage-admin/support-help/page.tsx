"use client";

import CustomerSupport from "./_components/CustomerSupport/CustomerSupport";
import HelpCenter from "./_components/HelpCenter/HelpCenter";
import FAQSection from "./_components/FAQSection/FAQSection";

export default function SupportHelpPage() {
  return (
    <div className="space-y-6 bg-[#F9FAFB] rounded-2xl p-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Support & Help</h1>
        <p className="text-sm text-gray-500 mt-1">
          Get help with your account and listings
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CustomerSupport />
        <HelpCenter />
      </div>

      <FAQSection />
    </div>
  );
}
