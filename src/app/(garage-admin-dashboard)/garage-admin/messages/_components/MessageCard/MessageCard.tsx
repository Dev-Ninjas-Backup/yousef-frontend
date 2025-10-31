import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface MessageProps {
  title: string;
  date: string;
  sender: string;
  message: string;
  senderType: "Admin" | "Customer";
  isUnread: boolean;
}

const MessageCard = (props: MessageProps) => {
  return (
    <Card className="bg-[#EFF6FF] py-10 border-[#BEDBFF] shadow-none">
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-black text-white hover:bg-black">
              {props.senderType}
            </Badge>
            {props.isUnread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </div>
          <span className="text-sm text-gray-500">{props.date}</span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">{props.title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{props.message}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-10">
          <Mail className="w-4 h-4" />
          <span>From: {props.sender}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
