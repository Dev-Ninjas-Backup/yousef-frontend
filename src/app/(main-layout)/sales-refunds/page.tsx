"use client";

import { useLanguage } from "@/context/LanguageContext";
import { legalTranslations } from "@/translations/legal";
import { ShoppingCart, RefreshCw, DollarSign, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SalesRefundsPage() {
  const { t } = useLanguage();
  const trans = t(legalTranslations).salesRefunds;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <RefreshCw className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {trans.title}
            </h1>
            <p className="text-xl text-green-100">
              {trans.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {trans.sections.map((section: { title: string; content: string }, index: number) => (
              <div
                key={index}
                className="mb-12 bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {index === 0 && <ShoppingCart className="w-6 h-6 text-green-600" />}
                    {index === 1 && <DollarSign className="w-6 h-6 text-green-600" />}
                    {index === 2 && <RefreshCw className="w-6 h-6 text-green-600" />}
                    {index > 2 && <MessageSquare className="w-6 h-6 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div className="mt-12 bg-green-50 rounded-xl p-8 text-center border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help with a Refund?
              </h3>
              <p className="text-gray-700 mb-6">
                Our customer support team is ready to assist you with any refund inquiries.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
