import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus } from "lucide-react";

const PaymentMethodCard = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 border bg-white p-3 sm:p-4 md:p-6 rounded-xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">Payment Methods</h3>
          <p className="text-xs sm:text-sm text-gray-500">Manage your payment options</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2 text-white w-full sm:w-auto text-xs sm:text-sm">
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </Button>
      </div>
      <div className="border-t border-gray-200" />

      <Card className="shadow-none">
        <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-xs sm:text-sm text-gray-900">•••• •••• •••• 4532</p>
                <Badge variant="outline" className="text-xs">Default</Badge>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 truncate">Ahmed Mohammed • Expires 12/26</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Remove</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodCard;
