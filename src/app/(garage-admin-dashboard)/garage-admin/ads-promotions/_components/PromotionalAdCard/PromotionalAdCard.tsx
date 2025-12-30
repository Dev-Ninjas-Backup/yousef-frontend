import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Package, DollarSign } from "lucide-react";
import Image from "next/image";
import ProductImage from "@/assets/garage-admin/my-products/product.jpg";

interface Product {
  id: string;
  partName: string;
  brand: string;
  condition: string;
  price: string;
  quantity: number;
  description: string;
  photos: string[];
  status: string;
  isPromoted: boolean;
  promoCost: string;
  views: number;
  inquiries: number;
  createdAt: string;
}

interface PromotionalAdCardProps {
  product: Product;
  onPreview: () => void;
}

const PromotionalAdCard = ({ product, onPreview }: PromotionalAdCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600 text-white";
      case "PENDING":
        return "bg-yellow-600 text-white";
      case "REJECTED":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <Card className="shadow-none">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col items-center sm:flex-row gap-6">
          <div className="relative w-full sm:w-40 h-40 sm:h-28 shrink-0">
            <Image
              src={product.photos[0]}
              alt={product.partName}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              {product.partName}
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(product.status)}>
                {product.status}
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#DBEAFE] text-[#193CB8] border-2"
              >
                {product.brand}
              </Badge>
              <Badge className="bg-[#B9F8CF] text-[#008236] hover:bg-green-600">
                Promoted
              </Badge>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>AED {product.price}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4 shrink-0" />
                <span>{product.condition}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full mt-5 sm:w-auto"
              onClick={onPreview}
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionalAdCard;
