import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import footerWave from "@/assets/footer/footer-wave.svg";
import sayarahublogo from "@/assets/footer/sayarahub.svg";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-0 overflow-hidden mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Contact Button */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-30">
            <div className="space-y-15 flex flex-col items-center md:items-start">
              <div>
                <Image src={sayarahublogo} alt="" className="w-full h-auto" />
              </div>
              <Button className="bg-[#0A84FF] hover:bg-blue-700 text-white px-10 py-6 rounded-full mt-5">
                Contact Us
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center md:items-start space-y-3 text-base text-gray-700">
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link href="/service" className="hover:text-blue-600">
                Service
              </Link>
              <Link href="/spare-parts" className="hover:text-blue-600">
                Spare Parts
              </Link>
              <Link href="/download" className="hover:text-blue-600">
                Download App
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="flex flex-col gap-10 items-center md:items-end">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333]">
                Subscribe
              </h3>
              <div className="flex flex-col gap-3 max-w-[250px]">
                <Input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button className="bg-[#0A84FF] hover:bg-blue-700 text-white py-6 rounded-lg">
                  Subscribe
                </Button>
              </div>
            </div>
            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#7B7E86] mb-8">
              <Link href="/privacy-policy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600">
                Terms of Use
              </Link>
              <Link href="/sales-refunds" className="hover:text-blue-600">
                Sales and Refunds
              </Link>
              <Link href="/legal" className="hover:text-blue-600">
                Legal
              </Link>
              <Link href="/sitemap" className="hover:text-blue-600">
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="relative w-full ">
        <div className="w-full">
          <Image
            src={footerWave}
            alt=""
            className="w-full h-auto object-cover min-h-[100px]"
          />
        </div>

        {/* Copyright Text */}
        <div className="absolute inset-0 flex items-center justify-start w-full">
          <p className="text-white text-xs sm:text-sm md:text-base font-thin text-center px-4">
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
