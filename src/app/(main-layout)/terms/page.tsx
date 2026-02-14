"use client";

import { useLanguage } from "@/context/LanguageContext";
import { legalTranslations } from "@/translations/legal";
import { FileCheck, Users, CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const { t } = useLanguage();
  const trans = t(legalTranslations).terms;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileCheck className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {trans.title}
            </h1>
            <p className="text-xl text-indigo-100">
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
                    {index === 0 && <FileCheck className="w-6 h-6 text-indigo-600" />}
                    {index === 1 && <Users className="w-6 h-6 text-indigo-600" />}
                    {index === 2 && <CreditCard className="w-6 h-6 text-indigo-600" />}
                    {index > 2 && <AlertCircle className="w-6 h-6 text-indigo-600" />}
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
            <div className="mt-12 bg-indigo-50 rounded-xl p-8 text-center border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Questions About Our Terms?
              </h3>
              <p className="text-gray-700 mb-6">
                Need clarification on any of our terms? Our support team is here to help.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
