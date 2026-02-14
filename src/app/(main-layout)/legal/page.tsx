"use client";

import { useLanguage } from "@/context/LanguageContext";
import { legalTranslations } from "@/translations/legal";
import { Scale, Building, Copyright, Gavel } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  const { t } = useLanguage();
  const trans = t(legalTranslations).legal;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scale className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {trans.title}
            </h1>
            <p className="text-xl text-purple-100">
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
                    {index === 0 && <Building className="w-6 h-6 text-purple-600" />}
                    {index === 1 && <Copyright className="w-6 h-6 text-purple-600" />}
                    {index === 2 && <Gavel className="w-6 h-6 text-purple-600" />}
                    {index > 2 && <Scale className="w-6 h-6 text-purple-600" />}
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
            <div className="mt-12 bg-purple-50 rounded-xl p-8 text-center border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Legal Inquiries?
              </h3>
              <p className="text-gray-700 mb-6">
                For legal matters or compliance questions, please reach out to our legal team.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Contact Legal Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
