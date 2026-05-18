"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import footerWave from "@/assets/footer/footer-wave.svg";
import sayarahublogo from "@/assets/footer/sayarahub.svg";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { footerTranslations } from "@/translations/footer";
import { Instagram } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(footerTranslations);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8FAFC] pt-16 pb-0 overflow-hidden mt-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-12 mb-12">
          {/* Column 1 */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start space-y-4">
            <Image src={sayarahublogo} alt="SayaraHub" className="w-40 h-auto" />
            <p className="text-sm text-gray-500 max-w-[220px]">
              Connecting buyers and sellers of spare parts across the UAE.
            </p>
            <Link href="/contact-us">
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-2">
                {trans.contactUs}
              </Button>
            </Link>
            <div className="flex items-center gap-4 mt-4 text-gray-500">
              {/* Only Instagram as requested */}
              <Link href="#" className="hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-span-1 flex flex-col items-start space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Quick Links</h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-500">
              <Link href="/about" className="hover:text-blue-600">{trans.navigation.about}</Link>
              <Link href="/service" className="hover:text-blue-600">{trans.navigation.service}</Link>
              <Link href="/spare-parts" className="hover:text-blue-600">{trans.navigation.spareParts}</Link>
              <Link href="/download-app" className="hover:text-blue-600">{trans.navigation.downloadApp}</Link>
              <Link href="/contact-us" className="hover:text-blue-600">{trans.navigation.contactUs}</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="col-span-1 flex flex-col items-start space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Help</h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-500">
              <Link href="#" className="hover:text-blue-600">How It Works</Link>
              <Link href="#" className="hover:text-blue-600">Tips for Buyers</Link>
              <Link href="#" className="hover:text-blue-600">Tips for Sellers</Link>
              <Link href="#" className="hover:text-blue-600">FAQs</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start space-y-4">
            <h3 className="font-bold text-gray-900 text-base">{trans.subscribe.title}</h3>
            <p className="text-sm text-gray-500">
              Get updates on new listings and helpful tips.
            </p>
            <div className="flex w-full items-center gap-2">
              <Input
                type="email"
                placeholder={trans.subscribe.emailPlaceholder}
                className="bg-white border-gray-200 focus-visible:ring-blue-500 rounded-md"
              />
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white rounded-md px-6">
                {trans.subscribe.button}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end py-6 border-t border-gray-200 text-xs text-gray-400 gap-6">
          <div className="text-center lg:text-left">
            <p className="mb-1">SayaraHub connects buyers and sellers. Transactions are handled directly between users.</p>
            <p>© {currentYear} SayaraHub. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-2">
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <Link href="#" className="hover:text-gray-600">{trans.bottomLinks.privacyPolicy}</Link>
              <Link href="#" className="hover:text-gray-600">{trans.bottomLinks.termsOfUse}</Link>
              <Link href="#" className="hover:text-gray-600">{trans.bottomLinks.legal}</Link>
              <Link href="#" className="hover:text-gray-600">{trans.bottomLinks.siteMap}</Link>
            </div>
            {/* <p className="mt-1">© {currentYear} SayaraHub. All rights reserved.</p> */}
          </div>
        </div>
      </div>
      
      {/* Wave shape (Kept from original design but placed at the very bottom) */}
      {/* <div className="relative w-full opacity-50 mt-4">
        <Image
          src={footerWave}
          alt=""
          className="w-full h-auto object-cover min-h-[40px] max-h-[80px]"
        />
      </div> */}
    </footer>
  );
};

export default Footer;
