import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Store } from "lucide-react";
import Image from "next/image";
import { Product } from "@/store/api/sparePartsApi";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 py-0">
      <div className="relative h-[280px] bg-gray-100">
        <Image
          src={product.photos?.[0] || "/placeholder-product.jpg"}
          alt={product.name || "Product"}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <Badge className="bg-white text-gray-700 hover:bg-white border border-gray-300 shadow-none">
            {String(product.condition || "unknown")
              .charAt(0)
              .toUpperCase() + String(product.condition || "unknown").slice(1)}
          </Badge>
          <Badge className="bg-white text-gray-700 hover:bg-white border border-gray-300 shadow-none">
            {String(product.category || "Unknown")}
          </Badge>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-base">
          {product.name || "Unknown Product"}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-3">
          ${Number(product.price || 0).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Store className="h-4 w-4" />
          <span>
            Sold by: {String(product.seller?.name || "Unknown Seller")}
          </span>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11">
          <Eye className="mr-2 h-4 w-4" />
          View details
        </Button>
      </div>
    </Card>
  );
}
