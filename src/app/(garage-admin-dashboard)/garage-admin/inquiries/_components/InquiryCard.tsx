import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User, Mail, Send, MessageSquare } from "lucide-react";
import { useReplyInquiryMutation } from "@/store/api/garageAdminApis/myGarage/garageInquiryApi";
import { toast } from "sonner";


interface InquiryMessage {
  content: string;
  isFromAdmin: boolean;
  createdAt: string;
}

interface Inquiry {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "OTHERS";
  message: string;
  createdAt: string;
  othersubject?: string;
  makeasClosed: boolean;
  messages: InquiryMessage[];
}

interface InquiryCardProps {
  inquiry: Inquiry;
  onMarkClosed: (id: string) => void;
}

export function InquiryCard({ inquiry, onMarkClosed }: InquiryCardProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  
  const [replyInquiry, { isLoading }] = useReplyInquiryMutation();

  const customerName = `${inquiry.FirstName} ${inquiry.LastName}`;
  const isReplied = inquiry.messages && inquiry.messages.length > 0;
  const formattedDate = new Date(inquiry.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getSubjectBadge = () => {
    const colors = {
      CAR_PARTS: "bg-blue-100 text-blue-700",
      CAR_SERVICE: "bg-green-100 text-green-700",
      OTHERS: "bg-purple-100 text-purple-700",
    };
    return colors[inquiry.subject] || "bg-gray-100 text-gray-700";
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;

    try {
      await replyInquiry({
        contactId: inquiry.id,
        content: replyMessage,
      }).unwrap();
      
      toast.success("Reply sent successfully!");
      setReplyMessage("");
      setShowReply(false);
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-semibold text-gray-900">
            {inquiry.subject.replace("_", " ")}
          </h3>
          <Badge className={getSubjectBadge()}>
            {inquiry.subject.replace("_", " ")}
          </Badge>
          {!isReplied && (
            <Badge className="bg-blue-100 text-blue-700">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
              New
            </Badge>
          )}
          {isReplied && (
            <Badge className="bg-gray-100 text-gray-700">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Replied
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-medium text-gray-900">{customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {inquiry.email}
            </p>
          </div>
        </div>
      </div>

      {/* Original Message */}
      <div className="mb-4 bg-gray-50 p-4 rounded-md">
        <p className="text-xs text-gray-500 mb-1">Message:</p>
        <p className="text-sm text-gray-700">{inquiry.message}</p>
      </div>

      {/* Message History */}
      {inquiry.messages.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-500 font-semibold">Conversation:</p>
          {inquiry.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md ${
                msg.isFromAdmin
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-gray-50 border-l-4 border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">
                  {msg.isFromAdmin ? "You" : customerName}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{msg.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Section */}
      {showReply && (
        <div className="mb-4 space-y-2">
          <Input
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply..."
            className="w-full"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleReply}
              disabled={isLoading || !replyMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              <Send className="w-4 h-4 mr-1" />
              {isLoading ? "Sending..." : "Send Reply"}
            </Button>
            <Button
              onClick={() => {
                setShowReply(false);
                setReplyMessage("");
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        {!showReply && (
          <Button
            onClick={() => setShowReply(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            <Send className="w-4 h-4" />
            Reply
          </Button>
        )}
        {/* <Button
          onClick={() => onMarkClosed(inquiry.id)}
          variant="outline"
          size="sm"
        >
          Mark as Closed
        </Button> */}
      </div>
    </Card>
  );
}
