import { motion } from "framer-motion";
import { MapPin, Eye } from "lucide-react";
import Image from "next/image";
import { Product } from "@/store/api/sparePartsApi";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showViewDetails?: boolean;
  priority?: boolean;
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

export default function ProductCard({ 
  product, 
  viewMode = "grid",
  showViewDetails = true,
  priority = false
}: ProductCardProps) {
  const router = useRouter();
  const condition = String(product.condition || "");
  const timeString = timeAgo(product.createdAt);

  const handleCardClick = () => {
    router.push(`/spare-parts/product/${product.id}`);
  };

  const handleSellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.createdBy?.id) {
      router.push(`/spare-parts?userId=${product.createdBy.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
        {/* Image */}
        <div className={`relative bg-gray-50 overflow-hidden ${viewMode === 'list' ? 'h-[200px] sm:h-auto sm:w-[280px] shrink-0' : 'h-[180px]'}`}>
            <Image
              src={product.photos?.[0] || "/placeholder-product.jpg"}
              alt={product.partName || "Product"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority={priority}
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
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="inline-block bg-[#eff5ff] text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                {product.category?.name || "Spare Parts"}
              </span>
              <span className="inline-block bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-100/50">
                {condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase()}
              </span>
              {product.createdBy?.productMonthlyActive && product.createdBy?.productMonthlyPlanType?.toUpperCase() === "PRO" && (
                <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-0.5">
                  ⭐ Pro Seller
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1.5" title={product.partName}>
              {product.partName || "Unknown Product"}
            </h3>

            {/* Brand & Stock */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
              {product.brand ? (
                <span>Brand: <span className="font-semibold text-gray-600">{product.brand}</span></span>
              ) : (
                <span>Brand: <span className="font-semibold text-gray-600">Generic</span></span>
              )}
              <span className={product.quantity > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.quantity > 0 ? `${product.quantity} Available` : "Sold Out"}
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span className="text-base sm:text-lg font-extrabold text-blue-600">
                AED {Number(product.price || 0).toLocaleString()}
              </span>
            </div>

            {/* Seller profile info */}
            {(product.createdBy?.fullName || product.seller?.name) && (
              <div 
                onClick={handleSellerClick}
                className="flex items-center gap-2 mb-3 pt-2.5 border-t border-gray-50 hover:bg-gray-50/50 px-2 py-1.5 rounded-lg border border-transparent hover:border-gray-100/50 transition-all cursor-pointer"
                title={`View listings by ${product.createdBy?.fullName || product.seller?.name}`}
              >
                {/* Photo/Avatar */}
                <div className="relative w-6 h-6 rounded-full bg-blue-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  {(() => {
                    const photoUrl = product.createdBy?.role === 'GARAGE_OWNER' 
                      ? (product.createdBy.garageLogo || product.createdBy.profilePhoto)
                      : product.createdBy?.profilePhoto;
                    
                    if (photoUrl) {
                      return (
                        <Image
                          src={photoUrl}
                          alt={product.createdBy?.fullName || "Seller"}
                          fill
                          className="object-cover"
                        />
                      );
                    }
                    
                    // Fallback: styled initial
                    const initial = (product.createdBy?.fullName || product.seller?.name || "S").charAt(0).toUpperCase();
                    return (
                      <span className="text-[10px] font-bold text-blue-600">{initial}</span>
                    );
                  })()}
                </div>
                
                {/* Name and Type */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-gray-800 truncate leading-tight">
                    {product.createdBy?.fullName || product.seller?.name}
                  </span>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider leading-none mt-0.5">
                    {product.createdBy?.role === 'GARAGE_OWNER' ? 'Garage' : 
                     product.seller?.sellerType === 'VERIFIED_SUPPLIER' ? 'Supplier' : 'Individual'}
                  </span>
                </div>
              </div>
            )}

            {/* Footer row (Location & Time) */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-[11px] text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>UAE</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" />
                  {product.views || 0}
                </span>
                <span>
                  {timeString}
                </span>
              </div>
            </div>

            {/* View Details Button */}
            {showViewDetails && (
              <div className="mt-4 w-full bg-blue-50 text-blue-600 text-center py-2.5 rounded-lg text-xs font-semibold transition-colors group-hover:bg-blue-600 group-hover:text-white">
                View Details
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
