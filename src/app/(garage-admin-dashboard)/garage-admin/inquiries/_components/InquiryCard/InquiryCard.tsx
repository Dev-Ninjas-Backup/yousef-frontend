import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail } from "lucide-react";

interface InquiriesProps {
  title: string;
  date: string;
  customer: string;
  message: string;
  status: string;
  replied: boolean;
}

const InquiryCard = (inquiry: InquiriesProps) => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-gray-900">{inquiry.title}</h3>
            <Badge
              className={inquiry.replied ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}
            >
              {inquiry.status}
            </Badge>
          </div>
          <span className="text-sm text-gray-500">{inquiry.date}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Customer:</span>
          <span className="text-gray-900 font-medium">{inquiry.customer}</span>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-xs text-gray-500 mb-1">Message:</p>
          <p className="text-sm text-gray-900">{inquiry.message}</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Reply
          </Button>
          <Button size="sm" variant="outline" className="text-white">
            Mark as Closed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InquiryCard;