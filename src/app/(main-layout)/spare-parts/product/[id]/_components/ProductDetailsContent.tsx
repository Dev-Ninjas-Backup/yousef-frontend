"use client";

import { Product } from "@/store/api/sparePartsApi";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Calendar, Package, MapPin, User, Phone, Mail, MessageCircle, BadgeCheck, Tag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

interface ProductDetailsContentProps {
  product?: Product;
  isLoading: boolean;
  error: any;
  isModal?: boolean;
}

export default function ProductDetailsContent({ 
  product, 
  isLoading, 
  error, 
  isModal = false 
}: ProductDetailsContentProps) {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleContactSeller = async () => {
    if (!product?.createdBy?.id) return;
    
    try {
      // Create or get existing conversation with seller
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private-chat/send-message/${product.createdBy.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]?.split(';')[0]}`
        },
        body: JSON.stringify({
          content: `Hi! I'm interested in your ${product.partName}. Is it still available?`,
          recipientId: product.createdBy.id
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Trigger FloatingChatWidget to open with this conversation
        const event = new CustomEvent('openChat', {
          detail: {
            userId: product.createdBy.id,
            userName: product.createdBy.fullName
          }
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const handleCallSeller = () => {
    if (product?.seller?.phoneNumber) {
      window.location.href = `tel:${product.seller.phoneNumber}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load product details</p>
      </div>
    );
  }

  return (
    <div className={`${isModal ? 'p-6 sm:p-8' : 'container mx-auto px-4 py-8'}`}>
      {/* Back Button */}
      <div className="mb-6 sm:mb-8">
        <Button 
          variant="outline" 
          className="group bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 shadow-sm hover:shadow-md flex items-center gap-2 px-5 py-2.5 h-auto rounded-xl transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold text-sm">Back to Spare Parts</span>
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Images */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
        >
          {product.photos && product.photos.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src={product.photos[0]}
                  alt={product.partName}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {product.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.photos.slice(1, 5).map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                      <Image
                        src={photo}
                        alt={`${product.partName} ${index + 2}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No images</span>
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-8"
          variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
        >
          {/* Header Section */}
          <div className="border-b border-gray-100 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block bg-[#eff5ff] text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                {product.category?.name || "Spare Parts"}
              </span>
              {product.isPromoted && (
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                  Promoted
                </span>
              )}
              {product.status !== 'APPROVED' && (
                <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                  product.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight drop-shadow-sm">
              {product.partName}
            </h1>
            <div className="flex items-end gap-3">
              <span className="text-4xl lg:text-5xl font-black text-blue-600 tracking-tight drop-shadow-sm">
                AED {Number(product.price).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center mb-3 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-1">Condition</span>
              <span className="text-sm font-bold text-gray-900">{product.condition}</span>
            </div>
            
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center mb-3 text-blue-600">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-1">Brand</span>
              <span className="text-sm font-bold text-gray-900 line-clamp-1">{product.brand || "N/A"}</span>
            </div>

            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center mb-3 text-blue-600">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-1">Category</span>
              <span className="text-sm font-bold text-gray-900 line-clamp-1">{product.category?.name || "N/A"}</span>
            </div>

            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center mb-3 text-blue-600">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-1">Views</span>
              <span className="text-sm font-bold text-gray-900">{product.views}</span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl p-6 border border-blue-200/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              <h3 className="text-xs font-black text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                 Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          )}

          {/* Seller Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] relative overflow-hidden">
            <h3 className="text-xs font-black text-gray-400 mb-5 uppercase tracking-wider">
              Seller Information
            </h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg font-bold text-gray-900">{product.seller?.name || "N/A"}</span>
                    {product.seller?.sellerType === 'VERIFIED_SUPPLIER' && (
                       <BadgeCheck className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {product.seller?.email || "N/A"}</span>
                    <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {product.seller?.phoneNumber || "N/A"}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Buttons inside Seller Card */}
              {currentUser && product?.createdBy && currentUser.id !== product.createdBy.id && (
                <div className="flex flex-col gap-2 min-w-[160px] pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <Button 
                    onClick={handleContactSeller}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm h-11 rounded-xl"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat Now
                  </Button>
                  <Button 
                    onClick={handleCallSeller}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-11 rounded-xl"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Seller
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Dates */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 px-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Listed on {new Date(product.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              UAE
            </span>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}