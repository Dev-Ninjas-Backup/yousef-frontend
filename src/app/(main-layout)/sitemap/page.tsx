"use client";

import { useLanguage } from "@/context/LanguageContext";
import { legalTranslations } from "@/translations/legal";
import { Map, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SitemapPage() {
  const { t } = useLanguage();
  const trans = t(legalTranslations).sitemap;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Map className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {trans.title}
            </h1>
            <p className="text-xl text-gray-300">
              {trans.description}
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {trans.sections.map((section: { title: string; links: { name: string; url: string }[] }, sectionIndex: number) => (
                <div
                  key={sectionIndex}
                  className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link: { name: string; url: string }, linkIndex: number) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.url}
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
                        >
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-gray-700 mb-6">
                Use our search feature or contact our support team for assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="inline-block bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg border border-gray-300 transition-colors"
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
