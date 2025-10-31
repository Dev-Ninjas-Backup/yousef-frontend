import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Send } from "lucide-react";

interface Inquiry {
  id: string;
  productName: string;
  date: string;
  status: "New" | "Replied";
  customerName: string;
  phone: string;
  email: string;
  message: string;
}

interface InquiryCardProps {
  inquiry: Inquiry;
  onReply: (id: string) => void;
  onMarkClosed: (id: string) => void;
}

export function InquiryCard({ inquiry, onReply, onMarkClosed }: InquiryCardProps) {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">{inquiry.productName}</h3>
          {inquiry.status === "New" && (
            <Badge className="bg-blue-100 text-blue-700">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
              New
            </Badge>
          )}
          {inquiry.status === "Replied" && (
            <Badge className="bg-gray-100 text-gray-700">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Replied
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-500">{inquiry.date}</span>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-medium text-gray-900">{inquiry.customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-900">{inquiry.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-900 truncate">{inquiry.email}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Message:</p>
        <p className="text-sm text-gray-700">{inquiry.message}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => onReply(inquiry.id)} size="sm">
          <Send className="w-4 h-4" />
          Reply
        </Button>
        <Button onClick={() => onMarkClosed(inquiry.id)} variant="outline" size="sm">
          Mark as Closed
        </Button>
      </div>
    </Card>
  );
}
