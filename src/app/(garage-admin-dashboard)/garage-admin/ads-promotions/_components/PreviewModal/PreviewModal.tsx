import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Package, DollarSign, Star } from "lucide-react";
import Image from "next/image";
import ProductImage from "@/assets/garage-admin/my-products/product.jpg";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}

const PreviewModal = ({ open, onOpenChange, product }: PreviewModalProps) => {
  if (!product) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Promotional Product Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images */}
          <div>
            {product.photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {product.photos.map((photo: string, index: number) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={photo}
                      alt={`${product.partName} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <p>No images available</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {product.partName}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${getStatusColor(product.status)} border`}>
                {product.status}
              </Badge>
              <Badge variant="outline">{product.brand}</Badge>
              <Badge className="bg-yellow-100 text-yellow-700">
                <Star className="w-3 h-3 mr-1 fill-yellow-500" />
                Promoted
              </Badge>
            </div>
          </div>

          {/* Price & Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-2xl font-bold text-blue-600">AED {product.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Condition</p>
              <p className="text-lg font-semibold">{product.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="text-lg font-semibold">{product.quantity} units</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Promotion Cost</p>
              <p className="text-lg font-semibold">AED {product.promoCost}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || "No description available"}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Views</p>
                <p className="text-xl font-bold">{product.views}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inquiries</p>
                <p className="text-xl font-bold">{product.inquiries}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-600">
            <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
