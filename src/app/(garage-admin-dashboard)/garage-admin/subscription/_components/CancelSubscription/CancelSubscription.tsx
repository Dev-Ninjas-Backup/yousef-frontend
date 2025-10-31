import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const CancelSubscription = () => {
  return (
    <Card className="border-red-200 bg-white">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="bg-[#FFE2E2] p-3 rounded-2xl">

        <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5 " />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Cancel Subscription</h3>
          <p className="text-sm text-gray-700 mb-3">
            If you cancel, you'll continue to have access until the end of your billing period. You can reactivate anytime before it expires.
          </p>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CancelSubscription;
