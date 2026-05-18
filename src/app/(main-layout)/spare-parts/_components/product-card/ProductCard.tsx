import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/store/api/sparePartsApi";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

// Simple time ago formatter
const timeAgo = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} months ago`;
};

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const condition = String(product.condition || "");
  const timeString = timeAgo(product.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={`/spare-parts/product/${product.id}`} className="block h-full">
        <div className={`h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
          {/* Image */}
          <div className={`relative bg-gray-50 overflow-hidden ${viewMode === 'list' ? 'h-[200px] sm:h-auto sm:w-[280px] shrink-0' : 'h-[180px]'}`}>
            <Image
              src={product.photos?.[0] || "/placeholder-product.jpg"}
              alt={product.partName || "Product"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Promoted badge */}
            {product.isPromoted && (
              <div className="absolute top-2 right-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  PROMOTED
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            {/* Category Tag */}
            <div className="mb-2">
              <span className="inline-block bg-[#eff5ff] text-blue-600 text-[11px] font-medium px-2 py-0.5 rounded">
                {product.category?.name || "Spare Parts"}
              </span>
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className="text-lg font-bold text-gray-900">
                AED {Number(product.price || 0).toLocaleString()}
              </span>
            </div>

            {/* Condition & Name */}
            <div className="mb-4">
              <span className="text-xs text-gray-500">
                {condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase()} • {product.partName || "Unknown Product"}
              </span>
            </div>

            {/* Footer row (Location & Time) */}
            <div className="flex items-center justify-between mt-auto pt-4 text-[11px] text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>UAE</span>
              </div>
              <div>
                {timeString}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
