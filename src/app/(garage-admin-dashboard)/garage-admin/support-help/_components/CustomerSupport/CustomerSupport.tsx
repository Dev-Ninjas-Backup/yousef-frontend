import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const CustomerSupport = () => {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Customer Support</h3>
        </div>

        <p className="text-base text-gray-600">
          Chat with our support team for help with listings, verification, or any other questions.
        </p>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2 py-5 text-white">
          <MessageSquare className="w-4 h-4" />
          Start Chat
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerSupport;
