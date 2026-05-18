"use client";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Handshake, MoveRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import sparePartsBg from "@/assets/spareparts/banner/spare_parts_banner.jpg";

export default function SparePartsHero() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleSellNow = () => {
    if (user?.role === 'GARAGE_OWNER') {
      router.push('/garage-admin/my-products/add-product');
    } else {
      router.push('/user/my-products/add-product');
    }
  };

  return (
    <section className="relative min-h-[550px] md:min-h-[600px] lg:h-[600px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Image
          src={sparePartsBg}
          alt="Spare Parts background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 w-full flex flex-col justify-center pt-28 pb-24 md:pt-32 md:pb-20">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Find & Connect with <br />
            <span className="text-blue-500">Spare Parts Sellers</span>
          </motion.h1>
          
          <motion.div
            className="text-gray-300 text-sm md:text-base mb-8 space-y-1 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>Browse spare parts listed by sellers across the UAE.</p>
            <p>Contact sellers directly and agree on the price your way.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={handleSellNow}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 text-base font-semibold rounded-lg w-auto"
            >
              Post Your Parts
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap items-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-600 rounded-full p-1.5">
                <Search className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="text-white text-sm font-medium">Browse Easily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-600 rounded-full p-1.5">
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="text-white text-sm font-medium">Contact Directly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-600 rounded-full p-1.5">
                <Handshake className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="text-white text-sm font-medium">Deal Your Way</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
