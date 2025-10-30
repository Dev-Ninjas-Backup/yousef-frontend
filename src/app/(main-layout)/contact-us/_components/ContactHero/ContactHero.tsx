import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import contactHeroimg from "@/assets/contactus/contactus-img.jpg";

const ContactHero: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[720px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={contactHeroimg}
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative container mx-auto z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          We're Here to Help You Anytime.
        </h1>

        <p className="text-sm sm:text-base md:text-3xl text-gray-200 mb-4 md:mb-6 max-w-4xl">
          Whether you need support? Want to partner with us, or simply have a
          question about our services our team is always ready to assist. Reach
          out today and experience hassle-free support for all your automotive
          needs.
        </p>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-6 rounded-lg text-sm md:text-xl font-medium">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default ContactHero;
