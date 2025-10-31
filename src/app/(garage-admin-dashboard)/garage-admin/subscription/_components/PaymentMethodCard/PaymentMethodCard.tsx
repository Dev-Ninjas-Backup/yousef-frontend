import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus } from "lucide-react";

const PaymentMethodCard = () => {
  return (
    <div className="space-y-4 boder bg-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-500">Manage your payment options</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>
      <div className="border-t border-gray-200 my-6" />

      <Card>
        <CardContent className=" flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900">•••• •••• •••• 4532</p>
                <Badge variant="outline" className="text-xs">Default</Badge>
              </div>
              <p className="text-sm text-gray-500">Ahmed Mohammed • Expires 12/26</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Remove</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodCard;
