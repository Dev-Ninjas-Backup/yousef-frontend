import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package } from "lucide-react";
import Image from "next/image";

interface MessageProps {
  id: string;
  partName: string;
  brand: string | null;
  price: number;
  condition: string;
  photos: string[];
  createdAt: string;
  isPromoted: boolean;
}

const MessageCard = (props: MessageProps) => {
  const formattedDate = new Date(props.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.price);

  return (
    <Card className="bg-[#EFF6FF] border-[#BEDBFF] shadow-none hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {props.photos[0] ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={props.photos[0]}
                  alt={props.partName}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white hover:bg-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
                {props.isPromoted && (
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                    Promoted
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {props.partName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {props.brand && `${props.brand} • `}
                {props.condition}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                {formattedPrice}
              </span>
              <p className="text-sm text-gray-600">
                Your product is now live on the platform
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
