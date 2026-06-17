"use client";

import { Product } from "@/store/api/sparePartsApi";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Calendar, Package, MapPin, User, Phone, Mail, MessageCircle, BadgeCheck, Tag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";

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

  const handleSellerClick = () => {
    if (product?.createdBy?.id) {
      if (isModal) {
        window.location.href = `/spare-parts?userId=${product.createdBy.id}`;
      } else {
        router.push(`/spare-parts?userId=${product.createdBy.id}`);
      }
    }
  };

  const getSellerBadgeLabel = () => {
    if (product?.createdBy?.role === 'GARAGE_OWNER') return 'Garage';
    if (product?.seller?.sellerType === 'VERIFIED_SUPPLIER') return 'Supplier';
    return 'Individual';
  };

  const handleContactSeller = async () => {
    if (!product?.createdBy?.id) return;
    
    try {
      const token = Cookies.get("token");
      // Create or get existing conversation with seller
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private-chat/send-message/${product.createdBy.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    <div className="bg-white rounded-2xl overflow-hidden">
      {isModal && (
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
        </div>
      )}

      <div className={`${isModal ? 'p-6' : 'container mx-auto px-4 py-8'}`}>
        {/* Back Button */}
        {!isModal && (
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
        )}

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <Image
                    src={product.photos[0]}
                    alt={product.partName}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
                {product.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.photos.slice(1, 5).map((photo, index) => (
                      <div key={index} className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <Image
                          src={photo}
                          alt={`${product.partName} ${index + 2}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border border-gray-100">
                <span className="text-gray-400 text-sm">No images</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-5"
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
          >
            {/* Header Section */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-block bg-[#eff5ff] text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
                  {product.category?.name || "Spare Parts"}
                </span>
                {product.isPromoted && (
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    Promoted
                  </span>
                )}
                {product.status !== 'APPROVED' && (
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                    product.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {product.partName}
              </h1>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-extrabold text-blue-600">
                  AED {Number(product.price).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 bg-gray-550 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-xs">
                <Package className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-500">Condition:</span>
                <span className="font-semibold text-gray-700">{product.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <BadgeCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-500">Brand:</span>
                <span className="font-semibold text-gray-700">{product.brand || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-500">Category:</span>
                <span className="font-semibold text-gray-700">{product.category?.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Eye className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-500">Views:</span>
                <span className="font-semibold text-gray-700">{product.views}</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1.5">Description</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed bg-gray-50/50 p-3.5 rounded-lg border border-gray-100">
                  {product.description}
                </p>
              </div>
            )}

            {/* Seller Information */}
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Seller Information
              </h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={handleSellerClick}
                    className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center border-2 border-white shadow-sm shrink-0 cursor-pointer overflow-hidden"
                    title="View all listings from this seller"
                  >
                    {(() => {
                      const photoUrl = product?.createdBy?.role === 'GARAGE_OWNER'
                        ? (product.createdBy.garageLogo || product.createdBy.profilePhoto)
                        : product?.createdBy?.profilePhoto;

                      if (photoUrl) {
                        return (
                          <Image
                            src={photoUrl}
                            alt={product?.createdBy?.fullName || "Seller"}
                            fill
                            className="object-cover"
                          />
                        );
                      }
                      return <User className="w-5 h-5 text-blue-600" />;
                    })()}
                  </button>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <button
                        onClick={handleSellerClick}
                        className="font-bold text-gray-900 hover:text-blue-600 hover:underline transition-colors text-left text-sm"
                        title="View all listings from this seller"
                      >
                        {product.seller?.name || "N/A"}
                      </button>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {getSellerBadgeLabel()}
                      </span>
                      {product.seller?.sellerType === 'VERIFIED_SUPPLIER' && (
                         <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> {product.seller?.email || "N/A"}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> {product.seller?.phoneNumber || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                {currentUser && product?.createdBy && currentUser.id !== product.createdBy.id && (
                  <div className="flex sm:flex-col gap-2 min-w-[150px] w-full sm:w-auto">
                    <Button 
                      onClick={handleContactSeller}
                      className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm h-9 rounded-xl text-xs flex items-center justify-center"
                    >
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      Chat Now
                    </Button>
                    <Button 
                      onClick={handleCallSeller}
                      variant="outline"
                      className="flex-1 sm:flex-none border-gray-200 text-gray-700 hover:bg-gray-50 h-9 rounded-xl text-xs flex items-center justify-center"
                    >
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      Call Seller
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Dates */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Listed on {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                UAE
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}