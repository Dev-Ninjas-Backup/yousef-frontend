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

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(footerTranslations);

  return (
    <footer className="bg-white pt-16 pb-0 overflow-hidden mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-30">
            <div className="space-y-15 flex flex-col items-center md:items-start">
              <div>
                <Image src={sayarahublogo} alt="" className="w-full h-auto" />
              </div>
              <Button className="bg-[#0A84FF] hover:bg-blue-700 text-white px-10 py-6 rounded-full mt-5">
                {trans.contactUs}
              </Button>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-3 text-base text-gray-700">
              <Link href="/about" className="hover:text-blue-600">
                {trans.navigation.about}
              </Link>
              <Link href="/service" className="hover:text-blue-600">
                {trans.navigation.service}
              </Link>
              <Link href="/spare-parts" className="hover:text-blue-600">
                {trans.navigation.spareParts}
              </Link>
              <Link href="/download-app" className="hover:text-blue-600">
                {trans.navigation.downloadApp}
              </Link>
              <Link href="/contact-us" className="hover:text-blue-600">
                {trans.navigation.contactUs}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center md:items-end">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333]">
                {trans.subscribe.title}
              </h3>
              <div className="flex flex-col gap-3 max-w-[250px]">
                <Input
                  type="email"
                  placeholder={trans.subscribe.emailPlaceholder}
                  className="px-4 py-5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button className="bg-[#0A84FF] hover:bg-blue-700 text-white py-6 rounded-lg">
                  {trans.subscribe.button}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#7B7E86] mb-8">
              <Link href="#" className="hover:text-blue-600">
                {trans.bottomLinks.privacyPolicy}
              </Link>
              <Link href="#" className="hover:text-blue-600">
                {trans.bottomLinks.termsOfUse}
              </Link>
              <Link href="#" className="hover:text-blue-600">
                {trans.bottomLinks.salesRefunds}
              </Link>
              <Link href="#" className="hover:text-blue-600">
                {trans.bottomLinks.legal}
              </Link>
              <Link href="#" className="hover:text-blue-600">
                {trans.bottomLinks.siteMap}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full ">
        <div className="w-full">
          <Image
            src={footerWave}
            alt=""
            className="w-full h-auto object-cover min-h-[100px]"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-start w-full">
          <p className="text-white text-xs sm:text-sm md:text-base font-thin text-center px-4">
            {trans.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
