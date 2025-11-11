import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Eye } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface PromotionalAdCardProps {
  title: string;
  image: string | StaticImageData;
  status: "Active" | "Pending";
  category: string;
  isFree: boolean;
  description: string;
  location: string;
  dateRange: string;
}

const PromotionalAdCard = (props: PromotionalAdCardProps) => {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col items-center sm:flex-row gap-6">
          <div className="relative w-full sm:w-40 h-40 sm:h-28 shrink-0">
            <Image
              src={props.image}
              alt={props.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              {props.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-600 text-white hover:bg-blue-600">
                {props.status}
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#DBEAFE] text-[#193CB8] border-2"
              >
                {props.category}
              </Badge>
              {props.isFree && (
                <Badge className="bg-[#B9F8CF] text-[#008236] hover:bg-green-600">
                  Free Listing
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-700 line-clamp-2">
              {props.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="truncate">{props.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{props.dateRange}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full mt-5 sm:w-auto"
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
