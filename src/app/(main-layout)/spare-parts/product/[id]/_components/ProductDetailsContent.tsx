"use client";

import { Product } from "@/store/api/sparePartsApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Calendar, Package, MapPin, User, Phone, Mail, MessageCircle } from "lucide-react";
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
    <div className={`${isModal ? 'p-6' : 'container mx-auto px-4 py-8'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {product.photos && product.photos.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.photos[0]}
                  alt={product.partName}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.photos.slice(1, 5).map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={photo}
                        alt={`${product.partName} ${index + 2}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
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
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Status */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${
                product.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                product.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              } border-0`}>
                {product.status}
              </Badge>
              {product.isPromoted && (
                <Badge className="bg-blue-100 text-blue-800 border-0">
                  Promoted
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.partName}</h1>
            <p className="text-4xl font-bold text-blue-600">${Number(product.price).toFixed(2)}</p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Condition:</span>
              <span className="text-sm font-medium">{product.condition}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Brand:</span>
              <span className="text-sm font-medium">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Category:</span>
              <span className="text-sm font-medium">{product.category?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Views:</span>
              <span className="text-sm font-medium">{product.views}</span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Seller Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium">{product.seller.name}</span>
                <Badge className={`text-xs ${
                  product.seller.sellerType === 'VERIFIED_SUPPLIER' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                } border-0`}>
                  {product.seller.sellerType}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm font-medium">{product.seller.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="text-sm font-medium">{product.seller.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          {currentUser && currentUser.id !== product.createdBy.id && (
            <div className="border-t pt-6">
              <div className="flex gap-3">
                <Button 
                  onClick={handleContactSeller}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with Seller
                </Button>
                <Button 
                  onClick={handleCallSeller}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Seller
                </Button>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Listed: {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}