import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Store } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  image: string | StaticImageData;
  title: string;
  price: number;
  condition: "New" | "Used";
  seller: string;
  isNew?: boolean;
}

export default function ProductCard({
  image,
  title,
  price,
  condition,
  seller,
  isNew,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 py-0">
      <div className="relative h-[280px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {isNew && (
            <Badge className="bg-white text-gray-900 hover:bg-white border border-gray-300 shadow-none">
              New
            </Badge>
          )}
          <Badge className="bg-white text-gray-700 hover:bg-white border border-gray-300 shadow-none">
            {condition}
          </Badge>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-base">
          {title}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-3">${price}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Store className="h-4 w-4" />
          <span>Sold by: {seller}</span>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11">
          <Eye className="mr-2 h-4 w-4" />
          View details
        </Button>
      </div>
    </Card>
  );
}
