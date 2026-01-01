import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-blue-600 mt-28">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl text-white mb-6">
          Be Part of Our Story
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Whether you're a Car owner, garage owner, or partner, join us as we
          redefine automotive service for the digital age.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2 px-6"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
          </Link>
          <Link href="/service">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2 px-6"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
