import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import sparePartsBg from "@/assets/spareparts/banner/spare_parts_banner.jpg";

export default function SellCTA() {
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
    <section className="">
      <div className="container mx-auto px-4">
        <div className="relative h-[280px] md:h-[320px] rounded-3xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={sparePartsBg}
              alt="Garage background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <motion.div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Sell Spare Parts All in <br />
              One Place
            </h2>
            <p className="text-gray-200 text-sm md:text-sm max-w-2xl mb-8">
              Find spare parts for your car from verified garages and
              sellers. <br /> Have unused parts? List them on the platform and
              connect with real buyers <br /> instantly. From filters and brakes
              to accessories, everything is just a click away!
            </p>
            <Button
              onClick={handleSellNow}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sell Your Parts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
