import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const CancelSubscription = () => {
  return (
    <Card className="border-red-200 bg-white w-full">
      <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <div className="bg-[#FFE2E2] p-2.5 sm:p-3 rounded-2xl flex-shrink-0">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 sm:mb-2">Cancel Subscription</h3>
          <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
            If you cancel, you'll continue to have access until the end of your billing period. You can reactivate anytime before it expires.
          </p>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto text-xs sm:text-sm">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CancelSubscription;
